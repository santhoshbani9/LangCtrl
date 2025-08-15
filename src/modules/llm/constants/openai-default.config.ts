import { LLMConfig } from '../interfaces';

/**
 * Default configuration for OpenAI family models.
 *
 * These defaults favor deterministic responses and moderate resilience to
 * transient API errors.
 *
 * Fields:
 *  - temperature: number (0-1). 0 for deterministic responses.
 *  - maxRetries: number. How many times to retry on transient errors.
 *  - maxConcurrency: number. Max concurrent requests to OpenAI APIs.
 *
 * Example popular/current OpenAI model names (examples only — verify in
 * the OpenAI dashboard or API docs before use):
 *  - 'gpt-4o'          (general-purpose next-gen model)
 *  - 'gpt-4o-mini'     (smaller, lower-cost variant)
 *  - 'gpt-3.5-turbo'   (economical chat model for many tasks)
 *
 * Note: model names and availability change frequently. Use the provider's
 * API to list and validate model names at runtime.
 */

export const DEFAULT_OPENAI_CONFIG: LLMConfig = {
  temperature: 0,
  maxRetries: 5,
  maxConcurrency: 2,
} as const;
