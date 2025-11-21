/**
 * LogoutConfirmationDialog Component
 * 
 * Reusable logout confirmation dialog following DocumentationSection pattern
 * - Mobile-first responsive design
 * - Glass morphism styling
 * - Clean, professional UX
 * Used in both UserDashboard and AdminDashboard
 */

import { LogOut, LucideIcon } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

interface LogoutConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  icon?: LucideIcon;
  title?: string;
  description?: string;
}

export default function LogoutConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  icon: Icon = LogOut,
  title = 'Konfirmasi Logout',
  description = 'Apakah Anda yakin ingin keluar dari dashboard? Anda perlu login kembali untuk mengakses dashboard.',
}: LogoutConfirmationDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="w-full sm:w-auto max-w-md bg-white/98 dark:bg-[#0E172A]/98 sm:bg-white/95 sm:dark:bg-[#0E172A]/95 backdrop-blur-xl border-0 sm:border-2 sm:border-white/30 sm:dark:border-white/10 shadow-2xl p-0 gap-0 rounded-xl">
        {/* Header with Icon */}
        <AlertDialogHeader className="flex-shrink-0 px-4 sm:px-6 pt-5 sm:pt-6 pb-4 border-b border-white/20 dark:border-white/10 bg-gradient-to-br from-red-500/10 to-orange-500/10 dark:from-red-500/20 dark:to-orange-500/20 backdrop-blur-md gap-3">
          {/* Icon + Title */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex-shrink-0 p-2.5 sm:p-3 rounded-xl bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg">
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <AlertDialogTitle className="text-lg sm:text-xl text-foreground mb-1">
                {title}
              </AlertDialogTitle>
            </div>
          </div>
          
          {/* Description */}
          <AlertDialogDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed pl-0">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        {/* Footer with Actions */}
        <AlertDialogFooter className="flex-shrink-0 px-4 sm:px-6 py-4 sm:py-5 gap-3 flex-col sm:flex-row bg-white/40 dark:bg-black/20 backdrop-blur-sm">
          <AlertDialogCancel 
            className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/10 transition-smooth hover:scale-105 active:scale-95 w-full sm:w-auto px-5 py-2.5 text-sm order-2 sm:order-1"
          >
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-smooth border-0 hover:scale-105 active:scale-95 w-full sm:w-auto px-5 py-2.5 text-sm order-1 sm:order-2"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Ya, Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
