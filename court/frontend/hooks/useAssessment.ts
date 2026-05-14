'use client'

import { useState } from 'react'
import { assessCase } from '@/frontend/services/assessment.service'
import { useCaseStore } from '@/frontend/store/useCaseStore'

export function useAssessment() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const setAssessment = useCaseStore(
    (state) => state.setAssessment
  )

  async function runAssessment(data: any) {
    try {
      setLoading(true)
      setError('')

      const result = await assessCase(data)

      setAssessment(result)

      return result
    } catch (err) {
      setError('Assessment failed')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return {
    runAssessment,
    loading,
    error,
  }
}
