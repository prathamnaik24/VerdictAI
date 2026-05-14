// Phase 7 — Argument Evaluator
// Single responsibility: evaluate the user's argument and return structured feedback.
// Uses OpenAI's response_format: json_object for reliable structured output.

import { getOpenAI } from "@/backend/ai/openai";
import {
  simulationSystemPrompt,
  buildEvaluationPrompt,
} from "@/backend/ai/prompts/simulation.prompt";

export async function evaluateArgument(
  openingStatement: string,
  opposingCounsel: string
) {
  try {
    const openai = getOpenAI();

    const prompt = buildEvaluationPrompt(
      openingStatement,
      opposingCounsel
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

      // temperature 0.3 — low creativity for consistent scoring
      temperature: 0.3,

      // 250 tokens covers four structured fields comfortably
      max_tokens: 250,

      // Force JSON output so parsing is reliable
      response_format: {
        type: "json_object",
      },
    });

    const content = response.choices[0]?.message?.content;

    if (!content) {
      throw new Error("Empty evaluation response");
    }

    const parsed = JSON.parse(content);

    return {
      strongestPoint:
        parsed.strongestPoint ||
        "The argument presents a clear factual position.",

      weakestPoint:
        parsed.weakestPoint ||
        "The argument lacks sufficient supporting evidence.",

      improvementSuggestion:
        parsed.improvementSuggestion ||
        "Provide stronger documentation and timeline clarity.",

      argumentScore:
        Number(parsed.argumentScore) || 65,
    };
  } catch (error) {
    console.error("[Simulation] Argument evaluation error:", error);

    // Graceful fallback — demo never breaks on API failure
    return {
      strongestPoint:
        "The argument communicates a clear grievance.",

      weakestPoint:
        "Supporting evidence appears limited.",

      improvementSuggestion:
        "Provide more documentation and factual specificity.",

      argumentScore: 60,
    };
  }
}
