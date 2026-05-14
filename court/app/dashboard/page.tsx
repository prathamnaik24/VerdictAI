'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import DashboardLayout from '@/frontend/components/dashboard/DashboardLayout'
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
import { DemoCaseButton } from '@/frontend/components/common/DemoCaseButton'
import { useDemoData } from '@/frontend/hooks/useDemoData'
import { PageTransition } from '@/frontend/components/animations/PageTransition'
import { staggerItem } from '@/frontend/components/animations/StaggerContainer'
import type { DemoCaseType } from '@/frontend/lib/demoHelpers'

export default function DashboardPage() {
  const assessment = useCaseStore((state) => state.assessment)
  const setAssessment = useCaseStore((state) => state.setAssessment)
  const { loading, loadDemo } = useDemoData()
  const [demoLoaded, setDemoLoaded] = useState(false)

  const handleDemoSelect = (caseType: DemoCaseType) => {
    const demoReport = loadDemo(caseType)
    setAssessment({
      legalDirection: demoReport.assessment.predictedDirection,
      directionScore: demoReport.assessment.readinessScore,
      confidenceLevel: demoReport.assessment.confidence,
      readinessScore: demoReport.assessment.readinessScore,
      practicalRiskScore: demoReport.assessment.readinessScore,
      favorableFactors: demoReport.favorableFactors,
      riskFactors: demoReport.unfavorableFactors,
      missingEvidence: demoReport.missingEvidence,
      applicableLaws: demoReport.applicableProvisions,
      precedents: demoReport.precedents.map((p) => ({
        id: p.title,
        title: p.title,
        similarity: parseInt(p.relevance) || 0,
        summary: p.summary,
      })),
    })
    setDemoLoaded(true)
  }

  if (!assessment && !demoLoaded) {
    return (
      <div className="min-h-screen bg-offwhite py-12">
        <DashboardLayout>
          <EmptyState
            title="No Assessment Available"
            description="Complete the intake process or load a demo case to view your assessment dashboard."
            actionLabel="Start Assessment"
            onAction={() => window.location.href = '/intake'}
            variant="page"
          />
          <div className="flex justify-center mt-4">
            <DemoCaseButton onSelect={handleDemoSelect} />
          </div>
        </DashboardLayout>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-offwhite flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-medium text-navy font-serif">Loading Demo Case</p>
          <div className="mt-6 flex justify-center gap-2">
            <span className="w-3 h-3 bg-gold rounded-full animate-pulse-dot" style={{ animationDelay: '0s' }} />
            <span className="w-3 h-3 bg-gold rounded-full animate-pulse-dot" style={{ animationDelay: '0.2s' }} />
            <span className="w-3 h-3 bg-gold rounded-full animate-pulse-dot" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
    )
  }

  if (!assessment) {
    return (
      <div className="min-h-screen bg-offwhite py-12">
        <DashboardLayout>
          <EmptyState
            title="No Assessment Data"
            description="Unable to load assessment. Please try again or load a demo case."
            variant="page"
          />
          <div className="flex justify-center mt-4">
            <DemoCaseButton onSelect={handleDemoSelect} label="Load Demo Case" />
          </div>
        </DashboardLayout>
      </div>
    )
  }

  const displayFactors = assessment.favorableFactors || []
  const displayRisk = assessment.riskFactors || []
  const displayEvidence = assessment.missingEvidence || []
  const displayLaws = assessment.applicableLaws || []
  const displayPrecedents = assessment.precedents || []

  return (
    <PageTransition>
      <div className="min-h-screen bg-offwhite py-10">
        <DashboardLayout>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="space-y-6"
          >
            <motion.div variants={staggerItem} className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-navy font-serif">Assessment Dashboard</h2>
              <DemoCaseButton onSelect={handleDemoSelect} label="Switch Demo Case" />
            </motion.div>

            <motion.div variants={staggerItem} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <OutcomeCard
                label={assessment.legalDirection || 'Pending'}
                score={assessment.directionScore || 0}
              />
              <ConfidenceMeter
                level={assessment.confidenceLevel || 'Low'}
              />
              <ReadinessScore
                score={assessment.readinessScore || 0}
              />
            </motion.div>

            <motion.div variants={staggerItem} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayFactors.length > 0 ? (
                <FavorableFactors factors={displayFactors} />
              ) : (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <p className="text-sm text-gray-500 italic">No favorable factors identified.</p>
                </div>
              )}

              {displayRisk.length > 0 ? (
                <RiskFactors factors={displayRisk} />
              ) : (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <p className="text-sm text-gray-500 italic">No risk factors identified.</p>
                </div>
              )}
            </motion.div>

            <motion.div variants={staggerItem}>
              {displayEvidence.length > 0 ? (
                <MissingEvidence items={displayEvidence} />
              ) : (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <p className="text-sm text-gray-500 italic">No evidence gaps recorded.</p>
                </div>
              )}
            </motion.div>

            <motion.div variants={staggerItem}>
              {displayLaws.length > 0 ? (
                <ApplicableLaws laws={displayLaws} />
              ) : (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <p className="text-sm text-gray-500 italic">No applicable laws referenced.</p>
                </div>
              )}
            </motion.div>

            <motion.div variants={staggerItem}>
              {displayPrecedents.length > 0 ? (
                <PrecedentList precedents={displayPrecedents} />
              ) : (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <p className="text-sm text-gray-500 italic">No precedents found.</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </DashboardLayout>
      </div>
    </PageTransition>
  )
}
