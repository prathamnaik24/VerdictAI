import { NextResponse } from "next/server";

import { retrievePrecedents } from "@/backend/services/retrieve.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { summary } = body;

    if (!summary) {
      return NextResponse.json(
        { error: "Summary is required" },
        { status: 400 }
      );
    }

    const precedents = await retrievePrecedents(summary);

    return NextResponse.json({
      success: true,
      precedents,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve precedents",
      },
      {
        status: 500,
      }
    );
  }
}
