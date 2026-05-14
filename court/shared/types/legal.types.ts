// Legal types for provisions, risks, and evidence

/**
 * Applicable Law Section
 * Represents a specific legal provision that may apply to the case.
 * Powers: "Possible Applicable Provisions" dashboard cards
 */
export interface ApplicableLaw {
  lawName: string;
  section: string;
  label: string;
  whenApplicable: string;
  plainEnglishExplanation: string;
}

/**
 * Practical Risk Score
 * Models non-legal factors affecting litigation outcome
 * NOTE: NOT a legal outcome prediction - models delays, documentation, witnesses, jurisdiction, settlement pressure
 */
export interface PracticalRisk {
  title: string;
  severity: 'low' | 'medium' | 'high';
  explanation: string;
}

/**
 * Evidence Summary
 * Tracks available, missing, and recommended evidence
 * Powers retrieval, assessment, and report generation
 */
export interface EvidenceSummary {
  strength: 'weak' | 'moderate' | 'strong';
  availableEvidence: string[];
  missingEvidence: string[];
  recommendedEvidence: string[];
}
