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
import { useActiveAccountId } from '@/context/AccountContext';
import { useAuth } from '@/context/AuthContext';

type ExpenseFilters = Omit<GetExpensesV1Request, 'accountId'>;

export function useExpenses(filters?: ExpenseFilters) {
  const { user } = useAuth();
  const activeAccountId = useActiveAccountId();
  const userId = user?.id;
  return useQuery({
    queryKey: queryKeys.expenses(userId ?? 0, activeAccountId ?? 0, filters),
    queryFn: () => getExpensesApi.getExpensesV1({ accountId: activeAccountId!, ...filters }),
    enabled: Boolean(userId && activeAccountId),
  });
}

export function useCreateExpense() {
  const queryClient = useQueryClient();
  const activeAccountId = useActiveAccountId();
  return useMutation({
    mutationFn: (body: PostExpenseV1Request) =>
      postExpenseApi.postExpenseV1({ accountId: activeAccountId!, postExpenseV1Request: body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      queryClient.invalidateQueries({ queryKey: ['account'] });
    },
  });
}

export function useUpdateExpense() {
  const queryClient = useQueryClient();
  const activeAccountId = useActiveAccountId();
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: PatchExpenseV1Request }) =>
      patchExpenseApi.patchExpenseV1({ accountId: activeAccountId!, id, patchExpenseV1Request: body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      queryClient.invalidateQueries({ queryKey: ['account'] });
    },
  });
}

export function useDeleteExpense() {
  const queryClient = useQueryClient();
  const activeAccountId = useActiveAccountId();
  return useMutation({
    mutationFn: (id: number) => deleteExpenseApi.deleteExpenseV1({ accountId: activeAccountId!, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      queryClient.invalidateQueries({ queryKey: ['account'] });
    },
  });
}
