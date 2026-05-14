'use client';

import { AlertTriangle, Info, Lightbulb, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AssessmentNoticeProps {
  confidenceLevel: string;
  readinessScore: number;
  evidenceGaps: number;
  onAction?: () => void;
}

export function AssessmentNotice({
  confidenceLevel,
  readinessScore,
  evidenceGaps,
  onAction,
}: AssessmentNoticeProps) {
  const isLowConfidence = confidenceLevel === 'Low';
  const isLowReadiness = readinessScore < 40;
  const hasGaps = evidenceGaps > 0;

  if (!isLowConfidence && !isLowReadiness) return null;

  const variant = isLowConfidence ? 'caution' : 'info';

  return (
    <div
      className={cn(
        'rounded-xl border p-4',
        variant === 'caution'
          ? 'bg-amber-50 border-amber-200'
          : 'bg-blue-50 border-blue-200'
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
            variant === 'caution' ? 'bg-amber-100' : 'bg-blue-100'
          )}
        >
          {variant === 'caution' ? (
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          ) : (
            <Info className="w-4 h-4 text-blue-600" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              'text-sm font-semibold',
              variant === 'caution' ? 'text-amber-900' : 'text-blue-900'
            )}
          >
            {variant === 'caution'
              ? 'Assessment confidence is limited'
              : 'Case readiness needs attention'}
          </h3>
          <p
            className={cn(
              'text-xs mt-1 leading-relaxed',
              variant === 'caution' ? 'text-amber-700' : 'text-blue-700'
            )}
          >
            {variant === 'caution'
              ? 'The available case information is limited. Scores below reflect reduced confidence and should be treated as indicative, not definitive.'
              : `The current readiness score of ${readinessScore}% suggests additional preparation would be valuable before proceeding.`}
          </p>

          <div className="mt-3 space-y-1.5">
            {isLowConfidence && (
              <div className="flex items-start gap-2">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700">
                  <span className="font-medium">Suggestion:</span> Return to the intake form to add more detail about the key facts, timeline, and parties involved.
                </p>
              </div>
            )}
            {isLowReadiness && hasGaps && (
              <div className="flex items-start gap-2">
                <Lightbulb className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700">
                  <span className="font-medium">Suggestion:</span> Address the {evidenceGaps} evidence gap{evidenceGaps > 1 ? 's' : ''} identified below to strengthen your position.
                </p>
              </div>
            )}
          </div>

          {onAction && (
            <button
              onClick={onAction}
              className={cn(
                'mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
                variant === 'caution'
                  ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                  : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
              )}
            >
              {variant === 'caution' ? 'Add case details' : 'View evidence gaps'}
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
