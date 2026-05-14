'use client';

import { motion } from 'framer-motion';
import { Container } from '@/frontend/components/common/Container';
import { SectionHeading } from '@/frontend/components/common/SectionHeading';
import { DemoScenarioCard } from './DemoScenarioCard';
import type { DemoCaseType } from '@/frontend/lib/demoHelpers';

interface DemoWalkthroughProps {
  onSelectCase: (type: DemoCaseType) => void;
}

const CASES: DemoCaseType[] = ['security-deposit', 'unpaid-loan', 'breach-contract'];

export function DemoWalkthrough({ onSelectCase }: DemoWalkthroughProps) {
  return (
    <section className="py-20 md:py-24 bg-offwhite border-t border-gray-200">
      <Container>
        <SectionHeading
          title="Try VerdictAI in Seconds"
          subtitle="Select a pre-built demo case and experience the full pipeline — from AI analysis to courtroom simulation to readiness report."
          size="md"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
          {CASES.map((type, i) => (
            <DemoScenarioCard
              key={type}
              type={type}
              onSelect={onSelectCase}
              index={i}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-navy/5 rounded-full text-xs text-navy/60">
            <span className="w-2 h-2 bg-emerald-500 rounded-full" />
            No sign-up required &middot; Instant results &middot; India-focused case law
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
