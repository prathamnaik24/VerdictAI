'use client';

import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';

const steps = [
  {
    number: '01',
    title: 'Submit Facts',
    description: 'Provide case details, evidence, and legal arguments',
  },
  {
    number: '02',
    title: 'Retrieve Judgments',
    description: 'AI finds most relevant precedents automatically',
  },
  {
    number: '03',
    title: 'Analyze Strength',
    description: 'Get detailed legal analysis and strength scoring',
  },
  {
    number: '04',
    title: 'Simulate Courtroom',
    description: 'Practice with AI judge and opposing counsel',
  },
  {
    number: '05',
    title: 'Generate Report',
    description: 'Receive comprehensive litigation readiness report',
  },
];

export function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="py-28 md:py-32 bg-navy text-offwhite">
      <Container>
        <SectionHeading
          title="How It Works"
          subtitle="Five simple steps to litigation readiness"
          centered
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4"
        >
          {steps.map((step, idx) => (
            <motion.div key={idx} variants={itemVariants} className="group">
              {/* Card */}
              <div className="relative bg-charcoal rounded-2xl p-6 h-full flex flex-col border border-gold/20 group-hover:border-gold/50 transition-colors duration-300">
                {/* Number */}
                <div className="mb-4">
                  <span className="text-5xl font-serif font-semibold text-gold/30 group-hover:text-gold/60 transition-colors">
                    {step.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-3 text-offwhite">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-offwhite/70 text-sm leading-relaxed flex-1">
                  {step.description}
                </p>

                {/* Hover accent */}
                <div className="absolute top-0 left-0 w-1 h-0 bg-gradient-to-b from-gold to-transparent group-hover:h-full transition-all duration-300 rounded-full"></div>
              </div>

              {/* Connector */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:flex items-center justify-center mt-6">
                  <motion.svg
                    className="w-6 h-6 text-gold/30"
                    fill="none"
                    viewBox="0 0 24 24"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <path
                      stroke="currentColor"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </motion.svg>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom accent */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 h-1 bg-gradient-to-r from-transparent via-gold to-transparent rounded-full origin-left"
        ></motion.div>
      </Container>
    </section>
  );
}
