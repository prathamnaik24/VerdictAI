import { create } from 'zustand'
import { AssessmentResult } from '@/frontend/types/dashboard.types'

interface CaseStore {
  assessment: AssessmentResult | null
  setAssessment: (data: AssessmentResult) => void
}

export const useCaseStore = create<CaseStore>((set) => ({
  assessment: null,

  setAssessment: (data) =>
    set({
      assessment: data,
    }),
}))
