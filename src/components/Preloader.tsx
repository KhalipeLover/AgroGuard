/**
 * Preloader Component
 * 
 * Beautiful loading screen shown before app initialization
 * Features:
 * - Glassmorphic design matching Neo-Skeuo Glass Fusion
 * - Animated logo pulse (CSS-based)
 * - Circular progress indicator
 * - Smooth fade-out transition
 * - Light/Dark mode support
 * - Agricultural theme colors
 * - ZERO WebAssembly dependencies
 */

import { useEffect, useState } from 'react';
import { Sprout, Loader2 } from 'lucide-react';

interface PreloaderProps {
  onLoadComplete?: () => void;
}

export default function Preloader({ onLoadComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Hide the CSS preloader when React component mounts
    const cssPreloader = document.getElementById('initial-preloader');
    if (cssPreloader) {
      cssPreloader.classList.add('hidden');
      setTimeout(() => {
        cssPreloader.remove();
      }, 500);
    }
  }, []);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            onLoadComplete?.();
          }, 500);
          return 100;
        }
        // Accelerate progress for better UX
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  if (isComplete) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#0E172A] via-[#0B2F2B] to-[#0E172A] dark:from-[#0E172A] dark:via-[#0B2F2B] dark:to-[#0E172A] animate-in fade-in duration-500"
      style={{ animation: isComplete ? 'fadeOut 0.5s ease-in-out forwards' : undefined }}
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3B945E] rounded-full filter blur-3xl animate-pulse"
          style={{ 
            animation: 'pulse 4s ease-in-out infinite',
            opacity: 0.3
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0077B6] rounded-full filter blur-3xl animate-pulse"
          style={{ 
            animation: 'pulse 4s ease-in-out infinite 2s',
            opacity: 0.3
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo Container with Glass Effect */}
        <div className="relative animate-in zoom-in duration-500">
          {/* Outer Glow Ring */}
          <div
            className="absolute inset-0 -m-8 rounded-full bg-gradient-to-br from-[#3B945E]/30 to-[#0077B6]/30 blur-2xl animate-pulse"
            style={{ animation: 'pulse 2s ease-in-out infinite' }}
          />

          {/* Glass Card Logo Container */}
          <div className="relative glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 rounded-3xl p-12 shadow-2xl">
            {/* Animated Logo */}
            <div className="relative float" style={{ animation: 'float 3s ease-in-out infinite' }}>
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#3B945E] to-[#0077B6] flex items-center justify-center shadow-xl">
                <Sprout className="w-12 h-12 text-white" strokeWidth={2.5} />
              </div>

              {/* Pulse Ring */}
              <div
                className="absolute inset-0 rounded-full border-4 border-[#3B945E] pulse-online"
              />
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <div
          className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500"
          style={{ animationDelay: '200ms' }}
        >
          <h1 className="text-4xl text-white mb-2 tracking-wide">
            AGROGUARD
          </h1>
          <p className="text-lg text-white/70">
            IoT Monitoring System
          </p>
        </div>

        {/* Progress Indicator */}
        <div
          className="flex flex-col items-center gap-4 w-64 animate-in fade-in slide-in-from-bottom-4 duration-500"
          style={{ animationDelay: '400ms' }}
        >
          {/* Circular Spinner */}
          <Loader2 className="w-12 h-12 text-[#3B945E] animate-spin" strokeWidth={2} />

          {/* Progress Bar */}
          <div className="w-full glass-card dark:glass-card-dark border border-white/20 dark:border-white/10 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#3B945E] via-[#0077B6] to-[#3B945E] rounded-full shadow-lg transition-all duration-300 ease-out"
              style={{
                width: `${progress}%`,
                boxShadow: '0 0 20px rgba(59, 148, 94, 0.5)',
              }}
            />
          </div>

          {/* Progress Text */}
          <p
            className="text-white/60 text-sm animate-pulse"
          >
            Loading {Math.min(Math.round(progress), 100)}%
          </p>
        </div>

        {/* Tagline */}
        <p
          className="text-white/40 text-sm text-center max-w-md px-4 animate-in fade-in duration-500"
          style={{ animationDelay: '600ms' }}
        >
          Revolutionizing Agriculture with Smart IoT Technology
        </p>
      </div>

      {/* Bottom Decorative Dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-gradient-to-r from-[#3B945E] to-[#0077B6] animate-pulse"
            style={{
              animationDelay: `${i * 200}ms`,
              animationDuration: '1.5s'
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
      `}</style>
    </div>
  );
}
