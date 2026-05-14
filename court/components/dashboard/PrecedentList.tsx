'use client';

export const PrecedentList = ({ precedents }: { precedents: any[] }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Relevant Precedents</h3>
      <div className="space-y-3">
        {precedents && precedents.length > 0 ? (
          precedents.map((p) => (
            <div key={p.id} className="border-l-4 border-blue-600 pl-4">
              <p className="font-medium text-gray-900">{p.title}</p>
              <p className="text-sm text-gray-600">{p.court} ({p.year})</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No precedents found</p>
        )}
      </div>
    </div>
  );
};
