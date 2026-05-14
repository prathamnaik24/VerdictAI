// Report service
import { assessCase } from './assessment.service';
import { DisputeType } from '@/types/case.types';

export const generateReport = async (
  caseType: DisputeType,
  caseDetails: any
): Promise<any> => {
  const assessment = await assessCase(caseType, caseDetails);

  return {
    id: Math.random().toString(36).substring(7),
    caseId: caseDetails.id,
    assessment,
    generatedAt: new Date(),
    disclaimer: 'This is an AI assessment and does not replace legal advice.',
  };
};
