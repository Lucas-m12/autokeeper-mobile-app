import { API_URL } from "@/config/env";
import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

/**
 * Better Auth client configuration for AutoKeeper
 *
 * This client connects to your backend API and manages authentication state,
 * including session persistence using Expo SecureStore.
 *
 * The API URL is configured via environment variables in .env
 * See src/config/env.ts for more details
 */
export const authClient = createAuthClient({
  // Backend API base URL from environment variables
  baseURL: `${API_URL}/auth/`,

  plugins: [
    expoClient({
      // App scheme for deep linking (matches app.json)
      scheme: "autokeeper",

      // Storage prefix for session data in SecureStore
      storagePrefix: "autokeeper",

      // Use Expo SecureStore for secure session persistence
      storage: SecureStore,
    }),
  ],
});

// Export the auth client instance for use throughout the app
export default authClient;
