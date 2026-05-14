// Assessment hook with comprehensive state management
'use client';

import { useEffect, useState } from 'react';
import { useCaseStore } from '@/store/useCaseStore';
import { fetchCombinedAssessment } from '@/services/assessment.service';
import type { AssessmentOutput, ScoringOutput } from '@/shared/types/assessment.types';

interface FullAssessmentState {
  extraction: any;
  scoring: ScoringOutput;
  precedents: any[];
  combined: AssessmentOutput;
}

export const useAssessment = () => {
  const currentCase = useCaseStore((state) => state.currentCase);
  const [assessment, setAssessment] = useState<FullAssessmentState | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Trigger full assessment pipeline when currentCase changes
   */
  useEffect(() => {
    if (currentCase && currentCase.description) {
      runAssessment();
    }
  }, [currentCase?.id]);

  /**
   * Run complete assessment: extract → score → retrieve
   */
  const runAssessment = async () => {
    if (!currentCase) return;

    setLoading(true);
    setError(null);
    try {
      const result = await fetchCombinedAssessment(
        currentCase.disputeType,
        {
          title: currentCase.title,
          description: currentCase.description,
          evidence: [], // TODO: Extract from current case if available
          timeline: '',
          amountInvolved: 0,
          location: currentCase.location,
          desiredOutcome: '',
        }
      );

      setAssessment(result as FullAssessmentState);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Assessment failed';
      setError(errorMessage);
      console.error('Assessment error:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get the combined assessment data (what components use)
   */
  const getAssessmentData = () => assessment?.combined || null;

  /**
   * Get raw scoring output
   */
  const getScoringData = () => assessment?.scoring || null;

  /**
   * Get precedent data (top 3)
   */
  const getTopPrecedents = (limit = 3) => (assessment?.precedents || []).slice(0, limit);

  return {
    assessment: getAssessmentData(),
    scoring: getScoringData(),
    precedents: getTopPrecedents(),
    loading,
    error,
    runAssessment,
    currentCase,
  };
};
