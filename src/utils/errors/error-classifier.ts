/**
 * Error Classifier for AutoKeeper
 *
 * Analyzes errors and classifies them into structured categories
 * with user-friendly Portuguese messages.
 */

import { ClassifiedError, ErrorCategory, ErrorContext } from './error-types';
import { getErrorMessage } from './error-messages';

/**
 * Extract error message from various error types
 */
function extractErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }

  return 'Unknown error';
}

/**
 * Extract HTTP status code from error if available
 */
function extractStatusCode(error: unknown): number | undefined {
  // Check if error object has status property
  if (error && typeof error === 'object') {
    if ('status' in error && typeof error.status === 'number') {
      return error.status;
    }

    // Check for status in nested error objects
    if ('error' in error && error.error && typeof error.error === 'object') {
      if ('status' in error.error && typeof error.error.status === 'number') {
        return error.error.status;
      }
    }
  }

  // Try to extract status code from error message
  const message = extractErrorMessage(error);
  const statusMatch = message.match(/\b(4\d{2}|5\d{2})\b/);
  if (statusMatch) {
    return parseInt(statusMatch[1], 10);
  }

  return undefined;
}

/**
 * Detect if error is a network connectivity error
 */
function isNetworkError(message: string): boolean {
  const networkKeywords = [
    'fetch',
    'network',
    'failed to fetch',
    'networkerror',
    'connection',
    'timeout',
    'econnrefused',
    'enotfound',
    'offline',
    'no internet',
  ];

  const lowerMessage = message.toLowerCase();
  return networkKeywords.some((keyword) => lowerMessage.includes(keyword));
}

/**
 * Detect if error is a server error (5xx)
 */
function isServerError(statusCode: number | undefined, message: string): boolean {
  // Check status code
  if (statusCode && statusCode >= 500 && statusCode < 600) {
    return true;
  }

  // Check error message for server error indicators
  const serverKeywords = [
    '500',
    '502',
    '503',
    '504',
    'internal server error',
    'bad gateway',
    'service unavailable',
    'gateway timeout',
  ];

  const lowerMessage = message.toLowerCase();
  return serverKeywords.some((keyword) => lowerMessage.includes(keyword));
}

/**
 * Detect if error is an authentication/authorization error
 */
function isAuthError(statusCode: number | undefined, message: string): boolean {
  // Check status code
  if (statusCode) {
    // 401 Unauthorized, 403 Forbidden, 409 Conflict (duplicate email), 422 Validation
    if ([401, 403, 409, 422].includes(statusCode)) {
      return true;
    }
  }

  // Check error message for auth error indicators
  const authKeywords = [
    'unauthorized',
    'authentication',
    'invalid credentials',
    'invalid email',
    'invalid password',
    'wrong password',
    'incorrect password',
    'user not found',
    'account not found',
    'forbidden',
    'access denied',
    'already exists',
    'already registered',
    'duplicate',
  ];

  const lowerMessage = message.toLowerCase();
  return authKeywords.some((keyword) => lowerMessage.includes(keyword));
}

/**
 * Determine error category based on error analysis
 */
function determineCategory(
  statusCode: number | undefined,
  message: string
): ErrorCategory {
  // Order matters: check most specific first

  // 1. Network errors (connection issues)
  if (isNetworkError(message)) {
    return ErrorCategory.NETWORK;
  }

  // 2. Server errors (5xx)
  if (isServerError(statusCode, message)) {
    return ErrorCategory.SERVER;
  }

  // 3. Auth/Client errors (4xx, auth failures)
  if (isAuthError(statusCode, message)) {
    return ErrorCategory.AUTH;
  }

  // 4. Default to unknown
  return ErrorCategory.UNKNOWN;
}

/**
 * Determine if the error is retryable
 */
function isRetryable(category: ErrorCategory): boolean {
  // Network and server errors are typically retryable
  return category === ErrorCategory.NETWORK || category === ErrorCategory.SERVER;
}

/**
 * Classify an error into a structured error object
 *
 * @param error - The error to classify (can be Error, string, or unknown)
 * @param context - The context where the error occurred (login, signup, etc.)
 * @returns A classified error with user-friendly messages
 *
 * @example
 * ```typescript
 * try {
 *   await signIn.email({ email, password });
 * } catch (error) {
 *   const classified = classifyError(error, 'login');
 *   showAlert({
 *     type: 'error',
 *     title: classified.title,
 *     message: classified.message,
 *   });
 * }
 * ```
 */
export function classifyError(
  error: unknown,
  context: ErrorContext = 'generic'
): ClassifiedError {
  // Extract error information
  const message = extractErrorMessage(error);
  const statusCode = extractStatusCode(error);

  // Determine error category
  const category = determineCategory(statusCode, message);

  // Get user-friendly messages
  const { title, message: userMessage } = getErrorMessage(category, context);

  // Build classified error
  return {
    category,
    code: statusCode,
    title,
    message: userMessage,
    originalError: error,
    retryable: isRetryable(category),
  };
}
