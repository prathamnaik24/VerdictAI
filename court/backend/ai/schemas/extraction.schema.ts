// Extraction schema
export const extractionSchema = {
  type: 'object',
  properties: {
    claims: { type: 'array', items: { type: 'string' } },
    facts: { type: 'array', items: { type: 'string' } },
    evidence: { type: 'array', items: { type: 'string' } },
    parties: { type: 'array', items: { type: 'string' } },
  },
  required: ['claims', 'facts', 'evidence'],
};
