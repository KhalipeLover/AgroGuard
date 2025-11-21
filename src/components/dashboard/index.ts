/**
 * Dashboard Components Index
 * 
 * Centralized exports for all dashboard-related components
 * Provides cleaner import statements
 */

// Modular Components
export { default as BackgroundPattern } from './BackgroundPattern';
export { default as DashboardHeader } from './DashboardHeader';
export { default as DashboardLayout } from './DashboardLayout';
export { default as LogoutConfirmationDialog } from './LogoutConfirmationDialog';

// Page-Specific Components
export { default as AdminStats } from './AdminStats';
export { default as BottomNav } from './BottomNav';
export type { NavItem } from './BottomNav';
export { default as DeviceMap } from './DeviceMap';
export { default as SensorChart } from './SensorChart';
export { default as LeadsManagement } from './LeadsManagement';
export { default as PlantThresholdIndicator } from './PlantThresholdIndicator';
export { UserCardList } from './UserCardList';
export { DeviceCardList } from './DeviceCardList';

// User Dashboard Tab Components
export { default as UserDashboardContent } from './UserDashboardContent';
export { default as UserDeviceTab } from './UserDeviceTab';
export { default as UserStatisticsTab } from './UserStatisticsTab';
export { default as UserProfileTab } from './UserProfileTab';
export { default as UserSidebar } from './UserSidebar';

// Skeleton Loaders
export {
  SensorCardSkeleton,
  QuickStatSkeleton,
  NotificationSkeleton,
  TableRowSkeleton,
  AdminStatCardSkeleton,
  DeviceInfoSkeleton,
  StatisticsCardSkeleton
} from './DashboardSkeletons';
