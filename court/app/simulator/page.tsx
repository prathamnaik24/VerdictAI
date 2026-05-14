'use client';

import { PageContainer } from '@/components/layout/PageContainer';
import { PageTitle } from '@/components/common/PageTitle';
import { NavigationButtons } from '@/components/common/NavigationButtons';
import { OpeningStatement } from '@/components/simulator/OpeningStatement';
import { OpposingCounsel } from '@/components/simulator/OpposingCounsel';
import { JudgeQuestions } from '@/components/simulator/JudgeQuestions';
import { SimulationFeedback } from '@/components/simulator/SimulationFeedback';
import { ROUTES } from '@/lib/routes';

export default function SimulatorPage() {
  return (
    <PageContainer>
      <PageTitle title="Courtroom Simulator" subtitle="Practice your case" />

      <div className="max-w-4xl mx-auto space-y-6 mb-8">
        <OpeningStatement />
        <OpposingCounsel argument="Opposing counsel response will appear here..." />
        <JudgeQuestions question="Judge's question will appear here..." />
        <SimulationFeedback feedback="Feedback will appear here..." />
      </div>

      <NavigationButtons
        buttons={[
          { label: 'Back to Dashboard', href: ROUTES.DASHBOARD, variant: 'secondary' },
          { label: 'View Report', href: ROUTES.REPORT, variant: 'primary' },
        ]}
      />
    </PageContainer>
  );
}
