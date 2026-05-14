'use client';

import type { ReportData } from '@/shared/types/report.types';
import { outcomeColor } from '@/frontend/lib/reportFormatter';
import { ReportSection } from './ReportSection';

interface ReportPrecedentsProps {
  report: ReportData;
}

export function ReportPrecedents({ report }: ReportPrecedentsProps) {
  const { precedents } = report;

  return (
<ReportSection
       title="Similar Precedents"
       subtitle={
         precedents.length > 0
           ? `${precedents.length} precedent(s) identified from Indian case law`
           : undefined
       }
     >
       {precedents.length === 0 ? (
         <p className="text-gray-500 italic text-sm">
           No closely matching precedents were found. This may indicate a novel area of law.
         </p>
      ) : (
        <div className="space-y-4">
          {precedents.map((p, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-lg p-4 hover:border-navy/20 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-navy text-sm">
                  {p.title}
                </h3>
                <span
                  className={`text-xs font-medium px-2.5 py-0.5 rounded-full border shrink-0 ml-3 ${outcomeColor(p.outcomeDirection)}`}
                >
                  {p.outcomeDirection}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gold rounded-full transition-all duration-500"
                    style={{ width: p.relevance }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-500 w-12 text-right">
                  {p.relevance}
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {p.summary}
              </p>
            </div>
          ))}
        </div>
      )}
    </ReportSection>
  );
}
