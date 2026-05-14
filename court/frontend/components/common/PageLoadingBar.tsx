'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function PageLoadingBar() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-0.5 pointer-events-none">
      <div
        className={cn(
          'h-full bg-gradient-to-r from-gold via-lightgold to-gold transition-all duration-500 ease-out',
          loading ? 'w-full opacity-100' : 'w-0 opacity-0'
        )}
        style={{
          transitionDuration: loading ? '200ms' : '500ms',
          transitionTimingFunction: loading ? 'cubic-bezier(0.4, 0, 0.2, 1)' : 'ease-out',
        }}
      />
    </div>
  );
}
