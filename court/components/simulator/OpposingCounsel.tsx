'use client';

export const OpposingCounsel = ({ argument }: { argument: string }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Opposing Counsel Response</h3>
      <p className="text-gray-700">{argument || 'Waiting for response...'}</p>
    </div>
  );
};
