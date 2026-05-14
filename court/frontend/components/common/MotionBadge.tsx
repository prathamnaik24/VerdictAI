'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface MotionBadgeProps {
  children: ReactNode;
  className?: string;
}

/**
 * A badge that gently pops in with a scale+fade.
 * Used for status indicators, confidence badges, and category labels.
 */
export function MotionBadge({
  children,
  className = '',
}: MotionBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ scale: 1.05 }}
      className={className}
    >
      {children}
    </motion.span>
  );
}