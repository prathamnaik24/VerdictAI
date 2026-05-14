import type { ReportData, ReportGenerationRequest } from '@/shared/types/report.types';

export async function generateReport(request: ReportGenerationRequest): Promise<ReportData> {
  const response = await fetch('/api/report', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Report generation failed' }));
    throw new Error(error.error || `Request failed with status ${response.status}`);
  }

  const result = await response.json();
  return result.data as ReportData;
}
