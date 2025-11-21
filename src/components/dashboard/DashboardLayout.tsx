/**
 * DashboardLayout Component
 * 
 * Common layout wrapper for dashboard pages
 * Provides consistent background and structure
 */

import { ReactNode } from 'react';
import BackgroundPattern from './BackgroundPattern';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0fdf4] via-[#e0f2fe] to-[#dbeafe] dark:from-[#0E172A] dark:via-[#0B2F2B] dark:to-[#0E172A] transition-colors relative overflow-hidden">
      <BackgroundPattern />
      {children}
    </div>
  );
}
