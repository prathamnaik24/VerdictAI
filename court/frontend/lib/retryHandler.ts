/**
 * Retry handler with exponential backoff and jitter.
 * Retries only on retryable errors (network, timeout, rate-limit).
 */

import { safeFetch, type SafeFetchResult } from './safeFetch';
import type { SafeFetchOptions } from './safeFetch';

interface RetryOptions {
  maxAttempts?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
  onRetry?: (attempt: number, error: string) => void;
}

/**
 * Execute a fetch call with automatic retries on transient failures.
 * Uses exponential backoff with full jitter to avoid thundering herd.
 */
export async function fetchWithRetry(
  url: string,
  options?: SafeFetchOptions & RetryOptions
): Promise<SafeFetchResult> {
  // Extract retry-specific options before passing to safeFetch
  const {
    maxAttempts = 2,
    baseDelayMs = 800,
    maxDelayMs = 10_000,
    onRetry,
    timeoutMs,
    ...fetchOptions
  } = options ?? {};

  let lastError: SafeFetchResult['error'] = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const result = await safeFetch(url, { timeoutMs, ...fetchOptions });

    // Success: return immediately
    if (result.ok) return result;

    lastError = result.error;

    // Don't retry non-retryable errors (client errors like 400)
    if (!result.error?.isRetryable) return result;

    // Don't retry on the last attempt
    if (attempt === maxAttempts) break;

    // Calculate backoff: exponential with jitter
    const exponentialDelay = baseDelayMs * Math.pow(2, attempt - 1);
    const jitter = Math.random() * exponentialDelay;
    const delayMs = Math.min(exponentialDelay + jitter, maxDelayMs);

    onRetry?.(attempt, result.error?.userMessage ?? 'Unknown error');

    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }

  return {
    ok: false,
    data: null,
    error: lastError,
    status: lastError?.status ?? 0,
  };
}