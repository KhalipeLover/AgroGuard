/**
 * ROI Calculator Form Component
 * Input form untuk parameter ROI calculation
 */

import { Card } from '../../ui/card';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { Alert, AlertDescription } from '../../ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import {
  Calculator,
  MapPin,
  Sprout,
  Zap,
  Droplets,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Info,
  Loader2
} from 'lucide-react';
import {
  getROIAvailableKabupaten,
  PLANT_CONFIGS,
  IRRIGATION_CONFIGS,
  LAND_SIZE_GUIDANCE,
  getPlantConfig,
  getIrrigationConfig,
  formatRupiah,
  type PlantType,
  type IrrigationSystem,
  type ROIRecommendation,
  type DeviceRecommendation
} from '../../../data';

interface ROICalculatorFormProps {
  selectedKabupaten: string;
  jenisTanaman: PlantType;
  luasLahan: string;
  sistemIrigasi: IrrigationSystem;
  onKabupatenChange: (value: string) => void;
  onTanamanChange: (value: PlantType) => void;
  onLuasChange: (value: string) => void;
  onIrigasiChange: (value: IrrigationSystem) => void;
  onCalculate: () => void;
  calculating: boolean;
  deviceRecommendation: DeviceRecommendation | null;
  recommendation: ROIRecommendation | null;
  loadingRecommendation: boolean;
  loadingDeviceRecommendation: boolean;
  onApplyRecommendation: () => void;
}

export function ROICalculatorForm({
  selectedKabupaten,
  jenisTanaman,
  luasLahan,
  sistemIrigasi,
  onKabupatenChange,
  onTanamanChange,
  onLuasChange,
  onIrigasiChange,
  onCalculate,
  calculating,
  deviceRecommendation,
  recommendation,
  loadingRecommendation,
  loadingDeviceRecommendation,
  onApplyRecommendation
}: ROICalculatorFormProps) {
  const availableKabupaten = getROIAvailableKabupaten();
  const plantConfig = getPlantConfig(jenisTanaman);
  const irrigationConfig = getIrrigationConfig(sistemIrigasi);

  return (
    <Card className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 p-8 mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3B945E] to-[#0077B6] flex items-center justify-center">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3>Input Parameter</h3>
          <p className="text-sm text-muted-foreground">Masukkan data lahan Anda</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Lokasi Kabupaten */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#3B945E]" />
            Lokasi Kabupaten/Kota
          </Label>
          <Select value={selectedKabupaten} onValueChange={onKabupatenChange}>
            <SelectTrigger className="glass-card dark:glass-card-dark border-white/30 dark:border-white/10 focus:border-[#3B945E]/50 focus:ring-[#3B945E]/20 transition-smooth">
              <SelectValue placeholder="Pilih kabupaten/kota" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {availableKabupaten.map(kab => (
                <SelectItem key={kab} value={kab}>
                  {kab}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedKabupaten && (
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#3B945E]" />
              Data produktivitas akan diambil dari {selectedKabupaten}
            </p>
          )}
        </div>

        {/* Jenis Tanaman */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Sprout className="w-4 h-4 text-[#3B945E]" />
            Jenis Tanaman Hortikultura
          </Label>
          <Select value={jenisTanaman} onValueChange={(value) => onTanamanChange(value as PlantType)}>
            <SelectTrigger className="glass-card dark:glass-card-dark border-white/30 dark:border-white/10 focus:border-[#3B945E]/50 focus:ring-[#3B945E]/20 transition-smooth">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Buah-buahan</div>
              {PLANT_CONFIGS.filter(p => p.type === 'buah').map(plant => (
                <SelectItem key={plant.id} value={plant.id}>
                  {plant.emoji} {plant.name} ({formatRupiah(plant.avgPricePerKg)}/kg)
                </SelectItem>
              ))}
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground border-t mt-1 pt-2">Sayur-sayuran</div>
              {PLANT_CONFIGS.filter(p => p.type === 'sayur').map(plant => (
                <SelectItem key={plant.id} value={plant.id}>
                  {plant.emoji} {plant.name} ({formatRupiah(plant.avgPricePerKg)}/kg)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {plantConfig && (
            <p className="text-xs text-muted-foreground">
              {plantConfig.description} • Siklus panen: {plantConfig.harvestCycle} hari
            </p>
          )}
        </div>

        {/* Luas Lahan */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#FFB703]" />
            Luas Lahan (meter persegi)
          </Label>
          <Input
            type="number"
            min="1"
            step="1"
            value={luasLahan}
            onChange={(e) => onLuasChange(e.target.value)}
            placeholder="Contoh: 100"
            className="glass-card dark:glass-card-dark border-white/30 dark:border-white/10 focus:border-[#FFB703]/50 focus:ring-[#FFB703]/20 transition-smooth"
          />
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Info className="w-3 h-3" />
            💡 Lahan minimal <strong>1m²</strong> sudah bisa memulai urban farming! Rekomendasi: 50-100m² untuk hasil optimal.
          </p>
          
          {/* Land Size Guidance */}
          <div className="mt-3 p-3 bg-[#3B945E]/5 rounded-lg border border-[#3B945E]/20">
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Panduan Ukuran Lahan
            </h4>
            <ul className="space-y-1 text-xs text-muted-foreground">
              {LAND_SIZE_GUIDANCE.map((guide, idx) => (
                <li key={idx}>• <strong>{guide.range}</strong>: {guide.description}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sistem Irigasi */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-[#0077B6]" />
            Sistem Irigasi
          </Label>
          <Select value={sistemIrigasi} onValueChange={(value) => onIrigasiChange(value as IrrigationSystem)}>
            <SelectTrigger className="glass-card dark:glass-card-dark border-white/30 dark:border-white/10 focus:border-[#0077B6]/50 focus:ring-[#0077B6]/20 transition-smooth">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {IRRIGATION_CONFIGS.map(irrigation => (
                <SelectItem key={irrigation.id} value={irrigation.id}>
                  {irrigation.emoji} {irrigation.name}
                  {irrigation.recommended && <Badge className="ml-2 text-xs bg-[#FFB703]">Rekomendasi</Badge>}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {irrigationConfig && (
            <p className="text-xs text-muted-foreground">
              {irrigationConfig.description}
            </p>
          )}
        </div>

        {/* Device Recommendation Preview */}
        {loadingDeviceRecommendation && (
          <div className="p-4 bg-gradient-to-r from-[#3B945E]/5 to-[#0077B6]/5 rounded-lg border border-[#3B945E]/20">
            <div className="flex items-center justify-center gap-2 py-2">
              <Loader2 className="w-4 h-4 animate-spin text-[#3B945E]" />
              <span className="text-sm text-muted-foreground">Memuat rekomendasi device IoT...</span>
            </div>
          </div>
        )}
        
        {deviceRecommendation && !loadingDeviceRecommendation && (
          <div className="p-4 bg-gradient-to-r from-[#3B945E]/5 to-[#0077B6]/5 rounded-lg border border-[#3B945E]/20">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-[#FFB703] flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm mb-2">Rekomendasi Perangkat IoT</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-muted-foreground">Jumlah Device:</span>
                    <span className="ml-2 font-semibold">{deviceRecommendation.jumlahDevice} unit</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Paket:</span>
                    <span className="ml-2 font-semibold">{deviceRecommendation.recommendedPackage.name}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Biaya Hardware:</span>
                    <span className="ml-2 font-semibold">{formatRupiah(deviceRecommendation.totalDeviceCost)}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Langganan:</span>
                    <span className="ml-2 font-semibold">{formatRupiah(deviceRecommendation.monthlySubscription)}/bulan</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{deviceRecommendation.coverage}</p>
              </div>
            </div>
          </div>
        )}

        {/* Recommendation Box */}
        {loadingRecommendation && (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="w-5 h-5 animate-spin text-[#3B945E]" />
            <span className="ml-2 text-sm text-muted-foreground">Memuat rekomendasi...</span>
          </div>
        )}

        {recommendation && !loadingRecommendation && (
          <Alert className="border-[#3B945E]/30 bg-[#3B945E]/5">
            <Lightbulb className="w-4 h-4 text-[#3B945E]" />
            <AlertDescription>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold mb-2">Rekomendasi untuk {selectedKabupaten}:</p>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Tanaman: {getPlantConfig(recommendation.recommendations.tanamanUtama as PlantType)?.emoji} {getPlantConfig(recommendation.recommendations.tanamanUtama as PlantType)?.name}</li>
                    <li>• Luas optimal: {recommendation.recommendations.luasLahanOptimal}m²</li>
                    <li>• Sistem: {getIrrigationConfig(recommendation.recommendations.sistemIrigasiRekomendasi as IrrigationSystem)?.name}</li>
                    <li>• Potensi hasil: {recommendation.recommendations.potensiHasilPerM2} kg/m²</li>
                  </ul>
                </div>
                <Button 
                  size="sm"
                  onClick={onApplyRecommendation}
                  className="flex-shrink-0 bg-[#3B945E] hover:bg-[#3B945E]/90"
                >
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  Terapkan
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Calculate Button */}
        <Button
          onClick={onCalculate}
          disabled={!selectedKabupaten || !luasLahan || calculating || loadingDeviceRecommendation || !deviceRecommendation}
          className="w-full h-12 neumorphic-button bg-gradient-to-r from-[#3B945E] to-[#0077B6] hover:shadow-xl transition-all text-white"
          size="lg"
        >
          {calculating ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Menghitung ROI...
            </>
          ) : loadingDeviceRecommendation ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Memuat rekomendasi device...
            </>
          ) : (
            <>
              <Calculator className="w-5 h-5 mr-2" />
              Hitung ROI
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
        
        {/* Status message for device recommendation */}
        {luasLahan && parseFloat(luasLahan) >= 1 && !deviceRecommendation && !loadingDeviceRecommendation && (
          <p className="text-xs text-yellow-600 dark:text-yellow-400 text-center">
            ⚠️ Rekomendasi device belum tersedia. Pastikan semua field terisi.
          </p>
        )}
      </div>
    </Card>
  );
}
