/**
 * Demo Login Users
 * Pre-configured user accounts for testing and demonstration
 * These users are automatically seeded to localStorage on app initialization
 */

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  location: string;
  deviceId: string;
  createdAt: string;
}

/**
 * 10 Demo Users with Different Profiles
 * Each user has unique credentials and profile data
 */
/**
 * ⚠️ IMPORTANT: SYNCED WITH ADMIN DATA!
 * These 10 demo users are a SUBSET of the 50 users in demo-admin-users-50-unique.ts
 * Email format: @user.id (matches admin data)
 * Device IDs: Match actual devices in demo-admin-devices-110.ts
 */
export const demoUsers: DemoUser[] = [
  {
    id: 'user-001',
    name: 'Budi Santoso',
    email: 'budi.santoso@user.id', // ✅ SYNCED with admin user #1
    password: 'demo123',
    phone: '+62 832-2850-4741',
    location: 'Kec. Dau, Kab. Malang',
    deviceId: 'MAL001', // Device #1 in admin devices
    createdAt: '2024-09-04T17:51:37Z'
  },
  {
    id: 'user-002',
    name: 'Siti Aminah',
    email: 'siti.aminah@user.id', // ✅ SYNCED with admin user #2
    password: 'demo123',
    phone: '+62 840-7592-8057',
    location: 'Kec. Ambulu, Kab. Jember',
    deviceId: 'JEM004', // Device #4 in admin devices
    createdAt: '2024-01-19T15:11:13Z'
  },
  {
    id: 'user-003',
    name: 'Ahmad Hidayat',
    email: 'ahmad.hidayat@user.id', // ✅ SYNCED with admin user #3
    password: 'demo123',
    phone: '+62 842-3988-7140',
    location: 'Kec. Wonokromo, Kota Surabaya',
    deviceId: 'SUR005', // Device #5 in admin devices
    createdAt: '2024-04-12T03:40:11Z'
  },
  {
    id: 'user-004',
    name: 'Rina Kusuma',
    email: 'rina.kusuma@user.id', // ✅ SYNCED with admin user #4
    password: 'demo123',
    phone: '+62 876-5858-5235',
    location: 'Kec. Genteng, Kab. Banyuwangi',
    deviceId: 'BAN008', // Device #8 in admin devices
    createdAt: '2024-07-04T12:52:27Z'
  },
  {
    id: 'user-005',
    name: 'Dedi Kurniawan',
    email: 'dedi.kurniawan@user.id', // ✅ SYNCED with admin user #5
    password: 'demo123',
    phone: '+62 855-9118-8722',
    location: 'Kec. Babat, Kab. Lamongan',
    deviceId: 'LAM010', // Device #10 in admin devices
    createdAt: '2024-07-21T14:22:17Z'
  },
  {
    id: 'user-006',
    name: 'Wahyu Prasetyo',
    email: 'wahyu.prasetyo@user.id', // ✅ SYNCED with admin user #6
    password: 'demo123',
    phone: '+62 897-7244-6248',
    location: 'Kec. Kalitidu, Kab. Bojonegoro',
    deviceId: 'BOJ013', // Device #13 in admin devices
    createdAt: '2024-06-02T06:04:54Z'
  },
  {
    id: 'user-007',
    name: 'Indah Pertiwi',
    email: 'indah.pertiwi@user.id', // ✅ SYNCED with admin user #7
    password: 'demo123',
    phone: '+62 831-5566-7788',
    location: 'Kec. Waru, Kab. Sidoarjo',
    deviceId: 'SID015', // Device #15 in admin devices
    createdAt: '2024-08-26T12:00:00Z'
  },
  {
    id: 'user-008',
    name: 'Agus Setiawan',
    email: 'agus.setiawan@user.id', // ✅ SYNCED with admin user #8
    password: 'demo123',
    phone: '+62 832-6677-8899',
    location: 'Kec. Trawas, Kab. Mojokerto',
    deviceId: 'MOJ017', // Device #17 in admin devices
    createdAt: '2024-07-03T10:00:00Z'
  },
  {
    id: 'user-009',
    name: 'Lestari Wulandari',
    email: 'lestari.wulandari@user.id', // ✅ SYNCED with admin user #9
    password: 'demo123',
    phone: '+62 833-7788-9900',
    location: 'Kec. Tosari, Kab. Pasuruan',
    deviceId: 'PAS018', // Device #18 in admin devices
    createdAt: '2024-05-26T14:00:00Z'
  },
  {
    id: 'user-010',
    name: 'Bambang Susilo',
    email: 'bambang.susilo@user.id', // ✅ SYNCED with admin user #10
    password: 'demo123',
    phone: '+62 834-8899-0011',
    location: 'Kec. Senduro, Kab. Lumajang',
    deviceId: 'LUM021', // Device #21 in admin devices
    createdAt: '2024-02-15T08:00:00Z'
  }
];

/**
 * Seed demo users to localStorage
 * Called on app initialization to ensure users are always available
 */
export function seedDemoUsersToLocalStorage(): void {
  try {
    // Check if users already exist in localStorage
    const existingUsers = localStorage.getItem('agroguard_users');
    
    if (!existingUsers) {
      // No users exist, seed all demo users
      localStorage.setItem('agroguard_users', JSON.stringify(demoUsers));
      // Seeded demo users successfully
    } else {
      // Users exist, merge with demo users (avoid duplicates)
      const currentUsers = JSON.parse(existingUsers);
      const currentEmails = new Set(currentUsers.map((u: DemoUser) => u.email));
      
      const newUsers = demoUsers.filter(user => !currentEmails.has(user.email));
      
      if (newUsers.length > 0) {
        const mergedUsers = [...currentUsers, ...newUsers];
        localStorage.setItem('agroguard_users', JSON.stringify(mergedUsers));
        // Added new demo users successfully
      } else {
        // Demo users already exist
      }
    }
  } catch {
    // Silent fail - users data will stay at default
  }
}

/**
 * Get demo user by email (for quick testing)
 */
export function getDemoUserByEmail(email: string): DemoUser | undefined {
  return demoUsers.find(user => user.email === email);
}

/**
 * Get all demo user emails (for display in login page)
 */
export function getDemoUserEmails(): string[] {
  return demoUsers.map(user => user.email);
}

/**
 * Verify demo user credentials
 */
export function verifyDemoUser(email: string, password: string): DemoUser | null {
  const user = demoUsers.find(u => u.email === email && u.password === password);
  return user || null;
}

/**
 * Get demo user credentials for display
 */
export function getDemoCredentials(): Array<{ email: string; password: string; name: string }> {
  return demoUsers.slice(0, 5).map(user => ({
    email: user.email,
    password: user.password,
    name: user.name
  }));
}

// Export default
export default demoUsers;
