'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SuccessToastProps {
  message: string;
  visible: boolean;
  onClose?: () => void;
  duration?: number;
}

export function SuccessToast({
  message,
  visible,
  onClose,
  duration = 3000,
}: SuccessToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -10, x: '-50%' }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-6 left-1/2 z-50 flex items-center gap-3 px-5 py-3 bg-navy text-white rounded-xl shadow-lg"
        >
          <span className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">
            ✓
          </span>
          <span className="text-sm font-medium">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
