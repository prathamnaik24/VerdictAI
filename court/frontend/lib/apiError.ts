/**
 * Categorised API error with safe user-facing messages.
 * Stack traces are never exposed to the UI.
 */

export type ApiErrorCode =
  | 'network'
  | 'timeout'
  | 'server'
  | 'client'
  | 'parse'
  | 'validation'
  | 'unknown';

export interface ApiErrorDetails {
  code: ApiErrorCode;
  message: string;       // Developer-safe message (may be logged)
  userMessage: string;   // User-safe, non-technical message
  status?: number;
  isRetryable: boolean;
}

const USER_MESSAGES: Record<ApiErrorCode, string> = {
  network:
    'Unable to connect to the server. Please check your internet connection and try again.',
  timeout:
    'The request is taking longer than expected. Please try again — the system may be temporarily busy.',
  server:
    'The server is experiencing a delay. Please try again shortly.',
  client:
    'There was an issue processing your request. Please review your input and try again.',
  parse:
    'We received an unexpected response from the server. Please try again.',
  validation:
    'Some details in your request need attention. Please review and try again.',
  unknown:
    'Something went wrong on our end. Please try again, and contact support if the issue persists.',
};

/**
 * Parse a fetch Response into a structured ApiError.
 * Never leaks internal details to the user.
 */
export function createApiError(
  response: Response | null,
  error: unknown,
  context?: string
): ApiErrorDetails {
  // Network-level error (no response at all)
  if (error instanceof DOMException && error.name === 'AbortError') {
    return {
      code: 'timeout',
      message: `Request timed out${context ? `: ${context}` : ''}`,
      userMessage: USER_MESSAGES.timeout,
      isRetryable: true,
    };
  }

  if (error instanceof TypeError && error.message?.includes('fetch')) {
    return {
      code: 'network',
      message: `Network error${context ? `: ${context}` : ''}`,
      userMessage: USER_MESSAGES.network,
      isRetryable: true,
    };
  }

  // We have a response — inspect status code
  if (response) {
    const status = response.status;

    if (status >= 500) {
      return {
        code: 'server',
        message: `Server error ${status}${context ? `: ${context}` : ''}`,
        userMessage: USER_MESSAGES.server,
        isRetryable: status !== 500, // 500 may be transient; retryable
      };
    }

    if (status >= 400 && status < 500) {
      // Try to parse structured error from the body (without leaking it)
      return {
        code: status === 400 ? 'validation' : 'client',
        message: `Client error ${status}${context ? `: ${context}` : ''}`,
        userMessage:
          status === 400
            ? USER_MESSAGES.validation
            : USER_MESSAGES.client,
        isRetryable: status === 429, // rate-limit is retryable
        status,
      };
    }
  }

  // Fallback
  return {
    code: 'unknown',
    message: `Unknown error${context ? `: ${context}` : ''}`,
    userMessage: USER_MESSAGES.unknown,
    isRetryable: true,
  };
}

/**
 * Format an ApiError for display in the ErrorState component.
 * Returns a title + message pair appropriate for the severity.
 */
export function formatErrorForUI(error: ApiErrorDetails): {
  title: string;
  message: string;
  variant: 'warning' | 'error' | 'info';
} {
  switch (error.code) {
    case 'timeout':
      return {
        title: 'Request timed out',
        message: error.userMessage,
        variant: 'warning',
      };
    case 'network':
      return {
        title: 'Connection unavailable',
        message: error.userMessage,
        variant: 'warning',
      };
    case 'server':
      return {
        title: 'Service temporarily unavailable',
        message: error.userMessage,
        variant: 'warning',
      };
    case 'validation':
      return {
        title: 'Review your input',
        message: error.userMessage,
        variant: 'info',
      };
    case 'parse':
    case 'unknown':
      return {
        title: 'Something went wrong',
        message: error.userMessage,
        variant: 'error',
      };
    default:
      return {
        title: 'Unable to complete request',
        message: error.userMessage,
        variant: 'error',
      };
  }
}