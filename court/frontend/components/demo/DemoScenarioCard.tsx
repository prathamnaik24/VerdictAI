'use client';

import { motion } from 'framer-motion';
import type { DemoCaseType } from '@/frontend/lib/demoHelpers';
import { DEMO_LABELS } from '@/frontend/lib/demoHelpers';

interface DemoScenarioCardProps {
  type: DemoCaseType;
  onSelect: (type: DemoCaseType) => void;
  index: number;
}

export function DemoScenarioCard({
  type,
  onSelect,
  index,
}: DemoScenarioCardProps) {
  const info = DEMO_LABELS[type];

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(31,40,57,0.12)' }}
      onClick={() => onSelect(type)}
      className="bg-white border border-gray-200 rounded-xl p-5 text-left w-full transition-colors hover:border-gold/40 group"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-full bg-navy/5 flex items-center justify-center text-sm font-bold text-navy font-serif group-hover:bg-gold/10 transition-colors">
          {index + 1}
        </div>
        <div>
          <p className="text-sm font-semibold text-navy">{info.title}</p>
          <p className="text-xs text-gray-500">{info.subtitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs text-gold font-medium">
        <span>Try Demo</span>
        <span className="group-hover:translate-x-0.5 transition-transform">→</span>
      </div>
    </motion.button>
  );
}
