'use client';

import clsx from 'clsx';

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  variant?: 'page' | 'section';
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  variant = 'section',
}: EmptyStateProps) {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center text-center px-6',
        variant === 'page' ? 'min-h-screen' : 'py-12'
      )}
    >
      <div className="w-12 h-12 rounded-full bg-offwhite border border-gray-200 flex items-center justify-center mb-4">
        <span className="text-gray-400 text-lg font-serif">—</span>
      </div>
      <h3 className="text-lg font-semibold text-navy font-serif mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-gray-500 max-w-sm leading-relaxed mb-5">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-5 py-2.5 bg-navy text-white rounded-lg hover:bg-navy/90 transition-colors text-sm font-medium"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
