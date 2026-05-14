import { NextResponse } from 'next/server';
import { explainAssessment } from '@/backend/services/explain.service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { score, factors } = body;

    const explanation = await explainAssessment(score, factors);

    return NextResponse.json({
      success: true,
      explanation,
    });
  } catch (error) {
    console.error('[API] Explain error:', error);
    return NextResponse.json(
      { success: false, error: 'Explain failed' },
      { status: 500 }
    );
  }
}
