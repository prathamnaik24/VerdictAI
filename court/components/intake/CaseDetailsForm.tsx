'use client';

export const CaseDetailsForm = () => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-gray-700 font-medium mb-2">Case Title</label>
        <input type="text" placeholder="e.g. Sharma vs. Gupta — Breach of Contract" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">Detailed Description</label>
        <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg h-32" placeholder="Describe the facts, parties involved, timeline of events, and the outcome you are seeking…"></textarea>
      </div>
    </div>
  );
};
