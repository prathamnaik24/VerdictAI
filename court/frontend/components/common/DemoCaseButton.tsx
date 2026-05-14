'use client';

import { useState } from 'react';
import type { DemoCaseType } from '@/frontend/lib/demoHelpers';
import { DEMO_LABELS } from '@/frontend/lib/demoHelpers';

interface DemoCaseButtonProps {
  onSelect: (caseType: DemoCaseType) => void;
  label?: string;
}

const CASE_TYPES: DemoCaseType[] = ['cheque-bounce', 'consumer-complaint', 'employment-dispute'];

export function DemoCaseButton({ onSelect, label = 'Load Demo Case' }: DemoCaseButtonProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setExpanded(!expanded)}
        className="px-5 py-2.5 bg-white text-navy border border-navy/20 rounded-lg hover:bg-offwhite transition-colors text-sm font-medium"
      >
        {label}
      </button>
      {expanded && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setExpanded(false)} />
          <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider px-4 pt-3 pb-1">
              Select a demo case
            </p>
            {CASE_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => {
                  onSelect(type);
                  setExpanded(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-offwhite transition-colors border-t border-gray-100 first:border-t-0"
              >
                <p className="text-sm font-medium text-navy">
                  {DEMO_LABELS[type].title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {DEMO_LABELS[type].subtitle}
                </p>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
