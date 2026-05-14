'use client';

import { AlertTriangle, Info, Lightbulb, ArrowRight } from 'lucide-react';
import type { ValidationIssue } from '@/frontend/lib/intakeValidation';
import { cn } from '@/lib/utils';

interface InsufficientInfoCardProps {
  issues: ValidationIssue[];
  onContinue: () => void;
  onImprove: () => void;
}

export function InsufficientInfoCard({
  issues,
  onContinue,
  onImprove,
}: InsufficientInfoCardProps) {
  const cautions = issues.filter((i) => i.severity === 'caution');
  const suggestions = issues.filter((i) => i.severity === 'suggestion');

  return (
    <div className="border border-amber-200 rounded-xl bg-amber-50/50 overflow-hidden">
      <div className="flex items-start gap-3 p-4 border-b border-amber-100">
        <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-amber-900">
            Additional details could improve your assessment
          </h3>
          <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
            Your case information appears limited in some areas. Adding more detail helps the AI provide a more thorough analysis. You can still proceed with the current information.
          </p>
        </div>
      </div>

      <div className="px-4 py-3 space-y-2.5">
        {cautions.map((issue, i) => (
          <div key={`caution-${i}`} className="flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-amber-800">{issue.message}</p>
              <p className="text-xs text-amber-600 mt-0.5">{issue.suggestion}</p>
            </div>
          </div>
        ))}
        {suggestions.map((issue, i) => (
          <div key={`suggestion-${i}`} className="flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-amber-800">{issue.message}</p>
              <p className="text-xs text-amber-600 mt-0.5">{issue.suggestion}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 px-4 py-3 bg-amber-100/40 border-t border-amber-100">
        <button
          onClick={onImprove}
          className={cn(
            'px-4 py-2 rounded-lg text-xs font-medium transition-colors',
            'bg-white text-amber-800 border border-amber-200 hover:bg-amber-50',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400'
          )}
        >
          Add More Detail
        </button>
        <button
          onClick={onContinue}
          className={cn(
            'px-4 py-2 rounded-lg text-xs font-medium transition-colors inline-flex items-center gap-1.5',
            'bg-amber-600 text-white hover:bg-amber-700',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400'
          )}
        >
          Continue Anyway
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
