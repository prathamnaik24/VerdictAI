import { AssessmentResult } from '@/frontend/types/dashboard.types'
import { fetchWithRetry } from '@/frontend/lib/retryHandler'

export async function assessCase(data: any): Promise<AssessmentResult> {
  const result = await fetchWithRetry('/api/extract', {
    method: 'POST',
    body: JSON.stringify(data),
  })

  if (!result.ok) {
    const errorMessage =
      result.error?.userMessage || 'Failed to assess case'
    const error = new Error(errorMessage)
    ;(error as any).code = result.error?.code
    ;(error as any).isRetryable = result.error?.isRetryable ?? false
    throw error
  }

  // Validate response shape before returning
  if (!result.data || typeof result.data !== 'object') {
    throw new Error('Invalid response from server')
  }

  // Handle wrapped response { success, data } format
  if ('success' in (result.data as any)) {
    const wrapped = result.data as { success: boolean; data?: unknown; error?: string }
    if (!wrapped.success) {
      const error = new Error(wrapped.error || 'Request failed')
      ;(error as any).isRetryable = false
      throw error
    }
    return wrapped.data as AssessmentResult
  }

  return result.data as AssessmentResult
}