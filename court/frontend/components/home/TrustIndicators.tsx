'use client';

import { motion } from 'framer-motion';
import { Container } from '@/frontend/components/common/Container';
import { GoldDivider } from '@/frontend/components/common/GoldDivider';

const indicators = [
   {
     icon: '🛡️',
     title: 'Structured Legal Analysis',
     description: 'Every assessment follows a defined methodology grounded in established legal principles.',
   },
   {
     icon: '🔍',
     title: 'AI-Powered Precedent Search',
     description: 'Semantic matching identifies relevant case law from Indian courts — not basic keyword searches.',
   },
   {
     icon: '🔒',
     title: 'Privacy by Design',
     description: 'Case data is processed securely with no long-term storage of sensitive legal information.',
   },
   {
     icon: '📋',
     title: 'Courtroom Preparation',
     description: 'Simulate proceedings and anticipate opposing counsel strategies before stepping into court.',
   },
 ];

export function TrustIndicators() {
  return (
    <section className="py-20 md:py-24 bg-navy text-offwhite">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <GoldDivider width="small" className="mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold tracking-tight mb-3">
              Built for Credibility
            </h2>
            <p className="text-sm md:text-base text-offwhite/60 max-w-xl mx-auto leading-relaxed">
              VerdictAI combines legal domain knowledge with modern AI to deliver assessments you can trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {indicators.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.35 }}
                className="flex gap-4 p-5 rounded-xl bg-charcoal/50 border border-gold/10 hover:border-gold/30 transition-colors"
              >
                <span className="text-2xl shrink-0 mt-0.5">{item.icon}</span>
                <div>
                  <h3 className="text-base font-semibold font-serif mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-offwhite/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center text-xs text-offwhite/40 mt-10 max-w-lg mx-auto leading-relaxed"
          >
            VerdictAI is an AI-assisted legal analysis tool. It does not replace professional legal advice.
            Always consult qualified legal counsel for your specific situation.
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
