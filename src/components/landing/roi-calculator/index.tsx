/**
 * ROI Calculator - Main Orchestrator
 * Modular architecture with clean separation of concerns
 * v2.0: Active state tracking & reset functionality
 */

import { useState, useEffect, useRef } from 'react';
import { MotionDiv } from '../../ui/motion-replacement';
import { Badge } from '../../ui/badge';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Calculator, TrendingUp, Download, Share2 } from 'lucide-react';
import { toast } from '../../ui/simple-toast';
import { copyToClipboard } from '../../../utils/clipboardHelpers';
import LeadDialog from '../LeadDialog';

// Data imports
import {
  fetchHorticultureData,
  fetchROIRecommendation,
  fetchDeviceRecommendation,
  getLandSizeExample,
  getPlantConfig,
  getIrrigationConfig,
  type HorticultureData,
  type ROIRecommendation,
  type DeviceRecommendation,
  type PlantType,
  type IrrigationSystem
} from '../../../data';

// Component imports
import { ROIQuickStart } from './ROIQuickStart';
import { ROICalculatorForm } from './ROICalculatorForm';
import { ROIMetricsCards } from './ROIMetricsCards';
import { ROIComparisonCard } from './ROIComparisonCard';
import { ROISavingsCard } from './ROISavingsCard';
import { ROIInvestmentCard } from './ROIInvestmentCard';
import { ROIChartsSection } from './ROIChartsSection';
import { ROIConclusionCard } from './ROIConclusionCard';
import { ROIShareDialog } from './ROIShareDialog';

// Hooks & Helpers
import { useROICalculation } from './useROICalculation';
import { generateTextReport, generateShareText } from './roiHelpers';
import { generatePDFReport } from './generatePDFReport';

export function ROICalculator() {
  // Data state
  const [horticultureData, setHorticultureData] = useState<HorticultureData[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form inputs
  const [selectedKabupaten, setSelectedKabupaten] = useState('');
  const [jenisTanaman, setJenisTanaman] = useState<PlantType>('tomat');
  const [luasLahan, setLuasLahan] = useState('');
  const [sistemIrigasi, setSistemIrigasi] = useState<IrrigationSystem>('otomatis-iot');
  
  // Active example tracking
  const [activeExampleId, setActiveExampleId] = useState<string | null>(null);
  
  // Recommendations
  const [recommendation, setRecommendation] = useState<ROIRecommendation | null>(null);
  const [loadingRecommendation, setLoadingRecommendation] = useState(false);
  const [deviceRecommendation, setDeviceRecommendation] = useState<DeviceRecommendation | null>(null);
  const [loadingDeviceRecommendation, setLoadingDeviceRecommendation] = useState(false);
  
  // Dialog states
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showLeadDialog, setShowLeadDialog] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  // ROI Calculation hook
  const { calculating, result, showResult, calculateROI, clearResult } = useROICalculation();
  
  // Ref for calculator section
  const calculatorSectionRef = useRef<HTMLDivElement>(null);
  
  // Ref for result section (for auto-scroll)
  const resultSectionRef = useRef<HTMLDivElement>(null);
  
  // Ref to track if we should auto-scroll (for URL sharelink restoration)
  const shouldAutoScrollRef = useRef(false);
  
  // URL parameters detection & auto-calculation
  const [urlProcessed, setUrlProcessed] = useState(false);
  
  // Track last calculated parameters to prevent auto-clear after calculation
  const lastCalculatedParams = useRef<string | null>(null);

  // Load horticulture data
  useEffect(() => {
    fetchHorticultureData()
      .then(data => {
        setHorticultureData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Restore calculation from URL parameters
  useEffect(() => {
    // Only run once when data is loaded and not yet processed
    if (loading || urlProcessed || horticultureData.length === 0) return;

    // Check if URL has calculation parameters
    const urlParams = new URLSearchParams(window.location.search);
    const calcId = urlParams.get('calc');
    const kabupaten = urlParams.get('k');
    const tanaman = urlParams.get('t') as PlantType | null;
    const luas = urlParams.get('l');
    const irigasi = urlParams.get('i') as IrrigationSystem | null;

    if (calcId && kabupaten && tanaman && luas && irigasi) {
      // Validate plant type
      const validPlants: PlantType[] = ['tomat', 'cabai', 'terong', 'semangka', 'melon'];
      if (!validPlants.includes(tanaman)) {
        toast.error('Jenis tanaman tidak valid dalam URL');
        setUrlProcessed(true);
        return;
      }

      // Validate irrigation system
      const validIrrigation: IrrigationSystem[] = ['manual', 'semi-otomatis', 'otomatis-iot'];
      if (!validIrrigation.includes(irigasi)) {
        toast.error('Sistem irigasi tidak valid dalam URL');
        setUrlProcessed(true);
        return;
      }

      // Parse and validate luas lahan
      const luasNumber = parseFloat(luas);
      if (isNaN(luasNumber) || luasNumber < 1) {
        toast.error('Luas lahan tidak valid dalam URL');
        setUrlProcessed(true);
        return;
      }

      // Set form values from URL
      setSelectedKabupaten(kabupaten);
      setJenisTanaman(tanaman);
      setLuasLahan(luas);
      setSistemIrigasi(irigasi);
      setUrlProcessed(true);

      // Show toast notification
      toast.success('Memuat perhitungan yang dibagikan...', {
        description: `${getPlantConfig(tanaman)?.name} • ${kabupaten}`
      });

      // Fetch device recommendation and auto-calculate
      const plantConfig = getPlantConfig(tanaman);
      const plantType = plantConfig?.type || 'sayur';
      
      fetchDeviceRecommendation(luasNumber, plantType)
        .then(deviceRec => {
          // Mark that we should auto-scroll when result is ready
          shouldAutoScrollRef.current = true;
          
          // Store params for URL auto-calculation
          const urlParams = `${kabupaten}|${tanaman}|${luas}|${irigasi}`;
          lastCalculatedParams.current = urlParams;
          
          // Auto-calculate ROI with loaded data
          calculateROI(
            kabupaten,
            tanaman,
            luas,
            irigasi,
            horticultureData,
            deviceRec
          );
          
          // Scroll will be handled by the useEffect that watches showResult
        })
        .catch(() => {
          toast.error('Gagal memuat rekomendasi device');
        });
    } else {
      // No URL params to process
      setUrlProcessed(true);
    }
  }, [loading, urlProcessed, horticultureData, calculateROI]);

  // Load recommendation when kabupaten changes
  useEffect(() => {
    if (!selectedKabupaten) {
      setRecommendation(null);
      return;
    }

    setLoadingRecommendation(true);
    fetchROIRecommendation(selectedKabupaten)
      .then(rec => {
        setRecommendation(rec);
        setLoadingRecommendation(false);
      })
      .catch(() => setLoadingRecommendation(false));
  }, [selectedKabupaten]);

  // Load device recommendation when luas lahan changes
  useEffect(() => {
    const luas = parseFloat(luasLahan);
    if (!luasLahan || isNaN(luas) || luas < 1) {
      setDeviceRecommendation(null);
      setLoadingDeviceRecommendation(false);
      return;
    }

    setLoadingDeviceRecommendation(true);
    const plantConfig = getPlantConfig(jenisTanaman);
    const plantType = plantConfig?.type || 'sayur';
    
    fetchDeviceRecommendation(luas, plantType)
      .then(rec => {
        setDeviceRecommendation(rec);
        setLoadingDeviceRecommendation(false);
      })
      .catch(() => {
        setDeviceRecommendation(null);
        setLoadingDeviceRecommendation(false);
      });
  }, [luasLahan, jenisTanaman]);

  // Clear result when any parameter changes (but not immediately after fresh calculation)
  useEffect(() => {
    // Don't run until URL is processed
    if (!urlProcessed) return;
    
    // Don't clear while calculating
    if (calculating) return;
    
    // Create param signature for current inputs
    const currentParams = `${selectedKabupaten}|${jenisTanaman}|${luasLahan}|${sistemIrigasi}`;
    
    // If we have a result and params changed from last calculation, clear it
    if (result && lastCalculatedParams.current && lastCalculatedParams.current !== currentParams) {
      clearResult();
    }
  }, [selectedKabupaten, jenisTanaman, luasLahan, sistemIrigasi, result, urlProcessed, calculating, clearResult]);

  // Auto-scroll to result when calculation completes
  useEffect(() => {
    if (showResult && result && deviceRecommendation && resultSectionRef.current) {
      // Small delay to ensure animation starts
      const scrollTimer = setTimeout(() => {
        if (resultSectionRef.current) {
          const offset = 100;
          const elementPosition = resultSectionRef.current.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 300);

      return () => clearTimeout(scrollTimer);
    }
  }, [showResult, result, deviceRecommendation]);

  // Event handlers
  const handleQuickStartSelect = (exampleId: string) => {
    const example = getLandSizeExample(exampleId);
    if (!example) return;
    
    setActiveExampleId(exampleId);
    setLuasLahan(example.landSize.toString());
    setJenisTanaman(example.suggestedPlant);
    setSistemIrigasi(example.suggestedIrrigation);
    
    toast.success(`${example.name} dipilih!`, {
      description: example.description
    });
  };

  const handleApplyRecommendation = () => {
    if (!recommendation) return;
    
    setJenisTanaman(recommendation.recommendations.tanamanUtama as PlantType);
    setLuasLahan(recommendation.recommendations.luasLahanOptimal.toString());
    setSistemIrigasi(recommendation.recommendations.sistemIrigasiRekomendasi as IrrigationSystem);
    
    // Clear active example when applying recommendation
    setActiveExampleId(null);
    
    toast.success('Rekomendasi diterapkan!', {
      description: 'Silakan review dan klik "Hitung ROI"'
    });
  };

  const handleCalculate = () => {
    if (!deviceRecommendation) {
      toast.error('Menunggu rekomendasi device...', {
        description: 'Mohon tunggu sebentar'
      });
      return;
    }

    // Store current params as last calculated to prevent auto-clear
    const currentParams = `${selectedKabupaten}|${jenisTanaman}|${luasLahan}|${sistemIrigasi}`;
    lastCalculatedParams.current = currentParams;

    calculateROI(
      selectedKabupaten,
      jenisTanaman,
      luasLahan,
      sistemIrigasi,
      horticultureData,
      deviceRecommendation
    );
  };

  const handleRecalculate = () => {
    // Reset form
    setSelectedKabupaten('');
    setJenisTanaman('tomat');
    setLuasLahan('');
    setSistemIrigasi('otomatis-iot');
    setActiveExampleId(null);
    
    // Clear results
    clearResult();
    
    // Clear last calculated params
    lastCalculatedParams.current = null;
    
    // Scroll to calculator section
    if (calculatorSectionRef.current) {
      const offset = 100; // Offset from top
      const elementPosition = calculatorSectionRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    
    toast.success('Form direset!', {
      description: 'Silakan isi data baru untuk perhitungan ulang'
    });
  };

  const handleDownloadReport = async () => {
    if (!result || !deviceRecommendation) return;

    const plantConfig = getPlantConfig(jenisTanaman);
    const irrigationConfig = getIrrigationConfig(sistemIrigasi);
    
    if (!plantConfig || !irrigationConfig) return;

    // Show loading toast
    toast.info('Membuat laporan PDF...', {
      description: 'Mohon tunggu sebentar'
    });

    try {
      await generatePDFReport(result, {
        kabupaten: selectedKabupaten,
        plantName: plantConfig.name,
        plantEmoji: plantConfig.emoji,
        irrigationName: irrigationConfig.name,
        irrigationEmoji: irrigationConfig.emoji,
        deviceCount: deviceRecommendation.jumlahDevice,
        packageName: deviceRecommendation.recommendedPackage.name
      });
      
      toast.success('Laporan PDF berhasil diunduh!', {
        description: 'Silakan cek folder Downloads Anda'
      });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Gagal membuat laporan PDF', {
        description: 'Silakan coba lagi atau hubungi support'
      });
    }
  };

  const handleSaveCalculation = () => {
    if (!result) return;
    
    const id = `roi-${Date.now()}`;
    const calculationData = {
      id,
      timestamp: new Date().toISOString(),
      inputs: {
        kabupaten: selectedKabupaten,
        tanaman: jenisTanaman,
        luas: luasLahan,
        irigasi: sistemIrigasi
      },
      result
    };
    
    try {
      const saved = localStorage.getItem('agroguard-roi-calculations');
      const calculations = saved ? JSON.parse(saved) : [];
      calculations.push(calculationData);
      localStorage.setItem('agroguard-roi-calculations', JSON.stringify(calculations));
      
      const params = new URLSearchParams({
        k: selectedKabupaten,
        t: jenisTanaman,
        l: luasLahan,
        i: sistemIrigasi
      });
      // Generate clean URL to hasil-roi page
      const origin = typeof window !== 'undefined' && window.location ? window.location.origin : '';
      const url = `${origin}/hasil-roi?${params.toString()}`;
      setShareUrl(url);
      setShowShareDialog(true);
      
      toast.success('Perhitungan berhasil disimpan!');
    } catch {
      toast.error('Gagal menyimpan perhitungan');
    }
  };

  const handleCopyUrl = async () => {
    await copyToClipboard(shareUrl, {
      onSuccess: () => {
        toast.success('Link berhasil disalin!');
      },
      onError: () => {
        toast.error('Gagal menyalin link. Silakan salin manual dari input field.');
      }
    });
  };

  const handleShare = (platform: 'whatsapp' | 'twitter' | 'facebook') => {
    const plantConfig = getPlantConfig(jenisTanaman);
    if (!plantConfig || !result) return;

    const text = generateShareText(plantConfig.name, result.roi, result.paybackPeriod);
    
    let url = '';
    switch (platform) {
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(text + ' ' + shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
    }
    
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="roi-calculator" ref={calculatorSectionRef} className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#3B945E] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#0077B6] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-gradient-to-r from-[#3B945E] to-[#0077B6] border-0">
            <Calculator className="w-3 h-3 mr-1" />
            Kalkulator ROI
          </Badge>
          <h2 className="mb-4">
            Hitung Keuntungan Urban Farming Anda
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Simulasi ROI untuk budidaya buah & sayur dengan teknologi IoT.
          </p>
        </MotionDiv>

        {/* Quick Start */}
        <ROIQuickStart 
          onSelectExample={handleQuickStartSelect}
          activeExampleId={activeExampleId}
        />

        {/* Calculator Form */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ROICalculatorForm
            selectedKabupaten={selectedKabupaten}
            jenisTanaman={jenisTanaman}
            luasLahan={luasLahan}
            sistemIrigasi={sistemIrigasi}
            onKabupatenChange={setSelectedKabupaten}
            onTanamanChange={setJenisTanaman}
            onLuasChange={setLuasLahan}
            onIrigasiChange={setSistemIrigasi}
            onCalculate={handleCalculate}
            calculating={calculating}
            deviceRecommendation={deviceRecommendation}
            recommendation={recommendation}
            loadingRecommendation={loadingRecommendation}
            loadingDeviceRecommendation={loadingDeviceRecommendation}
            onApplyRecommendation={handleApplyRecommendation}
          />
        </MotionDiv>

        {/* Results Section */}
        {showResult && result && deviceRecommendation && (
          <div 
            ref={resultSectionRef} 
            className="space-y-6 fade-in"
          >
            {/* ROI Summary */}
            <Card className="glass-card dark:glass-card-dark border-2 border-[#3B945E]/30 dark:border-[#3B945E]/20 p-8 bg-gradient-to-br from-[#3B945E]/5 to-[#0077B6]/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3B945E] to-[#0077B6] flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3>Hasil Analisis ROI</h3>
                  <p className="text-sm text-muted-foreground">
                    {getPlantConfig(jenisTanaman)?.emoji} {getPlantConfig(jenisTanaman)?.name} • {result.luasLahanDisplay} • {selectedKabupaten}
                  </p>
                </div>
              </div>

              {/* Key Metrics */}
              <ROIMetricsCards result={result} />

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleDownloadReport}
                  variant="outline"
                  className="glass-card dark:glass-card-dark border-[#3B945E]/30 hover:bg-[#3B945E]/10 hover:border-[#3B945E]"
                >
                  <Download className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Download Laporan PDF</span>
                  <span className="sm:hidden">Download PDF</span>
                </Button>

               <Button
                  onClick={() => setShowLeadDialog(true)}
                  className="bg-gradient-to-r from-[#3B945E] to-[#0077B6] hover:shadow-xl"
                >
                  Konsultasi Gratis
                </Button>
              </div>
            </Card>

            {/* Detailed Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ROIComparisonCard result={result} />
              <ROISavingsCard result={result} />
            </div>

            {/* Investment Details */}
            <ROIInvestmentCard result={result} deviceRecommendation={deviceRecommendation} />

            {/* Charts */}
            <ROIChartsSection result={result} />

            {/* Conclusion */}
            <ROIConclusionCard
              result={result}
              onConsultation={() => setShowLeadDialog(true)}
              onRecalculate={handleRecalculate}
            />
          </div>
        )}
      </div>

      {/* Share Dialog */}
      <ROIShareDialog
        open={showShareDialog}
        onOpenChange={setShowShareDialog}
        shareUrl={shareUrl}
        onCopyUrl={handleCopyUrl}
        onShare={handleShare}
      />

      {/* Lead Dialog */}
      <LeadDialog
        open={showLeadDialog}
        onOpenChange={setShowLeadDialog}
        source="ROI Calculator - Hortikultura"
        prefillData={{
          notes: result ? `Tertarik dengan ROI ${result.roi.toFixed(0)}% untuk ${getPlantConfig(jenisTanaman)?.name} di ${selectedKabupaten}` : undefined
        }}
      />
    </section>
  );
}
