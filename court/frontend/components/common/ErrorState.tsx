'use client';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  onLoadDemo?: () => void;
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
  onLoadDemo,
}: ErrorStateProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-offwhite">
      <div className="text-center max-w-md px-6">
        <div className="w-14 h-14 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mx-auto mb-4">
          <span className="text-red-500 text-xl font-bold">!</span>
        </div>
        <p className="text-xl font-medium text-navy mb-2 font-serif">
          {title}
        </p>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          {message}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-5 py-2.5 bg-navy text-white rounded-lg hover:bg-navy/90 transition-colors text-sm font-medium min-w-[140px]"
            >
              Try Again
            </button>
          )}
          {onLoadDemo && (
            <button
              onClick={onLoadDemo}
              className="px-5 py-2.5 bg-white text-navy border border-navy/20 rounded-lg hover:bg-offwhite transition-colors text-sm font-medium min-w-[140px]"
            >
              Load Demo Case
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
