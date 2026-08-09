import type { AuthUserV1, AuthV1Response } from '@/api/generated';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

const TOKEN_KEY = 'expenses-access-token';
const USER_KEY = 'expenses-auth-user';

interface AuthContextValue {
  accessToken: string | null;
  user: AuthUserV1 | null;
  isAuthenticated: boolean;
  setSession: (authV1Response: AuthV1Response) => void;
  clearSession: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

function readStoredUser(): AuthUserV1 | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as AuthUserV1;
  } catch {
    return null;
  }
}

export function getAccessToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearStoredSession(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(() => readStoredToken());
  const [user, setUser] = useState<AuthUserV1 | null>(() => readStoredUser());

  const setSession = useCallback((authV1Response: AuthV1Response) => {
    localStorage.setItem(TOKEN_KEY, authV1Response.accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(authV1Response.user));
    setAccessToken(authV1Response.accessToken);
    setUser(authV1Response.user);
  }, []);

  const clearSession = useCallback(() => {
    clearStoredSession();
    setAccessToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      accessToken,
      user,
      isAuthenticated: Boolean(accessToken),
      setSession,
      clearSession,
    }),
    [accessToken, user, setSession, clearSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
