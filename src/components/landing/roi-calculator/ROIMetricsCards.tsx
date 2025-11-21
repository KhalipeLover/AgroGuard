/**
 * ROI Metrics Cards Component
 * Displays 4 key ROI metrics
 */

import type { CalculationResult } from './types';

interface ROIMetricsCardsProps {
  result: CalculationResult;
}

export function ROIMetricsCards({ result }: ROIMetricsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* ROI Card */}
      <div className="p-4 rounded-lg bg-gradient-to-br from-[#3B945E]/10 to-[#3B945E]/5 border border-[#3B945E]/20">
        <div className="text-sm text-muted-foreground mb-1">Return on Investment</div>
        <div className="text-3xl font-bold text-[#3B945E]">{result.roi.toFixed(1)}%</div>
        <div className="text-xs text-muted-foreground mt-1">Tahun pertama</div>
      </div>

      {/* Break-Even Card */}
      <div className="p-4 rounded-lg bg-gradient-to-br from-[#0077B6]/10 to-[#0077B6]/5 border border-[#0077B6]/20">
        <div className="text-sm text-muted-foreground mb-1">Break-Even Period</div>
        <div className="text-3xl font-bold text-[#0077B6]">
          {result.paybackPeriod} <span className="text-lg">bulan</span>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Balik modal dalam {Math.floor(result.paybackPeriod)} bulan
        </div>
      </div>

      {/* Total Benefit Card */}
      <div className="p-4 rounded-lg bg-gradient-to-br from-[#FFB703]/10 to-[#FFB703]/5 border border-[#FFB703]/20">
        <div className="text-sm text-muted-foreground mb-1">Total Manfaat/Tahun</div>
        <div className="text-2xl font-bold text-[#FFB703]">
          {new Intl.NumberFormat('id-ID', { 
            style: 'currency', 
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          }).format(result.totalBenefit)}
        </div>
        <div className="text-xs text-muted-foreground mt-1">Penghematan + tambahan pendapatan</div>
      </div>

      {/* Productivity Increase Card */}
      <div className="p-4 rounded-lg bg-gradient-to-br from-[#10b981]/10 to-[#10b981]/5 border border-[#10b981]/20">
        <div className="text-sm text-muted-foreground mb-1">Peningkatan Hasil</div>
        <div className="text-3xl font-bold text-[#10b981]">
          +{result.peningkatanProduktivitas.toFixed(0)}%
        </div>
        <div className="text-xs text-muted-foreground mt-1">Produktivitas lebih tinggi</div>
      </div>
    </div>
  );
}
