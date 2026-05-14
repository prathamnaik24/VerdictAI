'use client';

import { PageContainer } from '@/components/layout/PageContainer';
import { PageTitle } from '@/components/common/PageTitle';
import { NavigationButtons } from '@/components/common/NavigationButtons';
import { HeroSection } from '@/components/home/HeroSection';
import { FeatureCards } from '@/components/home/FeatureCards';
import { CTASection } from '@/components/home/CTASection';
import { ROUTES } from '@/lib/routes';

export default function Home() {
  return (
    <PageContainer>
      <HeroSection />
      <FeatureCards />
      <CTASection />
      <div className="mt-12">
        <NavigationButtons
          buttons={[
            { label: 'Get Started', href: ROUTES.INTAKE, variant: 'primary' },
            { label: 'Learn More', href: '#', variant: 'secondary' },
          ]}
        />
      </div>
    </PageContainer>
  );
}
