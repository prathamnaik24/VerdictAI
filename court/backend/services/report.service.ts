// Report service - generates final report
import { assessCaseScore } from './score.service';
import { retrieveCases } from './retrieve.service';
import { DisputeType } from '@/shared/constants/disputeTypes';

export const generateReport = async (
  caseType: DisputeType,
  caseDetails: any
): Promise<any> => {
  console.log('[Backend] Generating report');
  
  const assessment = await assessCaseScore(caseType, caseDetails);
  const precedents = await retrieveCases(caseDetails.description, caseType);
  
  return {
    id: Math.random().toString(36).substring(7),
    caseId: caseDetails.id,
    assessment,
    precedents,
    generatedAt: new Date(),
    disclaimer: 'This is an AI assessment and does not replace legal advice.',
  };
};
