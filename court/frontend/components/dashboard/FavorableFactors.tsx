'use client';

export const FavorableFactors = ({ factors }: { factors: string[] }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-emerald-500" />
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Favorable Factors</p>
      </div>
      {factors.length === 0 ? (
        <p className="text-sm text-gray-400 italic">No favorable factors identified.</p>
      ) : (
        <ul className="space-y-2.5">
          {factors.map((factor, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
              <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">✓</span>
              <span>{factor}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
