import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";

import { generateEmbedding } from "@/backend/retrieval/embed";

// Load .env.local
dotenv.config({ path: path.join(process.cwd(), ".env.local") });

async function main() {
  const precedentsPath = path.join(process.cwd(), "dataset", "precedents.json");

  const raw = await fs.readFile(precedentsPath, "utf-8");

  const precedents = JSON.parse(raw);

  const embedded = [];

  for (const precedent of precedents) {
    console.log(`Embedding: ${precedent.title}`);

    const embedding = await generateEmbedding(precedent.factsSummary);

    embedded.push({
      id: precedent.id,
      embedding,
    });
  }

  const outputPath = path.join(
    process.cwd(),
    "dataset",
    "precedentEmbeddings.json"
  );

  await fs.writeFile(
    outputPath,
    JSON.stringify(embedded, null, 2)
  );

  console.log("Embeddings generated successfully");
}

main();
