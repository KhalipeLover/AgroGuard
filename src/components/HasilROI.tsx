/**
 * Hasil ROI Page
 * Dedicated page untuk menampilkan hasil perhitungan ROI dari URL parameters
 * Mendukung sharing link
 */

import { useState, useEffect } from 'react';
import { MotionDiv } from './ui/motion-replacement';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ArrowLeft, Calculator, ExternalLink, Share2, Sparkles } from 'lucide-react';
import { toast } from './ui/simple-toast';
import {
  fetchHorticultureData,
  fetchDeviceRecommendation,
  getPlantConfig,
  getIrrigationConfig,
  PLANT_CONFIGS,
  IRRIGATION_CONFIGS,
  type HorticultureData,
  type DeviceRecommendation,
  type PlantType,
  type IrrigationSystem
} from '../data';
import { ROIMetricsCards } from './landing/roi-calculator/ROIMetricsCards';
import { ROIComparisonCard } from './landing/roi-calculator/ROIComparisonCard';
import { ROISavingsCard } from './landing/roi-calculator/ROISavingsCard';
import { ROIInvestmentCard } from './landing/roi-calculator/ROIInvestmentCard';
import { ROIChartsSection } from './landing/roi-calculator/ROIChartsSection';
import { ROIConclusionCard } from './landing/roi-calculator/ROIConclusionCard';
import { useROICalculation } from './landing/roi-calculator/useROICalculation';
import { DashboardLayout } from './dashboard';

interface HasilROIProps {
  onNavigate: (page: 'landing' | 'device-setup' | 'login' | 'user-dashboard' | 'admin-dashboard') => void;
}

export default function HasilROI({ onNavigate }: HasilROIProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [horticultureData, setHorticultureData] = useState<HorticultureData[]>([]);
  const [deviceRecommendation, setDeviceRecommendation] = useState<DeviceRecommendation | null>(null);
  
  // URL parameters
  const [kabupaten, setKabupaten] = useState('');
  const [tanaman, setTanaman] = useState<PlantType>('tomat');
  const [luasLahan, setLuasLahan] = useState('');
  const [sistemIrigasi, setSistemIrigasi] = useState<IrrigationSystem>('otomatis-iot');

  // ROI Calculation hook
  const { calculating, result, showResult, calculateROI } = useROICalculation();

  // Detect theme from localStorage - sync with AGROGUARD theme system
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Track current theme to detect changes
      let currentTheme = localStorage.getItem('agroguard_theme') as 'light' | 'dark' | null;

      // Function to apply theme
      const applyTheme = () => {
        const savedTheme = localStorage.getItem('agroguard_theme') as 'light' | 'dark' | null;
        
        if (savedTheme) {
          // Apply theme to document
          if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          currentTheme = savedTheme;
        } else {
          // Default to dark theme if no preference saved
          document.documentElement.classList.add('dark');
          localStorage.setItem('agroguard_theme', 'dark');
          currentTheme = 'dark';
        }
      };

      // Apply theme on mount
      applyTheme();

      // Listen for storage changes (theme toggle from other tabs/windows)
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'agroguard_theme') {
          applyTheme();
        }
      };

      // Polling to detect theme changes in same tab (backup mechanism)
      const intervalId = setInterval(() => {
        const newTheme = localStorage.getItem('agroguard_theme');
        if (newTheme !== currentTheme) {
          applyTheme();
        }
      }, 500); // Check every 500ms

      window.addEventListener('storage', handleStorageChange);

      // Cleanup
      return () => {
        window.removeEventListener('storage', handleStorageChange);
        clearInterval(intervalId);
      };
    }
  }, []);

  // Parse URL parameters and load data
  useEffect(() => {
    // Safe check for window.location
    if (typeof window === 'undefined' || !window.location) {
      setError('Aplikasi tidak dapat mengakses URL. Silakan coba lagi.');
      setLoading(false);
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const k = urlParams.get('k');
    const t = urlParams.get('t') as PlantType | null;
    const l = urlParams.get('l');
    const i = urlParams.get('i') as IrrigationSystem | null;

    // Validate parameters
    if (!k || !t || !l || !i) {
      setError('Parameter URL tidak lengkap. Silakan gunakan link yang valid.');
      setLoading(false);
      return;
    }

    // Validate plant type - dynamically from PLANT_CONFIGS
    const validPlants = PLANT_CONFIGS.map(p => p.id);
    if (!validPlants.includes(t)) {
      setError(`Jenis tanaman "${t}" tidak valid. Silakan gunakan link yang benar.`);
      setLoading(false);
      return;
    }

    // Validate irrigation system - dynamically from IRRIGATION_CONFIGS
    const validIrrigation = IRRIGATION_CONFIGS.map(i => i.id);
    if (!validIrrigation.includes(i)) {
      setError(`Sistem irigasi "${i}" tidak valid. Silakan gunakan link yang benar.`);
      setLoading(false);
      return;
    }

    // Validate luas lahan
    const luas = parseFloat(l);
    if (isNaN(luas) || luas < 1) {
      setError('Luas lahan tidak valid (minimal 1m²).');
      setLoading(false);
      return;
    }

    // Set parameters
    setKabupaten(k);
    setTanaman(t);
    setLuasLahan(l);
    setSistemIrigasi(i);

    // Load data
    Promise.all([
      fetchHorticultureData(),
      fetchDeviceRecommendation(luas, i)
    ])
      .then(([hortData, deviceRec]) => {
        setHorticultureData(hortData);
        setDeviceRecommendation(deviceRec);
        setLoading(false);
      })
      .catch(() => {
        setError('Gagal memuat data. Silakan coba lagi.');
        setLoading(false);
      });
  }, []);

  // Auto-calculate when data is ready
  useEffect(() => {
    if (!loading && !error && horticultureData.length > 0 && deviceRecommendation && !calculating && !result) {
      calculateROI(kabupaten, tanaman, luasLahan, sistemIrigasi, horticultureData, deviceRecommendation);
    }
  }, [loading, error, horticultureData, deviceRecommendation, calculating, result, kabupaten, tanaman, luasLahan, sistemIrigasi, calculateROI]);

  // Loading state
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#3B945E] mb-4"></div>
            <p className="text-muted-foreground">Memuat perhitungan ROI...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Error state
  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[80vh] p-6">
          <div className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 p-8 rounded-2xl max-w-md text-center shadow-xl">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-foreground mb-2">Terjadi Kesalahan</h2>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button
              onClick={() => onNavigate('landing')}
              className="bg-gradient-to-r from-[#3B945E] to-[#2D7A4A] hover:from-[#2D7A4A] hover:to-[#3B945E] text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Beranda
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Get plant and irrigation config for display
  const plantConfig = getPlantConfig(tanaman);
  const irrigationConfig = getIrrigationConfig(sistemIrigasi);

  return (
    <DashboardLayout>
      {/* Custom Header for HasilROI */}
      <header className="fixed top-0 left-0 right-0 border-b-2 border-white/30 dark:border-white/10 glass-card dark:glass-card-dark z-[200] shadow-xl backdrop-blur-xl">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Left: Title & Subtitle */}
            <div className="flex items-center gap-2 md:gap-3">
              <div className="bg-gradient-to-br from-[#0077B6] to-[#3B945E] p-2 md:p-2.5 rounded-lg md:rounded-xl shadow-lg glow-primary">
                <Calculator className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-foreground leading-none">
                  <span className="md:hidden">Hasil ROI</span>
                  <span className="hidden md:inline">Hasil Perhitungan ROI</span>
                </h1>
                <p className="text-[10px] md:text-sm text-muted-foreground mt-0.5">
                  <span className="md:hidden">ROI Calculator</span>
                  <span className="hidden md:inline">Return on Investment AGROGUARD IoT</span>
                </p>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 md:gap-3">
              <Button
                onClick={() => onNavigate('landing')}
                variant="outline"
                size="sm"
                className="border-white/30 dark:border-white/10 hover:border-[#3B945E]/50 dark:hover:border-[#3B945E]/50"
              >
                <ArrowLeft className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Kembali</span>
              </Button>
              <Button
                onClick={() => {
                  onNavigate('landing');
                  setTimeout(() => {
                    const calculatorSection = document.getElementById('roi-calculator');
                    if (calculatorSection) {
                      calculatorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }, 100);
                }}
                className="bg-gradient-to-r from-[#3B945E] to-[#2D7A4A] hover:from-[#2D7A4A] hover:to-[#3B945E] text-white shadow-lg"
                size="sm"
              >
                <Calculator className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Buat Perhitungan Sendiri</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-[60px] md:h-[72px]" />

      {/* Content */}
      <main className="container mx-auto px-4 py-6 md:py-8 space-y-6">
        {/* Parameter Info */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 p-6 md:p-8 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B945E] to-[#2D7A4A] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-foreground font-medium">Parameter Perhitungan</h3>
                  <p className="text-sm text-muted-foreground">Detail input untuk analisis ROI</p>
                </div>
              </div>
              <Badge className="bg-[#3B945E]/20 text-[#3B945E] border-[#3B945E]/30 hidden md:inline-flex">
                Shared Link
              </Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#3B945E]"></div>
                  <p className="text-sm text-muted-foreground">Lokasi</p>
                </div>
                <p className="text-foreground font-medium pl-4">{kabupaten}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#0077B6]"></div>
                  <p className="text-sm text-muted-foreground">Jenis Tanaman</p>
                </div>
                <p className="text-foreground font-medium pl-4">
                  {plantConfig?.emoji} {plantConfig?.name || tanaman}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#FFB703]"></div>
                  <p className="text-sm text-muted-foreground">Luas Lahan</p>
                </div>
                <p className="text-foreground font-medium pl-4">{luasLahan} m²</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#3B945E]"></div>
                  <p className="text-sm text-muted-foreground">Sistem Irigasi</p>
                </div>
                <p className="text-foreground font-medium pl-4">
                  {irrigationConfig?.emoji} {irrigationConfig?.name || sistemIrigasi}
                </p>
              </div>
            </div>
          </div>
        </MotionDiv>

        {/* Calculating State */}
        {calculating && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#3B945E] mb-4"></div>
            <p className="text-muted-foreground">Menghitung ROI...</p>
          </div>
        )}

        {/* Results */}
        {showResult && result && deviceRecommendation && (
          <div className="space-y-6">
            {/* Metrics Cards */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <ROIMetricsCards result={result} />
            </MotionDiv>

            {/* Comparison Card */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ROIComparisonCard result={result} />
            </MotionDiv>

            {/* Savings Card */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <ROISavingsCard result={result} />
            </MotionDiv>

            {/* Investment Card */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <ROIInvestmentCard result={result} deviceRecommendation={deviceRecommendation} />
            </MotionDiv>

            {/* Charts Section */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <ROIChartsSection result={result} />
            </MotionDiv>

            {/* Conclusion Card */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <ROIConclusionCard 
                result={result} 
                plantName={plantConfig?.name || tanaman}
                luasLahan={parseFloat(luasLahan)}
              />
            </MotionDiv>

            {/* CTA Section */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="glass-card dark:glass-card-dark border-2 border-[#3B945E]/30 dark:border-[#3B945E]/20 p-8 md:p-10 rounded-2xl text-center shadow-xl"
            >
              <div className="max-w-2xl mx-auto space-y-6">
                <div>
                  <h3 className="text-foreground mb-2">Tertarik dengan AGROGUARD IoT?</h3>
                  <p className="text-muted-foreground">
                    Mulai maksimalkan hasil panen Anda dengan teknologi IoT pintar
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => onNavigate('device-setup')}
                    className="bg-gradient-to-r from-[#3B945E] to-[#2D7A4A] hover:from-[#2D7A4A] hover:to-[#3B945E] text-white shadow-lg"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Mulai Setup Device
                  </Button>
                  <Button
                    onClick={() => {
                      onNavigate('landing');
                      setTimeout(() => {
                        const calculatorSection = document.getElementById('roi-calculator');
                        if (calculatorSection) {
                          calculatorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }, 100);
                    }}
                    variant="outline"
                    className="border-white/30 dark:border-white/10 hover:border-[#0077B6]/50 dark:hover:border-[#0077B6]/50 hover:bg-[#0077B6]/10"
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    Hitung Ulang dengan Parameter Lain
                  </Button>
                </div>

                {/* Share URL Info */}
                <div className="pt-6 border-t border-white/20 dark:border-white/5">
                  <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Link halaman ini bisa dibagikan ke siapa saja
                  </p>
                </div>
              </div>
            </MotionDiv>
          </div>
        )}
      </main>
    </DashboardLayout>
  );
}
