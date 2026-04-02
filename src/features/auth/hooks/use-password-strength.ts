import { useMemo } from 'react';

const LABELS = ['', 'Fraca', 'Razoável', 'Boa', 'Forte'] as const;
const COLORS = ['#556677', '#f43f5e', '#f59e0b', '#14b8a6', '#10b981'] as const;

export function usePasswordStrength(password: string) {
  return useMemo(() => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    return {
      strength,
      label: LABELS[strength],
      color: COLORS[strength],
    };
  }, [password]);
}
