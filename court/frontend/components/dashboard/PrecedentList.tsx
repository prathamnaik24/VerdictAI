'use client';

export const PrecedentList = ({ precedents }: { precedents: any[] }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Relevant Precedents</h3>
      <p className="text-gray-600">No precedents available</p>
    </div>
  );
};
