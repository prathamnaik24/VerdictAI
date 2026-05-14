import { getOpenAI } from "@/backend/ai/openai";
import { buildExtractionPrompt } from "@/backend/ai/prompts/extraction.prompt";

import { anonymizeExtraction } from "@/backend/utils/anonymize";

import {
  ExtractionRequest,
  ExtractionResult,
} from "@/shared/types/extraction.types";

function createFallbackExtraction(): ExtractionResult {
  return {
    disputeType: "general-negligence",

    classificationConfidence: 20,

    factsSummary:
      "The system could not confidently extract structured case information.",

    parties: [],

    evidenceSignals: [],

    timelineClarity: "unclear",

    allegedHarm: "Not clearly identified.",

    requestedRemedy: "Not clearly identified.",

    riskFlags: ["AI extraction uncertainty"],

    legalConsiderations: ["Further factual review may be required."],

    missingInformation: [
      "Detailed timeline",
      "Supporting evidence",
      "Party identification",
    ],

    anonymized: false,
  };
}

function safeJsonParse(content: string): ExtractionResult | null {
  try {
    const parsed = JSON.parse(content);

    return {
      disputeType: parsed.disputeType || "general-negligence",

      classificationConfidence:
        parsed.classificationConfidence || 0,

      factsSummary:
        parsed.factsSummary || "No summary generated.",

      parties: Array.isArray(parsed.parties)
        ? parsed.parties
        : [],

      evidenceSignals: Array.isArray(parsed.evidenceSignals)
        ? parsed.evidenceSignals
        : [],

      timelineClarity:
        parsed.timelineClarity || "unclear",

      allegedHarm:
        parsed.allegedHarm || "Not identified.",

      requestedRemedy:
        parsed.requestedRemedy || "Not identified.",

      riskFlags: Array.isArray(parsed.riskFlags)
        ? parsed.riskFlags
        : [],

      legalConsiderations: Array.isArray(
        parsed.legalConsiderations
      )
        ? parsed.legalConsiderations
        : [],

      missingInformation: Array.isArray(
        parsed.missingInformation
      )
        ? parsed.missingInformation
        : [],

      anonymized: false,
    };
  } catch {
    return null;
  }
}

export async function extractCaseData(
  input: ExtractionRequest
): Promise<ExtractionResult> {
  try {
    const openai = getOpenAI();

    const prompt = buildExtractionPrompt(
      input.rawFacts
    );

    const response =
      await openai.chat.completions.create({
        model: "gpt-4o-mini",

        temperature: 0.2,

        messages: [
          {
            role: "system",
            content:
              "You are a structured legal intake extraction system.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      });

    const content =
      response.choices[0]?.message?.content;

    if (!content) {
      return createFallbackExtraction();
    }

    const parsed = safeJsonParse(content);

    if (!parsed) {
      return createFallbackExtraction();
    }

    if (input.privacyMode) {
      return anonymizeExtraction(parsed);
    }

    return parsed;
  } catch (error) {
    console.error(
      "Extraction service error:",
      error
    );

    return createFallbackExtraction();
  }
}
