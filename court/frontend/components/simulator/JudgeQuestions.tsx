'use client';

interface JudgeQuestionsProps {
  question: string;
}

export function JudgeQuestions({ question }: JudgeQuestionsProps) {
  return (
    <div className="bg-white border border-blue-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-blue-600 text-lg" aria-hidden="true">&#9878;</span>
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest">
          Judge&apos;s Clarification
        </p>
      </div>
      <p className="text-gray-700 leading-relaxed italic">&ldquo;{question}&rdquo;</p>
    </div>
  );
}
