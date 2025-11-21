/**
 * AGROGUARD IoT Device Pricing & Recommendation System
 * Sistem perhitungan rekomendasi device berdasarkan luas lahan
 * 
 * UPDATE: Support untuk lahan minimal 1m² (Urban farming & micro-scale)
 * Fokus: Hortikultura (buah & sayur) dengan sensor DHT + Soil Moisture
 */

export interface DevicePackage {
  id: string;
  name: string;
  description: string;
  maxDevices: number;
  monthlyPrice: number; // Rupiah
  features: string[];
  recommended: boolean;
}

export interface DeviceRecommendation {
  luasLahan: number; // meter persegi
  luasLahanDisplay: string; // formatted display
  jumlahDevice: number;
  reasoning: string;
  coverage: string;
  // Hardware costs
  hardwareCostPerDevice: number;
  installationCostPerDevice: number;
  totalDeviceCost: number;
  // Subscription
  recommendedPackage: DevicePackage;
  monthlySubscription: number;
  yearlySubscription: number;
  // Sensors included
  sensorsIncluded: {
    name: string;
    quantity: number;
    description: string;
  }[];
  // Total investment
  initialInvestment: number; // Hardware + Installation
  firstYearCost: number; // Initial + 12 months subscription
  // ROI info
  breakEvenMonths: number;
  estimatedSavingsPerYear: number;
  // Hortikultura specific
  recommendedCrops: string[];
  estimatedYieldPerYear: number; // kg
  estimatedRevenuePerYear: number; // Rp
}

// Device Packages (Updated untuk micro-scale)
export const devicePackages: DevicePackage[] = [
  {
    id: 'free',
    name: 'Free (Trial)',
    description: 'Cocok untuk trial dan lahan mikro (1-10m²)',
    maxDevices: 1,
    monthlyPrice: 0,
    features: [
      '1 IoT Device',
      'Real-time monitoring',
      'Basic alerts via app',
      'Data storage 30 hari',
      'Mobile app access',
      '2 sensor points'
    ],
    recommended: false
  },
  {
    id: 'hobby',
    name: 'Hobby Farmer',
    description: 'Untuk urban farming & lahan kecil (10-100m²)',
    maxDevices: 3,
    monthlyPrice: 75000, // Rp 75k/bulan
    features: [
      'Up to 3 IoT Devices',
      'Real-time monitoring',
      'Smart alerts & notifications',
      'Data storage unlimited',
      'Mobile & web app',
      'Automation rules',
      'WhatsApp notifications',
      'Email support'
    ],
    recommended: true
  },
  {
    id: 'starter',
    name: 'Starter',
    description: 'Untuk petani individual (100-5000m²)',
    maxDevices: 10,
    monthlyPrice: 150000, // Rp 150k/bulan
    features: [
      'Up to 10 IoT Devices',
      'Advanced analytics',
      'AI-powered recommendations',
      'Automation rules',
      'Data export (CSV/Excel)',
      'Weather integration',
      'Priority support 24/7',
      'Multi-user access (3 users)'
    ],
    recommended: false
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Untuk komunitas dan lahan sedang (0.5-2 hektar)',
    maxDevices: 30,
    monthlyPrice: 450000, // Rp 450k/bulan
    features: [
      'Up to 30 IoT Devices',
      'Full AI automation',
      'Advanced analytics & reports',
      'Custom automation',
      'API access',
      'Inventory management',
      'Multi-location support',
      'Dedicated account manager',
      'Priority support 24/7',
      'Multi-user access (10 users)'
    ],
    recommended: false
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Untuk agribisnis besar (> 2 hektar)',
    maxDevices: 999,
    monthlyPrice: 0, // Custom pricing
    features: [
      'Unlimited IoT Devices',
      'Full AI automation',
      'Custom integrations',
      'Dedicated account manager',
      'On-site training',
      'Custom SLA',
      'White-label option',
      'Advanced security',
      'Custom features'
    ],
    recommended: false
  }
];

// Pricing constants (Updated untuk hortikultura micro-scale)
export const PRICING = {
  // Hardware costs (lebih terjangkau untuk micro-scale)
  hardwareCostPerDevice: 1500000, // Rp 1.5 juta per device (DHT22 + Soil Moisture)
  installationCostPerDevice: 300000, // Rp 300 ribu per device
  totalCostPerDevice: 1800000, // Rp 1.8 juta per device (all-in)
  
  // Coverage per device (untuk hortikultura)
  coveragePerDeviceMin: 10, // minimal 10m² per device
  coveragePerDeviceMax: 100, // maksimal 100m² per device
  coveragePerDeviceOptimal: 50, // optimal 50m² per device
  
  // Average savings with AGROGUARD IoT (hortikultura)
  waterSavingsPercentage: 50, // 50% water savings (drip irrigation)
  fertilizerSavingsPercentage: 35, // 35% fertilizer savings
  yieldIncreasePercentage: 35, // 35% yield increase
  laborSavingsPercentage: 40, // 40% labor savings
  
  // Average costs per m² per year (traditional hortikultura farming)
  avgWaterCostPerM2: 500, // Rp 500/m²/tahun
  avgFertilizerCostPerM2: 800, // Rp 800/m²/tahun
  avgLaborCostPerM2: 1200, // Rp 1,200/m²/tahun
  avgOtherCostPerM2: 400, // Rp 400/m²/tahun
  
  // Hortikultura productivity (kg/m²/year)
  avgProductivityCabai: 8, // 8 kg/m²/tahun
  avgProductivityTomat: 12, // 12 kg/m²/tahun
  avgProductivitySelada: 15, // 15 kg/m²/tahun
  avgProductivitySayur: 14, // 14 kg/m²/tahun (rata-rata)
  avgProductivityBuah: 10, // 10 kg/m²/tahun (rata-rata)
  
  // Average selling price
  avgPricePerKgHortikultura: 15000, // Rp 15,000/kg
};

/**
 * Calculate device recommendation based on land area (in m²)
 */
export function calculateDeviceRecommendation(
  luasLahan: number, // dalam meter persegi
  jenisTanaman?: 'buah' | 'sayur'
): DeviceRecommendation {
  // Device calculation logic
  let jumlahDevice: number;
  let reasoning: string;
  let coverage: string;
  let luasLahanDisplay: string;
  
  if (luasLahan < 1) {
    throw new Error('Luas lahan minimal 1m²');
  }
  
  // Format display luas lahan
  if (luasLahan < 10000) {
    luasLahanDisplay = `${luasLahan.toFixed(1)} m²`;
  } else {
    const hektar = luasLahan / 10000;
    luasLahanDisplay = `${hektar.toFixed(2)} hektar (${luasLahan.toFixed(0)} m²)`;
  }
  
  // Calculate number of devices based on land size
  if (luasLahan < 10) {
    // 1-10m² - Micro garden (1 pot - beberapa pot)
    jumlahDevice = 1;
    reasoning = '1 device optimal untuk micro garden dengan monitoring lengkap';
    coverage = `100% coverage untuk ${luasLahanDisplay}`;
  } else if (luasLahan <= 50) {
    // 10-50m² - Small urban farm (bedengan kecil)
    jumlahDevice = 1;
    reasoning = '1 device mencakup seluruh area dengan coverage optimal';
    coverage = `Coverage penuh untuk ${luasLahanDisplay} dengan 2 sensor points`;
  } else if (luasLahan <= 200) {
    // 50-200m² - Medium urban farm (beberapa bedengan)
    jumlahDevice = Math.ceil(luasLahan / PRICING.coveragePerDeviceOptimal);
    reasoning = `${jumlahDevice} devices dengan coverage ${PRICING.coveragePerDeviceOptimal}m² per device`;
    coverage = `100% coverage dari ${luasLahanDisplay} dengan ${jumlahDevice} sensor zones`;
  } else if (luasLahan <= 5000) {
    // 200-5000m² - Small commercial farm
    jumlahDevice = Math.ceil(luasLahan / PRICING.coveragePerDeviceMax);
    reasoning = `${jumlahDevice} devices dengan coverage ${PRICING.coveragePerDeviceMax}m² per device`;
    coverage = `Optimal coverage dari ${luasLahanDisplay} dengan strategic placement`;
  } else if (luasLahan <= 20000) {
    // 0.5-2 hektar - Medium commercial
    jumlahDevice = Math.ceil(luasLahan / 150); // 1 device per 150m²
    reasoning = `${jumlahDevice} devices untuk coverage optimal lahan komersial`;
    coverage = `Coverage profesional dari ${luasLahanDisplay}`;
  } else {
    // > 2 hektar - Large scale
    jumlahDevice = Math.ceil(luasLahan / 200); // 1 device per 200m²
    reasoning = `${jumlahDevice} devices untuk monitoring skala besar`;
    coverage = `Enterprise coverage dari ${luasLahanDisplay}`;
  }
  
  // Select appropriate package
  let recommendedPackage: DevicePackage;
  if (jumlahDevice === 1 && luasLahan < 10) {
    recommendedPackage = devicePackages[0]; // Free (Trial)
  } else if (jumlahDevice <= 3) {
    recommendedPackage = devicePackages[1]; // Hobby Farmer
  } else if (jumlahDevice <= 10) {
    recommendedPackage = devicePackages[2]; // Starter
  } else if (jumlahDevice <= 30) {
    recommendedPackage = devicePackages[3]; // Professional
  } else {
    recommendedPackage = devicePackages[4]; // Enterprise
  }
  
  // Calculate costs
  const totalDeviceCost = jumlahDevice * PRICING.totalCostPerDevice;
  const monthlySubscription = recommendedPackage.monthlyPrice;
  const yearlySubscription = monthlySubscription * 12;
  const initialInvestment = totalDeviceCost;
  const firstYearCost = initialInvestment + yearlySubscription;
  
  // Calculate savings
  const waterSavings = luasLahan * PRICING.avgWaterCostPerM2 * (PRICING.waterSavingsPercentage / 100);
  const fertilizerSavings = luasLahan * PRICING.avgFertilizerCostPerM2 * (PRICING.fertilizerSavingsPercentage / 100);
  const laborSavings = luasLahan * PRICING.avgLaborCostPerM2 * (PRICING.laborSavingsPercentage / 100);
  const estimatedSavingsPerYear = waterSavings + fertilizerSavings + laborSavings;
  
  // Calculate estimated yield and revenue
  let estimatedYieldPerYear: number;
  let recommendedCrops: string[];
  
  if (jenisTanaman === 'buah') {
    estimatedYieldPerYear = luasLahan * PRICING.avgProductivityBuah;
    recommendedCrops = ['Cabai', 'Tomat', 'Terong', 'Timun', 'Paprika'];
  } else if (jenisTanaman === 'sayur') {
    estimatedYieldPerYear = luasLahan * PRICING.avgProductivitySayur;
    recommendedCrops = ['Selada', 'Bayam', 'Kangkung', 'Sawi', 'Pakcoy', 'Kale'];
  } else {
    // Mixed (default)
    const avgProductivity = (PRICING.avgProductivityBuah + PRICING.avgProductivitySayur) / 2;
    estimatedYieldPerYear = luasLahan * avgProductivity;
    recommendedCrops = ['Cabai', 'Tomat', 'Selada', 'Sawi', 'Bayam'];
  }
  
  // Apply IoT yield increase
  estimatedYieldPerYear = estimatedYieldPerYear * (1 + PRICING.yieldIncreasePercentage / 100);
  
  // Calculate revenue
  const estimatedRevenuePerYear = estimatedYieldPerYear * PRICING.avgPricePerKgHortikultura;
  
  // Break even calculation (total savings + additional revenue from yield increase)
  const additionalRevenue = luasLahan * 
    ((jenisTanaman === 'buah' ? PRICING.avgProductivityBuah : PRICING.avgProductivitySayur) || 12) * 
    (PRICING.yieldIncreasePercentage / 100) * 
    PRICING.avgPricePerKgHortikultura;
  
  const totalBenefitPerYear = estimatedSavingsPerYear + additionalRevenue;
  const breakEvenMonths = totalBenefitPerYear > 0 
    ? Math.ceil((initialInvestment) / (totalBenefitPerYear / 12))
    : 36;
  
  // Sensors included per device
  const sensorsIncluded = [
    {
      name: 'DHT22 Sensor',
      quantity: jumlahDevice,
      description: 'Temperature & Humidity monitoring (±0.5°C accuracy)'
    },
    {
      name: 'Capacitive Soil Moisture Sensor',
      quantity: jumlahDevice * 2, // 2 sensors per device
      description: 'Soil moisture sensor (0-100% range, corrosion resistant)'
    },
    {
      name: 'ESP32 IoT Controller',
      quantity: jumlahDevice,
      description: 'WiFi-enabled microcontroller with cloud connectivity'
    },
    {
      name: 'Solenoid Valve (Optional)',
      quantity: jumlahDevice,
      description: 'Automated irrigation control (12V DC)'
    },
    {
      name: 'Power Supply',
      quantity: jumlahDevice,
      description: '5V/2A adapter or solar panel option'
    },
    {
      name: 'Weatherproof Enclosure',
      quantity: jumlahDevice,
      description: 'IP65 rated weatherproof enclosure'
    }
  ];
  
  return {
    luasLahan,
    luasLahanDisplay,
    jumlahDevice,
    reasoning,
    coverage,
    hardwareCostPerDevice: PRICING.hardwareCostPerDevice,
    installationCostPerDevice: PRICING.installationCostPerDevice,
    totalDeviceCost,
    recommendedPackage,
    monthlySubscription,
    yearlySubscription,
    sensorsIncluded,
    initialInvestment,
    firstYearCost,
    breakEvenMonths,
    estimatedSavingsPerYear,
    recommendedCrops,
    estimatedYieldPerYear,
    estimatedRevenuePerYear
  };
}

/**
 * Format currency to Rupiah
 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Format land area to readable string
 */
export function formatLandArea(areaM2: number): string {
  if (areaM2 < 10000) {
    return `${areaM2.toFixed(1)} m²`;
  } else {
    const hektar = areaM2 / 10000;
    return `${hektar.toFixed(2)} hektar`;
  }
}

/**
 * Async function to simulate API call
 */
export async function fetchDeviceRecommendation(
  luasLahan: number,
  jenisTanaman?: 'buah' | 'sayur',
  delay: number = 500
): Promise<DeviceRecommendation> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const recommendation = calculateDeviceRecommendation(luasLahan, jenisTanaman);
        resolve(recommendation);
      } catch (error) {
        reject(error);
      }
    }, delay);
  });
}

export default {
  devicePackages,
  PRICING,
  calculateDeviceRecommendation,
  formatRupiah,
  formatLandArea,
  fetchDeviceRecommendation
};
