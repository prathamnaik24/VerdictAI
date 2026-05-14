import { NextResponse } from 'next/server';
import { extractCase } from '@/backend/services/extract.service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { caseDescription } = body;

    const result = await extractCase(caseDescription);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('[API] Extract error:', error);
    return NextResponse.json(
      { success: false, error: 'Extract failed' },
      { status: 500 }
    );
  }
}
