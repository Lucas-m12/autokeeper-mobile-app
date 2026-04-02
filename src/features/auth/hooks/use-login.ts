import { useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/stores/auth-store';
import { getErrorMessage } from '@/features/auth/utils/error-messages';
import { toStoredFormat } from '@/features/auth/utils/phone-mask';
import { loginSchema, type LoginFormData } from '@/features/auth/schemas';

export function useLogin() {
  const router = useRouter();
  const authStore = useAuthStore();
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { phone: '', password: '' },
  });

  const onSubmit = useCallback(
    async (data: LoginFormData) => {
      setIsLoading(true);
      setError(null);
      try {
        await authStore.login(toStoredFormat(data.phone), data.password);
        router.replace('/(tabs)');
      } catch (e) {
        setError(getErrorMessage(e));
      } finally {
        setIsLoading(false);
      }
    },
    [authStore, router],
  );

  return {
    form,
    rememberMe,
    toggleRemember: useCallback(() => setRememberMe((prev) => !prev), []),
    handleLogin: form.handleSubmit(onSubmit),
    isLoading,
    error,
  };
}
