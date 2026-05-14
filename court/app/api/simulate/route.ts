import { NextResponse } from 'next/server';
import { runSimulationRound } from '@/backend/services/simulate.service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { caseDetails, userStatement } = body;

    const simulation = await runSimulationRound(caseDetails, userStatement);

    return NextResponse.json({
      success: true,
      simulation,
    });
  } catch (error) {
    console.error('[API] Simulate error:', error);
    return NextResponse.json(
      { success: false, error: 'Simulate failed' },
      { status: 500 }
    );
  }
}
