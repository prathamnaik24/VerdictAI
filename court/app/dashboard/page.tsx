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

export default function DashboardPage() {
   const assessment = useCaseStore((state) => state.assessment)
   const setAssessment = useCaseStore((state) => state.setAssessment)
   const { loading, loadDemo, error, clearError } = useDemoData()
   const [demoLoaded, setDemoLoaded] = useState(false)

   const handleDemoSelect = (caseType: DemoCaseType) => {
     clearError()
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

   // 1. Loading
   if (loading) {
     return <DashboardSkeleton />
   }

   // 2. Error from demo load failure
   if (error) {
     return (
       <div className="min-h-screen bg-offwhite py-12">
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
                 if (assessment) {
                   clearError()
                 } else {
                   window.location.href = '/intake'
                 }
               },
             }}
           />
         </DashboardLayout>
       </div>
     )
   }

   // 3. No assessment yet — initial empty state
   if (!assessment && !demoLoaded) {
     const noDash = getEmptyStatePreset('noDashboard')
     return (
       <div className="min-h-screen bg-offwhite py-12">
         <DashboardLayout>
           <EmptyState
             icon={noDash.icon}
             title={noDash.title}
             description={noDash.description}
             action={{ label: 'Start Assessment', onClick: () => window.location.href = '/intake' }}
             variant="page"
           />
           <div className="flex justify-center -mt-4">
             <DemoCaseButton onSelect={handleDemoSelect} />
           </div>
         </DashboardLayout>
       </div>
     )
   }

   // 4. Assessment was cleared or unavailable — fallback with retry
   if (!assessment) {
     const noDash = getEmptyStatePreset('noDashboard')
     return (
       <div className="min-h-screen bg-offwhite py-12">
         <DashboardLayout>
           <EmptyState
             icon={noDash.icon}
             title={noDash.title}
             description={noDash.description}
             action={{ label: 'Try Again', onClick: () => window.location.reload() }}
             variant="page"
           />
           <div className="flex justify-center -mt-4">
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
              <h2 className="text-2xl font-bold text-navy font-serif">Your Assessment Dashboard</h2>
              <DemoCaseButton onSelect={handleDemoSelect} label="Switch Demo Case" />
            </motion.div>

            <motion.div variants={staggerItem}>
              <AssessmentNotice
                confidenceLevel={assessment.confidenceLevel || 'Low'}
                readinessScore={assessment.readinessScore || 0}
                evidenceGaps={assessment.missingEvidence?.length || 0}
                onAction={() => window.location.href = '/intake'}
              />
            </motion.div>

<motion.div variants={staggerItem} className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <MotionCard>
                 <OutcomeCard
                   label={assessment.legalDirection || 'Pending'}
                   score={assessment.directionScore || 0}
                 />
               </MotionCard>
               <MotionCard delay={0.05}>
                 <ConfidenceMeter
                   level={assessment.confidenceLevel || 'Low'}
                 />
               </MotionCard>
               <MotionCard delay={0.1}>
                 <ReadinessScore
                   score={assessment.readinessScore || 0}
                 />
               </MotionCard>
             </motion.div>

<motion.div variants={staggerItem} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayFactors.length > 0 ? (
                  <MotionCard>
                    <FavorableFactors factors={displayFactors} />
                  </MotionCard>
                ) : (
                  <MotionCard>
                    <EmptyState {...getEmptyStatePreset('noFavorableFactors')} variant="section" />
                  </MotionCard>
                )}

                {displayRisk.length > 0 ? (
                  <MotionCard delay={0.05}>
                    <RiskFactors factors={displayRisk} />
                  </MotionCard>
                ) : (
                  <MotionCard delay={0.05}>
                    <EmptyState {...getEmptyStatePreset('noRiskFactors')} variant="section" />
                  </MotionCard>
                )}
              </motion.div>

<motion.div variants={staggerItem}>
                <MotionCard>
                  {displayEvidence.length > 0 ? (
                    <MissingEvidence items={displayEvidence} />
                  ) : (
                    <EmptyState {...getEmptyStatePreset('noEvidenceGaps')} variant="section" />
                  )}
                </MotionCard>
              </motion.div>

              <motion.div variants={staggerItem}>
                <MotionCard>
                  {displayLaws.length > 0 ? (
                    <ApplicableLaws laws={displayLaws} nextSteps={assessment.nextSteps || []} />
                  ) : (
                    <EmptyState {...getEmptyStatePreset('noApplicableLaws')} variant="section" />
                  )}
                </MotionCard>
              </motion.div>

              <motion.div variants={staggerItem}>
                <MotionCard>
                  {displayPrecedents.length > 0 ? (
                    <PrecedentList precedents={displayPrecedents} />
                  ) : (
                    <EmptyState {...getEmptyStatePreset('noPrecedents')} variant="section" />
                  )}
                </MotionCard>
              </motion.div>
          </motion.div>
        </DashboardLayout>
      </div>
    </PageTransition>
  )
}
