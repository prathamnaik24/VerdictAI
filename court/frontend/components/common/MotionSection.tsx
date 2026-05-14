'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

/**
 * A section wrapper that slides up into view on scroll.
 * Use for page sections, report blocks, and dashboard rows.
 */
export function MotionSection({
  children,
  className = '',
  delay = 0,
  once = true,
}: MotionSectionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { delay, duration: 0.45, ease: [0.4, 0, 0.2, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}