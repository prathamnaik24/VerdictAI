'use client';

import { useState, useCallback } from 'react';
import { generateReport } from '@/frontend/services/report.service';
import type { ReportData, ReportGenerationRequest } from '@/shared/types/report.types';
import { getDemoReport, sanitizeReport } from '@/frontend/lib/demoHelpers';

export function useSafeReport() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<ReportData | null>(null);
  const [isDemo, setIsDemo] = useState(false);

  const fetchReportSafe = useCallback(
    async (input: ReportGenerationRequest) => {
      setLoading(true);
      setError(null);
      setReport(null);
      setIsDemo(false);

      try {
        const data = await generateReport(input);
        setReport(data);
        return data;
      } catch {
        const demoReport = getDemoReport();
        setReport(demoReport);
        setIsDemo(true);
        setError(null);
        return demoReport;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const loadDemoFallback = useCallback((reportData?: ReportData) => {
    const demo = reportData || getDemoReport();
    setReport(demo);
    setIsDemo(true);
    setError(null);
    return demo;
  }, []);

  const loadPartialReport = useCallback((partial: Partial<ReportData>) => {
    const sanitized = sanitizeReport(partial);
    setReport(sanitized);
    setIsDemo(true);
    setError(null);
    return sanitized;
  }, []);

  const reset = useCallback(() => {
    setReport(null);
    setError(null);
    setLoading(false);
    setIsDemo(false);
  }, []);

  return {
    loading,
    error,
    report,
    isDemo,
    fetchReportSafe,
    loadDemoFallback,
    loadPartialReport,
    reset,
  };
}
