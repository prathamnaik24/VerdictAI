import { NextResponse } from 'next/server';
import { assessCaseScore } from '@/backend/services/score.service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { caseType, caseDetails } = body;

    const assessment = await assessCaseScore(caseType, caseDetails);

    return NextResponse.json({
      success: true,
      assessment,
    });
  } catch (error) {
    console.error('[API] Score error:', error);
    return NextResponse.json(
      { success: false, error: 'Score failed' },
      { status: 500 }
    );
  }
}
