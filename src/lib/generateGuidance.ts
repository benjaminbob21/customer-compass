import type { Incident } from "./types";
import { buildPrompt } from "./prompt";
import { getLlmClient } from "./llm";
import { MockLlmClient } from "./llm/mockClient";

export interface ParsedGuidance {
  customerMessage: string;
  recommendedActions: string[];
  recommendedInvestigation: string[];
  confidence: string;
  resolutionTimeline: string;
  emailSubject: string;
  emailBody: string;
}

export interface Guidance extends ParsedGuidance {
  /** Whether the guidance came from real Azure AI or the mock fallback. */
  source: "ai" | "mock";
}

/**
 * Asks the LLM for a customer-friendly message AND next-best engineer actions
 * in a single call, then parses the structured JSON response defensively.
 */
export async function generateGuidance(
  issue: string,
  incidents: Incident[],
): Promise<Guidance> {
  const client = getLlmClient();
  const prompt = buildPrompt(issue, incidents);

  try {
    const raw = await client.complete(prompt);
    return { ...parseGuidance(raw), source: client.source };
  } catch (err) {
    // The real model failed (timeout, auth, rate limit, outage). Rather than
    // 500 the user, degrade to the mock so they still get useful guidance.
    if (client.source !== "mock") {
      console.error("[guidance] LLM call failed, falling back to mock", err);
      const fallback = new MockLlmClient();
      const raw = await fallback.complete();
      return { ...parseGuidance(raw), source: "mock" };
    }
    throw err;
  }
}

/**
 * Parses the model's JSON. Models sometimes wrap JSON in ```code fences``` or add
 * stray prose, so we strip fences and fall back to treating the whole response
 * as the customer message if parsing fails — the endpoint never hard-errors.
 */
function parseGuidance(raw: string): ParsedGuidance {
  const cleaned = stripCodeFences(raw).trim();

  try {
    const parsed = JSON.parse(cleaned) as Partial<ParsedGuidance>;
    const customerMessage =
      typeof parsed.customerMessage === "string" ? parsed.customerMessage : "";

    if (customerMessage) {
      const safeMessage = toEmailSafe(customerMessage);
      const emailBody =
        typeof parsed.emailBody === "string" && parsed.emailBody.trim()
          ? toEmailSafe(parsed.emailBody)
          : safeMessage;
      return {
        customerMessage: safeMessage,
        recommendedActions: toStringArray(parsed.recommendedActions),
        recommendedInvestigation: toStringArray(parsed.recommendedInvestigation),
        confidence:
          typeof parsed.confidence === "string" ? parsed.confidence : "",
        resolutionTimeline:
          typeof parsed.resolutionTimeline === "string"
            ? parsed.resolutionTimeline
            : "",
        emailSubject:
          typeof parsed.emailSubject === "string" && parsed.emailSubject.trim()
            ? parsed.emailSubject.trim()
            : "Update on your support issue",
        emailBody,
      };
    }
  } catch {
    // Not valid JSON — fall through to the text fallback below.
  }

  const safeText = toEmailSafe(cleaned);
  return {
    customerMessage: safeText,
    recommendedActions: [],
    recommendedInvestigation: [],
    confidence: "",
    resolutionTimeline: "",
    emailSubject: "Update on your support issue",
    emailBody: safeText,
  };
}

/** Keep only the string entries of an unknown value, else an empty array. */
function toStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

/**
 * Strips markdown / JSON artifacts so text pastes cleanly into an email client:
 * removes bold/italic/code markers and headings, and collapses extra blank lines.
 */
function toEmailSafe(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[*_`#>]+/g, "")
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Strips a ```json ... ``` or ``` ... ``` wrapper if the model added one. */
function stripCodeFences(text: string): string {
  const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  return match ? match[1] : text;
}
