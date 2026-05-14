'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { GoldDivider } from '../common/GoldDivider';
import { Zap, TrendingUp, Shield } from 'lucide-react';

export function DashboardPreview() {
  const itemVariants: any = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="py-28 md:py-32 bg-offwhite">
      <Container>
        <SectionHeading
          title="See Your Case Strength at a Glance"
          subtitle="Interactive dashboard with real-time analysis"
        />

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative"
        >
          {/* Dashboard preview card */}
          <div className="bg-navy rounded-3xl overflow-hidden shadow-2xl border border-gold/20 p-8 md:p-12">
            {/* Header */}
            <div className="mb-8 pb-6 border-b border-gold/20">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <GoldDivider width="small" className="mb-3" />
                  <h3 className="text-2xl md:text-3xl font-serif font-semibold text-offwhite">
                    Case Assessment Dashboard
                  </h3>
                </div>
                <div className="hidden md:flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
            </div>

            {/* Main grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Confidence Meter */}
              <motion.div
                className="bg-charcoal rounded-2xl p-6 border border-gold/20"
                whileHover={{ borderColor: '#b69d74' }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-offwhite/70 text-sm font-semibold">
                    CONFIDENCE SCORE
                  </p>
                  <TrendingUp className="w-5 h-5 text-gold" />
                </div>
                <div className="mb-4">
                  <p className="text-5xl font-semibold text-gold mb-2">78%</p>
                  <div className="w-full bg-navy rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-gold to-lightgold h-2 rounded-full"
                      style={{ width: '78%' }}
                    ></div>
                  </div>
                </div>
                <p className="text-xs text-offwhite/50">
                  Based on 243 precedents
                </p>
              </motion.div>

              {/* Favorable Factors */}
              <motion.div
                className="bg-charcoal rounded-2xl p-6 border border-gold/20"
                whileHover={{ borderColor: '#b69d74' }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-offwhite/70 text-sm font-semibold">
                    FAVORABLE FACTORS
                  </p>
                  <Zap className="w-5 h-5 text-gold" />
                </div>
                <div className="space-y-2">
                  {['Strong precedent', 'Clear evidence', 'Solid contract'].map(
                    (factor, idx) => (
                      <div key={idx} className="text-sm text-offwhite/80">
                        ✓ {factor}
                      </div>
                    )
                  )}
                </div>
              </motion.div>

              {/* Risk Factors */}
              <motion.div
                className="bg-charcoal rounded-2xl p-6 border border-gold/20"
                whileHover={{ borderColor: '#b69d74' }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-offwhite/70 text-sm font-semibold">
                    RISK FACTORS
                  </p>
                  <Shield className="w-5 h-5 text-gold" />
                </div>
                <div className="space-y-2">
                  {['Jurisdiction risk', 'Procedural gaps'].map((risk, idx) => (
                    <div key={idx} className="text-sm text-offwhite/80">
                      ⚠ {risk}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Precedent cards */}
            <div>
              <p className="text-offwhite/70 text-sm font-semibold mb-4">
                TOP SIMILAR PRECEDENTS
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Supreme Court vs. ABC Corp',
                    year: '2022',
                    match: '94%',
                  },
                  {
                    title: 'High Court - Employment Dispute',
                    year: '2021',
                    match: '87%',
                  },
                ].map((prec, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-navy rounded-xl p-4 border border-gold/10 hover:border-gold/50 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-offwhite font-semibold text-sm mb-2">
                      {prec.title}
                    </p>
                    <div className="flex justify-between items-center text-xs text-offwhite/60">
                      <span>{prec.year}</span>
                      <span className="text-gold font-semibold">
                        {prec.match} Match
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating accent */}
          <motion.div
            className="absolute -top-4 -right-4 w-32 h-32 bg-gold/5 rounded-full blur-3xl pointer-events-none"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          ></motion.div>
        </motion.div>

        {/* CTA below preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-navy/70 text-lg mb-4">
            This is just the beginning. Experience the full power of AI-driven legal analysis.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
