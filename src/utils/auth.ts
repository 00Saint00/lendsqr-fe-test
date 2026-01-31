import { getUsers } from '../data/users';

const AUTH_STORAGE_KEY = 'lendsqr_auth';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  avatar: string;
}

export const login = (email: string, _password: string): AuthUser | null => {
  const users = getUsers();
  const demoPassword = process.env.VITE_DEMO_PASSWORD || "password123";
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user || user.password !== demoPassword || _password !== demoPassword) {
    return null;
  }
  
  const authUser: AuthUser = {
    id: user.id,
    avatar: user.avatar || "/images/avatar.svg",
    email: user.email,
    name: user.name,
    role: user.role,
  };
  
  // Store auth in localStorage
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));
  
  return authUser;
};

export const logout = (): void => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

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

export const isAdmin = (): boolean => {
  const user = getCurrentUser();
  return user?.role === 'admin';
};
