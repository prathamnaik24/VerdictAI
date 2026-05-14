import type { ReportData, ReportGenerationRequest } from '@/shared/types/report.types';
import { fetchWithRetry } from '@/frontend/lib/retryHandler';

export async function generateReport(request: ReportGenerationRequest): Promise<ReportData> {
  const result = await fetchWithRetry('/api/report', {
    method: 'POST',
    body: JSON.stringify(request),
  });

  if (!result.ok) {
    const errorMessage = result.error?.userMessage || 'Report generation failed';
    const error = new Error(errorMessage);
    (error as any).code = result.error?.code;
    (error as any).isRetryable = result.error?.isRetryable ?? false;
    throw error;
  }

  // Handle wrapped response format
  if (result.data && typeof result.data === 'object' && 'success' in (result.data as any)) {
    const wrapped = result.data as { success: boolean; data?: unknown; error?: string };
    if (!wrapped.success) {
      throw new Error(wrapped.error || 'Report generation failed');
    }
    return wrapped.data as ReportData;
  }

  // Direct data format
  if (!result.data || typeof result.data !== 'object') {
    throw new Error('Invalid report response');
  }

  return result.data as ReportData;
}