import type {
  AuthResponse,
  LoginRequest,
  PendingVerificationResponse,
  RegisterRequest,
  RequestPasswordResetRequest,
  ResendOtpRequest,
  ResetPasswordRequest,
  ResetTokenResponse,
  SuccessResponse,
  VerifyOtpRequest,
} from './auth.types';

export interface IAuthRepository {
  login(request: LoginRequest): Promise<AuthResponse>;
  register(request: RegisterRequest): Promise<PendingVerificationResponse>;
  verifyOtp(
    request: VerifyOtpRequest,
  ): Promise<AuthResponse | ResetTokenResponse>;
  requestPasswordReset(
    request: RequestPasswordResetRequest,
  ): Promise<SuccessResponse>;
  resetPassword(request: ResetPasswordRequest): Promise<SuccessResponse>;
  resendOtp(request: ResendOtpRequest): Promise<SuccessResponse>;
}
