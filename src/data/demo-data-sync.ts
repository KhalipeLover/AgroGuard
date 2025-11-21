/**
 * DATA SYNCHRONIZATION MODULE
 * 
 * This file ensures all data across /data/ files are consistent and synchronized.
 * Acts as the single source of truth for system-wide constants.
 * 
 * Last Updated: November 2, 2025
 * Purpose: Prevent data inconsistencies across modules
 */

/**
 * ===========================================
 * MASTER DATA CONSTANTS (Single Source of Truth)
 * ===========================================
 */

export const MASTER_CONSTANTS = {
  // Users
  TOTAL_USERS: 50,
  ACTIVE_USERS: 48,
  INACTIVE_USERS: 2,
  
  // Devices
  TOTAL_DEVICES: 110,
  ONLINE_DEVICES: 103,
  OFFLINE_DEVICES: 7,
  WARNING_DEVICES: 0,
  
  // Locations
  UNIQUE_LOCATIONS: 50, // Each user has unique location
  TOTAL_KABUPATEN: 24,  // Jatim has 29 kabupaten + 9 kota = 38 total
  
  // Data Points
  TOTAL_DATA_POINTS: 4_570_000,
  DATA_POINTS_PER_DAY: 150_000,
  
  // Growth Rates
  USER_GROWTH_RATE: 8.5,  // % per month
  DEVICE_GROWTH_RATE: 10.4, // % per month
  
  // Jawa Timur Specific
  JATIM_IRRIGATION_NETWORKS: 20,
  JATIM_TOTAL_AREA_HA: 342_110,
  JATIM_SERVICE_AREA_HA: 318_050,
  
  // System Performance
  SYSTEM_UPTIME_PERCENT: 99.8,
  AVG_RESPONSE_TIME_MS: 125,
  
  // Regional Distribution
  REGIONS: {
    'Jawa Timur': { devices: 40, users: 20 },
    'Jawa Barat': { devices: 28, users: 12 },
    'Jawa Tengah': { devices: 22, users: 9 },
    'DKI Jakarta': { devices: 12, users: 5 },
    'Lain-lain': { devices: 8, users: 4 }
  }
} as const;

/**
 * ===========================================
 * CALCULATED VALUES (Auto-derived from Master Constants)
 * ===========================================
 */

export const CALCULATED_VALUES = {
  // Device percentages
  onlinePercentage: Math.round((MASTER_CONSTANTS.ONLINE_DEVICES / MASTER_CONSTANTS.TOTAL_DEVICES) * 100),
  offlinePercentage: Math.round((MASTER_CONSTANTS.OFFLINE_DEVICES / MASTER_CONSTANTS.TOTAL_DEVICES) * 100),
  
  // User percentages
  activeUserPercentage: Math.round((MASTER_CONSTANTS.ACTIVE_USERS / MASTER_CONSTANTS.TOTAL_USERS) * 100),
  
  // Averages
  devicesPerUser: Number((MASTER_CONSTANTS.TOTAL_DEVICES / MASTER_CONSTANTS.TOTAL_USERS).toFixed(1)),
  
  // Jatim irrigation efficiency
  jatimIrrigationEfficiency: Math.round((MASTER_CONSTANTS.JATIM_SERVICE_AREA_HA / MASTER_CONSTANTS.JATIM_TOTAL_AREA_HA) * 100),
  
  // Regional totals (should equal total)
  regionalDevicesSum: Object.values(MASTER_CONSTANTS.REGIONS).reduce((sum, r) => sum + r.devices, 0),
  regionalUsersSum: Object.values(MASTER_CONSTANTS.REGIONS).reduce((sum, r) => sum + r.users, 0),
} as const;

/**
 * ===========================================
 * MONTHLY GROWTH DATA (Consistent Timeline)
 * ===========================================
 */

export const MONTHLY_GROWTH_TIMELINE = [
  {
    month: 'Jan',
    users: 35,
    devices: 68,
    activeDevices: 64,
    dataPoints: 2_100_000
  },
  {
    month: 'Feb',
    users: 38,
    devices: 77,
    activeDevices: 72,
    dataPoints: 2_450_000
  },
  {
    month: 'Mar',
    users: 42,
    devices: 87,
    activeDevices: 82,
    dataPoints: 3_100_000
  },
  {
    month: 'Apr',
    users: 46,
    devices: 98,
    activeDevices: 92,
    dataPoints: 3_850_000
  },
  {
    month: 'Mei',
    users: MASTER_CONSTANTS.TOTAL_USERS, // 50 (current)
    devices: MASTER_CONSTANTS.TOTAL_DEVICES, // 110 (current)
    activeDevices: MASTER_CONSTANTS.ONLINE_DEVICES, // 103 (current)
    dataPoints: MASTER_CONSTANTS.TOTAL_DATA_POINTS // 4.57M (current)
  },
] as const;

/**
 * ===========================================
 * VALIDATION FUNCTIONS
 * ===========================================
 */

/**
 * Validates if device counts match across all sources
 */
export function validateDeviceCounts(): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  // Check device status sum
  const statusSum = MASTER_CONSTANTS.ONLINE_DEVICES + 
                    MASTER_CONSTANTS.OFFLINE_DEVICES + 
                    MASTER_CONSTANTS.WARNING_DEVICES;
  
  if (statusSum !== MASTER_CONSTANTS.TOTAL_DEVICES) {
    errors.push(
      `Device status sum (${statusSum}) doesn't match total devices (${MASTER_CONSTANTS.TOTAL_DEVICES})`
    );
  }
  
  // Check regional distribution
  if (CALCULATED_VALUES.regionalDevicesSum !== MASTER_CONSTANTS.TOTAL_DEVICES) {
    errors.push(
      `Regional devices sum (${CALCULATED_VALUES.regionalDevicesSum}) doesn't match total devices (${MASTER_CONSTANTS.TOTAL_DEVICES})`
    );
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Validates if user counts match across all sources
 */
export function validateUserCounts(): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  // Check user status sum
  const statusSum = MASTER_CONSTANTS.ACTIVE_USERS + MASTER_CONSTANTS.INACTIVE_USERS;
  
  if (statusSum !== MASTER_CONSTANTS.TOTAL_USERS) {
    errors.push(
      `User status sum (${statusSum}) doesn't match total users (${MASTER_CONSTANTS.TOTAL_USERS})`
    );
  }
  
  // Check regional distribution
  if (CALCULATED_VALUES.regionalUsersSum !== MASTER_CONSTANTS.TOTAL_USERS) {
    errors.push(
      `Regional users sum (${CALCULATED_VALUES.regionalUsersSum}) doesn't match total users (${MASTER_CONSTANTS.TOTAL_USERS})`
    );
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Runs all validation checks
 */
export function validateAllData(): {
  valid: boolean;
  errors: string[];
  summary: {
    users: boolean;
    devices: boolean;
    regions: boolean;
  };
} {
  const deviceValidation = validateDeviceCounts();
  const userValidation = validateUserCounts();
  
  const allErrors = [
    ...deviceValidation.errors,
    ...userValidation.errors
  ];
  
  return {
    valid: allErrors.length === 0,
    errors: allErrors,
    summary: {
      users: userValidation.valid,
      devices: deviceValidation.valid,
      regions: CALCULATED_VALUES.regionalDevicesSum === MASTER_CONSTANTS.TOTAL_DEVICES &&
               CALCULATED_VALUES.regionalUsersSum === MASTER_CONSTANTS.TOTAL_USERS
    }
  };
}

/**
 * ===========================================
 * SYNC HELPERS (For updating other files)
 * ===========================================
 */

/**
 * Get system stats compatible with demo-admin-stats.ts
 */
export function getSystemStatsSync() {
  return {
    totalUsers: MASTER_CONSTANTS.TOTAL_USERS,
    totalDevices: MASTER_CONSTANTS.TOTAL_DEVICES,
    activeDevices: MASTER_CONSTANTS.ONLINE_DEVICES,
    dataPoints: MASTER_CONSTANTS.TOTAL_DATA_POINTS,
    locations: MASTER_CONSTANTS.TOTAL_KABUPATEN,
    growthRate: MASTER_CONSTANTS.DEVICE_GROWTH_RATE
  };
}

/**
 * Get device status compatible with demo-admin-analytics.ts
 */
export function getDeviceStatusSync() {
  return [
    { name: 'Online', value: MASTER_CONSTANTS.ONLINE_DEVICES },
    { name: 'Offline', value: MASTER_CONSTANTS.OFFLINE_DEVICES }
  ];
}

/**
 * Get monthly growth compatible with demo-admin-analytics.ts
 */
export function getMonthlyGrowthSync() {
  return MONTHLY_GROWTH_TIMELINE.map(({ month, users, devices }) => ({
    month,
    users,
    devices
  }));
}

/**
 * ===========================================
 * EXPORT SUMMARY
 * ===========================================
 */

export const DATA_SYNC_SUMMARY = {
  masterConstants: MASTER_CONSTANTS,
  calculatedValues: CALCULATED_VALUES,
  monthlyGrowth: MONTHLY_GROWTH_TIMELINE,
  validation: validateAllData()
} as const;

// Log validation on import (development only)
// Data validation - only runs in development for monitoring
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const validation = validateAllData();
  // Validation runs silently - check browser devtools for results
  if (!validation.valid) {
    // Validation errors detected
  }
}

export default DATA_SYNC_SUMMARY;
