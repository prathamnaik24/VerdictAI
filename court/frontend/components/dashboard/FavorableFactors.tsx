'use client';

export const FavorableFactors = ({ factors }: { factors: string[] }) => {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Favorable Factors</h3>
      <ul className="space-y-2">
        {factors.map((factor, i) => (
          <li key={i} className="text-gray-700">✓ {factor}</li>
        ))}
      </ul>
    </div>
  );
};
