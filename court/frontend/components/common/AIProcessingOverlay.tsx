'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ProcessingStage {
  label: string;
  icon: string;
}

const DEFAULT_STAGES: ProcessingStage[] = [
  { label: 'Extracting case facts', icon: '📋' },
  { label: 'Identifying dispute type', icon: '🔍' },
  { label: 'Matching legal precedents', icon: '⚖️' },
  { label: 'Evaluating litigation readiness', icon: '📊' },
  { label: 'Generating assessment report', icon: '📄' },
];

interface AIProcessingOverlayProps {
  visible: boolean;
  stages?: ProcessingStage[];
  onComplete?: () => void;
  stageDuration?: number;
}

export function AIProcessingOverlay({
  visible,
  stages = DEFAULT_STAGES,
  onComplete,
  stageDuration = 1200,
}: AIProcessingOverlayProps) {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    if (!visible) {
      setCurrentStage(0);
      return;
    }

    if (currentStage >= stages.length) {
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStage((prev) => prev + 1);
    }, stageDuration);

    return () => clearTimeout(timer);
  }, [visible, currentStage, stages.length, stageDuration, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl border border-gray-100"
          >
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3">
                <motion.span
                  className="text-2xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  ⚖️
                </motion.span>
              </div>
              <h3 className="text-lg font-semibold text-navy font-serif">
                AI Analysis in Progress
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Processing your case through our legal AI engine
              </p>
            </div>

            <div className="space-y-3">
              {stages.map((stage, i) => {
                const isActive = i === currentStage;
                const isDone = i < currentStage;
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'bg-gold/10 border border-gold/20'
                        : isDone
                          ? 'bg-emerald-50/50'
                          : 'bg-gray-50/50'
                    }`}
                  >
                    <span className="text-lg shrink-0">
                      {isDone ? '✅' : stage.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm font-medium transition-colors ${
                          isDone
                            ? 'text-emerald-600'
                            : isActive
                              ? 'text-navy'
                              : 'text-gray-400'
                        }`}
                      >
                        {stage.label}
                      </p>
                    </div>
                    {isActive && (
                      <span className="flex gap-0.5">
                        <span className="w-1 h-1 bg-gold rounded-full animate-pulse-dot" style={{ animationDelay: '0s' }} />
                        <span className="w-1 h-1 bg-gold rounded-full animate-pulse-dot" style={{ animationDelay: '0.15s' }} />
                        <span className="w-1 h-1 bg-gold rounded-full animate-pulse-dot" style={{ animationDelay: '0.3s' }} />
                      </span>
                    )}
                    {isDone && (
                      <span className="text-emerald-500 text-xs font-bold">
                        Done
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <p className="text-[10px] text-gray-400 text-center mt-5">
              Powered by VerdictAI Legal Intelligence Engine
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
