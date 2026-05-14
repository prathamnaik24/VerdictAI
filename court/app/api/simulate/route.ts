import { NextRequest, NextResponse } from "next/server";
import { simulateCourtroom } from "@/backend/services/simulate.service";
import type { SimulationRequest } from "@/shared/types/simulation.types";

export async function POST(request: NextRequest) {
  try {
    const body: SimulationRequest = await request.json();

    if (!body.openingStatement || !body.caseDescription) {
      return NextResponse.json(
        { error: "Missing required fields: openingStatement and caseDescription" },
        { status: 400 }
      );
    }

    const result = await simulateCourtroom(body);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("[API] Simulation route error:", error);

    return NextResponse.json(
      { error: "Failed to run simulation" },
      { status: 500 }
    );
  }
}
