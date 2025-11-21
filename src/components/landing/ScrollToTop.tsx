/**
 * Scroll to Top Button Component
 * 
 * Floating button that appears when user scrolls down
 * Features:
 * - Show/hide based on scroll position
 * - Smooth scroll to top
 * - Glass morphism design
 * - Pulse animation
 * - Mobile friendly
 */

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

interface ScrollToTopProps {
  showAfter?: number; // Show button after scrolling this many pixels
  className?: string;
}

export default function ScrollToTop({ showAfter = 300, className = '' }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > showAfter) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Check on mount
    toggleVisibility();

    // Add scroll listener
    window.addEventListener('scroll', toggleVisibility);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [showAfter]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 shadow-xl hover:shadow-2xl flex items-center justify-center text-[#3B945E] dark:text-[#4CAF6E] hover:border-[#3B945E]/50 dark:hover:border-[#4CAF6E]/50 transition-all duration-300 group hover:scale-110 active:scale-90 animate-in fade-in zoom-in duration-300 ${className}`}
      aria-label="Scroll to top"
      title="Kembali ke atas"
    >
      {/* Pulse ring effect */}
      <span className="absolute inset-0 rounded-full bg-[#3B945E]/20 dark:bg-[#4CAF6E]/20 animate-ping opacity-0 group-hover:opacity-100" />
      
      {/* Arrow icon */}
      <ArrowUp className="w-6 h-6 md:w-7 md:h-7 relative z-10" />
    </button>
  );
}
