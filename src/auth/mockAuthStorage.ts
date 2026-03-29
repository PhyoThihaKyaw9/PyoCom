import type { AuthUser, StoredUser, UserRole } from "./types";

const USERS_KEY = "pyoe-com-mock-users-v4";
const SESSION_KEY = "pyoe-com-mock-session-v4";

/** Demo: accounts with this normalized phone become `admin` on sign-up. */
export const DEMO_ADMIN_PHONES = new Set(["09900000001"]);

/**
 * Pre-seeded mock admin (created on first app load if missing).
 * Sign in on the Login tab with these exact credentials.
 */
export const MOCK_DEMO_ADMIN = {
  displayName: "Demo Admin",
  phone: "09900000001",
  password: "admin123",
} as const;

/**
 * Ensures a demo admin row exists (and that this phone is always `admin`).
 * Does not change password if an account with this phone already exists.
 */
export function ensureMockDemoAdmin(): void {
  const users = readUsers();
  const phone = normalizePhone(MOCK_DEMO_ADMIN.phone);
  const idx = users.findIndex((u) => u.phone === phone);
  if (idx >= 0) {
    if (users[idx].role !== "admin") {
      const next = [...users];
      next[idx] = { ...next[idx], role: "admin" };
      writeUsers(next);
    }
    return;
  }
  const id =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `demo-admin-${Date.now()}`;
  writeUsers([
    ...users,
    {
      id,
      phone,
      displayName: MOCK_DEMO_ADMIN.displayName,
      password: MOCK_DEMO_ADMIN.password,
      role: "admin",
    },
  ]);
}

function roleForPhone(phone: string): UserRole {
  return DEMO_ADMIN_PHONES.has(phone) ? "admin" : "farmer";
}

function migrateStoredUser(u: Record<string, unknown>): StoredUser | null {
  const id = u.id;
  const phone = u.phone;
  const displayName = u.displayName;
  const password = u.password;
  if (
    typeof id !== "string" ||
    typeof phone !== "string" ||
    typeof displayName !== "string" ||
    typeof password !== "string"
  ) {
    return null;
  }
  const r = u.role;
  const role: UserRole =
    r === "admin" || r === "farmer"
      ? r
      : DEMO_ADMIN_PHONES.has(phone)
        ? "admin"
        : "farmer";
  return { id, phone, displayName, password, role };
}

function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    const users: StoredUser[] = [];
    let dirty = false;
    for (const item of parsed) {
      const m = migrateStoredUser(item as Record<string, unknown>);
      if (!m) continue;
      const prevRole = (item as { role?: unknown }).role;
      if (prevRole !== m.role) dirty = true;
      users.push(m);
    }
    if (dirty) writeUsers(users);
    return users;
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/** Snapshot of mock-auth accounts (farmers vs admins) for admin dashboard. */
export function mockCountUsers(): {
  total: number;
  farmers: number;
  admins: number;
} {
  const users = readUsers();
  let farmers = 0;
  let admins = 0;
  for (const u of users) {
    if (u.role === "admin") admins += 1;
    else farmers += 1;
  }
  return { total: users.length, farmers, admins };
}

/** Strip non-digits for stable matching (e.g. 09-123-456789 vs 09123456789). */
export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

export function isValidPhoneDigits(digits: string): boolean {
  return digits.length >= 8 && digits.length <= 15;
}

/** Trim and collapse spaces; used with toLowerCase() for login matching. */
export function normalizeDisplayName(name: string): string {
  return name.trim().replace(/\s+/g, " ");
}

export function displayNamesMatch(a: string, b: string): boolean {
  return (
    normalizeDisplayName(a).toLowerCase() ===
    normalizeDisplayName(b).toLowerCase()
  );
}

function repairSessionRole(session: AuthUser): AuthUser {
  const users = readUsers();
  const match = users.find((u) => u.id === session.id);
  const role: UserRole = match?.role ?? roleForPhone(session.phone);
  const next: AuthUser = {
    id: session.id,
    phone: session.phone,
    displayName: session.displayName,
    role,
  };
  if (session.role !== next.role) persistSession(next);
  return next;
}

export function getSessionUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const u = JSON.parse(raw) as Partial<AuthUser> & {
      id?: string;
      phone?: string;
      displayName?: string;
    };
    if (!u?.id || !u?.phone || !u?.displayName) return null;
    const base: AuthUser = {
      id: u.id,
      phone: u.phone,
      displayName: u.displayName,
      role:
        u.role === "admin" || u.role === "farmer" ? u.role : "farmer",
    };
    return repairSessionRole(base);
  } catch {
    return null;
  }
}

export function persistSession(user: AuthUser | null) {
  if (!user) localStorage.removeItem(SESSION_KEY);
  else localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

const MIN_PASSWORD_LEN = 6;

export type MockUserSummary = Pick<
  AuthUser,
  "id" | "phone" | "displayName" | "role"
>;

export function mockListUserSummaries(requesterId: string): MockUserSummary[] {
  const users = readUsers();
  const op = users.find((x) => x.id === requesterId);
  if (!op || op.role !== "admin") {
    throw new Error("FORBIDDEN");
  }
  return users.map(({ id, phone, displayName, role }) => ({
    id,
    phone,
    displayName,
    role,
  }));
}

export function mockSetUserRole(
  operatorId: string,
  targetId: string,
  newRole: UserRole
): void {
  const users = readUsers();
  const op = users.find((u) => u.id === operatorId);
  if (!op || op.role !== "admin") {
    throw new Error("FORBIDDEN");
  }
  const idx = users.findIndex((u) => u.id === targetId);
  if (idx < 0) {
    throw new Error("NOT_FOUND");
  }
  if (users[idx].role === "admin" && newRole === "farmer") {
    const adminCount = users.filter((u) => u.role === "admin").length;
    if (adminCount <= 1) {
      throw new Error("LAST_ADMIN");
    }
  }
  users[idx] = { ...users[idx], role: newRole };
  writeUsers(users);

  try {
    const sRaw = localStorage.getItem(SESSION_KEY);
    if (sRaw) {
      const s = JSON.parse(sRaw) as AuthUser;
      if (s?.id === targetId) {
        persistSession({
          id: s.id,
          phone: s.phone,
          displayName: s.displayName,
          role: newRole,
        });
      }
    }
  } catch {
    /* ignore */
  }
}

export function mockSignUp(
  displayName: string,
  phone: string,
  password: string
): AuthUser {
  const nameClean = normalizeDisplayName(displayName);
  if (!nameClean) {
    throw new Error("INVALID_NAME");
  }
  const normalized = normalizePhone(phone);
  if (!isValidPhoneDigits(normalized)) {
    throw new Error("INVALID_PHONE");
  }
  if (password.length < MIN_PASSWORD_LEN) {
    throw new Error("WEAK_PASSWORD");
  }
  const users = readUsers();
  if (users.some((u) => u.phone === normalized)) {
    throw new Error("PHONE_TAKEN");
  }
  const id =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `u-${Date.now()}`;
  const role = roleForPhone(normalized);
  const row: StoredUser = {
    id,
    phone: normalized,
    displayName: nameClean,
    password,
    role,
  };
  writeUsers([...users, row]);
  const session: AuthUser = {
    id: row.id,
    phone: row.phone,
    displayName: row.displayName,
    role: row.role,
  };
  persistSession(session);
  return session;
}

export function mockSignIn(
  displayName: string,
  phone: string,
  password: string
): AuthUser {
  const nameClean = normalizeDisplayName(displayName);
  if (!nameClean || !password) {
    throw new Error("INVALID_CREDENTIALS");
  }
  const normalized = normalizePhone(phone);
  if (!isValidPhoneDigits(normalized)) {
    throw new Error("INVALID_CREDENTIALS");
  }
  const users = readUsers();
  const match = users.find(
    (u) =>
      u.phone === normalized &&
      displayNamesMatch(u.displayName, nameClean) &&
      u.password === password
  );
  if (!match) {
    throw new Error("INVALID_CREDENTIALS");
  }
  const session: AuthUser = {
    id: match.id,
    phone: match.phone,
    displayName: match.displayName,
    role: match.role,
  };
  persistSession(session);
  return session;
}

export function mockSignOut() {
  persistSession(null);
}

export function mockUpdateDisplayName(
  userId: string,
  displayName: string
): AuthUser {
  const nameClean = normalizeDisplayName(displayName);
  if (!nameClean) {
    throw new Error("INVALID_NAME");
  }
  const users = readUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx < 0) {
    throw new Error("NOT_FOUND");
  }
  const next = { ...users[idx], displayName: nameClean };
  users[idx] = next;
  writeUsers(users);
  const session: AuthUser = {
    id: next.id,
    phone: next.phone,
    displayName: next.displayName,
    role: next.role,
  };
  persistSession(session);
  return session;
}

export function mockChangePassword(
  userId: string,
  currentPassword: string,
  newPassword: string
): void {
  if (newPassword.length < MIN_PASSWORD_LEN) {
    throw new Error("WEAK_PASSWORD");
  }
  const users = readUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx < 0) {
    throw new Error("NOT_FOUND");
  }
  if (users[idx].password !== currentPassword) {
    throw new Error("INVALID_CREDENTIALS");
  }
  users[idx] = { ...users[idx], password: newPassword };
  writeUsers(users);
}

/** Clears mock users and session (full reset). Caller should also clear app prefs. */
export function clearMockAuthUsersAndSession() {
  persistSession(null);
  localStorage.removeItem(USERS_KEY);
}
