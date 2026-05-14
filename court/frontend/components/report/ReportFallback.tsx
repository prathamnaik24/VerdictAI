'use client';

import type { ReportData } from '@/shared/types/report.types';
import { ReportSection } from './ReportSection';

interface ReportFallbackProps {
  report: ReportData;
  missingSections?: string[];
}

export function ReportFallback({ report, missingSections }: ReportFallbackProps) {
  return (
    <div className="space-y-4">
      {missingSections && missingSections.length > 0 && (
        <ReportSection title="Incomplete Data Notice" titleSize="sm">
          <div className="bg-amber-50/60 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800 font-medium mb-1">
              Some sections are incomplete
            </p>
            <p className="text-sm text-amber-700">
              The following sections could not be fully generated:{' '}
              {missingSections.join(', ')}.
            </p>
          </div>
        </ReportSection>
      )}

      {report.favorableFactors.length === 0 &&
        report.unfavorableFactors.length === 0 &&
        report.missingEvidence.length === 0 && (
          <ReportSection title="Factor Analysis" titleSize="md">
            <p className="text-gray-500 italic text-sm">
              Detailed factor analysis was not available for this case. Please
              review the assessment overview for preliminary insights.
            </p>
          </ReportSection>
        )}

      {report.precedents.length === 0 && (
        <ReportSection title="Precedent Analysis" titleSize="md">
          <p className="text-gray-500 italic text-sm">
            No precedents were retrieved for this case. Consider searching
            for relevant case law manually through legal databases.
          </p>
        </ReportSection>
      )}

      {report.simulationFeedback.overallPerformance === 'Simulation not completed' && (
        <ReportSection title="Simulation Feedback" titleSize="md">
          <p className="text-gray-500 italic text-sm">
            Courtroom simulation was not performed. Run a simulation in the
            simulator to receive feedback on argument strength.
          </p>
        </ReportSection>
      )}
    </div>
  );
}
