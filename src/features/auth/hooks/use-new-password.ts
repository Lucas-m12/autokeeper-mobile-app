import { useState, useCallback } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAuthStore } from '@/stores/auth-store';
import { getErrorMessage } from '@/features/auth/utils/error-messages';

interface FieldErrors {
  password?: string;
  confirmPassword?: string;
}

export function useNewPassword() {
  const router = useRouter();
  const { resetToken } = useLocalSearchParams<{ resetToken: string }>();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handlePasswordChange = useCallback((value: string) => {
    setPassword(value);
    setFieldErrors((prev) => ({ ...prev, password: undefined }));
  }, []);

  const handleConfirmPasswordChange = useCallback((value: string) => {
    setConfirmPassword(value);
    setFieldErrors((prev) => ({ ...prev, confirmPassword: undefined }));
  }, []);

  const handleReset = useCallback(async () => {
    const errors: FieldErrors = {};

    if (!/^(?=.*[a-zA-Z])(?=.*\d).{8,128}$/.test(password)) {
      errors.password = 'Mínimo 8 caracteres com letras e números.';
    }

    if (confirmPassword !== password) {
      errors.confirmPassword = 'As senhas não conferem.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);
    try {
      await useAuthStore.getState().resetPassword(resetToken!, password);
      router.replace('/password-reset-success');
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      setFieldErrors({ password: getErrorMessage(code) });
    } finally {
      setIsLoading(false);
    }
  }, [password, confirmPassword, resetToken, router]);

  return {
    password,
    setPassword: handlePasswordChange,
    confirmPassword,
    setConfirmPassword: handleConfirmPasswordChange,
    isLoading,
    fieldErrors,
    handleReset,
  };
}
