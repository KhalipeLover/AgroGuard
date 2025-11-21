// User Dashboard - Device Control Tab
// Device management and information view with multi-device support
// ✅ ENHANCED: Multi-Device List + Device-Specific Info + Redesigned UI/UX

import { useState, useEffect } from 'react';
import { Droplet, Power, Wifi, MapPin, Calendar, Cpu, Signal } from 'lucide-react';
import { Card } from '../ui/card';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { DeviceInfoSkeleton } from './DashboardSkeletons';
import { 
  fetchDeviceInfo, 
  fetchUserDevices,
  type DeviceInfo,
  type AdminDevice 
} from '../../data';

interface UserDeviceTabProps {
  autoMode: boolean;
  irrigationOn: boolean;
  setAutoMode: (value: boolean) => void;
  setIrrigationOn: (value: boolean) => void;
  userEmail?: string;
}

export default function UserDeviceTab({
  autoMode,
  irrigationOn,
  setAutoMode,
  setIrrigationOn,
  userEmail
}: UserDeviceTabProps) {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [loading, setLoading] = useState(true);
  
  // ✅ NEW: Multi-Device Support
  const [userDevices, setUserDevices] = useState<AdminDevice[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');

  // Load user's devices
  useEffect(() => {
    const loadDevices = async () => {
      if (!userEmail) return;
      
      try {
        const devices = await fetchUserDevices(userEmail);
        setUserDevices(devices);
        
        if (devices.length > 0 && !selectedDeviceId) {
          setSelectedDeviceId(devices[0].deviceId);
        }
      } catch {
        // Silent fail
      }
    };

    loadDevices();
  }, [userEmail]);

  // Load device info when selected device changes
  useEffect(() => {
    const loadDeviceInfo = async () => {
      try {
        setLoading(true);
        const data = await fetchDeviceInfo(selectedDeviceId || undefined);
        setDeviceInfo(data);
      } catch {
        // Silent fail
      } finally {
        setLoading(false);
      }
    };

    if (selectedDeviceId || !userEmail) {
      loadDeviceInfo();
    }
  }, [selectedDeviceId, userEmail]);

  // Get selected device details
  const selectedDevice = userDevices.find(d => d.deviceId === selectedDeviceId);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-3">
            <div className="h-9 w-48 bg-white/20 dark:bg-white/10 rounded-lg animate-pulse" />
            <div className="h-5 w-64 bg-white/20 dark:bg-white/10 rounded-lg animate-pulse" />
          </div>
          <div className="h-10 w-48 bg-white/20 dark:bg-white/10 rounded-lg animate-pulse" />
        </div>
        <DeviceInfoSkeleton />
        <DeviceInfoSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ✅ REDESIGNED HEADER with Device Selector */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-foreground mb-2">Kontrol Perangkat</h1>
          <p className="text-muted-foreground">
            Kelola dan pantau device IoT Anda
          </p>
        </div>

        {/* ✅ Device Selector */}
        {userDevices.length > 1 && (
          <Select value={selectedDeviceId} onValueChange={setSelectedDeviceId}>
            <SelectTrigger className="w-full md:w-[240px] glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 shadow-lg">
              <SelectValue placeholder="Select device">
                <div className="flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-[#3B945E]" />
                  <span className="truncate">{selectedDeviceId}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 shadow-xl">
              {userDevices.map((device) => (
                <SelectItem 
                  key={device.id} 
                  value={device.deviceId}
                  className="cursor-pointer hover:bg-white/20 dark:hover:bg-white/10"
                >
                  <div className="flex items-center justify-between gap-3 w-full">
                    <span className="font-medium">{device.deviceId}</span>
                    <Badge 
                      variant="outline" 
                      className={device.status === 'online' 
                        ? 'bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30' 
                        : 'bg-gray-500/20 text-gray-700 dark:text-gray-300 border-gray-500/30'
                      }
                    >
                      {device.status}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* ✅ Device Information Card */}
      {selectedDevice && (
        <Card className="p-6 glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-[#3B945E] to-[#0077B6] p-3 rounded-xl shadow-md">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-foreground mb-0.5">Device Information</h3>
              <p className="text-muted-foreground">Detail perangkat IoT</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 glass-card dark:glass-card-dark rounded-xl border border-white/20 dark:border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <Wifi className="w-5 h-5 text-[#3B945E]" />
                <span className="text-muted-foreground">Device ID</span>
              </div>
              <p className="text-foreground">{selectedDevice.deviceId}</p>
            </div>

            <div className="p-4 glass-card dark:glass-card-dark rounded-xl border border-white/20 dark:border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <Signal className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-muted-foreground">Status</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${
                  selectedDevice.status === 'online' 
                    ? 'bg-green-500 pulse-online' 
                    : 'bg-gray-500'
                }`} />
                <p className="text-foreground capitalize">{selectedDevice.status}</p>
              </div>
            </div>

            <div className="p-4 glass-card dark:glass-card-dark rounded-xl border border-white/20 dark:border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-5 h-5 text-red-600 dark:text-red-400" />
                <span className="text-muted-foreground">Lokasi</span>
              </div>
              <p className="text-foreground line-clamp-2">{selectedDevice.location}</p>
            </div>

            <div className="p-4 glass-card dark:glass-card-dark rounded-xl border border-white/20 dark:border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span className="text-muted-foreground">Last Sync</span>
              </div>
              <p className="text-foreground">{deviceInfo?.lastUpdate || 'Just now'}</p>
            </div>
          </div>

          {deviceInfo && (
            <div className="mt-4 p-4 glass-card dark:glass-card-dark rounded-xl border border-white/20 dark:border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-[#0077B6]" />
                  <span className="text-muted-foreground">Firmware Version</span>
                </div>
                <Badge variant="outline" className="glass-card dark:glass-card-dark px-3 py-1">
                  {deviceInfo.firmware}
                </Badge>
              </div>
            </div>
          )}
        </Card>
      )}

      {/* ✅ REDESIGNED Control Card */}
      <Card className="p-6 glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-950/50 dark:to-emerald-950/50 p-3 rounded-xl shadow-md">
            <Power className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="text-foreground mb-0.5">Pengaturan Irigasi</h3>
            <p className="text-muted-foreground">Kontrol sistem penyiraman</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Auto Mode */}
          <div className="p-5 glass-card dark:glass-card-dark rounded-xl border border-white/20 dark:border-white/10 hover:shadow-lg transition-smooth">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="bg-[#3B945E]/20 dark:bg-[#4CAF6E]/20 p-2.5 rounded-lg flex-shrink-0">
                  <Power className="w-6 h-6 text-[#3B945E] dark:text-[#4CAF6E]" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-foreground mb-1">Mode Otomatis</h4>
                  <p className="text-muted-foreground">
                    Sistem mengatur irigasi berdasarkan sensor
                  </p>
                </div>
              </div>
              <Switch 
                checked={autoMode} 
                onCheckedChange={setAutoMode}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#3B945E] data-[state=checked]:to-[#2D7A4A] flex-shrink-0"
              />
            </div>
            {autoMode && (
              <div className="mt-4 flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-500/10 px-3 py-2.5 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full pulse-online flex-shrink-0" />
                <span>Sistem otomatis aktif</span>
              </div>
            )}
          </div>

          {/* Manual Irrigation */}
          <div className="p-5 glass-card dark:glass-card-dark rounded-xl border border-white/20 dark:border-white/10 hover:shadow-lg transition-smooth">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="bg-blue-500/20 dark:bg-blue-600/20 p-2.5 rounded-lg flex-shrink-0">
                  <Droplet className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-foreground mb-1">Irigasi Manual</h4>
                  <p className="text-muted-foreground">
                    {irrigationOn ? 'Sedang menyiram' : 'Mode standby'}
                  </p>
                </div>
              </div>
              <Switch 
                checked={irrigationOn} 
                onCheckedChange={setIrrigationOn}
                disabled={autoMode}
                className="data-[state=checked]:bg-blue-600 flex-shrink-0"
              />
            </div>
            {autoMode && (
              <div className="mt-4 flex items-center gap-2 text-muted-foreground bg-white/20 dark:bg-black/20 px-3 py-2.5 rounded-lg">
                <Power className="w-4 h-4" />
                <span className="text-sm">Disabled saat mode otomatis aktif</span>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* ✅ Device List (if multiple devices) */}
      {userDevices.length > 1 && (
        <Card className="p-6 glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 shadow-xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-950/50 dark:to-pink-950/50 p-3 rounded-xl shadow-md">
              <Wifi className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-foreground mb-0.5">Daftar Device</h3>
              <p className="text-muted-foreground">{userDevices.length} perangkat terdaftar</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {userDevices.map((device) => (
              <div
                key={device.id}
                className={`p-4 glass-card dark:glass-card-dark rounded-xl border-2 transition-smooth cursor-pointer ${
                  device.deviceId === selectedDeviceId
                    ? 'border-[#3B945E] bg-[#3B945E]/5 dark:bg-[#3B945E]/10'
                    : 'border-white/20 dark:border-white/10 hover:border-[#3B945E]/50'
                }`}
                onClick={() => setSelectedDeviceId(device.deviceId)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-foreground">{device.deviceId}</h4>
                  <Badge 
                    variant="outline" 
                    className={device.status === 'online' 
                      ? 'bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30' 
                      : 'bg-gray-500/20 text-gray-700 dark:text-gray-300 border-gray-500/30'
                    }
                  >
                    {device.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground line-clamp-2 mb-3">
                  {device.location}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Droplet className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-muted-foreground">{device.soilMoisture.toFixed(0)}%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-red-600 dark:text-red-400" />
                    <span className="text-muted-foreground">{device.temperature.toFixed(1)}°C</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
