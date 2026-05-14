'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Page-level mount transition. Subtle slide-up + fade.
 * Used across all route transitions for a polished feel.
 */
export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1] as const,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Staggered container — animates children sequentially on viewport entry.
 * Export reusable stagger item for individual children.
 */
export const StaggerContainer = ({
  children,
  delay = 0.08,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-40px' }}
    variants={{
      hidden: {},
      visible: {
        transition: {
          staggerChildren: delay,
          delayChildren: 0,
        },
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-20px' }}
    transition={{
      delay,
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1] as const,
    }}
    className={className}
  >
    {children}
  </motion.div>
);
