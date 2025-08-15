export interface LLMConfig {
  model?: string;
  apiKey?: string;
  baseURL?: string;
  temperature?: number;
  maxRetries?: number;
  maxConcurrency?: number;
}
