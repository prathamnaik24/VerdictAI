import { NextRequest, NextResponse } from "next/server";

import { extractCaseData } from "@/backend/services/extract.service";

import {
  ExtractionRequest,
} from "@/shared/types/extraction.types";

function validateRequestBody(
  body: Partial<ExtractionRequest>
) {
  if (!body.rawFacts) {
    return "rawFacts is required";
  }

  if (typeof body.rawFacts !== "string") {
    return "rawFacts must be a string";
  }

  if (body.rawFacts.trim().length < 10) {
    return "Please provide more case details";
  }

  return null;
}

export async function POST(
  request: NextRequest
) {
  try {
    const body =
      (await request.json()) as Partial<ExtractionRequest>;

    const validationError =
      validateRequestBody(body);

    if (validationError) {
      return NextResponse.json(
        {
          success: false,
          error: validationError,
        },
        {
          status: 400,
        }
      );
    }

    const result =
      await extractCaseData({
        rawFacts: body.rawFacts!,
        privacyMode: body.privacyMode || false,
        disputeHint: body.disputeHint,
      });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(
      "/api/extract error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to process intake extraction",
      },
      {
        status: 500,
      }
    );
  }
}
