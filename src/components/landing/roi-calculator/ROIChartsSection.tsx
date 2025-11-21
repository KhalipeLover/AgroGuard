/**
 * ROI Charts Section Component - v11.0 MOBILE REDESIGN
 * Radical mobile optimization - NO OVERLAP GUARANTEED
 * Simplified mobile layout with proper spacing
 * PRODUCTION READY - PROFESSIONAL MOBILE UX!
 */

import { Card } from '../../ui/card';
import { BarChart3, PieChart as PieChartIcon, Droplets, Sprout, Cog, XCircle } from 'lucide-react';
import { SimpleBarChart, SimplePieChart } from '../../charts';
import { 
  generateComparisonChartData, 
  generateSavingsChartData, 
  calculatePercentageChange,
  CHART_COLORS 
} from './roiHelpers';
import { formatRupiah } from '../../../data';
import type { CalculationResult } from './types';

interface ROIChartsSectionProps {
  result: CalculationResult;
}

const SAVINGS_ICONS = {
  'Penghematan Air': Droplets,
  'Penghematan Pupuk': Sprout,
  'Penghematan Tenaga Kerja': Cog,
  'Pengurangan Gagal Panen': XCircle
};

export function ROIChartsSection({ result }: ROIChartsSectionProps) {
  const comparisonData = generateComparisonChartData(result);
  const savingsData = generateSavingsChartData(result);

  const percentages = comparisonData.map(item => ({
    name: item.name,
    change: calculatePercentageChange(item['Tradisional'] || 0, item['IoT'] || 0)
  }));

  return (
    <div className="space-y-8 md:space-y-10 lg:space-y-12 py-6 md:py-12 lg:py-16">
      {/* SECTION TITLE */}
      <div className="text-center space-y-2 md:space-y-4 px-4">
        <div className="inline-block glass-card dark:glass-card-dark px-3 py-1.5 md:px-6 md:py-2.5 rounded-full border-2 border-[#3B945E]/30 dark:border-[#3B945E]/20 shadow-lg">
          <span className="text-xs md:text-sm font-bold text-[#3B945E] dark:text-[#3B945E] uppercase tracking-wider">
            📊 Analisis ROI
          </span>
        </div>
        <h2 className="text-xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
          PERBANDINGAN METODE
        </h2>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
          Visualisasi lengkap perbandingan metode tradisional vs AGROGUARD IoT
        </p>
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8 px-4 max-w-7xl mx-auto">
        
        {/* BAR CHART */}
        <Card className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 p-4 md:p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex flex-col space-y-4 md:space-y-6 lg:space-y-8">
            {/* Header */}
            <div className="flex items-start gap-2 md:gap-4 flex-shrink-0">
              <div className="p-2 md:p-3 rounded-lg md:rounded-xl bg-[#3B945E]/10 border border-[#3B945E]/20 flex-shrink-0">
                <BarChart3 className="w-4 h-4 md:w-6 md:h-6 text-[#3B945E]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm md:text-lg lg:text-xl font-bold text-foreground mb-1 md:mb-2">
                  Produksi, Pendapatan, dan Biaya
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Perbandingan 3 metrik utama Tradisional vs IoT
                </p>
              </div>
            </div>
            
            {/* Chart - ULTRA COMPACT MOBILE WITH OVERFLOW PROTECTION */}
            <div className="h-[120px] md:h-[380px] lg:h-[420px] flex-shrink-0 rounded-lg mb-20 md:mb-0">
              <SimpleBarChart
                data={comparisonData}
                bars={[
                  { dataKey: 'Tradisional', fill: '#EF4444', name: 'Tradisional' },
                  { dataKey: 'IoT', fill: '#3B945E', name: 'AGROGUARD IoT' }
                ]}
                showValues={false}
                showPercentages={false}
              />
            </div>

            {/* Summary Badges - VERTICAL STACK ON MOBILE - CLEAR SEPARATION */}
            <div className="flex-shrink-0 space-y-2 md:space-y-0 md:flex md:flex-wrap md:items-center md:justify-center md:gap-3 lg:gap-4 pt-10 md:pt-6 lg:pt-8 border-t-2 border-white/20 dark:border-white/10 mt-16 md:mt-0">
              {percentages.map((item, index) => {
                const isPositive = item.change.startsWith('+');
                const isNegative = item.change.startsWith('-');
                
                const colorClass = item.name === 'Biaya' 
                  ? (isNegative 
                      ? 'bg-green-50/90 dark:bg-green-900/30 border-green-400/60 dark:border-green-600/40 text-green-700 dark:text-green-400' 
                      : 'bg-red-50/90 dark:bg-red-900/30 border-red-400/60 dark:border-red-600/40 text-red-700 dark:text-red-400')
                  : (isPositive 
                      ? 'bg-green-50/90 dark:bg-green-900/30 border-green-400/60 dark:border-green-600/40 text-green-700 dark:text-green-400' 
                      : 'bg-gray-50/90 dark:bg-gray-900/30 border-gray-400/60 dark:border-gray-600/40 text-gray-700 dark:text-gray-400');
                
                return (
                  <div 
                    key={index}
                    className={`flex items-center justify-between md:justify-center gap-2 md:gap-2 px-3 py-2 md:px-4 md:py-2.5 lg:px-5 lg:py-3 rounded-lg md:rounded-xl border-2 ${colorClass} text-sm md:text-sm lg:text-base font-semibold transition-all hover:scale-105 shadow-md`}
                  >
                    <span className="font-medium">{item.name}</span>
                    <span className="font-bold whitespace-nowrap">{item.change}</span>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            {/* <div className="flex-shrink-0 flex items-center justify-center gap-3 md:gap-6 lg:gap-8 pt-3 md:pt-4">
              <div className="flex items-center gap-2 md:gap-3 glass-card dark:glass-card-dark px-3 py-2 md:px-4 md:py-2.5 lg:px-5 lg:py-3 rounded-lg border border-white/30 dark:border-white/10 shadow-sm">
                <div className="w-3 h-3 md:w-4 md:h-4 rounded-sm bg-[#EF4444] shadow-sm" />
                <span className="text-xs md:text-sm font-bold text-foreground">Tradisional</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3 glass-card dark:glass-card-dark px-3 py-2 md:px-4 md:py-2.5 lg:px-5 lg:py-3 rounded-lg border border-white/30 dark:border-white/10 shadow-sm">
                <div className="w-3 h-3 md:w-4 md:h-4 rounded-sm bg-[#3B945E] shadow-sm" />
                <span className="text-xs md:text-sm font-bold text-foreground">AGROGUARD IoT</span>
              </div>
            </div> */}
          </div>
        </Card>

        {/* PIE CHART */}
        <Card className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 p-4 md:p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex flex-col space-y-4 md:space-y-6 lg:space-y-8">
            {/* Header */}
            <div className="flex items-start gap-2 md:gap-4">
              <div className="p-2 md:p-3 rounded-lg md:rounded-xl bg-[#0077B6]/10 border border-[#0077B6]/20 flex-shrink-0">
                <PieChartIcon className="w-4 h-4 md:w-6 md:h-6 text-[#0077B6]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm md:text-lg lg:text-xl font-bold text-foreground mb-1 md:mb-2">
                  Distribusi Penghematan
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Breakdown lengkap manfaat AGROGUARD IoT
                </p>
              </div>
            </div>
            
            {/* Total Display */}
            <div className="flex-shrink-0 glass-card dark:glass-card-dark px-3 py-2.5 md:px-5 md:py-4 lg:px-6 lg:py-5 rounded-lg md:rounded-xl border-2 border-[#3B945E]/30 dark:border-[#3B945E]/20 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3">
                <div className="text-xs md:text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Total Penghematan
                </div>
                <div className="sm:text-right">
                  <div className="text-base md:text-base lg:text-lg font-bold text-[#3B945E]">
                    {formatRupiah(result.totalPenghematan)}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground font-medium">
                    per tahun
                  </div>
                </div>
              </div>
            </div>
            
            {/* Chart - COMPACT MOBILE */}
            <div className="h-[280px] md:h-[380px] lg:h-[420px]">
              <SimplePieChart
                data={savingsData}
                colors={CHART_COLORS}
                formatValue={(val) => formatRupiah(val)}
                showIcons={true}
                iconsMap={SAVINGS_ICONS}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* KEY INSIGHTS */}
      <div className="px-4 max-w-7xl mx-auto">
        <Card className="glass-card dark:glass-card-dark border-2 border-[#FFB703]/30 dark:border-[#FFB703]/20 p-4 md:p-6 lg:p-8 shadow-xl">
          <div className="flex items-start gap-2 md:gap-4">
            <div className="p-2 md:p-3 rounded-lg md:rounded-xl bg-[#FFB703]/10 border border-[#FFB703]/20 flex-shrink-0">
              <span className="text-lg md:text-2xl">💡</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm md:text-base lg:text-lg font-bold text-foreground mb-2 md:mb-3">
                Kesimpulan Analisis
              </h4>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                AGROGUARD IoT menunjukkan peningkatan signifikan dalam produksi ({percentages[0]?.change}) 
                dan pendapatan ({percentages[1]?.change}), sambil mengurangi biaya operasional. 
                Total penghematan per tahun mencapai <span className="font-bold text-[#3B945E]">{formatRupiah(result.totalPenghematan)}</span>, 
                menjadikan investasi ini sangat menguntungkan untuk jangka panjang.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}