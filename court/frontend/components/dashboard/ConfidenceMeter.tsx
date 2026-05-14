'use client';

const LEVEL_MAP: Record<string, { value: number; color: string }> = {
  'Very High': { value: 0.95, color: 'bg-emerald-600' },
  'High':      { value: 0.80, color: 'bg-blue-600' },
  'Moderate':  { value: 0.65, color: 'bg-amber-500' },
  'Low':       { value: 0.40, color: 'bg-red-500' },
};

export const ConfidenceMeter = ({ level }: { level: string }) => {
  const cfg = LEVEL_MAP[level] ?? LEVEL_MAP['Moderate'];
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">AI Confidence</p>
      <p className="text-2xl font-bold text-gray-900 mb-1">{level}</p>
      <p className="text-sm text-gray-400 mb-4">{Math.round(cfg.value * 100)}% confidence score</p>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className={`${cfg.color} h-2 rounded-full transition-all duration-700`}
          style={{ width: `${cfg.value * 100}%` }}
        />
      </div>
    </div>
  );
};
