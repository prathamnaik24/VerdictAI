'use client';

import { CheckCircle2, Lightbulb } from 'lucide-react';

interface FavorableFactorsProps {
  factors: string[];
}

export const FavorableFactors = ({ factors }: FavorableFactorsProps) => {
  if (factors.length === 0) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Favorable Factors</h3>
        <p className="text-gray-700">Gather more evidence to identify supportive factors.</p>
      </div>
    );
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Favorable Factors</h3>
        <p className="text-sm text-gray-600">Elements that strengthen your legal position</p>
      </div>

      <ul className="space-y-3">
        {factors.map((factor, i) => (
          <li key={i} className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span className="text-gray-800 font-medium">{factor}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 p-3 bg-white bg-opacity-60 rounded border border-green-100 flex gap-2">
        <Lightbulb className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-gray-700">
          These factors support your case. Ensure supporting documentation is available.
        </p>
      </div>
    </div>
  );
};
