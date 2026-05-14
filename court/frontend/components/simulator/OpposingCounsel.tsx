'use client';

interface OpposingCounselProps {
  argument: string;
}

export function OpposingCounsel({ argument }: OpposingCounselProps) {
  return (
    <div className="bg-white border border-red-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-red-600 text-lg" aria-hidden="true">&#9878;</span>
        <p className="text-xs font-semibold text-red-600 uppercase tracking-widest">
          Opposing Counsel Response
        </p>
      </div>
      <p className="text-gray-700 leading-relaxed">{argument}</p>
    </div>
  );
}
