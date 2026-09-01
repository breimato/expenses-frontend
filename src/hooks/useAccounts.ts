import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { PatchAccountV1Request, PostAccountTransferV1Request, PostAccountV1Request } from '@/api/generated';
import {
  getAccountApi,
  patchAccountApi,
  postAccountApi,
  postAccountTransferApi,
} from '@/api/client';
import { queryKeys } from '@/api/queryKeys';
import { useAccountContext } from '@/context/AccountContext';
import { useAuth } from '@/context/AuthContext';

export function useActiveAccount() {
  const { user } = useAuth();
  const { activeAccountId } = useAccountContext();
  return useQuery({
    queryKey: queryKeys.account(user?.id ?? 0, activeAccountId ?? 0),
    queryFn: () => getAccountApi.getAccountV1({ id: activeAccountId! }),
    enabled: Boolean(user?.id && activeAccountId),
  });
}

export function useCreateAccount() {
  const queryClient = useQueryClient();
  const { refreshAccounts } = useAccountContext();
  return useMutation({
    mutationFn: (body: PostAccountV1Request) => postAccountApi.postAccountV1({ postAccountV1Request: body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      refreshAccounts();
    },
  });
}

export function useUpdateAccount() {
  const queryClient = useQueryClient();
  const { refreshAccounts } = useAccountContext();
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: PatchAccountV1Request }) =>
      patchAccountApi.patchAccountV1({ id, patchAccountV1Request: body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      queryClient.invalidateQueries({ queryKey: ['account'] });
      refreshAccounts();
    },
  });
}

export function useCreateAccountTransfer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: PostAccountTransferV1Request) =>
      postAccountTransferApi.postAccountTransferV1({ postAccountTransferV1Request: body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      queryClient.invalidateQueries({ queryKey: ['account'] });
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });
}
