'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageTitle } from '@/components/common/PageTitle';
import { NavigationButtons } from '@/components/common/NavigationButtons';
import { OutcomeCard } from '@/components/dashboard/OutcomeCard';
import { ConfidenceMeter } from '@/components/dashboard/ConfidenceMeter';
import { PrecedentList } from '@/components/dashboard/PrecedentList';
import { RiskFactors } from '@/components/dashboard/RiskFactors';
import { FavorableFactors } from '@/components/dashboard/FavorableFactors';
import { ReadinessScore } from '@/components/dashboard/ReadinessScore';
import { MissingEvidenceCard } from '@/components/dashboard/MissingEvidenceCard';
import { PracticalRiskCard } from '@/components/dashboard/PracticalRiskCard';
import { LoadingState } from '@/components/dashboard/LoadingState';
import { ErrorState } from '@/components/dashboard/ErrorState';
import { useAssessment } from '@/hooks/useAssessment';
import { ROUTES } from '@/lib/routes';

export default function DashboardPage() {
  const router = useRouter();
  const { 
    assessment, 
    scoring,
    precedents,
    loading, 
    error, 
    runAssessment,
    currentCase 
  } = useAssessment();

  /**
   * Redirect to intake if no case data
   */
  useEffect(() => {
    if (!loading && !currentCase) {
      router.push(ROUTES.INTAKE);
    }
  }, [currentCase, loading, router]);

  /**
   * Show loading state
   */
  if (loading) {
    return (
      <PageContainer>
        <PageTitle title="Assessment Dashboard" subtitle="Analyzing your case..." />
        <LoadingState />
      </PageContainer>
    );
  }

  /**
   * Show error state
   */
  if (error) {
    return (
      <PageContainer>
        <PageTitle title="Assessment Dashboard" subtitle="Unable to complete assessment" />
        <ErrorState error={error} onRetry={runAssessment} />
        <div className="mt-8">
          <NavigationButtons
            buttons={[
              { label: 'Back to Intake', href: ROUTES.INTAKE, variant: 'secondary' },
            ]}
          />
        </div>
      </PageContainer>
    );
  }

  /**
   * Show empty state if no assessment
   */
  if (!assessment || !scoring) {
    return (
      <PageContainer>
        <PageTitle title="Assessment Dashboard" subtitle="No assessment available" />
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <p className="text-gray-700 mb-4">Please complete the intake form to receive an assessment.</p>
          <NavigationButtons
            buttons={[
              { label: 'Go to Intake', href: ROUTES.INTAKE, variant: 'primary' },
            ]}
          />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageTitle 
        title="Your Case Assessment" 
        subtitle={`${currentCase?.title || 'Case'} - ${currentCase?.disputeType || 'Unknown Type'}`}
      />

      {/* SECTION 1: Legal Direction + Confidence + Readiness */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <OutcomeCard 
          score={scoring.legalDirectionScore}
          label={scoring.legalDirectionLabel}
          explanation={scoring.legalDirectionExplanation}
        />
        <ConfidenceMeter 
          confidence={scoring.confidenceLevel ? 
            getConfidenceNumeric(scoring.confidenceLevel) : 0.65
          }
          label={scoring.confidenceLevel as any}
        />
        <ReadinessScore 
          score={scoring.readinessScore}
          level={scoring.readinessLevel}
          blockers={scoring.readinessBlockers}
        />
      </div>

      {/* SECTION 2: Favorable Factors + Risk Factors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <FavorableFactors factors={scoring.favorableFactors || []} />
        <RiskFactors factors={scoring.riskFactors || []} />
      </div>

      {/* SECTION 3: Missing Evidence */}
      <div className="mb-8">
        <MissingEvidenceCard 
          missingEvidence={scoring.missingEvidence || []}
          impact={scoring.evidenceGapImpact || 'Significant'}
        />
      </div>

      {/* SECTION 4: Practical Risk (The Differentiator) */}
      <div className="mb-8">
        <PracticalRiskCard 
          score={scoring.practicalRiskScore}
          difficulty={scoring.practicalDifficulty}
          riskFactors={scoring.practicalRiskFactors || []}
        />
      </div>

      {/* SECTION 5: Precedents */}
      <div className="mb-8">
        <PrecedentList precedents={precedents || []} />
      </div>

      {/* SECTION 6: Recommendations */}
      {scoring.recommendedActions && scoring.recommendedActions.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Next Steps</h3>
          <ol className="space-y-3">
            {scoring.recommendedActions.map((action, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  {i + 1}
                </span>
                <span className="text-gray-800 pt-0.5">{action}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Navigation */}
      <NavigationButtons
        buttons={[
          { label: 'Back to Intake', href: ROUTES.INTAKE, variant: 'secondary' },
          { label: 'Start Simulator', href: ROUTES.SIMULATOR, variant: 'primary' },
        ]}
      />
    </PageContainer>
  );
}

/**
 * Helper: Convert confidence label to numeric value
 */
const getConfidenceNumeric = (label: string | undefined): number => {
  const map: Record<string, number> = {
    'Very High': 0.95,
    'High': 0.8,
    'Moderate': 0.65,
    'Low': 0.4,
  };
  return map[label || 'Moderate'] || 0.65;
};
