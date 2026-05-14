// Report service - generates final report
import { assessCase } from './score.service';
import { retrievePrecedents } from './retrieve.service';
import { DisputeType } from '@/shared/constants/disputeTypes';
import type { AssessmentInput } from '@/shared/types/assessment.types';

export const generateReport = async (
  caseType: DisputeType,
  caseDetails: any
): Promise<any> => {
  console.log('[Backend] Generating report');
  
  // Construct AssessmentInput for Phase 5 scoring
  const assessmentInput: AssessmentInput = {
    caseType,
    title: caseDetails.title || 'Untitled Case',
    description: caseDetails.description || '',
    evidence: caseDetails.evidence || [],
    amountInvolved: caseDetails.amountInvolved || 0,
    timeline: caseDetails.timeline,
    location: caseDetails.location,
    desiredOutcome: caseDetails.desiredOutcome,
  };
  
  const assessment = await assessCase(assessmentInput);
  const precedents = await retrievePrecedents(caseDetails.description);
  
  return {
    id: Math.random().toString(36).substring(7),
    caseId: caseDetails.id,
    assessment,
    precedents,
    generatedAt: new Date(),
    disclaimer: 'This is an AI assessment and does not replace legal advice.',
  };
};
