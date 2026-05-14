'use client';

import clsx from 'clsx';
import type { ReportData } from '@/shared/types/report.types';
import { formatReportDate, readinessLevel } from '@/frontend/lib/reportFormatter';

interface ReportHeaderProps {
  report: ReportData;
}

export function ReportHeader({ report }: ReportHeaderProps) {
  const readiness = readinessLevel(report.assessment.readinessScore);

  return (
    <div className="border-b border-gray-200 pb-8 mb-2">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-navy font-serif tracking-tight">
            Legal Assessment Report
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Report ID: {report.reportId}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xs text-gray-500 uppercase tracking-wider">
            Generated
          </p>
          <p className="text-sm font-medium text-navy whitespace-nowrap">
            {formatReportDate(report.generatedAt)}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between bg-offwhite rounded-lg p-4 border border-gray-100">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider">
            Dispute Type
          </p>
          <p className="font-medium text-navy">
            {report.matterOverview.disputeType}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 uppercase tracking-wider">
            Readiness Score
          </p>
          <p
            className={clsx(
              'font-bold text-lg',
              readiness.color
            )}
          >
            {report.assessment.readinessScore}% — {readiness.label}
          </p>
        </div>
      </div>
    </div>
  );
}
