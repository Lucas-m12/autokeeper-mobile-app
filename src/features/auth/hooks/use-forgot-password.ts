import { useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/stores/auth-store';
import { getErrorMessage } from '@/features/auth/utils/error-messages';
import { toStoredFormat, toDisplayFormat } from '@/features/auth/utils/phone-mask';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/features/auth/schemas';

export function useForgotPassword() {
  const router = useRouter();
  const authStore = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { phone: '' },
  });

  const onSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      setIsLoading(true);
      try {
        const stored = toStoredFormat(data.phone);
        await authStore.requestPasswordReset(stored);
        router.push({
          pathname: '/otp',
          params: { flow: 'forgot-password', phone: toDisplayFormat(stored) },
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
    handleSendCode: form.handleSubmit(onSubmit),
    isLoading,
  };
}
