/**
 * User Dashboard Component
 * 
 * Main dashboard for regular users
 * Features: Sensor monitoring, device control, statistics, profile management
 */

import { useState } from 'react';
import { Sprout, Home, Power, BarChart3, User as UserIcon } from 'lucide-react';
import type { User } from '../App';
import {
  BottomNav,
  DashboardLayout,
  DashboardHeader,
  LogoutConfirmationDialog,
  UserDashboardContent,
  UserDeviceTab,
  UserStatisticsTab,
  UserProfileTab,
  UserSidebar
} from './dashboard';
import type { NavItem } from './dashboard/BottomNav';

interface UserDashboardProps {
  user: User | null;
  onLogout: () => void;
}

type MobileTab = 'dashboard' | 'device' | 'statistics' | 'profile';

export default function UserDashboard({ user, onLogout }: UserDashboardProps) {
  const [mobileTab, setMobileTab] = useState<MobileTab>('dashboard');
  const [autoMode, setAutoMode] = useState(true);
  const [irrigationOn, setIrrigationOn] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  // User Dashboard Navigation Items
  const userNavItems: NavItem<MobileTab>[] = [
    { id: 'dashboard', label: 'Beranda', icon: Home },
    { id: 'device', label: 'Perangkat', icon: Power },
    { id: 'statistics', label: 'Statistik', icon: BarChart3 },
    { id: 'profile', label: 'Profil', icon: UserIcon },
  ];

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutConfirm = () => {
    setLogoutDialogOpen(false);
    onLogout();
  };

  const renderContent = () => {
    switch (mobileTab) {
      case 'dashboard':
        return (
          <UserDashboardContent
            autoMode={autoMode}
            irrigationOn={irrigationOn}
            setAutoMode={setAutoMode}
            setIrrigationOn={setIrrigationOn}
            userEmail={user?.email} // ✅ Pass user email for personalized data
          />
        );
      case 'device':
        return (
          <UserDeviceTab
            autoMode={autoMode}
            irrigationOn={irrigationOn}
            setAutoMode={setAutoMode}
            setIrrigationOn={setIrrigationOn}
            userEmail={user?.email} // ✅ Pass user email for device list
          />
        );
      case 'statistics':
        return <UserStatisticsTab userEmail={user?.email} />;
      case 'profile':
        return <UserProfileTab user={user} onLogoutClick={handleLogoutClick} />;
      default:
        return (
          <UserDashboardContent
            autoMode={autoMode}
            irrigationOn={irrigationOn}
            setAutoMode={setAutoMode}
            setIrrigationOn={setIrrigationOn}
            userEmail={user?.email} // ✅ Pass user email
          />
        );
    }
  };

  return (
    <DashboardLayout>
      {/* Header - Fixed/Sticky */}
      <DashboardHeader
        icon={Sprout}
        title="AGROGUARD IoT"
        subtitle="User Dashboard"
        mobileTitle="AGROGUARD"
        mobileSubtitle="IoT Dashboard"
        onLogout={handleLogoutClick}
      />

      {/* Content */}
      <div className={`transition-all duration-300 ${
        sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
      } px-4 md:px-6 lg:px-8 py-6 pb-24 md:pb-6 pt-[72px] md:pt-[80px]`}>
        <div className="max-w-[1600px] mx-auto">
          {renderContent()}
        </div>
      </div>

      {/* Bottom Navigation - Mobile */}
      <BottomNav 
        activeTab={mobileTab} 
        onTabChange={setMobileTab}
        navItems={userNavItems}
      />

      {/* Desktop Sidebar Navigation */}
      <UserSidebar
        activeTab={mobileTab}
        onTabChange={setMobileTab}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
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
