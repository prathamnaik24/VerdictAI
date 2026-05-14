// Shared simulation types
export interface SimulationInput {
  caseType: string;
  facts: string;
  userStatement: string;
}

export interface SimulationOutput {
  opposingArgument: string;
  judgeQuestion: string;
  feedback: string;
}
