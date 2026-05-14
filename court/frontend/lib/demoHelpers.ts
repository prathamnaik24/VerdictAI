import type { ReportData, ReportSimulationFeedback } from '@/shared/types/report.types';
import type { SimulationResponse } from '@/shared/types/simulation.types';
import demoReports from '@/dataset/demoReports.json';
import demoSimulations from '@/dataset/demoSimulation.json';

export type DemoCaseType = 'cheque-bounce' | 'consumer-complaint' | 'employment-dispute';

export function getRandomDemoCaseType(): DemoCaseType {
  const types: DemoCaseType[] = ['cheque-bounce', 'consumer-complaint', 'employment-dispute'];
  return types[Math.floor(Math.random() * types.length)];
}

export function getDemoReport(caseType?: DemoCaseType): ReportData {
  const index = caseType
    ? { 'cheque-bounce': 0, 'consumer-complaint': 1, 'employment-dispute': 2 }[caseType]
    : Math.floor(Math.random() * (demoReports as unknown[]).length);
  return (demoReports as unknown as ReportData[])[index] as ReportData;
}

export function getDemoSimulation(caseType?: DemoCaseType): SimulationResponse {
  const index = caseType
    ? { 'cheque-bounce': 0, 'consumer-complaint': 1, 'employment-dispute': 2 }[caseType]
    : Math.floor(Math.random() * (demoSimulations as unknown[]).length);
  return (demoSimulations as unknown as SimulationResponse[])[index] as SimulationResponse;
}

export function sanitizeReport(partial: Partial<ReportData>): ReportData {
  return {
    reportId: partial.reportId || `fallback-${Date.now()}`,
    generatedAt: partial.generatedAt || new Date().toISOString(),
    matterOverview: {
      title: partial.matterOverview?.title || 'Untitled Case',
      disputeType: partial.matterOverview?.disputeType || 'General Dispute',
      jurisdiction: partial.matterOverview?.jurisdiction || 'Not specified',
      incidentDate: partial.matterOverview?.incidentDate || 'Not specified',
    },
    factsSummary: partial.factsSummary || 'No facts summary available.',
    applicableProvisions: partial.applicableProvisions || [],
    precedents: partial.precedents || [],
    assessment: {
      predictedDirection: partial.assessment?.predictedDirection || 'Pending Analysis',
      confidence: partial.assessment?.confidence || 'Low',
      readinessScore: partial.assessment?.readinessScore ?? 0,
      practicalRisk: partial.assessment?.practicalRisk || 'Unknown',
    },
    favorableFactors: partial.favorableFactors || [],
    unfavorableFactors: partial.unfavorableFactors || [],
    missingEvidence: partial.missingEvidence || [],
    simulationFeedback: {
      overallPerformance: partial.simulationFeedback?.overallPerformance || 'Simulation not completed',
      strongestPoint: partial.simulationFeedback?.strongestPoint || 'Not assessed',
      weakestPoint: partial.simulationFeedback?.weakestPoint || 'Not assessed',
      judgeConcerns: partial.simulationFeedback?.judgeConcerns || [],
      suggestedImprovements: partial.simulationFeedback?.suggestedImprovements || [],
    },
    nextSteps: partial.nextSteps || ['Consult with legal counsel for case-specific advice'],
    privacyNote: partial.privacyNote || 'This report is for informational purposes only.',
    disclaimer:
      partial.disclaimer ||
      'This is an AI-assisted assessment and does not constitute legal advice.',
  };
}

export const DEMO_LABELS: Record<DemoCaseType, { title: string; subtitle: string }> = {
  'cheque-bounce': {
    title: 'Cheque Bounce Dispute',
    subtitle: 'Section 138 NI Act — Rajesh Kumar vs. Suresh Traders',
  },
  'consumer-complaint': {
    title: 'Consumer Complaint',
    subtitle: 'Defective Product — Priya Sharma vs. HomeGlad Appliances',
  },
  'employment-dispute': {
    title: 'Wrongful Termination',
    subtitle: 'Labour Law — Amit Verma vs. TechCore Solutions',
  },
};
