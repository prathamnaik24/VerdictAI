'use client';

export const OutcomeCard = ({ score }: { score: number }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Predicted Outcome</h3>
      <div className="text-4xl font-bold text-blue-600">{score}%</div>
    </div>
  );
};
