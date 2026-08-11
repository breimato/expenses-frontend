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
import { useAuth } from '@/context/AuthContext';

export function useCategories(filters?: GetCategoriesV1Request) {
  const { user } = useAuth();
  const userId = user?.id;
  return useQuery({
    queryKey: [...queryKeys.categories(userId ?? 0), filters],
    queryFn: () => getCategoriesApi.getCategoriesV1(filters ?? {}),
    enabled: Boolean(userId),
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: PostCategoryV1Request) => postCategoryApi.postCategoryV1({ postCategoryV1Request: body }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: PatchCategoryV1Request }) =>
      patchCategoryApi.patchCategoryV1({ id, patchCategoryV1Request: body }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteCategoryApi.deleteCategoryV1({ id }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
  });
}
