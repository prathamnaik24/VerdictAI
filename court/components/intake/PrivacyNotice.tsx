'use client';

export const PrivacyNotice = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h4 className="font-semibold text-gray-900 mb-2">Your Data Is Secure</h4>
      <p className="text-sm text-gray-600">
        All case information is encrypted and processed securely. We do not store
        or share personal data. This tool provides analysis only and is not a
        substitute for professional legal counsel.
      </p>
    </div>
  );
};
