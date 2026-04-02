import { create } from 'zustand';
import type {
  AuthResponse,
  AuthToken,
  OtpFlow,
  PendingVerificationResponse,
  ResetTokenResponse,
  User,
} from '@/services/auth/auth.types';
import type { IAuthRepository } from '@/services/auth/auth.repository';
import { FakeAuthRepository } from '@/services/auth/fake-auth.repository';
import { secureStorage } from '@/services/storage/secure-store';

let repository: IAuthRepository = new FakeAuthRepository();

export function setAuthRepository(repo: IAuthRepository) {
  repository = repo;
}

interface AuthState {
  user: User | null;
  token: AuthToken | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phone: string, password: string) => Promise<void>;
  register: (
    name: string,
    phone: string,
    password: string,
  ) => Promise<PendingVerificationResponse>;
  verifyOtp: (
    phone: string,
    code: string,
    flow: OtpFlow,
  ) => Promise<AuthResponse | ResetTokenResponse>;
  requestPasswordReset: (phone: string) => Promise<void>;
  resetPassword: (resetToken: string, newPassword: string) => Promise<void>;
  resendOtp: (phone: string, flow: OtpFlow) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (phone, password) => {
    set({ isLoading: true });
    try {
      const response = await repository.login({ phone, password });
      await secureStorage.setToken(response.token);
      set({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (name, phone, password) => {
    set({ isLoading: true });
    try {
      return await repository.register({ name, phone, password });
    } finally {
      set({ isLoading: false });
    }
  },

  verifyOtp: async (phone, code, flow) => {
    set({ isLoading: true });
    try {
      const response = await repository.verifyOtp({ phone, code, flow });

      if ('token' in response) {
        await secureStorage.setToken(response.token);
        set({
          user: response.user,
          token: response.token,
          isAuthenticated: true,
        });
      }

      return response;
    } finally {
      set({ isLoading: false });
    }
  },

  requestPasswordReset: async (phone) => {
    set({ isLoading: true });
    try {
      await repository.requestPasswordReset({ phone });
    } finally {
      set({ isLoading: false });
    }
  },

  resetPassword: async (resetToken, newPassword) => {
    set({ isLoading: true });
    try {
      await repository.resetPassword({ resetToken, newPassword });
    } finally {
      set({ isLoading: false });
    }
  },

  resendOtp: async (phone, flow) => {
    set({ isLoading: true });
    try {
      await repository.resendOtp({ phone, flow });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    await secureStorage.clearToken();
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  restoreSession: async () => {
    set({ isLoading: true });
    try {
      const token = await secureStorage.getToken();
      if (token && token.expiresAt > Date.now()) {
        set({ token, isAuthenticated: true });
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));
