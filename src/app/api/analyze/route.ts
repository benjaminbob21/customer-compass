import { NextResponse } from "next/server";
import type { AnalyzeResponse } from "@/lib/types";
import { findSimilarIncidents } from "@/lib/findSimilarIncidents";
import { generateGuidance } from "@/lib/generateGuidance";

// POST /api/analyze
// Body: { issue: string } -> AnalyzeResponse
export async function POST(request: Request) {
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

  // 1. Retrieve similar historical incidents.
  const similarIncidents = findSimilarIncidents(issue);

  // 2. Ask the LLM for a customer-friendly message + next-best actions.
  const {
    customerMessage,
    recommendedActions,
    recommendedInvestigation,
    confidence,
    resolutionTimeline,
  } = await generateGuidance(issue, similarIncidents);

  const response: AnalyzeResponse = {
    similarIncidents,
    recommendedActions,
    customerMessage,
    recommendedInvestigation,
    confidence,
    resolutionTimeline,
  };

  return NextResponse.json(response);
}
