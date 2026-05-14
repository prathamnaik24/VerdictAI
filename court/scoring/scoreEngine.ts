// Main scoring engine
import { DisputeType } from '@/types/case.types';
import { scoreChequeBounce } from './chequeBounce';
import { scoreConsumerComplaint } from './consumerComplaint';
import { scoreEmploymentDispute } from './employmentDispute';

export const scoreCase = (
  caseType: DisputeType,
  caseDetails: any
): { score: number; factors: string[] } => {
  switch (caseType) {
    case 'cheque-bounce':
      return scoreChequeBounce(caseDetails);
    case 'consumer-complaint':
      return scoreConsumerComplaint(caseDetails);
    case 'employment-dispute':
      return scoreEmploymentDispute(caseDetails);
    default:
      return { score: 50, factors: [] };
  }
};
