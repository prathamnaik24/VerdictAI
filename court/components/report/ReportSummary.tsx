'use client';

export const ReportSummary = ({ summary }: { summary: string }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Executive Summary</h2>
      <p className="text-gray-700 leading-relaxed">{summary || 'Summary placeholder'}</p>
    </div>
  );
};
