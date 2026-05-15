'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import DashboardLayout from '@/frontend/components/dashboard/DashboardLayout'
import { DashboardSkeleton } from '@/frontend/components/dashboard/DashboardSkeleton'
import { OutcomeCard } from '@/frontend/components/dashboard/OutcomeCard'
import { ConfidenceMeter } from '@/frontend/components/dashboard/ConfidenceMeter'
import { ReadinessScore } from '@/frontend/components/dashboard/ReadinessScore'
import { FavorableFactors } from '@/frontend/components/dashboard/FavorableFactors'
import { RiskFactors } from '@/frontend/components/dashboard/RiskFactors'
import { PrecedentList } from '@/frontend/components/dashboard/PrecedentList'
import ApplicableLaws from '@/frontend/components/dashboard/ApplicableLaws'
import MissingEvidence from '@/frontend/components/dashboard/MissingEvidence'
import { useCaseStore } from '@/frontend/store/useCaseStore'
import { EmptyState } from '@/frontend/components/common/EmptyState'
import { ErrorState } from '@/frontend/components/common/ErrorState'
import { getEmptyStatePreset } from '@/frontend/lib/emptyStatePresets'
import { AssessmentNotice } from '@/frontend/components/dashboard/AssessmentNotice'
import { DemoCaseButton } from '@/frontend/components/common/DemoCaseButton'
import { useDemoData } from '@/frontend/hooks/useDemoData'
import type { DemoCaseType } from '@/frontend/lib/demoHelpers'
import { PageTransition, StaggerItem } from '@/frontend/components/animations/PageTransition'
import { staggerItem } from '@/frontend/components/animations/StaggerContainer'
import { MotionCard } from '@/frontend/components/common/MotionCard'
import { HARDCODED_ASSESSMENTS } from '@/frontend/lib/hardcodedAssessments'
import { Info, HelpCircle, Shield, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react'

/* ── shared card style ─────────────────────────────────────────────── */
const card: React.CSSProperties = {
  background: '#fff',
  border: '1px solid rgba(182,157,116,0.22)',
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 1px 8px rgba(31,40,57,0.06)',
}

const sectionLabel: React.CSSProperties = {
  fontSize: '10px',
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  color: 'rgba(31,40,57,0.4)',
}

export default function DashboardPage() {
  const assessment = useCaseStore((state) => state.assessment)
  const setAssessment = useCaseStore((state) => state.setAssessment)
  const storeDemoId = useCaseStore((state) => state.demoId)
  const { loading, loadDemo, error, clearError } = useDemoData()
  const [demoLoaded, setDemoLoaded] = useState(false)
  const [localDemoId, setLocalDemoId] = useState<string | null>(null)

  const activeDemoId = localDemoId || storeDemoId

  const handleDemoSelect = (caseType: DemoCaseType) => {
    clearError()
    setLocalDemoId(caseType)
    const report = loadDemo(caseType)
    if (report) {
      setAssessment({
        legalDirection: report.assessment.predictedDirection,
        directionScore: report.assessment.readinessScore,
        confidenceLevel: report.assessment.confidence,
        readinessScore: report.assessment.readinessScore,
        practicalRiskScore: report.assessment.readinessScore,
        favorableFactors: report.favorableFactors,
        riskFactors: report.unfavorableFactors,
        missingEvidence: report.missingEvidence,
        applicableLaws: report.applicableProvisions,
        precedents: report.precedents.map((p) => ({
          id: p.title,
          title: p.title,
          similarity: parseInt(p.relevance) || 0,
          summary: p.summary,
        })),
        nextSteps: report.nextSteps,
      })
      setDemoLoaded(true)
    }
  }

  if (loading) return <DashboardSkeleton />

  if (error) {
    return (
      <DashboardLayout>
        <ErrorState
          title="Failed to load demo case"
          message={error}
          variant="warning"
          primaryAction={{
            label: 'Try Again',
            onClick: () => {
              clearError()
              const report = loadDemo()
              if (report) {
                setAssessment({
                  legalDirection: report.assessment.predictedDirection,
                  directionScore: report.assessment.readinessScore,
                  confidenceLevel: report.assessment.confidence,
                  readinessScore: report.assessment.readinessScore,
                  practicalRiskScore: report.assessment.readinessScore,
                  favorableFactors: report.favorableFactors,
                  riskFactors: report.unfavorableFactors,
                  missingEvidence: report.missingEvidence,
                  applicableLaws: report.applicableProvisions,
                  precedents: report.precedents.map((p) => ({
                    id: p.title,
                    title: p.title,
                    similarity: parseInt(p.relevance) || 0,
                    summary: p.summary,
                  })),
                  nextSteps: report.nextSteps,
                })
                setDemoLoaded(true)
              }
            },
          }}
          secondaryAction={{
            label: assessment ? 'View Current' : 'Back to Intake',
            onClick: () => {
              if (assessment) clearError()
              else window.location.href = '/intake'
            },
          }}
        />
      </DashboardLayout>
    )
  }

  if (!assessment && !demoLoaded) {
    const noDash = getEmptyStatePreset('noDashboard')
    return (
      <DashboardLayout>
        <EmptyState
          icon={noDash.icon}
          title={noDash.title}
          description={noDash.description}
          action={{ label: 'Start Assessment', onClick: () => { window.location.href = '/intake' } }}
          variant="page"
        />
        <div className="flex justify-center" style={{ marginTop: '-16px' }}>
          <DemoCaseButton onSelect={handleDemoSelect} />
        </div>
      </DashboardLayout>
    )
  }

  if (!assessment) {
    const noDash = getEmptyStatePreset('noDashboard')
    return (
      <DashboardLayout>
        <EmptyState
          icon={noDash.icon}
          title={noDash.title}
          description={noDash.description}
          action={{ label: 'Try Again', onClick: () => window.location.reload() }}
          variant="page"
        />
        <div className="flex justify-center" style={{ marginTop: '-16px' }}>
          <DemoCaseButton onSelect={handleDemoSelect} label="Load Demo Case" />
        </div>
      </DashboardLayout>
    )
  }

  const hardcodedData = activeDemoId
    ? HARDCODED_ASSESSMENTS[activeDemoId as keyof typeof HARDCODED_ASSESSMENTS]
    : null

  const displayFactors   = hardcodedData?.favorableFactors  || assessment.favorableFactors  || []
  const displayRisk      = assessment.riskFactors      || []
  const displayEvidence  = assessment.missingEvidence  || []
  const displayLaws      = assessment.applicableLaws   || []
  const displayPrecedents = assessment.precedents      || []

  return (
    <PageTransition>
      <DashboardLayout>
        {/* Use gap instead of space-y — global * { m-0 p-0 } kills space-y in Tailwind v4 */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
        >

          {/* Dashboard title + actions */}
          <motion.div
            variants={staggerItem}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B69D74' }}>
                Assessment Complete
              </p>
              <h2
                style={{
                  fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
                  fontWeight: 700,
                  color: '#1F2839',
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15,
                }}
              >
                Your Assessment Dashboard
              </h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
              <button
                onClick={() => { window.location.href = `/simulator?id=${activeDemoId || 'demo-security-deposit'}` }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '13px 24px',
                  background: '#1F2839',
                  color: '#fff',
                  fontSize: '15px',
                  fontWeight: 700,
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(31,40,57,0.28)',
                  letterSpacing: '0.01em',
                }}
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Simulate this case
              </button>
              <DemoCaseButton onSelect={handleDemoSelect} label="Switch Demo Case" />
            </div>
          </motion.div>

          {/* Assessment notice (only renders for low confidence / readiness) */}
          <motion.div variants={staggerItem}>
            <AssessmentNotice
              confidenceLevel={hardcodedData?.confidenceLevel || assessment.confidenceLevel || 'Low'}
              readinessScore={hardcodedData ? 100 : (assessment.readinessScore || 0)}
              evidenceGaps={hardcodedData?.missingEvidence.length || assessment.missingEvidence?.length || 0}
              onAction={() => { window.location.href = '/intake' }}
            />
          </motion.div>

          {/* 3-column metric cards */}
          <motion.div variants={staggerItem} style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
            <MotionCard>
              <OutcomeCard
                label={hardcodedData?.directionLabel || assessment.legalDirection || 'Pending'}
                score={hardcodedData?.directionScore || assessment.directionScore || 0}
              />
            </MotionCard>
            <MotionCard delay={0.05}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <ConfidenceMeter level={hardcodedData?.confidenceLevel || assessment.confidenceLevel || 'Low'} />
                {hardcodedData && (
                  <p style={{ textAlign: 'center', fontSize: '11px', color: 'rgba(31,40,57,0.45)', fontWeight: 500 }}>
                    {hardcodedData.confidenceScore}% confidence score
                  </p>
                )}
              </div>
            </MotionCard>
            <MotionCard delay={0.1}>
              <ReadinessScore score={hardcodedData?.directionScore || assessment.readinessScore || 0} />
            </MotionCard>
          </motion.div>

          {/* Know Your Rights + Next Steps (hardcoded data only) */}
          {hardcodedData && (
            <motion.div variants={staggerItem} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <MotionCard>
                <div style={{ ...card }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(182,157,116,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Shield style={{ width: '14px', height: '14px', color: '#B69D74' }} />
                    </div>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#1F2839', fontFamily: 'var(--font-inter)' }}>
                      Know Your Rights
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {hardcodedData.knowYourRights.map((right, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '8px' }}>
                        <span style={{ color: '#B69D74', flexShrink: 0, marginTop: '2px', fontSize: '12px' }}>•</span>
                        <span style={{ fontSize: '13px', color: 'rgba(31,40,57,0.72)', lineHeight: '1.5' }}>{right}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </MotionCard>

              <MotionCard delay={0.05}>
                <div style={{ ...card }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(31,40,57,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <HelpCircle style={{ width: '14px', height: '14px', color: '#1F2839' }} />
                    </div>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#1F2839', fontFamily: 'var(--font-inter)' }}>
                      Actual Next Steps
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {hardcodedData.nextSteps.map((step, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '10px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#B69D74', flexShrink: 0, width: '16px', textAlign: 'right', marginTop: '2px' }}>
                          {idx + 1}.
                        </span>
                        <span style={{ fontSize: '13px', color: 'rgba(31,40,57,0.72)', lineHeight: '1.5' }}>{step}</span>
                      </div>
                    ))}
                  </div>
                  {hardcodedData.helplines.length > 0 && (
                    <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid rgba(182,157,116,0.2)' }}>
                      <p style={{ ...sectionLabel, marginBottom: '8px' }}>Helplines</p>
                      {hardcodedData.helplines.map((hl, idx) => (
                        <p key={idx} style={{ fontSize: '13px', fontWeight: 600, color: '#B69D74' }}>
                          {hl.name}: {hl.number}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </MotionCard>
            </motion.div>
          )}

          {/* Favorable + Risk / Weak case */}
          <motion.div variants={staggerItem} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <MotionCard>
              {displayFactors.length > 0 ? (
                <FavorableFactors factors={displayFactors} />
              ) : (
                <EmptyState {...getEmptyStatePreset('noFavorableFactors')} variant="section" />
              )}
            </MotionCard>

            <MotionCard delay={0.05}>
              {hardcodedData ? (
                <div style={{ ...card, height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(220,38,38,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <AlertTriangle style={{ width: '14px', height: '14px', color: '#dc2626' }} />
                    </div>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#1F2839', fontFamily: 'var(--font-inter)' }}>
                      Why the case is weak
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {hardcodedData.unfavorableFactors.map((uf, idx) => (
                      <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <span style={{ color: '#dc2626', flexShrink: 0, fontSize: '12px', marginTop: '2px' }}>•</span>
                          <span style={{ fontSize: '13px', color: 'rgba(31,40,57,0.8)', fontWeight: 600, lineHeight: '1.4' }}>{uf.factor}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', paddingLeft: '16px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 700, color: '#B69D74', flexShrink: 0 }}>↳ Fix:</span>
                          <span style={{ fontSize: '12px', color: 'rgba(31,40,57,0.6)', lineHeight: '1.45' }}>{uf.howToFix}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : displayRisk.length > 0 ? (
                <RiskFactors factors={displayRisk} />
              ) : (
                <EmptyState {...getEmptyStatePreset('noRiskFactors')} variant="section" />
              )}
            </MotionCard>
          </motion.div>

          {/* Evidence Assessment */}
          <motion.div variants={staggerItem}>
            <MotionCard>
              {hardcodedData ? (
                <div style={card}>
                  <p style={{ ...sectionLabel, marginBottom: '16px' }}>Evidence Assessment</p>
                  {hardcodedData.missingEvidence.length === 0 ? (
                    <div style={{ background: 'rgba(22,163,74,0.06)', border: '1px solid rgba(22,163,74,0.2)', borderRadius: '10px', padding: '14px 16px' }}>
                      <p style={{ fontSize: '13px', fontWeight: 700, color: '#166534' }}>No Evidence Gaps Recorded</p>
                      <p style={{ fontSize: '12px', color: 'rgba(22,101,52,0.7)', marginTop: '4px', lineHeight: '1.5' }}>
                        Your evidence appears complete based on the information provided.
                      </p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <p style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(31,40,57,0.6)' }}>
                        Recommended Evidence to Collect:
                      </p>
                      {hardcodedData.missingEvidence.map((ev, idx) => (
                        <div
                          key={idx}
                          style={{
                            background: 'rgba(182,157,116,0.06)',
                            border: '1px solid rgba(182,157,116,0.2)',
                            borderRadius: '10px',
                            padding: '12px 14px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px',
                          }}
                        >
                          <p style={{ fontSize: '13px', fontWeight: 700, color: '#1F2839' }}>{ev.item}</p>
                          <p style={{ fontSize: '12px', color: 'rgba(31,40,57,0.55)', lineHeight: '1.45' }}>Why: {ev.whyNeeded}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : displayEvidence.length > 0 ? (
                <MissingEvidence items={displayEvidence} />
              ) : (
                <EmptyState {...getEmptyStatePreset('noEvidenceGaps')} variant="section" />
              )}
            </MotionCard>
          </motion.div>

          {/* Applicable Laws */}
          <motion.div variants={staggerItem}>
            <MotionCard>
              {hardcodedData ? (
                <div style={card}>
                  <p style={{ ...sectionLabel, marginBottom: '16px' }}>Applicable Laws</p>
                  {hardcodedData.laws.length === 0 ? (
                    <EmptyState {...getEmptyStatePreset('noApplicableLaws')} variant="section" />
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {hardcodedData.laws.map((law, idx) => (
                        <div
                          key={idx}
                          style={{
                            border: '1px solid rgba(182,157,116,0.18)',
                            borderRadius: '10px',
                            padding: '14px 16px',
                            background: 'rgba(245,245,239,0.5)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '6px',
                          }}
                        >
                          <p style={{ fontSize: '13px', fontWeight: 700, color: '#1F2839' }}>{law.name}</p>
                          <p style={{ fontSize: '12px', color: 'rgba(31,40,57,0.6)', lineHeight: '1.5' }}>{law.explanation}</p>
                          <p style={{ fontSize: '12px' }}>
                            <span style={{ fontWeight: 700, color: 'rgba(31,40,57,0.6)' }}>Does it help? </span>
                            <span style={{ color: law.doesItHelp.startsWith('Yes') ? '#166534' : '#991b1b', fontWeight: 600 }}>
                              {law.doesItHelp}
                            </span>
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : displayLaws.length > 0 ? (
                <ApplicableLaws laws={displayLaws} nextSteps={assessment.nextSteps || []} />
              ) : (
                <EmptyState {...getEmptyStatePreset('noApplicableLaws')} variant="section" />
              )}
            </MotionCard>
          </motion.div>

          {/* Glossary (hardcoded only) */}
          {hardcodedData && (
            <motion.div variants={staggerItem}>
              <MotionCard>
                <div style={card}>
                  <p style={{ ...sectionLabel, marginBottom: '16px' }}>Glossary of Legal Terms</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {hardcodedData.glossary.map((g, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: 'rgba(31,40,57,0.04)',
                          border: '1px solid rgba(182,157,116,0.18)',
                          borderRadius: '10px',
                          padding: '14px 16px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '5px',
                        }}
                      >
                        <p style={{ fontSize: '13px', fontWeight: 800, color: '#1F2839' }}>{g.term}</p>
                        <p style={{ fontSize: '12px', color: 'rgba(31,40,57,0.6)', lineHeight: '1.5' }}>{g.definition}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </MotionCard>
            </motion.div>
          )}

          {/* Past Cases / Precedents */}
          <motion.div variants={staggerItem}>
            <MotionCard>
              {hardcodedData ? (
                <div style={card}>
                  <p style={{ ...sectionLabel, marginBottom: '16px' }}>Past Cases (How it ended)</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {hardcodedData.pastCases.map((pc, idx) => (
                      <AccordionCase key={idx} caseData={pc} />
                    ))}
                  </div>
                </div>
              ) : displayPrecedents.length > 0 ? (
                <PrecedentList precedents={displayPrecedents} />
              ) : (
                <EmptyState {...getEmptyStatePreset('noPrecedents')} variant="section" />
              )}
            </MotionCard>
          </motion.div>

        </motion.div>
      </DashboardLayout>
    </PageTransition>
  )
}

/* ── Accordion ─────────────────────────────────────────────────────── */
function AccordionCase({ caseData }: { caseData: any }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div
      style={{
        border: '1px solid rgba(182,157,116,0.2)',
        borderRadius: '10px',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '14px 16px',
          background: 'rgba(245,245,239,0.6)',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#1F2839' }}>{caseData.title}</p>
          <p style={{ fontSize: '12px', color: 'rgba(31,40,57,0.5)' }}>{caseData.summary}</p>
        </div>
        {isOpen
          ? <ChevronUp style={{ width: '16px', height: '16px', color: 'rgba(31,40,57,0.4)', flexShrink: 0, marginTop: '2px' }} />
          : <ChevronDown style={{ width: '16px', height: '16px', color: 'rgba(31,40,57,0.4)', flexShrink: 0, marginTop: '2px' }} />
        }
      </button>
      {isOpen && (
        <div
          style={{
            padding: '14px 16px',
            background: '#fff',
            borderTop: '1px solid rgba(182,157,116,0.15)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div>
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(31,40,57,0.4)', marginBottom: '4px' }}>
              How it ended
            </p>
            <p style={{ fontSize: '13px', color: '#1F2839', lineHeight: '1.5' }}>{caseData.howItEnded}</p>
          </div>
          <div>
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(31,40,57,0.4)', marginBottom: '4px' }}>
              Human Readable Reason
            </p>
            <p style={{ fontSize: '13px', color: 'rgba(31,40,57,0.72)', lineHeight: '1.5', background: 'rgba(182,157,116,0.07)', padding: '10px 12px', borderRadius: '8px' }}>
              {caseData.humanReadableReason}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
