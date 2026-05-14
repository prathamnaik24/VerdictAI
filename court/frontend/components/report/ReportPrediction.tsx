'use client';

import type { ReportData } from '@/shared/types/report.types';
import {
  confidenceBadge,
  riskBadge,
} from '@/frontend/lib/reportFormatter';
import { ReportSection } from './ReportSection';

interface ReportPredictionProps {
  report: ReportData;
}

export function ReportPrediction({ report }: ReportPredictionProps) {
  const { assessment } = report;
  const confidence = confidenceBadge(assessment.confidence);
  const risk = riskBadge(assessment.practicalRisk);

  return (
    <ReportSection title="Legal Direction Assessment">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-navy/[0.04] rounded-lg p-4">
<p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
             Likely Direction
           </p>
          <p className="text-xl font-bold text-navy">
            {assessment.predictedDirection}
          </p>
        </div>
        <div className="bg-navy/[0.04] rounded-lg p-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
            Confidence
          </p>
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${confidence.color}`}
          >
            {confidence.label}
          </span>
        </div>
        <div className="bg-navy/[0.04] rounded-lg p-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
            Practical Risk
          </p>
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${risk.color}`}
          >
            {risk.label}
          </span>
        </div>
      </div>
    </ReportSection>
  );
}
