export interface ExtractionRequest {
  rawFacts: string;
  privacyMode?: boolean;
  disputeHint?: string;
}

export interface ExtractedParty {
  role: string;
  name: string;
}

export interface ExtractionResult {
  disputeType: string;
  classificationConfidence: number;

  factsSummary: string;

  parties: ExtractedParty[];

  evidenceSignals: string[];

  timelineClarity: "clear" | "partial" | "unclear";

  allegedHarm: string;

  requestedRemedy: string;

  riskFlags: string[];

  legalConsiderations: string[];

  missingInformation: string[];

  anonymized: boolean;
}
