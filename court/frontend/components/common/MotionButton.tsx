'use client';

import { motion } from 'framer-motion';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface MotionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  loading?: boolean;
}

/**
 * A button with smooth hover scale, press feedback, and loading state.
 * The premium touch: subtle spring physics on hover/tap.
 */
export function MotionButton({
  children,
  variant = 'primary',
  loading = false,
  disabled,
  className = '',
  ...props
}: MotionButtonProps) {
  const baseStyles =
    'inline-flex items-center gap-2 font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-navy text-white hover:bg-navy/90 focus-visible:ring-navy/30',
    secondary: 'bg-white text-navy border border-navy/20 hover:bg-offwhite focus-visible:ring-navy/30',
    ghost: 'text-navy hover:text-navy/80',
  };

return (
     <motion.button
       whileHover={{ scale: 1.02 }}
       whileTap={{ scale: 0.97 }}
       transition={{ duration: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
       disabled={loading || disabled}
       className={`${baseStyles} ${variantStyles[variant]} ${className}`}
       {...(props as any)}
     >
      {loading && (
        <span className="w-3 h-3 border-2 border-current/30 border-t-current rounded-full animate-spin" />
      )}
      {children}
    </motion.button>
  );
}