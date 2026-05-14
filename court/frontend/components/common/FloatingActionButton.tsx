'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingActionButtonProps {
  label?: string;
  icon?: string;
  onClick?: () => void;
  threshold?: number;
}

export function FloatingActionButton({
  label = 'Back to Top',
  icon = '\u2191',
  onClick,
  threshold = 400,
}: FloatingActionButtonProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > threshold);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={handleClick}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 bg-navy text-white rounded-full shadow-lg hover:bg-navy/90 transition-colors text-sm font-medium no-print"
        >
          <span className="text-base leading-none">{icon}</span>
          <span className="hidden sm:inline">{label}</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
