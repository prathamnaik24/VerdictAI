// Score service - wraps case scoring
import { scoreCase } from '@/backend/scoring/scoreEngine';
import { getScoreLikelihood } from '@/backend/scoring/thresholds';
import { DisputeType } from '@/shared/constants/disputeTypes';
import { AssessmentOutput } from '@/shared/types/assessment.types';

export const assessCaseScore = async (
  caseType: DisputeType,
  caseDetails: any
): Promise<AssessmentOutput> => {
  console.log('[Backend] Scoring case:', caseType);
  
  const { score, factors } = scoreCase(caseType, caseDetails);
  const likelihood = getScoreLikelihood(score);
  
  return {
    score,
    likelihood,
    factors,
    precedents: [],
    confidence: Math.min(score / 100, 1),
  };
};
