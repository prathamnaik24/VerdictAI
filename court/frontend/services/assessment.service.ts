import { AssessmentResult } from '@/frontend/types/dashboard.types'

export async function assessCase(data: any): Promise<AssessmentResult> {
  const response = await fetch('/api/extract', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to assess case')
  }

  return response.json()
}
