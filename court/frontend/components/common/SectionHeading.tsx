import { ReactNode } from 'react';
import clsx from 'clsx';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  className,
}: SectionHeadingProps) {
  return (
    <div className={clsx('mb-16', centered && 'text-center', className)}>
      <h2 className="text-5xl md:text-6xl font-serif font-semibold text-navy mb-4 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-navy/70 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
