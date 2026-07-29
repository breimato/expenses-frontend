import { useCallback, useState } from 'react';
import { getApiErrorInfo } from '@/utils/apiError';

interface ErrorState {
  message: string;
  isGuide: boolean;
}

export function useErrorDialog() {
  const [errorState, setErrorState] = useState<ErrorState | null>(null);

  const showError = useCallback(async (error: unknown, fallback?: string) => {
    const info = await getApiErrorInfo(error, fallback);
    setErrorState({ message: info.message, isGuide: info.isGuide });
  }, []);

  const clearError = useCallback(() => {
    setErrorState(null);
  }, []);

  return {
    errorMessage: errorState?.message ?? null,
    isGuide: errorState?.isGuide ?? false,
    showError,
    clearError,
  };
}
