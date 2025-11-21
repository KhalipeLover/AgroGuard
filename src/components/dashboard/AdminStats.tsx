/**
 * Admin Dashboard - Statistics Component (Enhanced)
 * 
 * Comprehensive statistics dashboard with:
 * - System analytics (users, devices growth)
 * - Jawa Timur irrigation data
 * - Production & agricultural metrics
 * - Multiple chart types and infographics
 * - Professional & responsive design
 */

import { useState, useEffect } from 'react';
import { 
  SimpleBarChart, 
  SimplePieChart, 
  SimpleLineChart 
} from '../charts';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  TrendingUp,
  TrendingDown,
  Droplets,
  Sprout,
  Zap,
  Gauge,
  MapPin,
  Activity,
  Users,
  Server,
  BarChart3,
  PieChart,
  Thermometer,
  CloudRain,
  Wind
} from 'lucide-react';
import {
  fetchAnalyticsData,
  fetchSystemStats,
  getIrrigationStats,
  getNetworksByCondition,
  type AnalyticsData,
  type SystemStats
} from '../../data';

export default function AdminStats() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [systemStats, setSystemStats] = useState<SystemStats | null>(null);
  const [irrigationStats, setIrrigationStats] = useState<any>(null);
  const [networkCondition, setNetworkCondition] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllStats = async () => {
      try {
        setLoading(true);
        
        // Load all data in parallel
        const [analyticsData, sysStats, irrStats, netCondition] = await Promise.all([
          fetchAnalyticsData(),
          fetchSystemStats(),
          getIrrigationStats(),
          getNetworksByCondition()
        ]);
        
        setAnalytics(analyticsData);
        setSystemStats(sysStats);
        setIrrigationStats(irrStats);
        setNetworkCondition(netCondition);
      } catch {
        // Silent fail
      } finally {
        setLoading(false);
      }
    };

    loadAllStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        {/* Loading skeletons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 glass-card dark:glass-card-dark rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-80 glass-card dark:glass-card-dark rounded-lg animate-pulse" />
          <div className="h-80 glass-card dark:glass-card-dark rounded-lg animate-pulse" />
        </div>
        <div className="h-96 glass-card dark:glass-card-dark rounded-lg animate-pulse" />
      </div>
    );
  }

  if (!analytics || !systemStats || !irrigationStats) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Activity className="w-12 h-12 mx-auto mb-4 opacity-30" />
        <p>Failed to load statistics data</p>
      </div>
    );
  }

  // Calculate growth rates
  const userGrowth = analytics.monthlyGrowth.length >= 2
    ? ((analytics.monthlyGrowth[analytics.monthlyGrowth.length - 1].users - 
        analytics.monthlyGrowth[analytics.monthlyGrowth.length - 2].users) / 
        analytics.monthlyGrowth[analytics.monthlyGrowth.length - 2].users * 100)
    : 0;

  const deviceGrowth = analytics.monthlyGrowth.length >= 2
    ? ((analytics.monthlyGrowth[analytics.monthlyGrowth.length - 1].devices - 
        analytics.monthlyGrowth[analytics.monthlyGrowth.length - 2].devices) / 
        analytics.monthlyGrowth[analytics.monthlyGrowth.length - 2].devices * 100)
    : 0;

  // Network condition data for pie chart
  const networkPieData = [
    { name: 'Baik', value: networkCondition.baik },
    { name: 'Sedang', value: networkCondition.sedang },
    { name: 'Buruk', value: networkCondition.buruk }
  ];

  // Device status colors
  const deviceColors = ['#22c55e', '#ef4444'];
  const networkColors = ['#22c55e', '#eab308', '#ef4444'];

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-gradient-to-br from-[#3B945E] to-[#4CAF6E] shadow-lg">
          <BarChart3 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-foreground">Statistik Sistem</h2>
          <p className="text-sm text-muted-foreground">
            Analisis menyeluruh kinerja sistem dan data Jawa Timur
          </p>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users */}
        <Card className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 p-6 hover:shadow-xl transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-blue-500/10">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            {userGrowth > 0 && (
              <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-0">
                <TrendingUp className="w-3 h-3 mr-1" />
                {userGrowth.toFixed(1)}%
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-1">Total Pengguna</p>
          <p className="text-foreground mb-2 !text-3xl !font-bold">{systemStats.totalUsers}</p>
          <p className="text-xs text-muted-foreground">
            {systemStats.activeDevices} devices aktif
          </p>
        </Card>

        {/* Total Devices */}
        <Card className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 p-6 hover:shadow-xl transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-[#3B945E]/10">
              <Server className="w-6 h-6 text-[#3B945E] dark:text-[#4CAF6E]" />
            </div>
            {deviceGrowth > 0 && (
              <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-0">
                <TrendingUp className="w-3 h-3 mr-1" />
                {deviceGrowth.toFixed(1)}%
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-1">Total Perangkat</p>
          <p className="text-foreground mb-2 !text-3xl !font-bold">{systemStats.totalDevices}</p>
          <p className="text-xs text-muted-foreground">
            {systemStats.locations} lokasi
          </p>
        </Card>

        {/* Irrigation Networks */}
        <Card className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 p-6 hover:shadow-xl transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-cyan-500/10">
              <Droplets className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            </div>
            <Badge className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-0">
              Jatim
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Jaringan Irigasi</p>
          <p className="text-foreground mb-2 !text-3xl !font-bold">{irrigationStats.totalJaringan}</p>
          <p className="text-xs text-muted-foreground">
            {(irrigationStats.rataKondisiBaik).toFixed(0)}% kondisi baik
          </p>
        </Card>

        {/* Coverage Area */}
        <Card className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 p-6 hover:shadow-xl transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-green-500/10">
              <MapPin className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-0">
              Luas
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Luas Layanan</p>
          <p className="text-foreground mb-2 !text-3xl !font-bold">
            {(irrigationStats.totalLuasLayanan / 1000).toFixed(1)}K
          </p>
          <p className="text-xs text-muted-foreground">
            ha area irigasi
          </p>
        </Card>
      </div>

      {/* Charts Row 1: Growth & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Growth Chart */}
        <Card className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-[#3B945E]" />
            <h3 className="text-foreground">Pertumbuhan Bulanan</h3>
          </div>
          <SimpleBarChart
            data={analytics.monthlyGrowth}
            xKey="month"
            bars={[
              { key: 'users', color: '#0077B6', name: 'Users' },
              { key: 'devices', color: '#3B945E', name: 'Devices' }
            ]}
            height={280}
          />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="text-center p-3 rounded-lg glass-card dark:glass-card-dark border border-white/20">
              <p className="text-xs text-muted-foreground mb-1">User Growth</p>
              <p className="text-blue-600 dark:text-blue-400">
                +{userGrowth.toFixed(1)}%
              </p>
            </div>
            <div className="text-center p-3 rounded-lg glass-card dark:glass-card-dark border border-white/20">
              <p className="text-xs text-muted-foreground mb-1">Device Growth</p>
              <p className="text-[#3B945E] dark:text-[#4CAF6E]">
                +{deviceGrowth.toFixed(1)}%
              </p>
            </div>
          </div>
        </Card>

        {/* Performance Summary */}
        <Card className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Gauge className="w-5 h-5 text-[#3B945E]" />
            <h3 className="text-foreground">Kinerja Sensor</h3>
          </div>
          <div className="space-y-4">
            {/* Temperature */}
            <div className="glass-card dark:glass-card-dark p-4 rounded-lg border-2 border-red-200/30 dark:border-red-500/20 hover:border-red-300/50 dark:hover:border-red-400/30 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-red-500/10">
                    <Thermometer className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </div>
                  <span className="text-sm text-muted-foreground">Suhu Rata-rata</span>
                </div>
                <Badge className="bg-red-500/10 text-red-600 dark:text-red-400 border-0">
                  Optimal
                </Badge>
              </div>
              <p className="text-foreground !text-3xl !font-bold">
                {analytics.performance.avgTemperature.toFixed(1)}°C
              </p>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full"
                    style={{ width: `${(analytics.performance.avgTemperature / 40) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">40°C</span>
              </div>
            </div>

            {/* Soil Moisture */}
            <div className="glass-card dark:glass-card-dark p-4 rounded-lg border-2 border-blue-200/30 dark:border-blue-500/20 hover:border-blue-300/50 dark:hover:border-blue-400/30 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Droplets className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-sm text-muted-foreground">Kelembapan Tanah</span>
                </div>
                <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-0">
                  Normal
                </Badge>
              </div>
              <p className="text-foreground !text-3xl !font-bold">
                {analytics.performance.avgSoilMoisture.toFixed(1)}%
              </p>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                    style={{ width: `${analytics.performance.avgSoilMoisture}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">100%</span>
              </div>
            </div>

            {/* Water Usage */}
            <div className="glass-card dark:glass-card-dark p-4 rounded-lg border-2 border-purple-200/30 dark:border-purple-500/20 hover:border-purple-300/50 dark:hover:border-purple-400/30 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Activity className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-sm text-muted-foreground">Penggunaan Air</span>
                </div>
                <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-0">
                  Efisien
                </Badge>
              </div>
              <p className="text-foreground !text-3xl !font-bold">
                {analytics.performance.totalWaterUsage.toLocaleString()}
                <span className="text-lg text-muted-foreground ml-1">
                  {analytics.performance.unit}
                </span>
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Total konsumsi bulan ini
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Row 2: Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Status */}
        <Card className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 p-6">
          <div className="flex items-center gap-2 mb-6">
            <PieChart className="w-5 h-5 text-[#3B945E]" />
            <h3 className="text-foreground">Status Perangkat</h3>
          </div>
          <SimplePieChart data={analytics.deviceStatus} colors={deviceColors} />
          <div className="grid grid-cols-2 gap-3 mt-6">
            {analytics.deviceStatus && analytics.deviceStatus.map((item, idx) => (
              <div 
                key={idx}
                className="text-center p-3 rounded-lg glass-card dark:glass-card-dark border border-white/20"
              >
                <div 
                  className="w-3 h-3 rounded-full mx-auto mb-2"
                  style={{ backgroundColor: deviceColors[idx] }}
                />
                <p className="text-xs text-muted-foreground mb-1">{item.name}</p>
                <p className="text-foreground !font-bold">{item.value}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Network Condition */}
        <Card className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Droplets className="w-5 h-5 text-cyan-600" />
            <h3 className="text-foreground">Kondisi Jaringan Irigasi</h3>
          </div>
          <SimplePieChart data={networkPieData} colors={networkColors} />
          <div className="grid grid-cols-3 gap-3 mt-6">
            {networkPieData && networkPieData.map((item, idx) => (
              <div 
                key={idx}
                className="text-center p-3 rounded-lg glass-card dark:glass-card-dark border border-white/20"
              >
                <div 
                  className="w-3 h-3 rounded-full mx-auto mb-2"
                  style={{ backgroundColor: networkColors[idx] }}
                />
                <p className="text-xs text-muted-foreground mb-1">{item.name}</p>
                <p className="text-foreground !font-bold">{item.value}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Irrigation Summary */}
      <Card className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Sprout className="w-5 h-5 text-green-600" />
          <h3 className="text-foreground">Ringkasan Irigasi Jawa Timur</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Networks */}
          <div className="p-4 rounded-lg glass-card dark:glass-card-dark border-2 border-cyan-200/30 dark:border-cyan-500/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-cyan-500/10">
                <Droplets className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Jaringan</p>
                <p className="text-foreground !text-2xl !font-bold">
                  {irrigationStats.totalJaringan}
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Jaringan irigasi aktif</p>
          </div>

          {/* Total Area */}
          <div className="p-4 rounded-lg glass-card dark:glass-card-dark border-2 border-green-200/30 dark:border-green-500/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Luas Areal</p>
                <p className="text-foreground !text-2xl !font-bold">
                  {(irrigationStats.totalLuasAreal / 1000).toFixed(0)}K
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Hektar area total</p>
          </div>

          {/* Service Area */}
          <div className="p-4 rounded-lg glass-card dark:glass-card-dark border-2 border-blue-200/30 dark:border-blue-500/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Luas Layanan</p>
                <p className="text-foreground !text-2xl !font-bold">
                  {(irrigationStats.totalLuasLayanan / 1000).toFixed(0)}K
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {((irrigationStats.totalLuasLayanan / irrigationStats.totalLuasAreal) * 100).toFixed(0)}% efisiensi
            </p>
          </div>

          {/* Maintenance Cost */}
          <div className="p-4 rounded-lg glass-card dark:glass-card-dark border-2 border-purple-200/30 dark:border-purple-500/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Biaya Pemeliharaan</p>
                <p className="text-foreground !text-2xl !font-bold">
                  {(irrigationStats.totalBiayaPemeliharaan / 1000).toFixed(1)}M
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Juta rupiah/tahun</p>
          </div>
        </div>

        {/* Average Condition Progress Bar */}
        <div className="mt-6 p-4 rounded-lg glass-card dark:glass-card-dark border border-white/20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Rata-rata Kondisi Baik</span>
            <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-0">
              {irrigationStats.rataKondisiBaik.toFixed(1)}%
            </Badge>
          </div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-1000"
              style={{ width: `${irrigationStats.rataKondisiBaik}%` }}
            />
          </div>
        </div>
      </Card>

      {/* System Health Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Data Collection Rate */}
        <Card className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-green-500/10">
              <Activity className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h4 className="text-foreground">Data Collection</h4>
          </div>
          <p className="text-foreground !text-3xl !font-bold mb-2">
            {((systemStats.dataPoints / 1000000).toFixed(2))}M
          </p>
          <p className="text-xs text-muted-foreground mb-3">Total data points collected</p>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-600 dark:text-green-400">+{systemStats.growthRate}% this month</span>
          </div>
        </Card>

        {/* System Uptime */}
        <Card className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h4 className="text-foreground">System Uptime</h4>
          </div>
          <p className="text-foreground !text-3xl !font-bold mb-2">99.8%</p>
          <p className="text-xs text-muted-foreground mb-3">Last 30 days availability</p>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" style={{ width: '99.8%' }} />
          </div>
        </Card>

        {/* Active Locations */}
        <Card className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h4 className="text-foreground">Active Locations</h4>
          </div>
          <p className="text-foreground !text-3xl !font-bold mb-2">{systemStats.locations}</p>
          <p className="text-xs text-muted-foreground mb-3">Cities across Indonesia</p>
          <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-0">
            Coverage expanding
          </Badge>
        </Card>
      </div>
    </div>
  );
}
