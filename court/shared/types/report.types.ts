import type { ScoringOutput } from './assessment.types';
import type { Precedent } from './precedent.types';

export interface ReportMatterOverview {
  title: string;
  disputeType: string;
  jurisdiction: string;
  incidentDate: string;
}

export interface ReportPrecedent {
  title: string;
  relevance: string;
  summary: string;
  outcomeDirection: 'favorable' | 'unfavorable' | 'mixed';
}

export interface ReportAssessment {
  predictedDirection: string;
  confidence: string;
  readinessScore: number;
  practicalRisk: string;
}

export interface ReportSimulationFeedback {
  overallPerformance: string;
  strongestPoint: string;
  weakestPoint: string;
  judgeConcerns: string[];
  suggestedImprovements: string[];
}

export interface ReportData {
  reportId: string;
  generatedAt: string;
  matterOverview: ReportMatterOverview;
  factsSummary: string;
  applicableProvisions: string[];
  precedents: ReportPrecedent[];
  assessment: ReportAssessment;
  favorableFactors: string[];
  unfavorableFactors: string[];
  missingEvidence: string[];
  simulationFeedback: ReportSimulationFeedback;
  nextSteps: string[];
  privacyNote: string;
  disclaimer: string;
}

export interface ReportGenerationRequest {
  matterOverview: ReportMatterOverview;
  factsSummary: string;
  applicableProvisions?: string[];
  assessment: ScoringOutput;
  precedents?: Precedent[];
  simulationFeedback?: {
    overallPerformance?: string;
    strongestPoint?: string;
    weakestPoint?: string;
    argumentScore?: number;
    judgeConcerns?: string[];
    suggestedImprovements?: string[];
  };
}
