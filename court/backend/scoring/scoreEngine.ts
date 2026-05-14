/**
 * PHASE 5: MAIN SCORING ENGINE ORCHESTRATOR
 *
 * Central entrypoint for all case scoring.
 *
 * Pattern:
 * 1. Route dispute type to correct scorer (Tier A/B/C)
 * 2. Calculate independent practical risk
 * 3. Apply precedent-based confidence adjustments
 * 4. Construct complete ScoringOutput
 *
 * CRITICAL: Precedent affects CONFIDENCE, not OUTCOME
 */

import { DisputeType, DISPUTE_TYPE_LABELS } from '@/shared/constants/disputeTypes';
import type { ScoringOutput, RiskFactor } from '@/shared/types/assessment.types';

import { scoreChequeBounce } from './chequeBounce';
import { scoreConsumerComplaint } from './consumerComplaint';
import { scoreEmploymentDispute } from './employmentDispute';
import { calculatePracticalRisk, getRiskSummary } from './risk';

import {
  getLegalDirectionLabel,
  getPracticalDifficultyLabel,
  getReadinessLabel,
  getConfidenceLabel,
  getEvidenceStrengthLabel,
  getEvidenceGapImpactLabel,
  SCORING_VERSION,
  READINESS_THRESHOLDS,
  LEGAL_DIRECTION_THRESHOLDS,
} from './thresholds';

import {
  clampScore,
  deduplicateFactors,
} from './helpers';

interface CaseDetails {
  caseType: DisputeType;
  title?: string;
  description?: string;
  evidence?: string[];
  amountInvolved?: number;
  timeline?: string;
  location?: string;
  desiredOutcome?: string;
}

interface ScorerResult {
  score: number;
  factors: string[];
  riskFactors?: string[];
}

// ============================================================================
// SCORER ROUTER
// Routes disputes to correct scoring tier
// ============================================================================

function scoreCaseByType(
  disputeType: DisputeType,
  caseDetails: CaseDetails
): ScorerResult {
  switch (disputeType) {
    // ========= TIER A: Security Deposit (Detailed) =========
    case 'security-deposit-dispute':
      return scoreChequeBounce(caseDetails); // Placeholder until Tier A scoreSecurityDeposit

    // ========= TIER B: Consumer Complaints (Medium) =========
    case 'consumer-fraud':
    case 'breach-of-service-contract':
      return scoreConsumerComplaint(caseDetails);

    // ========= TIER B: Employment (Medium) =========
    case 'wrongful-termination':
    case 'workplace-harassment':
      return scoreEmploymentDispute(caseDetails);

    // ========= TIER B: General Cases (Medium) =========
    case 'unpaid-personal-loan':
    case 'utility-billing-error':
    case 'faulty-secondary-market-sale':
    case 'small-scale-property-damage':
    case 'general-negligence':
      return scoreConsumerComplaint(caseDetails); // Default to consumer complaint logic

    // ========= TIER C: Simplified (Classification only) =========
    case 'cyber-crime':
    case 'vehicle-dispute':
    case 'simple-criminal-law':
      return {
        score: 55,
        factors: ['Tier C case - basic classification'],
        riskFactors: ['Limited precedent data for this category'],
      };

    default:
      return {
        score: 50,
        factors: ['Unknown dispute type'],
        riskFactors: [],
      };
  }
}

// ============================================================================
// PRECEDENT CONFIDENCE ADJUSTMENT
// Precedent affects CONFIDENCE, not OUTCOME
// ============================================================================

function getPrecedentConfidenceModifier(
  description: string,
  factors: string[]
): number {
  /**
   * Simple heuristic: check if case details or favorable factors
   * suggest strong precedent alignment
   *
   * Returns adjustment: -5 to +15
   * - Strong precedent similarity: +15
   * - Moderate precedent similarity: +5
   * - Weak precedent alignment: -5
   * - No precedent data: 0
   */

  const description_lower = (description || '').toLowerCase();
  let modifier = 0;

  // Check for established pattern language in description
  const strongPatternKeywords = [
    'established precedent',
    'common practice',
    'standard in cases like',
    'previous cases',
    'settled law',
  ];

  const hasStrongPattern = strongPatternKeywords.some((keyword) =>
    description_lower.includes(keyword)
  );

  if (hasStrongPattern) {
    modifier += 15; // Strong precedent boost
  }

  // Check factor count as proxy for precedent alignment
  // More factors = better precedent match
  if (factors.length >= 5) {
    modifier += 10;
  } else if (factors.length >= 3) {
    modifier += 5;
  } else if (factors.length === 0) {
    modifier -= 5; // No supporting factors = weak precedent
  }

  // Clamp to reasonable range
  return Math.max(-5, Math.min(15, modifier));
}

// ============================================================================
// READINESS CALCULATION
// Based on evidence completeness and preparation
// ============================================================================

function calculateReadinessScore(
  evidenceAvailableCount: number,
  evidenceRequiredCount: number,
  legalScore: number,
  practicalRiskScore: number
): number {
  // Base readiness on evidence completeness
  const evidenceCompleteness = Math.min(
    100,
    (evidenceAvailableCount / Math.max(1, evidenceRequiredCount)) * 100
  );

  // Discount for high practical risk
  const practicalReadinessPenalty =
    (practicalRiskScore / 100) * 30; // Up to -30 points for very difficult cases

  // Benefit from strong legal position
  const legalReadinessBonus = Math.min(
    20,
    (legalScore - 50) * 0.4
  ); // Up to +20 for strong cases

  const readinessScore = clampScore(
    evidenceCompleteness * 0.6 -
      practicalReadinessPenalty +
      legalReadinessBonus
  );

  return readinessScore;
}

// ============================================================================
// MISSING EVIDENCE ANALYSIS
// ============================================================================

function analyzeMissingEvidence(
  evidence: string[],
  description: string
): { available: string[]; missing: string[]; percentageMissing: number } {
  const availableEvidence = evidence || [];

  // Define expected evidence types for typical cases
  const expectedEvidenceTypes = [
    { type: 'Contract/Agreement', keywords: ['agreement', 'contract', 'terms'] },
    { type: 'Communication', keywords: ['email', 'message', 'letter', 'whatsapp'] },
    { type: 'Proof of Payment', keywords: ['receipt', 'invoice', 'bank', 'transaction'] },
    { type: 'Correspondence', keywords: ['complaint', 'notice', 'demand'] },
    { type: 'Witness/Testimony', keywords: ['witness', 'statement', 'testimony'] },
  ];

  const description_lower = (description || '').toLowerCase();
  const missingTypes: string[] = [];

  expectedEvidenceTypes.forEach((expectedType) => {
    const hasThisType =
      availableEvidence.some((e) =>
        expectedType.keywords.some((keyword) =>
          e.toLowerCase().includes(keyword)
        )
      ) ||
      expectedType.keywords.some((keyword) =>
        description_lower.includes(keyword)
      );

    if (!hasThisType) {
      missingTypes.push(expectedType.type);
    }
  });

  const percentageMissing =
    (missingTypes.length / expectedEvidenceTypes.length) * 100;

  return {
    available: availableEvidence.slice(0, 3), // Top 3 pieces
    missing: missingTypes,
    percentageMissing,
  };
}

// ============================================================================
// MAIN SCORING FUNCTION
// ============================================================================

export function scoreCase(
  caseTypeOrDetails: DisputeType | CaseDetails,
  caseDetailsArg?: CaseDetails
): {
  score: number;
  factors: string[];
} {
  /**
   * BACKWARD COMPATIBILITY
   * Supports both old and new signatures:
   * - Old: scoreCase(disputeType, caseDetails)
   * - New: scoreCase(caseDetails with caseType property)
   */

  let caseDetails: CaseDetails;

  if (typeof caseTypeOrDetails === 'string') {
    // Old signature: scoreCase(disputeType, caseDetails)
    caseDetails = {
      ...caseDetailsArg,
      caseType: caseTypeOrDetails as DisputeType,
    };
  } else {
    // New signature: scoreCase(caseDetails)
    caseDetails = caseTypeOrDetails as CaseDetails;
  }

  const result = scoreCaseByType(caseDetails.caseType, caseDetails);
  return {
    score: result.score,
    factors: result.factors,
  };
}

/**
 * PHASE 5: Complete Scoring Output
 * New entrypoint for comprehensive case assessment
 */
export function scorePhase5(
  caseDetails: CaseDetails
): ScoringOutput {
  const caseId = `case_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // ========================================================================
  // STEP 1: Get dispute type scoring
  // ========================================================================

  const scoringResult = scoreCaseByType(caseDetails.caseType, caseDetails);
  const legalDirectionScore = clampScore(scoringResult.score);
  const legalDirectionLabelStr = getLegalDirectionLabel(legalDirectionScore);
  const legalDirectionLabel = legalDirectionLabelStr as any;

  // ========================================================================
  // STEP 2: Calculate practical risk (INDEPENDENT)
  // ========================================================================

  const practicalRiskAssessment = calculatePracticalRisk(caseDetails);

  // ========================================================================
  // STEP 3: Calculate confidence
  // ========================================================================

  const evidenceConfidenceModifier = Math.max(0, Math.min(1, (caseDetails.evidence?.length || 0) / 5));
  const baseConfidence = 50 + evidenceConfidenceModifier * 30;
  const precedentModifier = getPrecedentConfidenceModifier(
    caseDetails.description || '',
    scoringResult.factors || []
  );
  const adjustedConfidence = clampScore(baseConfidence + precedentModifier);
  const confidenceLabelStr = getConfidenceLabel(adjustedConfidence);
  const confidenceLabel = confidenceLabelStr as any;

  // ========================================================================
  // STEP 4: Calculate readiness
  // ========================================================================

  const evidenceAnalysis = analyzeMissingEvidence(
    caseDetails.evidence || [],
    caseDetails.description || ''
  );

  const readinessScore = calculateReadinessScore(
    (caseDetails.evidence?.length || 0),
    5, // Expected 5 evidence types
    legalDirectionScore,
    practicalRiskAssessment.practicalRiskScore
  );

  const readinessLevelStr = getReadinessLabel(readinessScore);
  const readinessLevel = readinessLevelStr as any;

  // ========================================================================
  // STEP 5: Build favorable/risk factors
  // ========================================================================

  const favorableFactors = deduplicateFactors(
    (scoringResult.factors || [])
      .filter((f) => f.length > 5)
      .slice(0, 5)
  );

  const riskFactorsFromScorer = (scoringResult.riskFactors || [])
    .filter((f) => f.length > 5)
    .slice(0, 3);

  const allRiskFactors: RiskFactor[] = [
    ...practicalRiskAssessment.riskFactors,
    ...riskFactorsFromScorer.map((title) => ({
      title,
      severity: 'medium' as const,
      impact: 'legal' as const,
      explanation: title,
    })),
  ];

  const deduplicatedRisks = deduplicateFactors(
    allRiskFactors.map((r) => r.title)
  ).map((title) => allRiskFactors.find((r) => r.title === title)!)
    .filter(Boolean)
    .slice(0, 5);

  // ========================================================================
  // STEP 6: Recommended actions
  // ========================================================================

  const recommendedActions: string[] = [];

  if (readinessScore < 50) {
    recommendedActions.push('Gather additional evidence before proceeding');
  }
  if (practicalRiskAssessment.practicalRiskScore > 70) {
    recommendedActions.push('Consider alternative dispute resolution (mediation/arbitration)');
  }
  if (legalDirectionScore < 50) {
    recommendedActions.push('Consult with legal counsel before filing');
  }
  if (evidenceAnalysis.percentageMissing > 50) {
    recommendedActions.push('Collect missing evidence types: ' + evidenceAnalysis.missing.join(', '));
  }
  if (legalDirectionScore >= 70 && readinessScore >= 70) {
    recommendedActions.push('Case is ready for legal action');
  }

  // ========================================================================
  // STEP 7: Construct ScoringOutput
  // ========================================================================

  const output: ScoringOutput = {
    // Case identification
    disputeType: caseDetails.caseType,
    caseId,
    generatedAt: new Date(),

    // QUESTION 1: Is this legally strong?
    legalDirectionScore,
    legalDirectionLabel,
    legalDirectionExplanation: `The case presents a ${legalDirectionLabel.toLowerCase()} legal position based on applicable law, statutory elements, and available evidence.`,

    // QUESTION 2: Is this practically difficult?
    practicalRiskScore: practicalRiskAssessment.practicalRiskScore,
    practicalDifficulty: practicalRiskAssessment.practicalDifficulty,
    practicalRiskFactors: deduplicatedRisks,

    // QUESTION 3: Is evidence sufficient?
    evidenceStrength: getEvidenceStrengthLabel(
      (caseDetails.evidence?.length || 0) * 20
    ) as 'Strong' | 'Moderate' | 'Weak',
    availableEvidence: evidenceAnalysis.available,
    missingEvidence: evidenceAnalysis.missing,
    evidenceGapImpact: getEvidenceGapImpactLabel(
      evidenceAnalysis.percentageMissing
    ) as 'Critical' | 'Significant' | 'Minor' | 'None',

    // QUESTION 4: Is the case ready?
    readinessScore,
    readinessLevel,
    readinessBlockers:
      readinessScore < 70
        ? deduplicateFactors([
            ...evidenceAnalysis.missing,
            ...deduplicatedRisks
              .filter((r) => r.severity === 'high' || r.severity === 'critical')
              .map((r) => r.title),
          ])
        : [],

    // QUESTION 5: What helps?
    favorableFactors,
    precedentBoost: Math.max(0, precedentModifier * 2), // 0-30 range
    precedentConfidence: confidenceLabel,

    // QUESTION 6: What hurts?
    riskFactors: deduplicatedRisks,
    precedentHeadwind: Math.max(0, -precedentModifier * 2), // 0-10 range

    // Overall assessment
    confidenceLevel: confidenceLabel,
    recommendedActions: deduplicateFactors(recommendedActions),

    // Metadata
    scoringVersion: SCORING_VERSION,
    thresholdsUsed: [
      `Legal Direction: ${LEGAL_DIRECTION_THRESHOLDS.STRONGLY_FAVORABLE_MIN}+`,
      `Readiness: ${READINESS_THRESHOLDS.TRIAL_READY_MIN}+`,
    ],
  };

  return output;
}
