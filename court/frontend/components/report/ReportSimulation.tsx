'use client';

import type { ReportData } from '@/shared/types/report.types';
import { ReportSection } from './ReportSection';

interface ReportSimulationProps {
  report: ReportData;
}

export function ReportSimulation({ report }: ReportSimulationProps) {
  const sim = report.simulationFeedback;

  return (
    <ReportSection title="Courtroom Simulation Feedback">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div className="bg-emerald-50/60 border border-emerald-200 rounded-lg p-4">
          <p className="text-xs font-medium text-emerald-700 uppercase tracking-wider mb-1">
            Strongest Point
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            {sim.strongestPoint}
          </p>
        </div>
        <div className="bg-red-50/60 border border-red-200 rounded-lg p-4">
          <p className="text-xs font-medium text-red-700 uppercase tracking-wider mb-1">
            Weakest Point
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            {sim.weakestPoint}
          </p>
        </div>
      </div>

      {sim.judgeConcerns.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            Judge Concerns
          </p>
          <ul className="space-y-1.5">
            {sim.judgeConcerns.map((concern, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <span className="text-amber-500 mt-0.5 shrink-0">•</span>
                <span>{concern}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {sim.suggestedImprovements.length > 0 && (
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            Suggested Improvements
          </p>
          <ul className="space-y-1.5">
            {sim.suggestedImprovements.map((suggestion, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <span className="text-gold mt-0.5 shrink-0">→</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {sim.judgeConcerns.length === 0 &&
        sim.suggestedImprovements.length === 0 && (
          <p className="text-gray-500 italic text-sm">
            No additional simulation feedback provided.
          </p>
        )}
    </ReportSection>
  );
}
