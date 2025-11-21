/**
 * Simple Toast Component
 * Lightweight alternative to sonner with zero external dependencies
 * No WebAssembly issues - pure React + CSS
 */

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

interface ToastContextType {
  addToast: (message: string, type?: Toast['type'], duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((
    message: string,
    type: Toast['type'] = 'info',
    duration: number = 3000
  ) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: Toast = { id, message, type, duration };
    
    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  const getIcon = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
    }
  };

  const getStyles = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return 'border-green-500/30 bg-green-50/95 dark:bg-green-950/95';
      case 'error':
        return 'border-red-500/30 bg-red-50/95 dark:bg-red-950/95';
      case 'warning':
        return 'border-yellow-500/30 bg-yellow-50/95 dark:bg-yellow-950/95';
      case 'info':
      default:
        return 'border-blue-500/30 bg-blue-50/95 dark:bg-blue-950/95';
    }
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              flex items-start gap-3 p-4 rounded-lg shadow-lg border-2
              backdrop-blur-sm pointer-events-auto max-w-md
              animate-in fade-in slide-in-from-bottom-4 duration-300
              ${getStyles(toast.type)}
            `}
          >
            <div className="flex-shrink-0 mt-0.5">
              {getIcon(toast.type)}
            </div>
            
            <p className="flex-1 text-sm text-foreground">
              {toast.message}
            </p>
            
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Close toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

// Simple toast function API compatible with sonner
export const toast = {
  success: (message: string, options?: { duration?: number }) => {
    // We'll trigger this via a global event
    window.dispatchEvent(
      new CustomEvent('simple-toast', {
        detail: { message, type: 'success', duration: options?.duration || 3000 }
      })
    );
  },
  error: (message: string, options?: { duration?: number }) => {
    window.dispatchEvent(
      new CustomEvent('simple-toast', {
        detail: { message, type: 'error', duration: options?.duration || 3000 }
      })
    );
  },
  info: (message: string, options?: { duration?: number }) => {
    window.dispatchEvent(
      new CustomEvent('simple-toast', {
        detail: { message, type: 'info', duration: options?.duration || 3000 }
      })
    );
  },
  warning: (message: string, options?: { duration?: number }) => {
    window.dispatchEvent(
      new CustomEvent('simple-toast', {
        detail: { message, type: 'warning', duration: options?.duration || 3000 }
      })
    );
  },
};

// Global toast listener component
export function GlobalToastListener() {
  const { addToast } = useToast();

  useEffect(() => {
    const handleToast = (event: Event) => {
      const customEvent = event as CustomEvent<{
        message: string;
        type: 'success' | 'error' | 'info' | 'warning';
        duration: number;
      }>;
      
      addToast(
        customEvent.detail.message,
        customEvent.detail.type,
        customEvent.detail.duration
      );
    };

    window.addEventListener('simple-toast', handleToast);
    return () => window.removeEventListener('simple-toast', handleToast);
  }, [addToast]);

  return null;
}