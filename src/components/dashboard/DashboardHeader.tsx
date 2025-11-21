/**
 * DashboardHeader Component
 * 
 * Reusable header for dashboard pages
 * Supports both desktop and mobile layouts
 */

import { LogOut, LucideIcon, Moon, Sun } from 'lucide-react';
import { Button } from '../ui/button';
import { useTheme } from '../ThemeProvider';

interface DashboardHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  mobileTitle?: string;
  mobileSubtitle?: string;
  onLogout: () => void;
  className?: string;
  showLogoutText?: boolean;
}

export default function DashboardHeader({
  icon: Icon,
  title,
  subtitle,
  mobileTitle,
  mobileSubtitle,
  onLogout,
  className = '',
  showLogoutText = true,
}: DashboardHeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {/* Desktop Header - Fixed */}
      <header className={`hidden md:block fixed top-0 left-0 right-0 border-b-2 border-white/30 dark:border-white/10 glass-card dark:glass-card-dark z-[200] shadow-xl backdrop-blur-xl ${className}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[#0077B6] to-[#3B945E] p-2 rounded-lg shadow-lg glow-primary">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl text-foreground">{title}</h1>
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="glass-card dark:glass-card-dark hover:glow-primary transition-smooth"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </Button>
              <Button
                variant="outline"
                onClick={onLogout}
                className="gap-2 glass-card dark:glass-card-dark hover:bg-red-500/20 hover:text-red-600 dark:hover:text-red-400 hover:border-red-500/30 transition-smooth"
              >
                <LogOut className="w-4 h-4" />
                {showLogoutText && 'Logout'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header - Fixed */}
      <header className="md:hidden fixed top-0 left-0 right-0 border-b-2 border-white/30 dark:border-white/10 glass-card dark:glass-card-dark z-[200] shadow-xl backdrop-blur-xl">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="bg-gradient-to-br from-[#0077B6] to-[#3B945E] p-2.5 rounded-xl shadow-lg glow-primary">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-foreground leading-none">{mobileTitle || title}</h2>
                <p className="text-[10px] text-muted-foreground mt-0.5">{mobileSubtitle || subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="glass-card dark:glass-card-dark hover:glow-primary transition-smooth"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onLogout}
                className="hover:bg-red-500/20 hover:text-red-600 dark:hover:text-red-400 transition-smooth"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
