// Phase 7 — Simulation API Route (Step 7 placeholder)
// This file will be fully implemented in Step 7.
// Stubbed here to keep the TypeScript compiler clean while Steps 3–6 are built.

import { NextResponse } from "next/server";

// TODO (Step 7): wire up runSimulation() from the Step 6 orchestrator.
export async function POST(_request: Request) {
  return NextResponse.json(
    { success: false, error: "Simulation API not yet implemented — coming in Step 7." },
    { status: 501 }
  );
}
