// Assessment service
import { scoreCase } from '@/scoring/scoreEngine';
import { retrieveRelevantCases } from '@/retrieval/retrieveCases';
import { DisputeType } from '@/types/case.types';

export const assessCase = async (
  caseType: DisputeType,
  caseDetails: any
): Promise<any> => {
  const { score, factors } = scoreCase(caseType, caseDetails);
  const precedents = await retrieveRelevantCases(
    caseDetails.description,
    caseType
  );

  return {
    score,
    factors,
    precedents,
    confidence: Math.min(score / 100, 1),
  };
};
