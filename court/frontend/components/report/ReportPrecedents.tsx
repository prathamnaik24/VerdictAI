'use client';

export const ReportPrecedents = ({ precedents }: { precedents: any[] }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Relevant Precedents</h2>
      <p className="text-gray-600">No precedents available</p>
    </div>
  );
};
