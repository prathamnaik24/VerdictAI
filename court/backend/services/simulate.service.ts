// Phase 7 — Simulation Orchestrator
// Single service that runs the full courtroom simulation pipeline.
// Keeps the three AI calls (rebuttal → judge question → evaluation) in one place
// so the API route stays thin and the logic stays testable.

import { generateOpposingCounselResponse } from "@/backend/simulation/opposingCounsel";
import { generateJudgeQuestion } from "@/backend/simulation/judgeQuestions";
import { evaluateArgument } from "@/backend/simulation/evaluator";
import type {
  SimulationRequest,
  SimulationResponse,
} from "@/shared/types/simulation.types";

export async function simulateCourtroom(
  request: SimulationRequest
): Promise<SimulationResponse> {
  try {
    const { caseType, caseDescription, openingStatement } = request;

    const opposingCounsel = await generateOpposingCounselResponse(
      caseType,
      caseDescription,
      openingStatement
    );

    const judgeQuestion = await generateJudgeQuestion(
      caseType,
      caseDescription,
      openingStatement
    );

    const feedback = await evaluateArgument(
      openingStatement,
      opposingCounsel
    );

    return {
      opposingCounsel,
      judgeQuestion,
      feedback: {
        strongestPoint: feedback.strongestPoint,
        weakestPoint: feedback.weakestPoint,
        improvementSuggestion: feedback.improvementSuggestion,
        argumentScore: feedback.argumentScore,
      },
    };
  } catch (error) {
    console.error("[Simulation] Orchestrator error:", error);

    return {
      opposingCounsel: "The opposing counsel challenges the presented argument.",
      judgeQuestion: "What evidence supports the key claims in this case?",
      feedback: {
        strongestPoint: "The argument presents a clear position.",
        weakestPoint: "Supporting evidence could be strengthened.",
        improvementSuggestion: "Include more specific documentation and references.",
        argumentScore: 60,
      },
    };
  }
}
