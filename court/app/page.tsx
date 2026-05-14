'use client';

import { useRouter } from 'next/navigation';
import { PageTransition } from '@/frontend/components/animations/PageTransition';
import { HeroSection } from '@/frontend/components/home/HeroSection';
import { ProblemStatement } from '@/frontend/components/home/ProblemStatement';
import { HowItWorks } from '@/frontend/components/home/HowItWorks';
import { DemoFlow } from '@/frontend/components/home/DemoFlow';
import { FeatureHighlight } from '@/frontend/components/home/FeatureHighlight';
import { FeatureSection } from '@/frontend/components/home/FeatureSection';
import { TrustBar } from '@/frontend/components/home/TrustBar';
import { TrustIndicators } from '@/frontend/components/home/TrustIndicators';
import { DemoWalkthrough } from '@/frontend/components/demo/DemoWalkthrough';
import { DemoMetrics } from '@/frontend/components/demo/DemoMetrics';
import { DashboardPreview } from '@/frontend/components/home/DashboardPreview';
import { CourtroomPreview } from '@/frontend/components/home/CourtroomPreview';
import { FinalCTA } from '@/frontend/components/home/FinalCTA';
import { Footer } from '@/frontend/components/home/Footer';
import { ROUTES } from '@/frontend/lib/routes';
import type { DemoCaseType } from '@/frontend/lib/demoHelpers';

export default function Home() {
  const router = useRouter();

  const handleDemoSelect = (caseType: DemoCaseType) => {
    const routeMap: Record<DemoCaseType, string> = {
      'cheque-bounce': '/dashboard',
      'consumer-complaint': '/dashboard',
      'employment-dispute': '/dashboard',
    };
    router.push(routeMap[caseType]);
  };

  return (
    <PageTransition>
      <HeroSection />
      <ProblemStatement />
      <HowItWorks />
      <DemoFlow />
      <FeatureHighlight />
      <FeatureSection />
      <TrustBar />
      <TrustIndicators />
      <DemoWalkthrough onSelectCase={handleDemoSelect} />
      <DemoMetrics />
      <DashboardPreview />
      <CourtroomPreview />
      <FinalCTA />
      <Footer />
    </PageTransition>
  );
}
