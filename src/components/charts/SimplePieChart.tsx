/**
 * Simple Pie Chart Component - Chart.js Implementation 🎨✨
 * Beautiful, modern donut chart with Chart.js for stunning visuals
 * 
 * Features:
 * - ✨ Beautiful donut chart with center text
 * - ✨ Smooth animations
 * - ✨ Interactive tooltips with glassmorphism
 * - ✨ Responsive & mobile-friendly
 * - ✨ Light & dark mode support
 * - ✨ Professional styling matching Neo-Skeuo Glass Fusion design
 * - ✨ Custom legend with icons support
 * - 🎯 Clean, modern appearance
 */

import { useEffect, useRef, useMemo, useState } from 'react';
import { 
  Chart as ChartJS, 
  ArcElement,
  DoughnutController,
  Title, 
  Tooltip, 
  Legend, 
  ChartOptions 
} from 'chart.js';
import { LucideIcon } from 'lucide-react';

// Register Chart.js components
ChartJS.register(
  ArcElement,
  DoughnutController,
  Title, 
  Tooltip, 
  Legend
);

interface DataPoint {
  name: string;
  value: number;
}

interface SimplePieChartProps {
  data: DataPoint[];
  colors?: string[];
  formatValue?: (value: number) => string;
  height?: number;
  className?: string;
  showIcons?: boolean;
  iconsMap?: { [key: string]: LucideIcon };
}

// Helper to convert hex to rgba
function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Helper to detect dark mode
function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return isDark;
}

export function SimplePieChart({
  data,
  colors = ['#3B945E', '#0077B6', '#FFB703', '#EF4444'],
  formatValue = (val) => val.toString(),
  height = 400,
  className = '',
  showIcons = false,
  iconsMap = {}
}: SimplePieChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const isDark = useDarkMode();

  // Mount animation
  useEffect(() => {
    setTimeout(() => setMounted(true), 50);
  }, []);

  // Calculate total and percentages
  const chartInfo = useMemo(() => {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    const slices = data.map((item, index) => ({
      ...item,
      percentage: (item.value / total) * 100,
      color: colors[index % colors.length]
    }));
    
    return { slices, total };
  }, [data, colors]);

  // Prepare chart data
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return null;

    const labels = data.map(d => d.name);
    const values = data.map(d => d.value);
    const backgroundColors = data.map((_, i) => colors[i % colors.length]);

    return {
      labels,
      datasets: [{
        data: values,
        backgroundColor: backgroundColors,
        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)',
        borderWidth: 2,
        hoverOffset: 8,
      }],
    };
  }, [data, colors, isDark]);

  // Create and update chart
  useEffect(() => {
    if (!chartRef.current || !chartData) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // Destroy existing chart
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Text colors based on theme
    const textColor = isDark ? 'rgba(250, 250, 250, 0.7)' : 'rgba(10, 10, 10, 0.7)';

    // Chart options
    const options: ChartOptions<'doughnut'> = {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.5,
      cutout: '65%',
      plugins: {
        legend: {
          display: false, // We'll use custom legend
        },
        tooltip: {
          enabled: true,
          backgroundColor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          titleColor: isDark ? '#fafafa' : '#0a0a0a',
          bodyColor: isDark ? '#e5e7eb' : '#374151',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          borderWidth: 1,
          padding: 12,
          displayColors: true,
          boxPadding: 6,
          usePointStyle: true,
          callbacks: {
            label: (context) => {
              const label = context.label || '';
              const value = context.parsed;
              const total = (context.dataset.data as number[]).reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return `${label}: ${formatValue(value)} (${percentage}%)`;
            },
          },
        },
      },
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 800,
        easing: 'easeInOutQuart',
      },
    };

    // Create new chart with center text plugin
    chartInstanceRef.current = new ChartJS(ctx, {
      type: 'doughnut',
      data: chartData,
      options,
      plugins: [{
        id: 'centerText',
        afterDatasetsDraw: (chart) => {
          const ctx = chart.ctx;
          const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
          const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
          
          ctx.save();
          
          // Draw "Total" label
          ctx.font = 'bold 12px sans-serif';
          ctx.fillStyle = isDark ? 'rgba(250, 250, 250, 0.5)' : 'rgba(10, 10, 10, 0.5)';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          ctx.fillText('TOTAL', centerX, centerY - 5);
          
          // Draw total value
          ctx.font = 'bold 24px sans-serif';
          ctx.fillStyle = isDark ? 'rgba(250, 250, 250, 0.9)' : 'rgba(10, 10, 10, 0.9)';
          ctx.textBaseline = 'top';
          ctx.fillText(formatValue(chartInfo.total), centerX, centerY + 5);
          
          ctx.restore();
        },
      }],
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [chartData, isDark, formatValue, chartInfo.total]);

  if (!chartData || chartData.datasets.length === 0) {
    return (
      <div 
        ref={containerRef}
        className={`relative w-full ${className} flex items-center justify-center`}
        style={{ height: height || 400 }}
      >
        <div className="text-muted-foreground opacity-50">No data available</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{
        height: height || 400,
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'scale(1)' : 'scale(0.98)',
        transition: 'opacity 600ms ease-out, transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      {/* Full chart + legend layout */}
      <div className="h-full flex flex-col gap-3 md:gap-6 lg:gap-6">
        
        {/* Donut Chart - Responsive height - COMPACT WITH MINIMAL SPACING */}
        <div className="flex-shrink-0 h-[160px] md:h-[240px] lg:h-[280px] mb-4 md:mb-0">
          {/* Animated gradient background overlay */}
          <div 
            className="absolute inset-0 rounded-xl opacity-20 dark:opacity-15 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${colors[0]}18 0%, transparent 50%, ${colors[colors.length - 1]}18 100%)`,
              animation: 'gradientShift 8s ease-in-out infinite',
            }}
          />
          
          {/* Chart canvas */}
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-full max-w-[280px] md:max-w-[320px] h-full">
              <canvas ref={chartRef} />
            </div>
          </div>
        </div>

        {/* Custom Legend - SHOW 2 ITEMS ONLY, REST SCROLLABLE - CLOSE TO CHART */}
        <div className="flex-1 flex-shrink-0 overflow-y-auto max-h-[75px] md:max-h-[150px]">
          <div className="space-y-2">
            {chartInfo.slices.map((slice, index) => {
              const Icon = showIcons && iconsMap[slice.name] ? iconsMap[slice.name] : null;
              
              return (
                <div
                  key={index}
                  className="glass-card dark:glass-card-dark p-2 md:p-3.5 lg:p-4 rounded-lg md:rounded-xl border border-white/30 dark:border-white/10 md:border-2 hover:border-white/50 dark:hover:border-white/20 transition-all cursor-pointer group shadow-sm md:shadow-md hover:shadow-lg"
                >
                  {/* MOBILE: Stacked layout, DESKTOP: Horizontal */}
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 lg:gap-4">
                    
                    {/* Top row (mobile) / Left side (desktop): Icon + Name */}
                    <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                      {/* Color indicator */}
                      <div 
                        className="w-4 h-4 md:w-5 md:h-5 rounded md:rounded-md flex-shrink-0 shadow-sm md:shadow-md group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: slice.color }}
                      />
                      
                      {/* Icon */}
                      {Icon && (
                        <Icon className="w-5 h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 flex-shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" />
                      )}
                      
                      {/* Name */}
                      <div className="font-bold text-foreground group-hover:text-[#3B945E] transition-colors flex-1 min-w-0">
                        {slice.name}
                      </div>
                    </div>
                    
                    {/* Bottom row (mobile) / Right side (desktop): Value + Percentage */}
                    <div className="flex items-center justify-between md:justify-end gap-3 md:gap-4 md:flex-shrink-0 pl-6 md:pl-0">
                      {/* VALUE */}
                      <div className="font-bold text-foreground">
                        {formatValue(slice.value)}
                      </div>
                      {/* PERCENTAGE */}
                      <div className="text-muted-foreground font-bold">
                        {slice.percentage.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes gradientShift {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.35; }
        }
      `}</style>
    </div>
  );
}