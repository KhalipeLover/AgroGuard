/**
 * ROI Conclusion Card Component
 * Displays conclusion, insights, and call-to-action
 */

import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { CheckCircle2, ExternalLink, Calculator } from 'lucide-react';
import { formatRupiah } from '../../../data';
import type { CalculationResult } from './types';

interface ROIConclusionCardProps {
  result: CalculationResult;
  onConsultation: () => void;
  onRecalculate: () => void;
}

export function ROIConclusionCard({ 
  result, 
  onConsultation, 
  onRecalculate 
}: ROIConclusionCardProps) {
  return (
    <Card className="glass-card dark:glass-card-dark border-2 border-[#3B945E]/30 dark:border-[#3B945E]/20 p-6 bg-gradient-to-br from-[#3B945E]/5 to-[#0077B6]/5">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3B945E] to-[#0077B6] flex items-center justify-center flex-shrink-0">
          <CheckCircle2 className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="mb-3">Kesimpulan & Rekomendasi</h3>
          
          {/* Insights */}
          <div className="space-y-2 text-sm">
            {result.roi > 100 && (
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3B945E] flex-shrink-0 mt-0.5" />
                <p>
                  <strong className="text-[#3B945E]">Investasi SANGAT MENGUNTUNGKAN!</strong> ROI {result.roi.toFixed(0)}% menunjukkan return yang excellent di tahun pertama.
                </p>
              </div>
            )}
            
            {result.roi > 50 && result.roi <= 100 && (
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3B945E] flex-shrink-0 mt-0.5" />
                <p>
                  <strong className="text-[#3B945E]">Investasi Menguntungkan!</strong> ROI {result.roi.toFixed(0)}% menunjukkan return yang baik.
                </p>
              </div>
            )}
            
            {result.paybackPeriod <= 12 && (
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3B945E] flex-shrink-0 mt-0.5" />
                <p>
                  <strong className="text-[#3B945E]">Break-even cepat!</strong> Anda akan balik modal dalam {result.paybackPeriod} bulan, kurang dari 1 tahun.
                </p>
              </div>
            )}
            
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#3B945E] flex-shrink-0 mt-0.5" />
              <p>
                Produktivitas meningkat <strong>{result.peningkatanProduktivitas.toFixed(0)}%</strong> dengan monitoring real-time via smartphone.
              </p>
            </div>
            
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#3B945E] flex-shrink-0 mt-0.5" />
              <p>
                Hemat biaya operasional hingga <strong>{formatRupiah(result.totalPenghematan)}</strong> per tahun.
              </p>
            </div>
            
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#3B945E] flex-shrink-0 mt-0.5" />
              <p>
                Risiko gagal panen turun drastis dari 7% menjadi hanya 1.5%.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              onClick={onConsultation}
              className="bg-gradient-to-r from-[#3B945E] to-[#0077B6] hover:shadow-xl"
              size="lg"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Mulai Konsultasi Gratis
            </Button>
            <Button
              onClick={onRecalculate}
              variant="outline"
              className="glass-card dark:glass-card-dark border-[#3B945E]/30 hover:bg-[#3B945E]/10"
              size="lg"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Hitung Ulang
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
