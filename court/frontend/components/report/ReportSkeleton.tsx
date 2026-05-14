'use client';

export function ReportSkeleton() {
  const pulseBar = (className: string) => (
    <div className={`bg-gray-200 rounded animate-pulse ${className}`} />
  );

  return (
    <div className="min-h-screen bg-offwhite py-10 md:py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
          <div className="bg-gray-300 h-16" />
          <div className="px-6 md:px-10 py-8 md:py-10 text-center">
            <div className="w-48 h-4 bg-gray-200 rounded animate-pulse mx-auto mb-4" />
            <div className="w-72 h-6 bg-gray-200 rounded animate-pulse mx-auto mb-3" />
            <div className="w-36 h-4 bg-gray-100 rounded animate-pulse mx-auto mb-8" />
            <div className="w-16 h-1 bg-gray-100 rounded animate-pulse mx-auto mb-8" />
            <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4 space-y-2">
                  {pulseBar('h-3 w-16 mx-auto')}
                  {pulseBar('h-6 w-12 mx-auto')}
                  {pulseBar('h-3 w-20 mx-auto')}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 space-y-2">
              {pulseBar('h-3 w-20')}
              {pulseBar('h-6 w-16')}
              {pulseBar('h-3 w-24')}
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 space-y-4">
          {pulseBar('h-5 w-40')}
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-1">
                {pulseBar('h-3 w-20')}
                {pulseBar('h-4 w-32')}
              </div>
            ))}
          </div>
          {pulseBar('h-3 w-full')}
          {pulseBar('h-3 w-3/4')}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
            {pulseBar('h-5 w-32')}
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="w-3.5 h-3.5 rounded-full bg-gray-200 shrink-0" />
                <div className="flex-1 space-y-1">
                  {pulseBar('h-3 w-24')}
                  {pulseBar('h-3 w-40')}
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-3">
              {pulseBar('h-5 w-28')}
              {pulseBar('h-4 w-48')}
              {pulseBar('h-2 w-full')}
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-2">
              {pulseBar('h-5 w-28')}
              <div className="flex gap-2">
                {[1, 2].map((i) => pulseBar(`h-6 w-24 rounded-full`))}
              </div>
            </div>
          </div>
        </div>

        {[1, 2, 3].map((s) => (
          <div key={s} className="bg-white border border-gray-200 rounded-lg p-6 space-y-3">
            {pulseBar('h-5 w-48')}
            {pulseBar('h-3 w-full')}
            {pulseBar('h-3 w-5/6')}
          </div>
        ))}
      </div>
    </div>
  );
}
