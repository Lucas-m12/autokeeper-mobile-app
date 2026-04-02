export const errorMessages: Record<string, string> = {
  PHONE_NOT_FOUND: 'N\u00famero n\u00e3o encontrado. Crie uma conta.',
  INVALID_CREDENTIALS: 'Senha incorreta. Tente novamente.',
  PHONE_EXISTS: 'Esse n\u00famero j\u00e1 est\u00e1 cadastrado. Fa\u00e7a login.',
  OTP_INVALID: 'C\u00f3digo incorreto. Verifique e tente novamente.',
  OTP_EXPIRED: 'C\u00f3digo expirado. Solicite um novo c\u00f3digo.',
  OTP_MAX_ATTEMPTS: 'Muitas tentativas. Solicite um novo c\u00f3digo.',
  NETWORK_ERROR: 'Sem conex\u00e3o. Verifique sua internet.',
  SERVER_ERROR: 'Algo deu errado. Tente novamente.',
};

export function getErrorMessage(code: string): string {
  return errorMessages[code] ?? errorMessages.SERVER_ERROR;
}
