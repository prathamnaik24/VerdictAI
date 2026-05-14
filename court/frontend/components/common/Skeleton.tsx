'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rect' | 'card';
  width?: string | number;
  height?: string | number;
  className?: string;
  lines?: number;
}

export function Skeleton({
  variant = 'text',
  width,
  height,
  className,
  lines,
}: SkeletonProps) {
  if (variant === 'text' && lines) {
    return (
      <div className="space-y-2.5">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="h-3 bg-gray-200/70 dark:bg-gray-700/50 rounded shimmer"
            style={{
              width: i === lines - 1 ? '60%' : `${85 + Math.random() * 15}%`,
            }}
          />
        ))}
      </div>
    );
  }

  const base = 'bg-gray-200/70 dark:bg-gray-700/50 shimmer';

  if (variant === 'circular') {
    return (
      <div
        className={cn('rounded-full', base, className)}
        style={{
          width: width ?? 40,
          height: height ?? 40,
        }}
      />
    );
  }

  if (variant === 'card') {
    return (
      <div className={cn('rounded-xl border border-gray-100 dark:border-gray-700/30', base, className)}
        style={{
          width: width ?? '100%',
          height: height ?? 180,
        }}
      />
    );
  }

  return (
    <div
      className={cn('rounded-md', base, className)}
      style={{
        width: width ?? '100%',
        height: height ?? 12,
      }}
    />
  );
}

export function SkeletonLine({ className, width }: { className?: string; width?: string }) {
  return (
    <div
      className={cn('h-3 bg-gray-200/70 dark:bg-gray-700/50 rounded shimmer', className)}
      style={{ width: width ?? '100%' }}
    />
  );
}

export function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div className={cn(
      'bg-white dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700/30 p-5 space-y-4',
      className
    )}>
      <SkeletonLine width="40%" />
      <Skeleton lines={3} />
    </div>
  );
}
