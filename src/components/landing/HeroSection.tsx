/**
 * HeroSection Component
 * 
 * Hero section dengan logo, title, CTA buttons, dan statistics
 * Part of Landing Page modular components
 */

import motion from '../ui/motion-replacement';
import { Sprout, Leaf, Wifi, Smartphone, LucideIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { StatisticsSkeleton } from './SkeletonLoaders';
import ErrorState from './ErrorState';

interface Statistic {
  value: string;
  label: string;
  icon: React.ReactNode;
}

interface HeroSectionProps {
  statistics: Statistic[];
  onNavigate: (page: 'device-setup' | 'login') => void;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export default function HeroSection({ 
  statistics, 
  onNavigate,
  loading = false,
  error = null,
  onRetry
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Neumorphism gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f0fdf4] via-[#e0f2fe] to-[#dbeafe] dark:from-[#0E172A] dark:via-[#0B2F2B] dark:to-[#0E172A]" />
      <div className="absolute inset-0 opacity-30 dark:opacity-40">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#3B945E] rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl animate-blob" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-[#0077B6] rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-[#06B6D4] rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Logo - Neumorphic with Glow */}
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              className="bg-gradient-to-br from-[#3B945E] to-[#0077B6] p-6 rounded-3xl shadow-2xl glow-primary hover:glow-accent transition-smooth"
            >
              <Sprout className="w-20 h-20 text-white" />
            </motion.div>
          </div>
          
          {/* Main Title - Using custom size */}
          <div className="mb-3">
            <h1 className="text-foreground text-[3.5rem] leading-tight">
              AGROGUARD IoT
            </h1>
          </div>

          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-block mb-6"
          >
            <Badge className="relative overflow-hidden bg-gradient-to-r from-white/90 via-white/85 to-white/90 dark:from-[#0E172A]/80 dark:via-[#0B2F2B]/80 dark:to-[#0E172A]/80 backdrop-blur-lg px-3 py-1.5 sm:px-4 sm:py-2 border border-[#3B945E]/50 dark:border-[#A7F3D0]/40 shadow-[0_4px_16px_rgba(59,148,94,0.15)] dark:shadow-[0_4px_16px_rgba(167,243,208,0.1)] transition-all duration-300 ease-out inline-flex items-center gap-1.5 sm:gap-2 group">
              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#3B945E]/3 via-transparent to-[#0077B6]/3 dark:from-[#A7F3D0]/3 dark:via-transparent dark:to-[#0077B6]/5 pointer-events-none" />
              
              {/* Icon - Compact */}
              <div className="relative">
                <Leaf className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 text-[#2d7a4a] dark:text-[#A7F3D0] drop-shadow-[0_1px_4px_rgba(59,148,94,0.4)] dark:drop-shadow-[0_1px_4px_rgba(167,243,208,0.4)]" />
              </div>
              
              {/* Text - Tagline Style */}
              <span className="relative whitespace-nowrap font-medium tracking-normal text-xs sm:text-sm text-[#1a5a38] dark:text-[#E0F7EE]">
                Smart City & Village Solutions
              </span>
            </Badge>
          </motion.div>
          
          {/* Subtitle */}
          <div className="mb-4 max-w-3xl mx-auto">
            <p className="text-muted-foreground text-xl leading-relaxed">
              Transformasi Pertanian Cerdas untuk Desa & Kota Berkelanjutan
            </p>
          </div>

          {/* Description */}
          <div className="mb-10 max-w-2xl mx-auto">
            <p className="text-muted-foreground">
              Monitoring real-time berbasis IoT untuk optimasi air, tanah, dan energi.
            </p>
          </div>

          {/* CTA Buttons - Neumorphic Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button
              onClick={() => onNavigate('device-setup')}
              className="neumorphic-button bg-gradient-to-br from-[#3B945E] to-[#4CAF6E] hover:from-[#2d7347] hover:to-[#3B945E] text-white px-8 py-6 h-auto shadow-xl hover:shadow-2xl glow-primary hover:glow-accent transition-smooth"
            >
              <Wifi className="mr-2 w-5 h-5" />
              Daftarkan Device IoT
            </Button>
            <Button
              onClick={() => onNavigate('login')}
              variant="outline"
              className="glass-card dark:glass-card-dark border-2 !border-[#0077B6]/30 dark:!border-[#0099E6]/30 !text-[#0077B6] dark:!text-[#0099E6] !bg-white/40 dark:!bg-white/5 hover:!bg-[#0077B6]/10 dark:hover:!bg-[#0099E6]/20 hover:!text-[#0077B6] dark:hover:!text-[#0099E6] px-8 py-6 h-auto transition-smooth"
            >
              <Smartphone className="mr-2 w-5 h-5" />
              Login Dashboard
            </Button>
          </motion.div>

          {/* Statistics - Loading State */}
          {loading && (
            <div className="max-w-4xl mx-auto mt-12">
              <StatisticsSkeleton />
            </div>
          )}

          {/* Statistics - Error State */}
          {error && !loading && onRetry && (
            <div className="max-w-md mx-auto mt-12">
              <div className="glass-card dark:glass-card-dark p-6 rounded-2xl border-2 border-red-500/30 dark:border-red-400/20 text-center">
                <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
                <Button
                  onClick={onRetry}
                  variant="outline"
                  size="sm"
                  className="border-red-500/50"
                >
                  Coba Lagi
                </Button>
              </div>
            </div>
          )}

          {/* Statistics - Success State */}
          {!loading && !error && statistics.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              {statistics.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className="glass-card dark:glass-card-dark rounded-2xl p-6 shadow-lg hover:shadow-xl transition-smooth"
                >
                  <div className="text-[#3B945E] dark:text-[#A7F3D0] mb-2 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="mb-1 text-foreground text-3xl">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-[#3B945E] dark:border-[#4CAF6E] rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-[#3B945E] dark:bg-[#4CAF6E] rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
