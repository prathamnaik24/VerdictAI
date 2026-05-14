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
    // Tier A
    case 'security-deposit-dispute':
    case 'unpaid-personal-loan':
    case 'utility-billing-error':
    case 'breach-of-service-contract':
    case 'consumer-fraud':
      return scoreConsumerComplaint(caseDetails);
    case 'wrongful-termination':
      return scoreEmploymentDispute(caseDetails);
    // Tier B
    case 'faulty-secondary-market-sale':
    case 'small-scale-property-damage':
    case 'general-negligence':
    case 'workplace-harassment':
      return { score: 50, factors: ['Tier B - To be implemented'] };
    // Tier C
    case 'cyber-crime':
    case 'vehicle-dispute':
    case 'simple-criminal-law':
      return { score: 50, factors: ['Tier C - To be implemented'] };
    default:
      return { score: 50, factors: [] };
  }
};
