'use client';

import { motion } from 'framer-motion';
import { Container } from '@/frontend/components/common/Container';
import { GoldDivider } from '@/frontend/components/common/GoldDivider';

const problems = [
   {
     icon: '⚖️',
     title: 'Legal Uncertainty',
     description:
       'Most people cannot evaluate their case strength before investing in litigation. Understand where you stand before committing resources.',
   },
   {
     icon: '💰',
     title: 'High Barriers to Access',
     description:
       'Quality legal analysis is expensive. Many disputes go unresolved simply because people cannot afford initial professional advice.',
   },
   {
     icon: '📊',
     title: 'No Readiness Visibility',
     description:
       'Entering court without data-driven preparation means facing avoidable risks, missing evidence, and overlooked precedents.',
   },
 ];

export function ProblemStatement() {
  return (
    <section className="py-20 md:py-24 bg-offwhite">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <GoldDivider width="small" className="mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-navy tracking-tight mb-3">
              Litigation Shouldn&apos;t Be a Gamble
            </h2>
            <p className="text-sm md:text-base text-navy/60 max-w-2xl mx-auto leading-relaxed">
              Legal disputes are stressful enough without the uncertainty of not knowing your case strength.
              VerdictAI brings data-driven clarity to litigation preparation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {problems.map((problem, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:border-gold/30 transition-colors"
              >
                <span className="text-3xl block mb-4">{problem.icon}</span>
                <h3 className="text-lg font-semibold text-navy font-serif mb-2">
                  {problem.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {problem.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
