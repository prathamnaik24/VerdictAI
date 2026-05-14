// Shared precedent types
import type { ApplicableLaw } from './legal.types';
import type { DisputeType } from '@/shared/constants/disputeTypes';

export interface PrecedentOutcome {
  direction: 'favorable' | 'unfavorable' | 'mixed';
  summary: string;
}

/**
 * Rich precedent structure
 * Supports:
 * - Legal retrieval and similarity matching
 * - Factor analysis for scoring
 * - Evidence signal extraction
 * - Dashboard rendering
 */
export interface Precedent {
  id: string;
  caseType: DisputeType;
  title: string;
  forum: string;
  year: number;
  factsSummary: string;
  evidenceSignals: string[];
  positiveFactors: string[];
  negativeFactors: string[];
  outcome: PrecedentOutcome;
  applicableLaws: ApplicableLaw[];
  tags: string[];
  relevanceScore?: number;
  embedding?: number[];
}

export interface RetrievalResult {
  precedents: Precedent[];
  totalFound: number;
  searchQuery: string;
}
