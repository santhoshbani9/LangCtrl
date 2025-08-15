import { LLMConfig } from '../interfaces';

/**
 * Default configuration for Ollama-based local models.
 *
 * These defaults are conservative for local inference (lower temperature,
 * moderate retry count). Use a higher temperature for creative generation.
 *
 * Fields:
 *  - temperature: number (0-1). Lower values produce deterministic output.
 *  - maxRetries: number. How many times to retry transient failures.
 *  - maxConcurrency: number. Max concurrent model invocations.
 *
 * Example/local model names frequently used with Ollama (verify locally):
 *  - 'llama2-13b'            (Llama 2 family, 13B weights)
 *  - 'llama2-70b'            (Larger model for higher quality)
 *  - 'vicuna-13b'            (Fine-tuned instruction-following variant)
 *  - 'alpaca-native-7b'      (Smaller, fast local model)
 *
 * Note: Ollama runs models locally or from a local registry — names vary by
 * what you've pulled. Always run `ollama list` to see installed models.
 */

export const DEFAULT_OLLAMA_CONFIG: LLMConfig = {
  temperature: 0,
  maxRetries: 5,
  maxConcurrency: 2,
} as const;
