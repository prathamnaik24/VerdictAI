'use client';

import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { GoldDivider } from '../common/GoldDivider';

const messages = [
  {
    role: 'judge',
    content: 'Counselor, what evidence supports the delayed payment allegation?',
  },
  {
    role: 'user',
    content:
      'Your Honor, we have documentary evidence of three payment reminders dated 30, 60, and 90 days after the invoice date.',
  },
  {
    role: 'opposing',
    content:
      'With respect, the liability itself is disputed. The goods were defective.',
  },
  {
    role: 'user',
    content:
      'Your Honor, quality inspection reports from our third-party auditor confirm compliance with specifications.',
  },
  {
    role: 'judge',
    content:
      'The evidence appears substantial. Counselor, your rebuttal will be heard next.',
  },
];

export function CourtroomPreview() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const messageVariants = {
    hidden: { opacity: 0, x: (index: number) => (index % 2 === 0 ? -20 : 20) },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="py-28 md:py-32 bg-offwhite">
      <Container>
        <SectionHeading
          title="Prepare With AI Courtroom Simulation"
          subtitle="Practice real courtroom scenarios with our AI judge and opposing counsel"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-2xl mx-auto"
        >
          {/* Courtroom preview card */}
          <div className="bg-navy rounded-3xl overflow-hidden shadow-2xl border border-gold/20">
            {/* Header */}
            <div className="bg-charcoal px-8 py-6 border-b border-gold/20">
              <div className="flex items-center justify-between">
                <div>
                  <GoldDivider width="small" className="mb-2" />
                  <h3 className="text-xl font-serif font-semibold text-offwhite">
                    Courtroom Simulation
                  </h3>
                </div>
                <div className="flex gap-2">
                  <div className="px-3 py-1 bg-gold/20 rounded-full text-xs text-gold">
                    Live Session
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="p-8 md:p-10 max-h-96 overflow-y-auto space-y-4">
              {messages.map((message, idx) => (
                <motion.div
                  key={idx}
                  custom={idx}
                  variants={messageVariants}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-sm rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-gold text-navy'
                        : message.role === 'judge'
                        ? 'bg-charcoal border border-gold/30 text-offwhite'
                        : 'bg-red-900/30 border border-red-500/30 text-offwhite'
                    }`}
                  >
                    <p className="text-xs font-semibold opacity-70 mb-1">
                      {message.role === 'user'
                        ? 'Your Counsel'
                        : message.role === 'judge'
                        ? 'Judge'
                        : 'Opposing Counsel'}
                    </p>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input area */}
            <div className="border-t border-gold/20 px-8 py-4 bg-charcoal">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Type your response..."
                  className="flex-1 bg-navy border border-gold/20 rounded-lg px-4 py-2 text-offwhite placeholder-offwhite/40 text-sm focus:outline-none focus:border-gold/50 transition-colors"
                />
                <button className="px-4 py-2 bg-gold text-navy rounded-lg font-semibold text-sm hover:bg-darkgold transition-colors">
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* Key benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: '🎯',
                title: 'Real Scenarios',
                desc: 'Practice with authentic courtroom situations',
              },
              {
                icon: '⚡',
                title: 'Instant Feedback',
                desc: 'Get AI analysis on your arguments',
              },
              {
                icon: '📊',
                title: 'Performance Report',
                desc: 'Track improvement across sessions',
              },
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                className="text-center p-6 rounded-2xl bg-navy/20 border border-gold/10"
                whileHover={{ backgroundColor: 'rgba(191, 157, 116, 0.1)' }}
              >
                <p className="text-4xl mb-3">{benefit.icon}</p>
                <h4 className="font-semibold text-navy mb-2">{benefit.title}</h4>
                <p className="text-navy/60 text-sm">{benefit.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
