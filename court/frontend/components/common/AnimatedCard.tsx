'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import clsx from 'clsx';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export function AnimatedCard({
  children,
  className,
  hover = true,
  delay = 0,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.35,
        delay,
        ease: [0.25, 0.1, 0.25, 1] as const,
      }}
      whileHover={
        hover
          ? {
              y: -2,
              boxShadow:
                '0 4px 12px rgba(31, 40, 57, 0.08)',
              transition: { duration: 0.2 },
            }
          : undefined
      }
      className={clsx(
        'bg-white border border-gray-200 rounded-lg transition-shadow duration-200',
        hover && 'cursor-default',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
