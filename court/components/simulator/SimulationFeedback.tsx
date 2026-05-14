'use client';

export const SimulationFeedback = ({ feedback }: { feedback: string }) => {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Feedback</h3>
      <p className="text-gray-700">{feedback || 'Feedback will appear here...'}</p>
    </div>
  );
};
