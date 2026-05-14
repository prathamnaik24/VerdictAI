'use client';

interface FeedbackProps {
  feedback: {
    strongestPoint: string;
    weakestPoint: string;
    improvementSuggestion: string;
    argumentScore: number;
  };
}

export const SimulationFeedback = ({ feedback }: FeedbackProps) => {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Argument Evaluation</h3>

      {/* Score */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-600">Score:</span>
        <span className="text-2xl font-bold text-gray-900">{feedback.argumentScore}/100</span>
      </div>

      {/* Strongest Point */}
      <div>
        <p className="text-sm font-medium text-green-800 mb-1">Strongest Point</p>
        <p className="text-gray-700">{feedback.strongestPoint}</p>
      </div>

      {/* Weakest Point */}
      <div>
        <p className="text-sm font-medium text-red-700 mb-1">Weakest Point</p>
        <p className="text-gray-700">{feedback.weakestPoint}</p>
      </div>

      {/* Improvement Suggestion */}
      <div>
        <p className="text-sm font-medium text-amber-700 mb-1">Improvement Suggestion</p>
        <p className="text-gray-700">{feedback.improvementSuggestion}</p>
      </div>
    </div>
  );
};
