// Tier Constants
export const DISPUTE_TIERS = {
  TIER_A: 'tier-a',
  TIER_B: 'tier-b',
  TIER_C: 'tier-c',
} as const;

export type DisputeTier = (typeof DISPUTE_TIERS)[keyof typeof DISPUTE_TIERS];

// Tier A: High frequency, established legal precedent
// Tier B: Medium complexity, moderate precedent availability
// Tier C: Specialized, limited precedent or emerging domains

export const DISPUTE_TYPES = {
  // Tier A
  SECURITY_DEPOSIT_DISPUTE: 'security-deposit-dispute',
  UNPAID_PERSONAL_LOAN: 'unpaid-personal-loan',
  UTILITY_BILLING_ERROR: 'utility-billing-error',
  BREACH_OF_SERVICE_CONTRACT: 'breach-of-service-contract',
  CONSUMER_FRAUD: 'consumer-fraud',
  WRONGFUL_TERMINATION: 'wrongful-termination',
  // Tier B
  FAULTY_SECONDARY_MARKET_SALE: 'faulty-secondary-market-sale',
  SMALL_SCALE_PROPERTY_DAMAGE: 'small-scale-property-damage',
  GENERAL_NEGLIGENCE: 'general-negligence',
  WORKPLACE_HARASSMENT: 'workplace-harassment',
  // Tier C
  CYBER_CRIME: 'cyber-crime',
  VEHICLE_DISPUTE: 'vehicle-dispute',
  SIMPLE_CRIMINAL_LAW: 'simple-criminal-law',
} as const;

export type DisputeType = (typeof DISPUTE_TYPES)[keyof typeof DISPUTE_TYPES];

export const DISPUTE_TYPE_LABELS = {
  'security-deposit-dispute': 'Security Deposit Dispute',
  'unpaid-personal-loan': 'Unpaid Personal Loan',
  'utility-billing-error': 'Utility Billing Error',
  'breach-of-service-contract': 'Breach of Service Contract',
  'consumer-fraud': 'Consumer Fraud',
  'wrongful-termination': 'Wrongful Termination',
  'faulty-secondary-market-sale': 'Faulty Secondary Market Sale',
  'small-scale-property-damage': 'Small-Scale Property Damage',
  'general-negligence': 'General Negligence',
  'workplace-harassment': 'Workplace Harassment',
  'cyber-crime': 'Cyber Crime',
  'vehicle-dispute': 'Vehicle Dispute',
  'simple-criminal-law': 'Simple Criminal Law',
} as const;

export const DISPUTE_TYPE_TIERS: Record<DisputeType, DisputeTier> = {
  // Tier A
  'security-deposit-dispute': DISPUTE_TIERS.TIER_A,
  'unpaid-personal-loan': DISPUTE_TIERS.TIER_A,
  'utility-billing-error': DISPUTE_TIERS.TIER_A,
  'breach-of-service-contract': DISPUTE_TIERS.TIER_A,
  'consumer-fraud': DISPUTE_TIERS.TIER_A,
  'wrongful-termination': DISPUTE_TIERS.TIER_A,
  // Tier B
  'faulty-secondary-market-sale': DISPUTE_TIERS.TIER_B,
  'small-scale-property-damage': DISPUTE_TIERS.TIER_B,
  'general-negligence': DISPUTE_TIERS.TIER_B,
  'workplace-harassment': DISPUTE_TIERS.TIER_B,
  // Tier C
  'cyber-crime': DISPUTE_TIERS.TIER_C,
  'vehicle-dispute': DISPUTE_TIERS.TIER_C,
  'simple-criminal-law': DISPUTE_TIERS.TIER_C,
} as const;
