'use client';

import { motion } from 'framer-motion';
import { DotLottiePlayer } from '@dotlottie/react-player';
import { Button } from '@/components/ui/button';
import { Container } from '../common/Container';
import { GoldDivider } from '../common/GoldDivider';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, easing: 'easeOut' },
    },
  };

  const floatVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, easing: 'easeOut' },
    },
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        easing: 'easeInOut',
      },
    },
  };

  return (
    <section className="relative w-full h-screen bg-navy flex flex-col overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
      </div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-3 pointer-events-none bg-[url('/textures/noise.png')]"></div>

      {/* Header with Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        style={{ padding: '28px 40px 20px', position: 'relative', zIndex: 10 }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ position: 'relative', width: '52px', height: '52px', flexShrink: 0 }}>
              <Image
                src="/images/hero/lady_justice.png"
                alt="VerdictAI"
                fill
                className="object-contain"
                priority
              />
            </div>
            {/* p not h3 — avoids global h3 { text-3xl md:text-4xl } override */}
            <p style={{ fontSize: '24px', fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 600, color: '#B69D74', letterSpacing: '-0.01em' }}>
              VerdictAI
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
            {/* Left content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="space-y-4"
              >
                <GoldDivider width="small" />
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-offwhite tracking-tight leading-tight">
                  Know Where Your Case Stands
                  <span className="text-gold"> Before Court </span>
                  Begins.
                </h2>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-base md:text-lg text-offwhite/80 max-w-lg leading-relaxed"
              >
                VerdictAI combines semantic precedent retrieval, explainable legal
                scoring, and AI courtroom simulation to help evaluate disputes before
                litigation.
              </motion.p>
            </motion.div>

            {/* Right - Animation */}
            <motion.div
              variants={floatVariants}
              animate="animate"
              className="relative h-80 md:h-96 lg:h-[420px] flex items-center justify-center hidden lg:flex"
            >
              {/* Glow effect behind animation */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent rounded-full blur-3xl -z-10"></div>

              <DotLottiePlayer
                src="/animations/Justicebalance_animation.lottie"
                loop
                autoplay
                style={{ width: '100%', height: '100%' }}
              />
            </motion.div>
          </div>
        </Container>
      </div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="relative z-10 pb-8 pt-6 flex flex-col items-center gap-6"
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}>
          <Link href="/intake">
            <Button
              size="lg"
              className="group"
              style={{
                background: '#B69D74',
                color: '#1F2839',
                fontWeight: 700,
                fontSize: '16px',
                padding: '16px 36px',
                borderRadius: '12px',
                border: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 18px rgba(182,157,116,0.35)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Analyze My Case
              <ArrowRight style={{ width: 18, height: 18 }} />
            </Button>
          </Link>
          <Link href="/dashboard#demo">
            <Button
              size="lg"
              variant="outline"
              style={{
                border: '2px solid rgba(182,157,116,0.5)',
                color: '#B69D74',
                background: 'transparent',
                fontWeight: 700,
                fontSize: '16px',
                padding: '16px 36px',
                borderRadius: '12px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Try Demo Case
            </Button>
          </Link>
        </div>
        <div className="flex items-center gap-4 text-xs text-offwhite/50">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            No sign-up
          </span>
          <span className="w-3 h-px bg-offwhite/20" />
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-gold rounded-full" />
            Instant demo
          </span>
          <span className="w-3 h-px bg-offwhite/20" />
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-gold rounded-full" />
            India case law
          </span>
        </div>
      </motion.div>
    </section>
  );
}