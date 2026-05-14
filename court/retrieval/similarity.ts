// Similarity calculation
export const cosineSimilarity = (vec1: number[], vec2: number[]): number => {
  if (vec1.length === 0 || vec2.length === 0) return 0;

  const dotProduct = vec1.reduce((sum, a, i) => sum + a * vec2[i], 0);
  const mag1 = Math.sqrt(vec1.reduce((sum, a) => sum + a * a, 0));
  const mag2 = Math.sqrt(vec2.reduce((sum, a) => sum + a * a, 0));

  if (mag1 === 0 || mag2 === 0) return 0;
  return dotProduct / (mag1 * mag2);
};

export const findSimilarCases = (
  queryEmbedding: number[],
  precedentEmbeddings: Array<{ id: string; embedding: number[] }>
): Array<{ id: string; similarity: number }> => {
  return precedentEmbeddings
    .map((p) => ({ id: p.id, similarity: cosineSimilarity(queryEmbedding, p.embedding) }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 10);
};
