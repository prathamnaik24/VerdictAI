'use client';

const DIRECTION_CONFIG: Record<string, { bg: string; text: string; badge: string }> = {
  'Favourable': { bg: 'bg-emerald-50', text: 'text-emerald-800', badge: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  'Unfavourable': { bg: 'bg-red-50', text: 'text-red-800', badge: 'bg-red-100 text-red-700 border-red-200' },
  'Neutral': { bg: 'bg-amber-50', text: 'text-amber-800', badge: 'bg-amber-100 text-amber-700 border-amber-200' },
};

export const OutcomeCard = ({ label, score }: { label: string; score: number }) => {
  const config = DIRECTION_CONFIG[label] ?? DIRECTION_CONFIG['Neutral'];
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Direction Assessment</p>
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-4 ${config.badge}`}>
        {label}
      </div>
      <div className="flex items-end gap-1">
        <span className={`text-5xl font-bold tabular-nums ${config.text}`}>{score}</span>
        <span className="text-xl text-gray-400 mb-1">/100</span>
      </div>
      <div className="mt-3 w-full bg-gray-100 rounded-full h-1.5">
        <div
          className="h-1.5 rounded-full bg-gray-700 transition-all duration-700"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
};
