// Shared assessment types
export interface AssessmentInput {
  caseType: string;
  facts: string;
  claims: string;
  evidence: string[];
}

export interface AssessmentOutput {
  score: number;
  factors: string[];
  precedents: string[];
  likelihood?: string;
  confidence?: number;
}
