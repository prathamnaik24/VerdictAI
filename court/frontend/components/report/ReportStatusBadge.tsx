'use client';

import clsx from 'clsx';

type BadgeVariant =
  | 'confidence-high'
  | 'confidence-moderate'
  | 'confidence-low'
  | 'risk-high'
  | 'risk-moderate'
  | 'evidence-missing'
  | 'ready'
  | 'neutral';

interface ReportStatusBadgeProps {
  label: string;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  'confidence-high':
    'bg-emerald-50 text-emerald-700 border-emerald-200',
  'confidence-moderate':
    'bg-amber-50 text-amber-700 border-amber-200',
  'confidence-low':
    'bg-red-50 text-red-700 border-red-200',
  'risk-high':
    'bg-red-50 text-red-700 border-red-200',
  'risk-moderate':
    'bg-orange-50 text-orange-700 border-orange-200',
  'evidence-missing':
    'bg-amber-50 text-amber-700 border-amber-200',
  ready:
    'bg-emerald-50 text-emerald-700 border-emerald-200',
  neutral:
    'bg-gray-50 text-gray-600 border-gray-200',
};

export function ReportStatusBadge({
  label,
  variant = 'neutral',
  className,
}: ReportStatusBadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border',
        variantStyles[variant],
        className
      )}
    >
      <span
        className={clsx(
          'w-1.5 h-1.5 rounded-full',
          {
            'bg-emerald-500': variant === 'confidence-high' || variant === 'ready',
            'bg-amber-500': variant === 'confidence-moderate' || variant === 'risk-moderate' || variant === 'evidence-missing',
            'bg-red-500': variant === 'confidence-low' || variant === 'risk-high',
            'bg-gray-400': variant === 'neutral',
          }
        )}
      />
      {label}
    </span>
  );
}
