import { SimpleLineChart } from '../charts';
import { TrendingUp } from 'lucide-react';

interface SensorChartProps {
  data: { time: string, value: number }[];
  title: string;
}

export default function SensorChart({ data, title }: SensorChartProps) {
  // ✅ DEFENSIVE: Check if data exists and is array before mapping
  const chartData = data && Array.isArray(data) ? data.map(point => ({
    time: point.time,
    value: point.value
  })) : [];

  // Calculate trend
  const trend = chartData.length > 1 
    ? chartData[chartData.length - 1].value - chartData[0].value 
    : 0;

  return (
    <div className="relative">
      {/* Decorative gradient blob - More subtle */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#3B945E]/8 to-[#0077B6]/8 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative">
        {/* 🔥 IMPROVED: Tighter header spacing */}
        <div className="flex items-start justify-between mb-3 gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-foreground mb-0.5 truncate">{title}</h3>
            <p className="text-xs text-muted-foreground">24-hour trend analysis</p>
          </div>
          {trend !== 0 && (
            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg shrink-0 ${
              trend > 0 
                ? 'bg-green-500/10 text-green-600 dark:text-green-400' 
                : 'bg-red-500/10 text-red-600 dark:text-red-400'
            }`}>
              <TrendingUp className={`w-3.5 h-3.5 ${trend < 0 ? 'rotate-180' : ''}`} />
              <span className="text-xs font-semibold">
                {trend > 0 ? '+' : ''}{Math.abs(trend).toFixed(1)}%
              </span>
            </div>
          )}
        </div>

        {/* 🔥 V6.1: Clean chart container - No redundant wrapper */}
        {chartData.length > 0 ? (
          <div className="glass-card dark:glass-card-dark rounded-xl p-2.5 border border-white/20 dark:border-white/10 w-full overflow-hidden shadow-sm">
            <SimpleLineChart
              data={chartData}
              xKey="time"
              lines={[
                { key: 'value', color: '#3B945E', name: title }
              ]}
              height={220}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-[220px] glass-card dark:glass-card-dark rounded-xl text-muted-foreground border border-white/10">
            <div className="text-center px-4">
              <TrendingUp className="w-10 h-10 mx-auto mb-2 opacity-20" />
              <p className="text-sm">No data available</p>
              <p className="text-xs mt-1 opacity-60">Chart will appear when data is loaded</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}