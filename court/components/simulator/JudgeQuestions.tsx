'use client';

export const JudgeQuestions = ({ question }: { question: string }) => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Judge's Questions</h3>
      <p className="text-gray-700">{question || 'Waiting for judge to ask a question...'}</p>
    </div>
  );
};
