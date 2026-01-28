import { getUsers } from '../data/users';

const AUTH_STORAGE_KEY = 'lendsqr_auth';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

/**
 * Login with email and password
 */
export const login = (email: string, password: string): AuthUser | null => {
  const users = getUsers();
  const demoPassword = import.meta.env.VITE_DEMO_PASSWORD || "password123";
  
  // Find user by email
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  // Validate password (all users share demo password)
  if (!user || user.password !== demoPassword) {
    return null;
  }
  
  const authUser: AuthUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
  
  // Store auth in localStorage
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));
  
  return authUser;
};

/**
 * Logout current user
 */
export const logout = (): void => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

/**
 * Get current authenticated user
 */
export const getCurrentUser = (): AuthUser | null => {
  const stored = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!stored) return null;
  
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

/**
 * Check if current user is admin
 */
export const isAdmin = (): boolean => {
  const user = getCurrentUser();
  return user?.role === 'admin';
};
