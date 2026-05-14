/**
 * PHASE 5: SCORING HELPERS
 *
 * Reusable mathematical and utility functions for deterministic scoring.
 * These contain NO business logic - purely calculation utilities.
 *
 * These make the scoring engine tunable and testable.
 */

import {
  CONFIDENCE_MODIFIERS,
  CONFIDENCE_THRESHOLDS,
  READINESS_WEIGHTS,
  LEGAL_DIRECTION_WEIGHTS,
  PRACTICAL_RISK_WEIGHTS,
  RISK_FACTOR_SEVERITY_WEIGHTS,
  PRECEDENT_BOOST,
  PRECEDENT_HEADWIND,
  PRECEDENT_CONFIDENCE_BOOST,
} from './thresholds';

// ============================================================================
// SCORE NORMALIZATION & CLAMPING
// ============================================================================

/**
 * Clamp a score to 0-100 range
 * Ensures scores never go outside valid boundaries
 */
export function clampScore(score: number): number {
  return Math.max(0, Math.min(100, score));
}

/**
 * Normalize a value to 0-100 scale
 * Converts a value within a range to 0-100
 * Example: normalizeScore(7.5, 0, 10) = 75
 */
export function normalizeScore(value: number, min: number, max: number): number {
  if (min === max) return 50; // Avoid division by zero
  const normalized = ((value - min) / (max - min)) * 100;
  return clampScore(normalized);
}

/**
 * Inverse normalize: convert 0-100 to a value range
 * Used when scoring produces 0-100 but you need a different scale
 */
export function denormalizeScore(score: number, min: number, max: number): number {
  const clamped = clampScore(score);
  return min + (clamped / 100) * (max - min);
}

// ============================================================================
// WEIGHTED CALCULATIONS
// ============================================================================

/**
 * Calculate weighted average
 * Takes an array of scores and their weights, returns combined score
 * Example: weightedAverage([80, 60], [0.7, 0.3]) = 74
 */
export function calculateWeightedAverage(
  scores: number[],
  weights: number[]
): number {
  if (scores.length === 0) return 50;
  if (scores.length !== weights.length) {
    throw new Error('Scores and weights arrays must have equal length');
  }

  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  if (totalWeight === 0) return 50;

  const weightedSum = scores.reduce((sum, score, i) => {
    return sum + clampScore(score) * weights[i];
  }, 0);

  return clampScore(weightedSum / totalWeight);
}

/**
 * Apply a weighted factor to a base score
 * Takes a base score and applies an adjustment with a weight
 * Example: applyWeightedFactor(70, 15, 0.3) = 74.5
 */
export function applyWeightedFactor(
  baseScore: number,
  factorAdjustment: number,
  weight: number
): number {
  const adjustment = factorAdjustment * Math.max(0, Math.min(1, weight));
  return clampScore(baseScore + adjustment);
}

/**
 * Combine multiple adjustment factors
 * Prevents adjustments from compounding excessively
 * Each factor is applied with diminishing returns
 */
export function combineAdjustmentFactors(
  baseScore: number,
  factors: number[]
): number {
  let result = baseScore;

  // Apply each factor with diminishing weight
  factors.forEach((factor, index) => {
    const diminishingWeight = 1 / (1 + index * 0.2); // Reduces impact of each successive factor
    result = applyWeightedFactor(result, factor, diminishingWeight);
  });

  return clampScore(result);
}

// ============================================================================
// CONFIDENCE CALCULATION
// ============================================================================

/**
 * Calculate confidence based on evidence availability
 * Lower evidence availability = lower confidence
 */
export function calculateEvidenceConfidence(
  availableEvidenceCount: number,
  expectedEvidenceCount: number
): number {
  if (expectedEvidenceCount === 0) return 100;

  const percentageAvailable = availableEvidenceCount / expectedEvidenceCount;

  if (percentageAvailable >= 1.0) {
    return 100 * CONFIDENCE_MODIFIERS.COMPLETE_EVIDENCE;
  }
  if (percentageAvailable >= 0.75) {
    return 85 * CONFIDENCE_MODIFIERS.SUBSTANTIAL_EVIDENCE;
  }
  if (percentageAvailable >= 0.5) {
    return 70 * CONFIDENCE_MODIFIERS.ADEQUATE_EVIDENCE;
  }
  if (percentageAvailable >= 0.25) {
    return 50 * CONFIDENCE_MODIFIERS.SPARSE_EVIDENCE;
  }
  return 30 * CONFIDENCE_MODIFIERS.MINIMAL_EVIDENCE;
}

/**
 * Apply precedent confidence boost
 * Strengthens confidence when favorable precedent exists
 */
export function applyPrecedentConfidenceBoost(
  baseConfidence: number,
  precedentStrength: 'very-strong' | 'strong' | 'moderate' | 'weak' | 'none'
): number {
  const boosts = {
    'very-strong': PRECEDENT_CONFIDENCE_BOOST.VERY_HIGH,
    strong: PRECEDENT_CONFIDENCE_BOOST.HIGH,
    moderate: PRECEDENT_CONFIDENCE_BOOST.MODERATE,
    weak: PRECEDENT_CONFIDENCE_BOOST.LOW,
    none: 0,
  };

  const boost = boosts[precedentStrength] || 0;
  const boostPoints = boost * 100;

  return clampScore(baseConfidence + boostPoints);
}

/**
 * Calculate final confidence from multiple factors
 * Combines evidence confidence and precedent boost
 */
export function calculateFinalConfidence(
  evidenceConfidence: number,
  precedentStrength: 'very-strong' | 'strong' | 'moderate' | 'weak' | 'none' = 'none',
  additionalFactors: number[] = []
): number {
  let result = evidenceConfidence;
  result = applyPrecedentConfidenceBoost(result, precedentStrength);
  result = combineAdjustmentFactors(result, additionalFactors);
  return clampScore(result);
}

// ============================================================================
// READINESS CALCULATION
// ============================================================================

/**
 * Calculate readiness score from components
 * Weighs evidence, legal prep, procedural compliance, expert availability
 */
export function calculateReadiness(
  evidenceCompletenessScore: number,
  legalPreparationScore: number,
  proceduralComplianceScore: number,
  expertAvailabilityScore: number
): number {
  const weights = [
    READINESS_WEIGHTS.EVIDENCE_COMPLETENESS,
    READINESS_WEIGHTS.LEGAL_PREPARATION,
    READINESS_WEIGHTS.PROCEDURAL_COMPLIANCE,
    READINESS_WEIGHTS.EXPERT_AVAILABILITY,
  ];

  const scores = [
    evidenceCompletenessScore,
    legalPreparationScore,
    proceduralComplianceScore,
    expertAvailabilityScore,
  ];

  return calculateWeightedAverage(scores, Object.values(weights));
}

/**
 * Check if readiness meets dispute-specific floor
 * Some cases can proceed even with lower readiness
 */
export function meetsReadinessFloor(
  readinessScore: number,
  allowableFloor: number
): boolean {
  return readinessScore >= allowableFloor;
}

// ============================================================================
// LEGAL DIRECTION CALCULATION
// ============================================================================

/**
 * Calculate legal direction from components
 * Weighs law match, statutory elements, precedent, burden of proof
 */
export function calculateLegalDirection(
  applicableLawMatchScore: number,
  statutoryElementsScore: number,
  precedentAlignmentScore: number,
  burdenOfProofScore: number
): number {
  const weights = [
    LEGAL_DIRECTION_WEIGHTS.APPLICABLE_LAW_MATCH,
    LEGAL_DIRECTION_WEIGHTS.STATUTORY_ELEMENTS,
    LEGAL_DIRECTION_WEIGHTS.PRECEDENT_ALIGNMENT,
    LEGAL_DIRECTION_WEIGHTS.BURDEN_OF_PROOF,
  ];

  const scores = [
    applicableLawMatchScore,
    statutoryElementsScore,
    precedentAlignmentScore,
    burdenOfProofScore,
  ];

  return calculateWeightedAverage(scores, Object.values(weights));
}

/**
 * Apply precedent adjustments to legal direction
 * Favorable precedent boosts score, adverse precedent reduces it
 */
export function applyPrecedentAdjustment(
  baseScore: number,
  favorablePrecedentStrength: 'very-strong' | 'strong' | 'moderate' | 'weak' | 'none' = 'none',
  adversePrecedentStrength: 'very-strong' | 'strong' | 'moderate' | 'weak' | 'none' = 'none'
): number {
  let adjusted = baseScore;

  // Apply favorable boost
  const favorableBoosters = {
    'very-strong': PRECEDENT_BOOST.VERY_STRONG,
    strong: PRECEDENT_BOOST.STRONG,
    moderate: PRECEDENT_BOOST.MODERATE,
    weak: PRECEDENT_BOOST.WEAK,
    none: 0,
  };

  const favorableBoost = favorableBoosters[favorablePrecedentStrength] || 0;
  adjusted = clampScore(adjusted + favorableBoost);

  // Apply adverse headwind
  const adverseHeadwinds = {
    'very-strong': -PRECEDENT_HEADWIND.VERY_STRONG,
    strong: -PRECEDENT_HEADWIND.STRONG,
    moderate: -PRECEDENT_HEADWIND.MODERATE,
    weak: -PRECEDENT_HEADWIND.WEAK,
    none: 0,
  };

  const adverseHeadwind = adverseHeadwinds[adversePrecedentStrength] || 0;
  adjusted = clampScore(adjusted + adverseHeadwind);

  return adjusted;
}

// ============================================================================
// PRACTICAL RISK CALCULATION
// ============================================================================

/**
 * Calculate practical risk from components
 * Weighs evidence, procedural complexity, witness reliability, etc.
 */
export function calculatePracticalRisk(
  evidenceAvailabilityRisk: number,
  proceduralComplexityRisk: number,
  witnessReliabilityRisk: number,
  jurisdictionDelaysRisk: number,
  documentationGapsRisk: number
): number {
  const weights = [
    PRACTICAL_RISK_WEIGHTS.EVIDENCE_AVAILABILITY,
    PRACTICAL_RISK_WEIGHTS.PROCEDURAL_COMPLEXITY,
    PRACTICAL_RISK_WEIGHTS.WITNESS_RELIABILITY,
    PRACTICAL_RISK_WEIGHTS.JURISDICTION_DELAYS,
    PRACTICAL_RISK_WEIGHTS.DOCUMENTATION_GAPS,
  ];

  const scores = [
    evidenceAvailabilityRisk,
    proceduralComplexityRisk,
    witnessReliabilityRisk,
    jurisdictionDelaysRisk,
    documentationGapsRisk,
  ];

  return calculateWeightedAverage(scores, Object.values(weights));
}

// ============================================================================
// FACTOR DEDUPLICATION & CLEANING
// ============================================================================

/**
 * Remove duplicate factors from list
 * Ignores case differences, trims whitespace
 */
export function deduplicateFactors(factors: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  factors.forEach((factor) => {
    const normalized = factor.trim().toLowerCase();
    if (normalized && !seen.has(normalized)) {
      seen.add(normalized);
      result.push(factor.trim());
    }
  });

  return result;
}

/**
 * Filter out very short/meaningless factors
 * Removes factors that are too vague to be useful
 */
export function filterMeaningfulFactors(
  factors: string[],
  minLength: number = 10
): string[] {
  return factors.filter((factor) => factor.trim().length >= minLength);
}

/**
 * Sort factors by importance (optional priority array)
 * Keeps high-priority factors first
 */
export function sortFactorsByPriority(
  factors: string[],
  priorityFactors?: string[]
): string[] {
  if (!priorityFactors || priorityFactors.length === 0) {
    return factors;
  }

  const prioritySet = new Set(
    priorityFactors.map((f) => f.trim().toLowerCase())
  );

  return factors.sort((a, b) => {
    const aIsHighPriority = prioritySet.has(a.trim().toLowerCase());
    const bIsHighPriority = prioritySet.has(b.trim().toLowerCase());

    if (aIsHighPriority && !bIsHighPriority) return -1;
    if (!aIsHighPriority && bIsHighPriority) return 1;
    return 0;
  });
}

// ============================================================================
// RISK FACTOR UTILITIES
// ============================================================================

/**
 * Calculate risk factor weight from severity
 * Critical > High > Medium > Low
 */
export function getRiskFactorWeight(
  severity: 'critical' | 'high' | 'medium' | 'low'
): number {
  return RISK_FACTOR_SEVERITY_WEIGHTS[severity.toUpperCase() as keyof typeof RISK_FACTOR_SEVERITY_WEIGHTS] || 25;
}

/**
 * Calculate cumulative risk from multiple risk factors
 * Higher severity = more impact on overall risk
 */
export function calculateCumulativeRisk(
  riskFactors: Array<{ severity: 'critical' | 'high' | 'medium' | 'low' }>
): number {
  if (riskFactors.length === 0) return 0;

  const totalWeight = riskFactors.reduce((sum, factor) => {
    return sum + getRiskFactorWeight(factor.severity);
  }, 0);

  // Normalize to 0-100 scale
  // Max possible is 4 critical factors = 400
  const maxPossibleWeight = 4 * 100;
  const riskScore = (totalWeight / maxPossibleWeight) * 100;

  return clampScore(riskScore);
}

// ============================================================================
// THRESHOLD CHECKING UTILITIES
// ============================================================================

/**
 * Check if a score meets a threshold
 */
export function meetsThreshold(
  score: number,
  threshold: number,
  direction: 'above' | 'below' = 'above'
): boolean {
  return direction === 'above' ? score >= threshold : score <= threshold;
}

/**
 * Determine range/category of a score
 */
export function getScoreCategory(
  score: number,
  ranges: Record<string, { min: number; max: number }>
): string | null {
  for (const [category, range] of Object.entries(ranges)) {
    if (score >= range.min && score <= range.max) {
      return category;
    }
  }
  return null;
}

// ============================================================================
// PERCENTAGE CALCULATIONS
// ============================================================================

/**
 * Calculate percentage of items
 */
export function calculatePercentage(part: number, whole: number): number {
  if (whole === 0) return 0;
  return (part / whole) * 100;
}

/**
 * Calculate missing percentage
 */
export function calculateMissingPercentage(
  available: number,
  expected: number
): number {
  if (expected === 0) return 0;
  return ((expected - available) / expected) * 100;
}

/**
 * Determine if a percentage meets a threshold
 */
export function percentageMeetsThreshold(
  percentage: number,
  threshold: number,
  direction: 'above' | 'below' = 'above'
): boolean {
  return direction === 'above' ? percentage >= threshold : percentage <= threshold;
}
