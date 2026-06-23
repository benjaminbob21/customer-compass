import type { LlmClient } from "./client";

/**
 * A fake LLM that returns a polished, customer-friendly message without calling
 * any external service. Lets the whole team build and demo the flow today with
 * zero API keys. The real client will replace this and actually use the prompt.
 */
export class MockLlmClient implements LlmClient {
  async complete(_prompt: string): Promise<string> {
    // Simulate a tiny bit of latency so the UI's loading state is visible.
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Returns the same JSON shape the real model is asked to produce, so the
    // rest of the pipeline parses mock and real responses identically.
    const customerMessage = [
      "Thanks for reaching out, and I'm sorry for the disruption this has caused.",
      "",
      "Here's what's happening in plain terms: we've seen this pattern before, and it's typically caused by a transient issue in the affected service rather than anything on your side. The good news is that there is a well-understood path to resolution.",
      "",
      "We'll keep you updated at each step so you always know what to expect. Thank you for your patience.",
    ].join("\n");

    return JSON.stringify({
      customerMessage,
      recommendedActions: [
        "Confirm the affected component against the customer's recent activity.",
        "Apply the mitigation that resolved similar past incidents.",
        "Monitor for recurrence before closing the case.",
      ],
      recommendedInvestigation: [
        "Check recent configuration or deployment changes on the affected resource.",
        "Review service health and dependency status in the impacted region.",
        "Correlate the customer's error timestamps with known incident windows.",
      ],
      confidence: "83% similarity",
      resolutionTimeline: "Historically resolved within 3 steps",
    });
  }
}
