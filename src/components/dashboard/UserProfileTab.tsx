// User Dashboard - Profile Tab
// User profile and settings management

import { User as UserIcon, Settings, Bell, LogOut } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import type { User } from '../../App';

interface UserProfileTabProps {
  user: User | null;
  onLogoutClick: () => void;
}

export default function UserProfileTab({ user, onLogoutClick }: UserProfileTabProps) {
  return (
    <div className="space-y-4 max-w-2xl">
      <div>
        <h1 className="text-foreground mb-1">Profil</h1>
        <p className="text-muted-foreground">Kelola informasi akun Anda</p>
      </div>

      <Card className="p-4 md:p-5 glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-[#3B945E] dark:bg-[#4CAF6E] text-white w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
            <UserIcon className="w-8 h-8" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-foreground truncate">{user?.name}</h3>
            <p className="text-muted-foreground truncate">{user?.email}</p>
            <Badge className="mt-1.5 bg-[#3B945E] dark:bg-[#4CAF6E] text-white border-0 px-2 py-0.5">
              User Account
            </Badge>
          </div>
        </div>

        <div className="space-y-2.5 border-t border-white/20 dark:border-white/10 pt-4">
          <div className="flex justify-between items-center gap-4">
            <span className="text-muted-foreground flex-shrink-0">User ID</span>
            <span className="text-foreground text-right truncate">{user?.id}</span>
          </div>
          <div className="flex justify-between items-center gap-4">
            <span className="text-muted-foreground flex-shrink-0">Member Since</span>
            <span className="text-foreground text-right">Oktober 2025</span>
          </div>
          <div className="flex justify-between items-center gap-4">
            <span className="text-muted-foreground flex-shrink-0">Devices</span>
            <span className="text-foreground text-right">1 Active</span>
          </div>
        </div>
      </Card>

      <Card className="p-4 md:p-5 glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 shadow-lg">
        <h3 className="text-foreground mb-3">Pengaturan</h3>
        <div className="space-y-2.5">
          <Button 
            variant="outline" 
            className="w-full justify-start gap-2 glass-card dark:glass-card-dark hover:glow-primary transition-smooth h-auto py-2.5"
          >
            <Settings className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">Pengaturan Akun</span>
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start gap-2 glass-card dark:glass-card-dark hover:glow-primary transition-smooth h-auto py-2.5"
          >
            <Bell className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">Notifikasi</span>
          </Button>
          <Button 
            variant="destructive" 
            className="w-full justify-start gap-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 shadow-lg hover:shadow-xl transition-smooth h-auto py-2.5"
            onClick={onLogoutClick}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">Logout</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}
