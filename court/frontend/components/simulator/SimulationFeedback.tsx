'use client';

import clsx from "clsx";

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
      ? "bg-emerald-500"
      : pct >= 50
      ? "bg-amber-400"
      : "bg-red-400";

  return (
    <div className="mb-6">
      <div className="flex items-end gap-1 mb-2">
        <span
          className={clsx(
            "text-5xl font-bold tabular-nums transition-colors",
            pct >= 75
              ? "text-emerald-600"
              : pct >= 50
              ? "text-amber-600"
              : "text-red-500"
          )}
        >
          {pct}
        </span>
        <span className="text-xl text-gray-300 mb-1">/100</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2.5">
        <div
          className={clsx("h-2.5 rounded-full transition-all duration-700", color)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function SimulationFeedback({ feedback }: SimulationFeedbackProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
        Argument Evaluation
      </p>

      <ScoreMeter score={feedback.argumentScore} />

      <div className="space-y-5">
        <div>
          <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1.5">
            Strongest Point
          </p>
          <p className="text-gray-700 leading-relaxed">{feedback.strongestPoint}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-1.5">
            Weakest Point
          </p>
          <p className="text-gray-700 leading-relaxed">{feedback.weakestPoint}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1.5">
            Improvement Suggestion
          </p>
          <p className="text-gray-700 leading-relaxed">{feedback.improvementSuggestion}</p>
        </div>
      </div>
    </div>
  );
}
