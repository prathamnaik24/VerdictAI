// Assessment service
// Orchestrates the complete assessment pipeline
import { scoreCase } from '@/scoring/scoreEngine';
import { retrieveRelevantCases } from '@/retrieval/retrieveCases';
import { DisputeType } from '@/types/case.types';
import type { ScoringOutput, AssessmentOutput } from '@/shared/types/assessment.types';

/**
 * Frontend assessment service - calls backend APIs
 * Combines extraction + scoring + retrieval into one object
 */
export const fetchCombinedAssessment = async (
  caseType: string,
  caseDetails: {
    title: string;
    description: string;
    evidence?: string[];
    timeline?: string;
    amountInvolved?: number;
    location?: string;
    desiredOutcome?: string;
  }
): Promise<{
  extraction: any;
  scoring: ScoringOutput;
  precedents: any[];
  combined: AssessmentOutput;
}> => {
  try {
    // Step 1: Extract case data
    const extractResponse = await fetch('/api/extract', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rawFacts: caseDetails.description,
        disputeHint: caseType,
        privacyMode: false,
      }),
    });

    if (!extractResponse.ok) throw new Error('Extraction failed');
    const extractData = await extractResponse.json();

    // Step 2: Score the case
    const scoreResponse = await fetch('/api/score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        caseType,
        title: caseDetails.title,
        description: caseDetails.description,
        evidence: caseDetails.evidence || [],
        timeline: caseDetails.timeline || '',
        amountInvolved: caseDetails.amountInvolved || 0,
        location: caseDetails.location || '',
        desiredOutcome: caseDetails.desiredOutcome || '',
      }),
    });

    if (!scoreResponse.ok) throw new Error('Scoring failed');
    const scoreData = await scoreResponse.json();
    const scoring = scoreData.data;

    // Step 3: Retrieve precedents
    const retrieveResponse = await fetch('/api/retrieve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        summary: caseDetails.description,
      }),
    });

    if (!retrieveResponse.ok) throw new Error('Precedent retrieval failed');
    const retrieveData = await retrieveResponse.json();
    const precedents = retrieveData.precedents || [];

    // Step 4: Combine into unified state
    const combinedState: AssessmentOutput = {
      likelihoodScore: scoring.legalDirectionScore,
      confidenceLevel: getConfidenceNumeric(scoring.confidenceLevel),
      assessmentSummary: scoring.legalDirectionExplanation,
      possibleApplicableLaws: [],
      evidenceSummary: {
        strength: scoring.evidenceStrength as any,
        availableEvidence: scoring.availableEvidence,
        missingEvidence: scoring.missingEvidence,
        recommendedEvidence: scoring.missingEvidence, // Same as missing for now
      },
      practicalRisks: scoring.practicalRiskFactors,
      precedents: precedents,
      favorableFactors: scoring.favorableFactors,
      unfavorableFactors: scoring.riskFactors.map((r: any) => r.title),
    };

    return {
      extraction: extractData.data,
      scoring,
      precedents,
      combined: combinedState,
    };
  } catch (error) {
    console.error('Assessment pipeline failed:', error);
    throw error;
  }
};

/**
 * Convert confidence label to numeric value
 */
const getConfidenceNumeric = (label: string): number => {
  const map: Record<string, number> = {
    'Very High': 0.95,
    'High': 0.8,
    'Moderate': 0.65,
    'Low': 0.4,
  };
  return map[label] || 0.65;
};
