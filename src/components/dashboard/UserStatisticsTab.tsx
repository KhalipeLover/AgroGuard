// User Dashboard - Statistics Tab
// Analytics and performance metrics with device-specific stats
// ✅ ENHANCED: Device-Specific Statistics + Multi-Device Support

import { useState, useEffect } from 'react';
import { Wifi, TrendingUp, Droplet, Activity, Zap } from 'lucide-react';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { StatisticsCardSkeleton } from './DashboardSkeletons';
import {
  fetchWeeklyTemperature,
  fetchWaterUsage,
  fetchSensorPerformance,
  fetchUserDevices,
  type WeeklyTemperature,
  type WaterUsage,
  type SensorPerformance,
  type AdminDevice
} from '../../data';

interface UserStatisticsTabProps {
  userEmail?: string;
}

export default function UserStatisticsTab({ userEmail }: UserStatisticsTabProps = {}) {
  const [temperature, setTemperature] = useState<WeeklyTemperature | null>(null);
  const [waterUsage, setWaterUsage] = useState<WaterUsage | null>(null);
  const [performance, setPerformance] = useState<SensorPerformance | null>(null);
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

  // Load statistics when device changes
  useEffect(() => {
    const loadStatistics = async () => {
      try {
        setLoading(true);
        
        // ✅ Fetch device-specific statistics
        const [temp, water, perf] = await Promise.all([
          fetchWeeklyTemperature(selectedDeviceId || undefined),
          fetchWaterUsage(selectedDeviceId || undefined),
          fetchSensorPerformance(selectedDeviceId || undefined)
        ]);
        
        setTemperature(temp);
        setWaterUsage(water);
        setPerformance(perf);
      } catch {
        // Silent fail
      } finally {
        setLoading(false);
      }
    };

    loadStatistics();
  }, [selectedDeviceId]);

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatisticsCardSkeleton />
          <StatisticsCardSkeleton />
        </div>
        <StatisticsCardSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ✅ REDESIGNED HEADER with Device Selector */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-foreground mb-2">Statistik & Analisis</h1>
          <p className="text-muted-foreground">
            Data performa dan penggunaan sumber daya
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

      {/* ✅ REDESIGNED Statistics Grid with better spacing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weekly Temperature */}
        {temperature && (
          <Card className="p-6 glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 shadow-xl hover:shadow-2xl transition-smooth">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-950/50 dark:to-orange-950/50 p-3 rounded-xl shadow-md">
                <TrendingUp className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="text-foreground mb-0.5">Suhu Minggu Ini</h3>
                <p className="text-muted-foreground">Temperatur rata-rata</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2 gap-4">
                  <span className="text-muted-foreground">Minimum</span>
                  <span className="text-foreground">{temperature.minimum.toFixed(1)}°C</span>
                </div>
                <Progress 
                  value={(temperature.minimum / 40) * 100} 
                  className="h-2.5 bg-white/50 dark:bg-black/20" 
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2 gap-4">
                  <span className="text-muted-foreground">Rata-rata</span>
                  <span className="text-foreground">{temperature.average.toFixed(1)}°C</span>
                </div>
                <Progress 
                  value={(temperature.average / 40) * 100} 
                  className="h-2.5 bg-white/50 dark:bg-black/20" 
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2 gap-4">
                  <span className="text-muted-foreground">Maximum</span>
                  <span className="text-foreground">{temperature.maximum.toFixed(1)}°C</span>
                </div>
                <Progress 
                  value={(temperature.maximum / 40) * 100} 
                  className="h-2.5 bg-white/50 dark:bg-black/20" 
                />
              </div>
            </div>
          </Card>
        )}

        {/* Water Usage */}
        {waterUsage && (
          <Card className="p-6 glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 shadow-xl hover:shadow-2xl transition-smooth">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-950/50 dark:to-cyan-950/50 p-3 rounded-xl shadow-md">
                <Droplet className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-foreground mb-0.5">Penggunaan Air</h3>
                <p className="text-muted-foreground">Bulan ini</p>
              </div>
            </div>
            
            <div className="text-center py-4">
              <div className="mb-5">
                <h2 className="text-foreground mb-2">
                  {waterUsage.total}{waterUsage.unit}
                </h2>
                <p className="text-muted-foreground">Total penggunaan</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Target bulanan</span>
                  <span className="text-foreground">{waterUsage.target}{waterUsage.unit}</span>
                </div>
                <Progress 
                  value={waterUsage.percentage} 
                  className="h-2.5 bg-white/50 dark:bg-black/20" 
                />
                <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
                  <TrendingUp className="w-4 h-4" />
                  <span>{waterUsage.percentage}% dari target</span>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* ✅ REDESIGNED Sensor Performance with better layout */}
      {performance && (
        <Card className="p-6 glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-950/50 dark:to-emerald-950/50 p-3 rounded-xl shadow-md">
              <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-foreground mb-0.5">Performa Sensor</h3>
              <p className="text-muted-foreground">Metrik kinerja device</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-5 glass-card dark:glass-card-dark rounded-xl shadow-md hover:shadow-lg transition-smooth cursor-default border border-white/20 dark:border-white/10">
              <div className="bg-green-500/10 dark:bg-green-500/20 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-muted-foreground mb-2">Uptime</p>
              <p className="text-foreground">{performance.uptime}</p>
            </div>
            
            <div className="text-center p-5 glass-card dark:glass-card-dark rounded-xl shadow-md hover:shadow-lg transition-smooth cursor-default border border-white/20 dark:border-white/10">
              <div className="bg-blue-500/10 dark:bg-blue-500/20 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-muted-foreground mb-2">Accuracy</p>
              <p className="text-foreground">{performance.accuracy}</p>
            </div>
            
            <div className="text-center p-5 glass-card dark:glass-card-dark rounded-xl shadow-md hover:shadow-lg transition-smooth cursor-default border border-white/20 dark:border-white/10">
              <div className="bg-purple-500/10 dark:bg-purple-500/20 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-muted-foreground mb-2">Response</p>
              <p className="text-foreground">{performance.response}</p>
            </div>
            
            <div className="text-center p-5 glass-card dark:glass-card-dark rounded-xl shadow-md hover:shadow-lg transition-smooth cursor-default border border-white/20 dark:border-white/10">
              <div className="bg-orange-500/10 dark:bg-orange-500/20 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Wifi className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <p className="text-muted-foreground mb-2">Readings</p>
              <p className="text-foreground">{performance.readings}</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
