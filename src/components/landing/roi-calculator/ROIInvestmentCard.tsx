/**
 * ROI Investment Card Component
 * Displays investment details and device information
 */

import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Zap, CheckCircle2 } from 'lucide-react';
import { formatRupiah, type DeviceRecommendation } from '../../../data';
import type { CalculationResult } from './types';

interface ROIInvestmentCardProps {
  result: CalculationResult;
  deviceRecommendation: DeviceRecommendation;
}

export function ROIInvestmentCard({ result, deviceRecommendation }: ROIInvestmentCardProps) {
  return (
    <Card className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 p-6">
      <h3 className="mb-4 flex items-center gap-2">
        <Zap className="w-5 h-5 text-[#FFB703]" />
        Detail Investasi & Device
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Investment Breakdown */}
        <div>
          <h4 className="font-semibold mb-3 text-sm">Breakdown Investasi Tahun 1</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Hardware Device ({deviceRecommendation.jumlahDevice} unit):
              </span>
              <span className="font-semibold">{formatRupiah(result.agroguardBiayaDevice)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Langganan Tahun 1:</span>
              <span className="font-semibold">{formatRupiah(result.agroguardBiayaSubscription)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Biaya Operasional:</span>
              <span className="font-semibold">{formatRupiah(result.agroguardBiayaOperasional)}</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex items-center justify-between font-bold">
                <span>Total Investasi Tahun 1:</span>
                <span className="text-[#0077B6]">{formatRupiah(result.agroguardTotalBiaya)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Device Details */}
        <div>
          <h4 className="font-semibold mb-3 text-sm">Sensor & Device IoT yang Disertakan</h4>
          <div className="space-y-2">
            {deviceRecommendation.sensorsIncluded.map(sensor => (
              <div key={sensor.name} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#3B945E] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">{sensor.quantity}x {sensor.name}</span>
                  <p className="text-xs text-muted-foreground">{sensor.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Package Info */}
          <div className="mt-4 p-3 bg-[#0077B6]/5 rounded-lg border border-[#0077B6]/20">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold">Paket Rekomendasi:</span>
              <Badge className="bg-[#FFB703]">{deviceRecommendation.recommendedPackage.name}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">{deviceRecommendation.recommendedPackage.description}</p>
            <div className="text-sm font-semibold text-[#0077B6] mt-2">
              {formatRupiah(deviceRecommendation.monthlySubscription)}/bulan
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
