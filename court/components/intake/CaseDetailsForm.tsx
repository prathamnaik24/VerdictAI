'use client';

export const CaseDetailsForm = () => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-gray-700 font-medium mb-2">Case Title</label>
        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">Description</label>
        <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg h-32"></textarea>
      </div>
    </div>
  );
};
