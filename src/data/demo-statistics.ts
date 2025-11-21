/**
 * Demo Statistics Data
 * ⚠️ SYNCHRONIZED with demo-data-sync.ts
 * 
 * Landing page hero statistics
 * Uses real data from master constants
 */

import { MASTER_CONSTANTS, CALCULATED_VALUES } from './demo-data-sync';

export interface Statistic {
  value: string;
  label: string;
  icon: string; // Icon name from lucide-react
}

// Synchronized with master data
const statisticsData: Statistic[] = [
  { 
    value: `${MASTER_CONSTANTS.TOTAL_DEVICES}`, 
    label: 'Device Terpasang', 
    icon: 'Wifi' 
  },
  { 
    value: `${MASTER_CONSTANTS.TOTAL_USERS}`, 
    label: 'Pengguna Aktif', 
    icon: 'Users' 
  },
  { 
    value: `${MASTER_CONSTANTS.TOTAL_KABUPATEN}`, 
    label: 'Kota & Kabupaten', 
    icon: 'MapPin' 
  },
  { 
    value: `${CALCULATED_VALUES.onlinePercentage}%`, 
    label: 'Device Online', 
    icon: 'Activity' 
  }
];

/**
 * Simulates API call to fetch statistics
 * @param delay Optional delay in milliseconds (default: 300ms)
 * @returns Promise<Statistic[]>
 */
export async function fetchStatistics(delay: number = 300): Promise<Statistic[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(statisticsData);
    }, delay);
  });
}

export default statisticsData;
