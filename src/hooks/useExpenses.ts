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
import { useAuth } from '@/context/AuthContext';

export function useExpenses(filters?: GetExpensesV1Request) {
  const { user } = useAuth();
  const userId = user?.id;
  return useQuery({
    queryKey: queryKeys.expenses(userId ?? 0, filters),
    queryFn: () => getExpensesApi.getExpensesV1(filters ?? {}),
    enabled: Boolean(userId),
  });
}

export function useCreateExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: PostExpenseV1Request) => postExpenseApi.postExpenseV1({ postExpenseV1Request: body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
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
      queryClient.invalidateQueries({ queryKey: ['profile'] });
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
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}
