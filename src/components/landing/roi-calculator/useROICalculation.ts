/**
 * useROICalculation Custom Hook
 * Business logic untuk ROI calculation
 */

import { useState } from 'react';
import type { 
  HorticultureData,
  DeviceRecommendation,
  PlantType,
  IrrigationSystem
} from '../../../data';
import {
  getPlantConfig,
  getIrrigationConfig,
  COST_CONFIG,
  formatLandAreaDisplay
} from '../../../data';
import type { CalculationResult } from './types';
import { toast } from '../../ui/simple-toast';

export function useROICalculation() {
  const [calculating, setCalculating] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const calculateROI = (
    selectedKabupaten: string,
    jenisTanaman: PlantType,
    luasLahan: string,
    sistemIrigasi: IrrigationSystem,
    horticultureData: HorticultureData[],
    deviceRecommendation: DeviceRecommendation | null
  ) => {
    // Validation
    if (!selectedKabupaten) {
      toast.error('Pilih kabupaten terlebih dahulu');
      return;
    }

    const luas = parseFloat(luasLahan);
    if (!luasLahan || isNaN(luas) || luas < 1) {
      toast.error('Luas lahan minimal 1m²');
      return;
    }

    if (!deviceRecommendation) {
      toast.error('Rekomendasi device belum tersedia');
      return;
    }

    setCalculating(true);

    // Get configurations
    const plantConfig = getPlantConfig(jenisTanaman);
    const irrigationConfig = getIrrigationConfig(sistemIrigasi);
    
    if (!plantConfig || !irrigationConfig) {
      toast.error('Data tidak lengkap');
      setCalculating(false);
      return;
    }

    // Get horticulture data for the kabupaten (optional, for regional context)
    const data = horticultureData.find(d => 
      d.kabupaten.toUpperCase() === selectedKabupaten.toUpperCase() && 
      d.type === plantConfig.type
    );

    // Use plant-specific productivity from PlantConfig
    // This is more accurate than general regional data
    const baselineProduktivitas = plantConfig.productivityPerM2; // kg/m²/year from PlantConfig

    // Simulate calculation delay for better UX
    setTimeout(() => {
      try {
        // === BASELINE (Traditional Farming) ===
        const baselineProduksi = baselineProduktivitas * luas; // total kg
        
        // Costs per m²
        const waterCost = luas * COST_CONFIG.traditional.waterCostPerM2;
        const fertilizerCost = luas * COST_CONFIG.traditional.fertilizerCostPerM2;
        const laborCost = luas * COST_CONFIG.traditional.laborCostPerM2;
        const otherCost = luas * COST_CONFIG.traditional.otherCostPerM2;
        const baselineTotalCost = waterCost + fertilizerCost + laborCost + otherCost;
        
        // Revenue
        const pricePerKg = plantConfig.avgPricePerKg;
        const baselinePendapatan = baselineProduksi * pricePerKg;
        
        // Crop failure
        const cropFailureLoss = baselinePendapatan * COST_CONFIG.traditional.cropFailureRate;
        
        // === WITH AGROGUARD IoT ===
        // Productivity increase
        const yieldIncrease = COST_CONFIG.iot.yieldIncreasePercentage / 100;
        const agroguardProduktivitas = baselineProduktivitas * (1 + yieldIncrease);
        const agroguardProduksi = agroguardProduktivitas * luas;
        
        // Cost savings with IoT
        const waterSavings = COST_CONFIG.iot.waterSavingsPercentage / 100;
        const fertilizerSavings = COST_CONFIG.iot.fertilizerSavingsPercentage / 100;
        const laborSavings = COST_CONFIG.iot.laborSavingsPercentage / 100;
        const otherSavings = COST_CONFIG.iot.otherSavingsPercentage / 100;
        
        const agroguardWaterCost = waterCost * (1 - waterSavings);
        const agroguardFertilizerCost = fertilizerCost * (1 - fertilizerSavings);
        const agroguardLaborCost = laborCost * (1 - laborSavings);
        const agroguardOtherCost = otherCost * (1 - otherSavings);
        const agroguardOperationalCost = agroguardWaterCost + agroguardFertilizerCost + agroguardLaborCost + agroguardOtherCost;
        
        // Device and subscription costs
        const deviceCost = deviceRecommendation.totalDeviceCost;
        const subscriptionCost = deviceRecommendation.yearlySubscription;
        
        // Total cost first year
        const agroguardTotalCost = agroguardOperationalCost + deviceCost + subscriptionCost;
        
        // Revenue
        const agroguardPendapatan = agroguardProduksi * pricePerKg;
        
        // Reduced crop failure
        const agroguardCropFailureLoss = agroguardPendapatan * COST_CONFIG.iot.cropFailureRate;
        
        // === IMPROVEMENTS ===
        const penghematanAir = waterCost - agroguardWaterCost;
        const penghematanPupuk = fertilizerCost - agroguardFertilizerCost;
        const penghematanLabor = laborCost - agroguardLaborCost;
        const penguranganGagalPanen = cropFailureLoss - agroguardCropFailureLoss;
        const totalPenghematan = penghematanAir + penghematanPupuk + penghematanLabor + penguranganGagalPanen;
        
        const additionalRevenue = agroguardPendapatan - baselinePendapatan;
        const totalBenefit = totalPenghematan + additionalRevenue;
        
        // === ROI CALCULATION ===
        // First year profit
        const firstYearProfit = agroguardPendapatan - agroguardTotalCost - agroguardCropFailureLoss;
        const roi = (firstYearProfit / agroguardTotalCost) * 100;
        
        // Break-even calculation
        const monthlyRevenue = agroguardPendapatan / 12;
        const monthlyOperatingCost = (agroguardOperationalCost + subscriptionCost) / 12;
        const monthlyProfit = monthlyRevenue - monthlyOperatingCost;
        const paybackPeriod = monthlyProfit > 0 ? Math.ceil(deviceCost / monthlyProfit) : 36;
        
        // Harvest info
        const harvestPerYear = Math.floor(365 / plantConfig.harvestCycle);
        
        const calculationResult: CalculationResult = {
          // Baseline
          baselineProduktivitas,
          baselineProduksi,
          baselinePendapatan,
          baselineBiayaAir: waterCost,
          baselineBiayaPupuk: fertilizerCost,
          baselineBiayaLabor: laborCost,
          baselineGagalPanen: cropFailureLoss,
          baselineTotalBiaya: baselineTotalCost,
          
          // AGROGUARD
          agroguardProduktivitas,
          agroguardProduksi,
          agroguardPendapatan,
          agroguardBiayaAir: agroguardWaterCost,
          agroguardBiayaPupuk: agroguardFertilizerCost,
          agroguardBiayaLabor: agroguardLaborCost,
          agroguardGagalPanen: agroguardCropFailureLoss,
          agroguardBiayaOperasional: agroguardOperationalCost,
          agroguardBiayaDevice: deviceCost,
          agroguardBiayaSubscription: subscriptionCost,
          agroguardTotalBiaya: agroguardTotalCost,
          
          // Improvements
          peningkatanProduktivitas: yieldIncrease * 100,
          penghematanAir,
          penghematanPupuk,
          penghematanLabor,
          penguranganGagalPanen,
          totalPenghematan,
          additionalRevenue,
          totalBenefit,
          roi,
          paybackPeriod,
          
          // Display
          luasLahanDisplay: formatLandAreaDisplay(luas),
          hargaTanamanPerKg: pricePerKg,
          harvestCycle: plantConfig.harvestCycle,
          harvestPerYear
        };

        setResult(calculationResult);
        setShowResult(true);
        setCalculating(false);

      } catch (error) {
        toast.error('Terjadi kesalahan perhitungan');
        setCalculating(false);
      }
    }, 800);
  };

  const clearResult = () => {
    setShowResult(false);
    setResult(null);
  };

  return {
    calculating,
    result,
    showResult,
    calculateROI,
    clearResult
  };
}
