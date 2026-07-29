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

export function useRecurringTemplates(filters?: GetRecurringTemplatesV1Request) {
  return useQuery({
    queryKey: queryKeys.recurringTemplates(filters),
    queryFn: () => getRecurringTemplatesApi.getRecurringTemplatesV1(filters ?? {}),
  });
}

export function useCreateRecurringTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: PostRecurringTemplateV1Request) =>
      postRecurringTemplateApi.postRecurringTemplateV1({ postRecurringTemplateV1Request: body }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['recurringTemplates'] }),
  });
}

export function useUpdateRecurringTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: PatchRecurringTemplateV1Request }) =>
      patchRecurringTemplateApi.patchRecurringTemplateV1({ id, patchRecurringTemplateV1Request: body }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['recurringTemplates'] }),
  });
}

export function useDeleteRecurringTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteRecurringTemplateApi.deleteRecurringTemplateV1({ id }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['recurringTemplates'] }),
  });
}

export function useQuickAddRecurringTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: number;
      body?: PostRecurringTemplateQuickAddV1Request;
    }) =>
      postRecurringTemplateQuickAddApi.postRecurringTemplateQuickAddV1({
        id,
        postRecurringTemplateQuickAddV1Request: body,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['recurringTemplates'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
      queryClient.invalidateQueries({ queryKey: queryKeys.profile });
    },
  });
}

export function useApplyPendingRecurringTemplates() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => postRecurringTemplatesApplyPendingApi.postRecurringTemplatesApplyPendingV1(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recurringTemplates'] });
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
      queryClient.invalidateQueries({ queryKey: queryKeys.profile });
    },
  });
}
