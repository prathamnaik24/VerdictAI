'use client';

import clsx from 'clsx';

interface ProgressStep {
  label: string;
  status: 'completed' | 'active' | 'pending';
}

interface ProgressIndicatorProps {
  steps: ProgressStep[];
  className?: string;
  variant?: 'numbered' | 'dots';
}

export function ProgressIndicator({
  steps,
  className,
  variant = 'numbered',
}: ProgressIndicatorProps) {
  return (
    <div className={clsx('flex items-center', className)}>
      {steps.map((step, i) => (
        <div key={i} className="flex items-center flex-1 last:flex-none">
          {variant === 'numbered' ? (
            <div className="flex flex-col items-center">
              <div
                className={clsx(
                  'w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors duration-300',
                  step.status === 'completed' && 'bg-navy text-white',
                  step.status === 'active' &&
                    'bg-white text-navy border-2 border-navy',
                  step.status === 'pending' && 'bg-gray-100 text-gray-400'
                )}
              >
                {step.status === 'completed' ? '\u2713' : i + 1}
              </div>
              <span
                className={clsx(
                  'text-[10px] mt-1.5 whitespace-nowrap font-medium transition-colors',
                  step.status === 'completed' && 'text-navy',
                  step.status === 'active' && 'text-navy',
                  step.status === 'pending' && 'text-gray-400'
                )}
              >
                {step.label}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <div
                className={clsx(
                  'w-2 h-2 rounded-full transition-all duration-300',
                  step.status === 'completed' && 'bg-navy',
                  step.status === 'active' && 'bg-gold scale-125',
                  step.status === 'pending' && 'bg-gray-200'
                )}
              />
              {i < steps.length - 1 && (
                <div
                  className={clsx(
                    'w-6 h-0.5 mx-0.5',
                    step.status === 'completed' ? 'bg-navy' : 'bg-gray-200'
                  )}
                />
              )}
            </div>
          )}

          {i < steps.length - 1 && variant === 'numbered' && (
            <div
              className={clsx(
                'flex-1 h-0.5 mx-2 transition-colors duration-300',
                step.status === 'completed' ? 'bg-navy' : 'bg-gray-200'
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
