'use client';

import { PageContainer } from '@/components/layout/PageContainer';
import { NavigationButtons } from '@/components/common/NavigationButtons';
import { ReportHeader } from '@/components/report/ReportHeader';
import { ReportSummary } from '@/components/report/ReportSummary';
import { ReportPrediction } from '@/components/report/ReportPrediction';
import { ReportPrecedents } from '@/components/report/ReportPrecedents';
import { ReportDisclaimer } from '@/components/report/ReportDisclaimer';
import { ROUTES } from '@/lib/routes';

export default function ReportPage() {
  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto">
        <ReportHeader title="Sample Case" caseId="case-001" />
        <ReportSummary summary="This is a summary of the legal assessment..." />
        <ReportPrediction score={65} likelihood="Likely" />
        <ReportPrecedents precedents={[]} />
        <ReportDisclaimer />

        <div className="mt-8">
          <NavigationButtons
            buttons={[
              { label: 'Back to Simulator', href: ROUTES.SIMULATOR, variant: 'secondary' },
              { label: 'Back to Home', href: ROUTES.HOME, variant: 'primary' },
            ]}
          />
        </div>
      </div>
    </PageContainer>
  );
}
