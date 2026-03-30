import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AuthUser, UserRole } from "./types";
import {
  clearMockAuthUsersAndSession,
  ensureMockDemoAdmin,
  getSessionUser,
  mockSetUserRole,
  mockSignOut,
  mockSignUp,
  mockUpdateDisplayName,
} from "./mockAuthStorage";

type AuthContextValue = {
  user: AuthUser | null;
  ready: boolean;
  signUp: (displayName: string, phone: string) => Promise<AuthUser>;
  signOut: () => void;
  updateDisplayName: (displayName: string) => Promise<AuthUser>;
  setUserRole: (targetUserId: string, role: UserRole) => Promise<void>;
  /** Removes all mock accounts and session. UI should call signOut after. */
  clearAllLocalAccounts: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    ensureMockDemoAdmin();
    setUser(getSessionUser());
    setReady(true);
  }, []);

  const signUpFn = useCallback(
    async (displayName: string, phone: string) => {
      const session = mockSignUp(displayName, phone);
      setUser(session);
      return session;
    },
    []
  );

  const signOutFn = useCallback(() => {
    mockSignOut();
    setUser(null);
  }, []);

  const updateDisplayNameFn = useCallback(async (displayName: string) => {
    if (!user) {
      throw new Error("NOT_FOUND");
    }
    const session = mockUpdateDisplayName(user.id, displayName);
    setUser(session);
    return session;
  }, [user]);

  const setUserRoleFn = useCallback(
    async (targetUserId: string, role: UserRole) => {
      if (!user) {
        throw new Error("NOT_FOUND");
      }
      mockSetUserRole(user.id, targetUserId, role);
      const next = getSessionUser();
      if (next) setUser(next);
    },
    [user]
  );

  const clearAllLocalAccountsFn = useCallback(() => {
    clearMockAuthUsersAndSession();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      ready,
      signUp: signUpFn,
      signOut: signOutFn,
      updateDisplayName: updateDisplayNameFn,
      setUserRole: setUserRoleFn,
      clearAllLocalAccounts: clearAllLocalAccountsFn,
    }),
    [
      user,
      ready,
      signUpFn,
      signOutFn,
      updateDisplayNameFn,
      setUserRoleFn,
      clearAllLocalAccountsFn,
    ]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}