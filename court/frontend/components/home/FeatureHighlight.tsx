'use client';

import { motion } from 'framer-motion';
import { Container } from '@/frontend/components/common/Container';
import { GoldDivider } from '@/frontend/components/common/GoldDivider';

const features = [
  {
    icon: '🎯',
    title: 'Semantic Precedent Search',
    description: 'Find relevant case law using AI-powered meaning matching, not just keywords.',
  },
  {
    icon: '📊',
    title: 'Explainable Scoring',
    description: 'Every score comes with a clear breakdown of favorable factors, risks, and evidence gaps.',
  },
  {
    icon: '🎭',
    title: 'AI Courtroom Simulation',
    description: 'Practice arguments against AI opposing counsel and receive structured feedback.',
  },
  {
    icon: '📄',
    title: 'Readiness Report',
    description: 'Comprehensive document covering assessment, precedents, simulation, and next steps.',
  },
];

export function FeatureHighlight() {
  return (
    <section className="py-20 md:py-24 bg-white border-t border-gray-100">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <GoldDivider width="small" className="mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-navy tracking-tight mb-3">
              Built for Legal Clarity
            </h2>
            <p className="text-sm md:text-base text-navy/60 max-w-xl mx-auto leading-relaxed">
              Four integrated capabilities that work together to give you a complete picture of your case.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.35 }}
                className="flex gap-4 p-5 rounded-xl border border-gray-100 hover:border-gold/20 hover:bg-offwhite transition-all duration-200"
              >
                <span className="text-2xl shrink-0 mt-0.5">{feature.icon}</span>
                <div>
                  <h3 className="text-base font-semibold text-navy font-serif mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
