'use client';

export const RiskFactors = ({ factors }: { factors: string[] }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Factors</h3>
      <ul className="space-y-2">
        {factors.map((factor, i) => (
          <li key={i} className="flex items-start">
            <span className="text-red-600 mr-2">•</span>
            <span className="text-gray-700">{factor}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
