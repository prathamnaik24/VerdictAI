'use client';

import { useState, useCallback } from 'react';
import { generateReport } from '@/frontend/services/report.service';
import type { ReportData, ReportGenerationRequest } from '@/shared/types/report.types';

export function useReport() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<ReportData | null>(null);

  const fetchReport = useCallback(
    async (input: ReportGenerationRequest) => {
      setLoading(true);
      setError(null);
      try {
        const data = await generateReport(input);
        setReport(data);
        return data;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Failed to generate report';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setReport(null);
    setError(null);
    setLoading(false);
  }, []);

  return { loading, error, report, fetchReport, reset };
}
