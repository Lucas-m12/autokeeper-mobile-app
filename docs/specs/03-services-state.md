# Epic 3 — Services & State

All services live in `src/services/`. State management in `src/stores/`.

---

## Auth Types (`services/auth/auth.types.ts`)

### Domain Types

```typescript
interface User {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
}

interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

type OtpFlow = 'register' | 'forgot-password';
```

### Request DTOs

```typescript
interface LoginRequest {
  phone: string;       // +55XXXXXXXXXXX format
  password: string;
}

interface RegisterRequest {
  name: string;
  phone: string;
  password: string;
}

interface VerifyOtpRequest {
  phone: string;
  code: string;
  flow: OtpFlow;
}

interface RequestPasswordResetRequest {
  phone: string;
}

interface ResetPasswordRequest {
  resetToken: string;
  newPassword: string;
}

interface ResendOtpRequest {
  phone: string;
  flow: OtpFlow;
}
```

### Response DTOs

```typescript
interface AuthResponse {
  token: AuthToken;
  user: User;
}

interface PendingVerificationResponse {
  pendingVerification: true;
  phone: string;
}

interface ResetTokenResponse {
  resetToken: string;
}

interface SuccessResponse {
  success: true;
}

interface AuthError {
  code: string;
  message: string;
}
```

### Error Codes

| Code | Message (pt-BR) | When |
|------|-----------------|------|
| `PHONE_NOT_FOUND` | "Número não encontrado. Crie uma conta." | Login with unregistered phone |
| `INVALID_CREDENTIALS` | "Senha incorreta. Tente novamente." | Wrong password |
| `PHONE_EXISTS` | "Esse número já está cadastrado. Faça login." | Register with existing phone |
| `OTP_INVALID` | "Código incorreto. Verifique e tente novamente." | Wrong OTP code |
| `OTP_EXPIRED` | "Código expirado. Solicite um novo código." | Expired OTP |
| `OTP_MAX_ATTEMPTS` | "Muitas tentativas. Solicite um novo código." | 3+ wrong attempts |
| `NETWORK_ERROR` | "Sem conexão. Verifique sua internet." | No response |
| `SERVER_ERROR` | "Algo deu errado. Tente novamente." | 500 response |

---

## Auth Repository Interface (`services/auth/auth.repository.ts`)

```typescript
interface IAuthRepository {
  login(request: LoginRequest): Promise<AuthResponse>;
  register(request: RegisterRequest): Promise<PendingVerificationResponse>;
  verifyOtp(request: VerifyOtpRequest): Promise<AuthResponse | ResetTokenResponse>;
  requestPasswordReset(request: RequestPasswordResetRequest): Promise<SuccessResponse>;
  resetPassword(request: ResetPasswordRequest): Promise<SuccessResponse>;
  resendOtp(request: ResendOtpRequest): Promise<SuccessResponse>;
}
```

---

## Fake Auth Repository (`services/auth/fake-auth.repository.ts`)

In-memory implementation with simulated network delays.

### Behavior

| Method | Delay | Success Behavior | Error Simulation |
|--------|-------|-----------------|------------------|
| `login` | 800ms | Returns mock user + token | If phone not in mock DB → `PHONE_NOT_FOUND`; if password !== "12345678" → `INVALID_CREDENTIALS` |
| `register` | 1000ms | Adds user to mock DB, returns pending verification | If phone exists → `PHONE_EXISTS` |
| `verifyOtp` | 600ms | If code === "482931" → success | Otherwise → `OTP_INVALID`; after 3 tries → `OTP_MAX_ATTEMPTS` |
| `requestPasswordReset` | 700ms | Returns success | If phone not in DB → `PHONE_NOT_FOUND` |
| `resetPassword` | 800ms | Returns success | Always succeeds if token valid |
| `resendOtp` | 500ms | Returns success | Always succeeds |

### Mock Data

Pre-seed with one user:
```
name: "Lucas"
phone: "+5511987654321"
password: "12345678"
```

### Simulated Delay

```typescript
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
```

---

## Secure Store Abstraction (`services/storage/secure-store.ts`)

Wraps `expo-secure-store` for token persistence.

```typescript
interface ISecureStorage {
  getToken(): Promise<AuthToken | null>;
  setToken(token: AuthToken): Promise<void>;
  clearToken(): Promise<void>;
}
```

Keys:
- `autokeeper_access_token`
- `autokeeper_refresh_token`
- `autokeeper_token_expires`

---

## Zustand Auth Store (`stores/auth-store.ts`)

### State

```typescript
interface AuthState {
  user: User | null;
  token: AuthToken | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (phone: string, password: string) => Promise<void>;
  register: (name: string, phone: string, password: string) => Promise<PendingVerificationResponse>;
  verifyOtp: (phone: string, code: string, flow: OtpFlow) => Promise<AuthResponse | ResetTokenResponse>;
  requestPasswordReset: (phone: string) => Promise<void>;
  resetPassword: (resetToken: string, newPassword: string) => Promise<void>;
  resendOtp: (phone: string, flow: OtpFlow) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
}
```

### Implementation Notes

- `login`: calls `authRepository.login()`, stores token in SecureStore, sets user + isAuthenticated
- `register`: calls `authRepository.register()`, returns response (doesn't set auth yet — needs OTP)
- `verifyOtp`: calls repository, if register flow → sets auth; if forgot flow → returns reset token
- `logout`: clears SecureStore, resets state
- `restoreSession`: on app launch, checks SecureStore for existing token. If found and not expired, sets isAuthenticated
- The store receives the repository via dependency injection or module-level import
- Errors are thrown and caught by the screen hooks (not handled in the store)

### Dependency Injection

```typescript
// Allow swapping the repository
let repository: IAuthRepository = new FakeAuthRepository();

export const setAuthRepository = (repo: IAuthRepository) => {
  repository = repo;
};
```

---

## Acceptance Criteria

- [ ] All TypeScript interfaces compile without errors
- [ ] FakeAuthRepository returns correct responses for happy path
- [ ] FakeAuthRepository returns correct error codes for each failure case
- [ ] FakeAuthRepository simulates realistic delays
- [ ] SecureStore correctly persists and retrieves tokens
- [ ] Zustand store `isAuthenticated` becomes true after successful login
- [ ] Zustand store `logout` clears all state and SecureStore
- [ ] Zustand store `restoreSession` recovers auth state on app launch
- [ ] Repository can be swapped via `setAuthRepository`
