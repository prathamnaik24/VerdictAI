import type {
  ReportData,
  ReportGenerationRequest,
  ReportAssessment,
  ReportPrecedent,
  ReportSimulationFeedback,
} from '@/shared/types/report.types';

function generateReportId(): string {
  return `rpt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

function mapAssessment(input: ReportGenerationRequest): ReportAssessment {
  return {
    predictedDirection: input.assessment.legalDirectionLabel,
    confidence: input.assessment.confidenceLevel,
    readinessScore: input.assessment.readinessScore,
    practicalRisk: input.assessment.practicalDifficulty,
  };
}

function mapPrecedents(input: ReportGenerationRequest): ReportPrecedent[] {
  if (!input.precedents || input.precedents.length === 0) return [];
  return input.precedents.map((p) => ({
    title: p.title,
    relevance: p.relevanceScore ? `${Math.round(p.relevanceScore * 100)}%` : 'Unknown',
    summary: p.factsSummary,
    outcomeDirection: p.outcome.direction,
  }));
}

function mapSimulationFeedback(input: ReportGenerationRequest): ReportSimulationFeedback {
  const fb = input.simulationFeedback;
  return {
    overallPerformance: fb?.overallPerformance || 'Not simulated',
    strongestPoint: fb?.strongestPoint || 'N/A',
    weakestPoint: fb?.weakestPoint || 'N/A',
    judgeConcerns: fb?.judgeConcerns || [],
    suggestedImprovements: fb?.suggestedImprovements || [],
  };
}

function deriveNextSteps(input: ReportGenerationRequest): string[] {
  const steps: string[] = [];
  if (input.assessment.recommendedActions?.length) {
    steps.push(...input.assessment.recommendedActions);
  }
  if (input.assessment.missingEvidence?.length) {
    steps.push(`Address evidence gaps: ${input.assessment.missingEvidence.slice(0, 3).join(', ')}`);
  }
  if (steps.length === 0) {
    steps.push('Review assessment results with legal counsel');
  }
  return steps;
}

export async function generateReport(input: ReportGenerationRequest): Promise<ReportData> {
  return {
    reportId: generateReportId(),
    generatedAt: new Date().toISOString(),
    matterOverview: {
      title: input.matterOverview.title,
      disputeType: input.matterOverview.disputeType,
      jurisdiction: input.matterOverview.jurisdiction,
      incidentDate: input.matterOverview.incidentDate,
    },
    factsSummary: input.factsSummary,
    applicableProvisions: input.applicableProvisions || input.assessment.thresholdsUsed || [],
    precedents: mapPrecedents(input),
    assessment: mapAssessment(input),
    favorableFactors: input.assessment.favorableFactors || [],
    unfavorableFactors: input.assessment.riskFactors?.map((r) => r.title) || [],
    missingEvidence: input.assessment.missingEvidence || [],
    simulationFeedback: mapSimulationFeedback(input),
    nextSteps: deriveNextSteps(input),
    privacyNote:
      'This report contains AI-generated analysis based on the information provided. All data should be reviewed by qualified legal professionals.',
    disclaimer:
      'This is an AI-assisted assessment and does not constitute legal advice. The analysis is for informational purposes only and should not be relied upon as a substitute for professional legal counsel.',
  };
}
