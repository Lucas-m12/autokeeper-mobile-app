# AutoKeeper MVP — Validation, Edge Cases & Error Handling

## 1. Input validation rules

### 1.1 Placa do veículo
| Rule | Spec |
|------|------|
| Required | Yes |
| Format | Antigo: `ABC-1234` · Mercosul: `ABC1D23` |
| Regex | `/^[A-Z]{3}-?\d[A-Z0-9]\d{2}$/` |
| Transform | Uppercase, strip spaces, add hyphen if missing |
| Max length | 8 chars (with hyphen) |
| Error | "Placa inválida. Use o formato ABC-1234 ou ABC1D23." |

### 1.2 Telefone
| Rule | Spec |
|------|------|
| Required | Yes |
| Format | `+55 (DD) 9XXXX-XXXX` (11 digits after +55) |
| Regex | `/^\+55\d{11}$/` (stored) |
| Display mask | `(82) 99876-5432` |
| Error | "Número inválido. Use DDD + 9 dígitos." |

### 1.3 Senha
| Rule | Spec |
|------|------|
| Required | Yes |
| Min length | 8 characters |
| Complexity | At least 1 letter + 1 number |
| Max length | 128 characters |
| Error | "Mínimo 8 caracteres com letras e números." |

### 1.4 OTP Code
| Rule | Spec |
|------|------|
| Required | Yes |
| Format | 6 digits |
| Expiration | 5 minutes |
| Max attempts | 3 per code, then request new |
| Error | "Código incorreto. Verifique e tente novamente." |
| Expired | "Código expirado. Solicite um novo código." |

### 1.5 Nome
| Rule | Spec |
|------|------|
| Required | Yes |
| Min length | 2 characters |
| Max length | 255 characters |
| Error | "Informe seu nome completo." |

### 1.6 Quilometragem
| Rule | Spec |
|------|------|
| Required | No |
| Type | Integer |
| Min | 0 |
| Max | 999999 |
| Error | "Quilometragem inválida." |

### 1.7 Renavam
| Rule | Spec |
|------|------|
| Required | No |
| Format | 11 digits |
| Regex | `/^\d{11}$/` |
| Error | "Renavam deve ter 11 dígitos." |

### 1.8 Data de vencimento (lembretes)
| Rule | Spec |
|------|------|
| Required | Yes (if toggle is on) |
| Format | DD/MM/AAAA |
| Min date | Hoje - 365 dias (allow past dates for already overdue items) |
| Max date | Hoje + 730 dias (2 years ahead) |
| Error past | "Data muito antiga. Verifique o vencimento." |
| Error future | "Data muito distante. Máximo 2 anos." |
| Error format | "Data inválida. Use DD/MM/AAAA." |

### 1.9 Valor estimado
| Rule | Spec |
|------|------|
| Required | No |
| Type | Decimal |
| Min | 0.01 |
| Max | 999999.99 |
| Format | `R$ 1.847,00` (display) / `1847.00` (stored) |
| Error | "Valor inválido." |

---

## 2. Edge cases

### 2.1 Vehicles

| Case | Behavior |
|------|----------|
| Duplicate plate for same user | Block: "Você já tem um veículo com essa placa." |
| Duplicate plate for different user | Allow (different users can own same plate at different times) |
| Max vehicles per user | 10 (soft limit for MVP, show toast: "Limite de veículos atingido") |
| Plate lookup API timeout | Proceed to Step 2 with empty form + toast: "Não foi possível buscar dados. Preencha manualmente." |
| Plate lookup API returns no match | Proceed to Step 2 with empty form (no error — it's normal for older plates) |
| Delete vehicle with active reminders | Delete all: modal warns "e todos os seus lembretes serão removidos" |
| Delete last vehicle | Return to empty Home state |
| Year model > current year + 1 | Block (no future-future cars) |
| Year fabricação > year model | Block: "Ano de fabricação não pode ser maior que ano modelo." |

### 2.2 Reminders

| Case | Behavior |
|------|----------|
| All toggles off in Step 3 | Allow (user can add reminders later from vehicle detail) |
| Duplicate reminder type for same vehicle | Block: "Já existe um lembrete de IPVA ativo para esse veículo." |
| Resolve reminder → auto-create next | Only if `is_recurring`. Due date = current due + recurrence_months |
| Resolve reminder with no value entered | Allow (value is optional) |
| Vencimento changes to past while user is on screen | Real-time: status badge updates on next screen focus/return |
| All reminders resolved | Home shows no hero card, just empty reminder list: "Tudo em dia" message |
| Reminder due today (day 0) | Status = "Vencendo", display: "Vence hoje!" |

### 2.3 Notifications

| Case | Behavior |
|------|----------|
| Push permission denied by OS | Show in Profile: "Notificações desativadas no sistema. Ative nas configurações do celular." |
| User changes alert_days_before | Recalculate all pending notifications for existing reminders |
| Reminder resolved before notification sent | Cancel pending notification |
| Multiple reminders on same day | Send individual push for each (max 3 per day, group rest) |

### 2.4 Auth

| Case | Behavior |
|------|----------|
| Phone already registered (on register) | "Esse número já está cadastrado. Faça login." |
| Phone not found (on login) | "Número não encontrado. Crie uma conta." |
| Google account not linked | Auto-create account from Google profile |
| Session expired | Redirect to login with toast: "Sessão expirada. Faça login novamente." |
| Invalid JWT token | Redirect to login, clear local storage |

---

## 3. Loading states

| Screen | Loading behavior |
|--------|-----------------|
| Home | Skeleton: hero card placeholder (rectangle pulse) + 4 reminder item skeletons |
| Vehicle List | Skeleton: 2 vehicle card placeholders |
| Vehicle Detail | Skeleton: car icon + name placeholder + 4 mini gauge placeholders + 4 reminder skeletons |
| Reminder Detail | Skeleton: status bar + title + info grid rows |
| Histórico | Skeleton: summary strip + 3 item placeholders |
| Add Vehicle Step 2 (after plate lookup) | Full-screen spinner: "Buscando dados do veículo..." (max 5s timeout) |
| Marcar como pago | Button shows spinner, disabled during request (max 10s timeout) |

### Skeleton pattern
```
Background: #0c1726
Pulse animation: #0c1726 → #111d33 → #0c1726 (1.5s loop)
Border radius: same as the real component
Height: same as the real component
```

---

## 4. Error states

### 4.1 Network error (global)
- **When**: Any API call fails with no response
- **Display**: Toast (red): "Sem conexão. Verifique sua internet."
- **Retry**: Pull-to-refresh on list screens, retry button on detail screens

### 4.2 Server error (500)
- **When**: Backend returns 500
- **Display**: Toast (red): "Algo deu errado. Tente novamente."
- **Retry**: Same as network error

### 4.3 Plate lookup failed
- **When**: External plate API is down or returns error
- **Display**: Proceed to Step 2, toast (amber): "Busca indisponível. Preencha manualmente."
- **Not**: Don't block the user. Manual fill is always the fallback.

### 4.4 Session expired
- **When**: 401 response from any endpoint
- **Display**: Redirect to login, toast: "Sessão expirada."
- **Behavior**: Clear tokens, preserve no draft state

---

## 5. Confirmation flows

### 5.1 Marcar como pago/resolvido
```
User taps "Marcar como pago"
  → Modal appears (bottom sheet style)
  → Shows: reminder name, vehicle, value
  → "Confirmar pagamento" (primary CTA)
  → "Cancelar" (secondary)
  → On confirm: button shows spinner → API call → dismiss modal
  → Toast: "IPVA marcado como pago ✓"
  → Navigate to Home
  → If recurring: next reminder auto-created silently
```

### 5.2 Remover veículo
```
User taps "Remover veículo" (red zone at bottom of vehicle detail)
  → Modal appears
  → Shows: vehicle name, plate, warning about losing reminders
  → "Remover veículo" (red danger button)
  → "Cancelar" (secondary)
  → On confirm: API call → dismiss modal
  → Toast: "Veículo removido"
  → Navigate to Vehicle List
```

### 5.3 Sair da conta
```
User taps "Sair da conta"
  → No modal needed (not destructive to data)
  → Clear tokens → Navigate to Login
  → Toast on login screen: "Você saiu da conta"
```

---

## 6. Toast specification

| Type | Border | Icon | Duration |
|------|--------|------|----------|
| Success | green border accent | ✓ checkmark | 2.5s |
| Error | red border accent | × or trash | 2.5s |
| Info | teal border accent | ℹ info | 3s |

**Position**: bottom center, 100px above tab bar
**Animation**: slide up + fade in (0.3s)
**Dismiss**: auto after duration, or tap to dismiss
**Queue**: only 1 toast at a time, new replaces old