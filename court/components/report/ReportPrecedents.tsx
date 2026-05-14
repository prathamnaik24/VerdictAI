'use client';

export const ReportPrecedents = ({ precedents }: { precedents: any[] }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Relevant Precedents</h2>
      <div className="space-y-4">
        {precedents && precedents.length > 0 ? (
          precedents.map((p) => (
            <div key={p.id} className="border-l-4 border-blue-600 pl-4">
              <p className="font-medium text-gray-900">{p.title}</p>
              <p className="text-sm text-gray-600">{p.court} ({p.year})</p>
              <p className="text-gray-700 mt-2">{p.summary}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No precedents available</p>
        )}
      </div>
    </div>
  );
};
