import { NextResponse } from 'next/server';
import { generateReport } from '@/backend/services/report.service';
import type { ReportGenerationRequest } from '@/shared/types/report.types';

export async function POST(request: Request) {
  try {
    const body: ReportGenerationRequest = await request.json();

    if (!body.matterOverview || !body.factsSummary || !body.assessment) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: matterOverview, factsSummary, assessment' },
        { status: 400 }
      );
    }

    const report = await generateReport(body);

    return NextResponse.json({ success: true, data: report }, { status: 200 });
  } catch (error) {
    console.error('[API] Report generation error:', error);
    return NextResponse.json(
      { success: false, error: 'Report generation failed' },
      { status: 500 }
    );
  }
}
