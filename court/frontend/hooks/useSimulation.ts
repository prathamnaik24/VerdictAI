'use client'

import { useState } from "react";
import { runSimulation } from "@/frontend/services/simulation.service";
import type {
  SimulationRequest,
  SimulationResponse,
} from "@/shared/types/simulation.types";

export type SimulationPhase =
  | "idle"
  | "rebuttal"
  | "judge"
  | "evaluation"
  | "complete";

const PHASE_LABELS: Record<SimulationPhase, string> = {
  idle: "",
  rebuttal: "Generating opposing counsel response...",
  judge: "Preparing judge's clarification...",
  evaluation: "Evaluating argument quality...",
  complete: "",
};

export function useSimulation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorContext, setErrorContext] = useState<{
    isRetryable: boolean;
    code?: string;
  } | null>(null);
  const [result, setResult] = useState<SimulationResponse | null>(null);
  const [phase, setPhase] = useState<SimulationPhase>("idle");

  async function runCourtroomSimulation(request: SimulationRequest) {
    try {
      setLoading(true);
      setError(null);
      setErrorContext(null);
      setResult(null);

      setPhase("rebuttal");
      await new Promise((r) => setTimeout(r, 300));

      setPhase("judge");
      await new Promise((r) => setTimeout(r, 300));

      setPhase("evaluation");
      await new Promise((r) => setTimeout(r, 300));

      const response = await runSimulation(request);

      setResult(response);
      setPhase("complete");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Simulation failed");
        setErrorContext({
          isRetryable: (err as any).isRetryable ?? false,
          code: (err as any).code,
        });
      } else {
        setError("Simulation failed");
        setErrorContext({ isRetryable: true });
      }
      console.warn("[useSimulation] Error:", err);
      setPhase("idle");
    } finally {
      setLoading(false);
    }
  }

  async function retry(request: SimulationRequest) {
    setError(null);
    setErrorContext(null);
    setResult(null);
    setPhase("idle");
    return runCourtroomSimulation(request);
  }

  return {
    loading,
    error,
    errorContext,
    result,
    phase,
    phaseLabel: PHASE_LABELS[phase],
    runCourtroomSimulation,
    retry,
  };
}