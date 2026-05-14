'use client';

export const ConfidenceMeter = ({ confidence }: { confidence: number }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Confidence Level</h3>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-blue-600 h-4 rounded-full"
          style={{ width: `${confidence * 100}%` }}
        ></div>
      </div>
    </div>
  );
};
