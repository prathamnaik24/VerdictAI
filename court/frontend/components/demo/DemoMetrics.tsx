'use client';

import { motion } from 'framer-motion';
import { Container } from '@/frontend/components/common/Container';

const metrics = [
  { value: '14', label: 'Dispute Types', detail: 'Supported by AI engine' },
  { value: '3', label: 'Demo Cases', detail: 'Pre-loaded for instant demo' },
  { value: '5', label: 'Pipeline Stages', detail: 'Intake to final report' },
  { value: '60s', label: 'Demo Time', detail: 'Full walkthrough' },
];

export function DemoMetrics() {
  return (
    <section className="py-16 md:py-20 bg-offwhite">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl font-bold font-serif text-navy mb-1">
                {metric.value}
              </p>
              <p className="text-sm font-medium text-gold mb-1">
                {metric.label}
              </p>
              <p className="text-xs text-gray-500">{metric.detail}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
