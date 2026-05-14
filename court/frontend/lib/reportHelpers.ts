import type { ReportData } from '@/shared/types/report.types';

export function getReadinessDescription(score: number): string {
  if (score >= 80) return 'This case is well-positioned for litigation. Key elements are in place.';
  if (score >= 60) return 'Solid foundations exist, but some preparation work remains before trial readiness.';
  if (score >= 40) return 'Moderate preparation is needed. Several areas require attention before filing.';
  if (score >= 20) return 'Significant preparation and evidence gathering is needed before proceeding.';
  return 'This case is in early stages. Substantial preparation will be required before moving forward.';
}

export function getScoreColor(score: number): string {
  if (score >= 80) return 'text-emerald-600';
  if (score >= 60) return 'text-green-600';
  if (score >= 40) return 'text-amber-600';
  if (score >= 20) return 'text-orange-600';
  return 'text-red-600';
}

export function getScoreBg(score: number): string {
  if (score >= 80) return 'bg-emerald-50 border-emerald-200';
  if (score >= 60) return 'bg-green-50 border-green-200';
  if (score >= 40) return 'bg-amber-50 border-amber-200';
  if (score >= 20) return 'bg-orange-50 border-orange-200';
  return 'bg-red-50 border-red-200';
}

export function getPrecedentSimilarityLabel(score: number): string {
  if (score >= 0.8) return 'Highly Relevant';
  if (score >= 0.6) return 'Moderately Relevant';
  if (score >= 0.4) return 'Somewhat Relevant';
  return 'Weakly Relevant';
}

export function getEvidenceStatus(
  item: string,
  available: string[],
  missing: string[]
): 'available' | 'missing' | 'recommended' {
  if (available.includes(item)) return 'available';
  if (missing.includes(item)) return 'missing';
  return 'recommended';
}

export function getPrintableMetadata(
  report: ReportData
): Record<string, string> {
  return {
    'Report ID': report.reportId,
    'Generated': report.generatedAt,
    'Case Title': report.matterOverview.title,
    'Dispute Type': report.matterOverview.disputeType,
    'Jurisdiction': report.matterOverview.jurisdiction,
    'Incident Date': report.matterOverview.incidentDate,
    'Predicted Direction': report.assessment.predictedDirection,
    'Confidence': report.assessment.confidence,
    'Readiness Score': `${report.assessment.readinessScore}%`,
    'Practical Risk': report.assessment.practicalRisk,
    'Favorable Factors': report.favorableFactors.length.toString(),
    'Unfavorable Factors': report.unfavorableFactors.length.toString(),
    'Missing Evidence': report.missingEvidence.length.toString(),
    'Precedents Cited': report.precedents.length.toString(),
    'Next Steps': report.nextSteps.length.toString(),
  };
}
