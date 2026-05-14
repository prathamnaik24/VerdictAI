'use client';

export const ReadinessScore = ({ score }: { score: number }) => {
  const pct = Math.min(100, Math.max(0, score));
  const label = pct >= 75 ? 'Ready' : pct >= 50 ? 'Partially Ready' : 'Not Ready';
  const labelColor = pct >= 75 ? 'text-emerald-700' : pct >= 50 ? 'text-amber-700' : 'text-red-700';
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Litigation Readiness</p>
      <div className="flex items-end gap-1 mb-1">
        <span className="text-5xl font-bold tabular-nums text-gray-900">{Math.round(pct)}</span>
        <span className="text-xl text-gray-400 mb-1">/100</span>
      </div>
      <p className={`text-sm font-semibold mb-4 ${labelColor}`}>{label}</p>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className="bg-gray-800 h-2 rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};
