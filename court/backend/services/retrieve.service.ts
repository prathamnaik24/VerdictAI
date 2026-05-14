import { retrieveCases } from "@/backend/retrieval/retrieveCases";

export async function retrievePrecedents(summary: string) {
  return retrieveCases(summary);
}
