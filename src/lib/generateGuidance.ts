import type { Incident } from "./types";
import { buildPrompt } from "./prompt";
import { getLlmClient } from "./llm";

export interface Guidance {
  customerMessage: string;
  recommendedActions: string[];
}

/**
 * Asks the LLM for a customer-friendly message AND next-best engineer actions
 * in a single call, then parses the structured JSON response defensively.
 */
export async function generateGuidance(
  issue: string,
  incidents: Incident[],
): Promise<Guidance> {
  const prompt = buildPrompt(issue, incidents);
  const raw = await getLlmClient().complete(prompt);
  return parseGuidance(raw);
}

/**
 * Parses the model's JSON. Models sometimes wrap JSON in ```code fences``` or add
 * stray prose, so we strip fences and fall back to treating the whole response
 * as the customer message if parsing fails — the endpoint never hard-errors.
 */
function parseGuidance(raw: string): Guidance {
  const cleaned = stripCodeFences(raw).trim();

  try {
    const parsed = JSON.parse(cleaned) as Partial<Guidance>;
    const customerMessage =
      typeof parsed.customerMessage === "string" ? parsed.customerMessage : "";
    const recommendedActions = Array.isArray(parsed.recommendedActions)
      ? parsed.recommendedActions.filter(
          (action): action is string => typeof action === "string",
        )
      : [];

    if (customerMessage) {
      return { customerMessage, recommendedActions };
    }
  } catch {
    // Not valid JSON — fall through to the text fallback below.
  }

  return { customerMessage: cleaned, recommendedActions: [] };
}

/** Strips a ```json ... ``` or ``` ... ``` wrapper if the model added one. */
function stripCodeFences(text: string): string {
  const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  return match ? match[1] : text;
}
