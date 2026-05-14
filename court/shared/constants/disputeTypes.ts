// Dispute type constants
export const DISPUTE_TYPES = {
  CHEQUE_BOUNCE: 'cheque-bounce',
  CONSUMER_COMPLAINT: 'consumer-complaint',
  EMPLOYMENT_DISPUTE: 'employment-dispute',
} as const;

export type DisputeType = typeof DISPUTE_TYPES[keyof typeof DISPUTE_TYPES];

export const DISPUTE_TYPE_LABELS = {
  'cheque-bounce': 'Cheque Bounce',
  'consumer-complaint': 'Consumer Complaint',
  'employment-dispute': 'Employment / Salary Dispute',
} as const;
