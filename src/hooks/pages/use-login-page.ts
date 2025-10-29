import { useAlert } from "@/contexts/alert-context";
import { useAuth } from "@/contexts/auth-context";
import { classifyError } from "@/utils/errors";
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from "expo-router";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Zod validation schema
const loginSchema = z.object({
  email: z.email({ message: 'E-mail inválido' })
    .min(1, 'E-mail é obrigatório'),
  password: z.string()
    .min(1, 'Senha é obrigatória')
    .min(8, 'Senha deve ter no mínimo 8 caracteres'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const useLoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuth();
  const { showAlert } = useAlert();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await signIn.email({ email: data.email, password: data.password });
      // Navigate to home screen after successful login
      router.replace('/home');
    } catch (error) {
      const classified = classifyError(error, 'login');
      showAlert({
        type: 'error',
        title: classified.title,
        message: classified.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn.social({
        provider: 'google',
        callbackURL: '/home',
      });
    } catch (error) {
      console.error('Google login error:', error);
      const classified = classifyError(error, 'login');
      showAlert({
        type: 'error',
        title: classified.title,
        message: classified.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn.social({
        provider: 'apple',
        callbackURL: '/home',
      });
    } catch (error) {
      console.error('Apple login error:', error);
      const classified = classifyError(error, 'login');
      showAlert({
        type: 'error',
        title: classified.title,
        message: classified.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // TODO: Navigate to forgot password screen when implemented
    showAlert({
      type: 'info',
      title: 'Em breve',
      message: 'A funcionalidade de recuperação de senha estará disponível em breve.',
    });
  };

  const handleCreateAccount = () => {
    router.push('/sign-up');
  };

  return {
    control,
    errors,
    isLoading,
    handleLogin: handleSubmit(onSubmit),
    handleGoogleLogin,
    handleAppleLogin,
    handleForgotPassword,
    handleCreateAccount,
  };
};