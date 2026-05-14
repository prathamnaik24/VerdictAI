// Score thresholds and constants
export const SCORE_THRESHOLDS = {
  VERY_LIKELY: 80,
  LIKELY: 65,
  NEUTRAL: 50,
  UNLIKELY: 35,
  VERY_UNLIKELY: 0,
} as const;

export const getScoreLikelihood = (score: number): string => {
  if (score >= SCORE_THRESHOLDS.VERY_LIKELY) return 'very-likely';
  if (score >= SCORE_THRESHOLDS.LIKELY) return 'likely';
  if (score > SCORE_THRESHOLDS.UNLIKELY) return 'neutral';
  if (score > SCORE_THRESHOLDS.VERY_UNLIKELY) return 'unlikely';
  return 'very-unlikely';
};
