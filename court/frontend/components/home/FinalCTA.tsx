'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Container } from '../common/Container';
import { GoldDivider } from '../common/GoldDivider';
import { ArrowRight } from 'lucide-react';

export function FinalCTA() {
  const containerVariants: any = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="py-28 md:py-40 bg-gradient-to-br from-navy via-charcoal to-navy relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gold/10 rounded-full blur-3xl"
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        ></motion.div>
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gold/5 rounded-full blur-3xl"
          animate={{ y: [0, -40, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        ></motion.div>
      </div>

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-3 pointer-events-none bg-[url('/textures/noise.png')]"></div>

      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center relative z-10 max-w-2xl mx-auto space-y-8"
        >
          {/* Accent */}
          <GoldDivider width="small" className="mx-auto mb-4" />

          {/* Headline */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-semibold text-offwhite leading-tight tracking-tight">
            Bring Clarity to Litigation
            <span className="text-gold"> Before Proceedings Begin.</span>
          </h2>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-offwhite/80 max-w-xl mx-auto"
          >
            Join hundreds of legal professionals who trust VerdictAI to evaluate
            case strength and predict courtroom outcomes with unprecedented accuracy.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <Button
              size="lg"
              className="bg-gold hover:bg-darkgold text-navy font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-lg group"
            >
              Start Assessment Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-gold text-gold hover:bg-gold/10 font-semibold px-8 py-3 rounded-lg transition-all duration-300"
            >
              Schedule Demo
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
            className="pt-8 border-t border-gold/20"
          >
            <p className="text-offwhite/60 text-sm mb-4">
              Trusted by legal professionals across India
            </p>
            <div className="flex justify-center gap-8 flex-wrap">
              {['Premium Accuracy', 'ISO Certified', '24/7 Support'].map(
                (badge, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gold"></div>
                    <span className="text-sm text-offwhite/70">{badge}</span>
                  </div>
                )
              )}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
