'use client';

export const EvidenceChecklist = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900">Evidence</h3>
      <div className="space-y-2">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          <span>Documentation</span>
        </label>
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          <span>Witnesses</span>
        </label>
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          <span>Communications</span>
        </label>
      </div>
    </div>
  );
};
