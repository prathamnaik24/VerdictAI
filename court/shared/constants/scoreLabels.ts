// Score label constants
export const SCORE_LABELS = {
  VERY_LIKELY: 'Very Likely',
  LIKELY: 'Likely',
  NEUTRAL: 'Neutral',
  UNLIKELY: 'Unlikely',
  VERY_UNLIKELY: 'Very Unlikely',
} as const;

export const CONFIDENCE_LEVELS = {
  VERY_LOW: 'Very Low',
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  VERY_HIGH: 'Very High',
} as const;

export const SCORE_THRESHOLDS = {
  VERY_LIKELY: 80,
  LIKELY: 65,
  NEUTRAL: 50,
  UNLIKELY: 35,
  VERY_UNLIKELY: 0,
} as const;
