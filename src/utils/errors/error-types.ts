/**
 * Error Handling Types for AutoKeeper
 *
 * Defines structured error types and categories for consistent error handling
 * throughout the application.
 */

/**
 * Error categories used to classify different types of errors
 */
export enum ErrorCategory {
  /** Network connectivity issues (fetch failures, timeouts, offline) */
  NETWORK = 'network',

  /** Server errors (5xx status codes) */
  SERVER = 'server',

  /** Authentication and authorization errors (4xx, invalid credentials) */
  AUTH = 'auth',

  /** Validation errors (form validation, data validation) */
  VALIDATION = 'validation',

  /** Unknown or unclassified errors */
  UNKNOWN = 'unknown',
}

/**
 * Error context to provide different messages for different scenarios
 */
export type ErrorContext = 'login' | 'signup' | 'generic';

/**
 * Classified error object returned by the error classifier
 */
export interface ClassifiedError {
  /** The category of the error */
  category: ErrorCategory;

  /** HTTP status code or error code (if available) */
  code?: string | number;

  /** User-friendly error title in Portuguese */
  title: string;

  /** User-friendly error message in Portuguese */
  message: string;

  /** The original error object for debugging */
  originalError: unknown;

  /** Whether the user should retry the action */
  retryable: boolean;
}
