/**
 * Authentication Helper Functions
 * Utility functions for managing localStorage authentication data
 */

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'user';
  devices: string[];
  location: string;
  wifiSSID: string;
  createdAt: string;
}

/**
 * Get all registered users from localStorage
 */
export const getRegisteredUsers = (): StoredUser[] => {
  try {
    const users = localStorage.getItem('agroguard_users');
    return users ? JSON.parse(users) : [];
  } catch {
    return [];
  }
};

/**
 * Save a new user to localStorage
 */
export const saveUser = (user: StoredUser): boolean => {
  try {
    const users = getRegisteredUsers();
    users.push(user);
    localStorage.setItem('agroguard_users', JSON.stringify(users));
    return true;
  } catch {
    return false;
  }
};

/**
 * Check if email already exists
 */
export const emailExists = (email: string): boolean => {
  const users = getRegisteredUsers();
  return users.some(u => u.email.toLowerCase() === email.toLowerCase());
};

/**
 * Get user by email and password
 */
export const getUserByCredentials = (email: string, password: string): StoredUser | null => {
  const users = getRegisteredUsers();
  return users.find(u => u.email === email && u.password === password) || null;
};

/**
 * Get currently logged in user from localStorage
 */
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem('agroguard_user');
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

/**
 * Save current logged in user to localStorage
 */
export const setCurrentUser = (user: any): boolean => {
  try {
    localStorage.setItem('agroguard_user', JSON.stringify(user));
    return true;
  } catch {
    return false;
  }
};

/**
 * Clear current user session (logout)
 */
export const clearCurrentUser = (): void => {
  localStorage.removeItem('agroguard_user');
};

/**
 * Clear all authentication data (for testing/demo purposes)
 */
export const clearAllAuthData = (): void => {
  localStorage.removeItem('agroguard_user');
  localStorage.removeItem('agroguard_users');
};

/**
 * Seed demo users for testing (for development only)
 */
export const seedDemoUsers = (): void => {
  const demoUsers: StoredUser[] = [
    {
      id: 'demo-user-001',
      name: 'Demo User',
      email: 'demo@agroguard.com',
      password: 'demo123',
      role: 'user',
      devices: ['AGROGUARD_AP_DEMO01'],
      location: '-6.200000, 106.816666',
      wifiSSID: 'DemoWiFi',
      createdAt: new Date().toISOString()
    }
  ];
  
  localStorage.setItem('agroguard_users', JSON.stringify(demoUsers));
  // Demo users seeded successfully
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 */
export const validatePassword = (password: string): { valid: boolean; message: string } => {
  if (password.length < 6) {
    return { valid: false, message: 'Password minimal 6 karakter' };
  }
  if (password.length > 50) {
    return { valid: false, message: 'Password maksimal 50 karakter' };
  }
  return { valid: true, message: 'Password valid' };
};

/**
 * Get user count statistics
 */
export const getUserStats = () => {
  const users = getRegisteredUsers();
  return {
    totalUsers: users.length,
    totalDevices: users.reduce((acc, user) => acc + user.devices.length, 0),
    recentUsers: users.filter(u => {
      const createdDate = new Date(u.createdAt);
      const daysSinceCreation = (Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24);
      return daysSinceCreation <= 7;
    }).length
  };
};
