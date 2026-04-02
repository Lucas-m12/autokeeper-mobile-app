# Epic 6 — Validation & Error States

Reference: `docs/validation.md` for full rules and edge cases.

---

## Validation Rules by Screen

### Login

| Field | Rule | Error Message |
|-------|------|---------------|
| Phone | Required, 11 digits after +55 | "Número inválido. Use DDD + 9 dígitos." |
| Password | Required | "Informe sua senha." |

### Register

| Field | Rule | Error Message |
|-------|------|---------------|
| Name | Required, min 2 chars | "Informe seu nome completo." |
| Phone | Required, 11 digits after +55 | "Número inválido. Use DDD + 9 dígitos." |
| Password | Required, min 8 chars, 1 letter + 1 number | "Mínimo 8 caracteres com letras e números." |
| Confirm | Must match password | "As senhas não conferem." |

### OTP

| Field | Rule | Error Message |
|-------|------|---------------|
| Code | Required, exactly 6 digits | "Código incorreto. Verifique e tente novamente." |
| Expiry | 5 minutes from send | "Código expirado. Solicite um novo código." |
| Attempts | Max 3 per code | "Muitas tentativas. Solicite um novo código." |

### Forgot Password

| Field | Rule | Error Message |
|-------|------|---------------|
| Phone | Required, 11 digits after +55 | "Número inválido. Use DDD + 9 dígitos." |

### New Password

| Field | Rule | Error Message |
|-------|------|---------------|
| Password | Required, min 8 chars, 1 letter + 1 number | "Mínimo 8 caracteres com letras e números." |
| Confirm | Must match password | "As senhas não conferem." |

---

## Phone Validation

### Regex (stored format)

```
/^\+55\d{11}$/
```

### Display Mask

```
(DD) 9XXXX-XXXX
```

### Transform Flow

```
User types: 11987654321
Masked display: (11) 98765-4321
Stored value: +5511987654321
```

### Rules

- Only accept digits in input
- Auto-format as user types
- DDD (first 2 digits): 11-99
- Must start with 9 after DDD (mobile)
- Total: 11 digits (2 DDD + 9 number)

---

## Password Validation

### Minimum Requirements

- At least 8 characters
- At least 1 letter (a-z or A-Z)
- At least 1 number (0-9)
- Max 128 characters

### Regex

```
/^(?=.*[a-zA-Z])(?=.*\d).{8,128}$/
```

### Strength Meter (separate from validation)

| Check | Points |
|-------|--------|
| 8+ chars | +1 |
| Has uppercase | +1 |
| Has digit | +1 |
| Has special char | +1 |

Strength is informational only — a password with 1 point (just 8 chars of letters) can still fail validation if it has no number.

---

## Error Display Pattern

### Inline Field Errors

- Shown below the input field
- Font: 12px, `#f43f5e` (status-error)
- Margin top: 4px
- Input border changes to `#f43f5e`

### API Errors

- Shown as a toast or inline message above the form
- For auth-specific errors (wrong password, phone exists), show inline near the relevant field
- For network/server errors, show toast at bottom

### Validation Trigger

- Validate on submit (not on every keystroke)
- Clear field error when user starts editing that field
- Show all field errors simultaneously on failed submit

---

## OTP Error Handling

### Attempt Tracking

```typescript
// In use-otp.ts hook
const [attempts, setAttempts] = useState(0);
const MAX_ATTEMPTS = 3;

const handleVerify = async () => {
  if (attempts >= MAX_ATTEMPTS) {
    setError('Muitas tentativas. Solicite um novo código.');
    return;
  }
  try {
    await verifyOtp({ phone, code, flow });
    // success navigation
  } catch (e) {
    setAttempts(prev => prev + 1);
    setCode(''); // clear all boxes
    setError(e.message);
  }
};
```

### Resend Flow

- Timer starts at 60 seconds (register) or 59 seconds (forgot password — per prototype)
- When timer reaches 0, show "Reenviar código" as tappable amber link
- On resend: reset timer, reset attempts, clear error

---

## API Error Mapping

The fake repository throws errors with codes. The hooks map these to user-facing messages:

```typescript
const errorMessages: Record<string, string> = {
  PHONE_NOT_FOUND: 'Número não encontrado. Crie uma conta.',
  INVALID_CREDENTIALS: 'Senha incorreta. Tente novamente.',
  PHONE_EXISTS: 'Esse número já está cadastrado. Faça login.',
  OTP_INVALID: 'Código incorreto. Verifique e tente novamente.',
  OTP_EXPIRED: 'Código expirado. Solicite um novo código.',
  OTP_MAX_ATTEMPTS: 'Muitas tentativas. Solicite um novo código.',
  NETWORK_ERROR: 'Sem conexão. Verifique sua internet.',
  SERVER_ERROR: 'Algo deu errado. Tente novamente.',
};
```

---

## Loading States

During API calls:
- Primary button shows loading state (disabled + spinner or opacity change)
- Form inputs become non-editable
- Back button remains functional (user can cancel)

---

## Acceptance Criteria

- [ ] Phone input rejects non-digit characters
- [ ] Phone validation catches invalid DDD and length
- [ ] Password validation enforces min 8 chars + 1 letter + 1 number
- [ ] Confirm password mismatch shows error on submit
- [ ] Name validation requires min 2 characters
- [ ] OTP tracks attempts and blocks after 3 failures
- [ ] OTP timer counts down and enables resend at 0
- [ ] Errors clear when user starts editing the errored field
- [ ] API errors display correct pt-BR messages
- [ ] Loading state disables form during API calls
- [ ] All error messages match `docs/micro-copy.md` and `docs/validation.md`
