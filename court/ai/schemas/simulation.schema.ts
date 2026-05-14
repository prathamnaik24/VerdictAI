// Simulation schema
export const simulationSchema = {
  type: 'object',
  properties: {
    opposingArgument: { type: 'string' },
    challengeQuestion: { type: 'string' },
    precedentReference: { type: 'string' },
    feedback: { type: 'string' },
  },
  required: ['opposingArgument', 'challengeQuestion'],
};
