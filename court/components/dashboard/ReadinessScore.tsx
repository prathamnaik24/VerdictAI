'use client';

export const ReadinessScore = ({ score }: { score: number }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Litigation Readiness</h3>
      <div className="text-3xl font-bold text-blue-600 mb-2">{Math.round(score)}/100</div>
      <p className="text-gray-600 text-sm">
        How prepared you are to proceed with litigation
      </p>
    </div>
  );
};
