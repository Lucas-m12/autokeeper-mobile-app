import { useState, useCallback } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAuthStore } from '@/stores/auth-store';
import { getErrorMessage } from '@/features/auth/utils/error-messages';
import { useOtpTimer } from '@/features/auth/hooks/use-otp-timer';
import type { OtpFlow } from '@/services/auth/auth.types';

const MAX_ATTEMPTS = 3;

export function useOtp() {
  const router = useRouter();
  const { flow, phone } = useLocalSearchParams<{ flow: OtpFlow; phone: string }>();
  const authStore = useAuthStore();

  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const timer = useOtpTimer(60);

  const handleCodeChange = useCallback((value: string) => {
    setCode(value);
    setError(null);
  }, []);

  const handleVerify = useCallback(async () => {
    if (attempts >= MAX_ATTEMPTS) {
      setError('Muitas tentativas. Solicite um novo código.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await authStore.verifyOtp(phone!, code, flow!);
      if (flow === 'register') {
        router.replace('/register-success');
      } else {
        router.replace({
          pathname: '/new-password',
          params: { resetToken: (result as { resetToken: string }).resetToken },
        });
      }
    } catch (e) {
      setAttempts((prev) => prev + 1);
      setCode('');
      setError(getErrorMessage(e));
    } finally {
      setIsLoading(false);
    }
  }, [code, flow, phone, attempts, authStore, router]);

  const handleResend = useCallback(async () => {
    try {
      await authStore.resendOtp(phone!, flow!);
      timer.resetTimer();
      setAttempts(0);
      setError(null);
      setCode('');
    } catch (e) {
      setError(getErrorMessage(e));
    }
  }, [phone, flow, authStore, timer]);

  return {
    flow,
    phone,
    code,
    isLoading,
    error,
    attempts,
    timer,
    handleCodeChange,
    handleVerify,
    handleResend,
  };
}
