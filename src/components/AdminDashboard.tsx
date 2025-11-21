import { useState, useEffect } from 'react';
import motion, { AnimatePresence } from './ui/motion-replacement';
import {
  Users,
  Activity,
  MapPin,
  Database,
  TrendingUp,
  Shield,
  Download,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  UserPlus,
  Map
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import type { User } from '../App';
import { 
  AdminStats, 
  DeviceMap, 
  DashboardLayout, 
  DashboardHeader, 
  LogoutConfirmationDialog,
  AdminStatCardSkeleton,
  TableRowSkeleton,
  LeadsManagement,
  BottomNav,
  UserCardList,
  DeviceCardList
} from './dashboard';
import type { NavItem } from './dashboard/BottomNav';
import {
  fetchAdminUsers,
  fetchAdminDevices,
  fetchSystemStats,
  searchUsers,
  searchDevices,
  type AdminUser,
  type AdminDevice,
  type SystemStats
} from '../data';

interface AdminDashboardProps {
  user: User | null;
  onLogout: () => void;
}

type AdminTab = 'users' | 'devices' | 'leads' | 'map' | 'statistics';

export default function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [deviceSearchQuery, setDeviceSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('users');
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [isTabsFixed, setIsTabsFixed] = useState(false);

  // Admin Dashboard Navigation Items
  const adminNavItems: NavItem<AdminTab>[] = [
    { id: 'users', label: 'Users', icon: Users },
    { id: 'devices', label: 'Devices', icon: Activity },
    { id: 'leads', label: 'Leads', icon: UserPlus },
    { id: 'map', label: 'Map', icon: MapPin },
    { id: 'statistics', label: 'Stats', icon: TrendingUp },
  ];
  
  // Data states
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [devices, setDevices] = useState<AdminDevice[]>([]);
  const [systemStats, setSystemStats] = useState<SystemStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(false);
  const [devicesLoading, setDevicesLoading] = useState(false);

  // Scroll detection for fixed tabs
  useEffect(() => {
    const handleScroll = () => {
      // Get stats card element to calculate exact position
      const statsCard = document.getElementById('stats-card');
      
      if (statsCard) {
        const statsBottom = statsCard.offsetTop + statsCard.offsetHeight;
        // Add small buffer (20px) after stats card
        const scrollThreshold = statsBottom + 20 - 100; // Adjust for container padding
        
        const shouldBeFixed = window.scrollY > scrollThreshold;
        setIsTabsFixed(shouldBeFixed);
      } else {
        // Fallback if stats card not found
        const scrollThreshold = 250;
        setIsTabsFixed(window.scrollY > scrollThreshold);
      }
    };

    // Initial check and recalculate after a short delay (for layout to settle)
    handleScroll();
    const timer = setTimeout(handleScroll, 500);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Load system stats
  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const stats = await fetchSystemStats();
        setSystemStats(stats);
      } catch {
        // Silent fail - stats akan tetap di default state
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  // Load users when users tab is active
  useEffect(() => {
    if (activeTab === 'users' && users.length === 0) {
      const loadUsers = async () => {
        try {
          setUsersLoading(true);
          const data = await fetchAdminUsers();
          setUsers(data);
        } catch {
          // Silent fail
        } finally {
          setUsersLoading(false);
        }
      };

      loadUsers();
    }
  }, [activeTab, users.length]);

  // Load devices when devices OR map tab is active
  useEffect(() => {
    if ((activeTab === 'devices' || activeTab === 'map') && devices.length === 0) {
      const loadDevices = async () => {
        try {
          setDevicesLoading(true);
          const data = await fetchAdminDevices();
          setDevices(data);
        } catch {
          // Silent fail
        } finally {
          setDevicesLoading(false);
        }
      };

      loadDevices();
    }
  }, [activeTab, devices.length]);

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutConfirm = () => {
    setLogoutDialogOpen(false);
    onLogout();
  };

  // Filter users based on search
  const filteredUsers = searchQuery ? searchUsers(searchQuery) : users;
  
  // Filter devices based on search (separate search query)
  const filteredDevices = deviceSearchQuery ? searchDevices(deviceSearchQuery) : devices;

  return (
    <DashboardLayout>
      <DashboardHeader
        icon={Shield}
        title="Admin Dashboard"
        subtitle="AGROGUARD IoT Management System"
        mobileTitle="Admin Dashboard"
        mobileSubtitle="AGROGUARD IoT"
        onLogout={handleLogoutClick}
      />

      {/* Stats Overview */}
      <div className="container mx-auto px-4 py-6 pb-24 md:pb-8 pt-[88px] md:pt-[100px] relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Stats Cards - Wrapped in Container Card */}
          <Card className="p-6 glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 shadow-xl mb-8" id="stats-card">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {loading ? (
                <>
                  {[1, 2, 3, 4].map(i => <AdminStatCardSkeleton key={i} />)}
                </>
              ) : systemStats ? (
                <>
                  <div className="flex flex-col items-start">
                    <div className="flex items-center justify-between w-full mb-4">
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg glow-primary">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="text-muted-foreground mb-1 text-sm">Total Pengguna</p>
                    <h2 className="text-foreground mb-2 !text-3xl !font-bold">{systemStats.totalUsers}</h2>
                    <p className="text-green-600 dark:text-green-400 text-sm">↑ {systemStats.growthRate}% bulan ini</p>
                  </div>

                  <div className="flex flex-col items-start">
                    <div className="flex items-center justify-between w-full mb-4">
                      <div className="bg-gradient-to-br from-[#3B945E] to-[#4CAF6E] p-3 rounded-xl shadow-lg glow-primary">
                        <Activity className="w-6 h-6 text-white" />
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="text-muted-foreground mb-1 text-sm">Perangkat</p>
                    <h2 className="text-foreground mb-2 !text-3xl !font-bold">{systemStats.activeDevices}</h2>
                    <p className="text-muted-foreground text-sm">dari {systemStats.totalDevices} total</p>
                  </div>

                  <div className="flex flex-col items-start">
                    <div className="flex items-center justify-between w-full mb-4">
                      <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl shadow-lg glow-accent">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <Badge className="bg-green-500 dark:bg-green-600 text-white border-0 shadow-lg pulse-online">Live</Badge>
                    </div>
                    <p className="text-muted-foreground mb-1 text-sm">Leads</p>
                    <h2 className="text-foreground mb-2 !text-3xl !font-bold">{systemStats.locations}</h2>
                    <p className="text-muted-foreground text-sm">Kota di Indonesia</p>
                  </div>

                  <div className="flex flex-col items-start">
                    <div className="flex items-center justify-between w-full mb-4">
                      <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-xl shadow-lg glow-accent">
                        <Database className="w-6 h-6 text-white" />
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="text-muted-foreground mb-1 text-sm">Statistik</p>
                    <h2 className="text-foreground mb-2 !text-3xl !font-bold">{(systemStats.dataPoints / 1000000).toFixed(1)}M</h2>
                    <p className="text-muted-foreground text-sm">Total collected</p>
                  </div>
                </>
              ) : null}
            </div>
          </Card>
        </motion.div>

        {/* Custom Tab Navigation - Desktop Only - DYNAMIC FIXED ON SCROLL */}
        <div 
          className={`hidden md:block transition-all duration-300 ${
            isTabsFixed 
              ? 'fixed top-[64px] left-0 right-0 z-[200] py-3 shadow-lg' 
              : 'relative mb-8'
          }`}
        >
          <div className={isTabsFixed ? 'container mx-auto px-4' : ''}>
            <Card className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 shadow-xl overflow-hidden backdrop-blur-xl bg-white/95 dark:bg-[#0E172A]/95">
              <div className="grid grid-cols-5 w-full">
                <button
                  onClick={() => setActiveTab('users')}
                  className={`relative h-14 px-6 border-b-3 transition-all duration-300 flex items-center justify-center gap-2.5 whitespace-nowrap ${
                    activeTab === 'users'
                      ? 'border-[#3B945E] bg-gradient-to-t from-[#3B945E]/10 to-transparent text-[#3B945E] dark:text-[#4CAF6E] font-semibold'
                      : 'border-transparent hover:bg-white/40 dark:hover:bg-white/5 text-foreground'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  Pengguna
                </button>
                <button
                  onClick={() => setActiveTab('devices')}
                  className={`relative h-14 px-6 border-b-3 transition-all duration-300 flex items-center justify-center gap-2.5 whitespace-nowrap ${
                    activeTab === 'devices'
                      ? 'border-[#3B945E] bg-gradient-to-t from-[#3B945E]/10 to-transparent text-[#3B945E] dark:text-[#4CAF6E] font-semibold'
                      : 'border-transparent hover:bg-white/40 dark:hover:bg-white/5 text-foreground'
                  }`}
                >
                  <Activity className="w-4 h-4" />
                  Perangkat
                </button>
                <button
                  onClick={() => setActiveTab('leads')}
                  className={`relative h-14 px-6 border-b-3 transition-all duration-300 flex items-center justify-center gap-2.5 whitespace-nowrap ${
                    activeTab === 'leads'
                      ? 'border-[#3B945E] bg-gradient-to-t from-[#3B945E]/10 to-transparent text-[#3B945E] dark:text-[#4CAF6E] font-semibold'
                      : 'border-transparent hover:bg-white/40 dark:hover:bg-white/5 text-foreground'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  Leads
                </button>
                <button
                  onClick={() => setActiveTab('map')}
                  className={`relative h-14 px-6 border-b-3 transition-all duration-300 flex items-center justify-center gap-2.5 whitespace-nowrap ${
                    activeTab === 'map'
                      ? 'border-[#3B945E] bg-gradient-to-t from-[#3B945E]/10 to-transparent text-[#3B945E] dark:text-[#4CAF6E] font-semibold'
                      : 'border-transparent hover:bg-white/40 dark:hover:bg-white/5 text-foreground'
                  }`}
                >
                  <Map className="w-4 h-4" />
                  Peta GIS
                  <Badge className="ml-1.5 bg-green-500 text-white border-0 text-xs px-2 py-0.5 h-5 pulse-online">Live</Badge>
                </button>
                <button
                  onClick={() => setActiveTab('statistics')}
                  className={`relative h-14 px-6 border-b-3 transition-all duration-300 flex items-center justify-center gap-2.5 whitespace-nowrap ${
                    activeTab === 'statistics'
                      ? 'border-[#3B945E] bg-gradient-to-t from-[#3B945E]/10 to-transparent text-[#3B945E] dark:text-[#4CAF6E] font-semibold'
                      : 'border-transparent hover:bg-white/40 dark:hover:bg-white/5 text-foreground'
                  }`}
                >
                  <Database className="w-4 h-4" />
                  Statistik
                </button>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Spacer when tabs are fixed */}
        {isTabsFixed && <div className="hidden md:block h-[80px]"></div>}

        {/* Tab Content */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="space-y-6">
            <div>

            {/* Users Tab */}
            <TabsContent value="users" className="mt-6">
              <UserCardList
                users={filteredUsers}
                loading={usersLoading}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </TabsContent>

            {/* Devices Tab */}
            <TabsContent value="devices" className="mt-6">
              <DeviceCardList
                devices={filteredDevices}
                loading={devicesLoading}
                searchQuery={deviceSearchQuery}
                onSearchChange={setDeviceSearchQuery}
              />
            </TabsContent>

            {/* Leads Tab */}
            <TabsContent value="leads" className="mt-6">
              <LeadsManagement />
            </TabsContent>

            {/* Map Tab */}
            <TabsContent value="map" className="mt-6">
              <Card className="p-6 glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 shadow-xl">
                <h3 className="text-foreground mb-4">Peta Sebaran Device</h3>
                {devicesLoading ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#3B945E] mb-4"></div>
                    <p>Loading map data...</p>
                  </div>
                ) : devices.length > 0 ? (
                  <DeviceMap devices={devices} />
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <MapPin className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p>No devices found</p>
                  </div>
                )}
              </Card>
            </TabsContent>

            {/* Statistics Tab */}
            <TabsContent value="statistics" className="mt-6">
              <Card className="p-6 glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 shadow-xl">
                <h3 className="text-foreground mb-4">Statistik Sistem</h3>
                <AdminStats />
              </Card>
            </TabsContent>
            </div>
          </Tabs>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        navItems={adminNavItems}
      />

      {/* Logout Confirmation Dialog */}
      <LogoutConfirmationDialog
        isOpen={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </DashboardLayout>
  );
}