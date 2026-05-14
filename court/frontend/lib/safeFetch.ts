/**
 * Timeout-safe fetch wrapper with structured error handling.
 * Uses AbortController to enforce configurable timeouts.
 */

import { createApiError } from './apiError';

export interface SafeFetchOptions extends RequestInit {
  timeoutMs?: number;
}

export interface SafeFetchResult {
  ok: boolean;
  data: unknown | null;
  error: ReturnType<typeof createApiError> | null;
  status: number;
}

const DEFAULT_TIMEOUT = 10_000; // 10 seconds

/**
 * Fetch with timeout and structured error handling.
 * Returns a standardised result object — never throws.
 */
export async function safeFetch(
  url: string,
  options?: SafeFetchOptions
): Promise<SafeFetchResult> {
  const timeout = options?.timeoutMs ?? DEFAULT_TIMEOUT;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const fetchOptions: RequestInit = {
    ...options,
    signal: controller.signal,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  };

  try {
    const response = await fetch(url, fetchOptions);
    clearTimeout(timeoutId);

    let data: unknown = null;
    const contentType = response.headers.get('content-type');

    // Attempt to parse JSON if the content-type suggests it
    if (contentType?.includes('application/json')) {
      try {
        data = await response.json();
      } catch {
        const raw = await response.text();
        // Return parse error
        return {
          ok: false,
          data: null,
          error: createApiError(response, new SyntaxError('Invalid JSON'), url),
          status: response.status,
        };
      }
    }

    if (!response.ok) {
      return {
        ok: false,
        data: data ?? null,
        error: createApiError(response, new Error(`HTTP ${response.status}`), url),
        status: response.status,
      };
    }

    return {
      ok: true,
      data,
      error: null,
      status: response.status,
    };
  } catch (error) {
    clearTimeout(timeoutId);

    const apiError = createApiError(null, error, url);
    return {
      ok: false,
      data: null,
      error: apiError,
      status: 0,
    };
  }
}