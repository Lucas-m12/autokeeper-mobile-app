/**
 * Error Handling Utilities - Public API
 *
 * Centralized error handling for the AutoKeeper application.
 * Provides structured error classification with Portuguese user messages.
 */

// Export the main classifier function
export { classifyError } from './error-classifier';

// Export types for consumers
export type { ClassifiedError, ErrorContext } from './error-types';
export { ErrorCategory } from './error-types';
