import { ExtractionResult } from "@/shared/types/extraction.types";

function anonymizeText(text: string) {
  return text
    .replace(/\b[A-Z][a-z]+\s[A-Z][a-z]+\b/g, "[REDACTED_PERSON]")
    .replace(/\b\d{10}\b/g, "[REDACTED_PHONE]")
    .replace(/\S+@\S+\.\S+/g, "[REDACTED_EMAIL]");
}

export function anonymizeExtraction(
  data: ExtractionResult
): ExtractionResult {
  return {
    ...data,

    factsSummary: anonymizeText(data.factsSummary),

    allegedHarm: anonymizeText(data.allegedHarm),

    requestedRemedy: anonymizeText(data.requestedRemedy),

    parties: data.parties.map((party) => ({
      ...party,
      name: "[REDACTED]",
    })),

    anonymized: true,
  };
}
