// Legal mappings for all dispute types
// Powers: "Possible Applicable Provisions" in dashboard, reports, and explanations
import type { ApplicableLaw } from '@/shared/types/legal.types';
import type { DisputeType } from './disputeTypes';

/**
 * LEGAL_MAPPINGS
 * Maps each dispute type to relevant applicable legal provisions
 * Guarantees type safety: all dispute types must be present
 * 
 * Language Strategy:
 * - Plain English, explainable in 5 seconds
 * - Use "may apply", "commonly referenced", "often relevant"
 * - Judge and investor-friendly wording
 * - Non-deterministic (not guaranteed outcomes)
 */
export const LEGAL_MAPPINGS: Record<DisputeType, ApplicableLaw[]> = {
  // Tier A: High frequency, polished demo flows (2-4 mappings each)

  'security-deposit-dispute': [
    {
      lawName: 'Indian Contract Act, 1872',
      section: 'Sections 73–75',
      label: 'Breach of Contract & Damages',
      whenApplicable:
        'May apply when a landlord withholds a security deposit without valid legal grounds or fails to return it within the agreed timeframe.',
      plainEnglishExplanation:
        'This provision is commonly referenced when you believe a landlord illegally retained your deposit. It covers compensation for losses caused by their breach.',
    },
    {
      lawName: 'State Rent/Tenancy Acts',
      section: 'Various sections',
      label: 'Tenant Protection Clauses',
      whenApplicable:
        'May apply where state-specific rental laws mandate deposit protection, maximum deduction limits, or mandatory refund timelines.',
      plainEnglishExplanation:
        'Most states have specific laws protecting tenant deposits. These often limit what landlords can deduct and require timely returns.',
    },
    {
      lawName: 'Consumer Protection Act, 2019',
      section: 'Section 2(47)',
      label: 'Unfair Trade Practice',
      whenApplicable:
        'May apply if the deposit withholding appears designed to mislead or exploit the tenant unfairly.',
      plainEnglishExplanation:
        'If the deposit terms were misrepresented or the deduction seems deliberately unfair, consumer protection law may help.',
    },
  ],

  'unpaid-personal-loan': [
    {
      lawName: 'Indian Contract Act, 1872',
      section: 'Sections 142–149',
      label: 'Debt Recovery & Creditor Rights',
      whenApplicable:
        'May apply where a written or verbal loan agreement exists and the borrower has failed to repay within the agreed terms.',
      plainEnglishExplanation:
        'This is the foundation for personal loan disputes. It governs what creditors can do to recover outstanding amounts.',
    },
    {
      lawName: 'Bharatiya Nyaya Sanhita, 2023',
      section: 'Sections 215–219',
      label: 'Criminal Breach of Trust (Optional)',
      whenApplicable:
        'May be invoked if the borrower obtained the loan through fraud or deception, or criminal intent can be established.',
      plainEnglishExplanation:
        'In extreme cases where fraud is involved, criminal charges might be possible alongside civil recovery.',
    },
    {
      lawName: 'Debt Recovery Tribunal (DRT) Acts',
      section: 'Section 34',
      label: 'Institutional Debt Recovery',
      whenApplicable:
        'May apply if the loan involves banks or financial institutions; cases often move to specialized DRT courts.',
      plainEnglishExplanation:
        'Banks handle disputes through specialized courts. This affects where your case is filed and which judge hears it.',
    },
  ],

  'utility-billing-error': [
    {
      lawName: 'Indian Contract Act, 1872',
      section: 'Sections 72–75',
      label: 'Contract Performance & Remedies',
      whenApplicable:
        'May apply where the utility company breached its obligation to provide accurate billing or failed to correct errors promptly.',
      plainEnglishExplanation:
        'Utilities are bound to deliver correct bills. This section covers your right to compensation for billing errors.',
    },
    {
      lawName: 'Consumer Protection Act, 2019',
      section: 'Sections 2(47) & 18',
      label: 'Deficiency in Service',
      whenApplicable:
        'May apply if the utility company failed to provide accurate metering, billing, or customer service related to the error.',
      plainEnglishExplanation:
        'Consumer law protects you against defective utility services. Overcharging due to meter faults or billing errors qualifies.',
    },
  ],

  'breach-of-service-contract': [
    {
      lawName: 'Indian Contract Act, 1872',
      section: 'Sections 55–75',
      label: 'Breach of Service Obligations & Damages',
      whenApplicable:
        'May apply when a service provider fails to deliver services as promised in the agreement (scope, quality, timeline).',
      plainEnglishExplanation:
        'The foundation for service disputes. Covers what you can claim when someone doesn\'t deliver what they promised.',
    },
    {
      lawName: 'Consumer Protection Act, 2019',
      section: 'Sections 2(47) & 18',
      label: 'Deficiency in Service',
      whenApplicable:
        'May apply if the service fell short of acceptable quality standards or was unsafe, misleading, or unfairly restrictive.',
      plainEnglishExplanation:
        'Consumer law protects you from poor service. If the provider knew it was substandard, you have strong grounds.',
    },
    {
      lawName: 'Indian Contract Act, 1872',
      section: 'Section 73',
      label: 'Liquidated Damages & Penalties',
      whenApplicable:
        'May apply if the contract specified penalty clauses or damages for non-performance; these are often enforceable.',
      plainEnglishExplanation:
        'If the contract included a penalty for delays or failures, that penalty is usually enforceable by courts.',
    },
  ],

  'consumer-fraud': [
    {
      lawName: 'Consumer Protection Act, 2019',
      section: 'Sections 2(47) & 18',
      label: 'Unfair Trade Practices & False Claims',
      whenApplicable:
        'May apply where a business made misleading claims, false promises, or deceptive selling practices to induce purchase.',
      plainEnglishExplanation:
        'This is the primary law for fraud. It covers misleading ads, fake promises, or misrepresented product quality.',
    },
    {
      lawName: 'Indian Penal Code',
      section: 'Sections 420–429',
      label: 'Criminal Cheating & Fraud',
      whenApplicable:
        'May be invoked if deliberate fraud with criminal intent can be proven, potentially triggering criminal prosecution.',
      plainEnglishExplanation:
        'Serious fraud may be criminal, not just civil. This can result in police cases and penalties beyond compensation.',
    },
    {
      lawName: 'Bharatiya Nyaya Sanhita, 2023',
      section: 'Sections 318–337',
      label: 'Misrepresentation & Fraud (Updated)',
      whenApplicable:
        'May apply under new criminal law where false statements, omissions, or deception caused financial loss.',
      plainEnglishExplanation:
        'The new criminal code covers fraud with updated definitions. It strengthens protections for defrauded consumers.',
    },
  ],

  'wrongful-termination': [
    {
      lawName: 'Indian Labour Code, 2023',
      section: 'Sections 43–48',
      label: 'Unfair Dismissal & Retrenchment',
      whenApplicable:
        'May apply if termination lacked proper notice, due process, or valid cause as defined by labour law.',
      plainEnglishExplanation:
        'Labour law protects workers from arbitrary firing. Employers must follow procedures and provide valid reasons.',
    },
    {
      lawName: 'Indian Contract Act, 1872',
      section: 'Sections 55–75',
      label: 'Breach of Service Contract',
      whenApplicable:
        'May apply if the employment contract was terminated in violation of agreed terms, notice period, or severance.',
      plainEnglishExplanation:
        'Employment is a contract. If the employer broke its terms, you may claim damages for lost wages and benefits.',
    },
    {
      lawName: 'Industrial Disputes Act, 1947',
      section: 'Sections 10–17',
      label: 'Unfair Labour Practices',
      whenApplicable:
        'May apply if termination was retaliatory, discriminatory, or based on union activities or protected disclosures.',
      plainEnglishExplanation:
        'Labour law protects workers from retaliation. If you were fired for whistleblowing or union work, strong protection applies.',
    },
    {
      lawName: 'Bharatiya Nyaya Sanhita, 2023',
      section: 'Sections 356–376',
      label: 'Criminal Intimidation & Harassment (Optional)',
      whenApplicable:
        'May apply if termination was accompanied by threats, harassment, or coercion.',
      plainEnglishExplanation:
        'If firing was done abusively or with threats, criminal law may apply alongside employment law remedies.',
    },
  ],

  // Tier B: Medium complexity (1–3 mappings each)

  'faulty-secondary-market-sale': [
    {
      lawName: 'Consumer Protection Act, 2019',
      section: 'Section 2(47)',
      label: 'Defective Goods & Misrepresentation',
      whenApplicable:
        'May apply if the goods sold had undisclosed defects, hidden damage, or were misrepresented in quality.',
      plainEnglishExplanation:
        'Consumer law covers faulty products in secondary sales. Sellers must disclose major defects.',
    },
    {
      lawName: 'Indian Contract Act, 1872',
      section: 'Sections 55–60',
      label: 'Warranty of Fitness & Title',
      whenApplicable:
        'May apply if the seller implied fitness for purpose that the goods did not meet, or title was disputed.',
      plainEnglishExplanation:
        'When goods are sold, there\'s an implied promise they work as expected. Faulty goods breach this promise.',
    },
  ],

  'small-scale-property-damage': [
    {
      lawName: 'Indian Tort Law',
      section: 'Negligence principles',
      label: 'Negligence & Liability',
      whenApplicable:
        'May apply where the damage-causer failed to exercise reasonable care, resulting in property loss.',
      plainEnglishExplanation:
        'Tort law covers damage caused by carelessness. If someone was negligent and you suffered loss, they may owe compensation.',
    },
    {
      lawName: 'Indian Contract Act, 1872',
      section: 'Section 73',
      label: 'Damages for Breach',
      whenApplicable:
        'May apply if damage resulted from breach of a service contract, purchase agreement, or rental terms.',
      plainEnglishExplanation:
        'If damage happened because someone broke a contract with you, you can claim repair or replacement costs.',
    },
  ],

  'general-negligence': [
    {
      lawName: 'Indian Tort Law',
      section: 'Negligence principles',
      label: 'Duty of Care & Breach',
      whenApplicable:
        'May apply where a defendant owed you a duty of care, breached it through unreasonable conduct, and caused injury.',
      plainEnglishExplanation:
        'Negligence is the foundation for injury claims. Courts look at whether someone acted carelessly and you were harmed.',
    },
    {
      lawName: 'Indian Penal Code',
      section: 'Section 337–338',
      label: 'Criminal Negligence (Optional)',
      whenApplicable:
        'May apply if negligence was severe enough to constitute criminal wrongdoing, warranting police action.',
      plainEnglishExplanation:
        'Extreme negligence can be criminal. If it endangered public safety, criminal charges may apply.',
    },
  ],

  'workplace-harassment': [
    {
      lawName: 'Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013',
      section: 'Sections 3–5',
      label: 'Protection Against Sexual Harassment',
      whenApplicable:
        'May apply if harassment was sexual in nature; this law mandates workplace safety and disciplinary action.',
      plainEnglishExplanation:
        'If harassment is sexual, this law requires employers to take action and support victims.',
    },
    {
      lawName: 'Indian Labour Code, 2023',
      section: 'Sections 2–5',
      label: 'Workplace Safety & Dignity',
      whenApplicable:
        'May apply for non-sexual harassment, hostile work environment, or dignity violations.',
      plainEnglishExplanation:
        'Labour law protects workers from a hostile work environment. Harassment of any kind is prohibited.',
    },
  ],

  // Tier C: Specialized, emerging (1–2 mappings each)

  'cyber-crime': [
    {
      lawName: 'Information Technology Act, 2000',
      section: 'Sections 66–72',
      label: 'Cybercrimes & Data Breaches',
      whenApplicable:
        'May apply for unauthorized access, data theft, hacking, phishing, or online fraud.',
      plainEnglishExplanation:
        'IT law covers digital crimes. Hacking, identity theft, and unauthorized data access fall here.',
    },
    {
      lawName: 'Bharatiya Nyaya Sanhita, 2023',
      section: 'Sections 318–337',
      label: 'Fraud & Misrepresentation (Digital)',
      whenApplicable:
        'May apply if online fraud, fake websites, or digital impersonation was involved.',
      plainEnglishExplanation:
        'New criminal code covers digital fraud more comprehensively. Protections for online victims are stronger.',
    },
  ],

  'vehicle-dispute': [
    {
      lawName: 'Consumer Protection Act, 2019',
      section: 'Sections 2(47) & 18',
      label: 'Defective Vehicle & Manufacturer Liability',
      whenApplicable:
        'May apply if the vehicle has manufacturing defects, safety issues, or warranty breaches.',
      plainEnglishExplanation:
        'Consumer law requires vehicles to be safe and functional. Manufacturers can be held liable for defects.',
    },
    {
      lawName: 'Motor Vehicles Act, 1988',
      section: 'Sections 163–174',
      label: 'Insurance & Third-Party Liability',
      whenApplicable:
        'May apply for accident claims, insurance disputes, or third-party liability in road incidents.',
      plainEnglishExplanation:
        'Motor law covers vehicle accidents, insurance claims, and liability. It determines who pays for damage.',
    },
  ],

  'simple-criminal-law': [
    {
      lawName: 'Bharatiya Nyaya Sanhita, 2023',
      section: 'Various sections',
      label: 'Criminal Offenses & Penalties',
      whenApplicable:
        'Applies to criminal accusations; the applicable section depends on the specific offense alleged.',
      plainEnglishExplanation:
        'Criminal law covers offenses against public order. Your specific charges determine which law applies.',
    },
  ],
};

/**
 * Helper: Get legal mappings by case type
 * Used throughout the app for filtering and retrieval
 */
export const getLegalMappingsByCaseType = (
  caseType: DisputeType
): ApplicableLaw[] => {
  return LEGAL_MAPPINGS[caseType] ?? [];
};
