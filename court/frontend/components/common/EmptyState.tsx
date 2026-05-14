'use client';

import { motion } from 'framer-motion';
import type { ElementType } from 'react';
import { cn } from '@/lib/utils';

interface EmptyStateAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

interface EmptyStateProps {
  icon?: ElementType;
  title: string;
  description: string;
  action?: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
  variant?: 'page' | 'section' | 'inline';
  animated?: boolean;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
  variant = 'section',
  animated = true,
}: EmptyStateProps) {
  const content = (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        variant === 'page' && 'min-h-[60vh] py-16',
        variant === 'section' && 'py-12',
        variant === 'inline' && 'py-6'
      )}
    >
      {Icon && (
        <div className="w-12 h-12 rounded-full bg-offwhite border border-gray-200 flex items-center justify-center mb-4">
          <Icon className="w-5 h-5 text-gray-400" />
        </div>
      )}

      <h3 className="text-lg font-semibold text-navy font-serif mb-1.5">
        {title}
      </h3>

      <p className="text-sm text-gray-500 max-w-sm leading-relaxed mb-6">
        {description}
      </p>

      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {action && (
            <button
              onClick={action.onClick}
              className={cn(
                'px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30',
                action.variant === 'secondary'
                  ? 'bg-white text-navy border border-navy/20 hover:bg-offwhite'
                  : 'bg-navy text-white hover:bg-navy/90'
              )}
            >
              {action.label}
            </button>
          )}
          {secondaryAction && (
            <button
              onClick={secondaryAction.onClick}
              className={cn(
                'px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30',
                secondaryAction.variant === 'primary'
                  ? 'bg-navy text-white hover:bg-navy/90'
                  : 'bg-white text-navy border border-navy/20 hover:bg-offwhite'
              )}
            >
              {secondaryAction.label}
            </button>
          )}
        </div>
      )}
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}
