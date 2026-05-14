'use client';

import { AlertCircle } from 'lucide-react';

interface MissingEvidenceCardProps {
  missingEvidence: string[];
  impact: 'Critical' | 'Significant' | 'Minor' | 'None';
}

export const MissingEvidenceCard = ({
  missingEvidence,
  impact,
}: MissingEvidenceCardProps) => {
  const impactColors = {
    Critical: 'border-red-300 bg-red-50',
    Significant: 'border-orange-300 bg-orange-50',
    Minor: 'border-yellow-300 bg-yellow-50',
    None: 'border-green-300 bg-green-50',
  };

  const impactLabels = {
    Critical: 'Critical Gap',
    Significant: 'Significant Gap',
    Minor: 'Minor Gap',
    None: 'Complete Evidence',
  };

  if (missingEvidence.length === 0) {
    return (
      <div className={`border rounded-lg p-6 ${impactColors.None}`}>
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Evidence Status</h3>
            <p className="text-sm text-gray-700">All key evidence items are available.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`border rounded-lg p-6 ${impactColors[impact]}`}>
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className={`w-5 h-5 flex-shrink-0 ${
            impact === 'Critical' ? 'text-red-600' :
            impact === 'Significant' ? 'text-orange-600' :
            'text-yellow-600'
          }`} />
          <h3 className="font-semibold text-gray-900">Missing Evidence</h3>
          <span className={`text-xs px-2 py-1 rounded font-medium ${
            impact === 'Critical' ? 'bg-red-200 text-red-800' :
            impact === 'Significant' ? 'bg-orange-200 text-orange-800' :
            'bg-yellow-200 text-yellow-800'
          }`}>
            {impactLabels[impact]}
          </span>
        </div>
        <p className="text-sm text-gray-600">
          {impact === 'Critical' && 'These items are essential to strengthen your case.'}
          {impact === 'Significant' && 'Gathering these would significantly improve your position.'}
          {impact === 'Minor' && 'These items would be helpful but not essential.'}
        </p>
      </div>

      <ul className="space-y-2">
        {missingEvidence.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className={`flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 ${
              impact === 'Critical' ? 'bg-red-600' :
              impact === 'Significant' ? 'bg-orange-600' :
              'bg-yellow-600'
            }`}></span>
            <span className="text-gray-700 text-sm">{item}</span>
          </li>
        ))}
      </ul>

      {impact === 'Critical' && (
        <div className="mt-4 p-3 bg-white bg-opacity-50 rounded border border-red-200">
          <p className="text-xs text-gray-700">
            <strong>Recommendation:</strong> Address these gaps before proceeding with litigation.
          </p>
        </div>
      )}
    </div>
  );
};
