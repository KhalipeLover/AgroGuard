/**
 * User Card List Component - AdminDashboard Users Tab
 * 
 * Card-based user list with accordion details, search, filter, and sorting
 * Replaces table view with professional card layout
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
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
  XCircle,
  User,
  Mail,
  MapPin,
  Smartphone,
  Calendar,
  Clock,
  Loader2
} from 'lucide-react';
import type { AdminUser } from '../../data';

interface UserCardListProps {
  users: AdminUser[];
  loading: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function UserCardList({ users, loading, searchQuery, onSearchChange }: UserCardListProps) {
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name' | 'devices'>('newest');
  const [displayCount, setDisplayCount] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Filter users by status
  const filteredByStatus = users.filter(user => {
    if (filterStatus === 'all') return true;
    return user.status === filterStatus;
  });

  // Sort users
  const sortedUsers = [...filteredByStatus].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.joinedDate || 0).getTime() - new Date(a.joinedDate || 0).getTime();
      case 'oldest':
        return new Date(a.joinedDate || 0).getTime() - new Date(b.joinedDate || 0).getTime();
      case 'name':
        return a.name.localeCompare(b.name);
      case 'devices':
        return b.devices - a.devices;
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
    if (isLoadingMore || displayCount >= sortedUsers.length) return;
    
    setIsLoadingMore(true);
    // Simulate loading delay
    setTimeout(() => {
      setDisplayCount(prev => Math.min(prev + 10, sortedUsers.length));
      setIsLoadingMore(false);
    }, 500);
  }, [isLoadingMore, displayCount, sortedUsers.length]);

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

  // Get displayed users
  const displayedUsers = sortedUsers.slice(0, displayCount);
  const hasMore = displayCount < sortedUsers.length;

  return (
    <Card className="p-6 glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 shadow-xl">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6">
        <div>
          <h3 className="text-foreground mb-1">Manajemen Pengguna</h3>
          <p className="text-muted-foreground">Kelola akun pengguna AGROGUARD</p>
        </div>

        {/* Search, Filter, Sort */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Cari nama, email, atau lokasi..."
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
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
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
              <SelectItem value="name">Nama (A-Z)</SelectItem>
              <SelectItem value="devices">Devices Terbanyak</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <p>
            Menampilkan <span className="text-foreground font-semibold">{displayedUsers.length}</span> dari <span className="text-foreground font-semibold">{sortedUsers.length}</span> pengguna
            {sortedUsers.length !== users.length && (
              <span className="ml-1">({users.length} total)</span>
            )}
          </p>
        </div>
      </div>

      {/* User Cards with Accordion */}
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
        ) : sortedUsers.length === 0 ? (
          // Empty State
          <Card className="p-12 glass-card dark:glass-card-dark border-2 border-white/20 dark:border-white/5 text-center">
            <User className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
            <h4 className="text-foreground mb-2">Tidak Ada Pengguna</h4>
            <p className="text-muted-foreground">
              {searchQuery ? 'Tidak ditemukan pengguna yang cocok dengan pencarian' : 'Belum ada pengguna terdaftar'}
            </p>
          </Card>
        ) : (
          // User Cards
          <Accordion type="single" collapsible className="space-y-3">
            {displayedUsers.map((user) => (
              <AccordionItem 
                key={user.id} 
                value={user.id}
                className="border-0"
              >
                <Card className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 overflow-hidden hover:shadow-lg transition-all duration-300">
                  <AccordionTrigger className="px-4 py-4 hover:no-underline hover:bg-white/20 dark:hover:bg-white/5 transition-smooth">
                    <div className="flex items-center gap-4 w-full pr-4">
                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3B945E] to-[#0077B6] flex items-center justify-center text-white flex-shrink-0">
                        <span className="text-lg">{user.name.charAt(0).toUpperCase()}</span>
                      </div>

                      {/* Main Info */}
                      <div className="flex-1 text-left min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-foreground truncate">{user.name}</h4>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1 truncate">
                            <Mail className="w-3 h-3" />
                            {user.email}
                          </span>
                          <span className="flex items-center gap-1 truncate hidden sm:flex">
                            <MapPin className="w-3 h-3" />
                            {user.location}
                          </span>
                        </div>
                      </div>

                      {/* Status & Devices */}
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                          {user.devices} devices
                        </Badge>
                        {user.status === 'active' ? (
                          <Badge className="bg-green-500 dark:bg-green-600 text-white border-0 shadow-md glow-accent">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Active
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-500 text-white border-0 shadow-md">
                            <XCircle className="w-3 h-3 mr-1" />
                            Inactive
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
                      {/* Left Column */}
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 rounded-lg glass-card dark:glass-card-dark border border-white/20 dark:border-white/5">
                          <Mail className="w-5 h-5 text-[#3B945E] dark:text-[#4CAF6E] mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                            <p className="text-sm text-foreground truncate">{user.email}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 rounded-lg glass-card dark:glass-card-dark border border-white/20 dark:border-white/5">
                          <Smartphone className="w-5 h-5 text-[#0077B6] dark:text-[#0099E6] mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-muted-foreground mb-0.5">Telepon</p>
                            <p className="text-sm text-foreground">{user.phone || 'Tidak tersedia'}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 rounded-lg glass-card dark:glass-card-dark border border-white/20 dark:border-white/5">
                          <MapPin className="w-5 h-5 text-[#FFB703] mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-muted-foreground mb-0.5">Lokasi</p>
                            <p className="text-sm text-foreground">{user.location}</p>
                          </div>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 rounded-lg glass-card dark:glass-card-dark border border-white/20 dark:border-white/5">
                          <Calendar className="w-5 h-5 text-[#3B945E] dark:text-[#4CAF6E] mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-muted-foreground mb-0.5">Tanggal Bergabung</p>
                            <p className="text-sm text-foreground">{formatDate(user.joinedDate)}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 rounded-lg glass-card dark:glass-card-dark border border-white/20 dark:border-white/5">
                          <Clock className="w-5 h-5 text-[#0077B6] dark:text-[#0099E6] mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-muted-foreground mb-0.5">Terakhir Aktif</p>
                            <p className="text-sm text-foreground">{formatRelativeTime(user.lastActive)}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 rounded-lg glass-card dark:glass-card-dark border border-white/20 dark:border-white/5">
                          <Smartphone className="w-5 h-5 text-[#FFB703] mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-muted-foreground mb-0.5">Total Devices</p>
                            <p className="text-sm text-foreground">{user.devices} perangkat IoT terdaftar</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-4 pt-4 border-t border-white/20 dark:border-white/5">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 glass-card dark:glass-card-dark hover:bg-[#3B945E]/10 hover:border-[#3B945E]/50 hover:text-[#3B945E] dark:hover:text-[#4CAF6E] transition-smooth"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Lihat Profil
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 glass-card dark:glass-card-dark hover:bg-[#0077B6]/10 hover:border-[#0077B6]/50 hover:text-[#0077B6] dark:hover:text-[#0099E6] transition-smooth"
                      >
                        <Smartphone className="w-4 h-4 mr-2" />
                        Kelola Devices
                      </Button>
                    </div>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            ))}
          </Accordion>
        )}

        {/* Infinite Scroll Trigger & Loading Indicator */}
        {!loading && sortedUsers.length > 0 && (
          <div ref={loadMoreRef} className="py-8 flex justify-center">
            {isLoadingMore && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Memuat lebih banyak...</span>
              </div>
            )}
            {!isLoadingMore && hasMore && (
              <p className="text-sm text-muted-foreground">
                Scroll untuk memuat lebih banyak
              </p>
            )}
            {!hasMore && displayedUsers.length > 10 && (
              <p className="text-sm text-muted-foreground">
                Semua pengguna telah ditampilkan
              </p>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
