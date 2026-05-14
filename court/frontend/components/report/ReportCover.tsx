'use client';

import clsx from 'clsx';
import type { ReportData } from '@/shared/types/report.types';
import {
  formatReportDate,
  readinessLevel,
} from '@/frontend/lib/reportFormatter';
import { getReadinessDescription } from '@/frontend/lib/reportHelpers';

interface ReportCoverProps {
  report: ReportData;
}

export function ReportCover({ report }: ReportCoverProps) {
  const readiness = readinessLevel(report.assessment.readinessScore);

  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
      <div className="bg-navy px-6 md:px-10 py-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-navy font-bold text-sm font-serif">
            V
          </div>
          <span className="text-white/80 text-sm font-medium tracking-wider uppercase">
            VerdictAI
          </span>
        </div>
      </div>

      <div className="px-6 md:px-10 py-8 md:py-10 text-center">
        <p className="text-xs font-medium text-gold uppercase tracking-[0.15em] mb-3">
          Legal Assessment Report
        </p>

        <h1 className="text-3xl md:text-4xl font-bold text-navy font-serif tracking-tight mb-3">
          {report.matterOverview.title}
        </h1>

        <p className="text-sm text-gray-500 mb-8">
          {report.matterOverview.disputeType} &middot;{' '}
          {report.matterOverview.jurisdiction}
        </p>

        <div className="w-16 h-0.5 bg-gold mx-auto mb-8" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto">
          <div className="bg-offwhite rounded-lg p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
              Readiness
            </p>
            <p
              className={clsx(
                'text-2xl font-bold font-serif',
                readiness.color
              )}
            >
              {report.assessment.readinessScore}%
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {readiness.label}
            </p>
          </div>
          <div className="bg-offwhite rounded-lg p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
              Confidence
            </p>
            <p className="text-2xl font-bold font-serif text-navy">
              {report.assessment.confidence}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">Level</p>
          </div>
          <div className="bg-offwhite rounded-lg p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
              Risk Level
            </p>
            <p className="text-2xl font-bold font-serif text-navy">
              {report.assessment.practicalRisk}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">Assessment</p>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-8">
          Generated {formatReportDate(report.generatedAt)} &middot;{' '}
          {report.reportId}
        </p>
      </div>
    </div>
  );
}
