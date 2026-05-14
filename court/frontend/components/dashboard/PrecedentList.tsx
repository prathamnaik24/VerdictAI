'use client';

import { Precedent } from '@/frontend/types/dashboard.types';

export const PrecedentList = ({ precedents }: { precedents: Precedent[] }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Relevant Precedents</p>
      {precedents.length === 0 ? (
        <p className="text-sm text-gray-400 italic">No precedents retrieved for this case.</p>
      ) : (
        <div className="divide-y divide-gray-100">
          {precedents.map((p, i) => (
            <div key={p.id ?? i} className="py-4 first:pt-0 last:pb-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 leading-snug mb-1">{p.title}</p>
                  {p.court && (
                    <p className="text-xs text-gray-400">{p.court}</p>
                  )}
                  {p.summary && (
                    <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{p.summary}</p>
                  )}
                </div>
                <div className="flex-shrink-0 text-right">
                  <span className="inline-block text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 rounded px-2 py-0.5">
                    {Math.round(p.similarity * 100)}% match
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
