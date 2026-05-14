'use client';

import { PageContainer } from '@/components/layout/PageContainer';
import { PageTitle } from '@/components/common/PageTitle';
import { NavigationButtons } from '@/components/common/NavigationButtons';
import { OutcomeCard } from '@/components/dashboard/OutcomeCard';
import { ConfidenceMeter } from '@/components/dashboard/ConfidenceMeter';
import { PrecedentList } from '@/components/dashboard/PrecedentList';
import { RiskFactors } from '@/components/dashboard/RiskFactors';
import { FavorableFactors } from '@/components/dashboard/FavorableFactors';
import { ReadinessScore } from '@/components/dashboard/ReadinessScore';
import { ROUTES } from '@/lib/routes';

export default function DashboardPage() {
  const mockAssessment = {
    score: 65,
    confidence: 0.72,
    riskFactors: ['Lack of documentation', 'Delay in legal action'],
    favorableFactors: ['Clear communication records', 'Witness availability'],
    precedents: [],
  };

  return (
    <PageContainer>
      <PageTitle title="Assessment Dashboard" subtitle="Your case evaluation" />

      <div className="grid grid-cols-2 gap-6 mb-8">
        <OutcomeCard score={mockAssessment.score} />
        <ConfidenceMeter confidence={mockAssessment.confidence} />
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <RiskFactors factors={mockAssessment.riskFactors} />
        <FavorableFactors factors={mockAssessment.favorableFactors} />
      </div>

      <div className="mb-8">
        <ReadinessScore score={mockAssessment.score} />
      </div>

      <div className="mb-8">
        <PrecedentList precedents={mockAssessment.precedents} />
      </div>

      <NavigationButtons
        buttons={[
          { label: 'Back to Intake', href: ROUTES.INTAKE, variant: 'secondary' },
          { label: 'Start Simulator', href: ROUTES.SIMULATOR, variant: 'primary' },
        ]}
      />
    </PageContainer>
  );
}
