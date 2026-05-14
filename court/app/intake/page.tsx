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
      <PageTitle 
        title="Case Intake" 
        subtitle="Tell us about your legal case to get an AI-powered assessment" 
      />

      <div className="max-w-2xl mx-auto space-y-10">
        <IntakeForm />
        <div className="h-px bg-gray-200" />
        <CaseDetailsForm />
        <div className="h-px bg-gray-200" />
        <EvidenceChecklist />
        <div className="h-px bg-gray-200" />
        <PrivacyNotice />

        <div className="pt-4">
          <NavigationButtons
            buttons={[
              { label: 'Back to Home', href: ROUTES.HOME, variant: 'secondary' },
              { label: 'View Dashboard', href: ROUTES.DASHBOARD, variant: 'primary' },
            ]}
          />
        </div>
      </div>
    </PageContainer>
  );
}
