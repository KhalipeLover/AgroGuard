// User Dashboard - Real-time Sensor Data
// Simulated real-time sensor readings for user's device
// ⚠️ SYNCED with demo-admin-devices-110.ts

import { fetchAdminDevices, type AdminDevice } from './demo-admin-devices-110';

export interface SensorData {
  temperature: number;
  humidity: number;
  soilMoisture: number;
  timestamp?: Date;
  deviceId?: string;
  location?: string;
}

const initialSensorData: SensorData = {
  temperature: 28.5,
  humidity: 65,
  soilMoisture: 68,  // Updated to be in ideal range for most plants
  timestamp: new Date()
};

/**
 * Fetches current sensor data for a specific user
 * ✅ SYNCED: Gets data from user's actual device in demo-admin-devices-110.ts
 * 
 * @param userEmail - Email of logged-in user
 * @param delay - Simulated network delay in milliseconds
 * @returns Promise<SensorData>
 */
export async function fetchSensorData(userEmail?: string, delay: number = 300): Promise<SensorData> {
  return new Promise(async (resolve) => {
    setTimeout(async () => {
      // If no email provided, return default data
      if (!userEmail) {
        resolve({
          ...initialSensorData,
          timestamp: new Date()
        });
        return;
      }

      try {
        // ✅ Fetch user's devices from admin devices (SYNCED!)
        const allDevices = await fetchAdminDevices(0);
        const userDevices = allDevices.filter(d => d.ownerEmail === userEmail);

        // If user has devices, return data from first device
        if (userDevices.length > 0) {
          const device = userDevices[0];
          resolve({
            temperature: device.temperature,
            humidity: device.humidity,
            soilMoisture: device.soilMoisture,
            timestamp: new Date(),
            deviceId: device.deviceId,
            location: device.location
          });
        } else {
          // Fallback to default data
          resolve({
            ...initialSensorData,
            timestamp: new Date()
          });
        }
      } catch {
        resolve({
          ...initialSensorData,
          timestamp: new Date()
        });
      }
    }, delay);
  });
}

/**
 * Fetches all devices owned by a user
 * ✅ SYNCED: Returns actual user devices from demo-admin-devices-110.ts
 * 
 * @param userEmail - Email of logged-in user
 * @returns Promise<AdminDevice[]>
 */
export async function fetchUserDevices(userEmail: string): Promise<AdminDevice[]> {
  const allDevices = await fetchAdminDevices(0);
  return allDevices.filter(d => d.ownerEmail === userEmail);
}

/**
 * Fetches sensor data for a specific device
 * ✅ DEVICE-SPECIFIC: Gets data from a particular device
 * 
 * @param deviceId - Device ID to fetch data from
 * @param userEmail - Email of logged-in user (for verification)
 * @param delay - Simulated network delay in milliseconds
 * @returns Promise<SensorData>
 */
export async function fetchDeviceSensorData(
  deviceId: string,
  userEmail: string,
  delay: number = 300
): Promise<SensorData> {
  return new Promise(async (resolve) => {
    setTimeout(async () => {
      try {
        // Get user's devices
        const userDevices = await fetchUserDevices(userEmail);
        
        // Find specific device
        const device = userDevices.find(d => d.deviceId === deviceId || d.id === deviceId);

        if (device) {
          resolve({
            temperature: device.temperature,
            humidity: device.humidity,
            soilMoisture: device.soilMoisture,
            timestamp: new Date(),
            deviceId: device.deviceId,
            location: device.location
          });
        } else {
          // Device not found or doesn't belong to user
          resolve({
            ...initialSensorData,
            timestamp: new Date()
          });
        }
      } catch {
        resolve({
          ...initialSensorData,
          timestamp: new Date()
        });
      }
    }, delay);
  });
}

/**
 * Simulates real-time sensor data updates
 * Returns a slightly modified version of previous data
 */
export function generateUpdatedSensorData(prev: SensorData): SensorData {
  return {
    temperature: Math.max(20, Math.min(35, prev.temperature + (Math.random() - 0.5) * 2)),
    humidity: Math.max(40, Math.min(90, prev.humidity + (Math.random() - 0.5) * 3)),
    soilMoisture: Math.max(30, Math.min(85, prev.soilMoisture + (Math.random() - 0.5) * 4)),
    timestamp: new Date()
  };
}

export { initialSensorData as default };
