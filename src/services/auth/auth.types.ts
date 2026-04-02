export interface User {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export type OtpFlow = 'register' | 'forgot-password';

export interface LoginRequest {
  phone: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  phone: string;
  password: string;
}

export interface VerifyOtpRequest {
  phone: string;
  code: string;
  flow: OtpFlow;
}

export interface RequestPasswordResetRequest {
  phone: string;
}

export interface ResetPasswordRequest {
  resetToken: string;
  newPassword: string;
}

export interface ResendOtpRequest {
  phone: string;
  flow: OtpFlow;
}

export interface AuthResponse {
  token: AuthToken;
  user: User;
}

export interface PendingVerificationResponse {
  pendingVerification: true;
  phone: string;
}

export interface ResetTokenResponse {
  resetToken: string;
}

export interface SuccessResponse {
  success: true;
}

export class AuthError extends Error {
  constructor(
    public code: string,
    message: string,
  ) {
    super(message);
    this.name = 'AuthError';
  }
}
