/**
 * PHASE 5: PRACTICAL RISK ENGINE
 *
 * INDEPENDENT from legal merit assessment.
 * This calculates ONLY operational/practical factors that affect litigation.
 *
 * KEY DISTINCTION:
 * - Legal score: "Is this legally strong?"
 * - Risk score: "Will this be practical to pursue?"
 *
 * These are SEPARATE concerns.
 * A case can be:
 * - Legally strong but practically difficult (high witnesses, complex procedures)
 * - Legally weak but practically easy (good evidence, straightforward)
 *
 * This separation makes assessment feel intelligent and nuanced.
 */

import {
  clampScore,
  calculateWeightedAverage,
  calculateCumulativeRisk,
  deduplicateFactors,
} from './helpers';

import {
  PRACTICAL_RISK_WEIGHTS,
  RISK_FACTOR_SEVERITY_WEIGHTS,
} from './thresholds';

import type { RiskFactor } from '@/shared/types/assessment.types';

interface CaseDetails {
  description?: string;
  evidence?: string[];
  amountInvolved?: number;
  timeline?: string;
  location?: string;
  desiredOutcome?: string;
}

// ============================================================================
// EVIDENCE AVAILABILITY RISK (30% weight)
// Assesses gaps in actual evidence
// ============================================================================

interface EvidenceRiskResult {
  score: number;
  factors: RiskFactor[];
}

function assessEvidenceAvailabilityRisk(
  caseDetails: CaseDetails
): EvidenceRiskResult {
  const factors: RiskFactor[] = [];
  let score = 50; // Base risk

  const evidence = caseDetails.evidence || [];
  const description = (caseDetails.description || '').toLowerCase();

  // Few pieces of evidence = higher risk
  if (evidence.length === 0) {
    score = 90;
    factors.push({
      title: 'No evidence provided',
      severity: 'critical',
      impact: 'practical',
      explanation: 'Case lacks documented evidence. Will require extensive discovery.',
    });
  } else if (evidence.length < 3) {
    score = 75;
    factors.push({
      title: 'Sparse evidence collection',
      severity: 'high',
      impact: 'practical',
      explanation: 'Limited evidence pieces will require significant additional discovery phase.',
    });
  } else if (evidence.length >= 5) {
    score = 35;
    factors.push({
      title: 'Comprehensive evidence available',
      severity: 'low',
      impact: 'practical',
      explanation: 'Good evidence base reduces discovery burden and timeline.',
    });
  }

  // Written vs verbal evidence
  const writtenEvidenceCount = evidence.filter(
    (e) =>
      e.toLowerCase().includes('email') ||
      e.toLowerCase().includes('receipt') ||
      e.toLowerCase().includes('document') ||
      e.toLowerCase().includes('agreement') ||
      e.toLowerCase().includes('message')
  ).length;

  if (writtenEvidenceCount === 0 && evidence.length > 0) {
    score = Math.min(100, score + 20);
    factors.push({
      title: 'Oral/verbal evidence only',
      severity: 'high',
      impact: 'practical',
      explanation: 'Lack of written proof increases burden of substantiation through testimony.',
    });
  } else if (writtenEvidenceCount > evidence.length * 0.5) {
    score = Math.max(25, score - 20);
    factors.push({
      title: 'Written evidence predominant',
      severity: 'low',
      impact: 'practical',
      explanation: 'Documentary evidence reduces need for extensive witness testimony.',
    });
  }

  // Check for critical evidence types
  const hasPurchaseProof =
    evidence.some((e) => e.toLowerCase().includes('receipt')) ||
    description.includes('receipt');
  const hasAgreement =
    evidence.some((e) => e.toLowerCase().includes('agreement')) ||
    description.includes('contract');
  const hasCommunication = evidence.some(
    (e) =>
      e.toLowerCase().includes('email') ||
      e.toLowerCase().includes('message')
  );

  if (!hasPurchaseProof && !hasAgreement && !hasCommunication) {
    score = Math.min(100, score + 15);
    factors.push({
      title: 'Missing foundational evidence types',
      severity: 'high',
      impact: 'practical',
      explanation: 'Key evidence categories (purchase proof, agreements, communication) are absent.',
    });
  }

  return {
    score: clampScore(score),
    factors,
  };
}

// ============================================================================
// DOCUMENTATION QUALITY RISK (25% weight)
// Assesses how well-documented the case is
// ============================================================================

interface DocumentationRiskResult {
  score: number;
  factors: RiskFactor[];
}

function assessDocumentationQualityRisk(
  caseDetails: CaseDetails
): DocumentationRiskResult {
  const factors: RiskFactor[] = [];
  let score = 50; // Base risk

  const description = (caseDetails.description || '').toLowerCase();
  const evidence = caseDetails.evidence || [];

  // Case description length indicates preparation
  if (description.length < 50) {
    score = 75;
    factors.push({
      title: 'Vague case description',
      severity: 'high',
      impact: 'practical',
      explanation: 'Inadequate case narrative suggests insufficient case preparation.',
    });
  } else if (description.length > 300) {
    score = 35;
    factors.push({
      title: 'Detailed case documentation',
      severity: 'low',
      impact: 'practical',
      explanation: 'Comprehensive case description indicates good preparation.',
    });
  }

  // Timeline completeness
  const timeline = (caseDetails.timeline || '').toLowerCase();
  if (!timeline || timeline.length < 10) {
    score = Math.min(100, score + 15);
    factors.push({
      title: 'Unclear timeline',
      severity: 'medium',
      impact: 'practical',
      explanation: 'Vague timeline will require extensive reconstruction during discovery.',
    });
  } else if (timeline.includes('date') || /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}/.test(timeline)) {
    score = Math.max(25, score - 10);
    factors.push({
      title: 'Clear chronology established',
      severity: 'low',
      impact: 'practical',
      explanation: 'Specific dates and timeline help expedite fact-finding.',
    });
  }

  // Outcome clarity
  const desiredOutcome = (caseDetails.desiredOutcome || '').toLowerCase();
  if (!desiredOutcome || desiredOutcome.length < 10) {
    score = Math.min(100, score + 10);
    factors.push({
      title: 'Unclear relief sought',
      severity: 'medium',
      impact: 'practical',
      explanation: 'Vague desired outcome complicates settlement and remedy calculation.',
    });
  } else {
    factors.push({
      title: 'Clear relief objectives',
      severity: 'low',
      impact: 'practical',
      explanation: 'Specific outcome goals facilitate negotiation and settlement.',
    });
    score = Math.max(30, score - 10);
  }

  return {
    score: clampScore(score),
    factors,
  };
}

// ============================================================================
// PROCEDURAL COMPLEXITY RISK (20% weight)
// Assesses legal/procedural complexity independent of merit
// ============================================================================

interface ProceduralRiskResult {
  score: number;
  factors: RiskFactor[];
}

function assessProceduralComplexityRisk(
  caseDetails: CaseDetails
): ProceduralRiskResult {
  const factors: RiskFactor[] = [];
  let score = 50; // Base risk

  const description = (caseDetails.description || '').toLowerCase();

  // Multiple parties = higher procedural complexity
  if (
    description.includes('multiple') ||
    description.includes('several parties') ||
    description.includes('group')
  ) {
    score = Math.min(100, score + 25);
    factors.push({
      title: 'Multiple parties involved',
      severity: 'high',
      impact: 'procedural',
      explanation: 'Multi-party litigation increases procedural complexity significantly.',
    });
  }

  // Cross-border/jurisdiction complexity
  const location = (caseDetails.location || '').toLowerCase();
  if (
    location.includes('different state') ||
    location.includes('international') ||
    location.includes('multiple jurisdiction')
  ) {
    score = Math.min(100, score + 20);
    factors.push({
      title: 'Jurisdiction complexity',
      severity: 'high',
      impact: 'procedural',
      explanation:
        'Multi-jurisdiction disputes require complex conflict-of-laws analysis and venue determination.',
    });
  }

  // Expert witness requirements
  if (
    description.includes('expert') ||
    description.includes('technical') ||
    description.includes('specialized knowledge')
  ) {
    score = Math.min(100, score + 15);
    factors.push({
      title: 'Expert testimony required',
      severity: 'high',
      impact: 'procedural',
      explanation: 'Need for expert witnesses increases timeline and cost significantly.',
    });
  }

  // Simple/straightforward cases have lower procedural risk
  if (
    description.includes('simple') ||
    description.includes('clear') ||
    description.includes('straightforward') ||
    description.includes('breach')
  ) {
    score = Math.max(25, score - 20);
    factors.push({
      title: 'Straightforward legal issues',
      severity: 'low',
      impact: 'procedural',
      explanation: 'Simple, direct claims reduce procedural complexity.',
    });
  }

  return {
    score: clampScore(score),
    factors,
  };
}

// ============================================================================
// WITNESS RELIABILITY RISK (15% weight)
// Assesses availability and credibility of witness testimony
// ============================================================================

interface WitnessRiskResult {
  score: number;
  factors: RiskFactor[];
}

function assessWitnessReliabilityRisk(
  caseDetails: CaseDetails
): WitnessRiskResult {
  const factors: RiskFactor[] = [];
  let score = 50; // Base risk

  const description = (caseDetails.description || '').toLowerCase();
  const evidence = caseDetails.evidence || [];

  // Witness availability mentioned
  if (
    description.includes('witness') ||
    evidence.some((e) => e.toLowerCase().includes('witness'))
  ) {
    score = 40;
    factors.push({
      title: 'Witnesses identified',
      severity: 'low',
      impact: 'practical',
      explanation: 'Available witnesses reduce reliance on documentary evidence alone.',
    });
  } else if (
    description.includes('no witness') ||
    description.includes('solo')
  ) {
    score = 70;
    factors.push({
      title: 'No corroborating witnesses',
      severity: 'high',
      impact: 'practical',
      explanation: 'Lack of independent witnesses increases burden on documentary evidence.',
    });
  }

  // Potential credibility issues
  if (description.includes('memory gap') || description.includes('unclear recall')) {
    score = Math.min(100, score + 15);
    factors.push({
      title: 'Witness memory concerns',
      severity: 'medium',
      impact: 'practical',
      explanation: 'Time elapsed or other factors may affect witness credibility.',
    });
  }

  // Direct participants available
  if (
    description.includes('parties present') ||
    description.includes('both parties') ||
    description.includes('participant')
  ) {
    score = Math.max(30, score - 15);
    factors.push({
      title: 'Direct participant testimony available',
      severity: 'low',
      impact: 'practical',
      explanation: 'Testimony from direct participants is inherently more credible.',
    });
  }

  return {
    score: clampScore(score),
    factors,
  };
}

// ============================================================================
// ENFORCEABILITY RISK (10% weight)
// Assesses likelihood that judgment can be enforced
// ============================================================================

interface EnforceabilityRiskResult {
  score: number;
  factors: RiskFactor[];
}

function assessEnforceabilityRisk(
  caseDetails: CaseDetails
): EnforceabilityRiskResult {
  const factors: RiskFactor[] = [];
  let score = 50; // Base risk

  const amountInvolved = caseDetails.amountInvolved || 0;
  const description = (caseDetails.description || '').toLowerCase();

  // Amount involved affects enforceability cost/benefit
  if (amountInvolved > 100000) {
    score = 35;
    factors.push({
      title: 'High-value claim improves enforceability',
      severity: 'low',
      impact: 'practical',
      explanation: 'Larger amounts justify enforcement efforts and increase settlement likelihood.',
    });
  } else if (amountInvolved > 10000) {
    score = 50;
  } else if (amountInvolved > 0 && amountInvolved < 1000) {
    score = 75;
    factors.push({
      title: 'Low-value claim enforcement challenges',
      severity: 'medium',
      impact: 'practical',
      explanation:
        'Enforcement costs may exceed recovery for small claims; settlement unlikely.',
    });
  }

  // Identity/solvency of defendant
  if (
    description.includes('company') ||
    description.includes('business') ||
    description.includes('registered')
  ) {
    score = Math.max(25, score - 15);
    factors.push({
      title: 'Identifiable business defendant',
      severity: 'low',
      impact: 'practical',
      explanation: 'Established businesses are easier to locate and collect from.',
    });
  } else if (description.includes('individual') || description.includes('person')) {
    score = Math.min(100, score + 10);
    factors.push({
      title: 'Individual defendant',
      severity: 'medium',
      impact: 'practical',
      explanation: 'Individual defendants may present collection challenges.',
    });
  }

  return {
    score: clampScore(score),
    factors,
  };
}

// ============================================================================
// MAIN PRACTICAL RISK CALCULATION
// ============================================================================

export interface PracticalRiskAssessment {
  practicalRiskScore: number;
  practicalDifficulty: 'Easy' | 'Moderate' | 'Difficult' | 'Very Difficult';
  riskFactors: RiskFactor[];
  riskBreakdown: {
    evidenceAvailability: number;
    documentationQuality: number;
    proceduralComplexity: number;
    witnessReliability: number;
    enforceability: number;
  };
}

/**
 * Calculate practical risk - INDEPENDENT from legal merit
 * Returns structured risk assessment for case difficulty
 */
export function calculatePracticalRisk(
  caseDetails: CaseDetails
): PracticalRiskAssessment {
  // Assess each risk component
  const evidenceRisk = assessEvidenceAvailabilityRisk(caseDetails);
  const documentationRisk = assessDocumentationQualityRisk(caseDetails);
  const proceduralRisk = assessProceduralComplexityRisk(caseDetails);
  const witnessRisk = assessWitnessReliabilityRisk(caseDetails);
  const enforceabilityRisk = assessEnforceabilityRisk(caseDetails);

  // Combine component scores with weights
  const practicalRiskScore = calculateWeightedAverage(
    [
      evidenceRisk.score,
      documentationRisk.score,
      proceduralRisk.score,
      witnessRisk.score,
      enforceabilityRisk.score,
    ],
    [
      PRACTICAL_RISK_WEIGHTS.EVIDENCE_AVAILABILITY,
      PRACTICAL_RISK_WEIGHTS.DOCUMENTATION_GAPS,
      PRACTICAL_RISK_WEIGHTS.PROCEDURAL_COMPLEXITY,
      PRACTICAL_RISK_WEIGHTS.WITNESS_RELIABILITY,
      PRACTICAL_RISK_WEIGHTS.JURISDICTION_DELAYS, // Reuse for enforceability
    ]
  );

  // Combine all risk factors
  const allFactors = [
    ...evidenceRisk.factors,
    ...documentationRisk.factors,
    ...proceduralRisk.factors,
    ...witnessRisk.factors,
    ...enforceabilityRisk.factors,
  ];

  // Remove duplicates
  const uniqueFactors = deduplicateFactors(
    allFactors.map((f) => f.title)
  ).map((title) => allFactors.find((f) => f.title === title)!)
    .filter(Boolean);

  // Determine practical difficulty level
  let practicalDifficulty: 'Easy' | 'Moderate' | 'Difficult' | 'Very Difficult';
  if (practicalRiskScore <= 25) {
    practicalDifficulty = 'Easy';
  } else if (practicalRiskScore <= 50) {
    practicalDifficulty = 'Moderate';
  } else if (practicalRiskScore <= 75) {
    practicalDifficulty = 'Difficult';
  } else {
    practicalDifficulty = 'Very Difficult';
  }

  return {
    practicalRiskScore: clampScore(practicalRiskScore),
    practicalDifficulty,
    riskFactors: uniqueFactors,
    riskBreakdown: {
      evidenceAvailability: evidenceRisk.score,
      documentationQuality: documentationRisk.score,
      proceduralComplexity: proceduralRisk.score,
      witnessReliability: witnessRisk.score,
      enforceability: enforceabilityRisk.score,
    },
  };
}

/**
 * Get risk summary (for quick assessment)
 * Returns single-line risk characterization
 */
export function getRiskSummary(assessment: PracticalRiskAssessment): string {
  if (assessment.practicalDifficulty === 'Very Difficult') {
    return `High practical risk (${assessment.practicalRiskScore}/100) - significant challenges in pursuit`;
  }
  if (assessment.practicalDifficulty === 'Difficult') {
    return `Moderate-high practical risk (${assessment.practicalRiskScore}/100) - notable challenges`;
  }
  if (assessment.practicalDifficulty === 'Moderate') {
    return `Moderate practical risk (${assessment.practicalRiskScore}/100) - manageable challenges`;
  }
  return `Low practical risk (${assessment.practicalRiskScore}/100) - straightforward to pursue`;
}
