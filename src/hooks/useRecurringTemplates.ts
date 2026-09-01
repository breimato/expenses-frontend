import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type {
  PatchRecurringTemplateV1Request,
  PostRecurringTemplateQuickAddV1Request,
  PostRecurringTemplateV1Request,
} from '@/api/generated';
import type { GetRecurringTemplatesV1Request } from '@/api/generated/apis/GetRecurringTemplatesV1Api';
import {
  deleteRecurringTemplateApi,
  getRecurringTemplatesApi,
  patchRecurringTemplateApi,
  postRecurringTemplateApi,
  postRecurringTemplateQuickAddApi,
  postRecurringTemplatesApplyPendingApi,
} from '@/api/client';
import { queryKeys } from '@/api/queryKeys';
import { useActiveAccountId } from '@/context/AccountContext';
import { useAuth } from '@/context/AuthContext';

type RecurringTemplateFilters = Omit<GetRecurringTemplatesV1Request, 'accountId'>;

export function useRecurringTemplates(filters?: RecurringTemplateFilters) {
  const { user } = useAuth();
  const activeAccountId = useActiveAccountId();
  const userId = user?.id;
  return useQuery({
    queryKey: queryKeys.recurringTemplates(userId ?? 0, activeAccountId ?? 0, filters),
    queryFn: () => getRecurringTemplatesApi.getRecurringTemplatesV1({ accountId: activeAccountId!, ...filters }),
    enabled: Boolean(userId && activeAccountId),
  });
}

export function useCreateRecurringTemplate() {
  const queryClient = useQueryClient();
  const activeAccountId = useActiveAccountId();
  return useMutation({
    mutationFn: (body: PostRecurringTemplateV1Request) =>
      postRecurringTemplateApi.postRecurringTemplateV1({
        accountId: activeAccountId!,
        postRecurringTemplateV1Request: body,
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['recurringTemplates'] }),
  });
}

export function useUpdateRecurringTemplate() {
  const queryClient = useQueryClient();
  const activeAccountId = useActiveAccountId();
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: PatchRecurringTemplateV1Request }) =>
      patchRecurringTemplateApi.patchRecurringTemplateV1({
        accountId: activeAccountId!,
        id,
        patchRecurringTemplateV1Request: body,
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['recurringTemplates'] }),
  });
}

export function useDeleteRecurringTemplate() {
  const queryClient = useQueryClient();
  const activeAccountId = useActiveAccountId();
  return useMutation({
    mutationFn: (id: number) =>
      deleteRecurringTemplateApi.deleteRecurringTemplateV1({ accountId: activeAccountId!, id }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['recurringTemplates'] }),
  });
}

export function useQuickAddRecurringTemplate() {
  const queryClient = useQueryClient();
  const activeAccountId = useActiveAccountId();
  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: number;
      body?: PostRecurringTemplateQuickAddV1Request;
    }) =>
      postRecurringTemplateQuickAddApi.postRecurringTemplateQuickAddV1({
        accountId: activeAccountId!,
        id,
        postRecurringTemplateQuickAddV1Request: body,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['recurringTemplates'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      queryClient.invalidateQueries({ queryKey: ['account'] });
    },
  });
}

export function useApplyPendingRecurringTemplates() {
  const queryClient = useQueryClient();
  const activeAccountId = useActiveAccountId();
  return useMutation({
    mutationFn: () =>
      postRecurringTemplatesApplyPendingApi.postRecurringTemplatesApplyPendingV1({
        accountId: activeAccountId!,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recurringTemplates'] });
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      queryClient.invalidateQueries({ queryKey: ['account'] });
    },
  });
}
