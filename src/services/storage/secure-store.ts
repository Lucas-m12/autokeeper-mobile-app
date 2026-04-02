import { Platform } from 'react-native';
import type { AuthToken } from '@/services/auth/auth.types';

const KEYS = {
  accessToken: 'autokeeper_access_token',
  refreshToken: 'autokeeper_refresh_token',
  expiresAt: 'autokeeper_token_expires',
} as const;

export interface ISecureStorage {
  getToken(): Promise<AuthToken | null>;
  setToken(token: AuthToken): Promise<void>;
  clearToken(): Promise<void>;
}

class NativeSecureStorage implements ISecureStorage {
  private store: typeof import('expo-secure-store') | null = null;

  private async getStore() {
    if (!this.store) {
      this.store = await import('expo-secure-store');
    }
    return this.store;
  }

  async getToken(): Promise<AuthToken | null> {
    const store = await this.getStore();
    const [accessToken, refreshToken, expiresAt] = await Promise.all([
      store.getItemAsync(KEYS.accessToken),
      store.getItemAsync(KEYS.refreshToken),
      store.getItemAsync(KEYS.expiresAt),
    ]);

    if (!accessToken || !refreshToken || !expiresAt) return null;

    return {
      accessToken,
      refreshToken,
      expiresAt: Number(expiresAt),
    };
  }

  async setToken(token: AuthToken): Promise<void> {
    const store = await this.getStore();
    await Promise.all([
      store.setItemAsync(KEYS.accessToken, token.accessToken),
      store.setItemAsync(KEYS.refreshToken, token.refreshToken),
      store.setItemAsync(KEYS.expiresAt, String(token.expiresAt)),
    ]);
  }

  async clearToken(): Promise<void> {
    const store = await this.getStore();
    await Promise.all([
      store.deleteItemAsync(KEYS.accessToken),
      store.deleteItemAsync(KEYS.refreshToken),
      store.deleteItemAsync(KEYS.expiresAt),
    ]);
  }
}

class InMemorySecureStorage implements ISecureStorage {
  private token: AuthToken | null = null;

  async getToken(): Promise<AuthToken | null> {
    return this.token;
  }

  async setToken(token: AuthToken): Promise<void> {
    this.token = token;
  }

  async clearToken(): Promise<void> {
    this.token = null;
  }
}

export const secureStorage: ISecureStorage =
  Platform.OS === 'web' ? new InMemorySecureStorage() : new NativeSecureStorage();
