import { faker } from "@faker-js/faker";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  avatar: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';
  dateJoined: Date;
  password: string;
  role: 'admin' | 'user';
  organization: string;
}

const STORAGE_KEY = 'lendsqr_users';

/**
 * Pure factory function to generate users
 * Does NOT seed faker - seeding happens externally
 */
// localStorage.removeItem(STORAGE_KEY);
export const generateUsers = (count: number = 100): User[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    organization: faker.company.name(),
    // email: faker.internet.email(),
    email: index === 0 ? "admin@lendsqr.com" : faker.internet.email(),
    phone: faker.phone.number(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zip: faker.location.zipCode(),
    avatar: faker.image.avatar(),
    status: faker.helpers.arrayElement(['Active', 'Inactive', 'Pending', 'Blacklisted']),
    dateJoined: faker.date.past(),
    password: import.meta.env.VITE_DEMO_PASSWORD,
    role: index === 0 ? "admin" : "user", // First user is admin
  }));
};

/**
 * Get users from localStorage or generate and persist them
 * Seeds faker only once when storage is empty
 */
export const getUsers = (): User[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  
  if (stored) {
    try {
      const users = JSON.parse(stored);
      // Convert dateJoined back to Date objects
      return users.map((user: User) => ({
        ...user,
        dateJoined: new Date(user.dateJoined),
      }));
    } catch (error) {
      console.error('Error parsing stored users:', error);
      // Fall through to generate new users
    }
  }

  // Storage is empty - seed faker and generate users
  faker.seed(123);
  const users = generateUsers(100);
  
  // Persist to localStorage (convert dates to strings)
  const usersForStorage = users.map(user => ({
    ...user,
    dateJoined: user.dateJoined.toISOString(),
  }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usersForStorage));
  
  return users;
};

/**
 * Save users to localStorage
 */
export const saveUsers = (users: User[]): void => {
  const usersForStorage = users.map(user => ({
    ...user,
    dateJoined: user.dateJoined instanceof Date 
      ? user.dateJoined.toISOString() 
      : user.dateJoined,
  }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usersForStorage));
};

/**
 * Update a user by ID
 */
export const updateUser = (userId: string, updates: Partial<User>): User | null => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === userId);
  
  if (index === -1) return null;
  
  users[index] = { ...users[index], ...updates };
  saveUsers(users);
  
  return users[index];
};

/**
 * Delete a user by ID
 */
export const deleteUser = (userId: string): boolean => {
  const users = getUsers();
  const filtered = users.filter(u => u.id !== userId);
  
  if (filtered.length === users.length) return false;
  
  saveUsers(filtered);
  return true;
};

/**
 * Add a new user
 */
export const addUser = (userData: Omit<User, 'id' | 'dateJoined'>): User => {
  const users = getUsers();
  const newUser: User = {
    ...userData,
    id: faker.string.uuid(),
    dateJoined: new Date(),
  };
  
  users.push(newUser);
  saveUsers(users);
  
  return newUser;
};
