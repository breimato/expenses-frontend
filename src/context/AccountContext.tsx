import type { AccountV1 } from '@/api/generated';
import { queryClient } from '@/api/queryClient';
import { getAccountsApi } from '@/api/client';
import { queryKeys } from '@/api/queryKeys';
import { useAuth } from '@/context/AuthContext';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useQuery } from '@tanstack/react-query';

const ACTIVE_ACCOUNT_KEY = 'expenses-active-account-id';

interface AccountContextValue {
  accounts: AccountV1[];
  activeAccount: AccountV1 | null;
  activeAccountId: number | null;
  isLoading: boolean;
  isError: boolean;
  setActiveAccountId: (accountId: number) => void;
  refreshAccounts: () => void;
}

const AccountContext = createContext<AccountContextValue | null>(null);

function readStoredAccountId(): number | null {
  const raw = localStorage.getItem(ACTIVE_ACCOUNT_KEY);
  if (!raw) {
    return null;
  }
  const parsed = Number.parseInt(raw, 10);
  return Number.isNaN(parsed) ? null : parsed;
}

export function AccountProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const userId = user?.id;
  const [activeAccountId, setActiveAccountIdState] = useState<number | null>(() => readStoredAccountId());

  const accountsQuery = useQuery({
    queryKey: queryKeys.accounts(userId ?? 0),
    queryFn: () => getAccountsApi.getAccountsV1(),
    enabled: Boolean(userId),
  });

  const accounts = accountsQuery.data?.accounts ?? [];

  useEffect(() => {
    if (!isAuthenticated) {
      setActiveAccountIdState(null);
      localStorage.removeItem(ACTIVE_ACCOUNT_KEY);
      return;
    }
    if (accounts.length === 0) {
      return;
    }
    const storedId = readStoredAccountId();
    const storedExists = storedId != null && accounts.some((account) => account.id === storedId);
    if (storedExists) {
      setActiveAccountIdState(storedId);
      return;
    }
    const defaultAccount = accounts.find((account) => account.isDefault) ?? accounts[0];
    if (defaultAccount?.id != null) {
      setActiveAccountIdState(defaultAccount.id);
      localStorage.setItem(ACTIVE_ACCOUNT_KEY, String(defaultAccount.id));
    }
  }, [accounts, isAuthenticated]);

  const setActiveAccountId = useCallback((accountId: number) => {
    setActiveAccountIdState(accountId);
    localStorage.setItem(ACTIVE_ACCOUNT_KEY, String(accountId));
    queryClient.invalidateQueries();
  }, []);

  const refreshAccounts = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['accounts'] });
  }, []);

  const activeAccount = useMemo(
    () => accounts.find((account) => account.id === activeAccountId) ?? null,
    [accounts, activeAccountId],
  );

  const value = useMemo(
    () => ({
      accounts,
      activeAccount,
      activeAccountId,
      isLoading: accountsQuery.isLoading,
      isError: accountsQuery.isError,
      setActiveAccountId,
      refreshAccounts,
    }),
    [
      accounts,
      activeAccount,
      activeAccountId,
      accountsQuery.isLoading,
      accountsQuery.isError,
      setActiveAccountId,
      refreshAccounts,
    ],
  );

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export function useAccountContext(): AccountContextValue {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccountContext must be used within AccountProvider');
  }
  return context;
}

export function useActiveAccountId(): number | null {
  return useAccountContext().activeAccountId;
}
