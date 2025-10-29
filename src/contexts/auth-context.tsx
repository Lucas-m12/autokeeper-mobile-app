import { authClient } from '@/lib/auth-client';
import React, { createContext, ReactNode, useContext } from 'react';

/**
 * Auth Context for AutoKeeper
 *
 * Provides authentication state and methods throughout the app.
 * Wraps better-auth's useSession hook and auth methods.
 */

interface AuthContextType {
  // Session data from better-auth
  session: ReturnType<typeof authClient.useSession>['data'];

  // Loading state
  isPending: boolean;

  // Error state
  error: Error | null;

  // Authentication methods
  signIn: {
    email: (data: { email: string; password: string }) => Promise<void>;
    social: (data: { provider: string; callbackURL?: string }) => Promise<void>;
  };
  signUp: {
    email: (data: { email: string; password: string; name?: string }) => Promise<void>;
  };
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider component
 *
 * Wrap your app with this provider to enable authentication throughout.
 * Should be added to the root layout (_layout.tsx).
 */
export function AuthProvider({ children }: AuthProviderProps) {
  // Use better-auth's session hook
  const { data: session, isPending, error } = authClient.useSession();

  const contextValue: AuthContextType = {
    session,
    isPending,
    error,
    signIn: {
      email: async (data) => {
        const response = await authClient.signIn.email({
          email: data.email,
          password: data.password,
        });

        if (response.error) {
          throw new Error(response.error.message || 'Authentication failed');
        }
      },
      social: async (data) => {
        const response = await authClient.signIn.social({
          provider: data.provider,
          callbackURL: data.callbackURL || '/home',
        });

        if (response.error) {
          throw new Error(response.error.message || 'Social authentication failed');
        }
      },
    },
    signUp: {
      email: async (data) => {
        const response = await authClient.signUp.email({
          email: data.email,
          password: data.password,
          name: data.name || '',
        });

        if (response.error) {
          throw new Error(response.error.message || 'Sign up failed');
        }
      },
    },
    signOut: async () => {
      const response = await authClient.signOut();

      if (response.error) {
        throw new Error(response.error.message || 'Sign out failed');
      }
    },
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth hook
 *
 * Access authentication state and methods from any component.
 *
 * @example
 * const { session, signIn, signOut } = useAuth();
 *
 * if (session) {
 *   // User is authenticated
 * }
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
