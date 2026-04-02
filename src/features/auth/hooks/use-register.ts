import { useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/stores/auth-store';
import { getErrorMessage } from '@/features/auth/utils/error-messages';
import { toStoredFormat, toDisplayFormat } from '@/features/auth/utils/phone-mask';

interface FieldErrors {
  name?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

export function useRegister() {
  const router = useRouter();
  const authStore = useAuthStore();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleNameChange = useCallback((value: string) => {
    setName(value);
    setFieldErrors((prev) => ({ ...prev, name: undefined }));
  }, []);

  const handlePhoneChange = useCallback((value: string) => {
    setPhone(value);
    setFieldErrors((prev) => ({ ...prev, phone: undefined }));
  }, []);

  const handlePasswordChange = useCallback((value: string) => {
    setPassword(value);
    setFieldErrors((prev) => ({ ...prev, password: undefined }));
  }, []);

  const handleConfirmPasswordChange = useCallback((value: string) => {
    setConfirmPassword(value);
    setFieldErrors((prev) => ({ ...prev, confirmPassword: undefined }));
  }, []);

  const handleRegister = useCallback(async () => {
    const errors: FieldErrors = {};

    if (name.trim().length < 2) {
      errors.name = 'Informe seu nome completo.';
    }

    const digits = phone.replace(/\D/g, '');
    if (digits.length !== 11) {
      errors.phone = 'Número inválido. Use DDD + 9 dígitos.';
    }

    if (!/^(?=.*[a-zA-Z])(?=.*\d).{8,128}$/.test(password)) {
      errors.password = 'Mínimo 8 caracteres com letras e números.';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'As senhas não conferem.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      const stored = toStoredFormat(phone);
      await authStore.register(name.trim(), stored, password);
      router.push({
        pathname: '/otp',
        params: { flow: 'register', phone: toDisplayFormat(stored) },
      });
    } catch (e) {
      const msg = getErrorMessage(e);
      setFieldErrors({ phone: msg });
    } finally {
      setIsLoading(false);
    }
  }, [name, phone, password, confirmPassword, authStore, router]);

  return {
    name,
    phone,
    password,
    confirmPassword,
    isLoading,
    fieldErrors,
    handleNameChange,
    handlePhoneChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleRegister,
  };
}
