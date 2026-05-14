'use client';

export const ReportHeader = ({ title, caseId }: { title: string; caseId: string }) => {
  return (
    <div className="mb-8 pb-6 border-b border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Legal Assessment Report</h1>
      <p className="text-gray-600">Case ID: {caseId}</p>
    </div>
  );
};
