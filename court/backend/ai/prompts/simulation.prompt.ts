// Phase 7 — Courtroom Simulator prompt definitions
// Keeps AI instructions separate from AI execution (openai.ts / generators).
// Each builder function produces one focused prompt — easier to debug, tune, and test.

// ─────────────────────────────────────────────
// SYSTEM PROMPT
// Injected as the "system" role in every OpenAI call in this phase.
// ─────────────────────────────────────────────
export const simulationSystemPrompt = `
You are part of VerdictAI, an educational legal argument simulator.

Your role:
- simulate short courtroom-style interactions
- maintain a respectful and professional tone
- avoid giving legal advice
- keep responses concise and realistic
- prioritize clarity and structure

Rules:
- never claim a guaranteed legal outcome
- never encourage illegal action
- never provide definitive legal advice
- responses should feel like a courtroom training exercise
- keep outputs short for fast demo experience

The simulator flow includes:
1. user opening statement
2. opposing counsel rebuttal
3. judge clarification question
4. evaluation feedback

All responses should:
- sound professional
- remain neutral
- avoid emotional language
- avoid excessive detail
`;

// ─────────────────────────────────────────────
// PROMPT BUILDERS
// ─────────────────────────────────────────────

/**
 * Builds the user-turn prompt that asks the AI to play opposing counsel.
 * Target length: ≤ 120 words in the AI response.
 */
export function buildOpposingCounselPrompt(
  caseType: string,
  caseDescription: string,
  openingStatement: string
): string {
  return `
Case Type:
${caseType}

Case Description:
${caseDescription}

User Opening Statement:
${openingStatement}

Generate:
- a short opposing counsel rebuttal
- professional tone
- concise courtroom style
- maximum 120 words
`;
}

/**
 * Builds the user-turn prompt that asks the AI to play the judge.
 * Target length: ≤ 60 words in the AI response (one focused question).
 */
export function buildJudgeQuestionPrompt(
  caseType: string,
  caseDescription: string,
  openingStatement: string
): string {
  return `
Case Type:
${caseType}

Case Description:
${caseDescription}

Opening Statement:
${openingStatement}

Generate:
- one short judicial clarification question
- focus on missing evidence, inconsistency, or factual clarification
- maximum 60 words
`;
}

/**
 * Builds the user-turn prompt that asks the AI to evaluate the argument.
 * The AI response will be parsed into the SimulationResponse.feedback shape.
 */
export function buildEvaluationPrompt(
  openingStatement: string,
  opposingCounsel: string
): string {
  return `
Opening Statement:
${openingStatement}

Opposing Counsel Response:
${opposingCounsel}

Evaluate the user's argument.

Return:
- strongest point
- weakest point
- improvement suggestion
- argument score from 0-100

Keep responses concise and professional.
`;
}
