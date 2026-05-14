/**
 * TIER B: CONSUMER COMPLAINT SCORING
 *
 * Medium-complexity rules for:
 * - Product defects
 * - Service failures
 * - Consumer fraud
 *
 * Strategy:
 * - Medium weighted logic (not as detailed as Tier A)
 * - Key factor detection
 * - Straightforward evidence assessment
 */

import {
  clampScore,
  calculateWeightedAverage,
  deduplicateFactors,
  filterMeaningfulFactors,
  calculatePercentage,
  calculateMissingPercentage,
} from './helpers';

import {
  LEGAL_DIRECTION_THRESHOLDS,
  PRACTICAL_RISK_THRESHOLDS,
} from './thresholds';

interface ConsumerComplaintDetails {
  description?: string;
  evidence?: string[];
  amountInvolved?: number;
  timeline?: string;
}

/**
 * Score a consumer complaint case
 * Evaluates: defect evidence, impact, timeline, documentation
 */
export const scoreConsumerComplaint = (
  caseDetails: ConsumerComplaintDetails
): { score: number; factors: string[]; riskFactors: string[] } => {
  const factors: string[] = [];
  const riskFactors: string[] = [];

  const description = (caseDetails.description || '').toLowerCase();
  const evidence = caseDetails.evidence || [];
  const timeline = (caseDetails.timeline || '').toLowerCase();

  // ========================================================================
  // EVIDENCE ASSESSMENT (40%)
  // ========================================================================

  let evidenceScore = 50; // Base

  // Check for written proof
  if (
    description.includes('receipt') ||
    description.includes('invoice') ||
    description.includes('proof') ||
    evidence.some((e) => e.toLowerCase().includes('receipt'))
  ) {
    evidenceScore += 15;
    factors.push('Written proof of purchase available');
  } else {
    riskFactors.push('No written purchase evidence');
  }

  // Check for defect documentation
  if (
    description.includes('photo') ||
    description.includes('video') ||
    description.includes('image') ||
    evidence.some((e) => e.toLowerCase().includes('photo'))
  ) {
    evidenceScore += 15;
    factors.push('Visual documentation of defect');
  } else {
    riskFactors.push('No visual evidence of defect');
  }

  // Check for communication trail
  if (
    description.includes('email') ||
    description.includes('message') ||
    description.includes('whatsapp') ||
    evidence.some((e) => e.toLowerCase().includes('email'))
  ) {
    evidenceScore += 10;
    factors.push('Communication trail with seller/service provider');
  } else {
    riskFactors.push('Limited documented communication');
  }

  // ========================================================================
  // DEFECT CLARITY (30%)
  // ========================================================================

  let defectScore = 50; // Base

  // Check for specific defect descriptions
  const defectKeywords = [
    'defect',
    'broken',
    'damaged',
    'malfunction',
    'failed',
    'not working',
    'faulty',
    'substandard',
  ];
  const hasDefectDescription = defectKeywords.some((keyword) =>
    description.includes(keyword)
  );

  if (hasDefectDescription && description.length > 50) {
    defectScore = 75;
    factors.push('Clear defect description documented');
  } else if (hasDefectDescription) {
    defectScore = 60;
    riskFactors.push('Defect description could be more detailed');
  } else {
    defectScore = 40;
    riskFactors.push('Defect not clearly articulated');
  }

  // Check for immediate discovery vs delay
  if (
    description.includes('immediately') ||
    description.includes('first use') ||
    description.includes('right away')
  ) {
    defectScore = Math.min(100, defectScore + 15);
    factors.push('Defect discovered promptly upon purchase');
  }

  // ========================================================================
  // TIMELINE (20%)
  // ========================================================================

  let timelineScore = 50; // Base

  // Check if complaint is timely
  if (
    !timeline.includes('month') &&
    !timeline.includes('year') &&
    !timeline.includes('ago')
  ) {
    timelineScore = 70;
    factors.push('Complaint filed within reasonable timeframe');
  } else if (
    timeline.includes('week') ||
    (timeline.includes('month') && !timeline.includes('6 month'))
  ) {
    timelineScore = 75;
    factors.push('Recent complaint strengthens case');
  } else if (timeline.includes('6 month') || timeline.includes('year')) {
    timelineScore = 40;
    riskFactors.push('Delay in filing may weaken position');
  }

  // Check for warranty period mention
  if (
    description.includes('warranty') ||
    evidence.some((e) => e.toLowerCase().includes('warranty'))
  ) {
    timelineScore = Math.min(100, timelineScore + 15);
    factors.push('Warranty documentation relevant');
  }

  // ========================================================================
  // IMPACT/DAMAGES (10%)
  // ========================================================================

  let impactScore = 50; // Base

  if (caseDetails.amountInvolved && caseDetails.amountInvolved > 10000) {
    impactScore = 70;
    factors.push('Substantial amount involved increases enforceability');
  } else if (caseDetails.amountInvolved && caseDetails.amountInvolved > 1000) {
    impactScore = 60;
  } else if (caseDetails.amountInvolved) {
    impactScore = 45;
  }

  // ========================================================================
  // CALCULATE COMPOSITE SCORES
  // ========================================================================

  const legalScore = calculateWeightedAverage(
    [evidenceScore, defectScore, timelineScore, impactScore],
    [0.4, 0.3, 0.2, 0.1]
  );

  // Practical risks for consumer cases are moderate by default
  let practicalScore = 45; // Consumer cases generally have moderate practical risk

  // Increase practical risk if evidence is weak
  if (evidenceScore < 40) {
    practicalScore = 65;
    riskFactors.push('Limited evidence collection may delay resolution');
  }

  // Decrease practical risk if well documented
  if (evidenceScore > 70 && defectScore > 70) {
    practicalScore = 30;
    factors.push('Strong evidence base supports quick resolution');
  }

  // Final scores
  const finalScore = calculateWeightedAverage([legalScore, practicalScore], [
    0.65, 0.35,
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
