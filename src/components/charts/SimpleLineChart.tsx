/**
 * Simple Line Chart Component - Chart.js Implementation 🎨✨
 * Beautiful, modern chart with Chart.js for stunning visuals
 * 
 * Features:
 * - ✨ Beautiful gradient fills
 * - ✨ Smooth animations
 * - ✨ Interactive tooltips with glassmorphism
 * - ✨ Responsive & mobile-friendly
 * - ✨ Light & dark mode support
 * - ✨ Professional styling matching Neo-Skeuo Glass Fusion design
 * - 🎯 Clean, modern appearance
 * - 🎯 Better visual appeal than custom SVG
 */

import { useEffect, useRef, useMemo, useState } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  LineController,
  Title, 
  Tooltip, 
  Legend, 
  Filler, 
  ChartOptions 
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  LineController,
  Title, 
  Tooltip, 
  Legend, 
  Filler
);

interface DataPoint {
  [key: string]: string | number;
}

interface SimpleLineChartProps {
  data: DataPoint[];
  xKey: string;
  lines: Array<{
    key: string;
    color: string;
    name?: string;
  }>;
  height?: number;
  className?: string;
}

// Helper function to sample data for better performance
function sampleData<T>(data: T[], maxPoints: number = 24): T[] {
  if (!data || data.length <= maxPoints) return data;
  
  const sampled: T[] = [data[0]];
  const lastIndex = data.length - 1;
  const step = (lastIndex - 1) / (maxPoints - 2);
  
  for (let i = 1; i < maxPoints - 1; i++) {
    const index = Math.round(i * step);
    if (index > 0 && index < lastIndex) {
      sampled.push(data[index]);
    }
  }
  
  sampled.push(data[lastIndex]);
  return sampled;
}

// Helper to format labels based on container width
function formatLabel(label: string, containerWidth: number): string {
  // Detect date format: DD.MM.YYYY or DD.MM.YY or DD.MM
  if (label.match(/^\d{2}\.\d{2}/)) {
    if (containerWidth <= 400) {
      return label.substring(0, 5); // "08.02"
    }
    if (containerWidth <= 600) {
      const parts = label.split('.');
      return parts.length >= 2 ? `${parts[0]}.${parts[1]}` : label.substring(0, 5);
    }
    return label.substring(0, 8); // "08.02.20"
  }
  
  // Detect time format: HH:MM:SS or HH:MM
  if (label.includes(':')) {
    const parts = label.split(':');
    if (parts.length >= 2) {
      return `${parts[0]}:${parts[1]}`; // Always HH:MM
    }
  }
  
  // Detect ISO date format: YYYY-MM-DD
  if (label.match(/^\d{4}-\d{2}-\d{2}/)) {
    const parts = label.split('-');
    if (containerWidth <= 400) {
      return `${parts[2]}/${parts[1]}`; // DD/MM
    }
    return `${parts[2]}.${parts[1]}`; // DD.MM
  }
  
  // For long strings, truncate intelligently
  if (label.length > 8) {
    if (containerWidth <= 400) {
      return label.substring(0, 4) + '..';
    }
    return label.substring(0, 6) + '..';
  }
  
  return label;
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

export function SimpleLineChart({
  data,
  xKey,
  lines,
  height = 220,
  className = ''
}: SimpleLineChartProps) {
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

    // Sample data for better performance
    const maxPoints = containerWidth <= 400 ? 12 : containerWidth <= 600 ? 18 : 24;
    const sampledData = sampleData(data, maxPoints);

    // Format labels
    const labels = sampledData.map(d => formatLabel(String(d[xKey]), containerWidth));

    // Create datasets for each line
    const datasets = lines.map((line, index) => {
      const values = sampledData.map(d => Number(d[line.key]));
      const color = line.color;

      // Create gradient (will be set in the effect)
      return {
        label: line.name || line.key,
        data: values,
        borderColor: color,
        backgroundColor: color, // Will be replaced with gradient
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: color,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointHoverBorderWidth: 3,
        tension: 0.4, // Smooth curves
        fill: true,
        _color: color, // Store original color for gradient creation
      };
    });

    return { labels, datasets };
  }, [data, xKey, lines, containerWidth]);

  // Create and update chart
  useEffect(() => {
    if (!chartRef.current || !chartData) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // Destroy existing chart
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create gradients for each dataset
    const datasetsWithGradients = chartData.datasets.map((dataset) => {
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      const color = (dataset as any)._color;
      
      // Beautiful gradient from solid to transparent
      gradient.addColorStop(0, hexToRgba(color, 0.6));
      gradient.addColorStop(0.5, hexToRgba(color, 0.3));
      gradient.addColorStop(1, hexToRgba(color, 0.05));

      return {
        ...dataset,
        backgroundColor: gradient,
      };
    });

    // Text colors based on theme
    const textColor = isDark ? 'rgba(250, 250, 250, 0.7)' : 'rgba(10, 10, 10, 0.7)';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';

    // Chart options
    const options: ChartOptions<'line'> = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: {
          display: false, // We can customize this later if needed
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
              const value = context.parsed.y.toFixed(1);
              return `${label}: ${value}`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: true,
            color: gridColor,
            drawOnChartArea: true,
          },
          ticks: {
            color: textColor,
            font: {
              size: 10,
              weight: '600',
            },
            maxRotation: 0,
            autoSkip: true,
            maxTicksLimit: containerWidth <= 400 ? 5 : containerWidth <= 600 ? 7 : 9,
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
              return Number(value).toFixed(0);
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
      type: 'line',
      data: {
        labels: chartData.labels,
        datasets: datasetsWithGradients,
      },
      options,
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [chartData, height, isDark, containerWidth]);

  if (!chartData || chartData.datasets.length === 0) {
    return (
      <div 
        ref={containerRef}
        className={`relative w-full ${className} flex items-center justify-center`}
        style={{ height: height || 220 }}
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
        height: height || 220,
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'scale(1)' : 'scale(0.98)',
        transition: 'opacity 600ms ease-out, transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      {/* Animated gradient background overlay */}
      <div 
        className="absolute inset-0 rounded-xl opacity-30 dark:opacity-20 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${lines[0]?.color}18 0%, transparent 50%, #0077B618 100%)`,
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
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}