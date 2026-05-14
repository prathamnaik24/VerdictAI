// Embedding generation
import { generateEmbedding } from '../ai/openai';

export const generateCaseEmbedding = async (caseText: string): Promise<number[]> => {
  return generateEmbedding(caseText);
};

export const preloadEmbeddings = async (): Promise<void> => {
  // TODO: Load precedent embeddings at startup
  console.log('[Retrieval] Preloading embeddings...');
};
