import { useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/stores/auth-store';
import { getErrorMessage } from '@/features/auth/utils/error-messages';
import { toStoredFormat, toDisplayFormat } from '@/features/auth/utils/phone-mask';

export function useForgotPassword() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePhoneChange = useCallback((value: string) => {
    setPhone(value);
    setError(null);
  }, []);

  const handleSendCode = useCallback(async () => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length !== 11) {
      setError('Número inválido. Use DDD + 9 dígitos.');
      return;
    }

    setIsLoading(true);
    try {
      const stored = toStoredFormat(phone);
      await useAuthStore.getState().requestPasswordReset(stored);
      router.push({
        pathname: '/otp',
        params: {
          flow: 'forgot-password',
          phone: toDisplayFormat(stored),
        },
      });
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      setError(getErrorMessage(code));
    } finally {
      setIsLoading(false);
    }
  }, [phone, router]);

  return {
    phone,
    setPhone: handlePhoneChange,
    isLoading,
    error,
    handleSendCode,
  };
}
