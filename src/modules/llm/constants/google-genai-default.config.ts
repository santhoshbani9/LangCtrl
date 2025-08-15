import { LLMConfig } from '../interfaces';

/**
 * Default configuration for Google GenAI LLM providers.
 *
 * This object provides conservative defaults used when the Google GenAI
 * provider is selected. The values aim for deterministic, reliable responses
 * suitable for chat assistants and automated tasks.
 *
 * Fields:
 *  - temperature: number (0-1). Controls randomness. 0 => deterministic.
 *  - maxRetries: number. How many times to retry transient failures.
 *  - maxConcurrency: number. Max concurrent requests to the model.
 *
 * Example popular/latest model names (examples only — verify with the
 * provider before use):
 *  - 'gemini-2.0-flash'        (high-performance, short responses)
 *  - 'gemini-2.0-flash-lite'   (lower-cost, faster variant)
 *  - 'gemini-1.5-flash'        (stable general-purpose model)
 *
 * Note: model availability and exact names change; consult Google GenAI
 * documentation or the API when selecting a model.
 */

export const GOOGLE_GENAI_DEFAULT_CONFIG: LLMConfig = {
  temperature: 0,
  maxRetries: 6,
  maxConcurrency: 2,
} as const;
