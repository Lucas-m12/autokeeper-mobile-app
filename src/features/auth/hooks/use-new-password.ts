import { useState, useCallback } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/stores/auth-store';
import { getErrorMessage } from '@/features/auth/utils/error-messages';
import { newPasswordSchema, type NewPasswordFormData } from '@/features/auth/schemas';

export function useNewPassword() {
  const router = useRouter();
  const { resetToken } = useLocalSearchParams<{ resetToken: string }>();
  const authStore = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<NewPasswordFormData>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onSubmit = useCallback(
    async (data: NewPasswordFormData) => {
      setIsLoading(true);
      try {
        await authStore.resetPassword(resetToken!, data.password);
        router.replace('/password-reset-success');
      } catch (e) {
        form.setError('password', { message: getErrorMessage(e) });
      } finally {
        setIsLoading(false);
      }
    },
    [resetToken, authStore, router, form],
  );

  return {
    form,
    handleReset: form.handleSubmit(onSubmit),
    isLoading,
  };
}
