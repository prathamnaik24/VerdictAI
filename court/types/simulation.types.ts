// Simulation type definitions
export interface SimulationRound {
  roundNumber: number;
  userStatement: string;
  opposingCounselResponse: string;
  judgeQuestion?: string;
  feedback?: string;
}

export interface SimulationSession {
  id: string;
  caseId: string;
  rounds: SimulationRound[];
  status: 'in-progress' | 'completed';
  startedAt: Date;
  completedAt?: Date;
}
