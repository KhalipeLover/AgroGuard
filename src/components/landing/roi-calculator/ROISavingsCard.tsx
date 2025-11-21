/**
 * ROI Savings Card Component
 * Displays cost savings breakdown
 */

import { Card } from '../../ui/card';
import { Droplets } from 'lucide-react';
import { formatRupiah } from '../../../data';
import type { CalculationResult } from './types';

interface ROISavingsCardProps {
  result: CalculationResult;
}

export function ROISavingsCard({ result }: ROISavingsCardProps) {
  const savings = [
    {
      label: 'Penghematan Air',
      value: result.penghematanAir,
      percentage: '50% lebih hemat',
      color: 'blue'
    },
    {
      label: 'Penghematan Pupuk',
      value: result.penghematanPupuk,
      percentage: '35% lebih hemat',
      color: 'green'
    },
    {
      label: 'Penghematan Tenaga Kerja',
      value: result.penghematanLabor,
      percentage: '40% lebih hemat',
      color: 'amber'
    },
    {
      label: 'Pengurangan Gagal Panen',
      value: result.penguranganGagalPanen,
      percentage: '7% → 1.5% gagal panen',
      color: 'purple'
    }
  ];

  return (
    <Card className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 p-6">
      <h3 className="mb-4 flex items-center gap-2">
        <Droplets className="w-5 h-5 text-[#0077B6]" />
        Penghematan Biaya
      </h3>

      <div className="space-y-3">
        {savings.map(item => (
          <div 
            key={item.label}
            className={`flex items-center justify-between p-3 rounded-lg bg-${item.color}-500/5 border border-${item.color}-500/20`}
          >
            <div>
              <div className="text-sm font-semibold">{item.label}</div>
              <div className="text-xs text-muted-foreground">{item.percentage}</div>
            </div>
            <div className={`text-sm font-bold text-${item.color}-600`}>
              {formatRupiah(item.value)}
            </div>
          </div>
        ))}

        {/* Total Savings */}
        <div className="p-3 rounded-lg bg-gradient-to-r from-[#3B945E]/10 to-[#0077B6]/10 border-2 border-[#3B945E]/30">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Total Penghematan:</span>
            <span className="text-lg font-bold text-[#3B945E]">{formatRupiah(result.totalPenghematan)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
