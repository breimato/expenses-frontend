import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';

/** Clears React Query cache when the authenticated user changes (login / logout / switch). */
export function AuthQueryCacheReset() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const previousUserIdRef = useRef<number | null | undefined>(undefined);

  useEffect(() => {
    const userId = user?.id ?? null;
    if (previousUserIdRef.current === undefined) {
      previousUserIdRef.current = userId;
      return;
    }
    if (previousUserIdRef.current !== userId) {
      queryClient.clear();
      previousUserIdRef.current = userId;
    }
  }, [user?.id, queryClient]);

  return null;
}
