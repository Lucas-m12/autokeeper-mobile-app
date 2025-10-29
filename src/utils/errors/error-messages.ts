/**
 * Error Messages for AutoKeeper
 *
 * Portuguese error messages organized by category and context.
 * All messages follow Brazilian Portuguese conventions.
 */

import { ErrorCategory, ErrorContext } from './error-types';

/**
 * Error message structure
 */
interface ErrorMessage {
  title: string;
  message: string;
}

/**
 * Error messages by category
 */
const ERROR_MESSAGES: Record<ErrorCategory, ErrorMessage> = {
  [ErrorCategory.NETWORK]: {
    title: 'Erro de conexão',
    message: 'Não foi possível conectar ao servidor. Verifique sua conexão com a internet.',
  },
  [ErrorCategory.SERVER]: {
    title: 'Erro no servidor',
    message: 'O servidor está temporariamente indisponível. Tente novamente em alguns instantes.',
  },
  [ErrorCategory.AUTH]: {
    title: 'Erro ao entrar',
    message: 'E-mail ou senha incorretos. Por favor, tente novamente.',
  },
  [ErrorCategory.VALIDATION]: {
    title: 'Dados inválidos',
    message: 'Por favor, verifique os dados informados e tente novamente.',
  },
  [ErrorCategory.UNKNOWN]: {
    title: 'Erro inesperado',
    message: 'Algo deu errado. Por favor, tente novamente.',
  },
};

/**
 * Context-specific error messages for better UX
 */
const CONTEXT_MESSAGES: Record<
  ErrorContext,
  Partial<Record<ErrorCategory, ErrorMessage>>
> = {
  login: {
    [ErrorCategory.AUTH]: {
      title: 'Erro ao entrar',
      message: 'E-mail ou senha incorretos. Por favor, tente novamente.',
    },
    [ErrorCategory.UNKNOWN]: {
      title: 'Erro ao entrar',
      message: 'Não foi possível fazer login. Por favor, tente novamente.',
    },
  },
  signup: {
    [ErrorCategory.AUTH]: {
      title: 'Erro ao criar conta',
      message: 'Não foi possível criar sua conta. Este e-mail pode já estar cadastrado.',
    },
    [ErrorCategory.UNKNOWN]: {
      title: 'Erro ao criar conta',
      message: 'Não foi possível criar sua conta. Por favor, tente novamente.',
    },
  },
  generic: {
    // Uses default messages from ERROR_MESSAGES
  },
};

/**
 * Get the appropriate error message based on category and context
 */
export function getErrorMessage(
  category: ErrorCategory,
  context: ErrorContext = 'generic'
): ErrorMessage {
  // Try to get context-specific message first
  const contextMessage = CONTEXT_MESSAGES[context]?.[category];
  if (contextMessage) {
    return contextMessage;
  }

  // Fall back to default message
  return ERROR_MESSAGES[category];
}
