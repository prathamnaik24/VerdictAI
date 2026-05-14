'use client';

import type { ReportData } from '@/shared/types/report.types';
import { ReportSection } from './ReportSection';
import { EmptyState } from '@/frontend/components/common/EmptyState';
import { getEmptyStatePreset } from '@/frontend/lib/emptyStatePresets';

interface ReportFallbackProps {
  report: ReportData;
  missingSections?: string[];
}

export function ReportFallback({ report, missingSections }: ReportFallbackProps) {
  return (
    <div className="space-y-4">
      {missingSections && missingSections.length > 0 && (
<ReportSection title="Incomplete Sections" titleSize="sm">
           <div className="bg-amber-50/60 border border-amber-200 rounded-lg p-4">
             <p className="text-sm text-amber-800 font-medium mb-1">
               Some sections could not be fully generated
             </p>
             <p className="text-sm text-amber-700">
               The following sections require additional information: {missingSections.join(', ')}.
             </p>
          </div>
        </ReportSection>
      )}

      {report.favorableFactors.length === 0 &&
        report.unfavorableFactors.length === 0 &&
        report.missingEvidence.length === 0 && (
          <ReportSection title="Factor Analysis" titleSize="md">
            <EmptyState {...getEmptyStatePreset('noFavorableFactors')} variant="inline" />
          </ReportSection>
        )}

      {report.precedents.length === 0 && (
        <ReportSection title="Precedent Analysis" titleSize="md">
          <EmptyState {...getEmptyStatePreset('noPrecedents')} variant="inline" />
        </ReportSection>
      )}

      {report.simulationFeedback.overallPerformance === 'Simulation not completed' && (
        <ReportSection title="Simulation Feedback" titleSize="md">
          <EmptyState {...getEmptyStatePreset('noSimulations')} variant="inline" />
        </ReportSection>
      )}
    </div>
  );
}
