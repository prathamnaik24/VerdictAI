// Assessment hook
'use client';

import { useState } from 'react';
import { assessCase } from '@/services/assessment.service';

export const useAssessment = () => {
  const [assessment, setAssessment] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runAssessment = async (caseType: string, caseDetails: any) => {
    setLoading(true);
    setError(null);
    try {
      const result = await assessCase(caseType as any, caseDetails);
      setAssessment(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Assessment failed');
    } finally {
      setLoading(false);
    }
  };

  return { assessment, loading, error, runAssessment };
};
