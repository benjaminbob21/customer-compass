import { NextResponse } from "next/server";
import type { AnalyzeResponse } from "@/lib/types";
import { findSimilarIncidents } from "@/lib/findSimilarIncidents";
import { buildPrompt } from "@/lib/prompt";
import { getLlmClient } from "@/lib/llm";

/**
 * POST /api/analyze
 *
 * Body: { "issue": "Customer experiencing intermittent networking failures." }
 * Returns: AnalyzeResponse { similarIncidents, recommendedActions, customerMessage }
 *
 * This is the heart of the backend pipeline:
 *   issue -> find similar incidents -> build prompt -> call LLM -> response
 */
export async function POST(request: Request) {
  // Parse and validate input at the boundary.
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  const issue = (body as { issue?: unknown })?.issue;
  if (typeof issue !== "string" || issue.trim().length === 0) {
    return NextResponse.json(
      { error: "`issue` must be a non-empty string." },
      { status: 400 },
    );
  }
  if (issue.length > 5000) {
    return NextResponse.json(
      { error: "`issue` must be 5000 characters or fewer." },
      { status: 400 },
    );
  }

  // 1. Retrieve similar historical incidents (Vanshika's layer).
  const similarIncidents = findSimilarIncidents(issue);

  // 2. Build the prompt and ask the LLM for a customer-friendly message.
  const prompt = buildPrompt(issue, similarIncidents);
  const llm = getLlmClient();
  const customerMessage = await llm.complete(prompt);

  // 3. Derive recommended actions from the matched incidents' resolutions.
  const recommendedActions = similarIncidents
    .map((incident) => incident.resolution)
    .slice(0, 3);

  const response: AnalyzeResponse = {
    similarIncidents,
    recommendedActions,
    customerMessage,
  };

  return NextResponse.json(response);
}
