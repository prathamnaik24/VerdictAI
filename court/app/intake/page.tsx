'use client';

import { PageContainer } from '@/components/layout/PageContainer';
import { PageTitle } from '@/components/common/PageTitle';
import { NavigationButtons } from '@/components/common/NavigationButtons';
import { IntakeForm } from '@/components/intake/IntakeForm';
import { CaseDetailsForm } from '@/components/intake/CaseDetailsForm';
import { EvidenceChecklist } from '@/components/intake/EvidenceChecklist';
import { PrivacyNotice } from '@/components/intake/PrivacyNotice';
import { ROUTES } from '@/lib/routes';

export default function IntakePage() {
  return (
    <PageContainer>
      <PageTitle title="Case Intake" subtitle="Tell us about your legal case" />

      <div className="max-w-2xl mx-auto space-y-8">
        <IntakeForm />
        <CaseDetailsForm />
        <EvidenceChecklist />
        <PrivacyNotice />

        <NavigationButtons
          buttons={[
            { label: 'Back to Home', href: ROUTES.HOME, variant: 'secondary' },
            { label: 'Continue to Dashboard', href: ROUTES.DASHBOARD, variant: 'primary' },
          ]}
        />
      </div>
    </PageContainer>
  );
}
