/**
 * API client helper
 * 
 * This file contains functions that call our backend API.
 * Think of this as a "messenger" between frontend and backend.
 */

// The request/response shapes come from the shared backend contract
// so the frontend and backend can never drift apart.
import type { AnalyzeRequest, AnalyzeResponse } from "@/lib/types";

/**
 * Call the backend /api/analyze endpoint
 * 
 * @param issue - The customer issue description
 * @returns The analysis response from the backend
 */
export async function analyzeIssue(
  issue: string
): Promise<AnalyzeResponse> {
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ issue } as AnalyzeRequest),
  });

  if (!response.ok) {
    throw new Error("Failed to analyze issue");
  }

  return response.json() as Promise<AnalyzeResponse>;
}
