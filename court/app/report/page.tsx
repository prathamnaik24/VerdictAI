'use client';

import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSafeReport } from '@/frontend/hooks/useSafeReport';
import { ReportCover } from '@/frontend/components/report/ReportCover';
import { ReportMetricCard } from '@/frontend/components/report/ReportMetricCard';
import { ReportSummary } from '@/frontend/components/report/ReportSummary';
import { ReportTimeline } from '@/frontend/components/report/ReportTimeline';
import type { TimelineEvent } from '@/frontend/components/report/ReportTimeline';
import { ReportPrediction } from '@/frontend/components/report/ReportPrediction';
import { ReportSection } from '@/frontend/components/report/ReportSection';
import { ReportFactors } from '@/frontend/components/report/ReportFactors';
import { ReportEvidenceChecklist } from '@/frontend/components/report/ReportEvidenceChecklist';
import { ReportPrecedents } from '@/frontend/components/report/ReportPrecedents';
import { ReportSimulation } from '@/frontend/components/report/ReportSimulation';
import { ReportNextSteps } from '@/frontend/components/report/ReportNextSteps';
import { ReportDisclaimer } from '@/frontend/components/report/ReportDisclaimer';
import { ReportStatusBadge } from '@/frontend/components/report/ReportStatusBadge';
import { ReportSkeleton } from '@/frontend/components/report/ReportSkeleton';
import { ReportFallback } from '@/frontend/components/report/ReportFallback';
import { NavigationButtons } from '@/frontend/components/common/NavigationButtons';
import { LoadingState } from '@/frontend/components/common/LoadingState';
import { ErrorState } from '@/frontend/components/common/ErrorState';
import { PageTransition } from '@/frontend/components/animations/PageTransition';
import { StaggerContainer, staggerItem } from '@/frontend/components/animations/StaggerContainer';
import { FloatingActionButton } from '@/frontend/components/common/FloatingActionButton';
import { ROUTES } from '@/frontend/lib/routes';
import { formatShortDate, confidenceBadge } from '@/frontend/lib/reportFormatter';
import type { DemoCaseType } from '@/frontend/lib/demoHelpers';
import type { ReportGenerationRequest } from '@/shared/types/report.types';

function parseRelevance(relevance: string): number {
  return parseInt(relevance.replace('%', ''), 10) || 0;
}

function buildTimelineEvents(
  incidentDate: string,
  generatedAt: string,
  confidence: string
): TimelineEvent[] {
  const base = new Date(incidentDate);
  const addDays = (d: Date, n: number) => {
    const next = new Date(d);
    next.setDate(next.getDate() + n);
    return next;
  };

  return [
    {
      date: formatShortDate(incidentDate),
      label: 'Incident Date',
      description: 'Date of alleged breach or dispute trigger event',
      completed: true,
    },
    {
      date: formatShortDate(addDays(base, 14).toISOString()),
      label: 'Filing Preparation Initiated',
      description: 'Legal team engaged and case assessment started',
      completed: true,
    },
    {
      date: formatShortDate(addDays(base, 30).toISOString()),
      label: 'Evidence Collection Phase',
      description: 'Document gathering, witness identification, and discovery',
      completed: true,
    },
    {
      date: formatShortDate(addDays(base, 45).toISOString()),
      label: 'AI Simulation Completed',
      description: 'Courtroom simulation run with opposing counsel and judge analysis',
      completed: true,
    },
    {
      date: formatShortDate(generatedAt),
      label: 'Report Generated',
      description: `Final assessment with ${confidence.toLowerCase()} confidence level`,
      completed: true,
      isActive: true,
    },
  ];
}

const DEMO_INPUT: ReportGenerationRequest = {
  matterOverview: {
    title: 'Sharma vs. Gupta — Breach of Service Contract',
    disputeType: 'Breach of Service Contract',
    jurisdiction: 'Delhi High Court',
    incidentDate: '2025-06-15',
  },
  factsSummary:
    'This case involves a contractual dispute between two parties regarding the breach of a software development service agreement. The plaintiff alleges that the defendant failed to deliver the agreed-upon deliverables as outlined in the service agreement dated March 2024, resulting in financial losses and project delays.',
  applicableProvisions: ['Section 73 of the Indian Contract Act, 1872'],
  assessment: {
    disputeType: 'breach-of-service-contract',
    caseId: 'case-demo-001',
    generatedAt: new Date(),
    legalDirectionScore: 72,
    legalDirectionLabel: 'Favorable',
    legalDirectionExplanation:
      'The facts support a favorable legal direction based on contract law principles.',
    practicalRiskScore: 35,
    practicalDifficulty: 'Moderate',
    practicalRiskFactors: [
      {
        title: 'Documentation gaps',
        severity: 'medium',
        impact: 'legal',
        explanation: 'Several key documents lack signatures',
      },
    ],
    evidenceStrength: 'Moderate',
    availableEvidence: [
      'Signed contract agreement',
      'Email correspondence',
      'Payment receipts (partial)',
    ],
    missingEvidence: [
      'Witness statements',
      'Financial damage records',
      'Signed delivery receipts',
    ],
    evidenceGapImpact: 'Significant',
    readinessScore: 65,
    readinessLevel: 'Mostly Ready',
    readinessBlockers: ['Missing financial evidence'],
    favorableFactors: [
      'Written contract exists with clear terms',
      'Clear breach timeline established',
      'Defendant acknowledged receipt of requirements',
      'Previous correspondence shows intent to deliver',
    ],
    precedentBoost: 0.72,
    precedentConfidence: 'High',
    riskFactors: [
      {
        title: 'Missing documentary evidence',
        severity: 'high',
        impact: 'legal',
        explanation: 'Key financial records not yet obtained through discovery',
      },
      {
        title: 'Jurisdictional ambiguity',
        severity: 'medium',
        impact: 'procedural',
        explanation: 'Venue clause in contract is open to legal interpretation',
      },
      {
        title: 'Statute of limitations proximity',
        severity: 'low',
        impact: 'procedural',
        explanation: 'Filing deadline approaches within 6 months',
      },
    ],
    precedentHeadwind: 0.2,
    confidenceLevel: 'High',
    recommendedActions: [
      'Obtain sworn witness statements from all relevant parties',
      'File jurisdiction confirmation motion',
      'Complete financial damage quantification',
    ],
    scoringVersion: '2.0',
    thresholdsUsed: ['standard-civil'],
  },
  precedents: [
    {
      id: 'prec-001',
      caseType: 'breach-of-service-contract',
      title: 'InfoSys Solutions vs. PQR Enterprises (2023)',
      forum: 'Delhi High Court',
      year: 2023,
      factsSummary:
        'A software development contract dispute where the defendant failed to deliver a custom ERP solution within the agreed timeline. The court ruled in favor of the plaintiff, awarding damages equivalent to 40% of the contract value for loss of business opportunity.',
      evidenceSignals: ['Signed contract', 'Timeline evidence'],
      positiveFactors: ['Clear delivery milestones', 'Written communications'],
      negativeFactors: ['Partial delivery accepted'],
      outcome: {
        direction: 'favorable',
        summary: 'Plaintiff awarded damages for breach of contract',
      },
      applicableLaws: [
        {
          lawName: 'Indian Contract Act',
          section: 'Section 73',
          label: 'Compensation for breach',
          whenApplicable: 'When contract terms are clearly defined',
          plainEnglishExplanation:
            'The party suffering from the breach is entitled to compensation for the loss caused.',
        },
      ],
      tags: ['breach', 'software', 'damages'],
      relevanceScore: 0.85,
    },
    {
      id: 'prec-002',
      caseType: 'breach-of-service-contract',
      title: 'Technova Ltd. vs. State of Maharashtra (2021)',
      forum: 'Supreme Court of India',
      year: 2021,
      factsSummary:
        'Jurisdictional challenge in a service contract dispute where the defendant argued that the contract\'s forum selection clause was invalid due to unequal bargaining power.',
      evidenceSignals: ['Forum selection clause'],
      positiveFactors: [],
      negativeFactors: ['Bargaining power disparity'],
      outcome: {
        direction: 'mixed',
        summary:
          'Partially favorable — jurisdiction upheld but with conditions on evidence admissibility',
      },
      applicableLaws: [
        {
          lawName: 'Code of Civil Procedure',
          section: 'Section 20',
          label: 'Territorial jurisdiction',
          whenApplicable:
            'When determining the appropriate court for contract disputes',
          plainEnglishExplanation:
            'A suit can be filed where the defendant resides or where the cause of action arises.',
        },
      ],
      tags: ['jurisdiction', 'forum-selection', 'service-contract'],
      relevanceScore: 0.62,
    },
    {
      id: 'prec-003',
      caseType: 'breach-of-service-contract',
      title: 'Agarwal & Sons vs. Bhardwaj Networks (2022)',
      forum: 'Bombay High Court',
      year: 2022,
      factsSummary:
        'Dispute over non-payment for completed services where the defendant claimed substandard delivery. The court applied the substantial performance doctrine.',
      evidenceSignals: ['Delivery records', 'Quality assessment reports'],
      positiveFactors: ['Substantial performance shown'],
      negativeFactors: ['Minor quality deviations'],
      outcome: {
        direction: 'favorable',
        summary:
          'Plaintiff entitled to payment with a 15% deduction for quality deviations',
      },
      applicableLaws: [
        {
          lawName: 'Indian Contract Act',
          section: 'Section 51',
          label: 'Reciprocal promises',
          whenApplicable:
            'When both parties have obligations under the contract',
          plainEnglishExplanation:
            'Both parties must fulfill their respective promises under the agreement.',
        },
      ],
      tags: ['payment', 'substantial-performance', 'quality'],
      relevanceScore: 0.55,
    },
  ],
  simulationFeedback: {
    overallPerformance: 'Strong argument foundation with opportunities for refinement',
    strongestPoint:
      'Clear identification of contractual breach supported by documented timeline',
    weakestPoint:
      'Insufficient quantification of financial damages and business impact',
    argumentScore: 72,
    judgeConcerns: [
      'Need more concrete evidence on financial impact and loss calculation',
      'Jurisdictional question needs stronger legal precedent support',
    ],
    suggestedImprovements: [
      'Prepare a detailed damage calculation with expert valuation',
      'Gather additional witness statements from project stakeholders',
      'Strengthen jurisdictional argument with recent case law',
      'Document the timeline of communications more systematically',
    ],
  },
};

function findMissingSections(report: {
  favorableFactors: string[];
  unfavorableFactors: string[];
  missingEvidence: string[];
  precedents: unknown[];
  simulationFeedback: { overallPerformance: string };
}): string[] {
  const missing: string[] = [];
  if (report.favorableFactors.length === 0 && report.unfavorableFactors.length === 0)
    missing.push('Factor Analysis');
  if (report.precedents.length === 0) missing.push('Precedent Analysis');
  if (report.simulationFeedback.overallPerformance === 'Simulation not completed')
    missing.push('Simulation Feedback');
  return missing;
}

export default function ReportPage() {
  const {
    loading,
    error,
    report,
    isDemo,
    fetchReportSafe,
    loadDemoFallback,
  } = useSafeReport();

  useEffect(() => {
    fetchReportSafe(DEMO_INPUT);
  }, [fetchReportSafe]);

  const timelineEvents = useMemo(
    () =>
      report
        ? buildTimelineEvents(
            report.matterOverview.incidentDate,
            report.generatedAt,
            report.assessment.confidence
          )
        : [],
    [report]
  );

  const avgPrecedentSimilarity = useMemo(() => {
    if (!report || report.precedents.length === 0) return 0;
    const total = report.precedents.reduce(
      (sum, p) => sum + parseRelevance(p.relevance),
      0
    );
    return Math.round(total / report.precedents.length);
  }, [report]);

  const confidenceMeta = useMemo(
    () =>
      report
        ? confidenceBadge(report.assessment.confidence)
        : { label: '', color: '' },
    [report]
  );

  const missingSections = useMemo(
    () => (report ? findMissingSections(report) : []),
    [report]
  );

  if (loading && !report) return <ReportSkeleton />;

  if (error) {
    return (
      <ErrorState
        title="Report Generation Failed"
        message={error}
        onRetry={() => fetchReportSafe(DEMO_INPUT)}
        onLoadDemo={() => loadDemoFallback()}
      />
    );
  }

  if (!report) return <ReportSkeleton />;

  return (
    <PageTransition>
      <div className="min-h-screen bg-offwhite py-10 md:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          <StaggerContainer>
            <motion.div variants={staggerItem}>
              {isDemo && (
                <div className="bg-amber-50/70 border border-amber-200 rounded-lg px-4 py-3 text-center">
                  <p className="text-sm text-amber-800">
                    Showing demo report. Run a full case assessment to generate a custom report.
                  </p>
                </div>
              )}
            </motion.div>

            <motion.div variants={staggerItem}>
              <ReportCover report={report} />
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
            >
              <ReportMetricCard
                label="Readiness Score"
                value={`${report.assessment.readinessScore}%`}
                subtitle={report.assessment.practicalRisk}
                color={
                  report.assessment.readinessScore >= 60
                    ? 'text-emerald-600'
                    : report.assessment.readinessScore >= 40
                      ? 'text-amber-600'
                      : 'text-red-500'
                }
              />
              <ReportMetricCard
                label="Confidence"
                value={report.assessment.confidence}
                subtitle="Assessment reliability"
                color="text-navy"
              />
              <ReportMetricCard
                label="Precedent Match"
                value={`${avgPrecedentSimilarity}%`}
                subtitle={`${report.precedents.length} precedents`}
                color={
                  avgPrecedentSimilarity >= 60
                    ? 'text-emerald-600'
                    : 'text-amber-600'
                }
              />
              <ReportMetricCard
                label="Risk Level"
                value={report.assessment.practicalRisk}
                subtitle={
                  report.assessment.practicalRisk === 'Easy'
                    ? 'Low concern'
                    : report.assessment.practicalRisk === 'Moderate'
                      ? 'Manageable'
                      : 'Requires attention'
                }
                color={
                  report.assessment.practicalRisk === 'Easy' ||
                  report.assessment.practicalRisk === 'Moderate'
                    ? 'text-amber-600'
                    : 'text-red-500'
                }
              />
            </motion.div>

            <motion.div variants={staggerItem}>
              <ReportSummary report={report} />
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <ReportSection title="Case Timeline" titleSize="md">
                <ReportTimeline events={timelineEvents} />
              </ReportSection>

              <div className="space-y-3">
                <ReportSection title="Case Strength" titleSize="md">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Legal Direction</span>
                      <span className="text-sm font-semibold text-navy">
                        {report.assessment.predictedDirection}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gold rounded-full transition-all duration-700"
                        style={{ width: `${report.assessment.readinessScore}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>0%</span>
                      <span>Readiness: {report.assessment.readinessScore}%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </ReportSection>

                <ReportSection title="Key Indicators" titleSize="md">
                  <div className="flex flex-wrap gap-2">
                    <ReportStatusBadge
                      label={`${confidenceMeta.label} Confidence`}
                      variant={
                        report.assessment.confidence === 'Very High' ||
                        report.assessment.confidence === 'High'
                          ? 'confidence-high'
                          : report.assessment.confidence === 'Moderate'
                            ? 'confidence-moderate'
                            : 'confidence-low'
                      }
                    />
                    <ReportStatusBadge
                      label={
                        report.assessment.practicalRisk === 'Easy'
                          ? 'Low Risk'
                          : report.assessment.practicalRisk === 'Moderate'
                            ? 'Moderate Risk'
                            : 'High Risk'
                      }
                      variant={
                        report.assessment.practicalRisk === 'Easy'
                          ? 'ready'
                          : report.assessment.practicalRisk === 'Moderate'
                            ? 'risk-moderate'
                            : 'risk-high'
                      }
                    />
                    {report.missingEvidence.length > 0 && (
                      <ReportStatusBadge
                        label={`${report.missingEvidence.length} Evidence Gap${report.missingEvidence.length > 1 ? 's' : ''}`}
                        variant="evidence-missing"
                      />
                    )}
                    {report.assessment.readinessScore >= 80 && (
                      <ReportStatusBadge label="Litigation Ready" variant="ready" />
                    )}
                  </div>
                </ReportSection>
              </div>
            </motion.div>

            <motion.div variants={staggerItem}>
              {report.applicableProvisions.length > 0 && (
                <ReportSection title="Applicable Provisions">
                  <ul className="space-y-2">
                    {report.applicableProvisions.map((p, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                        <span className="text-gold font-serif text-lg leading-none mt-0.5">
                          &sect;
                        </span>
                        <span className="leading-relaxed">{p}</span>
                      </li>
                    ))}
                  </ul>
                </ReportSection>
              )}
            </motion.div>

            <motion.div variants={staggerItem}>
              <ReportPrediction report={report} />
            </motion.div>

            <motion.div variants={staggerItem}>
              <ReportFactors title="Favorable Factors" factors={report.favorableFactors} variant="favorable" />
            </motion.div>

            <motion.div variants={staggerItem}>
              <ReportFactors title="Unfavorable Factors" factors={report.unfavorableFactors} variant="unfavorable" />
            </motion.div>

            <motion.div variants={staggerItem}>
              <ReportEvidenceChecklist
                available={report.favorableFactors}
                missing={report.missingEvidence}
                recommended={report.nextSteps?.slice(0, 2)}
              />
            </motion.div>

            <motion.div variants={staggerItem}>
              <ReportPrecedents report={report} />
            </motion.div>

            <motion.div variants={staggerItem}>
              <ReportSimulation report={report} />
            </motion.div>

            <motion.div variants={staggerItem}>
              <ReportNextSteps report={report} />
            </motion.div>

            <motion.div variants={staggerItem}>
              <ReportFallback report={report} missingSections={missingSections} />
            </motion.div>

            <motion.div variants={staggerItem}>
              <ReportDisclaimer report={report} />
            </motion.div>

            <motion.div variants={staggerItem}>
              <div className="pt-2 pb-8">
                <NavigationButtons
                  buttons={[
                    { label: 'Back to Simulator', href: ROUTES.SIMULATOR, variant: 'secondary' },
                    { label: 'Back to Home', href: ROUTES.HOME, variant: 'primary' },
                  ]}
                />
              </div>
            </motion.div>
          </StaggerContainer>
        </div>
        <FloatingActionButton />
      </div>
    </PageTransition>
  );
}
