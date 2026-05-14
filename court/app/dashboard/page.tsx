'use client'

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

export default function DashboardPage() {
  const assessment = useCaseStore(
    (state) => state.assessment
  )

  if (!assessment) {
    return (
      <div className="p-10">
        No assessment available
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <OutcomeCard
          label={assessment.legalDirection}
          score={assessment.directionScore}
        />

        <ConfidenceMeter
          level={assessment.confidenceLevel}
        />

        <ReadinessScore
          score={assessment.readinessScore}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FavorableFactors
          factors={assessment.favorableFactors}
        />

        <RiskFactors
          factors={assessment.riskFactors}
        />
      </div>

      <MissingEvidence
        items={assessment.missingEvidence}
      />

      <ApplicableLaws
        laws={assessment.applicableLaws}
      />

      <PrecedentList
        precedents={assessment.precedents}
      />
    </DashboardLayout>
  )
}
