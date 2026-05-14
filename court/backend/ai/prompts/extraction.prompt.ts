const SUPPORTED_DISPUTES = [
  "security-deposit-dispute",
  "unpaid-personal-loan",
  "utility-billing-error",
  "breach-of-service-contract",
  "consumer-fraud",
  "wrongful-termination",
  "faulty-secondary-market-sale",
  "small-scale-property-damage",
  "general-negligence",
  "workplace-harassment",
  "cyber-crime",
  "vehicle-dispute",
  "simple-criminal-law",
];

export function buildExtractionPrompt(rawFacts: string) {
  return `
You are an AI legal intake classifier for an educational legal-tech platform.

Your task:
- classify the dispute
- summarize facts
- identify evidence signals
- identify missing information
- output STRICT JSON ONLY

Rules:
- Do not provide legal advice
- Do not mention morality, politics, religion, caste, or corruption
- Legal considerations must be suggestive only
- Keep summaries concise
- Be conservative when uncertain

Supported dispute types:
${SUPPORTED_DISPUTES.join(", ")}

Return ONLY valid JSON.

Required JSON schema:

{
  "disputeType": "string",
  "classificationConfidence": number,
  "factsSummary": "string",
  "parties": [
    {
      "role": "string",
      "name": "string"
    }
  ],
  "evidenceSignals": ["string"],
  "timelineClarity": "clear | partial | unclear",
  "allegedHarm": "string",
  "requestedRemedy": "string",
  "riskFlags": ["string"],
  "legalConsiderations": ["string"],
  "missingInformation": ["string"]
}

User facts:
"""
${rawFacts}
"""
`;
}

export { SUPPORTED_DISPUTES };
