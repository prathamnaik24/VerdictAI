import type { ReportData } from '@/shared/types/report.types';
import type { SimulationResponse } from '@/shared/types/simulation.types';
import type { DemoCase } from '@/frontend/types/case.types';
import demoCases from '@/dataset/demoCases.json';
import demoReports from '@/dataset/demoReports.json';
import demoSimulations from '@/dataset/demoSimulation.json';

export type DemoCaseType = 'security-deposit' | 'unpaid-loan' | 'breach-contract';

export function getRandomDemoCaseType(): DemoCaseType {
  const types: DemoCaseType[] = ['security-deposit', 'unpaid-loan', 'breach-contract'];
  return types[Math.floor(Math.random() * types.length)];
}

export function getDemoCases(): DemoCase[] {
  return demoCases as DemoCase[];
}

export function getDemoCaseById(id: string): DemoCase | undefined {
  return (demoCases as DemoCase[]).find((c) => c.id === id);
}

export function getDemoCaseFormData(demoCase: DemoCase) {
  return {
    disputeType: demoCase.disputeType,
    title: demoCase.title,
    description: demoCase.factsSummary,
    location: demoCase.jurisdiction,
    dateOfIncident: demoCase.incidentDate,
    amount: demoCase.amount,
  };
}

export function getDemoReport(caseType?: DemoCaseType): ReportData {
  const index = caseType
    ? { 'security-deposit': 0, 'unpaid-loan': 1, 'breach-contract': 2 }[caseType]
    : Math.floor(Math.random() * (demoReports as unknown[]).length);
  return (demoReports as unknown as ReportData[])[index] as ReportData;
}

export function getDemoSimulation(caseType?: DemoCaseType): SimulationResponse {
  const index = caseType
    ? { 'security-deposit': 0, 'unpaid-loan': 1, 'breach-contract': 2 }[caseType]
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
  'security-deposit': {
    title: 'Security Deposit Dispute',
    subtitle: 'Rent Control — Arun Mehta vs. Sunrise Properties',
  },
  'unpaid-loan': {
    title: 'Unpaid Personal Loan',
    subtitle: 'Contract Law — Neha Kapoor vs. Vikram Singh',
  },
  'breach-contract': {
    title: 'Breach of Service Contract',
    subtitle: 'Oral Agreement — Ravi Desai vs. Apex Constructions',
  },
};

export const STRENGTH_PROFILES = {
  strong: { label: 'Strong Case', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', badge: 'bg-emerald-100 text-emerald-800' },
  medium: { label: 'Medium Case', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-800' },
  weak: { label: 'Weak Case', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-100 text-red-800' },
} as const;
