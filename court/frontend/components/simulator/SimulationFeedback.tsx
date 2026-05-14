'use client';

import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { MotionCard } from '@/frontend/components/common/MotionCard';

interface SimulationFeedbackProps {
  feedback: {
    strongestPoint: string;
    weakestPoint: string;
    improvementSuggestion: string;
    argumentScore: number;
  };
}

function ScoreMeter({ score }: { score: number }) {
  const pct = Math.min(100, Math.max(0, score));
  const color =
    pct >= 75
      ? 'bg-emerald-500'
      : pct >= 50
        ? 'bg-amber-400'
        : 'bg-red-400';

  return (
    <div className="mb-6">
      <div className="flex items-end gap-1 mb-2">
        <motion.span
          className={clsx(
            'text-5xl font-bold tabular-nums',
            pct >= 75
              ? 'text-emerald-600'
              : pct >= 50
                ? 'text-amber-600'
                : 'text-red-500'
          )}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {pct}
        </motion.span>
        <span className="text-xl text-gray-300 mb-1">/100</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2.5">
        <AnimatePresence>
          <motion.div
            className={clsx('h-2.5 rounded-full', color)}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}

export function SimulationFeedback({ feedback }: SimulationFeedbackProps) {
  return (
    <MotionCard className="bg-white border border-gray-200 shadow-sm">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
        Argument Score
      </p>

      <ScoreMeter score={feedback.argumentScore} />

      <div className="space-y-5">
        <div>
          <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1.5">
            Key Strength
          </p>
          <p className="text-gray-700 leading-relaxed">{feedback.strongestPoint}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-1.5">
            Area for Improvement
          </p>
          <p className="text-gray-700 leading-relaxed">{feedback.weakestPoint}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1.5">
            How to Improve
          </p>
          <p className="text-gray-700 leading-relaxed">{feedback.improvementSuggestion}</p>
        </div>
      </div>
    </MotionCard>
  );
}
