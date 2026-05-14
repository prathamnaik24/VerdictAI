'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { GoldDivider } from '../common/GoldDivider';
import { CheckCircle } from 'lucide-react';

const features = [
  {
    id: 1,
    title: 'Semantic Precedent Analysis',
    subtitle: 'Find Relevant Judgments Instantly',
    description:
      'Our AI analyzes your case facts and retrieves the most relevant precedents from thousands of judgments. No manual searching required.',
    benefits: [
      'Semantic similarity matching',
      'Instant case retrieval',
      'Relevance scoring',
    ],
    image: '/images/cards/precedent-analysis.png',
    imagePosition: 'left',
  },
  {
    id: 2,
    title: 'AI Courtroom Simulation',
    subtitle: 'Practice Before You Litigate',
    description:
      'Simulate courtroom proceedings with our AI judge and opposing counsel. Test your arguments, anticipate challenges, and refine your strategy.',
    benefits: [
      'Interactive judge scenarios',
      'Opposing counsel debate',
      'Real-time feedback',
    ],
    image: '/images/cards/courtroom-ai.png',
    imagePosition: 'right',
  },
  {
    id: 3,
    title: 'Litigation Risk Assessment',
    subtitle: 'Know Your Odds Before Court',
    description:
      'Get a data-driven analysis of your case strength, success likelihood, and potential risks. Make informed decisions with confidence.',
    benefits: [
      'Risk scoring engine',
      'Outcome prediction',
      'Decision support',
    ],
    image: '/images/cards/legal-risk.png',
    imagePosition: 'left',
  },
];

export function FeatureSection() {
  const itemVariants = {
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
          title="Comprehensive Legal Intelligence"
          subtitle="Three pillars of AI-powered case analysis"
        />

        <div className="space-y-32">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                feature.imagePosition === 'right' ? 'lg:[direction:rtl]' : ''
              }`}
            >
              {/* Image */}
              <motion.div
                className="relative h-80 md:h-96 rounded-3xl overflow-hidden shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-navy/0 via-transparent to-navy/20"></div>
              </motion.div>

              {/* Content */}
              <motion.div
                className="space-y-6 lg:[direction:ltr]"
                variants={itemVariants}
              >
                <div>
                  <GoldDivider width="small" className="mb-4" />
                  <h3 className="text-4xl md:text-5xl font-serif font-semibold text-navy mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-gold font-semibold">
                    {feature.subtitle}
                  </p>
                </div>

                <p className="text-lg text-navy/70 leading-relaxed">
                  {feature.description}
                </p>

                <ul className="space-y-3">
                  {feature.benefits.map((benefit, bidx) => (
                    <motion.li
                      key={bidx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + bidx * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                      <span className="text-navy font-medium">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
