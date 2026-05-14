// Case store using Zustand
'use client';

import { create } from 'zustand';
import { CaseDetails } from '@/types/case.types';

interface CaseStore {
  cases: CaseDetails[];
  currentCase: CaseDetails | null;
  addCase: (caseData: CaseDetails) => void;
  setCurrentCase: (caseData: CaseDetails) => void;
  clearCases: () => void;
}

export const useCaseStore = create<CaseStore>((set) => ({
  cases: [],
  currentCase: null,
  addCase: (caseData) =>
    set((state) => ({ cases: [...state.cases, caseData] })),
  setCurrentCase: (caseData) => set({ currentCase: caseData }),
  clearCases: () => set({ cases: [], currentCase: null }),
}));
