'use client';

export const IntakeForm = () => {
  return (
    <form className="space-y-6">
      <div>
        <label className="block text-gray-700 font-medium mb-2">Dispute Type</label>
        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
          <option>Select dispute type...</option>
          <option value="cheque-bounce">Cheque Bounce</option>
          <option value="consumer-complaint">Consumer Complaint</option>
          <option value="employment-dispute">Employment Dispute</option>
        </select>
      </div>
    </form>
  );
};
