export type UserRole = "farmer" | "admin";

export interface AuthUser {
  id: string;
  /** Digits-only normalized phone */
  phone: string;
  displayName: string;
  role: UserRole;
}

export interface StoredUser extends AuthUser {
  password: string;
}
