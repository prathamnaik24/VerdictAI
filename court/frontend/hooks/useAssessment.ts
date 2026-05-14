'use client'

import { useCallback, useState } from 'react'
import { assessCase } from '@/frontend/services/assessment.service'
import { useCaseStore } from '@/frontend/store/useCaseStore'
import { createApiError } from '@/frontend/lib/apiError'

export function useAssessment() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [errorContext, setErrorContext] = useState<{
    isRetryable: boolean
    code?: string
  } | null>(null)

  const setAssessment = useCaseStore(
    (state) => state.setAssessment
  )

  async function runAssessment(data: any) {
    try {
      setLoading(true)
      setError('')
      setErrorContext(null)

      const result = await assessCase(data)

      setAssessment(result)

      return result
    } catch (err) {
      if (err instanceof Error) {
        const userMessage = err.message || 'Assessment failed'
        const apiCode = (err as any).code
        const isRetryable = (err as any).isRetryable ?? false

        setError(userMessage)
        setErrorContext({ isRetryable, code: apiCode })
      } else {
        setError('Unable to complete the assessment')
        setErrorContext({ isRetryable: true })
      }
      console.warn('[useAssessment] Assessment error:', err)
    } finally {
      setLoading(false)
    }
  }

  async function retry(data: any) {
    setError('')
    setErrorContext(null)
    return runAssessment(data)
  }

  return {
    runAssessment,
    retry,
    loading,
    error,
    errorContext,
  }
}