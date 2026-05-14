'use client';

import type { ReportData } from '@/shared/types/report.types';
import { ReportSection } from './ReportSection';

interface ReportNextStepsProps {
  report: ReportData;
}

export function ReportNextSteps({ report }: ReportNextStepsProps) {
  return (
<ReportSection title="Recommended Next Steps">
       {report.nextSteps.length === 0 ? (
         <p className="text-gray-500 italic text-sm">
           No specific recommendations available at this time.
         </p>
      ) : (
        <ol className="space-y-3">
          {report.nextSteps.map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-navy text-white text-sm font-semibold shrink-0 mt-0.5 font-serif">
                {i + 1}
              </span>
              <span className="text-sm text-gray-700 pt-1 leading-relaxed">
                {step}
              </span>
            </li>
          ))}
        </ol>
      )}
    </ReportSection>
  );
}
