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

export function useCategories(filters?: GetCategoriesV1Request) {
  return useQuery({
    queryKey: [...queryKeys.categories, filters],
    queryFn: () => getCategoriesApi.getCategoriesV1(filters ?? {}),
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: PostCategoryV1Request) => postCategoryApi.postCategoryV1({ postCategoryV1Request: body }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.categories }),
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: PatchCategoryV1Request }) =>
      patchCategoryApi.patchCategoryV1({ id, patchCategoryV1Request: body }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.categories }),
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteCategoryApi.deleteCategoryV1({ id }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.categories }),
  });
}
