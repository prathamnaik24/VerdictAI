'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

interface MotionCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

/**
 * A card that fades in with a subtle scale-up effect.
 * Perfect for dashboard cards, report sections, and content blocks.
 */
export function MotionCard({
  children,
  className = '',
  delay = 0,
  once = true,
}: MotionCardProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-40px' }}
      variants={{
        hidden: { opacity: 0, scale: 0.97, y: 8 },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { delay, duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}