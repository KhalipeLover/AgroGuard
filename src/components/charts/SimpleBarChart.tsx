/**
 * Simple Bar Chart Component - Chart.js Implementation 🎨✨
 * Beautiful, modern bar chart with Chart.js for stunning visuals
 * 
 * Features:
 * - ✨ Beautiful gradient fills
 * - ✨ Smooth animations
 * - ✨ Interactive tooltips with glassmorphism
 * - ✨ Responsive & mobile-friendly
 * - ✨ Light & dark mode support
 * - ✨ Professional styling matching Neo-Skeuo Glass Fusion design
 * - ✨ Support for multiple bars per group
 * - ✨ Optional percentage display
 * - 🎯 Clean, modern appearance
 */

import { useEffect, useRef, useMemo, useState } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement,
  BarController,
  Title, 
  Tooltip, 
  Legend, 
  ChartOptions 
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement,
  BarController,
  Title, 
  Tooltip, 
  Legend
);

interface DataPoint {
  [key: string]: string | number;
}

interface BarConfig {
  dataKey?: string;
  key?: string; // Support legacy prop name
  fill?: string;
  color?: string; // Support legacy prop name
  name?: string;
}

interface SimpleBarChartProps {
  data: DataPoint[];
  xKey?: string;
  bars: BarConfig[];
  height?: number;
  className?: string;
  showValues?: boolean;
  showPercentages?: boolean;
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

export function SimpleBarChart({
  data,
  xKey = 'name',
  bars,
  height = 300,
  className = '',
  showValues = false,
  showPercentages = false
}: SimpleBarChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(800);
  const [mounted, setMounted] = useState(false);
  const isDark = useDarkMode();

  // Track container width for responsive behavior
  useEffect(() => {
    if (!containerRef.current) return;
    
    setContainerWidth(containerRef.current.offsetWidth);
    
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Mount animation
  useEffect(() => {
    setTimeout(() => setMounted(true), 50);
  }, []);

  // Prepare chart data
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return null;

    // Extract labels
    const labels = data.map(d => {
      const label = String(d[xKey]);
      const unit = d['unit'] ? `(${d['unit']})` : '';
      return unit ? `${label} ${unit}` : label;
    });

    // Create datasets for each bar
    const datasets = bars.map((bar) => {
      const values = data.map(d => Number(d[bar.dataKey || bar.key || '']) || 0);
      const color = bar.fill || bar.color;

      return {
        label: bar.name || bar.dataKey || bar.key || '',
        data: values,
        backgroundColor: color,
        borderColor: color,
        borderWidth: 0,
        borderRadius: 6,
        borderSkipped: false,
        _color: color, // Store original color
      };
    });

    return { labels, datasets };
  }, [data, xKey, bars]);

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
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';

    // Chart options
    const options: ChartOptions<'bar'> = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: {
          display: bars.length > 1,
          position: 'top',
          align: 'end',
          labels: {
            color: textColor,
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 15,
            font: {
              size: 11,
              weight: '600',
            },
          },
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
            title: (tooltipItems) => {
              return tooltipItems[0]?.label || '';
            },
            label: (context) => {
              const label = context.dataset.label || '';
              const value = context.parsed.y;
              
              // Show percentage if comparing two bars
              if (showPercentages && bars.length === 2 && context.datasetIndex === 1) {
                const traditionalValue = chartData.datasets[0].data[context.dataIndex] as number;
                const iotValue = value;
                
                if (traditionalValue > 0) {
                  const percentChange = ((iotValue - traditionalValue) / traditionalValue) * 100;
                  const displayPercent = percentChange > 0 
                    ? `+${percentChange.toFixed(0)}%` 
                    : `${percentChange.toFixed(0)}%`;
                  return `${label}: ${value.toFixed(1)} (${displayPercent})`;
                }
              }
              
              return `${label}: ${value.toFixed(1)}`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: textColor,
            font: {
              size: containerWidth <= 600 ? 10 : 11,
              weight: '700',
            },
            maxRotation: 0,
            autoSkip: false,
          },
        },
        y: {
          grid: {
            display: true,
            color: gridColor,
            drawOnChartArea: true,
          },
          ticks: {
            color: textColor,
            font: {
              size: 11,
              weight: '600',
            },
            padding: 8,
            callback: (value) => {
              const numValue = Number(value);
              return numValue >= 1000 
                ? `${(numValue / 1000).toFixed(1)}K` 
                : numValue.toFixed(0);
            },
          },
        },
      },
      animation: {
        duration: 800,
        easing: 'easeInOutQuart',
      },
    };

    // Create new chart
    chartInstanceRef.current = new ChartJS(ctx, {
      type: 'bar',
      data: {
        labels: chartData.labels,
        datasets: chartData.datasets,
      },
      options,
      plugins: showPercentages && bars.length === 2 ? [{
        id: 'percentageLabels',
        afterDatasetsDraw: (chart) => {
          const ctx = chart.ctx;
          ctx.save();
          
          chart.data.datasets.forEach((dataset, datasetIndex) => {
            // Only show percentage on the second bar (IoT)
            if (datasetIndex !== 1) return;
            
            const meta = chart.getDatasetMeta(datasetIndex);
            
            meta.data.forEach((bar: any, index) => {
              const traditionalValue = chart.data.datasets[0].data[index] as number;
              const iotValue = dataset.data[index] as number;
              
              if (traditionalValue === 0) return;
              
              const percentChange = ((iotValue - traditionalValue) / traditionalValue) * 100;
              const displayPercent = percentChange > 0 
                ? `+${percentChange.toFixed(0)}%` 
                : `${percentChange.toFixed(0)}%`;
              
              const textColor = '#22C55E';
              
              // Responsive font size based on chart width
              const fontSize = containerWidth <= 400 ? 10 : containerWidth <= 600 ? 12 : 14;
              
              ctx.fillStyle = textColor;
              ctx.font = `bold ${fontSize}px sans-serif`;
              ctx.textAlign = 'center';
              ctx.textBaseline = 'bottom';
              
              // Position adjustment for smaller screens
              const yOffset = containerWidth <= 400 ? -5 : -8;
              ctx.fillText(displayPercent, bar.x, bar.y + yOffset);
            });
          });
          
          ctx.restore();
        },
      }] : [],
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [chartData, height, isDark, containerWidth, showPercentages, bars.length]);

  if (!chartData || chartData.datasets.length === 0) {
    return (
      <div 
        ref={containerRef}
        className={`relative w-full ${className} flex items-center justify-center`}
        style={{ height: height || 300 }}
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
        height: height || 300,
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'scale(1)' : 'scale(0.98)',
        transition: 'opacity 600ms ease-out, transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      {/* Animated gradient background overlay */}
      <div 
        className="absolute inset-0 rounded-xl opacity-20 dark:opacity-15 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${bars[0]?.fill || bars[0]?.color}18 0%, transparent 50%, ${bars[bars.length - 1]?.fill || bars[bars.length - 1]?.color}18 100%)`,
          animation: 'gradientShift 8s ease-in-out infinite',
        }}
      />
      
      {/* Chart canvas */}
      <div className="relative w-full h-full">
        <canvas ref={chartRef} />
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