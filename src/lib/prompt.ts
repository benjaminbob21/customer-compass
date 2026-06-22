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
    "Your job is to write a clear, empathetic, customer-friendly explanation of a technical issue.",
    "Avoid jargon. Be honest, reassuring, and specific about next steps. Maintain customer trust.",
    "",
    "CUSTOMER ISSUE:",
    issue.trim(),
    "",
    "RELEVANT HISTORICAL INCIDENTS:",
    incidentBlock,
    "",
    "Write a short message (3-5 short paragraphs) the engineer can send to the customer.",
  ].join("\n");
}
