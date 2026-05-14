'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';

interface ReportSectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  titleSize?: 'sm' | 'md' | 'lg';
}

export function ReportSection({
  title,
  subtitle,
  children,
  className,
  titleSize = 'lg',
}: ReportSectionProps) {
  const titleClasses = {
    sm: 'text-lg font-semibold',
    md: 'text-xl font-semibold',
    lg: 'text-2xl font-bold',
  }[titleSize];

  return (
    <section
      className={clsx(
        'border border-gray-200 rounded-lg bg-white p-6 md:p-8',
        className
      )}
    >
      <h2
        className={clsx(
          'text-navy font-serif tracking-tight',
          titleClasses
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      )}
      <div className={clsx('mt-5', className)}>{children}</div>
    </section>
  );
}
