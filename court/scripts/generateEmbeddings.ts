// Generate embeddings for precedents
// Usage: tsx scripts/generateEmbeddings.ts

import { generateEmbedding } from '../ai/openai';
import precedents from '../dataset/precedents.json';
import fs from 'fs';
import path from 'path';

const generatePrecedentEmbeddings = async () => {
  console.log('Starting embedding generation...');

  // TODO: Implement embedding generation for precedents
  // For now, return empty array

  const embeddings: any[] = [];

  const outputPath = path.join(process.cwd(), 'dataset', 'precedentEmbeddings.json');
  fs.writeFileSync(outputPath, JSON.stringify(embeddings, null, 2));

  console.log('Embeddings generated and saved');
};

generatePrecedentEmbeddings().catch(console.error);
