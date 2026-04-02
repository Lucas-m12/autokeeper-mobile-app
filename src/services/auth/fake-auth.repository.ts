import type { IAuthRepository } from './auth.repository';
import type {
  AuthResponse,
  AuthToken,
  LoginRequest,
  PendingVerificationResponse,
  RegisterRequest,
  RequestPasswordResetRequest,
  ResendOtpRequest,
  ResetPasswordRequest,
  ResetTokenResponse,
  SuccessResponse,
  User,
  VerifyOtpRequest,
} from './auth.types';
import { AuthError } from './auth.types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const VALID_OTP = '482931';

interface StoredUser {
  name: string;
  phone: string;
  password: string;
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

function generateToken(): AuthToken {
  return {
    accessToken: `fake_access_${generateId()}`,
    refreshToken: `fake_refresh_${generateId()}`,
    expiresAt: Date.now() + 3600 * 1000,
  };
}

function toUser(stored: StoredUser): User {
  return {
    id: generateId(),
    name: stored.name,
    phone: stored.phone,
    createdAt: new Date().toISOString(),
  };
}

export class FakeAuthRepository implements IAuthRepository {
  private users: StoredUser[] = [
    { name: 'Lucas', phone: '+5511987654321', password: '12345678' },
  ];

  private otpAttempts = new Map<string, number>();

  async login(request: LoginRequest): Promise<AuthResponse> {
    await delay(800);

    const user = this.users.find((u) => u.phone === request.phone);
    if (!user) {
      throw new AuthError('PHONE_NOT_FOUND', 'Phone number not found');
    }

    if (user.password !== request.password) {
      throw new AuthError('INVALID_CREDENTIALS', 'Invalid credentials');
    }

    return { token: generateToken(), user: toUser(user) };
  }

  async register(
    request: RegisterRequest,
  ): Promise<PendingVerificationResponse> {
    await delay(1000);

    const exists = this.users.some((u) => u.phone === request.phone);
    if (exists) {
      throw new AuthError('PHONE_EXISTS', 'Phone number already registered');
    }

    this.users.push({
      name: request.name,
      phone: request.phone,
      password: request.password,
    });

    return { pendingVerification: true, phone: request.phone };
  }

  async verifyOtp(
    request: VerifyOtpRequest,
  ): Promise<AuthResponse | ResetTokenResponse> {
    await delay(600);

    const attempts = this.otpAttempts.get(request.phone) ?? 0;

    if (attempts >= 3) {
      throw new AuthError('OTP_MAX_ATTEMPTS', 'Maximum OTP attempts reached');
    }

    if (request.code !== VALID_OTP) {
      this.otpAttempts.set(request.phone, attempts + 1);
      throw new AuthError('OTP_INVALID', 'Invalid OTP code');
    }

    this.otpAttempts.delete(request.phone);

    if (request.flow === 'register') {
      const user = this.users.find((u) => u.phone === request.phone);
      return { token: generateToken(), user: toUser(user!) };
    }

    return { resetToken: generateId() };
  }

  async requestPasswordReset(
    request: RequestPasswordResetRequest,
  ): Promise<SuccessResponse> {
    await delay(700);

    const exists = this.users.some((u) => u.phone === request.phone);
    if (!exists) {
      throw new AuthError('PHONE_NOT_FOUND', 'Phone number not found');
    }

    return { success: true };
  }

  async resetPassword(
    _request: ResetPasswordRequest,
  ): Promise<SuccessResponse> {
    await delay(800);
    return { success: true };
  }

  async resendOtp(request: ResendOtpRequest): Promise<SuccessResponse> {
    await delay(500);
    this.otpAttempts.delete(request.phone);
    return { success: true };
  }
}
