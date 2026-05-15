'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Gavel, User, AlertCircle, Info, CheckCircle2, XCircle, HelpCircle, BookOpen } from 'lucide-react'
import { HARDCODED_SIMULATIONS, SimulationTurn, SimulationChoice, ChoiceQuality, Actor } from '@/frontend/lib/hardcodedSimulations'

/* ── palette ────────────────────────────────────────────────── */
const NAVY   = '#1F2839'
const GOLD   = '#B69D74'
const CREAM  = '#F5F5EF'

const qualityConfig: Record<string, { border: string; bg: string; titleColor: string; icon: React.ReactNode }> = {
  good: {
    border: 'rgba(22,163,74,0.35)',
    bg: 'rgba(22,163,74,0.05)',
    titleColor: '#166534',
    icon: <CheckCircle2 style={{ width: 18, height: 18, color: '#16a34a', flexShrink: 0 }} />,
  },
  bad: {
    border: 'rgba(220,38,38,0.3)',
    bg: 'rgba(220,38,38,0.05)',
    titleColor: '#991b1b',
    icon: <XCircle style={{ width: 18, height: 18, color: '#dc2626', flexShrink: 0 }} />,
  },
  neutral: {
    border: `${GOLD}55`,
    bg: `${GOLD}08`,
    titleColor: '#9d845f',
    icon: <HelpCircle style={{ width: 18, height: 18, color: GOLD, flexShrink: 0 }} />,
  },
}

export default function SimulatorPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const demoId = searchParams.get('id') || 'demo-security-deposit'

  const simulationData = HARDCODED_SIMULATIONS[demoId as keyof typeof HARDCODED_SIMULATIONS]

  const [history, setHistory] = useState<SimulationTurn[]>([])
  const [currentTurn, setCurrentTurn] = useState<SimulationTurn | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [typingActor, setTypingActor] = useState<Actor | null>(null)
  const [lastChoice, setLastChoice] = useState<SimulationChoice | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (simulationData) {
      const start = simulationData.turns[simulationData.startTurn]
      setHistory([start])
      setCurrentTurn(start)
    }
  }, [simulationData])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history, isTyping])

  useEffect(() => {
    if (currentTurn?.autoNext) {
      const nextTurn = simulationData.turns[currentTurn.autoNext!]
      setTypingActor(nextTurn.actor)
      setIsTyping(true)
      const delay = Math.floor(Math.random() * 1000) + 1500
      const timer = setTimeout(() => {
        setIsTyping(false)
        setHistory(prev => [...prev, nextTurn])
        setCurrentTurn(nextTurn)
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [currentTurn, simulationData])

  if (!simulationData) {
    return (
      <div style={{ minHeight: '100vh', background: CREAM, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
        <p style={{ fontSize: '17px', fontWeight: 700, color: NAVY }}>Simulation not found</p>
        <button onClick={() => router.push('/dashboard')} style={{ color: GOLD, fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
          Return to Dashboard
        </button>
      </div>
    )
  }

  const handleChoice = (choice: SimulationChoice) => {
    setLastChoice(choice)
    if (!choice.nextTurnId) { setCurrentTurn(null); return }
    const nextTurn = simulationData.turns[choice.nextTurnId!]
    setHistory(prev => [...prev, nextTurn])
    setCurrentTurn(nextTurn)
  }

  return (
    <div style={{ minHeight: '100vh', background: CREAM, display: 'flex', flexDirection: 'column' }}>

      {/* ── Header ─────────────────────────────────────────── */}
      <header
        style={{
          background: NAVY,
          borderBottom: `1px solid ${GOLD}33`,
          padding: '14px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 20,
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            onClick={() => router.push('/dashboard')}
            style={{
              width: '34px', height: '34px', borderRadius: '8px',
              background: 'rgba(245,245,239,0.08)', border: `1px solid rgba(245,245,239,0.12)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'rgba(245,245,239,0.7)',
            }}
          >
            <ArrowLeft style={{ width: 16, height: 16 }} />
          </button>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: GOLD }}>
              VerdictAI
            </span>
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-cormorant), Georgia, serif', letterSpacing: '-0.01em' }}>
              Courtroom Simulator
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '11px', color: 'rgba(245,245,239,0.45)', fontStyle: 'italic' }}>
            Interactive Case Walkthrough
          </span>
          <span
            style={{
              fontSize: '11px', fontWeight: 700, color: GOLD,
              background: `${GOLD}15`, border: `1px solid ${GOLD}40`,
              padding: '4px 12px', borderRadius: '999px',
            }}
          >
            Plaintiff View
          </span>
        </div>
      </header>

      {/* ── Two-column body ─────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', maxWidth: '1200px', width: '100%', margin: '0 auto', alignSelf: 'stretch' }}>

        {/* LEFT: Chat area */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff', borderRight: `1px solid rgba(182,157,116,0.18)`, overflow: 'hidden' }}>

          {/* Messages scroll area */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '32px 28px 16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '8px' }}>
              <AnimatePresence initial={false}>
                {history.map((turn, index) => {
                  const isJudge     = turn.actor === 'judge'
                  const isPlaintiff = turn.actor === 'plaintiff'
                  const isDefendant = turn.actor === 'defendant'

                  return (
                    <motion.div
                      key={`${turn.id}-${index}`}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28 }}
                      style={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: isJudge ? 'center' : isPlaintiff ? 'flex-end' : 'flex-start',
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '78%', alignItems: isPlaintiff ? 'flex-end' : isJudge ? 'center' : 'flex-start', gap: '5px' }}>

                        {/* Actor label */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', paddingLeft: isPlaintiff ? 0 : '2px', paddingRight: isPlaintiff ? '2px' : 0 }}>
                          {isJudge     && <Gavel       style={{ width: 12, height: 12, color: GOLD }} />}
                          {isPlaintiff && <User        style={{ width: 12, height: 12, color: '#fff', background: NAVY, borderRadius: '50%', padding: '1px' }} />}
                          {isDefendant && <AlertCircle style={{ width: 12, height: 12, color: '#dc2626' }} />}
                          <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.09em', textTransform: 'uppercase', color: isJudge ? GOLD : isPlaintiff ? NAVY : 'rgba(31,40,57,0.45)' }}>
                            {turn.actor}
                          </span>
                        </div>

                        {/* Bubble */}
                        {isJudge ? (
                          <div
                            style={{
                              background: `linear-gradient(135deg, rgba(31,40,57,0.04) 0%, rgba(182,157,116,0.07) 100%)`,
                              border: `1px solid ${GOLD}40`,
                              borderRadius: '14px',
                              padding: '14px 20px',
                              fontSize: '14px',
                              color: NAVY,
                              lineHeight: '1.6',
                              textAlign: 'center',
                              boxShadow: '0 2px 10px rgba(31,40,57,0.06)',
                              maxWidth: '520px',
                            }}
                          >
                            {turn.message}
                          </div>
                        ) : isPlaintiff ? (
                          <div
                            style={{
                              background: NAVY,
                              borderRadius: '14px 14px 2px 14px',
                              padding: '13px 18px',
                              fontSize: '14px',
                              color: '#fff',
                              lineHeight: '1.6',
                              boxShadow: '0 3px 12px rgba(31,40,57,0.22)',
                            }}
                          >
                            {turn.message}
                          </div>
                        ) : (
                          <div
                            style={{
                              background: CREAM,
                              border: `1px solid rgba(182,157,116,0.25)`,
                              borderRadius: '14px 14px 14px 2px',
                              padding: '13px 18px',
                              fontSize: '14px',
                              color: NAVY,
                              lineHeight: '1.6',
                              boxShadow: '0 2px 8px rgba(31,40,57,0.05)',
                            }}
                          >
                            {turn.message}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ display: 'flex', width: '100%', justifyContent: typingActor === 'judge' ? 'center' : 'flex-start' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: typingActor === 'judge' ? 'center' : 'flex-start', gap: '5px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      {typingActor === 'judge'     && <Gavel       style={{ width: 12, height: 12, color: GOLD }} />}
                      {typingActor === 'defendant' && <AlertCircle style={{ width: 12, height: 12, color: '#dc2626' }} />}
                      <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'rgba(31,40,57,0.4)' }}>
                        {typingActor} is responding…
                      </span>
                    </div>
                    <div
                      style={{
                        background: CREAM,
                        border: `1px solid rgba(182,157,116,0.2)`,
                        borderRadius: '14px',
                        padding: '12px 18px',
                        display: 'flex',
                        gap: '6px',
                        alignItems: 'center',
                      }}
                    >
                      {[0, 0.18, 0.36].map((delay, i) => (
                        <div
                          key={i}
                          className="animate-bounce"
                          style={{ width: '7px', height: '7px', borderRadius: '50%', background: GOLD, animationDelay: `${delay}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* ── Choice buttons pinned at the bottom ──────────── */}
          <div
            style={{
              background: '#fff',
              borderTop: `1px solid rgba(182,157,116,0.18)`,
              padding: '20px 28px 24px',
              flexShrink: 0,
              boxShadow: '0 -4px 16px rgba(31,40,57,0.05)',
            }}
          >
            {!isTyping && currentTurn?.choices && currentTurn.choices.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <p style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(31,40,57,0.35)', textAlign: 'center', marginBottom: '4px' }}>
                  Choose Your Response
                </p>
                {currentTurn.choices.map((choice, idx) => (
                  <ChoiceButton key={idx} choice={choice} onSelect={handleChoice} />
                ))}
              </div>
            ) : !isTyping && !currentTurn?.autoNext && !currentTurn?.choices?.length ? (
              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', padding: '8px 0' }}>
                <p style={{ fontSize: '14px', fontWeight: 700, color: NAVY }}>Simulation Complete</p>
                <button
                  onClick={() => router.push(`/report?id=${demoId}`)}
                  style={{
                    padding: '12px 28px', background: NAVY, color: '#fff',
                    borderRadius: '12px', fontSize: '14px', fontWeight: 700, border: 'none', cursor: 'pointer',
                    boxShadow: '0 3px 12px rgba(31,40,57,0.25)',
                  }}
                >
                  View Final Report →
                </button>
              </div>
            ) : (
              <div style={{ height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '13px', color: 'rgba(31,40,57,0.4)', fontStyle: 'italic' }}>
                  {isTyping ? 'Waiting for court response…' : ''}
                </span>
              </div>
            )}
          </div>
        </main>

        {/* RIGHT: Simulation Guide */}
        <aside
          style={{
            width: '360px',
            flexShrink: 0,
            background: CREAM,
            overflowY: 'auto',
            borderLeft: `1px solid rgba(182,157,116,0.18)`,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: '20px', position: 'sticky', top: 0 }}>

            {/* Panel header */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: `${GOLD}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Info style={{ width: 14, height: 14, color: GOLD }} />
                </div>
                {/* p not h2 — avoids global h2 { text-4xl } override */}
                <p style={{ fontSize: '16px', fontWeight: 800, color: NAVY, fontFamily: 'var(--font-cormorant), Georgia, serif', letterSpacing: '-0.01em' }}>
                  Simulation Guide
                </p>
              </div>
              <p style={{ fontSize: '12px', color: 'rgba(31,40,57,0.5)', lineHeight: '1.55' }}>
                This panel explains the legal strategy behind the simulation, simplifies jargon, and reviews your choices.
              </p>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: `${GOLD}25` }} />

            {/* Current Turn Insight */}
            <AnimatePresence mode="wait">
              {currentTurn?.insight ? (
                <motion.div
                  key={currentTurn.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    background: NAVY,
                    border: `1px solid rgba(182,157,116,0.25)`,
                    borderRadius: '14px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 12px rgba(31,40,57,0.14)',
                  }}
                >
                  {/* Gold accent top bar */}
                  <div style={{ height: '3px', background: `linear-gradient(90deg, ${GOLD}, #d4c5a9)` }} />
                  <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <p style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: GOLD }}>
                      Current Context
                    </p>
                    <p style={{ fontSize: '13px', color: 'rgba(245,245,239,0.88)', lineHeight: '1.6' }}>
                      {currentTurn.insight}
                    </p>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {/* Last Choice Feedback */}
            <AnimatePresence mode="wait">
              {lastChoice?.explanation && (
                <motion.div
                  key={lastChoice.label}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <ChoiceFeedback choice={lastChoice} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty placeholder */}
            {!lastChoice && !currentTurn?.insight && (
              <div style={{ textAlign: 'center', padding: '40px 16px', opacity: 0.4, display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                <Info style={{ width: 28, height: 28, color: NAVY }} />
                <p style={{ fontSize: '13px', color: NAVY, lineHeight: '1.5' }}>
                  Make a choice on the left to see legal feedback here.
                </p>
              </div>
            )}
          </div>
        </aside>

      </div>
    </div>
  )
}

/* ── Choice Button ──────────────────────────────────────────── */
function ChoiceButton({ choice, onSelect }: { choice: SimulationChoice; onSelect: (c: SimulationChoice) => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={() => onSelect(choice)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        padding: '14px 18px',
        borderRadius: '12px',
        border: `2px solid ${hovered ? NAVY : `${GOLD}45`}`,
        background: hovered ? NAVY : '#fff',
        color: hovered ? '#fff' : NAVY,
        fontSize: '14px',
        fontWeight: 600,
        textAlign: 'left',
        cursor: 'pointer',
        lineHeight: '1.45',
        transition: 'all 0.18s ease',
        boxShadow: hovered ? '0 4px 14px rgba(31,40,57,0.2)' : '0 1px 4px rgba(31,40,57,0.06)',
      }}
    >
      <span>{choice.label}</span>
      <ArrowRight
        style={{
          width: 16, height: 16, flexShrink: 0,
          color: hovered ? GOLD : 'rgba(31,40,57,0.25)',
          transform: hovered ? 'translateX(2px)' : 'none',
          transition: 'all 0.18s ease',
        }}
      />
    </button>
  )
}

/* ── Choice Feedback card ───────────────────────────────────── */
function ChoiceFeedback({ choice }: { choice: SimulationChoice }) {
  const q = (choice.quality as string) in qualityConfig ? choice.quality! : 'neutral'
  const cfg = qualityConfig[q as keyof typeof qualityConfig] ?? qualityConfig.neutral
  const titleMap = { good: 'Great Choice', bad: 'Poor Choice', neutral: 'Moderate Choice' }
  const title = titleMap[q as keyof typeof titleMap] ?? 'Feedback'

  return (
    <div
      style={{
        border: `2px solid ${cfg.border}`,
        background: cfg.bg,
        borderRadius: '14px',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Title + icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {cfg.icon}
          <p style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: cfg.titleColor }}>
            {title}
          </p>
        </div>

        {/* Quoted choice */}
        <p style={{ fontSize: '12px', color: 'rgba(31,40,57,0.5)', fontStyle: 'italic', lineHeight: '1.4' }}>
          "{choice.label}"
        </p>

        {/* Explanation */}
        <p style={{ fontSize: '13px', color: NAVY, lineHeight: '1.6', fontWeight: 500 }}>
          {choice.explanation}
        </p>

        {/* Precedent box */}
        {choice.precedent && (
          <div
            style={{
              background: 'rgba(31,40,57,0.04)',
              border: '1px solid rgba(31,40,57,0.08)',
              borderRadius: '10px',
              padding: '10px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <BookOpen style={{ width: 12, height: 12, color: GOLD }} />
              <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(31,40,57,0.45)' }}>
                Precedent
              </span>
            </div>
            <p style={{ fontSize: '12px', color: NAVY, lineHeight: '1.5', fontWeight: 500 }}>
              {choice.precedent}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
