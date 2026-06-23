import type { Incident } from "./types";

/**
 * Turns a customer issue + matched historical incidents into a single prompt
 * string for the LLM. This is where the "customer trust" tone is enforced.
 *
 * Iterate freely here — prompt quality is most of the AI value.
 */
export function buildPrompt(issue: string, incidents: Incident[]): string {
  const incidentBlock =
    incidents.length > 0
      ? incidents
          .map(
            (inc, i) =>
              `Incident ${i + 1}: ${inc.title}\n` +
              `  Summary: ${inc.summary}\n` +
              `  Root cause: ${inc.rootCause}\n` +
              `  Resolution: ${inc.resolution}`,
          )
          .join("\n\n")
      : "No closely matching historical incidents were found.";

  return [
    "You are Customer Compass, an AI assistant for Microsoft support engineers.",
    "Given a customer issue and similar past incidents, produce two things:",
    "  1. A clear, empathetic, customer-friendly explanation (avoid jargon, be honest and reassuring).",
    "  2. Concrete next-best actions for the SUPPORT ENGINEER to take internally.",
    "",
    "CUSTOMER ISSUE:",
    issue.trim(),
    "",
    "RELEVANT HISTORICAL INCIDENTS:",
    incidentBlock,
    "",
    "Respond with ONLY a JSON object, no markdown, no extra text, in exactly this shape:",
    "{",
    '  "customerMessage": "3-5 short paragraphs written TO the customer",',
    '  "recommendedActions": ["concrete internal step for the engineer", "..."]',
    "}",
    "",
    "recommendedActions must be 3-5 forward-looking next steps the engineer should take",
    '(e.g. "Check route configuration", "Verify service dependencies") — not the customer',
    "message, and not a copy of past resolutions.",
  ].join("\n");
}
