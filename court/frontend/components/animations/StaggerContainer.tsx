'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StaggerContainerProps {
  children: ReactNode;
  delay?: number;
  staggerDelay?: number;
  className?: string;
  once?: boolean;
}

export function StaggerContainer({
  children,
  delay = 0,
  staggerDelay = 0.08,
  className,
  once = true,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-40px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const easeOut = [0.25, 0.1, 0.25, 1] as const;

export const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOut },
  },
};
