'use client';

export const ReportPrediction = ({ score, likelihood }: { score: number; likelihood: string }) => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Prediction</h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-gray-600 mb-2">Success Likelihood</p>
          <p className="text-3xl font-bold text-blue-600">{score}%</p>
        </div>
        <div>
          <p className="text-gray-600 mb-2">Assessment</p>
          <p className="text-lg font-semibold text-gray-900">{likelihood}</p>
        </div>
      </div>
    </div>
  );
};
