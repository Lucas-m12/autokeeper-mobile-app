import { useState, useEffect, useCallback } from 'react';

export function useOtpTimer(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) return;
    const id = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [seconds > 0]);

  const resetTimer = useCallback(() => setSeconds(initialSeconds), [initialSeconds]);

  return {
    seconds,
    formatted: `00:${seconds.toString().padStart(2, '0')}`,
    canResend: seconds === 0,
    resetTimer,
  };
}
