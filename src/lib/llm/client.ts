/**
 * LLM client abstraction.
 *
 * Everything in the app talks to an LLM through this interface, so we can swap
 * a mock (today, no API key needed) for a real provider (Azure OpenAI, etc.)
 * later without touching the route or prompt code.
 */
export interface LlmClient {
  /** Whether this client talks to the real model ("ai") or is the mock ("mock"). */
  readonly source: "ai" | "mock";
  /** Send a prompt, get back the model's text completion. */
  complete(prompt: string): Promise<string>;
}
