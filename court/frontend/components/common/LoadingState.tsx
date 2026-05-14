'use client';

import clsx from 'clsx';

interface LoadingStateProps {
  message?: string;
  variant?: 'page' | 'section' | 'inline';
}

export function LoadingState({
  message = 'Loading...',
  variant = 'page',
}: LoadingStateProps) {
  if (variant === 'inline') {
    return (
      <div className="flex items-center gap-2 py-2">
        <span className="flex gap-1">
          <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse-dot" style={{ animationDelay: '0s' }} />
          <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse-dot" style={{ animationDelay: '0.2s' }} />
          <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse-dot" style={{ animationDelay: '0.4s' }} />
        </span>
        <span className="text-sm text-gray-500">{message}</span>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        'flex items-center justify-center bg-offwhite',
        variant === 'page' ? 'min-h-screen' : 'py-16'
      )}
    >
      <div className="text-center">
        <p className="text-xl font-medium text-navy font-serif">
          {message}
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <span
            className="w-3 h-3 bg-gold rounded-full animate-pulse-dot"
            style={{ animationDelay: '0s' }}
          />
          <span
            className="w-3 h-3 bg-gold rounded-full animate-pulse-dot"
            style={{ animationDelay: '0.2s' }}
          />
          <span
            className="w-3 h-3 bg-gold rounded-full animate-pulse-dot"
            style={{ animationDelay: '0.4s' }}
          />
        </div>
      </div>
    </div>
  );
}
