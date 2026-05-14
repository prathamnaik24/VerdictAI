import type {
  SimulationRequest,
  SimulationResponse,
} from "@/shared/types/simulation.types";

export async function runSimulation(
  request: SimulationRequest
): Promise<SimulationResponse> {
  const response = await fetch("/api/simulate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Simulation request failed");
  }

  return response.json();
}
