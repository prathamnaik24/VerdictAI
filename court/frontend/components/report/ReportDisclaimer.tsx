'use client';

import type { ReportData } from '@/shared/types/report.types';
import { ReportSection } from './ReportSection';

interface ReportDisclaimerProps {
  report: ReportData;
}

export function ReportDisclaimer({ report }: ReportDisclaimerProps) {
  return (
    <ReportSection title="Important Notice" titleSize="md">
      <div className="space-y-3">
        <p className="text-sm text-gray-600 leading-relaxed">
          {report.privacyNote}
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          {report.disclaimer}
        </p>
      </div>
    </ReportSection>
  );
}
