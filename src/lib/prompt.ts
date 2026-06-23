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
    "Given a customer issue and similar past incidents, produce a structured analysis.",
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
    '  "recommendedActions": ["concrete internal step for the engineer", "..."],',
    '  "recommendedInvestigation": ["specific thing to check to confirm the cause", "..."],',
    '  "confidence": "82% similarity",',
    '  "resolutionTimeline": "Historically resolved within 3 steps",',
    '  "emailSubject": "short, specific subject line for the customer email",',
    '  "emailBody": "the customer message formatted as a plain-text email"',
    "}",
    "",
    "Guidance for each field:",
    "- customerMessage: clear, empathetic, jargon-free, honest and reassuring.",
    "- recommendedActions: 3-5 forward-looking next steps the engineer should take",
    '  (e.g. "Check route configuration") — not the customer message, not a copy of past resolutions.',
    "- recommendedInvestigation: ALWAYS provide 3-5 concrete diagnostics to confirm the likely root cause. Never return an empty list.",
    '- confidence: a real percentage YOU choose based on how closely the past incidents match, e.g. "78% similarity". Never output the literal "NN".',
    '- resolutionTimeline: a short phrase with a real number, e.g. "Historically resolved within 3 steps".',
    "  Estimate confidence and resolutionTimeline from the incidents provided; never leave them blank or use placeholders.",
    "- emailSubject: a concise, customer-ready subject line (no markdown, no quotes).",
    "- emailBody: the customerMessage adapted into a plain-text email. Start with a greeting and end with a sign-off.",
    "  Use plain text only: no markdown, no asterisks, no code fences, no JSON. Use real line breaks between paragraphs.",
  ].join("\n");
}
