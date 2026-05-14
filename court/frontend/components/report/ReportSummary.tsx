'use client';

import type { ReportData } from '@/shared/types/report.types';
import { formatShortDate } from '@/frontend/lib/reportFormatter';
import { ReportSection } from './ReportSection';

interface ReportSummaryProps {
  report: ReportData;
}

export function ReportSummary({ report }: ReportSummaryProps) {
  return (
    <ReportSection title="Matter Overview">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-100">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Case Title
          </p>
          <p className="font-medium text-navy mt-0.5">
            {report.matterOverview.title}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Jurisdiction
          </p>
          <p className="font-medium text-navy mt-0.5">
            {report.matterOverview.jurisdiction}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Incident Date
          </p>
          <p className="font-medium text-navy mt-0.5">
            {formatShortDate(report.matterOverview.incidentDate)}
          </p>
        </div>
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
          Facts Summary
        </p>
        <p className="text-gray-700 leading-relaxed">
          {report.factsSummary}
        </p>
      </div>
    </ReportSection>
  );
}
