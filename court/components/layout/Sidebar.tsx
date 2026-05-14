'use client';

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 p-6">
      <div className="space-y-4">
        <h3 className="font-bold text-gray-900">Navigation</h3>
        <ul className="space-y-2 text-gray-700">
          <li>Case Information</li>
          <li>Assessment</li>
          <li>Simulation</li>
          <li>Report</li>
        </ul>
      </div>
    </aside>
  );
};
