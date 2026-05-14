'use client';

import { motion } from 'framer-motion';
import { RefreshCw, Home, Info, AlertTriangle, XCircle } from 'lucide-react';
import type { ElementType } from 'react';
import { cn } from '@/lib/utils';

interface ErrorStateAction {
  label: string;
  onClick: () => void;
  loading?: boolean;
}

interface ErrorStateProps {
  title?: string;
  message: string;
  variant?: 'error' | 'warning' | 'info';
  icon?: ElementType;
  retryLabel?: string;
  onRetry?: () => void;
  retryLoading?: boolean;
  primaryAction?: ErrorStateAction;
  secondaryAction?: ErrorStateAction;
  className?: string;
  /** If true, renders as a page-sized overlay; if false, renders as an inline block */
  page?: boolean;
}

const VARIANT_CONFIG = {
  error: {
    icon: XCircle,
    iconBg: 'bg-red-50',
    iconBorder: 'border-red-200',
    iconColor: 'text-red-500',
    titleColor: 'text-red-900',
    bgClass: 'bg-white',
    shadowClass: '',
  },
  warning: {
    icon: AlertTriangle,
    iconBg: 'bg-amber-50',
    iconBorder: 'border-amber-200',
    iconColor: 'text-amber-500',
    titleColor: 'text-amber-900',
    bgClass: 'bg-white',
    shadowClass: '',
  },
  info: {
    icon: Info,
    iconBg: 'bg-blue-50',
    iconBorder: 'border-blue-200',
    iconColor: 'text-blue-500',
    titleColor: 'text-blue-900',
    bgClass: 'bg-white',
    shadowClass: '',
  },
} as const;

export function ErrorState({
  title = 'Something went wrong',
  message,
  variant = 'error',
  icon: CustomIcon,
  retryLabel = 'Retry',
  onRetry,
  retryLoading,
  primaryAction,
  secondaryAction,
  className,
  page = false,
}: ErrorStateProps) {
  const config = VARIANT_CONFIG[variant];
  const Icon = CustomIcon || config.icon;

  const wrapperClass = cn(
    page
      ? 'min-h-screen flex items-center justify-center py-12'
      : 'w-full flex items-center justify-center my-8',
    className
  );

  const cardClass = cn(
    config.bgClass,
    'rounded-2xl p-8 max-w-lg w-full mx-4',
    variant === 'info' && 'border border-blue-200',
    variant === 'warning' && 'border border-amber-200',
    variant !== 'info' && variant !== 'warning' && 'border border-red-100 shadow-sm'
  );

  const content = (
    <div className="text-center">
      {/* Icon */}
      <div className={cn(
        'w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5',
        config.iconBg,
        config.iconBorder
      )}>
        <Icon className={cn('w-6 h-6', config.iconColor)} />
      </div>

      {/* Title */}
      <h3 className={cn('text-lg font-semibold font-serif mb-2', config.titleColor)}>
        {title}
      </h3>

      {/* Message */}
      <p className="text-sm text-gray-600 leading-relaxed max-w-sm mx-auto mb-8">
        {message}
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            disabled={retryLoading}
            className={cn(
              'px-6 py-2.5 bg-navy text-white rounded-lg font-medium text-sm transition-all duration-200',
              'hover:bg-navy/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30',
              'disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2'
            )}
          >
            {retryLoading && (
              <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            )}
            {retryLabel}
          </button>
        )}

        {primaryAction && (
          <button
            onClick={primaryAction.onClick}
            disabled={primaryAction.loading}
            className={cn(
              'px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 inline-flex items-center gap-2',
              'focus-visible:outline-none focus-visible:ring-2',
              variant === 'warning'
                ? 'bg-navy text-white hover:bg-navy/90 focus-visible:ring-navy/30'
                : variant === 'info'
                ? 'bg-navy text-white hover:bg-navy/90 focus-visible:ring-navy/30'
                : 'bg-navy text-white hover:bg-navy/90 focus-visible:ring-navy/30'
            )}
          >
            {primaryAction.loading && (
              <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            )}
            {primaryAction.label}
          </button>
        )}

        {secondaryAction && (
          <button
            onClick={secondaryAction.onClick}
            disabled={secondaryAction.loading}
            className="px-5 py-2.5 bg-white text-navy border border-navy/20 rounded-lg hover:bg-offwhite transition-colors text-sm font-medium min-w-[130px] inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30"
          >
            {secondaryAction.label}
          </button>
        )}

        {!onRetry && !primaryAction && !secondaryAction && (
<button
             onClick={() => window.location.reload()}
             className="px-5 py-2.5 bg-offwhite text-navy rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
           >
             Reload Page
           </button>
        )}
      </div>
    </div>
  );

  if (page) {
    return (
      <div className={wrapperClass}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={cardClass}
        >
          {content}
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={cardClass}>{content}</div>
    </motion.div>
  );
}