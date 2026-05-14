// Precedent type definitions
export interface Precedent {
  id: string;
  caseNumber: string;
  title: string;
  court: string;
  year: number;
  summary: string;
  verdict: string;
  relevanceScore?: number;
  embedding?: number[];
}

export interface RetrievalResult {
  precedents: Precedent[];
  totalFound: number;
  searchQuery: string;
}
