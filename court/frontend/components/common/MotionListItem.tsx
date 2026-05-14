'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface MotionListItemProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * A list item that fades in with a staggered delay.
 * Use inside MotionStagger for consistent reveal sequences.
 */
export function MotionListItem({
  children,
  delay = 0,
  className = '',
}: MotionListItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ delay, duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}