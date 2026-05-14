'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Wraps page content with a mount-time slide-up + fade entrance.
 * Replaces the static PageTransition with a smooth animated variant.
 */
export function AnimatedPageTransition({ children }: PageTransitionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}