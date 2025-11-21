/**
 * CTASection Component
 * ⚠️ SYNCHRONIZED with demo-data-sync.ts
 * 
 * Final call-to-action section
 * Part of Landing Page modular components
 */

import { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Wifi, Smartphone } from 'lucide-react';
import LeadDialog from './LeadDialog';
import { MASTER_CONSTANTS, CALCULATED_VALUES } from '../../data';

interface CTASectionProps {
  onNavigate: (page: 'device-setup' | 'login') => void;
}

export default function CTASection({ onNavigate }: CTASectionProps) {
  const [showLeadDialog, setShowLeadDialog] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`bg-gradient-to-br from-[#3B945E] to-[#0077B6] rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden transition-all duration-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full filter blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl" />
          </div>

          <div className="relative z-10">
            <div className="mb-6">
              <h2 className="text-white">Siap Transformasi Digital?</h2>
            </div>
            <div className="mb-8 max-w-2xl mx-auto">
              <p className="text-white/90 text-xl">
                Bergabunglah dengan {MASTER_CONSTANTS.TOTAL_USERS}+ pengguna yang telah merasakan manfaat AGROGUARD IoT untuk pertanian berkelanjutan
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                onClick={() => setShowLeadDialog(true)}
                className="neumorphic-button bg-gradient-to-br from-[#3B945E] to-[#4CAF6E] hover:from-[#2d7347] hover:to-[#3B945E] text-white px-8 py-6 h-auto shadow-xl hover:shadow-2xl glow-primary hover:glow-accent transition-smooth hover:scale-105"
              >
                <Wifi className="mr-2 w-5 h-5" />
                Mulai Sekarang
              </Button>
              <Button
                onClick={() => onNavigate('login')}
                variant="outline"
                className="glass-card !border-2 !border-white/80 !text-white !bg-white/20 backdrop-blur-md hover:!bg-white/30 hover:!border-white hover:!text-white shadow-lg hover:shadow-xl px-8 py-6 h-auto transition-smooth hover:scale-105"
              >
                <Smartphone className="mr-2 w-5 h-5" />
                Login Dashboard
              </Button>
            </div>

            <div className="flex justify-center gap-8 flex-wrap">
              <div className="text-center">
                <div className="mb-1 text-white text-3xl">{MASTER_CONSTANTS.TOTAL_DEVICES}</div>
                <div className="text-white/80 text-sm">Active Devices</div>
              </div>
              <div className="text-center">
                <div className="mb-1 text-white text-3xl">{MASTER_CONSTANTS.TOTAL_USERS}</div>
                <div className="text-white/80 text-sm">Pengguna Aktif</div>
              </div>
              <div className="text-center">
                <div className="mb-1 text-white text-3xl">{CALCULATED_VALUES.onlinePercentage}%</div>
                <div className="text-white/80 text-sm">Device Online</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Dialog */}
      <LeadDialog
        open={showLeadDialog}
        onOpenChange={setShowLeadDialog}
        source="cta-button"
      />
    </section>
  );
}
