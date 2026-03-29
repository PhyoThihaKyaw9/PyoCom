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
  mockChangePassword,
  mockSetUserRole,
  mockSignIn,
  mockSignOut,
  mockSignUp,
  mockUpdateDisplayName,
} from "./mockAuthStorage";

type AuthContextValue = {
  user: AuthUser | null;
  ready: boolean;
  signIn: (
    displayName: string,
    phone: string,
    password: string
  ) => Promise<AuthUser>;
  signUp: (
    displayName: string,
    phone: string,
    password: string
  ) => Promise<AuthUser>;
  signOut: () => void;
  updateDisplayName: (displayName: string) => Promise<AuthUser>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
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

  const signInFn = useCallback(
    async (displayName: string, phone: string, password: string) => {
      const session = mockSignIn(displayName, phone, password);
      setUser(session);
      return session;
    },
    []
  );

  const signUpFn = useCallback(
    async (displayName: string, phone: string, password: string) => {
      const session = mockSignUp(displayName, phone, password);
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

  const changePasswordFn = useCallback(
    async (currentPassword: string, newPassword: string) => {
      if (!user) {
        throw new Error("NOT_FOUND");
      }
      mockChangePassword(user.id, currentPassword, newPassword);
    },
    [user]
  );

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
      signIn: signInFn,
      signUp: signUpFn,
      signOut: signOutFn,
      updateDisplayName: updateDisplayNameFn,
      changePassword: changePasswordFn,
      setUserRole: setUserRoleFn,
      clearAllLocalAccounts: clearAllLocalAccountsFn,
    }),
    [
      user,
      ready,
      signInFn,
      signUpFn,
      signOutFn,
      updateDisplayNameFn,
      changePasswordFn,
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