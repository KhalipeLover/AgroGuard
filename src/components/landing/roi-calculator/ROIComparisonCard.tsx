/**
 * ROI Comparison Card Component
 * Displays traditional vs IoT production comparison
 */

import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Sprout } from 'lucide-react';
import { formatRupiah } from '../../../data';
import type { CalculationResult } from './types';

interface ROIComparisonCardProps {
  result: CalculationResult;
}

export function ROIComparisonCard({ result }: ROIComparisonCardProps) {
  return (
    <Card className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 p-6">
      <h3 className="mb-4 flex items-center gap-2">
        <Sprout className="w-5 h-5 text-[#3B945E]" />
        Perbandingan Produksi
      </h3>
      
      <div className="space-y-4">
        {/* Traditional */}
        <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Metode Tradisional</span>
            <Badge variant="destructive" className="text-xs">Without IoT</Badge>
          </div>
          <div className="text-2xl font-bold mb-1">{result.baselineProduksi.toFixed(1)} kg</div>
          <div className="text-sm text-muted-foreground">{result.baselineProduktivitas.toFixed(2)} kg/m²/tahun</div>
          <div className="text-sm font-semibold text-green-600 mt-2">{formatRupiah(result.baselinePendapatan)}</div>
        </div>

        {/* With AGROGUARD IoT */}
        <div className="p-4 rounded-lg bg-[#3B945E]/5 border border-[#3B945E]/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Dengan AGROGUARD IoT</span>
            <Badge className="text-xs bg-[#3B945E]">Smart Farming</Badge>
          </div>
          <div className="text-2xl font-bold mb-1 text-[#3B945E]">{result.agroguardProduksi.toFixed(1)} kg</div>
          <div className="text-sm text-muted-foreground">{result.agroguardProduktivitas.toFixed(2)} kg/m²/tahun</div>
          <div className="text-sm font-semibold text-green-600 mt-2">{formatRupiah(result.agroguardPendapatan)}</div>
        </div>

        {/* Benefit Summary */}
        <div className="p-3 rounded-lg bg-gradient-to-r from-[#3B945E]/10 to-[#0077B6]/10 border border-[#3B945E]/30">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Tambahan Pendapatan:</span>
            <span className="text-sm font-bold text-[#3B945E]">+{formatRupiah(result.additionalRevenue)}</span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-muted-foreground">Per bulan:</span>
            <span className="text-xs font-semibold">~{formatRupiah(result.additionalRevenue / 12)}</span>
          </div>
        </div>

        {/* Harvest Info */}
        <div className="text-xs text-muted-foreground">
          <strong>Info:</strong> Siklus panen {result.harvestCycle} hari (~{result.harvestPerYear}x panen/tahun)
        </div>
      </div>
    </Card>
  );
}
