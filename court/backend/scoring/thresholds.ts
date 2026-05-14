/**
 * PHASE 5: SCORING THRESHOLDS
 *
 * Central repository for ALL scoring magic numbers.
 * Ensures:
 * - Deterministic, repeatable scoring
 * - Single source of truth for score interpretation
 * - Easy policy adjustments across all scoring
 *
 * Rule: If it's a number in scoring, it goes here.
 */

// ============================================================================
// LEGAL DIRECTION SCORE THRESHOLDS (0-100)
// ============================================================================

export const LEGAL_DIRECTION_THRESHOLDS = {
  STRONGLY_FAVORABLE_MIN: 85,
  FAVORABLE_MIN: 70,
  NEUTRAL_MIN: 55,
  UNFAVORABLE_MIN: 40,
  VERY_WEAK_MIN: 0,
} as const;

export const LEGAL_DIRECTION_RANGES = {
  STRONGLY_FAVORABLE: { min: 85, max: 100 },
  FAVORABLE: { min: 70, max: 84 },
  NEUTRAL: { min: 55, max: 69 },
  UNFAVORABLE: { min: 40, max: 54 },
  STRONGLY_UNFAVORABLE: { min: 0, max: 39 },
} as const;

// ============================================================================
// PRACTICAL RISK SCORE THRESHOLDS (0-100, higher = more risk)
// ============================================================================

export const PRACTICAL_RISK_THRESHOLDS = {
  EASY_MAX: 25,
  MODERATE_MAX: 50,
  DIFFICULT_MAX: 75,
  VERY_DIFFICULT_MIN: 75,
} as const;

export const PRACTICAL_RISK_RANGES = {
  EASY: { min: 0, max: 25 },
  MODERATE: { min: 26, max: 50 },
  DIFFICULT: { min: 51, max: 75 },
  VERY_DIFFICULT: { min: 76, max: 100 },
} as const;

// ============================================================================
// EVIDENCE STRENGTH THRESHOLDS
// ============================================================================

export const EVIDENCE_STRENGTH_THRESHOLDS = {
  STRONG_MIN: 75,
  MODERATE_MIN: 40,
  WEAK_MIN: 0,
} as const;

export const EVIDENCE_GAP_IMPACT_THRESHOLDS = {
  CRITICAL_MIN: 80, // 80+ % of required evidence missing
  SIGNIFICANT_MIN: 50, // 50-79% missing
  MINOR_MIN: 20, // 20-49% missing
  NONE_MIN: 0, // <20% missing
} as const;

// ============================================================================
// READINESS SCORE THRESHOLDS (0-100)
// ============================================================================

export const READINESS_THRESHOLDS = {
  TRIAL_READY_MIN: 85,
  MOSTLY_READY_MIN: 70,
  PARTIALLY_READY_MIN: 50,
  NEEDS_WORK_MIN: 25,
  NOT_READY_MIN: 0,
} as const;

export const READINESS_RANGES = {
  TRIAL_READY: { min: 85, max: 100 },
  MOSTLY_READY: { min: 70, max: 84 },
  PARTIALLY_READY: { min: 50, max: 69 },
  NEEDS_WORK: { min: 25, max: 49 },
  NOT_READY: { min: 0, max: 24 },
} as const;

// ============================================================================
// CONFIDENCE LEVEL THRESHOLDS (0-100)
// ============================================================================

export const CONFIDENCE_THRESHOLDS = {
  VERY_HIGH_MIN: 85,
  HIGH_MIN: 70,
  MODERATE_MIN: 50,
  LOW_MIN: 0,
} as const;

export const CONFIDENCE_RANGES = {
  VERY_HIGH: { min: 85, max: 100 },
  HIGH: { min: 70, max: 84 },
  MODERATE: { min: 50, max: 69 },
  LOW: { min: 0, max: 49 },
} as const;

// ============================================================================
// RISK FACTOR SEVERITY MAPPINGS
// ============================================================================

export const RISK_FACTOR_SEVERITY_WEIGHTS = {
  CRITICAL: 100,
  HIGH: 75,
  MEDIUM: 50,
  LOW: 25,
} as const;

// ============================================================================
// PRECEDENT BOOST/HEADWIND (0-100)
// ============================================================================

export const PRECEDENT_BOOST = {
  VERY_STRONG: 30, // +30 points for strong favorable precedent
  STRONG: 20,
  MODERATE: 10,
  WEAK: 5,
} as const;

export const PRECEDENT_HEADWIND = {
  VERY_STRONG: 30, // -30 points for strong adverse precedent
  STRONG: 20,
  MODERATE: 10,
  WEAK: 5,
} as const;

// ============================================================================
// COMPONENT WEIGHTINGS (Used in composite score calculation)
// These sum to 100 in each category
// ============================================================================

export const LEGAL_DIRECTION_WEIGHTS = {
  APPLICABLE_LAW_MATCH: 0.35, // How well facts match applicable law
  STATUTORY_ELEMENTS: 0.25, // Presence of required legal elements
  PRECEDENT_ALIGNMENT: 0.25, // Alignment with favorable precedent
  BURDEN_OF_PROOF: 0.15, // Who bears the burden
} as const;

export const PRACTICAL_RISK_WEIGHTS = {
  EVIDENCE_AVAILABILITY: 0.30,
  PROCEDURAL_COMPLEXITY: 0.25,
  WITNESS_RELIABILITY: 0.20,
  JURISDICTION_DELAYS: 0.15,
  DOCUMENTATION_GAPS: 0.10,
} as const;

export const READINESS_WEIGHTS = {
  EVIDENCE_COMPLETENESS: 0.35,
  LEGAL_PREPARATION: 0.25,
  PROCEDURAL_COMPLIANCE: 0.25,
  EXPERT_AVAILABILITY: 0.15,
} as const;

// ============================================================================
// CONFIDENCE MODIFIERS
// These adjust confidence based on data quality and availability
// ============================================================================

export const CONFIDENCE_MODIFIERS = {
  COMPLETE_EVIDENCE: 1.0, // 100% of expected evidence provided
  SUBSTANTIAL_EVIDENCE: 0.85, // 75-99% of evidence
  ADEQUATE_EVIDENCE: 0.7, // 50-74% of evidence
  SPARSE_EVIDENCE: 0.5, // 25-49% of evidence
  MINIMAL_EVIDENCE: 0.3, // <25% of evidence
} as const;

export const PRECEDENT_CONFIDENCE_BOOST = {
  VERY_HIGH: 0.15, // +15% to confidence score
  HIGH: 0.1,
  MODERATE: 0.05,
  LOW: 0,
} as const;

// ============================================================================
// DISPUTE-SPECIFIC THRESHOLDS
// These can be overridden per dispute type
// ============================================================================

export const DISPUTE_TYPE_DEFAULTS = {
  SECURITY_DEPOSIT_DISPUTE: {
    weightEvidenceOver: true, // Evidence matters more for this type
    allowableReadinessFloor: 40, // Can still score if readiness is low
    precedentCritical: false,
  },
  CONSUMER_COMPLAINT: {
    weightEvidenceOver: true,
    allowableReadinessFloor: 35,
    precedentCritical: false,
  },
  EMPLOYMENT_DISPUTE: {
    weightEvidenceOver: false, // Legal elements matter more
    allowableReadinessFloor: 50,
    precedentCritical: true,
  },
} as const;

// ============================================================================
// SCORING VERSION
// Increment when thresholds change to maintain scoring consistency
// ============================================================================

export const SCORING_VERSION = '1.0.0' as const;

// ============================================================================
// UTILITY FUNCTION: Get Score Label
// Centralized interpretation of scores
// ============================================================================

export function getLegalDirectionLabel(score: number): string {
  if (score >= LEGAL_DIRECTION_THRESHOLDS.STRONGLY_FAVORABLE_MIN) {
    return 'Strongly Favorable';
  }
  if (score >= LEGAL_DIRECTION_THRESHOLDS.FAVORABLE_MIN) {
    return 'Favorable';
  }
  if (score >= LEGAL_DIRECTION_THRESHOLDS.NEUTRAL_MIN) {
    return 'Neutral';
  }
  if (score >= LEGAL_DIRECTION_THRESHOLDS.UNFAVORABLE_MIN) {
    return 'Unfavorable';
  }
  return 'Strongly Unfavorable';
}

export function getPracticalDifficultyLabel(score: number): string {
  if (score <= PRACTICAL_RISK_THRESHOLDS.EASY_MAX) {
    return 'Easy';
  }
  if (score <= PRACTICAL_RISK_THRESHOLDS.MODERATE_MAX) {
    return 'Moderate';
  }
  if (score <= PRACTICAL_RISK_THRESHOLDS.DIFFICULT_MAX) {
    return 'Difficult';
  }
  return 'Very Difficult';
}

export function getReadinessLabel(score: number): string {
  if (score >= READINESS_THRESHOLDS.TRIAL_READY_MIN) {
    return 'Trial Ready';
  }
  if (score >= READINESS_THRESHOLDS.MOSTLY_READY_MIN) {
    return 'Mostly Ready';
  }
  if (score >= READINESS_THRESHOLDS.PARTIALLY_READY_MIN) {
    return 'Partially Ready';
  }
  if (score >= READINESS_THRESHOLDS.NEEDS_WORK_MIN) {
    return 'Needs Work';
  }
  return 'Not Ready';
}

export function getConfidenceLabel(score: number): string {
  if (score >= CONFIDENCE_THRESHOLDS.VERY_HIGH_MIN) {
    return 'Very High';
  }
  if (score >= CONFIDENCE_THRESHOLDS.HIGH_MIN) {
    return 'High';
  }
  if (score >= CONFIDENCE_THRESHOLDS.MODERATE_MIN) {
    return 'Moderate';
  }
  return 'Low';
}

export function getEvidenceStrengthLabel(score: number): string {
  if (score >= EVIDENCE_STRENGTH_THRESHOLDS.STRONG_MIN) {
    return 'Strong';
  }
  if (score >= EVIDENCE_STRENGTH_THRESHOLDS.MODERATE_MIN) {
    return 'Moderate';
  }
  return 'Weak';
}

export function getEvidenceGapImpactLabel(percentageMissing: number): string {
  if (percentageMissing >= EVIDENCE_GAP_IMPACT_THRESHOLDS.CRITICAL_MIN) {
    return 'Critical';
  }
  if (percentageMissing >= EVIDENCE_GAP_IMPACT_THRESHOLDS.SIGNIFICANT_MIN) {
    return 'Significant';
  }
  if (percentageMissing >= EVIDENCE_GAP_IMPACT_THRESHOLDS.MINOR_MIN) {
    return 'Minor';
  }
  return 'None';
}

// ============================================================================
// BACKWARD COMPATIBILITY
// ============================================================================

/**
 * Legacy function for existing code
 * Maps 0-100 score to likelihood category
 * This is being superseded by Phase 5 ScoringOutput
 */
export const getScoreLikelihood = (score: number): string => {
  if (score >= 85) return 'very-likely';
  if (score >= 70) return 'likely';
  if (score > 55) return 'neutral';
  if (score > 40) return 'unlikely';
  return 'very-unlikely';
};
