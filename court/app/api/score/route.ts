/**
 * PHASE 5: SCORE API ROUTE
 *
 * Endpoint: POST /api/score
 *
 * Receives case details and returns:
 * - Legal direction score
 * - Practical risk assessment
 * - Readiness evaluation
 * - Evidence gaps
 * - Recommended actions
 *
 * Very thin wrapper - all logic in service layer.
 */

import { NextResponse } from 'next/server';
import { assessCase, formatScoreServiceError } from '@/backend/services/score.service';
import type { AssessmentInput } from '@/shared/types/assessment.types';

// ============================================================================
// POST: Score a case
// ============================================================================

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log('[API] Score request received:', {
      caseType: body.caseType,
      hasDescription: !!body.description,
      evidenceCount: body.evidence?.length || 0,
    });

    // Support both old format (caseType + caseDetails) and new format (full AssessmentInput)
    let assessmentInput: AssessmentInput;

    if (body.caseType && body.caseDetails) {
      // Old format: { caseType, caseDetails: {...} }
      assessmentInput = {
        caseType: body.caseType,
        ...body.caseDetails,
      };
    } else {
      // New format: { caseType, title, description, evidence, ... }
      assessmentInput = body;
    }

    // Call scoring service
    const assessment = await assessCase(assessmentInput);

    console.log('[API] Scoring complete:', {
      legalScore: assessment.legalDirectionScore,
      practicalRisk: assessment.practicalRiskScore,
      readiness: assessment.readinessScore,
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        data: assessment,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API] Score error:', error);

    const errorResponse = formatScoreServiceError(error);

    return NextResponse.json(
      {
        success: false,
        error: errorResponse.error,
        details: errorResponse.details,
        timestamp: new Date().toISOString(),
      },
      { status: 400 }
    );
  }
}

// ============================================================================
// GET: Health check / documentation
// ============================================================================

export async function GET() {
  return NextResponse.json(
    {
      status: 'ready',
      endpoint: '/api/score',
      method: 'POST',
      description: 'Score a legal case based on provided details',
      requestFormat: {
        caseType: 'string (required) - dispute type',
        title: 'string (required) - case title',
        description: 'string (required) - case description (min 10 chars)',
        evidence: 'array (optional) - array of evidence items',
        amountInvolved: 'number (optional) - amount at stake',
        timeline: 'string (optional) - case timeline',
        location: 'string (optional) - jurisdiction',
        desiredOutcome: 'string (optional) - desired relief',
      },
      exampleRequest: {
        caseType: 'consumer-fraud',
        title: 'Defective Product Purchase',
        description: 'Purchased a laptop that malfunctioned within days of purchase. Seller refused refund despite warranty.',
        evidence: ['Purchase receipt', 'Photo of defect', 'Email correspondence'],
        amountInvolved: 45000,
        timeline: '2024-03-15',
      },
      responseFields: {
        legalDirectionScore: '0-100 (higher = more favorable)',
        legalDirectionLabel: 'Strongly Favorable | Favorable | Neutral | Unfavorable | Strongly Unfavorable',
        practicalRiskScore: '0-100 (higher = more difficult)',
        practicalDifficulty: 'Easy | Moderate | Difficult | Very Difficult',
        readinessScore: '0-100 (higher = more ready)',
        readinessLevel: 'Trial Ready | Mostly Ready | Partially Ready | Needs Work | Not Ready',
        confidenceLevel: 'Very High | High | Moderate | Low',
        favorableFactors: 'Array of factors supporting the case',
        riskFactors: 'Array of risk factors',
        recommendedActions: 'Array of suggested next steps',
      },
    },
    { status: 200 }
  );
}
