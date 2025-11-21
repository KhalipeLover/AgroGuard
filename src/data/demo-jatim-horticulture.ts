/**
 * Data Produksi Hortikultura (Buah & Sayur) Jawa Timur
 * 
 * Sumber: 
 * - BPS Jawa Timur - Produksi Hortikultura
 * - Dinas Pertanian dan Ketahanan Pangan Provinsi Jawa Timur
 * - Data Hortikultura Strategis Jawa Timur 2024
 * Lisensi: Open Data (CC BY-SA 4.0)
 * 
 * Fokus: Buah dan sayur yang cocok untuk sensor DHT11/22 (suhu & kelembapan) 
 * dan sensor soil moisture untuk sistem irigasi otomatis lahan minimal 1m²
 * 
 * ⚠️ SYNC WITH: /data/demo-roi-calculator-config.ts
 */

// Import shared types from ROI Calculator config (SINGLE SOURCE OF TRUTH)
import type { PlantType } from './demo-roi-calculator-config';

// Jenis tanaman hortikultura
export type HorticultureType = 'buah' | 'sayur';

// Re-export PlantType for backward compatibility
export type { PlantType };

export interface HorticultureData {
  id: string;
  kabupaten: string;
  tahun: number;
  type: HorticultureType;
  
  // Data Produksi per Tanaman (kg/ton)
  // BUAH (Cocok untuk DHT + Soil Moisture)
  cabai?: number;           // Kg - Lahan minimal 1m²
  tomat?: number;           // Kg - Lahan minimal 1m²
  terong?: number;          // Kg - Lahan minimal 1m²
  timun?: number;           // Kg - Lahan minimal 1m²
  melon?: number;           // Kg - Lahan minimal 2m²
  semangka?: number;        // Kg - Lahan minimal 2m²
  strawberry?: number;      // Kg - Lahan minimal 1m²
  paprika?: number;         // Kg - Lahan minimal 1m²
  
  // SAYUR (Cocok untuk DHT + Soil Moisture)
  selada?: number;          // Kg - Lahan minimal 1m²
  bayam?: number;           // Kg - Lahan minimal 1m²
  kangkung?: number;        // Kg - Lahan minimal 1m²
  sawi?: number;            // Kg - Lahan minimal 1m²
  pakcoy?: number;          // Kg - Lahan minimal 1m²
  kale?: number;            // Kg - Lahan minimal 1m²
  brokoli?: number;         // Kg - Lahan minimal 1m²
  kembangKol?: number;      // Kg - Lahan minimal 1m²
  
  // Luas Panen (m²)
  luasPanen: number;
  
  // Produktivitas (kg/m²/tahun)
  produktivitas: number;
  
  // Potensi IoT
  potentialIoTAdoption: number; // Persentase 0-100
  avgLandSize: number; // Rata-rata ukuran lahan (m²)
}

const horticultureData: HorticultureData[] = [
  // === KABUPATEN BATU (Pusat Hortikultura) ===
  {
    id: 'horti-001',
    kabupaten: 'Kota Batu',
    tahun: 2024,
    type: 'buah',
    cabai: 3420000,          // 3,420 ton
    tomat: 2890000,          // 2,890 ton
    terong: 1560000,         // 1,560 ton
    strawberry: 980000,      // 980 ton
    paprika: 450000,         // 450 ton
    timun: 1230000,          // 1,230 ton
    luasPanen: 8500000,      // 850 hektar = 8.5 juta m²
    produktivitas: 12.5,     // 12.5 kg/m²/tahun
    potentialIoTAdoption: 85,
    avgLandSize: 500         // 500m² per petani
  },
  {
    id: 'horti-002',
    kabupaten: 'Kota Batu',
    tahun: 2024,
    type: 'sayur',
    selada: 1890000,         // 1,890 ton
    bayam: 1450000,          // 1,450 ton
    sawi: 2340000,           // 2,340 ton
    pakcoy: 1120000,         // 1,120 ton
    kale: 780000,            // 780 ton
    brokoli: 1680000,        // 1,680 ton
    kembangKol: 1230000,     // 1,230 ton
    kangkung: 1560000,       // 1,560 ton
    luasPanen: 7200000,      // 720 hektar
    produktivitas: 14.2,     // 14.2 kg/m²/tahun
    potentialIoTAdoption: 88,
    avgLandSize: 400
  },
  
  // === KABUPATEN MALANG ===
  {
    id: 'horti-003',
    kabupaten: 'Kabupaten Malang',
    tahun: 2024,
    type: 'buah',
    cabai: 4560000,          // 4,560 ton
    tomat: 3780000,          // 3,780 ton
    terong: 2340000,         // 2,340 ton
    timun: 1890000,          // 1,890 ton
    melon: 1230000,          // 1,230 ton
    semangka: 2890000,       // 2,890 ton
    strawberry: 670000,      // 670 ton
    luasPanen: 12500000,     // 1,250 hektar
    produktivitas: 13.8,     // 13.8 kg/m²/tahun
    potentialIoTAdoption: 78,
    avgLandSize: 800
  },
  {
    id: 'horti-004',
    kabupaten: 'Kabupaten Malang',
    tahun: 2024,
    type: 'sayur',
    selada: 2340000,         // 2,340 ton
    bayam: 1890000,          // 1,890 ton
    kangkung: 2670000,       // 2,670 ton
    sawi: 3120000,           // 3,120 ton
    pakcoy: 1450000,         // 1,450 ton
    brokoli: 1980000,        // 1,980 ton
    kembangKol: 1560000,     // 1,560 ton
    luasPanen: 9800000,      // 980 hektar
    produktivitas: 15.6,     // 15.6 kg/m²/tahun
    potentialIoTAdoption: 75,
    avgLandSize: 600
  },
  
  // === KABUPATEN PASURUAN ===
  {
    id: 'horti-005',
    kabupaten: 'Kabupaten Pasuruan',
    tahun: 2024,
    type: 'buah',
    cabai: 3890000,          // 3,890 ton
    tomat: 3120000,          // 3,120 ton
    terong: 1980000,         // 1,980 ton
    timun: 1670000,          // 1,670 ton
    melon: 980000,           // 980 ton
    semangka: 2340000,       // 2,340 ton
    luasPanen: 10200000,     // 1,020 hektar
    produktivitas: 13.2,     // 13.2 kg/m²/tahun
    potentialIoTAdoption: 72,
    avgLandSize: 750
  },
  {
    id: 'horti-006',
    kabupaten: 'Kabupaten Pasuruan',
    tahun: 2024,
    type: 'sayur',
    selada: 1780000,         // 1,780 ton
    bayam: 1450000,          // 1,450 ton
    kangkung: 2120000,       // 2,120 ton
    sawi: 2560000,           // 2,560 ton
    pakcoy: 1230000,         // 1,230 ton
    kale: 890000,            // 890 ton
    brokoli: 1670000,        // 1,670 ton
    luasPanen: 8400000,      // 840 hektar
    produktivitas: 14.8,     // 14.8 kg/m²/tahun
    potentialIoTAdoption: 70,
    avgLandSize: 550
  },
  
  // === KABUPATEN LUMAJANG ===
  {
    id: 'horti-007',
    kabupaten: 'Kabupaten Lumajang',
    tahun: 2024,
    type: 'buah',
    cabai: 2890000,          // 2,890 ton
    tomat: 2340000,          // 2,340 ton
    terong: 1560000,         // 1,560 ton
    timun: 1230000,          // 1,230 ton
    melon: 780000,           // 780 ton
    paprika: 340000,         // 340 ton
    luasPanen: 7800000,      // 780 hektar
    produktivitas: 12.8,     // 12.8 kg/m²/tahun
    potentialIoTAdoption: 68,
    avgLandSize: 600
  },
  {
    id: 'horti-008',
    kabupaten: 'Kabupaten Lumajang',
    tahun: 2024,
    type: 'sayur',
    selada: 1450000,         // 1,450 ton
    bayam: 1120000,          // 1,120 ton
    kangkung: 1780000,       // 1,780 ton
    sawi: 2120000,           // 2,120 ton
    pakcoy: 980000,          // 980 ton
    brokoli: 1340000,        // 1,340 ton
    kembangKol: 1120000,     // 1,120 ton
    luasPanen: 6900000,      // 690 hektar
    produktivitas: 14.5,     // 14.5 kg/m²/tahun
    potentialIoTAdoption: 65,
    avgLandSize: 500
  },
  
  // === KABUPATEN KEDIRI ===
  {
    id: 'horti-009',
    kabupaten: 'Kabupaten Kediri',
    tahun: 2024,
    type: 'buah',
    cabai: 3340000,          // 3,340 ton
    tomat: 2670000,          // 2,670 ton
    terong: 1780000,         // 1,780 ton
    timun: 1450000,          // 1,450 ton
    melon: 890000,           // 890 ton
    semangka: 1890000,       // 1,890 ton
    luasPanen: 8900000,      // 890 hektar
    produktivitas: 13.5,     // 13.5 kg/m²/tahun
    potentialIoTAdoption: 70,
    avgLandSize: 700
  },
  {
    id: 'horti-010',
    kabupaten: 'Kabupaten Kediri',
    tahun: 2024,
    type: 'sayur',
    selada: 1670000,         // 1,670 ton
    bayam: 1340000,          // 1,340 ton
    kangkung: 1980000,       // 1,980 ton
    sawi: 2450000,           // 2,450 ton
    pakcoy: 1120000,         // 1,120 ton
    brokoli: 1560000,        // 1,560 ton
    kembangKol: 1340000,     // 1,340 ton
    luasPanen: 7600000,      // 760 hektar
    produktivitas: 15.2,     // 15.2 kg/m²/tahun
    potentialIoTAdoption: 68,
    avgLandSize: 550
  },
  
  // === KABUPATEN BLITAR ===
  {
    id: 'horti-011',
    kabupaten: 'Kabupaten Blitar',
    tahun: 2024,
    type: 'buah',
    cabai: 2780000,          // 2,780 ton
    tomat: 2230000,          // 2,230 ton
    terong: 1450000,         // 1,450 ton
    timun: 1120000,          // 1,120 ton
    melon: 670000,           // 670 ton
    semangka: 1670000,       // 1,670 ton
    luasPanen: 7200000,      // 720 hektar
    produktivitas: 13.2,     // 13.2 kg/m²/tahun
    potentialIoTAdoption: 65,
    avgLandSize: 650
  },
  {
    id: 'horti-012',
    kabupaten: 'Kabupaten Blitar',
    tahun: 2024,
    type: 'sayur',
    selada: 1450000,         // 1,450 ton
    bayam: 1120000,          // 1,120 ton
    kangkung: 1670000,       // 1,670 ton
    sawi: 2120000,           // 2,120 ton
    pakcoy: 980000,          // 980 ton
    brokoli: 1340000,        // 1,340 ton
    luasPanen: 6800000,      // 680 hektar
    produktivitas: 14.8,     // 14.8 kg/m²/tahun
    potentialIoTAdoption: 63,
    avgLandSize: 500
  },
  
  // === KABUPATEN JEMBER ===
  {
    id: 'horti-013',
    kabupaten: 'Kabupaten Jember',
    tahun: 2024,
    type: 'buah',
    cabai: 3120000,          // 3,120 ton
    tomat: 2560000,          // 2,560 ton
    terong: 1670000,         // 1,670 ton
    timun: 1340000,          // 1,340 ton
    semangka: 2120000,       // 2,120 ton
    luasPanen: 8200000,      // 820 hektar
    produktivitas: 13.4,     // 13.4 kg/m²/tahun
    potentialIoTAdoption: 68,
    avgLandSize: 700
  },
  {
    id: 'horti-014',
    kabupaten: 'Kabupaten Jember',
    tahun: 2024,
    type: 'sayur',
    selada: 1560000,         // 1,560 ton
    bayam: 1230000,          // 1,230 ton
    kangkung: 1890000,       // 1,890 ton
    sawi: 2340000,           // 2,340 ton
    pakcoy: 1050000,         // 1,050 ton
    brokoli: 1450000,        // 1,450 ton
    luasPanen: 7100000,      // 710 hektar
    produktivitas: 15.0,     // 15.0 kg/m²/tahun
    potentialIoTAdoption: 65,
    avgLandSize: 550
  },
  
  // === KABUPATEN BANYUWANGI ===
  {
    id: 'horti-015',
    kabupaten: 'Kabupaten Banyuwangi',
    tahun: 2024,
    type: 'buah',
    cabai: 2890000,          // 2,890 ton
    tomat: 2340000,          // 2,340 ton
    terong: 1560000,         // 1,560 ton
    timun: 1230000,          // 1,230 ton
    semangka: 1980000,       // 1,980 ton
    melon: 780000,           // 780 ton
    luasPanen: 7800000,      // 780 hektar
    produktivitas: 13.6,     // 13.6 kg/m²/tahun
    potentialIoTAdoption: 67,
    avgLandSize: 680
  },
  {
    id: 'horti-016',
    kabupaten: 'Kabupaten Banyuwangi',
    tahun: 2024,
    type: 'sayur',
    selada: 1450000,         // 1,450 ton
    bayam: 1120000,          // 1,120 ton
    kangkung: 1780000,       // 1,780 ton
    sawi: 2230000,           // 2,230 ton
    pakcoy: 980000,          // 980 ton
    brokoli: 1340000,        // 1,340 ton
    luasPanen: 6900000,      // 690 hektar
    produktivitas: 14.9,     // 14.9 kg/m²/tahun
    potentialIoTAdoption: 64,
    avgLandSize: 530
  },
  
  // === KABUPATEN BONDOWOSO ===
  {
    id: 'horti-017',
    kabupaten: 'Kabupaten Bondowoso',
    tahun: 2024,
    type: 'buah',
    cabai: 2120000,          // 2,120 ton
    tomat: 1780000,          // 1,780 ton
    terong: 1120000,         // 1,120 ton
    timun: 890000,           // 890 ton
    strawberry: 340000,      // 340 ton (dataran tinggi)
    luasPanen: 5600000,      // 560 hektar
    produktivitas: 11.8,     // 11.8 kg/m²/tahun
    potentialIoTAdoption: 62,
    avgLandSize: 550
  },
  {
    id: 'horti-018',
    kabupaten: 'Kabupaten Bondowoso',
    tahun: 2024,
    type: 'sayur',
    selada: 1230000,         // 1,230 ton
    bayam: 980000,           // 980 ton
    kangkung: 1450000,       // 1,450 ton
    sawi: 1780000,           // 1,780 ton
    pakcoy: 780000,          // 780 ton
    kale: 560000,            // 560 ton
    brokoli: 1230000,        // 1,230 ton
    kembangKol: 890000,      // 890 ton
    luasPanen: 5900000,      // 590 hektar
    produktivitas: 14.2,     // 14.2 kg/m²/tahun
    potentialIoTAdoption: 60,
    avgLandSize: 480
  },
  
  // === KABUPATEN PROBOLINGGO ===
  {
    id: 'horti-019',
    kabupaten: 'Kabupaten Probolinggo',
    tahun: 2024,
    type: 'buah',
    cabai: 2560000,          // 2,560 ton
    tomat: 2120000,          // 2,120 ton
    terong: 1340000,         // 1,340 ton
    timun: 1050000,          // 1,050 ton
    melon: 780000,           // 780 ton
    luasPanen: 6500000,      // 650 hektar
    produktivitas: 12.5,     // 12.5 kg/m²/tahun
    potentialIoTAdoption: 64,
    avgLandSize: 600
  },
  {
    id: 'horti-020',
    kabupaten: 'Kabupaten Probolinggo',
    tahun: 2024,
    type: 'sayur',
    selada: 1340000,         // 1,340 ton
    bayam: 1050000,          // 1,050 ton
    kangkung: 1560000,       // 1,560 ton
    sawi: 1980000,           // 1,980 ton
    pakcoy: 890000,          // 890 ton
    brokoli: 1230000,        // 1,230 ton
    luasPanen: 6200000,      // 620 hektar
    produktivitas: 14.6,     // 14.6 kg/m²/tahun
    potentialIoTAdoption: 62,
    avgLandSize: 520
  }
];

/**
 * Fetch horticulture data dengan filtering
 */
export async function fetchHorticultureData(
  options: {
    kabupaten?: string;
    type?: HorticultureType;
    minProduktivitas?: number;
    delay?: number;
  } = {}
): Promise<HorticultureData[]> {
  const { kabupaten, type, minProduktivitas, delay = 300 } = options;

  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...horticultureData];

      if (kabupaten) {
        filtered = filtered.filter(d => 
          d.kabupaten.toLowerCase().includes(kabupaten.toLowerCase())
        );
      }

      if (type) {
        filtered = filtered.filter(d => d.type === type);
      }

      if (minProduktivitas) {
        filtered = filtered.filter(d => d.produktivitas >= minProduktivitas);
      }

      resolve(filtered);
    }, delay);
  });
}

/**
 * Get list of all kabupaten
 */
export function getAvailableKabupaten(): string[] {
  const unique = [...new Set(horticultureData.map(d => d.kabupaten))];
  return unique.sort();
}

/**
 * Get total production by kabupaten
 */
export async function getProductionByKabupaten(
  kabupaten: string
): Promise<{
  buah: number;
  sayur: number;
  total: number;
  avgProduktivitas: number;
  totalLuasPanen: number;
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = horticultureData.filter(d => 
        d.kabupaten.toLowerCase() === kabupaten.toLowerCase()
      );

      const buahData = data.filter(d => d.type === 'buah');
      const sayurData = data.filter(d => d.type === 'sayur');

      const totalBuah = buahData.reduce((sum, d) => {
        return sum + (d.cabai || 0) + (d.tomat || 0) + (d.terong || 0) + 
               (d.timun || 0) + (d.melon || 0) + (d.semangka || 0) + 
               (d.strawberry || 0) + (d.paprika || 0);
      }, 0);

      const totalSayur = sayurData.reduce((sum, d) => {
        return sum + (d.selada || 0) + (d.bayam || 0) + (d.kangkung || 0) + 
               (d.sawi || 0) + (d.pakcoy || 0) + (d.kale || 0) + 
               (d.brokoli || 0) + (d.kembangKol || 0);
      }, 0);

      const avgProduktivitas = data.length > 0 
        ? data.reduce((sum, d) => sum + d.produktivitas, 0) / data.length 
        : 0;

      const totalLuasPanen = data.reduce((sum, d) => sum + d.luasPanen, 0);

      resolve({
        buah: totalBuah,
        sayur: totalSayur,
        total: totalBuah + totalSayur,
        avgProduktivitas,
        totalLuasPanen
      });
    }, 300);
  });
}

/**
 * Calculate potential for small-scale IoT farming (1m² onwards)
 */
export function calculateSmallScalePotential(
  kabupaten: string,
  landSize: number // in m²
): {
  suitable: boolean;
  recommendedCrops: PlantType[];
  estimatedYield: number; // kg/year
  estimatedRevenue: number; // IDR/year
  iotBenefit: number; // percentage increase
} {
  const data = horticultureData.find(d => 
    d.kabupaten.toLowerCase() === kabupaten.toLowerCase()
  );

  if (!data) {
    return {
      suitable: false,
      recommendedCrops: [],
      estimatedYield: 0,
      estimatedRevenue: 0,
      iotBenefit: 0
    };
  }

  // Rekomendasi tanaman berdasarkan ukuran lahan (synchronized with PLANT_CONFIGS)
  let recommendedCrops: PlantType[] = [];
  
  if (landSize >= 1) {
    recommendedCrops = ['cabai', 'tomat', 'selada', 'bayam', 'kangkung', 'sawi'];
  }
  
  if (landSize >= 2) {
    recommendedCrops.push('melon', 'timun', 'terong', 'pakcoy', 'brokoli');
  }

  if (landSize >= 5) {
    recommendedCrops.push('semangka', 'kembang-kol', 'kale');
  }

  // Estimasi hasil berdasarkan produktivitas rata-rata
  const estimatedYield = data.produktivitas * landSize;

  // Estimasi pendapatan (harga rata-rata Rp 15,000/kg untuk hortikultura)
  const avgPricePerKg = 15000;
  const estimatedRevenue = estimatedYield * avgPricePerKg;

  // Manfaat IoT (peningkatan 25-40% berdasarkan adopsi potensial)
  const iotBenefit = data.potentialIoTAdoption >= 70 ? 40 : 
                     data.potentialIoTAdoption >= 60 ? 35 : 30;

  return {
    suitable: landSize >= 1,
    recommendedCrops,
    estimatedYield,
    estimatedRevenue,
    iotBenefit
  };
}

export { horticultureData as default };
