// Explain service - generates explanations
import { callOpenAI } from '@/ai/openai';
import { explanationPrompt } from '@/backend/ai/prompts/explanation.prompt';

export const explainAssessment = async (
  score: number,
  factors: string[]
): Promise<string> => {
  console.log('[Backend] Explaining assessment');
  
  // TODO: Call OpenAI with context about score and factors
  const result = await callOpenAI(explanationPrompt);
  
  return result;
};
