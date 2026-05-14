import { create } from 'zustand'
import { AssessmentResult } from '@/frontend/types/dashboard.types'

interface CaseStore {
  assessment: AssessmentResult | null
  demoId: string | null
  setAssessment: (data: AssessmentResult) => void
  setDemoId: (id: string | null) => void
}

export const useCaseStore = create<CaseStore>((set) => ({
  assessment: null,
  demoId: null,

  setAssessment: (data) =>
    set({
      assessment: data,
    }),
  setDemoId: (id) => set({ demoId: id }),
}))
