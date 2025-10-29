import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuth } from '@/contexts/auth-context';
import { useAlert } from '@/contexts/alert-context';
import { classifyError } from '@/utils/errors';
import { useState } from 'react';

// Zod validation schema
const signupSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.email({ message: 'E-mail inválido' })
    .min(1, 'E-mail é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória').min(8, 'Senha deve ter no mínimo 8 caracteres'),
  confirmPassword: z.string().min(1, 'Confirme sua senha'),
  termsAccepted: z
    .boolean()
    .refine((val) => val === true, {
      message: 'Você deve aceitar os termos',
    }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

export type SignupFormData = z.infer<typeof signupSchema>;

export function useSignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, signIn } = useAuth();
  const { showAlert } = useAlert();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      await signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
      });
      // Navigate to home screen after successful signup
      router.replace('/home');
    } catch (error) {
      console.error('Signup error:', error);
      const classified = classifyError(error, 'signup');
      showAlert({
        type: 'error',
        title: classified.title,
        message: classified.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      await signIn.social({
        provider: 'google',
        callbackURL: '/home',
      });
    } catch (error) {
      console.error('Google signup error:', error);
      const classified = classifyError(error, 'signup');
      showAlert({
        type: 'error',
        title: classified.title,
        message: classified.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleSignup = async () => {
    setIsLoading(true);
    try {
      await signIn.social({
        provider: 'apple',
        callbackURL: '/home',
      });
    } catch (error) {
      console.error('Apple signup error:', error);
      const classified = classifyError(error, 'signup');
      showAlert({
        type: 'error',
        title: classified.title,
        message: classified.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackPress = () => {
    router.back();
  };

  const handleLoginPress = () => {
    router.push('/login');
  };

  const handleTermsPress = () => {
    // TODO: Navigate to terms screen or open web URL
    console.log('Terms of use pressed');
    // Linking.openURL('https://autokeeper.com/terms');
  };

  const handlePrivacyPress = () => {
    // TODO: Navigate to privacy policy screen or open web URL
    console.log('Privacy policy pressed');
    // Linking.openURL('https://autokeeper.com/privacy');
  };

  return {
    // Form control
    control,
    errors,
    isLoading,
    handleSignup: handleSubmit(onSubmit),

    // Actions
    handleGoogleSignup,
    handleAppleSignup,
    handleBackPress,
    handleLoginPress,
    handleTermsPress,
    handlePrivacyPress,
  };
}
