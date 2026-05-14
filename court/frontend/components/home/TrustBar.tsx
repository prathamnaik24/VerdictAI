'use client';

import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { Shield, Brain, Zap, FileText } from 'lucide-react';

const items = [
  {
    icon: Brain,
    title: 'Semantic Precedent Retrieval',
    description: 'Find similar cases using AI-powered semantic search',
  },
  {
    icon: Shield,
    title: 'Explainable Legal Analysis',
    description: 'Understand the reasoning behind every assessment',
  },
  {
    icon: Zap,
    title: 'Courtroom Simulation',
    description: 'Practice arguments with AI judge and opposing counsel',
  },
  {
    icon: FileText,
    title: 'Litigation Readiness Reports',
    description: 'Comprehensive case strength and risk analysis',
  },
];

export function TrustBar() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="bg-offwhite border-t-2 border-b-2 border-gold/20 py-16 md:py-20">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="flex flex-col items-center lg:items-start text-center lg:text-left p-6 rounded-2xl hover:bg-navy/5 transition-colors duration-300"
              >
                <div className="mb-4 p-3 bg-gold/10 rounded-lg">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-lg font-semibold text-navy mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-navy/60">{item.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
