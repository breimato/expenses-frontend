import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { PatchCategoryV1Request, PostCategoryV1Request } from '@/api/generated';
import type { GetCategoriesV1Request } from '@/api/generated/apis/GetCategoriesV1Api';
import {
  deleteCategoryApi,
  getCategoriesApi,
  patchCategoryApi,
  postCategoryApi,
} from '@/api/client';
import { queryKeys } from '@/api/queryKeys';
import { useActiveAccountId } from '@/context/AccountContext';
import { useAuth } from '@/context/AuthContext';

type CategoryFilters = Omit<GetCategoriesV1Request, 'accountId'>;

export function useCategories(filters?: CategoryFilters) {
  const { user } = useAuth();
  const activeAccountId = useActiveAccountId();
  const userId = user?.id;
  return useQuery({
    queryKey: queryKeys.categories(userId ?? 0, activeAccountId ?? 0, filters),
    queryFn: () => getCategoriesApi.getCategoriesV1({ accountId: activeAccountId!, ...filters }),
    enabled: Boolean(userId && activeAccountId),
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  const activeAccountId = useActiveAccountId();
  return useMutation({
    mutationFn: (body: PostCategoryV1Request) =>
      postCategoryApi.postCategoryV1({ accountId: activeAccountId!, postCategoryV1Request: body }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  const activeAccountId = useActiveAccountId();
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: PatchCategoryV1Request }) =>
      patchCategoryApi.patchCategoryV1({ accountId: activeAccountId!, id, patchCategoryV1Request: body }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  const activeAccountId = useActiveAccountId();
  return useMutation({
    mutationFn: (id: number) => deleteCategoryApi.deleteCategoryV1({ accountId: activeAccountId!, id }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
  });
}
