import { ReactNode } from 'react';
import clsx from 'clsx';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  icon?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  className,
  icon,
  size = 'lg',
}: SectionHeadingProps) {
  const titleClasses = {
    sm: 'text-xl md:text-2xl',
    md: 'text-2xl md:text-3xl',
    lg: 'text-3xl md:text-4xl lg:text-5xl',
  }[size];

  return (
    <div
      className={clsx(
        'mb-10 md:mb-14',
        centered && 'text-center',
        className
      )}
    >
      {icon && (
        <div className="flex justify-center mb-3 text-gold">{icon}</div>
      )}
      <h2
        className={clsx(
          'font-serif font-semibold text-navy tracking-tight',
          titleClasses
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={clsx(
            'text-sm md:text-base text-navy/60 max-w-2xl mx-auto leading-relaxed mt-2',
            centered ? 'mx-auto' : ''
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
