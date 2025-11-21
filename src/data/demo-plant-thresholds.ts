/**
 * Plant Moisture Thresholds Data
 * 
 * Threshold data untuk kelembapan tanah berbasis jenis tanaman
 * Menggunakan satuan volumetric water content (m³/m³) dan persentase
 */

export interface PlantThreshold {
  id: string;
  name: string;                    // Nama tanaman
  phase: string;                   // Fase tanam dominan
  waspada: {                       // Ambang "Waspada (Kering)"
    m3: string;                    // Nilai m³/m³
    percentage: string;            // Persentase
  };
  sirami: {                        // Ambang "Sirami Sekarang"
    m3: string;
    percentage: string;
  };
  ideal: {                         // Ambang "Cukup / Ideal"
    m3: string;
    percentage: string;
  };
  stop: {                          // Ambang "Stop / Terlalu Basah"
    m3: string;
    percentage: string;
  };
  idealMin: number;                // Nilai min ideal (untuk progress bar)
  idealMax: number;                // Nilai max ideal (untuk progress bar)
  description: string;             // Keterangan singkat
  icon: string;                    // Icon name (Lucide)
  color: string;                   // Color theme
}

const plantThresholdsData: PlantThreshold[] = [
  {
    id: 'cabe-rawit',
    name: 'Cabe Rawit',
    phase: 'Vegetatif – Generatif',
    waspada: {
      m3: '< 0.25 m³/m³',
      percentage: '≈50%'
    },
    sirami: {
      m3: '0.25–0.30 m³/m³',
      percentage: '≈50–60%'
    },
    ideal: {
      m3: '0.30–0.40 m³/m³',
      percentage: '≈60–80%'
    },
    stop: {
      m3: '> 0.45 m³/m³',
      percentage: '≥85%'
    },
    idealMin: 60,
    idealMax: 80,
    description: 'Jaga stabil, hindari fluktuasi; irigasi tetes disarankan',
    icon: 'Flame',
    color: 'red'
  },
  {
    id: 'tomat',
    name: 'Tomat',
    phase: 'Pembentukan buah',
    waspada: {
      m3: '< 0.25 m³/m³',
      percentage: '≤50%'
    },
    sirami: {
      m3: '0.28 m³/m³',
      percentage: '≈55–60%'
    },
    ideal: {
      m3: '0.32–0.40 m³/m³',
      percentage: '≈65–80%'
    },
    stop: {
      m3: '> 0.45 m³/m³',
      percentage: '≥85%'
    },
    idealMin: 65,
    idealMax: 80,
    description: 'Jangan biarkan kering mendadak, mencegah pecah buah',
    icon: 'Apple',
    color: 'red'
  },
  {
    id: 'bawang-merah',
    name: 'Bawang Merah',
    phase: 'Pembesaran umbi',
    waspada: {
      m3: '< 0.23 m³/m³',
      percentage: '≤45%'
    },
    sirami: {
      m3: '0.25–0.28 m³/m³',
      percentage: '≈50–60%'
    },
    ideal: {
      m3: '0.30–0.38 m³/m³',
      percentage: '≈60–75%'
    },
    stop: {
      m3: '> 0.42 m³/m³',
      percentage: '≥80%'
    },
    idealMin: 60,
    idealMax: 75,
    description: 'Sangat sensitif terhadap genangan, perlu drainase baik',
    icon: 'Leaf',
    color: 'purple'
  },
  {
    id: 'melon',
    name: 'Melon',
    phase: 'Pembungaan – Buah',
    waspada: {
      m3: '< 0.22 m³/m³',
      percentage: '≤45%'
    },
    sirami: {
      m3: '0.25–0.30 m³/m³',
      percentage: '≈50–60%'
    },
    ideal: {
      m3: '0.32–0.38 m³/m³',
      percentage: '≈65–75%'
    },
    stop: {
      m3: '> 0.40 m³/m³',
      percentage: '≥80%'
    },
    idealMin: 65,
    idealMax: 75,
    description: 'Hindari kelembapan tinggi; cukup lembap tapi keringkan menjelang panen',
    icon: 'Cherry',
    color: 'green'
  },
  {
    id: 'semangka',
    name: 'Semangka',
    phase: 'Vegetatif – Pembesaran buah',
    waspada: {
      m3: '< 0.22 m³/m³',
      percentage: '≤45%'
    },
    sirami: {
      m3: '0.25 m³/m³',
      percentage: '≈50–55%'
    },
    ideal: {
      m3: '0.30–0.37 m³/m³',
      percentage: '≈60–75%'
    },
    stop: {
      m3: '> 0.40 m³/m³',
      percentage: '≥80%'
    },
    idealMin: 60,
    idealMax: 75,
    description: 'Perlu drainase baik, genangan menyebabkan busuk akar',
    icon: 'Citrus',
    color: 'green'
  }
];

/**
 * Get moisture status based on current soil moisture and plant thresholds
 */
export function getMoistureStatus(
  soilMoisture: number, 
  plant: PlantThreshold
): {
  status: 'waspada' | 'sirami' | 'ideal' | 'stop';
  message: string;
  color: string;
  action: string;
} {
  // Convert percentage to match threshold ranges
  if (soilMoisture < 50) {
    return {
      status: 'waspada',
      message: 'Tanah Kering',
      color: 'red',
      action: 'Perlu perhatian segera'
    };
  } else if (soilMoisture >= 50 && soilMoisture < plant.idealMin) {
    return {
      status: 'sirami',
      message: 'Perlu Penyiraman',
      color: 'yellow',
      action: 'Siram sekarang'
    };
  } else if (soilMoisture >= plant.idealMin && soilMoisture <= plant.idealMax) {
    return {
      status: 'ideal',
      message: 'Kondisi Ideal',
      color: 'green',
      action: 'Pertahankan kondisi'
    };
  } else {
    return {
      status: 'stop',
      message: 'Terlalu Basah',
      color: 'blue',
      action: 'Hentikan penyiraman'
    };
  }
}

/**
 * Fetch plant thresholds (async pattern)
 */
export async function fetchPlantThresholds(delay: number = 300): Promise<PlantThreshold[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...plantThresholdsData]), delay);
  });
}

/**
 * Get specific plant threshold by ID
 */
export async function fetchPlantThresholdById(
  id: string, 
  delay: number = 200
): Promise<PlantThreshold | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(plantThresholdsData.find(p => p.id === id));
    }, delay);
  });
}

/**
 * Get plant recommendation based on current soil moisture
 */
export function getPlantRecommendation(soilMoisture: number): PlantThreshold[] {
  return plantThresholdsData.filter(plant => {
    return soilMoisture >= plant.idealMin && soilMoisture <= plant.idealMax;
  });
}

export { plantThresholdsData as default };
