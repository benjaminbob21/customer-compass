import OpenAI from "openai";
import type { LlmClient } from "./client";

/**
 * Real LLM client backed by Azure AI Foundry's OpenAI-compatible v1 endpoint.
 *
 * Mirrors the Foundry sample: a plain OpenAI client pointed at the `/openai/v1`
 * base URL, using the deployment name as `model`. No api-version needed.
 */
export class AzureOpenAiClient implements LlmClient {
  private readonly client: OpenAI;
  private readonly model: string;

  constructor(baseURL: string, apiKey: string, model: string) {
    this.client = new OpenAI({ baseURL, apiKey });
    this.model = model;
  }

  async complete(prompt: string): Promise<string> {
    const response = await this.client.responses.create({
      model: this.model,
      input: prompt,
      // Force valid JSON output so the parser never receives malformed syntax
      // (e.g. a missing comma) and degrade into the text fallback.
      text: { format: { type: "json_object" } },
    });
    return response.output_text ?? "";
  }
}
