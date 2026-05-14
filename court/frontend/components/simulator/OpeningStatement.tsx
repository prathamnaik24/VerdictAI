'use client';

import clsx from 'clsx';

interface OpeningStatementProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function OpeningStatement({ value, onChange, disabled }: OpeningStatementProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
        Your Opening Statement
      </p>
      <textarea
        className={clsx(
          'w-full px-4 py-3 border rounded-lg h-32 resize-y transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          disabled
            ? 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-white border-gray-300 text-gray-900'
        )}
        placeholder="Present your case to the court..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
}
