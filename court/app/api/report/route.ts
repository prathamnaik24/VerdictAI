import { NextResponse } from 'next/server';
import { generateReport } from '@/backend/services/report.service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { caseType, caseDetails } = body;

    const report = await generateReport(caseType, caseDetails);

    return NextResponse.json({
      success: true,
      report,
    });
  } catch (error) {
    console.error('[API] Report error:', error);
    return NextResponse.json(
      { success: false, error: 'Report failed' },
      { status: 500 }
    );
  }
}
