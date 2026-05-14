import fs from "fs/promises";
import path from "path";

import { generateEmbedding } from "./embed";
import { cosineSimilarity } from "./similarity";

export async function retrieveCases(summary: string) {
  const precedentsPath = path.join(
    process.cwd(),
    "dataset",
    "precedents.json"
  );

  const embeddingsPath = path.join(
    process.cwd(),
    "dataset",
    "precedentEmbeddings.json"
  );

  const precedentsRaw = await fs.readFile(precedentsPath, "utf-8");

  const precedents = JSON.parse(precedentsRaw);

  let embeddingData = [];

  try {
    const embeddingsRaw = await fs.readFile(embeddingsPath, "utf-8");

    embeddingData = JSON.parse(embeddingsRaw);
  } catch {
    throw new Error(
      "precedentEmbeddings.json missing. Run embedding generator first."
    );
  }

  const inputEmbedding = await generateEmbedding(summary);

  const scored = precedents.map((precedent: any) => {
    const matched = embeddingData.find(
      (e: any) => e.id === precedent.id
    );

    if (!matched) {
      return null;
    }

    const similarity = cosineSimilarity(
      inputEmbedding,
      matched.embedding
    );

    return {
      id: precedent.id,
      title: precedent.title,
      outcome: precedent.outcome,
      summary: precedent.summary,
      similarity,
      reasoning:
        similarity > 0.8
          ? "Strong factual similarity detected"
          : "Moderate factual similarity detected",
    };
  });

  return scored
    .filter(Boolean)
    .sort((a: any, b: any) => b.similarity - a.similarity)
    .slice(0, 5);
}
