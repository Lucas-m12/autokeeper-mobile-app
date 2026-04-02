import { useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/stores/auth-store';
import { getErrorMessage } from '@/features/auth/utils/error-messages';
import { toStoredFormat } from '@/features/auth/utils/phone-mask';

interface FieldErrors {
  phone?: string;
  password?: string;
}

export function useLogin() {
  const router = useRouter();
  const authStore = useAuthStore();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handlePhoneChange = useCallback((value: string) => {
    setPhone(value);
    setFieldErrors((prev) => ({ ...prev, phone: undefined }));
    setError(null);
  }, []);

  const handlePasswordChange = useCallback((value: string) => {
    setPassword(value);
    setFieldErrors((prev) => ({ ...prev, password: undefined }));
    setError(null);
  }, []);

  const toggleRemember = useCallback(() => {
    setRememberMe((prev) => !prev);
  }, []);

  const handleLogin = useCallback(async () => {
    const errors: FieldErrors = {};
    const digits = phone.replace(/\D/g, '');

    if (digits.length !== 11) {
      errors.phone = 'Número inválido. Use DDD + 9 dígitos.';
    }

    if (!password) {
      errors.password = 'Informe sua senha.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await authStore.login(toStoredFormat(phone), password);
      router.replace('/(tabs)');
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setIsLoading(false);
    }
  }, [phone, password, authStore, router]);

  return {
    phone,
    password,
    rememberMe,
    isLoading,
    error,
    fieldErrors,
    handlePhoneChange,
    handlePasswordChange,
    toggleRemember,
    handleLogin,
  };
}
