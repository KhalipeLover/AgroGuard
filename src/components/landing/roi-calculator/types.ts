/**
 * ROI Calculator Type Definitions
 * Centralized types untuk semua ROI Calculator components
 */

export interface CalculationResult {
  // Data baseline (tradisional)
  baselineProduktivitas: number; // kg/m²
  baselineProduksi: number; // kg
  baselinePendapatan: number; // Rp
  baselineBiayaAir: number;
  baselineBiayaPupuk: number;
  baselineBiayaLabor: number;
  baselineGagalPanen: number;
  baselineTotalBiaya: number;
  
  // Data dengan AGROGUARD
  agroguardProduktivitas: number; // kg/m²
  agroguardProduksi: number; // kg
  agroguardPendapatan: number; // Rp
  agroguardBiayaAir: number;
  agroguardBiayaPupuk: number;
  agroguardBiayaLabor: number;
  agroguardGagalPanen: number;
  agroguardBiayaOperasional: number;
  agroguardBiayaDevice: number;
  agroguardBiayaSubscription: number;
  agroguardTotalBiaya: number;
  
  // Improvement
  peningkatanProduktivitas: number; // %
  penghematanAir: number; // Rp
  penghematanPupuk: number; // Rp
  penghematanLabor: number; // Rp
  penguranganGagalPanen: number; // Rp
  totalPenghematan: number; // Rp
  additionalRevenue: number; // Rp
  totalBenefit: number; // Rp
  roi: number; // %
  paybackPeriod: number; // bulan
  
  // Display info
  luasLahanDisplay: string;
  hargaTanamanPerKg: number;
  harvestCycle: number; // days
  harvestPerYear: number;
}

export interface ROIFormInputs {
  selectedKabupaten: string;
  jenisTanaman: string;
  luasLahan: string;
  sistemIrigasi: string;
}

export interface ChartDataItem {
  name: string;
  unit?: string; // NEW: Unit for display (e.g., "kg", "juta")
  'Tradisional'?: number;
  'IoT'?: number;
  value?: number;
}
