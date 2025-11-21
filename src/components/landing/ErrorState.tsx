/**
 * Error State Component
 * 
 * Reusable error display with retry functionality
 * Consistent with AGROGUARD IoT design system
 */

import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

export default function ErrorState({
  title = 'Gagal Memuat Data',
  message = 'Terjadi kesalahan saat memuat data. Silakan coba lagi.',
  onRetry,
  showRetry = true
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="glass-card dark:glass-card-dark p-8 md:p-12 rounded-2xl border-2 border-red-500/30 dark:border-red-400/20 backdrop-blur-xl max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-6">
          <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>
        
        <h3 className="text-xl md:text-2xl text-foreground mb-3">
          {title}
        </h3>
        
        <p className="text-base text-muted-foreground mb-6">
          {message}
        </p>
        
        {showRetry && onRetry && (
          <Button
            onClick={onRetry}
            className="group relative overflow-hidden px-6 py-3 rounded-xl bg-gradient-to-br from-[#3B945E] to-[#0077B6] dark:from-[#4CAF6E] dark:to-[#0099E6] text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <div className="relative z-10 flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              <span className="font-medium">Coba Lagi</span>
            </div>
          </Button>
        )}
      </div>
    </div>
  );
}
