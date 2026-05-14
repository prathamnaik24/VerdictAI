export interface Precedent {
  id: string
  title: string
  similarity: number
  court?: string
  summary?: string
}

export interface AssessmentResult {
  legalDirection: string
  directionScore: number
  confidenceLevel: string
  readinessScore: number
  practicalRiskScore: number

  favorableFactors: string[]
  riskFactors: string[]
  missingEvidence: string[]

  applicableLaws: string[]

  precedents: Precedent[]
  nextSteps?: string[]
}
