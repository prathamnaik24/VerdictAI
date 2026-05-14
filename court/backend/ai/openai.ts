// OpenAI client setup
import { OpenAI } from 'openai';

let cachedOpenAI: OpenAI | null = null;

export const getOpenAI = () => {
  if (!cachedOpenAI) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY environment variable is not set');
    }
    cachedOpenAI = new OpenAI({ apiKey });
  }
  return cachedOpenAI;
};

export const callOpenAI = async (
  prompt: string,
  model: string = 'gpt-4o-mini'
): Promise<string> => {
  // TODO: Implement real OpenAI API call
  console.log('[OpenAI] Placeholder call:', { prompt, model });
  return 'Placeholder response from OpenAI';
};

export const generateEmbedding = async (text: string): Promise<number[]> => {
  // TODO: Implement real embedding generation
  console.log('[OpenAI] Placeholder embedding for:', text.substring(0, 50));
  return [];
};
