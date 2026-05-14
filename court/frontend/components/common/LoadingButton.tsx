'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

const variantStyles = {
  primary: 'bg-navy text-white hover:bg-navy/90 border border-transparent',
  secondary: 'bg-white text-navy border border-navy/20 hover:bg-offwhite',
  ghost: 'bg-transparent text-navy hover:bg-gray-100 border border-transparent',
  outline: 'bg-transparent text-navy border border-navy/30 hover:bg-offwhite',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

export const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (
    {
      loading = false,
      loadingText,
      variant = 'primary',
      size = 'md',
      icon,
      children,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30',
          'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
          'select-none',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {loading && (
          <span className="flex gap-1" aria-hidden="true">
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse-dot" style={{ animationDelay: '0s' }} />
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse-dot" style={{ animationDelay: '0.15s' }} />
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse-dot" style={{ animationDelay: '0.3s' }} />
          </span>
        )}
        {!loading && icon && <span className="shrink-0">{icon}</span>}
        <span className={cn(loading && 'text-current/80')}>
          {loading && loadingText ? loadingText : children}
        </span>
      </button>
    );
  }
);

LoadingButton.displayName = 'LoadingButton';
