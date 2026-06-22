/**
 * LLM client abstraction.
 *
 * Everything in the app talks to an LLM through this interface, so we can swap
 * a mock (today, no API key needed) for a real provider (Azure OpenAI, etc.)
 * later without touching the route or prompt code.
 */
export interface LlmClient {
  /** Send a prompt, get back the model's text completion. */
  complete(prompt: string): Promise<string>;
}
