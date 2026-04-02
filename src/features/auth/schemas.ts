import { z } from 'zod';

const phone = z
  .string()
  .regex(/^\d{11}$/, 'Número inválido. Use DDD + 9 dígitos.');

const password = z
  .string()
  .regex(
    /^(?=.*[a-zA-Z])(?=.*\d).{8,128}$/,
    'Mínimo 8 caracteres com letras e números.',
  );

export const loginSchema = z.object({
  phone,
  password: z.string().min(1, 'Informe sua senha.'),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Informe seu nome completo.'),
    phone,
    password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não conferem.',
    path: ['confirmPassword'],
  });

export const newPasswordSchema = z
  .object({
    password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não conferem.',
    path: ['confirmPassword'],
  });

export const forgotPasswordSchema = z.object({
  phone,
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type NewPasswordFormData = z.infer<typeof newPasswordSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
