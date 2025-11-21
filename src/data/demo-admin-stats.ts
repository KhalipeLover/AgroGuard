// Admin Dashboard - System Statistics
// Overall system statistics and metrics
// ⚠️ SYNCHRONIZED with demo-data-sync.ts

import { MASTER_CONSTANTS } from './demo-data-sync';

export interface SystemStats {
  totalUsers: number;
  totalDevices: number;
  activeDevices: number;
  dataPoints: number;
  locations: number;
  growthRate: number;
}

export interface RegionalStats {
  region: string;
  devices: number;
  users: number;
  activeRate: number;
}

const systemStatsData: SystemStats = {
  totalUsers: MASTER_CONSTANTS.TOTAL_USERS, // 50
  totalDevices: MASTER_CONSTANTS.TOTAL_DEVICES, // 110
  activeDevices: MASTER_CONSTANTS.ONLINE_DEVICES, // 103
  dataPoints: MASTER_CONSTANTS.TOTAL_DATA_POINTS, // 4,570,000
  locations: MASTER_CONSTANTS.TOTAL_KABUPATEN, // 24
  growthRate: MASTER_CONSTANTS.DEVICE_GROWTH_RATE // 10.4
};

const regionalStatsData: RegionalStats[] = [
  { region: 'Jawa Barat', devices: 28, users: 12, activeRate: 96 },
  { region: 'Jawa Timur', devices: 25, users: 10, activeRate: 94 },
  { region: 'Jawa Tengah', devices: 22, users: 9, activeRate: 91 },
  { region: 'DKI Jakarta', devices: 18, users: 7, activeRate: 98 },
  { region: 'DIY', devices: 12, users: 4, activeRate: 92 },
  { region: 'Bali', devices: 8, users: 3, activeRate: 88 },
  { region: 'Sumatera', devices: 10, users: 2, activeRate: 85 },
  { region: 'Kalimantan', devices: 4, users: 1, activeRate: 75 }
];

/**
 * Fetches system-wide statistics (admin view)
 * @param delay - Simulated network delay in milliseconds
 * @returns Promise<SystemStats>
 */
export async function fetchSystemStats(delay: number = 400): Promise<SystemStats> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(systemStatsData), delay);
  });
}

/**
 * Fetches regional statistics breakdown
 * @param delay - Simulated network delay in milliseconds
 * @returns Promise<RegionalStats[]>
 */
export async function fetchRegionalStats(delay: number = 400): Promise<RegionalStats[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(regionalStatsData), delay);
  });
}

/**
 * Calculates device online percentage
 * @returns number
 */
export function calculateOnlinePercentage(): number {
  return Math.round((systemStatsData.activeDevices / systemStatsData.totalDevices) * 100);
}

export {
  systemStatsData as defaultSystemStats,
  regionalStatsData as defaultRegionalStats
};
