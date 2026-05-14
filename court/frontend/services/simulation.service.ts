import type {
  SimulationRequest,
  SimulationResponse,
} from "@/shared/types/simulation.types";
import { fetchWithRetry } from '@/frontend/lib/retryHandler';

export async function runSimulation(
  request: SimulationRequest
): Promise<SimulationResponse> {
  const result = await fetchWithRetry("/api/simulate", {
    method: "POST",
    body: JSON.stringify(request),
  });

  if (!result.ok) {
    const errorMessage = result.error?.userMessage || "Simulation request failed";
    const error = new Error(errorMessage);
    (error as any).code = result.error?.code;
    (error as any).isRetryable = result.error?.isRetryable ?? false;
    throw error;
  }

  // Handle wrapped response format
  if (result.data && typeof result.data === "object") {
    if ("success" in (result.data as any) && !(result.data as any).success) {
      throw new Error(
        (result.data as any).error || "Simulation request failed"
      );
    }
    if ("opposingCounsel" in (result.data as any) || "error" in (result.data as any)) {
      return result.data as SimulationResponse;
    }
  }

  if (!result.data || typeof result.data !== "object") {
    throw new Error("Invalid simulation response");
  }

  return result.data as SimulationResponse;
}