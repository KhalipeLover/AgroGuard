/**
 * User Sidebar Component
 * 
 * Desktop sidebar navigation for User Dashboard
 * Responsive with collapse/expand functionality
 */

import { Home, BarChart3, Settings, User, ChevronLeft, ChevronRight } from 'lucide-react';

type MobileTab = 'dashboard' | 'device' | 'statistics' | 'profile';

interface UserSidebarProps {
  activeTab: MobileTab;
  onTabChange: (tab: MobileTab) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export default function UserSidebar({ 
  activeTab, 
  onTabChange, 
  collapsed, 
  onToggleCollapse 
}: UserSidebarProps) {
  const navItems = [
    { id: 'dashboard' as MobileTab, label: 'Dashboard', icon: Home },
    { id: 'device' as MobileTab, label: 'Perangkat', icon: Settings },
    { id: 'statistics' as MobileTab, label: 'Statistik', icon: BarChart3 },
    { id: 'profile' as MobileTab, label: 'Profil', icon: User },
  ];

  return (
    <div 
      className={`hidden md:block fixed left-0 top-0 h-full border-r-2 border-white/30 dark:border-white/10 glass-card dark:glass-card-dark backdrop-blur-xl pt-20 transition-all duration-300 shadow-xl z-30 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <nav className="p-4 space-y-2">
        {/* Toggle Button */}
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center p-3 rounded-lg text-muted-foreground hover:bg-[#3B945E]/10 dark:hover:bg-[#4CAF6E]/10 hover:text-[#3B945E] dark:hover:text-[#4CAF6E] transition-smooth mb-4 glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>

        {/* Navigation Items */}
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth ${
              activeTab === item.id
                ? 'bg-gradient-to-r from-[#3B945E] to-[#2D7A4A] dark:from-[#4CAF6E] dark:to-[#3B945E] text-white shadow-lg glow-primary'
                : 'text-muted-foreground hover:bg-[#3B945E]/10 dark:hover:bg-[#4CAF6E]/10 hover:text-[#3B945E] dark:hover:text-[#4CAF6E] glass-card dark:glass-card-dark border-2 border-white/20 dark:border-white/10'
            }`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && (
              <span className="truncate">{item.label}</span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
