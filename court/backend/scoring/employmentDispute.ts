/**
 * TIER B: EMPLOYMENT DISPUTE SCORING
 *
 * Medium-complexity rules for:
 * - Wrongful termination
 * - Workplace harassment
 * - Unpaid wages/benefits
 * - Contract breaches
 *
 * Strategy:
 * - Medium weighted logic
 * - Focus on employment law elements
 * - Procedural compliance assessment
 */

import {
  clampScore,
  calculateWeightedAverage,
  deduplicateFactors,
  filterMeaningfulFactors,
} from './helpers';

interface EmploymentDisputeDetails {
  description?: string;
  evidence?: string[];
  amountInvolved?: number;
  timeline?: string;
}

/**
 * Score an employment dispute case
 * Evaluates: contract clarity, policy violation, documentation, procedure compliance
 */
export const scoreEmploymentDispute = (
  caseDetails: EmploymentDisputeDetails
): { score: number; factors: string[]; riskFactors: string[] } => {
  const factors: string[] = [];
  const riskFactors: string[] = [];

  const description = (caseDetails.description || '').toLowerCase();
  const evidence = caseDetails.evidence || [];
  const timeline = (caseDetails.timeline || '').toLowerCase();

  // ========================================================================
  // CONTRACT CLARITY (30%)
  // ========================================================================

  let contractScore = 50; // Base

  // Check for contract documentation
  if (
    description.includes('employment agreement') ||
    description.includes('contract') ||
    description.includes('offer letter') ||
    evidence.some((e) => e.toLowerCase().includes('agreement'))
  ) {
    contractScore = 75;
    factors.push('Employment contract or offer letter documented');
  } else if (
    description.includes('hired') ||
    description.includes('employee') ||
    description.includes('role')
  ) {
    contractScore = 55;
    riskFactors.push('Lack of written employment agreement');
  } else {
    riskFactors.push('Contract terms unclear');
  }

  // Check for specific terms mentioned
  if (
    description.includes('salary') ||
    description.includes('notice period') ||
    description.includes('benefits') ||
    evidence.some((e) => e.toLowerCase().includes('salary'))
  ) {
    contractScore = Math.min(100, contractScore + 15);
    factors.push('Specific employment terms documented');
  }

  // ========================================================================
  // POLICY VIOLATION EVIDENCE (35%)
  // ========================================================================

  let violationScore = 50; // Base

  // Check for policy violation claims
  const violationKeywords = [
    'terminated',
    'fired',
    'dismissed',
    'harassment',
    'discrimination',
    'retaliation',
    'unpaid',
    'withheld',
    'breach',
  ];
  const hasViolation = violationKeywords.some((keyword) =>
    description.includes(keyword)
  );

  if (hasViolation && description.length > 100) {
    violationScore = 75;
    factors.push('Clear employment law violation claimed');
  } else if (hasViolation) {
    violationScore = 60;
    riskFactors.push('Violation claim needs more detail');
  } else {
    violationScore = 40;
    riskFactors.push('Nature of dispute not clearly specified');
  }

  // Check for procedural violation (notice, hearing, etc.)
  if (
    description.includes('without notice') ||
    description.includes('no opportunity') ||
    description.includes('no hearing') ||
    description.includes('without warning')
  ) {
    violationScore = Math.min(100, violationScore + 15);
    factors.push('Procedural violation (improper termination process)');
  }

  // ========================================================================
  // DOCUMENTATION & EVIDENCE (25%)
  // ========================================================================

  let documentationScore = 50; // Base

  // Check for emails, messages, records
  if (
    description.includes('email') ||
    description.includes('message') ||
    description.includes('record') ||
    description.includes('document') ||
    evidence.some((e) => e.toLowerCase().includes('email'))
  ) {
    documentationScore = 70;
    factors.push('Written evidence/documentation available');
  } else {
    riskFactors.push('Limited written documentation');
  }

  // Check for witness information
  if (
    description.includes('witness') ||
    description.includes('colleague') ||
    description.includes('manager') ||
    evidence.some((e) => e.toLowerCase().includes('witness'))
  ) {
    documentationScore = Math.min(100, documentationScore + 15);
    factors.push('Witness(es) available for testimony');
  }

  // Check for specific amounts/damages
  if (caseDetails.amountInvolved && caseDetails.amountInvolved > 0) {
    documentationScore = Math.min(100, documentationScore + 10);
    factors.push('Specific damages quantified');
  }

  // ========================================================================
  // TIMELINE & STATUTORY COMPLIANCE (10%)
  // ========================================================================

  let timelineScore = 50; // Base

  // Check if complaint is within statutory period
  if (
    !timeline.includes('year') &&
    !timeline.includes('month') &&
    timeline.length > 0
  ) {
    timelineScore = 70;
    factors.push('Complaint within reasonable statutory period');
  } else if (timeline.includes('1 month') || timeline.includes('2 month')) {
    timelineScore = 80;
    factors.push('Complaint filed promptly');
  } else if (
    timeline.includes('6 month') ||
    timeline.includes('1 year') ||
    timeline.includes('2 year')
  ) {
    timelineScore = 50;
    riskFactors.push('Some delay in filing may affect statute of limitations');
  } else if (timeline.includes('year') && !timeline.includes('1 year')) {
    timelineScore = 35;
    riskFactors.push('Significant delay may bar claims due to statute of limitations');
  }

  // ========================================================================
  // CALCULATE COMPOSITE SCORES
  // ========================================================================

  const legalScore = calculateWeightedAverage(
    [contractScore, violationScore, documentationScore, timelineScore],
    [0.3, 0.35, 0.25, 0.1]
  );

  // Practical risk for employment cases
  let practicalScore = 50; // Base - moderate

  // Employment cases are procedurally complex
  if (
    description.includes('small business') ||
    description.includes('startup') ||
    description.includes('informal')
  ) {
    practicalScore = 65;
    riskFactors.push('Informal employment arrangement increases complexity');
  }

  // Organized companies = lower practical risk
  if (
    description.includes('company') ||
    description.includes('organization') ||
    description.includes('large')
  ) {
    practicalScore = 40;
    factors.push('Formal employment structure aids resolution');
  }

  // If strong documentation, lower practical risk
  if (documentationScore > 75 && contractScore > 70) {
    practicalScore = Math.max(30, practicalScore - 15);
  }

  // Final score
  const finalScore = calculateWeightedAverage([legalScore, practicalScore], [
    0.6, 0.4,
  ]);

  // Deduplicate and clean factors
  const cleanFactors = deduplicateFactors(filterMeaningfulFactors(factors));
  const cleanRisks = deduplicateFactors(filterMeaningfulFactors(riskFactors));

  return {
    score: clampScore(finalScore),
    factors: cleanFactors,
    riskFactors: cleanRisks,
  };
};
