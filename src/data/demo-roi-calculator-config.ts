/**
 * ROI Calculator Configuration & Constants
 * Modular data untuk ROI Calculator - No hardcode!
 */

// Plant types yang didukung
export type PlantType = 
  | 'cabai' | 'tomat' | 'selada' | 'sawi' 
  | 'bayam' | 'kangkung' | 'terong' | 'timun' 
  | 'pakcoy' | 'brokoli' | 'kale' | 'melon' 
  | 'semangka' | 'strawberry' | 'paprika' 
  | 'kembang-kol';

// Irrigation system types
export type IrrigationSystem = 'otomatis-iot' | 'drip-manual' | 'manual';

// Plant configuration with pricing and metadata
export interface PlantConfig {
  id: PlantType;
  name: string;
  emoji: string;
  type: 'buah' | 'sayur';
  avgPricePerKg: number; // Rupiah per kg
  harvestCycle: number; // days
  minLandSize: number; // m²
  productivityPerM2: number; // kg/m²/year (baseline traditional)
  description: string;
}

// Plant configurations
export const PLANT_CONFIGS: PlantConfig[] = [
  // Buah-buahan
  {
    id: 'cabai',
    name: 'Cabai',
    emoji: '🌶️',
    type: 'buah',
    avgPricePerKg: 25000,
    harvestCycle: 90,
    minLandSize: 2,
    productivityPerM2: 8.5, // kg/m²/year baseline
    description: 'Cabai merah/rawit dengan harga jual tinggi'
  },
  {
    id: 'tomat',
    name: 'Tomat',
    emoji: '🍅',
    type: 'buah',
    avgPricePerKg: 15000,
    harvestCycle: 70,
    minLandSize: 2,
    productivityPerM2: 12.0, // kg/m²/year baseline
    description: 'Tomat lokal/cherry dengan permintaan stabil'
  },
  {
    id: 'terong',
    name: 'Terong',
    emoji: '🍆',
    type: 'buah',
    avgPricePerKg: 12000,
    harvestCycle: 60,
    minLandSize: 2,
    productivityPerM2: 10.5, // kg/m²/year baseline
    description: 'Terong ungu dengan produktivitas tinggi'
  },
  {
    id: 'timun',
    name: 'Timun',
    emoji: '🥒',
    type: 'buah',
    avgPricePerKg: 10000,
    harvestCycle: 45,
    minLandSize: 2,
    productivityPerM2: 15.0, // kg/m²/year baseline
    description: 'Timun hijau segar untuk pasar lokal'
  },
  {
    id: 'melon',
    name: 'Melon',
    emoji: '🍈',
    type: 'buah',
    avgPricePerKg: 20000,
    harvestCycle: 75,
    minLandSize: 3,
    productivityPerM2: 9.0, // kg/m²/year baseline
    description: 'Melon premium untuk pasar modern'
  },
  {
    id: 'semangka',
    name: 'Semangka',
    emoji: '🍉',
    type: 'buah',
    avgPricePerKg: 8000,
    harvestCycle: 80,
    minLandSize: 3,
    productivityPerM2: 11.0, // kg/m²/year baseline
    description: 'Semangka merah manis untuk pasar tradisional'
  },
  {
    id: 'strawberry',
    name: 'Strawberry',
    emoji: '🍓',
    type: 'buah',
    avgPricePerKg: 80000,
    harvestCycle: 60,
    minLandSize: 1,
    productivityPerM2: 6.0, // kg/m²/year baseline (dataran tinggi)
    description: 'Strawberry premium dataran tinggi'
  },
  {
    id: 'paprika',
    name: 'Paprika',
    emoji: '🥒',
    type: 'buah',
    avgPricePerKg: 35000,
    harvestCycle: 90,
    minLandSize: 2,
    productivityPerM2: 7.5, // kg/m²/year baseline
    description: 'Paprika warna-warni untuk pasar premium'
  },
  
  // Sayur-sayuran
  {
    id: 'selada',
    name: 'Selada',
    emoji: '🥬',
    type: 'sayur',
    avgPricePerKg: 18000,
    harvestCycle: 30,
    productivityPerM2: 18.0, // kg/m²/year baseline (siklus pendek)
    minLandSize: 1,
    description: 'Selada hijau/merah untuk salad & burger'
  },
  {
    id: 'bayam',
    name: 'Bayam',
    emoji: '🥬',
    type: 'sayur',
    avgPricePerKg: 11000,
    harvestCycle: 25,
    minLandSize: 1,
    productivityPerM2: 20.0, // kg/m²/year baseline (siklus sangat pendek)
    description: 'Bayam hijau/merah untuk sayur & jus'
  },
  {
    id: 'kangkung',
    name: 'Kangkung',
    emoji: '🥬',
    type: 'sayur',
    avgPricePerKg: 10000,
    harvestCycle: 20,
    minLandSize: 1,
    productivityPerM2: 22.0, // kg/m²/year baseline (tercepat!)
    description: 'Kangkung darat dengan harvest cycle super cepat'
  },
  {
    id: 'sawi',
    name: 'Sawi',
    emoji: '🥬',
    type: 'sayur',
    avgPricePerKg: 12000,
    harvestCycle: 30,
    minLandSize: 1,
    productivityPerM2: 16.0, // kg/m²/year baseline
    description: 'Sawi putih/hijau untuk berbagai masakan'
  },
  {
    id: 'pakcoy',
    name: 'Pakcoy',
    emoji: '🥬',
    type: 'sayur',
    avgPricePerKg: 14000,
    harvestCycle: 35,
    minLandSize: 1,
    productivityPerM2: 14.0, // kg/m²/year baseline
    description: 'Pakcoy untuk masakan oriental'
  },
  {
    id: 'brokoli',
    name: 'Brokoli',
    emoji: '🥦',
    type: 'sayur',
    avgPricePerKg: 22000,
    harvestCycle: 55,
    minLandSize: 2,
    productivityPerM2: 10.0, // kg/m²/year baseline
    description: 'Brokoli hijau untuk pasar premium'
  },
  {
    id: 'kale',
    name: 'Kale',
    emoji: '🥬',
    type: 'sayur',
    avgPricePerKg: 25000,
    harvestCycle: 40,
    minLandSize: 1,
    productivityPerM2: 13.0, // kg/m²/year baseline
    description: 'Kale superfood untuk health market'
  },
  {
    id: 'kembang-kol',
    name: 'Kembang Kol',
    emoji: '🥦',
    type: 'sayur',
    avgPricePerKg: 20000,
    harvestCycle: 60,
    minLandSize: 2,
    productivityPerM2: 9.0, // kg/m²/year baseline
    description: 'Kembang kol putih untuk berbagai masakan'
  }
];

// Irrigation system configurations
export interface IrrigationConfig {
  id: IrrigationSystem;
  name: string;
  emoji: string;
  description: string;
  waterSavings: number; // percentage 0-100
  efficiency: number; // percentage 0-100
  costMultiplier: number; // 1.0 = baseline
  recommended: boolean;
}

export const IRRIGATION_CONFIGS: IrrigationConfig[] = [
  {
    id: 'otomatis-iot',
    name: 'Otomatis IoT',
    emoji: '🤖',
    description: 'Sistem irigasi otomatis. Hemat air 50% & meningkatkan hasil 35%',
    waterSavings: 50,
    efficiency: 95,
    costMultiplier: 0.5,
    recommended: true
  },
  {
    id: 'drip-manual',
    name: 'Drip Manual',
    emoji: '💧',
    description: 'Sistem drip irrigation manual. Hemat air 30% tapi butuh pengawasan manual',
    waterSavings: 30,
    efficiency: 75,
    costMultiplier: 0.7,
    recommended: false
  },
  {
    id: 'manual',
    name: 'Manual Tradisional',
    emoji: '✋',
    description: 'Penyiraman manual tradisional. Berisiko overwatering/underwatering',
    waterSavings: 0,
    efficiency: 60,
    costMultiplier: 1.0,
    recommended: false
  }
];

// Cost configurations per m² per year
export const COST_CONFIG = {
  // Traditional farming costs per m² per year
  traditional: {
    waterCostPerM2: 500, // Rp 500/m²/year
    fertilizerCostPerM2: 800, // Rp 800/m²/year
    laborCostPerM2: 1200, // Rp 1,200/m²/year
    otherCostPerM2: 400, // Rp 400/m²/year
    cropFailureRate: 0.07, // 7% crop failure
  },
  
  // IoT benefits
  iot: {
    waterSavingsPercentage: 50, // 50% water savings
    fertilizerSavingsPercentage: 35, // 35% fertilizer savings
    laborSavingsPercentage: 40, // 40% labor savings
    otherSavingsPercentage: 20, // 20% other cost savings
    yieldIncreasePercentage: 35, // 35% yield increase
    cropFailureRate: 0.015, // 1.5% crop failure (reduced from 7%)
  }
};

// Land size examples for quick start
export interface LandSizeExample {
  id: string;
  name: string;
  emoji: string;
  landSize: number; // m²
  description: string;
  suggestedPlant: PlantType;
  suggestedIrrigation: IrrigationSystem;
}

export const LAND_SIZE_EXAMPLES: LandSizeExample[] = [
  {
    id: 'micro',
    name: 'Micro Garden',
    emoji: '🪴',
    landSize: 5,
    description: 'Pot/balkon urban farming',
    suggestedPlant: 'selada',
    suggestedIrrigation: 'otomatis-iot'
  },
  {
    id: 'urban',
    name: 'Urban Farming',
    emoji: '🏙️',
    landSize: 20,
    description: 'Rooftop/balkon garden',
    suggestedPlant: 'bayam',
    suggestedIrrigation: 'otomatis-iot'
  },
  {
    id: 'backyard',
    name: 'Backyard Garden',
    emoji: '🏡',
    landSize: 100,
    description: 'Pekarangan rumah untuk hobby farmer',
    suggestedPlant: 'cabai',
    suggestedIrrigation: 'otomatis-iot'
  },
  {
    id: 'small-commercial',
    name: 'Small Commercial',
    emoji: '🌾',
    landSize: 500,
    description: 'Small farm semi-komersial',
    suggestedPlant: 'tomat',
    suggestedIrrigation: 'otomatis-iot'
  },
  {
    id: 'commercial',
    name: 'Commercial Farm',
    emoji: '🚜',
    landSize: 2000,
    description: 'Medium commercial farm',
    suggestedPlant: 'cabai',
    suggestedIrrigation: 'otomatis-iot'
  }
];

// Helper functions
export function getPlantConfig(plantId: PlantType): PlantConfig | undefined {
  return PLANT_CONFIGS.find(p => p.id === plantId);
}

export function getIrrigationConfig(irrigationId: IrrigationSystem): IrrigationConfig | undefined {
  return IRRIGATION_CONFIGS.find(i => i.id === irrigationId);
}

export function getLandSizeExample(exampleId: string): LandSizeExample | undefined {
  return LAND_SIZE_EXAMPLES.find(e => e.id === exampleId);
}

// Get plants by type
export function getPlantsByType(type: 'buah' | 'sayur'): PlantConfig[] {
  return PLANT_CONFIGS.filter(p => p.type === type);
}

// Format land area helper
export function formatLandAreaDisplay(areaM2: number): string {
  if (areaM2 < 10000) {
    return `${areaM2.toFixed(areaM2 < 10 ? 1 : 0)} m²`;
  } else {
    const hektar = areaM2 / 10000;
    return `${hektar.toFixed(2)} hektar (${areaM2.toFixed(0)} m²)`;
  }
}

// Land size guidance
export const LAND_SIZE_GUIDANCE = [
  { range: '1-10m²', description: 'Pot/balkon (urban farming micro)' },
  { range: '10-50m²', description: 'Rooftop garden (hobby farmer)' },
  { range: '50-200m²', description: 'Pekarangan/backyard (semi-commercial)' },
  { range: '200-5000m²', description: 'Small farm (commercial)' },
  { range: '> 5000m²', description: 'Medium-large farm (professional)' }
];

export default {
  PLANT_CONFIGS,
  IRRIGATION_CONFIGS,
  COST_CONFIG,
  LAND_SIZE_EXAMPLES,
  LAND_SIZE_GUIDANCE,
  getPlantConfig,
  getIrrigationConfig,
  getLandSizeExample,
  getPlantsByType,
  formatLandAreaDisplay
};
