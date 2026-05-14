'use client';

import { Loader } from 'lucide-react';

interface LoadingStateProps {
  stage?: 'analyzing' | 'scoring' | 'retrieving' | 'combining';
  message?: string;
}

export const LoadingState = ({ 
  stage = 'analyzing',
  message
}: LoadingStateProps) => {
  const defaultMessages = {
    analyzing: 'Analyzing case details...',
    scoring: 'Calculating legal assessment...',
    retrieving: 'Retrieving relevant precedents...',
    combining: 'Preparing your assessment...',
  };

  const displayMessage = message || defaultMessages[stage];

  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <Loader className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Your Case</h3>
        <p className="text-gray-600">{displayMessage}</p>
        <div className="mt-4 flex justify-center gap-1">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};
