'use client';

import clsx from 'clsx';
import { ReactNode } from 'react';

interface ReportMetricCardProps {
  label: string;
  value: string;
  subtitle?: string;
  icon?: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  color?: string;
  className?: string;
}

const trendIcons = {
  up: '\u2191',
  down: '\u2193',
  neutral: '\u2192',
};

const trendColors = {
  up: 'text-emerald-600',
  down: 'text-red-500',
  neutral: 'text-gray-400',
};

export function ReportMetricCard({
  label,
  value,
  subtitle,
  icon,
  trend,
  color = 'text-navy',
  className,
}: ReportMetricCardProps) {
  return (
    <div
      className={clsx(
        'bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-1',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          {label}
        </p>
        {icon && <span className="text-gray-400 shrink-0">{icon}</span>}
      </div>
      <div className="flex items-baseline gap-2">
        <span className={clsx('text-2xl font-bold font-serif', color)}>
          {value}
        </span>
        {trend && (
          <span
            className={clsx(
              'text-sm font-medium',
              trendColors[trend]
            )}
          >
            {trendIcons[trend]}
          </span>
        )}
      </div>
      {subtitle && (
        <p className="text-xs text-gray-500">{subtitle}</p>
      )}
    </div>
  );
}
