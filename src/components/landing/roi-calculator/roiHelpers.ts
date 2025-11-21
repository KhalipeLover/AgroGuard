/**
 * ROI Calculator Helper Functions
 * Pure functions untuk formatting dan transformasi data
 */

import { formatRupiah } from '../../../data';
import type { CalculationResult, ChartDataItem } from './types';

/**
 * Generate comparison chart data untuk Bar Chart
 */
export function generateComparisonChartData(result: CalculationResult): ChartDataItem[] {
  return [
    {
      name: 'Produksi',
      unit: 'kg',
      'Tradisional': parseFloat(result.baselineProduksi.toFixed(1)),
      'IoT': parseFloat(result.agroguardProduksi.toFixed(1))
    },
    {
      name: 'Pendapatan',
      unit: 'juta',
      'Tradisional': parseFloat((result.baselinePendapatan / 1000000).toFixed(2)),
      'IoT': parseFloat((result.agroguardPendapatan / 1000000).toFixed(2))
    },
    {
      name: 'Biaya',
      unit: 'juta',
      'Tradisional': parseFloat((result.baselineTotalBiaya / 1000000).toFixed(2)),
      'IoT': parseFloat((result.agroguardBiayaOperasional / 1000000).toFixed(2))
    }
  ];
}

/**
 * Generate savings chart data untuk Pie Chart
 * Round to nearest integer to avoid floating point precision issues
 */
export function generateSavingsChartData(result: CalculationResult): ChartDataItem[] {
  return [
    { name: 'Penghematan Air', value: Math.round(result.penghematanAir) },
    { name: 'Penghematan Pupuk', value: Math.round(result.penghematanPupuk) },
    { name: 'Penghematan Tenaga Kerja', value: Math.round(result.penghematanLabor) },
    { name: 'Pengurangan Gagal Panen', value: Math.round(result.penguranganGagalPanen) }
  ];
}

/**
 * Generate text report untuk download
 */
export function generateTextReport(
  result: CalculationResult,
  inputs: {
    kabupaten: string;
    plantName: string;
    plantEmoji: string;
    irrigationName: string;
    irrigationEmoji: string;
    deviceCount: number;
    packageName: string;
  }
): string {
  const { 
    kabupaten, 
    plantName, 
    plantEmoji, 
    irrigationName, 
    irrigationEmoji,
    deviceCount,
    packageName
  } = inputs;

  return `
═══════════════════════════════════════════════════════════
  LAPORAN ROI CALCULATOR - AGROGUARD IoT
  Hortikultura Smart Farming System
═══════════════════════════════════════════════════════════

PARAMETER INPUT
────────────────────────────────────────────────────────────
• Lokasi: ${kabupaten}
• Tanaman: ${plantEmoji} ${plantName}
• Luas Lahan: ${result.luasLahanDisplay}
• Sistem Irigasi: ${irrigationEmoji} ${irrigationName}
• Siklus Panen: ${result.harvestCycle} hari (${result.harvestPerYear}x/tahun)
• Harga Jual: ${formatRupiah(result.hargaTanamanPerKg)}/kg

PERANGKAT IoT
────────────────────────────────────────────────────────────
• Jumlah Device: ${deviceCount} unit
• Biaya Hardware: ${formatRupiah(result.agroguardBiayaDevice)}
• Paket: ${packageName}
• Biaya Langganan: ${formatRupiah(result.agroguardBiayaSubscription)}/tahun

PERBANDINGAN HASIL
────────────────────────────────────────────────────────────
Produktivitas:
  • Tradisional: ${result.baselineProduktivitas.toFixed(2)} kg/m²/tahun
  • AGROGUARD: ${result.agroguardProduktivitas.toFixed(2)} kg/m²/tahun
  • Peningkatan: +${result.peningkatanProduktivitas.toFixed(1)}%

Total Produksi Per Tahun:
  • Tradisional: ${result.baselineProduksi.toFixed(1)} kg
  • AGROGUARD: ${result.agroguardProduksi.toFixed(1)} kg

Pendapatan Per Tahun:
  • Tradisional: ${formatRupiah(result.baselinePendapatan)}
  • AGROGUARD: ${formatRupiah(result.agroguardPendapatan)}
  • Tambahan: ${formatRupiah(result.additionalRevenue)}

PENGHEMATAN BIAYA
────────────────────────────────────────────────────────────
• Air: ${formatRupiah(result.penghematanAir)} (50% lebih hemat)
• Pupuk: ${formatRupiah(result.penghematanPupuk)} (35% lebih hemat)
• Tenaga Kerja: ${formatRupiah(result.penghematanLabor)} (40% lebih hemat)
• Pengurangan Gagal Panen: ${formatRupiah(result.penguranganGagalPanen)}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Penghematan: ${formatRupiah(result.totalPenghematan)}

ANALISIS ROI
────────────────────────────────────────────────────────────
Total Manfaat Tahun 1:
  • Penghematan Biaya: ${formatRupiah(result.totalPenghematan)}
  • Tambahan Pendapatan: ${formatRupiah(result.additionalRevenue)}
  • Total Benefit: ${formatRupiah(result.totalBenefit)}

Investasi:
  • Hardware: ${formatRupiah(result.agroguardBiayaDevice)}
  • Subscription Year 1: ${formatRupiah(result.agroguardBiayaSubscription)}
  • Total Investasi: ${formatRupiah(result.agroguardBiayaDevice + result.agroguardBiayaSubscription)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ROI: ${result.roi.toFixed(1)}%
Break-Even Period: ${result.paybackPeriod} bulan
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

KESIMPULAN
────────────────────────────────────────────────────────────
${result.roi > 100 ? '✓ Investasi SANGAT MENGUNTUNGKAN!' : result.roi > 50 ? '✓ Investasi Menguntungkan' : '○ Pertimbangkan lagi'}
${result.paybackPeriod <= 12 ? '✓ Break-even kurang dari 1 tahun' : '○ Break-even lebih dari 1 tahun'}

Dengan AGROGUARD IoT, Anda dapat:
• Meningkatkan produktivitas ${result.peningkatanProduktivitas.toFixed(1)}%
• Menghemat biaya operasional
• Mengurangi risiko gagal panen
• Monitor lahan 24/7 via smartphone

═══════════════════════════════════════════════════════════
Tertarik? Hubungi kami untuk konsultasi gratis!
Website: https://agroguard.id
Email: info@agroguard.id
WhatsApp: +62 812-3456-7890
═══════════════════════════════════════════════════════════

Generated: ${new Date().toLocaleString('id-ID')}
AGROGUARD IoT - Smart Farming for Better Harvest
`.trim();
}

/**
 * Generate share text untuk social media
 */
export function generateShareText(
  plantName: string,
  roi: number,
  paybackPeriod: number
): string {
  return `Lihat hasil ROI Calculator AGROGUARD saya untuk ${plantName}! ROI ${roi.toFixed(0)}% dengan break-even ${paybackPeriod} bulan! 🌱🚀`;
}

/**
 * Chart colors - Vibrant & High Contrast (Redesign v2.0)
 * Air (green), Pupuk (blue), Tenaga Kerja (amber), Gagal Panen (red)
 */
export const CHART_COLORS = ['#28A745', '#1E90FF', '#FFC107', '#E74C3C'];

/**
 * Calculate percentage difference between traditional and IoT
 */
export function calculatePercentageChange(traditional: number, iot: number): string {
  if (traditional === 0) return '+0%';
  const change = ((iot - traditional) / traditional) * 100;
  return change > 0 ? `+${change.toFixed(0)}%` : `${change.toFixed(0)}%`;
}
