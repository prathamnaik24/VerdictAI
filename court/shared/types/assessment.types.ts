// Shared assessment types
import type { DisputeType } from '@/shared/constants/disputeTypes';
import type { ApplicableLaw, EvidenceSummary, PracticalRisk } from './legal.types';
import type { Precedent } from './precedent.types';

// ============================================================================
// PHASE 5: DETERMINISTIC SCORING TYPES
// ============================================================================

/**
 * ConfidenceLevel
 * How confident the scoring engine is in its assessment
 * Used across all scores to indicate reliability
 */
export type ConfidenceLevel = 'Very High' | 'High' | 'Moderate' | 'Low';

/**
 * LegalDirection
 * Overall legal direction of the case
 */
export type LegalDirection = 'Strongly Favorable' | 'Favorable' | 'Neutral' | 'Unfavorable' | 'Strongly Unfavorable';

/**
 * ReadinessLevel
 * How ready the case is for litigation
 */
export type ReadinessLevel = 'Trial Ready' | 'Mostly Ready' | 'Partially Ready' | 'Needs Work' | 'Not Ready';

/**
 * RiskFactor
 * Represents a specific risk that may affect the case outcome
 */
export interface RiskFactor {
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  impact: 'legal' | 'practical' | 'procedural';
  explanation: string;
}

/**
 * ScoringOutput (Phase 5)
 * Deterministic, repeatable legal scoring
 * - Same input → same result
 * - All logic explicitly defined
 * - No heavy AI dependency
 */
export interface ScoringOutput {
  // Case identification
  disputeType: DisputeType;
  caseId: string;
  generatedAt: Date;

  // QUESTION 1: Is this legally strong?
  legalDirectionScore: number; // 0-100, higher = more favorable
  legalDirectionLabel: LegalDirection;
  legalDirectionExplanation: string;

  // QUESTION 2: Is this practically difficult?
  practicalRiskScore: number; // 0-100, higher = more risk
  practicalDifficulty: 'Easy' | 'Moderate' | 'Difficult' | 'Very Difficult';
  practicalRiskFactors: RiskFactor[];

  // QUESTION 3: Is evidence sufficient?
  evidenceStrength: 'Strong' | 'Moderate' | 'Weak';
  availableEvidence: string[];
  missingEvidence: string[];
  evidenceGapImpact: 'Critical' | 'Significant' | 'Minor' | 'None';

  // QUESTION 4: Is the case ready?
  readinessScore: number; // 0-100
  readinessLevel: ReadinessLevel;
  readinessBlockers: string[];

  // QUESTION 5: What helps?
  favorableFactors: string[];
  precedentBoost: number; // 0-100, how much favorable precedent helps
  precedentConfidence: ConfidenceLevel;

  // QUESTION 6: What hurts?
  riskFactors: RiskFactor[];
  precedentHeadwind: number; // 0-100, how much adverse precedent hurts

  // Overall assessment
  confidenceLevel: ConfidenceLevel; // Scoring engine confidence
  recommendedActions: string[];
  
  // Metadata
  scoringVersion: string;
  thresholdsUsed: string[];
}

// ============================================================================
// LEGACY TYPES (Maintained for backward compatibility)
// ============================================================================

/**
 * AssessmentInput
 * MVP-simple contract for frontend intake → backend assessment
 */
export interface AssessmentInput {
  caseType: DisputeType;
  title: string;
  description: string;
  timeline: string;
  amountInvolved: number;
  evidence: string[];
  location: string;
  desiredOutcome: string;
}

/**
 * AssessmentOutput
 * Rich assessment results powering:
 * - Dashboard rendering
 * - Report generation
 * - Simulation setup
 * - Favorable/unfavorable factor cards
 */
export interface AssessmentOutput {
  // Legal assessment
  likelihoodScore: number;
  confidenceLevel: number;
  assessmentSummary: string;

  // Legal mappings
  possibleApplicableLaws: ApplicableLaw[];

  // Evidence intelligence
  evidenceSummary: EvidenceSummary;

  // Practical litigation risk
  practicalRisks: PracticalRisk[];

  // Retrieved precedents
  precedents: Precedent[];

  // Favorable/unfavorable factors
  favorableFactors: string[];
  unfavorableFactors: string[];
}
