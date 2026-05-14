// Extract service - wraps AI extraction
import { callOpenAI } from '@/backend/ai/openai';
import { extractionPrompt } from '@/backend/ai/prompts/extraction.prompt';

export const extractCase = async (caseDescription: string): Promise<any> => {
  console.log('[Backend] Extracting case information');
  
  // TODO: Call OpenAI with extraction prompt
  const result = await callOpenAI(extractionPrompt);
  
  return {
    claims: [],
    facts: [],
    evidence: [],
    summary: result,
  };
};
