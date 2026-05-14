'use client';

import clsx from 'clsx';
import { ReportSection } from './ReportSection';

interface EvidenceItem {
  label: string;
  status: 'available' | 'missing' | 'recommended';
}

interface ReportEvidenceChecklistProps {
  available: string[];
  missing: string[];
  recommended?: string[];
  className?: string;
}

const statusConfig = {
  available: {
    icon: '\u2713',
    iconClass: 'text-emerald-600 bg-emerald-50',
    label: 'Available',
    labelClass: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  },
  missing: {
    icon: '\u2717',
    iconClass: 'text-red-500 bg-red-50',
    label: 'Missing',
    labelClass: 'text-red-700 bg-red-50 border-red-200',
  },
  recommended: {
    icon: '\u2605',
    iconClass: 'text-amber-500 bg-amber-50',
    label: 'Recommended',
    labelClass: 'text-amber-700 bg-amber-50 border-amber-200',
  },
};

export function ReportEvidenceChecklist({
  available,
  missing,
  recommended,
  className,
}: ReportEvidenceChecklistProps) {
  const items: EvidenceItem[] = [
    ...available.map((label) => ({ label, status: 'available' as const })),
    ...missing.map((label) => ({ label, status: 'missing' as const })),
    ...(recommended ?? []).map((label) => ({
      label,
      status: 'recommended' as const,
    })),
  ];

if (items.length === 0) {
     return (
       <ReportSection title="Evidence Assessment">
         <p className="text-gray-500 italic text-sm">
           No evidence items recorded. Upload documents to build a complete evidence picture.
         </p>
       </ReportSection>
     );
   }

   return (
     <ReportSection
       title="Evidence Assessment"
      subtitle={`${available.length} available, ${missing.length} missing${recommended ? `, ${recommended.length} recommended` : ''}`}
    >
      <div className="space-y-1.5">
        {items.map((item, i) => {
          const cfg = statusConfig[item.status];
          return (
            <div
              key={i}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg border text-sm transition-colors',
                item.status === 'available' && 'bg-emerald-50/40 border-emerald-100',
                item.status === 'missing' && 'bg-red-50/40 border-red-100',
                item.status === 'recommended' && 'bg-amber-50/40 border-amber-100'
              )}
            >
              <span
                className={clsx(
                  'flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0',
                  cfg.iconClass
                )}
              >
                {cfg.icon}
              </span>
              <span
                className={clsx(
                  'flex-1 text-sm',
                  item.status === 'available' && 'text-gray-700',
                  item.status === 'missing' && 'text-gray-700',
                  item.status === 'recommended' && 'text-gray-700 font-medium'
                )}
              >
                {item.label}
              </span>
              <span
                className={clsx(
                  'text-[10px] font-medium px-2 py-0.5 rounded-full border uppercase tracking-wider shrink-0',
                  cfg.labelClass
                )}
              >
                {cfg.label}
              </span>
            </div>
          );
        })}
      </div>
    </ReportSection>
  );
}
