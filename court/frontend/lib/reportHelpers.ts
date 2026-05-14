import type { ReportData } from '@/shared/types/report.types';

export function getReadinessDescription(score: number): string {
  if (score >= 80) return 'Case is well-prepared and ready for litigation proceedings.';
  if (score >= 60) return 'Case has solid foundations; minor gaps remain before trial readiness.';
  if (score >= 40) return 'Case requires moderate preparation work before filing confidently.';
  if (score >= 20) return 'Case needs substantial preparation and evidence gathering.';
  return 'Case is in early stages; significant preparation required before proceeding.';
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
  if (score >= 0.8) return 'Strongly Similar';
  if (score >= 0.6) return 'Moderately Similar';
  if (score >= 0.4) return 'Somewhat Similar';
  return 'Weakly Similar';
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
