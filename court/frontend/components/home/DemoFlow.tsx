'use client';

import { motion } from 'framer-motion';
import { Container } from '@/frontend/components/common/Container';
import { SectionHeading } from '@/frontend/components/common/SectionHeading';

const steps = [
  {
    number: '01',
    title: 'Submit Your Facts',
    description: 'Enter case details through our structured intake form or select a pre-built demo case.',
    color: 'from-gold/20 to-gold/5',
  },
  {
    number: '02',
    title: 'AI Analyzes Your Case',
    description: 'Our engine identifies the dispute type, extracts key facts, and retrieves relevant precedents from Indian courts.',
    color: 'from-navy/10 to-navy/5',
  },
  {
    number: '03',
    title: 'Review the Assessment',
    description: 'View your readiness score, favorable factors, risk factors, and evidence gaps on an interactive dashboard.',
    color: 'from-gold/20 to-gold/5',
  },
  {
    number: '04',
    title: 'Simulate the Courtroom',
    description: 'Practice your arguments against AI opposing counsel. Receive structured feedback on your presentation.',
    color: 'from-navy/10 to-navy/5',
  },
  {
    number: '05',
    title: 'Get Your Readiness Report',
    description: 'Download a comprehensive litigation readiness report with actionable next steps and legal guidance.',
    color: 'from-gold/20 to-gold/5',
  },
];

export function DemoFlow() {
  return (
    <section className="py-20 md:py-24 bg-offwhite">
      <Container>
        <SectionHeading
          title="From Case Facts to Readiness Report"
          subtitle="Five steps to understand your litigation position — in under 60 seconds."
          size="md"
        />

        <div className="max-w-3xl mx-auto space-y-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.35 }}
              className="relative flex gap-5 group"
            >
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center text-sm font-bold font-serif shrink-0 z-10 group-hover:bg-gold transition-colors duration-300">
                  {step.number}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-0.5 flex-1 bg-gray-200 group-hover:bg-gold/30 transition-colors duration-300" />
                )}
              </div>
              <div className="flex-1 pb-6">
                <h3 className="text-base font-semibold text-navy font-serif mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
