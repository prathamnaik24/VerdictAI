'use client';

import { useState, useCallback } from 'react';
import type { DemoCaseType } from '@/frontend/lib/demoHelpers';
import { getRandomDemoCaseType, getDemoReport } from '@/frontend/lib/demoHelpers';
import type { ReportData } from '@/shared/types/report.types';

export function useDemoData() {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<ReportData | null>(null);
  const [error, setError] = useState<string>('');

  const loadDemo = useCallback((caseType?: DemoCaseType): ReportData | undefined => {
    setLoading(true);
    setError('');
    try {
      const type = caseType || getRandomDemoCaseType();
      const demoReport = getDemoReport(type);
      if (!demoReport) {
        throw new Error('Demo report data is unavailable');
      }
      setReport(demoReport);
      return demoReport;
    } catch (err) {
      setReport(null);
      setError(err instanceof Error ? err.message : 'Failed to load demo case');
      return undefined;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError('');
  }, []);

  return { loading, report, error, loadDemo, clearError };
}
