/**
 * Environment Configuration
 *
 * This file centralizes all environment variables used in the app.
 * Variables prefixed with EXPO_PUBLIC_ are accessible in the client.
 *
 * To use:
 * 1. Copy .env.example to .env
 * 2. Update .env with your values
 * 3. Restart the Expo dev server after changing .env
 */

/**
 * Backend API base URL
 *
 * Development: http://localhost:3000
 * Production: https://api.autokeeper.com
 *
 * Make sure to update this in your .env file
 */
export const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

/**
 * Validates that required environment variables are set
 * Call this early in the app lifecycle to catch configuration errors
 */
export function validateEnv() {
  if (!API_URL) {
    console.warn(
      '⚠️  EXPO_PUBLIC_API_URL is not set. Using default: http://localhost:3000'
    );
  }

  // Log current configuration in development
  if (__DEV__) {
    console.log('📦 Environment Configuration:');
    console.log('  API_URL:', API_URL);
  }
}

/**
 * Check if running in development mode
 */
export const isDevelopment = __DEV__;

/**
 * Check if running in production mode
 */
export const isProduction = !__DEV__;

export default {
  API_URL,
  isDevelopment,
  isProduction,
};
