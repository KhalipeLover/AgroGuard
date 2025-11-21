/**
 * Plant Threshold Indicator Component
 * 
 * Displays soil moisture status based on selected plant's threshold
 */

import { useState, useEffect } from 'react';
import motion from '../ui/motion-replacement';
import { 
  Droplets, 
  AlertTriangle, 
  CheckCircle, 
  AlertCircle,
  Info,
  Leaf
} from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { 
  fetchPlantThresholds,
  getMoistureStatus,
  type PlantThreshold 
} from '../../data';

interface PlantThresholdIndicatorProps {
  soilMoisture: number;  // Current soil moisture percentage
}

export default function PlantThresholdIndicator({ soilMoisture }: PlantThresholdIndicatorProps) {
  const [plants, setPlants] = useState<PlantThreshold[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<PlantThreshold | null>(null);
  const [loading, setLoading] = useState(true);

  // Load plant thresholds
  useEffect(() => {
    fetchPlantThresholds()
      .then(data => {
        setPlants(data);
        // Set default plant (Tomat)
        setSelectedPlant(data.find(p => p.id === 'tomat') || data[0]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !selectedPlant) {
    return (
      <Card className="glass-card dark:glass-card-dark p-6">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-white/20 rounded w-1/2"></div>
          <div className="h-8 bg-white/20 rounded"></div>
          <div className="h-4 bg-white/20 rounded w-3/4"></div>
        </div>
      </Card>
    );
  }

  const status = getMoistureStatus(soilMoisture, selectedPlant);

  // Icon based on status
  const StatusIcon = {
    waspada: AlertTriangle,
    sirami: AlertCircle,
    ideal: CheckCircle,
    stop: Info
  }[status.status];

  // Color theme
  const colorTheme = {
    waspada: {
      bg: 'from-red-500 to-orange-500',
      text: 'text-red-600 dark:text-red-400',
      border: 'border-red-500/30',
      badge: 'bg-red-500/20 text-red-600 dark:text-red-400'
    },
    sirami: {
      bg: 'from-yellow-500 to-orange-500',
      text: 'text-yellow-600 dark:text-yellow-400',
      border: 'border-yellow-500/30',
      badge: 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400'
    },
    ideal: {
      bg: 'from-green-500 to-emerald-500',
      text: 'text-green-600 dark:text-green-400',
      border: 'border-green-500/30',
      badge: 'bg-green-500/20 text-green-600 dark:text-green-400'
    },
    stop: {
      bg: 'from-blue-500 to-cyan-500',
      text: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-500/30',
      badge: 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
    }
  }[status.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`glass-card dark:glass-card-dark border-2 ${colorTheme.border}`}>
        <div className="p-6 space-y-4">
          {/* Header with Plant Selection */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`bg-gradient-to-br ${colorTheme.bg} p-3 rounded-xl glow-accent`}>
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tanaman</p>
                <Select
                  value={selectedPlant.id}
                  onValueChange={(value) => {
                    const plant = plants.find(p => p.id === value);
                    if (plant) setSelectedPlant(plant);
                  }}
                >
                  <SelectTrigger className="w-[180px] glass-card dark:glass-card-dark border-white/30 dark:border-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {plants.map(plant => (
                      <SelectItem key={plant.id} value={plant.id}>
                        {plant.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Status Badge */}
            <Badge className={colorTheme.badge}>
              {status.message}
            </Badge>
          </div>

          {/* Current Moisture */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className={`w-5 h-5 ${colorTheme.text}`} />
              <span className="text-muted-foreground">Kelembapan Saat Ini</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl">{soilMoisture.toFixed(1)}</span>
              <span className="text-muted-foreground">%</span>
            </div>
          </div>

          {/* Status Indicator with Icon */}
          <div className="flex items-start gap-3 p-4 glass-card dark:glass-card-dark rounded-lg">
            <StatusIcon className={`w-5 h-5 ${colorTheme.text} flex-shrink-0 mt-0.5`} />
            <div className="flex-1 min-w-0">
              <p className={colorTheme.text}>{status.action}</p>
              <p className="text-sm text-muted-foreground mt-1">{selectedPlant.description}</p>
            </div>
          </div>

          {/* Threshold Ranges */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Fase: {selectedPlant.phase}</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 glass-card dark:glass-card-dark rounded">
                <p className="text-muted-foreground">Waspada</p>
                <p className="text-red-600 dark:text-red-400">{selectedPlant.waspada.percentage}</p>
              </div>
              <div className="p-2 glass-card dark:glass-card-dark rounded">
                <p className="text-muted-foreground">Sirami</p>
                <p className="text-yellow-600 dark:text-yellow-400">{selectedPlant.sirami.percentage}</p>
              </div>
              <div className="p-2 glass-card dark:glass-card-dark rounded">
                <p className="text-muted-foreground">Ideal</p>
                <p className="text-green-600 dark:text-green-400">{selectedPlant.ideal.percentage}</p>
              </div>
              <div className="p-2 glass-card dark:glass-card-dark rounded">
                <p className="text-muted-foreground">Stop</p>
                <p className="text-blue-600 dark:text-blue-400">{selectedPlant.stop.percentage}</p>
              </div>
            </div>
          </div>

          {/* Visual Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Kering</span>
              <span>Ideal</span>
              <span>Basah</span>
            </div>
            <div className="relative h-3 bg-white/10 dark:bg-black/20 rounded-full overflow-hidden">
              {/* Background gradient zones */}
              <div className="absolute inset-0 flex">
                <div className="flex-1 bg-gradient-to-r from-red-500/30 to-yellow-500/30"></div>
                <div className="flex-1 bg-gradient-to-r from-yellow-500/30 to-green-500/30"></div>
                <div className="flex-1 bg-gradient-to-r from-green-500/30 to-blue-500/30"></div>
              </div>
              
              {/* Current position indicator */}
              <motion.div
                className={`absolute top-0 bottom-0 w-1 ${colorTheme.bg} bg-gradient-to-b shadow-lg`}
                initial={{ left: '0%' }}
                animate={{ left: `${Math.min(100, Math.max(0, soilMoisture))}%` }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-lg"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}