/**
 * Admin Analytics Data
 * Provides monthly growth and device status data for admin analytics
 * ⚠️ SYNCHRONIZED with demo-data-sync.ts
 * 
 * @module demo-admin-analytics
 * @category Admin Dashboard Data
 */

import { MONTHLY_GROWTH_TIMELINE, MASTER_CONSTANTS } from './demo-data-sync';

// Monthly Growth Data Interface
export interface MonthlyGrowthData {
  month: string;
  users: number;
  devices: number;
}

// Device Status Distribution Interface
export interface DeviceStatusData {
  name: string;
  value: number;
}

// Performance Summary Interface
export interface PerformanceSummary {
  avgTemperature: number;
  avgSoilMoisture: number;
  totalWaterUsage: number;
  unit: string;
}

// Analytics Data Interface
export interface AnalyticsData {
  monthlyGrowth: MonthlyGrowthData[];
  deviceStatus: DeviceStatusData[];
  performance: PerformanceSummary;
}

// Monthly growth data (last 5 months) - SYNCED
const monthlyGrowthData: MonthlyGrowthData[] = MONTHLY_GROWTH_TIMELINE.map(({ month, users, devices }) => ({
  month,
  users,
  devices
}));

// Device status distribution - SYNCED
const deviceStatusData: DeviceStatusData[] = [
  { name: 'Online', value: MASTER_CONSTANTS.ONLINE_DEVICES }, // 103
  { name: 'Offline', value: MASTER_CONSTANTS.OFFLINE_DEVICES }, // 7
];

// Performance summary
const performanceSummary: PerformanceSummary = {
  avgTemperature: 27.8,
  avgSoilMoisture: 45.2,
  totalWaterUsage: 2847,
  unit: 'L'
};

/**
 * Fetch complete analytics data
 * Simulates API call with network delay
 * 
 * @param delay - Delay in milliseconds (default: 400ms)
 * @returns Promise resolving to analytics data
 */
export async function fetchAnalyticsData(delay: number = 400): Promise<AnalyticsData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        monthlyGrowth: monthlyGrowthData,
        deviceStatus: deviceStatusData,
        performance: performanceSummary
      });
    }, delay);
  });
}

/**
 * Fetch monthly growth data only
 * 
 * @param delay - Delay in milliseconds (default: 300ms)
 * @returns Promise resolving to monthly growth data
 */
export async function fetchMonthlyGrowth(delay: number = 300): Promise<MonthlyGrowthData[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(monthlyGrowthData), delay);
  });
}

/**
 * Fetch device status distribution only
 * 
 * @param delay - Delay in milliseconds (default: 300ms)
 * @returns Promise resolving to device status data
 */
export async function fetchDeviceStatus(delay: number = 300): Promise<DeviceStatusData[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(deviceStatusData), delay);
  });
}

/**
 * Fetch performance summary only
 * 
 * @param delay - Delay in milliseconds (default: 300ms)
 * @returns Promise resolving to performance summary
 */
export async function fetchPerformanceSummary(delay: number = 300): Promise<PerformanceSummary> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(performanceSummary), delay);
  });
}

// Default export for direct import
export default {
  monthlyGrowth: monthlyGrowthData,
  deviceStatus: deviceStatusData,
  performance: performanceSummary
};
