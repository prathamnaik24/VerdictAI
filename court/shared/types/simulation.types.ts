// Phase 7 — Courtroom Simulator shared contract
// Defines exactly what the frontend sends and what the backend returns.

export interface SimulationRequest {
  caseType: string;
  caseTitle: string;
  caseDescription: string;
  openingStatement: string;
}

export interface SimulationResponse {
  opposingCounsel: string;
  judgeQuestion: string;

  feedback: {
    strongestPoint: string;
    weakestPoint: string;
    improvementSuggestion: string;
    argumentScore: number; // 0 – 100
  };
}
