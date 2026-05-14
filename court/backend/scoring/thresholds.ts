// Score thresholds and constants
import { SCORE_THRESHOLDS } from '@/shared/constants/scoreLabels';

export const getScoreLikelihood = (score: number): string => {
  if (score >= SCORE_THRESHOLDS.VERY_LIKELY) return 'very-likely';
  if (score >= SCORE_THRESHOLDS.LIKELY) return 'likely';
  if (score > SCORE_THRESHOLDS.UNLIKELY) return 'neutral';
  if (score > SCORE_THRESHOLDS.VERY_UNLIKELY) return 'unlikely';
  return 'very-unlikely';
};
