// Retrieve service - wraps precedent retrieval
import { retrieveRelevantCases } from '@/backend/retrieval/retrieveCases';
import { Precedent } from '@/shared/types/precedent.types';

export const retrieveCases = async (
  caseDescription: string,
  caseType: string
): Promise<Precedent[]> => {
  console.log('[Backend] Retrieving relevant cases');
  return retrieveRelevantCases(caseDescription, caseType);
};
