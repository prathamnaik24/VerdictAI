import { NextResponse } from 'next/server';
import { retrieveCases } from '@/backend/services/retrieve.service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { caseDescription, caseType } = body;

    const precedents = await retrieveCases(caseDescription, caseType);

    return NextResponse.json({
      success: true,
      precedents,
    });
  } catch (error) {
    console.error('[API] Retrieve error:', error);
    return NextResponse.json(
      { success: false, error: 'Retrieve failed' },
      { status: 500 }
    );
  }
}
