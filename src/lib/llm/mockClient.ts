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

    return [
      "Thanks for reaching out, and I'm sorry for the disruption this has caused.",
      "",
      "Here's what's happening in plain terms: we've seen this pattern before, and it's typically caused by a transient issue in the affected service rather than anything on your side. The good news is that there is a well-understood path to resolution.",
      "",
      "What we're doing next:",
      "1. Confirming the affected component against your recent activity.",
      "2. Applying the mitigation that resolved similar past incidents.",
      "3. Monitoring to make sure the fix holds before we close this out.",
      "",
      "We'll keep you updated at each step so you always know what to expect. Thank you for your patience.",
    ].join("\n");
  }
}
