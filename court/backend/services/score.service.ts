/**
 * PHASE 5: SCORE SERVICE
 *
 * Thin bridge layer between API routes and scoring engine.
 *
 * Responsibilities:
 * - Input validation
 * - Call appropriate scorer
 * - Format response
 * - Error handling
 *
 * Rule: Keep this layer simple. All logic belongs in scoreEngine or helpers.
 */

import { scorePhase5, scoreCase } from '@/backend/scoring/scoreEngine';
import { DisputeType } from '@/shared/constants/disputeTypes';
import type { ScoringOutput, AssessmentInput } from '@/shared/types/assessment.types';

// ============================================================================
// INPUT VALIDATION
// ============================================================================

/**
 * Validate assessment input
 * Throws error if required fields missing
 */
function validateAssessmentInput(input: AssessmentInput): void {
  if (!input.caseType) {
    throw new Error('caseType is required');
  }

  if (!input.description || input.description.trim().length < 10) {
    throw new Error('description must be at least 10 characters');
  }

  if (!input.title || input.title.trim().length < 3) {
    throw new Error('title must be at least 3 characters');
  }

  // Evidence is optional but if provided should be an array
  if (input.evidence && !Array.isArray(input.evidence)) {
    throw new Error('evidence must be an array');
  }

  // amountInvolved should be a positive number if provided
  if (input.amountInvolved !== undefined && input.amountInvolved < 0) {
    throw new Error('amountInvolved must be positive');
  }
}

/**
 * Normalize/sanitize case details for scoring
 */
function normalizeCaseDetails(input: AssessmentInput) {
  return {
    caseType: input.caseType as DisputeType,
    title: input.title?.trim(),
    description: input.description?.trim(),
    evidence: (input.evidence || []).map((e) => e.trim()).filter((e) => e.length > 0),
    amountInvolved: input.amountInvolved || 0,
    timeline: input.timeline?.trim(),
    location: input.location?.trim(),
    desiredOutcome: input.desiredOutcome?.trim(),
  };
}

// ============================================================================
// SCORING METHODS
// ============================================================================

/**
 * NEW: Phase 5 Complete Scoring Output
 * Calls scorePhase5() and returns rich ScoringOutput
 */
export async function scoreAssessmentPhase5(
  input: AssessmentInput
): Promise<ScoringOutput> {
  // Validate input
  validateAssessmentInput(input);
  const caseDetails = normalizeCaseDetails(input);

  // Call scoring engine
  const scoringOutput = scorePhase5(caseDetails);

  return scoringOutput;
}

/**
 * LEGACY: Simple Scoring (for backward compatibility)
 * Returns score + factors only
 */
export function scoreAssessmentLegacy(
  input: AssessmentInput
): { score: number; factors: string[] } {
  // Validate input
  validateAssessmentInput(input);
  const caseDetails = normalizeCaseDetails(input);

  // Call scoring engine (old signature)
  const result = scoreCase(caseDetails.caseType, caseDetails);

  return result;
}

// ============================================================================
// ASSESSMENT SERVICE (Public API)
// ============================================================================

/**
 * Main assessment endpoint
 * Automatically uses Phase 5 scoring if available
 */
export async function assessCase(
  input: AssessmentInput
): Promise<ScoringOutput> {
  try {
    console.log('[Score Service] Assessing case:', input.caseType);

    // Validate
    validateAssessmentInput(input);

    // Score using Phase 5 engine
    const scoringOutput = await scoreAssessmentPhase5(input);

    console.log('[Score Service] Scoring complete:', {
      caseType: input.caseType,
      legalScore: scoringOutput.legalDirectionScore,
      practicalRisk: scoringOutput.practicalRiskScore,
      readiness: scoringOutput.readinessScore,
    });

    return scoringOutput;
  } catch (error) {
    console.error('[Score Service] Scoring error:', error);
    throw error;
  }
}

/**
 * Quick scoring (for rapid assessment)
 * Returns simpler output than full Phase 5
 */
export function quickScore(
  input: AssessmentInput
): { score: number; factors: string[] } {
  try {
    console.log('[Score Service] Quick scoring:', input.caseType);

    validateAssessmentInput(input);
    const result = scoreAssessmentLegacy(input);

    console.log('[Score Service] Quick score complete:', result.score);
    return result;
  } catch (error) {
    console.error('[Score Service] Quick scoring error:', error);
    throw error;
  }
}

// ============================================================================
// ERROR HANDLER
// ============================================================================

/**
 * Format service errors for API responses
 */
export function formatScoreServiceError(error: unknown): {
  error: string;
  details?: string;
} {
  if (error instanceof Error) {
    return {
      error: 'Scoring failed',
      details: error.message,
    };
  }

  return {
    error: 'Unknown scoring error',
    details: String(error),
  };
}
