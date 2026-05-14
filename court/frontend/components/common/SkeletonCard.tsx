'use client';

import clsx from 'clsx';

interface SkeletonCardProps {
  lines?: number;
  className?: string;
}

export function SkeletonCard({ lines = 3, className }: SkeletonCardProps) {
  return (
    <div
      className={clsx(
        'bg-white border border-gray-200 rounded-lg p-6 animate-pulse',
        className
      )}
    >
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-3 bg-gray-100 rounded mb-2"
          style={{ width: `${70 + Math.random() * 30}%` }}
        />
      ))}
    </div>
  );
}

export function SkeletonBar({ className }: { className?: string }) {
  return (
    <div className={clsx('h-3 bg-gray-200 rounded animate-pulse', className)} />
  );
}
