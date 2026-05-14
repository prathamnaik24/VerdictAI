'use client';

import clsx from 'clsx';

export interface TimelineEvent {
  date: string;
  label: string;
  description?: string;
  completed: boolean;
  isActive?: boolean;
}

interface ReportTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export function ReportTimeline({ events, className }: ReportTimelineProps) {
  return (
    <div className={clsx('relative', className)}>
      {events.map((event, i) => (
        <div key={i} className="flex gap-4 pb-6 last:pb-0 relative">
          <div className="flex flex-col items-center">
            <div
              className={clsx(
                'w-3.5 h-3.5 rounded-full border-2 shrink-0 z-10',
                event.completed
                  ? 'bg-navy border-navy'
                  : 'bg-white border-gray-300',
                event.isActive && 'ring-2 ring-gold ring-offset-2'
              )}
            />
            {i < events.length - 1 && (
              <div
                className={clsx(
                  'w-0.5 flex-1 -mt-0.5',
                  event.completed ? 'bg-navy/20' : 'bg-gray-200'
                )}
              />
            )}
          </div>
          <div className="flex-1 pb-2">
            <p className="text-xs text-gray-500 font-medium">
              {event.date}
            </p>
            <p
              className={clsx(
                'text-sm font-medium mt-0.5',
                event.completed ? 'text-navy' : 'text-gray-400'
              )}
            >
              {event.label}
            </p>
            {event.description && (
              <p className="text-xs text-gray-500 mt-0.5">
                {event.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
