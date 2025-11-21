// User Dashboard - Main Content
// Dashboard view with sensor cards, multi-device selector, and statistics
// ✅ ENHANCED: Multi-Device Selector + Device-Specific Stats + Redesigned UI/UX

import { useState, useEffect } from 'react';
import motion from '../ui/motion-replacement';
import {
  Power,
  Bell,
  Download,
  TrendingUp,
  TrendingDown,
  Droplet,
  Thermometer,
  CloudRain,
  BarChart3,
  Settings,
  ChevronDown,
  Wifi,
  RefreshCw
} from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import SensorChart from './SensorChart';
import PlantThresholdIndicator from './PlantThresholdIndicator';
import {
  SensorCardSkeleton,
  QuickStatSkeleton,
  NotificationSkeleton
} from './DashboardSkeletons';
import {
  fetchSensorData,
  fetchDeviceSensorData,
  fetchUserDevices,
  generateUpdatedSensorData,
  fetchUserNotifications,
  fetchDeviceQuickStats,
  type SensorData,
  type UserNotification,
  type QuickStat,
  type AdminDevice
} from '../../data';

interface UserDashboardContentProps {
  autoMode: boolean;
  irrigationOn: boolean;
  setAutoMode: (value: boolean) => void;
  setIrrigationOn: (value: boolean) => void;
  userEmail?: string;
}

export default function UserDashboardContent({
  autoMode,
  irrigationOn,
  setAutoMode,
  setIrrigationOn,
  userEmail
}: UserDashboardContentProps) {
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [notifications, setNotifications] = useState<UserNotification[]>([]);
  const [quickStats, setQuickStats] = useState<QuickStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<{ time: string; value: number }[]>([]);
  
  // ✅ NEW: Multi-Device Support
  const [userDevices, setUserDevices] = useState<AdminDevice[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');
  const [deviceLoading, setDeviceLoading] = useState(false);

  // Load user's devices on mount
  useEffect(() => {
    const loadDevices = async () => {
      if (!userEmail) return;
      
      try {
        const devices = await fetchUserDevices(userEmail);
        setUserDevices(devices);
        
        // Auto-select first device
        if (devices.length > 0 && !selectedDeviceId) {
          setSelectedDeviceId(devices[0].deviceId);
        }
      } catch {
        // Silent fail
      }
    };

    loadDevices();
  }, [userEmail]);

  // Load data when selected device changes
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        let sensors: SensorData;
        let stats: QuickStat[];

        if (selectedDeviceId && userEmail) {
          // ✅ Fetch device-specific data
          [sensors, stats] = await Promise.all([
            fetchDeviceSensorData(selectedDeviceId, userEmail),
            fetchDeviceQuickStats(selectedDeviceId)
          ]);
        } else if (userEmail) {
          // Fallback to first device
          sensors = await fetchSensorData(userEmail);
          stats = await fetchDeviceQuickStats(userDevices[0]?.deviceId || 'default');
        } else {
          // Default data
          sensors = await fetchSensorData();
          stats = await fetchDeviceQuickStats('default');
        }

        const notifs = await fetchUserNotifications();
        
        setSensorData(sensors);
        setQuickStats(stats);
        setNotifications(notifs);
        
        // Generate initial chart data (last 24 hours)
        const now = new Date();
        const initialChartData = Array.from({ length: 24 }, (_, i) => {
          const time = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000);
          return {
            time: time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
            value: Math.round(sensors.soilMoisture + (Math.random() - 0.5) * 10)
          };
        });
        setChartData(initialChartData);
      } catch {
        // Silent fail
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedDeviceId, userEmail, userDevices]);

  // Simulate real-time sensor updates
  useEffect(() => {
    if (!sensorData) return;

    const interval = setInterval(() => {
      setSensorData(prev => prev ? generateUpdatedSensorData(prev) : null);
      
      // Update chart data with new point
      setChartData(prev => {
        const now = new Date();
        const newPoint = {
          time: now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          value: sensorData.soilMoisture
        };
        return [...prev.slice(-23), newPoint];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [sensorData]);

  // ✅ Handle device change
  const handleDeviceChange = async (deviceId: string) => {
    setDeviceLoading(true);
    setSelectedDeviceId(deviceId);
    
    // Add small delay for smooth transition
    setTimeout(() => {
      setDeviceLoading(false);
    }, 500);
  };

  // Icon mapping for quick stats
  const iconMap: Record<string, any> = {
    Power,
    BarChart3,
    Droplet,
    TrendingUp
  };

  if (loading) {
    return (
      <div className="space-y-8">
        {/* Header Skeleton */}
        <Card className="p-5 md:p-6 glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 shadow-lg">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
            <div className="min-w-0 flex-1 space-y-3">
              <div className="h-9 w-56 bg-white/20 dark:bg-white/10 rounded-lg animate-pulse" />
              <div className="h-5 w-72 bg-white/20 dark:bg-white/10 rounded-lg animate-pulse" />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="h-10 w-full sm:w-48 bg-white/20 dark:bg-white/10 rounded-lg animate-pulse" />
              <div className="flex gap-2">
                <div className="h-10 w-24 bg-white/20 dark:bg-white/10 rounded-lg animate-pulse" />
                <div className="h-10 w-24 bg-white/20 dark:bg-white/10 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        </Card>

        {/* Sensor Cards Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SensorCardSkeleton />
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <SensorCardSkeleton />
            <SensorCardSkeleton />
          </div>
        </div>

        {/* Quick Stats Skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <QuickStatSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  if (!sensorData) return null;

  return (
    <div className="space-y-8">
      {/* ✅ REDESIGNED HEADER - Card Style with Better Spacing */}
      <Card className="p-5 md:p-6 glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 shadow-lg">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <div className="min-w-0 flex-1">
            <h1 className="text-foreground mb-2 bg-gradient-to-r from-[#3B945E] to-[#0077B6] bg-clip-text text-transparent">
              Dashboard Monitoring
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <p className="text-muted-foreground flex items-center gap-2">
                <span>📍</span>
                <span>{sensorData.location || 'Location not set'}</span>
              </p>
              {userDevices.length > 1 && (
                <Badge variant="outline" className="glass-card dark:glass-card-dark border-white/30 px-2.5 py-1 w-fit">
                  {userDevices.length} Devices
                </Badge>
              )}
            </div>
          </div>

          {/* ✅ NEW: Device Selector Dropdown */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            {/* Device Selector or Badge */}
            {userDevices.length > 1 ? (
              <Select value={selectedDeviceId} onValueChange={handleDeviceChange}>
                <SelectTrigger className="w-full sm:w-[240px] glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 shadow-md h-10">
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
            ) : (
              <Badge className="glass-card dark:glass-card-dark border-2 border-white/30 px-3 py-2 whitespace-nowrap h-10 flex items-center">
                <Wifi className="w-4 h-4 mr-2 text-[#3B945E]" />
                {sensorData.deviceId || 'Device'}
              </Badge>
            )}

            {/* Status Badges */}
            <div className="flex items-center gap-2">
              <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 px-3 py-2 h-10 whitespace-nowrap shadow-lg flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-2 pulse-online" />
                Online
              </Badge>
              <Badge variant="outline" className="glass-card dark:glass-card-dark border-white/30 px-3 py-2 h-10 whitespace-nowrap flex items-center">
                <Power className="w-4 h-4 mr-1.5 text-[#3B945E]" />
                {autoMode ? 'Auto' : 'Manual'}
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* ✅ REDESIGNED SENSOR CARDS with better spacing and proportions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hero Card - Soil Moisture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-1"
        >
          <Card className="p-6 glass-card dark:glass-card-dark border-2 border-white/40 dark:border-white/20 shadow-xl hover:shadow-2xl transition-smooth overflow-hidden relative group h-full">
            {/* Background gradient blob */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#3B945E]/10 to-[#0077B6]/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 space-y-4">
              <div className="flex items-start justify-between">
                <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-800/50 p-3.5 rounded-xl shadow-md">
                  <CloudRain className="w-7 h-7 text-green-600 dark:text-green-400" />
                </div>
                <Badge className="bg-green-500/20 text-green-700 dark:text-green-300 border-0 px-3 py-1">
                  Optimal
                </Badge>
              </div>
              
              <div>
                <p className="text-muted-foreground mb-2">Kelembaban Tanah</p>
                <div className="flex items-baseline gap-2 mb-4">
                  <h2 className="text-foreground">{sensorData.soilMoisture.toFixed(0)}</h2>
                  <span className="text-muted-foreground">%</span>
                </div>
              </div>
              
              <Progress 
                value={sensorData.soilMoisture} 
                className="h-2.5 mb-4 bg-white/50 dark:bg-black/20" 
              />
              
              <div className="flex items-center justify-between pt-2 border-t border-white/20 dark:border-white/10">
                <span className="text-muted-foreground">Target: 40-60%</span>
                <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Secondary Sensors Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Temperature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="p-5 glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 shadow-lg hover:shadow-xl transition-smooth h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-950/50 dark:to-orange-950/50 p-3 rounded-xl shadow-md">
                  <Thermometer className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-muted-foreground mb-2">Suhu Udara</p>
                <div className="flex items-baseline gap-2 mb-3">
                  <h2 className="text-foreground">{sensorData.temperature.toFixed(1)}</h2>
                  <span className="text-muted-foreground">°C</span>
                </div>
                <p className="text-muted-foreground">Range: 20-30°C</p>
              </div>
            </Card>
          </motion.div>

          {/* Humidity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="p-5 glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 shadow-lg hover:shadow-xl transition-smooth h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-950/50 dark:to-cyan-950/50 p-3 rounded-xl shadow-md">
                  <Droplet className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <TrendingDown className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-muted-foreground mb-2">Kelembapan Udara</p>
                <div className="flex items-baseline gap-2 mb-3">
                  <h2 className="text-foreground">{sensorData.humidity.toFixed(0)}</h2>
                  <span className="text-muted-foreground">%</span>
                </div>
                <p className="text-muted-foreground">Range: 60-80%</p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Plant Threshold Indicator */}
      <PlantThresholdIndicator soilMoisture={sensorData.soilMoisture} />

      {/* ✅ Quick Stats Section */}
      <div>
        <div className="mb-4">
          <h3 className="text-foreground mb-1">Ringkasan Status</h3>
          <p className="text-muted-foreground">Performa sistem dalam 24 jam terakhir</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats && quickStats.map((stat, idx) => {
          const IconComponent = iconMap[stat.icon] || Power;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 + idx * 0.1 }}
            >
              <Card className="p-4 glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 hover:shadow-lg transition-smooth cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${stat.bgColor} flex-shrink-0`}>
                    <IconComponent className={`w-5 h-5 ${stat.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-muted-foreground truncate mb-1">{stat.label}</p>
                    <p className="text-foreground truncate">
                      {autoMode && stat.label === 'Irigasi' ? 'Auto' : stat.value}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
        </div>
      </div>

      {/* ✅ REDESIGNED Chart Section */}
      <Card className="w-full p-6 glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 shadow-xl overflow-hidden">
        {/* Header with Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div className="min-w-0">
            <h3 className="text-foreground mb-1.5">Grafik Sensor 24 Jam</h3>
            <p className="text-muted-foreground flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full pulse-online" />
              Real-time monitoring • Updated 5s ago
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 glass-card dark:glass-card-dark border-white/30 hover:border-[#3B945E]/50 transition-all"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button 
              size="sm" 
              className="gap-2 bg-gradient-to-r from-[#3B945E] to-[#2D7A4A] hover:from-[#2D7A4A] hover:to-[#3B945E] shadow-lg hover:shadow-xl transition-all"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Details</span>
            </Button>
          </div>
        </div>

        {/* Chart Component - Now handles its own styling */}
        <SensorChart 
          data={chartData} 
          title="Kelembapan Tanah (%)" 
        />
      </Card>

      {/* ✅ REDESIGNED Notifications & Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <Card className="p-5 glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 shadow-lg">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[#3B945E] to-[#0077B6] p-2.5 rounded-xl flex-shrink-0 shadow-md">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-foreground">Notifikasi</h3>
            </div>
            <Badge variant="outline" className="glass-card dark:glass-card-dark px-3 py-1.5 border-white/30">
              {notifications.length}
            </Badge>
          </div>
          <div className="space-y-3">
            {notifications && notifications.slice(0, 2).map((notif) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-3 p-4 glass-card dark:glass-card-dark rounded-xl border border-white/20 dark:border-white/10 shadow-sm hover:shadow-md transition-smooth cursor-pointer"
              >
                <div className={`w-2.5 h-2.5 rounded-full mt-2 flex-shrink-0 ${
                  notif.type === 'warning' 
                    ? 'bg-yellow-500 ring-4 ring-yellow-500/20' 
                    : 'bg-green-500 ring-4 ring-green-500/20 pulse-online'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-foreground mb-1 line-clamp-2">{notif.text}</p>
                  <p className="text-muted-foreground">{notif.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Quick Controls */}
        <Card className="p-5 glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 shadow-lg">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-gradient-to-br from-[#0077B6] to-[#005A8D] p-2.5 rounded-xl flex-shrink-0 shadow-md">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-foreground">Quick Controls</h3>
          </div>
          <div className="space-y-4">
            {/* Auto Mode Control */}
            <div className="p-4 glass-card dark:glass-card-dark rounded-xl border border-white/20 dark:border-white/10 hover:shadow-md transition-smooth">
              <div className="flex items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="bg-[#3B945E]/20 dark:bg-[#4CAF6E]/20 p-2 rounded-lg flex-shrink-0">
                    <Power className="w-5 h-5 text-[#3B945E] dark:text-[#4CAF6E]" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-foreground mb-0.5">Mode Otomatis</h4>
                    <p className="text-muted-foreground">AI-powered irrigation</p>
                  </div>
                </div>
                <Switch 
                  checked={autoMode} 
                  onCheckedChange={setAutoMode}
                  className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#3B945E] data-[state=checked]:to-[#2D7A4A] flex-shrink-0"
                />
              </div>
              {autoMode && (
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-500/10 px-3 py-2 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full pulse-online flex-shrink-0" />
                  <span>Sistem aktif dan monitoring</span>
                </div>
              )}
            </div>

            {/* Manual Irrigation Control */}
            <div className="p-4 glass-card dark:glass-card-dark rounded-xl border border-white/20 dark:border-white/10 hover:shadow-md transition-smooth">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="bg-blue-500/20 dark:bg-blue-600/20 p-2 rounded-lg flex-shrink-0">
                    <Droplet className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-foreground mb-0.5">Manual Irrigation</h4>
                    <p className="text-muted-foreground">
                      {irrigationOn ? 'Sedang menyiram' : 'Standby mode'}
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
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
