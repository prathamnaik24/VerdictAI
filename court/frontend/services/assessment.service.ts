import { AssessmentResult } from '@/frontend/types/dashboard.types'
import { fetchWithRetry } from '@/frontend/lib/retryHandler'

export async function assessCase(data: any): Promise<AssessmentResult> {
  // Ensure we send the server the expected ExtractionRequest shape.
  // Accept either a pre-built payload with `rawFacts` or an intake form object
  // (title, description, location, dateOfIncident, disputeType).
  let payload: any

  if (typeof data === 'string') {
    payload = { rawFacts: data }
  } else if (data && typeof data === 'object' && 'rawFacts' in data) {
    payload = data
  } else if (data && typeof data === 'object') {
    const parts: string[] = []
    if (data.title) parts.push(String(data.title))
    if (data.description) parts.push(String(data.description))
    if (data.location) parts.push(`Location: ${data.location}`)
    if (data.dateOfIncident) parts.push(`Date: ${data.dateOfIncident}`)

    payload = {
      rawFacts: parts.join('\n\n'),
      disputeHint: data.disputeType,
      privacyMode: data.privacyMode ?? false,
    }
  } else {
    payload = { rawFacts: '' }
  }

  const result = await fetchWithRetry('/api/extract', {
    method: 'POST',
    body: JSON.stringify(payload),
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