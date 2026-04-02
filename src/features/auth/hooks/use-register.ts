import { useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/stores/auth-store';
import { getErrorMessage } from '@/features/auth/utils/error-messages';
import { toStoredFormat, toDisplayFormat } from '@/features/auth/utils/phone-mask';
import { registerSchema, type RegisterFormData } from '@/features/auth/schemas';

export function useRegister() {
  const router = useRouter();
  const authStore = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', phone: '', password: '', confirmPassword: '' },
  });

  const onSubmit = useCallback(
    async (data: RegisterFormData) => {
      setIsLoading(true);
      try {
        const stored = toStoredFormat(data.phone);
        await authStore.register(data.name.trim(), stored, data.password);
        router.push({
          pathname: '/otp',
          params: { flow: 'register', phone: toDisplayFormat(stored) },
        });
      } catch (e) {
        form.setError('phone', { message: getErrorMessage(e) });
      } finally {
        setIsLoading(false);
      }
    },
    [authStore, router, form],
  );

  return {
    form,
    handleRegister: form.handleSubmit(onSubmit),
    isLoading,
  };
}
