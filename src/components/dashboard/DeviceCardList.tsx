/**
 * Device Card List Component - AdminDashboard Devices Tab
 * 
 * Card-based device list with accordion details, search, filter, and sorting
 * Consistent with UserCardList pattern
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Skeleton } from '../ui/skeleton';
import {
  Search,
  Filter,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  XCircle,
  Activity,
  Thermometer,
  Droplets,
  Wifi,
  User,
  MapPin,
  Calendar,
  Clock,
  Loader2
} from 'lucide-react';
import type { AdminDevice } from '../../data';

interface DeviceCardListProps {
  devices: AdminDevice[];
  loading: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function DeviceCardList({ devices, loading, searchQuery, onSearchChange }: DeviceCardListProps) {
  const [filterStatus, setFilterStatus] = useState<'all' | 'online' | 'offline' | 'warning'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'owner' | 'status'>('newest');
  const [displayCount, setDisplayCount] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Filter devices by status
  const filteredByStatus = devices.filter(device => {
    if (filterStatus === 'all') return true;
    return device.status === filterStatus;
  });

  // Sort devices
  const sortedDevices = [...filteredByStatus].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.installDate || 0).getTime() - new Date(a.installDate || 0).getTime();
      case 'oldest':
        return new Date(a.installDate || 0).getTime() - new Date(b.installDate || 0).getTime();
      case 'owner':
        return a.owner.localeCompare(b.owner);
      case 'status':
        const statusOrder = { online: 0, warning: 1, offline: 2 };
        return statusOrder[a.status] - statusOrder[b.status];
      default:
        return 0;
    }
  });

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  // Format relative time
  const formatRelativeTime = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) return `${diffMins} menit lalu`;
    if (diffHours < 24) return `${diffHours} jam lalu`;
    if (diffDays < 7) return `${diffDays} hari lalu`;
    return formatDate(dateString);
  };

  // Load more handler
  const loadMore = useCallback(() => {
    if (isLoadingMore || displayCount >= sortedDevices.length) return;
    
    setIsLoadingMore(true);
    // Simulate loading delay
    setTimeout(() => {
      setDisplayCount(prev => Math.min(prev + 10, sortedDevices.length));
      setIsLoadingMore(false);
    }, 500);
  }, [isLoadingMore, displayCount, sortedDevices.length]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && !isLoadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [loadMore, loading, isLoadingMore]);

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(10);
  }, [filterStatus, sortBy, searchQuery]);

  // Get displayed devices
  const displayedDevices = sortedDevices.slice(0, displayCount);
  const hasMore = displayCount < sortedDevices.length;

  return (
    <Card className="p-6 glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 shadow-xl">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6">
        <div>
          <h3 className="text-foreground mb-1">Manajemen Perangkat</h3>
          <p className="text-muted-foreground">Kelola perangkat IoT AGROGUARD</p>
        </div>

        {/* Search, Filter, Sort */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Cari ID, pemilik, atau lokasi..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 glass-card dark:glass-card-dark border-white/30 dark:border-white/10 focus:border-[#3B945E]/50 focus:ring-[#3B945E]/20 transition-smooth"
            />
          </div>

          {/* Filter Status */}
          <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
            <SelectTrigger className="w-full sm:w-[160px] glass-card dark:glass-card-dark border-white/30 dark:border-white/10">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
            <SelectTrigger className="w-full sm:w-[160px] glass-card dark:glass-card-dark border-white/30 dark:border-white/10">
              <div className="flex items-center gap-2">
                <ChevronDown className="w-4 h-4" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Terbaru</SelectItem>
              <SelectItem value="oldest">Terlama</SelectItem>
              <SelectItem value="owner">Pemilik (A-Z)</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <p>
            Menampilkan <span className="text-foreground font-semibold">{displayedDevices.length}</span> dari <span className="text-foreground font-semibold">{sortedDevices.length}</span> perangkat
            {sortedDevices.length !== devices.length && (
              <span className="ml-1">({devices.length} total)</span>
            )}
          </p>
        </div>
      </div>

      {/* Device Cards with Accordion */}
      <div className="space-y-3">
        {loading ? (
          // Loading Skeletons
          <>
            {[1, 2, 3, 4, 5].map(i => (
              <Card key={i} className="p-4 glass-card dark:glass-card-dark border-2 border-white/20 dark:border-white/5">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-60" />
                  </div>
                  <Skeleton className="h-6 w-16" />
                </div>
              </Card>
            ))}
          </>
        ) : sortedDevices.length === 0 ? (
          // Empty State
          <Card className="p-12 glass-card dark:glass-card-dark border-2 border-white/20 dark:border-white/5 text-center">
            <Activity className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
            <h4 className="text-foreground mb-2">Tidak Ada Perangkat</h4>
            <p className="text-muted-foreground">
              {searchQuery ? 'Tidak ditemukan perangkat yang cocok dengan pencarian' : 'Belum ada perangkat terdaftar'}
            </p>
          </Card>
        ) : (
          // Device Cards
          <Accordion type="single" collapsible className="space-y-3">
            {displayedDevices.map((device) => (
              <AccordionItem 
                key={device.id} 
                value={device.id}
                className="border-0"
              >
                <Card className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 overflow-hidden hover:shadow-lg transition-all duration-300">
                  <AccordionTrigger className="px-4 py-4 hover:no-underline hover:bg-white/20 dark:hover:bg-white/5 transition-smooth">
                    <div className="flex items-center gap-4 w-full pr-4">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0 ${
                        device.status === 'online' 
                          ? 'bg-gradient-to-br from-green-500 to-green-600' 
                          : device.status === 'warning'
                          ? 'bg-gradient-to-br from-yellow-500 to-yellow-600'
                          : 'bg-gradient-to-br from-gray-500 to-gray-600'
                      }`}>
                        <Activity className="w-6 h-6" />
                      </div>

                      {/* Main Info */}
                      <div className="flex-1 text-left min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-foreground truncate">{device.id}</h4>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1 truncate">
                            <User className="w-3 h-3" />
                            {device.owner}
                          </span>
                          <span className="flex items-center gap-1 truncate hidden sm:flex">
                            <MapPin className="w-3 h-3" />
                            {device.location}
                          </span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="flex items-center gap-3 flex-shrink-0">
                        {device.status === 'online' ? (
                          <Badge className="bg-green-500 dark:bg-green-600 text-white border-0 shadow-md glow-accent">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Online
                          </Badge>
                        ) : device.status === 'warning' ? (
                          <Badge className="bg-yellow-500 dark:bg-yellow-600 text-white border-0 shadow-md">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Warning
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-500 text-white border-0 shadow-md">
                            <XCircle className="w-3 h-3 mr-1" />
                            Offline
                          </Badge>
                        )}
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="px-4 pb-4 pt-2">
                    {/* Divider */}
                    <div className="h-px bg-white/20 dark:bg-white/5 mb-4"></div>

                    {/* Detailed Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Left Column - Sensor Data */}
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 rounded-lg glass-card dark:glass-card-dark border border-white/20 dark:border-white/5">
                          <Thermometer className="w-5 h-5 text-[#FF6B6B] mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-muted-foreground mb-0.5">Suhu</p>
                            <p className="text-sm text-foreground">{device.temperature.toFixed(1)}°C</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 rounded-lg glass-card dark:glass-card-dark border border-white/20 dark:border-white/5">
                          <Droplets className="w-5 h-5 text-[#0077B6] dark:text-[#0099E6] mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-muted-foreground mb-0.5">Kelembapan Udara</p>
                            <p className="text-sm text-foreground">{device.humidity.toFixed(1)}%</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 rounded-lg glass-card dark:glass-card-dark border border-white/20 dark:border-white/5">
                          <Droplets className="w-5 h-5 text-[#3B945E] dark:text-[#4CAF6E] mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-muted-foreground mb-0.5">Kelembapan Tanah</p>
                            <p className="text-sm text-foreground">{device.soilMoisture.toFixed(1)}%</p>
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Device Info */}
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 rounded-lg glass-card dark:glass-card-dark border border-white/20 dark:border-white/5">
                          <User className="w-5 h-5 text-[#3B945E] dark:text-[#4CAF6E] mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-muted-foreground mb-0.5">Pemilik</p>
                            <p className="text-sm text-foreground truncate">{device.owner}</p>
                            <p className="text-xs text-muted-foreground truncate">{device.ownerEmail}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 rounded-lg glass-card dark:glass-card-dark border border-white/20 dark:border-white/5">
                          <Calendar className="w-5 h-5 text-[#0077B6] dark:text-[#0099E6] mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-muted-foreground mb-0.5">Tanggal Instalasi</p>
                            <p className="text-sm text-foreground">{formatDate(device.installDate)}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 rounded-lg glass-card dark:glass-card-dark border border-white/20 dark:border-white/5">
                          <Wifi className="w-5 h-5 text-[#FFB703] mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-muted-foreground mb-0.5">Terakhir Sinkronisasi</p>
                            <p className="text-sm text-foreground">{formatRelativeTime(device.lastSync)}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-white/20 dark:bg-white/5 my-4"></div>

                    {/* Location Info */}
                    <div className="flex items-start gap-3 p-3 rounded-lg glass-card dark:glass-card-dark border border-white/20 dark:border-white/5">
                      <MapPin className="w-5 h-5 text-[#3B945E] dark:text-[#4CAF6E] mt-0.5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-muted-foreground mb-0.5">Lokasi</p>
                        <p className="text-sm text-foreground mb-1">{device.location}</p>
                        <p className="text-xs text-muted-foreground">
                          GPS: {device.latitude.toFixed(6)}, {device.longitude.toFixed(6)}
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            ))}
          </Accordion>
        )}

        {/* Infinite Scroll Trigger & Loading More */}
        {!loading && hasMore && (
          <div ref={loadMoreRef} className="py-4">
            {isLoadingMore && (
              <div className="flex justify-center items-center gap-2 text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Memuat lebih banyak...</span>
              </div>
            )}
          </div>
        )}

        {/* End Message */}
        {!loading && !hasMore && displayedDevices.length > 0 && (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">
              Semua perangkat telah dimuat ({sortedDevices.length} perangkat)
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
