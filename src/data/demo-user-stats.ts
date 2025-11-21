// User Dashboard - Quick Stats
// User dashboard quick statistics and metrics

export interface QuickStat {
  label: string;
  value: string;
  icon: string;
  bgColor: string;
  iconColor: string;
}

export interface DeviceInfo {
  deviceId: string;
  status: 'online' | 'offline';
  lastUpdate: string;
  firmware: string;
}

export interface WeeklyTemperature {
  minimum: number;
  average: number;
  maximum: number;
}

export interface WaterUsage {
  total: number;
  unit: string;
  target: number;
  percentage: number;
}

export interface SensorPerformance {
  uptime: string;
  accuracy: string;
  response: string;
  readings: string;
}

const quickStatsData: QuickStat[] = [
  {
    label: 'Uptime',
    value: '23.8h',
    icon: 'Power',
    bgColor: 'bg-green-100 dark:bg-green-950/50',
    iconColor: 'text-green-600 dark:text-green-400'
  },
  {
    label: 'Data Points',
    value: '1,440',
    icon: 'BarChart3',
    bgColor: 'bg-blue-100 dark:bg-blue-950/50',
    iconColor: 'text-blue-600 dark:text-blue-400'
  },
  {
    label: 'Irigasi',
    value: 'Auto',
    icon: 'Droplet',
    bgColor: 'bg-cyan-100 dark:bg-cyan-950/50',
    iconColor: 'text-cyan-600 dark:text-cyan-400'
  },
  {
    label: 'Efisiensi',
    value: '94%',
    icon: 'TrendingUp',
    bgColor: 'bg-emerald-100 dark:bg-emerald-950/50',
    iconColor: 'text-emerald-600 dark:text-emerald-400'
  }
];

const deviceInfoData: DeviceInfo = {
  deviceId: 'AGROGUARD_A1B2C3',
  status: 'online',
  lastUpdate: '2 detik lalu',
  firmware: 'v2.1.5'
};

const weeklyTemperatureData: WeeklyTemperature = {
  minimum: 22.5,
  average: 27.8,
  maximum: 32.1
};

const waterUsageData: WaterUsage = {
  total: 245,
  unit: 'L',
  target: 300,
  percentage: 82
};

const sensorPerformanceData: SensorPerformance = {
  uptime: '99.8%',
  accuracy: '98.5%',
  response: '1.2s',
  readings: '28.4K'
};

/**
 * Fetches quick stats for user dashboard
 * @param delay - Simulated network delay in milliseconds
 * @returns Promise<QuickStat[]>
 */
export async function fetchQuickStats(delay: number = 300): Promise<QuickStat[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(quickStatsData), delay);
  });
}

/**
 * Fetches device information
 * ✅ Updated to support device-specific data
 * 
 * @param deviceId - Optional device ID for specific device info
 * @param delay - Simulated network delay in milliseconds
 * @returns Promise<DeviceInfo>
 */
export async function fetchDeviceInfo(deviceId?: string, delay: number = 300): Promise<DeviceInfo> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (deviceId) {
        // Return device-specific info
        resolve({
          deviceId: deviceId,
          status: Math.random() > 0.1 ? 'online' : 'offline',
          lastUpdate: Math.floor(Math.random() * 60) + ' detik lalu',
          firmware: 'v2.1.' + Math.floor(Math.random() * 10)
        });
      } else {
        resolve(deviceInfoData);
      }
    }, delay);
  });
}

/**
 * Fetches device-specific quick stats
 * ✅ NEW: Device-specific statistics
 * 
 * @param deviceId - Device ID
 * @returns Promise<QuickStat[]>
 */
export async function fetchDeviceQuickStats(deviceId: string, delay: number = 300): Promise<QuickStat[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate realistic device-specific stats
      const uptime = (20 + Math.random() * 4).toFixed(1);
      const dataPoints = Math.floor(1200 + Math.random() * 500);
      const efficiency = (90 + Math.random() * 9).toFixed(0);
      
      resolve([
        {
          label: 'Uptime',
          value: `${uptime}h`,
          icon: 'Power',
          bgColor: 'bg-green-100 dark:bg-green-950/50',
          iconColor: 'text-green-600 dark:text-green-400'
        },
        {
          label: 'Data Points',
          value: dataPoints.toLocaleString('id-ID'),
          icon: 'BarChart3',
          bgColor: 'bg-blue-100 dark:bg-blue-950/50',
          iconColor: 'text-blue-600 dark:text-blue-400'
        },
        {
          label: 'Irigasi',
          value: 'Auto',
          icon: 'Droplet',
          bgColor: 'bg-cyan-100 dark:bg-cyan-950/50',
          iconColor: 'text-cyan-600 dark:text-cyan-400'
        },
        {
          label: 'Efisiensi',
          value: `${efficiency}%`,
          icon: 'TrendingUp',
          bgColor: 'bg-emerald-100 dark:bg-emerald-950/50',
          iconColor: 'text-emerald-600 dark:text-emerald-400'
        }
      ]);
    }, delay);
  });
}

/**
 * Fetches weekly temperature statistics
 * ✅ Updated to support device-specific data
 * 
 * @param deviceId - Optional device ID for specific device stats
 * @param delay - Simulated network delay in milliseconds
 * @returns Promise<WeeklyTemperature>
 */
export async function fetchWeeklyTemperature(deviceId?: string, delay: number = 300): Promise<WeeklyTemperature> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (deviceId) {
        // Generate device-specific temperature stats
        const avg = 25 + Math.random() * 8;
        resolve({
          minimum: avg - 3 - Math.random() * 2,
          average: avg,
          maximum: avg + 3 + Math.random() * 2
        });
      } else {
        resolve(weeklyTemperatureData);
      }
    }, delay);
  });
}

/**
 * Fetches water usage data
 * ✅ Updated to support device-specific data
 * 
 * @param deviceId - Optional device ID for specific device stats
 * @param delay - Simulated network delay in milliseconds
 * @returns Promise<WaterUsage>
 */
export async function fetchWaterUsage(deviceId?: string, delay: number = 300): Promise<WaterUsage> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (deviceId) {
        // Generate device-specific water usage
        const total = Math.floor(200 + Math.random() * 150);
        const target = 300;
        resolve({
          total,
          unit: 'L',
          target,
          percentage: Math.round((total / target) * 100)
        });
      } else {
        resolve(waterUsageData);
      }
    }, delay);
  });
}

/**
 * Fetches sensor performance metrics
 * ✅ Updated to support device-specific data
 * 
 * @param deviceId - Optional device ID for specific device stats
 * @param delay - Simulated network delay in milliseconds
 * @returns Promise<SensorPerformance>
 */
export async function fetchSensorPerformance(deviceId?: string, delay: number = 300): Promise<SensorPerformance> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (deviceId) {
        // Generate device-specific performance
        const uptime = (98 + Math.random() * 2).toFixed(1);
        const accuracy = (97 + Math.random() * 2).toFixed(1);
        const response = (1 + Math.random() * 0.5).toFixed(1);
        const readings = (25 + Math.random() * 5).toFixed(1);
        
        resolve({
          uptime: `${uptime}%`,
          accuracy: `${accuracy}%`,
          response: `${response}s`,
          readings: `${readings}K`
        });
      } else {
        resolve(sensorPerformanceData);
      }
    }, delay);
  });
}

export {
  quickStatsData as defaultQuickStats,
  deviceInfoData as defaultDeviceInfo,
  weeklyTemperatureData as defaultWeeklyTemperature,
  waterUsageData as defaultWaterUsage,
  sensorPerformanceData as defaultSensorPerformance
};
