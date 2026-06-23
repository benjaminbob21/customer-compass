import type { LlmClient } from "./client";
import { MockLlmClient } from "./mockClient";
import { AzureOpenAiClient } from "./azureClient";

/**
 * Returns the active LLM client.
 *
 * If Azure AI Foundry credentials are present in the environment, use the real
 * model. Otherwise fall back to the mock so the app always runs (no keys, no
 * problem). This factory is the ONE place that decides which client is used.
 */
export function getLlmClient(): LlmClient {
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
  const apiKey = process.env.AZURE_OPENAI_API_KEY;
  const model = process.env.AZURE_OPENAI_DEPLOYMENT;

  if (endpoint && apiKey && model) {
    return new AzureOpenAiClient(normalizeBaseUrl(endpoint), apiKey, model);
  }

  return new MockLlmClient();
}

/**
 * The OpenAI SDK needs a base URL ending in `/openai/v1` for the Foundry v1 API.
 * Accept the endpoint with or without that suffix so a small paste mistake
 * doesn't silently fall back to the mock.
 */
function normalizeBaseUrl(endpoint: string): string {
  const trimmed = endpoint.trim().replace(/\/+$/, "");
  return trimmed.endsWith("/openai/v1") ? trimmed : `${trimmed}/openai/v1`;
}

export type { LlmClient } from "./client";
