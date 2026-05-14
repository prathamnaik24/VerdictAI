// Phase 7 — Judge Question Generator
// Single responsibility: take case details + opening statement → return ONE judicial question.
// Lower temperature than opposing counsel — judges sound stable and precise, not creative.

import { getOpenAI } from "@/backend/ai/openai";
import {
  simulationSystemPrompt,
  buildJudgeQuestionPrompt,
} from "@/backend/ai/prompts/simulation.prompt";

export async function generateJudgeQuestion(
  caseType: string,
  caseDescription: string,
  openingStatement: string
): Promise<string> {
  try {
    const openai = getOpenAI();

    const prompt = buildJudgeQuestionPrompt(
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

      // temperature 0.4 — lower than opposing counsel.
      // A judge should sound logical and precise, not creative.
      temperature: 0.4,

      // 80 tokens = ~60 words — one sharp, focused question, nothing more.
      max_tokens: 80,
    });

    return (
      response.choices[0]?.message?.content?.trim() ||
      "Can additional evidence be provided to support this position?"
    );
  } catch (error) {
    console.error("[Simulation] Judge question generation error:", error);

    // Graceful fallback — demo never breaks on API failure
    return "What evidence most strongly supports the presented argument?";
  }
}
