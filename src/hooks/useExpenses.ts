import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { PatchExpenseV1Request, PostExpenseV1Request } from '@/api/generated';
import type { GetExpensesV1Request } from '@/api/generated/apis/GetExpensesV1Api';
import {
  deleteExpenseApi,
  getExpensesApi,
  patchExpenseApi,
  postExpenseApi,
} from '@/api/client';
import { queryKeys } from '@/api/queryKeys';

export function useExpenses(filters?: GetExpensesV1Request) {
  return useQuery({
    queryKey: queryKeys.expenses(filters),
    queryFn: () => getExpensesApi.getExpensesV1(filters ?? {}),
  });
}

export function useCreateExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: PostExpenseV1Request) => postExpenseApi.postExpenseV1({ postExpenseV1Request: body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
      queryClient.invalidateQueries({ queryKey: queryKeys.profile });
    },
  });
}

export function useUpdateExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: PatchExpenseV1Request }) =>
      patchExpenseApi.patchExpenseV1({ id, patchExpenseV1Request: body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
      queryClient.invalidateQueries({ queryKey: queryKeys.profile });
    },
  });
}

export function useDeleteExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteExpenseApi.deleteExpenseV1({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
      queryClient.invalidateQueries({ queryKey: queryKeys.profile });
    },
  });
}
