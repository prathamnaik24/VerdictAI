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

  const hardcodedData = activeDemoId ? HARDCODED_ASSESSMENTS[activeDemoId as keyof typeof HARDCODED_ASSESSMENTS] : null;

  const displayFactors = hardcodedData?.favorableFactors || assessment.favorableFactors || []
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
                confidenceLevel={hardcodedData?.confidenceLevel || assessment.confidenceLevel || 'Low'}
                readinessScore={hardcodedData ? 100 : (assessment.readinessScore || 0)}
                evidenceGaps={hardcodedData?.missingEvidence.length || assessment.missingEvidence?.length || 0}
                onAction={() => window.location.href = '/intake'}
              />
            </motion.div>

            <motion.div variants={staggerItem} className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <MotionCard>
                 <OutcomeCard
                   label={hardcodedData?.directionLabel || assessment.legalDirection || 'Pending'}
                   score={hardcodedData?.directionScore || assessment.directionScore || 0}
                 />
               </MotionCard>
               <MotionCard delay={0.05}>
                 <ConfidenceMeter
                   level={hardcodedData?.confidenceLevel || assessment.confidenceLevel || 'Low'}
                 />
                 {hardcodedData && (
                   <div className="mt-2 text-center text-xs text-gray-500 font-medium">
                     {hardcodedData.confidenceScore}% confidence score
                   </div>
                 )}
               </MotionCard>
               <MotionCard delay={0.1}>
                 <ReadinessScore
                   score={hardcodedData?.directionScore || assessment.readinessScore || 0}
                 />
               </MotionCard>
             </motion.div>

             {hardcodedData && (
              <motion.div variants={staggerItem} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MotionCard>
                  <div className="bg-white border border-green-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <Shield className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Know Your Rights</h3>
                    </div>
                    <ul className="space-y-3">
                      {hardcodedData.knowYourRights.map((right, idx) => (
                        <li key={idx} className="flex gap-2 text-sm text-gray-700">
                          <span className="text-green-500 mt-0.5">•</span>
                          <span>{right}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </MotionCard>
                <MotionCard delay={0.05}>
                  <div className="bg-white border border-blue-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <HelpCircle className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Actual Next Steps</h3>
                    </div>
                    <ul className="space-y-3">
                      {hardcodedData.nextSteps.map((step, idx) => (
                        <li key={idx} className="flex gap-2 text-sm text-gray-700">
                          <span className="text-blue-500 mt-0.5">{idx + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                    {hardcodedData.helplines.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-blue-100">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Helplines</p>
                        {hardcodedData.helplines.map((hl, idx) => (
                          <div key={idx} className="text-sm font-medium text-blue-800">
                            {hl.name}: {hl.number}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </MotionCard>
              </motion.div>
             )}

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

                {hardcodedData ? (
                  <MotionCard delay={0.05}>
                    <div className="bg-white border border-red-200 rounded-xl p-6 shadow-sm h-full">
                      <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Why the case is weak</h3>
                      </div>
                      <ul className="space-y-4 mb-6">
                        {hardcodedData.unfavorableFactors.map((uf, idx) => (
                          <li key={idx} className="flex flex-col gap-1 text-sm">
                            <div className="flex gap-2 text-gray-700 font-medium">
                              <span className="text-red-500">•</span>
                              <span>{uf.factor}</span>
                            </div>
                            <div className="flex gap-2 text-gray-600 pl-4">
                              <span className="text-green-500">↳ Fix:</span>
                              <span>{uf.howToFix}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </MotionCard>
                ) : displayRisk.length > 0 ? (
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
                  {hardcodedData ? (
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Evidence Assessment</p>
                      {hardcodedData.missingEvidence.length === 0 ? (
                        <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                          <h4 className="text-green-800 font-medium">No Evidence Gaps Recorded</h4>
                          <p className="text-green-600 text-sm mt-1">Your evidence appears complete based on the information provided. No missing items were identified.</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <h4 className="text-amber-800 font-medium mb-3">Recommended Evidence to Collect:</h4>
                          {hardcodedData.missingEvidence.map((ev, idx) => (
                            <div key={idx} className="bg-amber-50 border border-amber-100 rounded-lg p-3">
                              <div className="text-sm font-semibold text-amber-900">{ev.item}</div>
                              <div className="text-sm text-amber-700 mt-1">Why: {ev.whyNeeded}</div>
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

              <motion.div variants={staggerItem}>
                <MotionCard>
                  {hardcodedData ? (
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Applicable Laws</p>
                      {hardcodedData.laws.length === 0 ? (
                        <EmptyState {...getEmptyStatePreset('noApplicableLaws')} variant="section" />
                      ) : (
                        <div className="space-y-4">
                          {hardcodedData.laws.map((law, idx) => (
                            <div key={idx} className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                              <h4 className="text-sm font-semibold text-gray-900">{law.name}</h4>
                              <p className="text-sm text-gray-600 mt-2">{law.explanation}</p>
                              <div className="mt-3 text-sm">
                                <span className="font-semibold text-gray-700">Does it help? </span>
                                <span className={law.doesItHelp.startsWith('Yes') ? 'text-green-600' : 'text-red-600'}>{law.doesItHelp}</span>
                              </div>
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

              {hardcodedData && (
                <motion.div variants={staggerItem}>
                  <MotionCard>
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Glossary of Legal Terms</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {hardcodedData.glossary.map((g, idx) => (
                          <div key={idx} className="bg-indigo-50 border border-indigo-100 p-4 rounded-lg">
                            <h4 className="text-sm font-bold text-indigo-900">{g.term}</h4>
                            <p className="text-sm text-indigo-700 mt-1">{g.definition}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </MotionCard>
                </motion.div>
              )}

              <motion.div variants={staggerItem}>
                <MotionCard>
                  {hardcodedData ? (
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Past Cases (How it ended)</p>
                      <div className="space-y-4">
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
      </div>
    </PageTransition>
  )
}

function AccordionCase({ caseData }: { caseData: any }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <div>
          <h4 className="text-sm font-semibold text-gray-900">{caseData.title}</h4>
          <p className="text-xs text-gray-500 mt-1">{caseData.summary}</p>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>
      {isOpen && (
        <div className="p-4 bg-white border-t border-gray-200 space-y-3">
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase">How it ended:</span>
            <p className="text-sm text-gray-800 mt-1">{caseData.howItEnded}</p>
          </div>
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase">Human Readable Reason:</span>
            <p className="text-sm text-gray-700 mt-1 bg-blue-50 p-3 rounded-md">{caseData.humanReadableReason}</p>
          </div>
        </div>
      )}
    </div>
  )
}
