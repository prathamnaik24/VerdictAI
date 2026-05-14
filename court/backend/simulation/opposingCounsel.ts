// Phase 7 — Opposing Counsel Generator
// Single responsibility: take case details + opening statement → return rebuttal string.
// Kept separate so it can be tuned, mocked, or swapped independently.

import { getOpenAI } from "@/backend/ai/openai";
import {
  simulationSystemPrompt,
  buildOpposingCounselPrompt,
} from "@/backend/ai/prompts/simulation.prompt";

export async function generateOpposingCounselResponse(
  caseType: string,
  caseDescription: string,
  openingStatement: string
): Promise<string> {
  try {
    const openai = getOpenAI();

    const prompt = buildOpposingCounselPrompt(
      caseType,
      caseDescription,
      openingStatement
    );

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",

      messages: [
        {
          role: "system",
          content: simulationSystemPrompt,
        },
        {
          role: "user",
          content: prompt,
        },
      ],

      // temperature 0.5 — controlled creativity, not chaotic
      temperature: 0.5,

      // 150 tokens = ~100 words — keeps rebuttal sharp and demo-fast
      max_tokens: 150,
    });

    return (
      response.choices[0]?.message?.content?.trim() ||
      "The opposing counsel challenges the strength of the presented evidence."
    );
  } catch (error) {
    console.error("[Simulation] Opposing counsel generation error:", error);

    // Graceful fallback — demo never breaks on API failure
    return "The opposing counsel disputes the consistency and supporting evidence of the argument.";
  }
}
