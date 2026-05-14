'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
  suggestion?: string;
}

export const ErrorState = ({ 
  error,
  onRetry,
  suggestion
}: ErrorStateProps) => {
  const getSuggestion = () => {
    if (suggestion) return suggestion;
    
    if (error.includes('extraction')) {
      return 'Please provide more detailed case information and try again.';
    }
    if (error.includes('scoring')) {
      return 'Ensure you have selected a valid dispute type and provided sufficient details.';
    }
    if (error.includes('precedent')) {
      return 'Precedent database may be temporarily unavailable. Please try again.';
    }
    return 'An unexpected error occurred. Please try again or contact support.';
  };

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-8">
      <div className="flex items-start gap-4">
        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-2">Unable to Complete Assessment</h3>
          <p className="text-gray-700 mb-4">{error}</p>
          <p className="text-sm text-gray-600 mb-6">{getSuggestion()}</p>

          <div className="flex gap-2">
            {onRetry && (
              <button
                onClick={onRetry}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
            )}
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
