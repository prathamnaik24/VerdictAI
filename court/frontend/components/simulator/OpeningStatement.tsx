'use client';

export const OpeningStatement = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Opening Statement</h3>
      <textarea
        className="w-full px-4 py-2 border border-gray-300 rounded-lg h-32"
        placeholder="Present your case..."
      ></textarea>
    </div>
  );
};
