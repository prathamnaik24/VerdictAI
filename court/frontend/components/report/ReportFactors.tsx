'use client';

import { ReportSection } from './ReportSection';

interface ReportFactorsProps {
  title: string;
  factors: string[];
  variant?: 'favorable' | 'unfavorable' | 'neutral';
}

const variantStyles = {
  favorable: {
    accent: 'border-l-emerald-500 bg-emerald-50/40',
    dot: 'bg-emerald-500',
    label: 'Favorable',
  },
  unfavorable: {
    accent: 'border-l-red-400 bg-red-50/40',
    dot: 'bg-red-400',
    label: 'Unfavorable',
  },
  neutral: {
    accent: 'border-l-gray-400 bg-gray-50/50',
    dot: 'bg-gray-400',
    label: 'Neutral',
  },
};

export function ReportFactors({
  title,
  factors,
  variant = 'neutral',
}: ReportFactorsProps) {
  const styles = variantStyles[variant];

  return (
    <ReportSection title={title}>
      {factors.length === 0 ? (
        <p className="text-gray-500 italic text-sm">
          No {variant === 'favorable' ? 'favorable' : variant === 'unfavorable' ? 'unfavorable' : ''} factors identified.
        </p>
      ) : (
        <ul className="space-y-2">
          {factors.map((factor, index) => (
            <li
              key={index}
              className={`flex items-start gap-3 p-3 rounded border-l-2 ${styles.accent}`}
            >
              <span
                className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${styles.dot}`}
              />
              <span className="text-gray-700 text-sm leading-relaxed">
                {factor}
              </span>
            </li>
          ))}
        </ul>
      )}
    </ReportSection>
  );
}
