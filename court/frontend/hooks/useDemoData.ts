'use client';

import { useState, useCallback } from 'react';
import type { DemoCaseType } from '@/frontend/lib/demoHelpers';
import { getRandomDemoCaseType, getDemoReport } from '@/frontend/lib/demoHelpers';
import type { ReportData } from '@/shared/types/report.types';

export function useDemoData() {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<ReportData | null>(null);

  const loadDemo = useCallback((caseType?: DemoCaseType) => {
    setLoading(true);
    const type = caseType || getRandomDemoCaseType();
    const demoReport = getDemoReport(type);
    setReport(demoReport);
    setLoading(false);
    return demoReport;
  }, []);

  return { loading, report, loadDemo };
}
