'use client';

import React from 'react';
import { PageLoadingBar } from '@/frontend/components/common/PageLoadingBar';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageLoadingBar />
      {children}
    </>
  );
}
