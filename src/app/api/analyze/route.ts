import { NextResponse } from "next/server";
import type { AnalyzeResponse } from "@/lib/types";
import { findSimilarIncidents } from "@/lib/findSimilarIncidents";
import { generateGuidance } from "@/lib/generateGuidance";

// The OpenAI SDK needs the Node.js runtime (not Edge).
export const runtime = "nodejs";
// Cap serverless execution so a slow upstream can't hold the function open.
export const maxDuration = 30;

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
  //    generateGuidance degrades to the mock on any upstream failure, so this
  //    only throws on a truly unexpected error.
  let guidance;
  try {
    guidance = await generateGuidance(issue, similarIncidents);
  } catch (err) {
    console.error("[analyze] guidance generation failed", err);
    return NextResponse.json(
      { error: "Unable to analyze the issue right now. Please try again." },
      { status: 502 },
    );
  }

  const {
    customerMessage,
    recommendedActions,
    recommendedInvestigation,
    confidence,
    resolutionTimeline,
    emailSubject,
    emailBody,
    source,
  } = guidance;

  if (source === "mock") {
    console.warn(
      "[analyze] Mock LLM mode is active — Azure OpenAI credentials are not configured.",
    );
  }

  const response: AnalyzeResponse = {
    similarIncidents,
    recommendedActions,
    customerMessage,
    recommendedInvestigation,
    confidence,
    resolutionTimeline,
    emailSubject,
    emailBody,
    source,
  };

  return NextResponse.json(response);
}
