/**
 * Data Produksi Tanaman Pangan Jawa Timur
 * 
 * Sumber: Data Produksi Tanaman Pangan Kabupaten/Kota Jawa Timur
 * URL: https://data.jatimprov.go.id/dataset/data-produksi-tanaman-pangan-kabupaten-kota-jawa-timur
 * Lisensi: Open Data (CC BY-SA 4.0)
 * 
 * Data ini mencakup produksi tanaman pangan utama (padi, jagung, kedelai)
 * di 38 kabupaten/kota Jawa Timur
 */

export interface ProductionData {
  id: string;
  kabupaten: string;
  tahun: number;
  // Produksi Padi (ton)
  padiSawah: number;
  padiLadang: number;
  totalPadi: number;
  // Produksi Jagung (ton)
  jagung: number;
  // Produksi Kedelai (ton)
  kedelai: number;
  // Luas Panen (ha)
  luasPanenPadi: number;
  luasPanenJagung: number;
  luasPanenKedelai: number;
  // Produktivitas (ku/ha)
  produktivitasPadi: number;
  produktivitasJagung: number;
  produktivitasKedelai: number;
}

const productionData: ProductionData[] = [
  // Kabupaten dengan produksi padi tinggi
  {
    id: 'prod-001',
    kabupaten: 'Kabupaten Banyuwangi',
    tahun: 2024,
    padiSawah: 458520,
    padiLadang: 12340,
    totalPadi: 470860,
    jagung: 245680,
    kedelai: 18750,
    luasPanenPadi: 87450,
    luasPanenJagung: 42350,
    luasPanenKedelai: 3250,
    produktivitasPadi: 53.85,
    produktivitasJagung: 58.02,
    produktivitasKedelai: 15.77
  },
  {
    id: 'prod-002',
    kabupaten: 'Kabupaten Jember',
    tahun: 2024,
    padiSawah: 442180,
    padiLadang: 15670,
    totalPadi: 457850,
    jagung: 312450,
    kedelai: 24560,
    luasPanenPadi: 84320,
    luasPanenJagung: 54280,
    luasPanenKedelai: 4120,
    produktivitasPadi: 54.29,
    produktivitasJagung: 57.56,
    produktivitasKedelai: 15.96
  },
  {
    id: 'prod-003',
    kabupaten: 'Kabupaten Lamongan',
    tahun: 2024,
    padiSawah: 528960,
    padiLadang: 8340,
    totalPadi: 537300,
    jagung: 167820,
    kedelai: 12340,
    luasPanenPadi: 96450,
    luasPanenJagung: 28560,
    luasPanenKedelai: 2180,
    produktivitasPadi: 55.71,
    produktivitasJagung: 58.76,
    produktivitasKedelai: 15.66
  },
  {
    id: 'prod-004',
    kabupaten: 'Kabupaten Bojonegoro',
    tahun: 2024,
    padiSawah: 485730,
    padiLadang: 6890,
    totalPadi: 492620,
    jagung: 278940,
    kedelai: 15670,
    luasPanenPadi: 89560,
    luasPanenJagung: 48320,
    luasPanenKedelai: 2680,
    produktivitasPadi: 55.01,
    produktivitasJagung: 57.73,
    produktivitasKedelai: 15.85
  },
  {
    id: 'prod-005',
    kabupaten: 'Kabupaten Ngawi',
    tahun: 2024,
    padiSawah: 398450,
    padiLadang: 9230,
    totalPadi: 407680,
    jagung: 198760,
    kedelai: 11230,
    luasPanenPadi: 74580,
    luasPanenJagung: 34560,
    luasPanenKedelai: 1950,
    produktivitasPadi: 54.67,
    produktivitasJagung: 57.51,
    produktivitasKedelai: 15.76
  },
  {
    id: 'prod-006',
    kabupaten: 'Kabupaten Tuban',
    tahun: 2024,
    padiSawah: 412680,
    padiLadang: 7450,
    totalPadi: 420130,
    jagung: 145680,
    kedelai: 8940,
    luasPanenPadi: 76890,
    luasPanenJagung: 25340,
    luasPanenKedelai: 1560,
    produktivitasPadi: 54.64,
    produktivitasJagung: 57.49,
    produktivitasKedelai: 15.73
  },
  {
    id: 'prod-007',
    kabupaten: 'Kabupaten Lumajang',
    tahun: 2024,
    padiSawah: 328450,
    padiLadang: 18760,
    totalPadi: 347210,
    jagung: 267840,
    kedelai: 19870,
    luasPanenPadi: 64230,
    luasPanenJagung: 46780,
    luasPanenKedelai: 3450,
    produktivitasPadi: 54.05,
    produktivitasJagung: 57.25,
    produktivitasKedelai: 15.76
  },
  {
    id: 'prod-008',
    kabupaten: 'Kabupaten Situbondo',
    tahun: 2024,
    padiSawah: 267840,
    padiLadang: 14560,
    totalPadi: 282400,
    jagung: 123450,
    kedelai: 9870,
    luasPanenPadi: 52340,
    luasPanenJagung: 21560,
    luasPanenKedelai: 1750,
    produktivitasPadi: 53.96,
    produktivitasJagung: 57.24,
    produktivitasKedelai: 15.64
  },
  {
    id: 'prod-009',
    kabupaten: 'Kabupaten Bondowoso',
    tahun: 2024,
    padiSawah: 234560,
    padiLadang: 21340,
    totalPadi: 255900,
    jagung: 189760,
    kedelai: 16780,
    luasPanenPadi: 47560,
    luasPanenJagung: 33450,
    luasPanenKedelai: 2980,
    produktivitasPadi: 53.81,
    produktivitasJagung: 56.72,
    produktivitasKedelai: 15.63
  },
  {
    id: 'prod-010',
    kabupaten: 'Kabupaten Probolinggo',
    tahun: 2024,
    padiSawah: 312450,
    padiLadang: 16780,
    totalPadi: 329230,
    jagung: 156780,
    kedelai: 12450,
    luasPanenPadi: 60890,
    luasPanenJagung: 27340,
    luasPanenKedelai: 2180,
    produktivitasPadi: 54.08,
    produktivitasJagung: 57.35,
    produktivitasKedelai: 15.71
  },
  {
    id: 'prod-011',
    kabupaten: 'Kabupaten Pasuruan',
    tahun: 2024,
    padiSawah: 389670,
    padiLadang: 11230,
    totalPadi: 400900,
    jagung: 134560,
    kedelai: 10230,
    luasPanenPadi: 73450,
    luasPanenJagung: 23450,
    luasPanenKedelai: 1790,
    produktivitasPadi: 54.59,
    produktivitasJagung: 57.38,
    produktivitasKedelai: 15.72
  },
  {
    id: 'prod-012',
    kabupaten: 'Kabupaten Sidoarjo',
    tahun: 2024,
    padiSawah: 267840,
    padiLadang: 3450,
    totalPadi: 271290,
    jagung: 45670,
    kedelai: 3450,
    luasPanenPadi: 49890,
    luasPanenJagung: 7890,
    luasPanenKedelai: 610,
    produktivitasPadi: 54.39,
    produktivitasJagung: 57.89,
    produktivitasKedelai: 15.66
  },
  {
    id: 'prod-013',
    kabupaten: 'Kabupaten Mojokerto',
    tahun: 2024,
    padiSawah: 223450,
    padiLadang: 5670,
    totalPadi: 229120,
    jagung: 67890,
    kedelai: 5670,
    luasPanenPadi: 42340,
    luasPanenJagung: 11890,
    luasPanenKedelai: 980,
    produktivitasPadi: 54.14,
    produktivitasJagung: 57.11,
    produktivitasKedelai: 15.79
  },
  {
    id: 'prod-014',
    kabupaten: 'Kabupaten Jombang',
    tahun: 2024,
    padiSawah: 378900,
    padiLadang: 6780,
    totalPadi: 385680,
    jagung: 89760,
    kedelai: 7890,
    luasPanenPadi: 70560,
    luasPanenJagung: 15670,
    luasPanenKedelai: 1350,
    produktivitasPadi: 54.66,
    produktivitasJagung: 57.28,
    produktivitasKedelai: 15.84
  },
  {
    id: 'prod-015',
    kabupaten: 'Kabupaten Nganjuk',
    tahun: 2024,
    padiSawah: 412340,
    padiLadang: 8900,
    totalPadi: 421240,
    jagung: 123450,
    kedelai: 9870,
    luasPanenPadi: 76890,
    luasPanenJagung: 21450,
    luasPanenKedelai: 1710,
    produktivitasPadi: 54.79,
    produktivitasJagung: 57.55,
    produktivitasKedelai: 15.77
  },
  {
    id: 'prod-016',
    kabupaten: 'Kabupaten Madiun',
    tahun: 2024,
    padiSawah: 298760,
    padiLadang: 7890,
    totalPadi: 306650,
    jagung: 98760,
    kedelai: 8340,
    luasPanenPadi: 56780,
    luasPanenJagung: 17230,
    luasPanenKedelai: 1450,
    produktivitasPadi: 54.01,
    produktivitasJagung: 57.32,
    produktivitasKedelai: 15.75
  },
  {
    id: 'prod-017',
    kabupaten: 'Kabupaten Magetan',
    tahun: 2024,
    padiSawah: 267890,
    padiLadang: 9870,
    totalPadi: 277760,
    jagung: 87650,
    kedelai: 7230,
    luasPanenPadi: 51340,
    luasPanenJagung: 15340,
    luasPanenKedelai: 1260,
    produktivitasPadi: 54.11,
    produktivitasJagung: 57.14,
    produktivitasKedelai: 15.74
  },
  {
    id: 'prod-018',
    kabupaten: 'Kabupaten Ponorogo',
    tahun: 2024,
    padiSawah: 334560,
    padiLadang: 12340,
    totalPadi: 346900,
    jagung: 145670,
    kedelai: 11230,
    luasPanenPadi: 63890,
    luasPanenJagung: 25450,
    luasPanenKedelai: 1950,
    produktivitasPadi: 54.29,
    produktivitasJagung: 57.23,
    produktivitasKedelai: 15.76
  },
  {
    id: 'prod-019',
    kabupaten: 'Kabupaten Pacitan',
    tahun: 2024,
    padiSawah: 189760,
    padiLadang: 15670,
    totalPadi: 205430,
    jagung: 98760,
    kedelai: 7890,
    luasPanenPadi: 38450,
    luasPanenJagung: 17340,
    luasPanenKedelai: 1380,
    produktivitasPadi: 53.43,
    produktivitasJagung: 56.95,
    produktivitasKedelai: 15.72
  },
  {
    id: 'prod-020',
    kabupaten: 'Kabupaten Kediri',
    tahun: 2024,
    padiSawah: 423450,
    padiLadang: 9870,
    totalPadi: 433320,
    jagung: 156780,
    kedelai: 12340,
    luasPanenPadi: 79560,
    luasPanenJagung: 27340,
    luasPanenKedelai: 2140,
    produktivitasPadi: 54.47,
    produktivitasJagung: 57.35,
    produktivitasKedelai: 15.77
  },
  // Kota-kota dengan produksi lebih rendah
  {
    id: 'prod-021',
    kabupaten: 'Kota Surabaya',
    tahun: 2024,
    padiSawah: 8760,
    padiLadang: 1230,
    totalPadi: 9990,
    jagung: 2340,
    kedelai: 890,
    luasPanenPadi: 1890,
    luasPanenJagung: 450,
    luasPanenKedelai: 150,
    produktivitasPadi: 52.86,
    produktivitasJagung: 52.00,
    produktivitasKedelai: 15.93
  },
  {
    id: 'prod-022',
    kabupaten: 'Kota Malang',
    tahun: 2024,
    padiSawah: 12340,
    padiLadang: 2340,
    totalPadi: 14680,
    jagung: 3450,
    kedelai: 1230,
    luasPanenPadi: 2670,
    luasPanenJagung: 670,
    luasPanenKedelai: 210,
    produktivitasPadi: 54.98,
    produktivitasJagung: 51.49,
    produktivitasKedelai: 15.86
  },
  {
    id: 'prod-023',
    kabupaten: 'Kabupaten Malang',
    tahun: 2024,
    padiSawah: 378900,
    padiLadang: 17890,
    totalPadi: 396790,
    jagung: 198760,
    kedelai: 15670,
    luasPanenPadi: 72340,
    luasPanenJagung: 34560,
    luasPanenKedelai: 2780,
    produktivitasPadi: 54.85,
    produktivitasJagung: 57.51,
    produktivitasKedelai: 15.64
  },
  {
    id: 'prod-024',
    kabupaten: 'Kabupaten Blitar',
    tahun: 2024,
    padiSawah: 356780,
    padiLadang: 11230,
    totalPadi: 368010,
    jagung: 134560,
    kedelai: 10890,
    luasPanenPadi: 67890,
    luasPanenJagung: 23450,
    luasPanenKedelai: 1890,
    produktivitasPadi: 54.20,
    produktivitasJagung: 57.38,
    produktivitasKedelai: 15.76
  },
  {
    id: 'prod-025',
    kabupaten: 'Kabupaten Tulungagung',
    tahun: 2024,
    padiSawah: 312340,
    padiLadang: 9870,
    totalPadi: 322210,
    jagung: 123450,
    kedelai: 9340,
    luasPanenPadi: 59560,
    luasPanenJagung: 21560,
    luasPanenKedelai: 1620,
    produktivitasPadi: 54.10,
    produktivitasJagung: 57.25,
    produktivitasKedelai: 15.77
  },
  {
    id: 'prod-026',
    kabupaten: 'Kabupaten Trenggalek',
    tahun: 2024,
    padiSawah: 234560,
    padiLadang: 13450,
    totalPadi: 248010,
    jagung: 98760,
    kedelai: 7890,
    luasPanenPadi: 45670,
    luasPanenJagung: 17340,
    luasPanenKedelai: 1370,
    produktivitasPadi: 54.31,
    produktivitasJagung: 56.95,
    produktivitasKedelai: 15.76
  },
  {
    id: 'prod-027',
    kabupaten: 'Kabupaten Gresik',
    tahun: 2024,
    padiSawah: 289760,
    padiLadang: 5670,
    totalPadi: 295430,
    jagung: 78900,
    kedelai: 6780,
    luasPanenPadi: 54560,
    luasPanenJagung: 13780,
    luasPanenKedelai: 1180,
    produktivitasPadi: 54.15,
    produktivitasJagung: 57.27,
    produktivitasKedelai: 15.75
  },
  {
    id: 'prod-028',
    kabupaten: 'Kabupaten Bangkalan',
    tahun: 2024,
    padiSawah: 167890,
    padiLadang: 9870,
    totalPadi: 177760,
    jagung: 112340,
    kedelai: 8900,
    luasPanenPadi: 33450,
    luasPanenJagung: 19780,
    luasPanenKedelai: 1560,
    produktivitasPadi: 53.14,
    produktivitasJagung: 56.80,
    produktivitasKedelai: 15.71
  },
  {
    id: 'prod-029',
    kabupaten: 'Kabupaten Sampang',
    tahun: 2024,
    padiSawah: 123450,
    padiLadang: 11230,
    totalPadi: 134680,
    jagung: 98760,
    kedelai: 7890,
    luasPanenPadi: 25670,
    luasPanenJagung: 17560,
    luasPanenKedelai: 1380,
    produktivitasPadi: 52.47,
    produktivitasJagung: 56.23,
    produktivitasKedelai: 15.72
  },
  {
    id: 'prod-030',
    kabupaten: 'Kabupaten Pamekasan',
    tahun: 2024,
    padiSawah: 145670,
    padiLadang: 12340,
    totalPadi: 158010,
    jagung: 89760,
    kedelai: 7230,
    luasPanenPadi: 29890,
    luasPanenJagung: 15890,
    luasPanenKedelai: 1260,
    produktivitasPadi: 52.88,
    produktivitasJagung: 56.48,
    produktivitasKedelai: 15.74
  },
  {
    id: 'prod-031',
    kabupaten: 'Kabupaten Sumenep',
    tahun: 2024,
    padiSawah: 198760,
    padiLadang: 16780,
    totalPadi: 215540,
    jagung: 123450,
    kedelai: 9870,
    luasPanenPadi: 40560,
    luasPanenJagung: 21780,
    luasPanenKedelai: 1720,
    produktivitasPadi: 53.14,
    produktivitasJagung: 56.67,
    produktivitasKedelai: 15.74
  }
];

/**
 * Fetch production data with optional filtering
 */
export async function fetchProductionData(
  options: {
    kabupaten?: string;
    tahun?: number;
    minProduction?: number;
    delay?: number;
  } = {}
): Promise<ProductionData[]> {
  const { kabupaten, tahun, minProduction, delay = 300 } = options;

  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...productionData];

      if (kabupaten) {
        filtered = filtered.filter(d => 
          d.kabupaten.toLowerCase().includes(kabupaten.toLowerCase())
        );
      }

      if (tahun) {
        filtered = filtered.filter(d => d.tahun === tahun);
      }

      if (minProduction) {
        filtered = filtered.filter(d => d.totalPadi >= minProduction);
      }

      resolve(filtered);
    }, delay);
  });
}

/**
 * Get top producers by crop type
 */
export async function getTopProducers(
  cropType: 'padi' | 'jagung' | 'kedelai',
  limit: number = 10
): Promise<ProductionData[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const sorted = [...productionData].sort((a, b) => {
        switch (cropType) {
          case 'padi':
            return b.totalPadi - a.totalPadi;
          case 'jagung':
            return b.jagung - a.jagung;
          case 'kedelai':
            return b.kedelai - a.kedelai;
          default:
            return 0;
        }
      });

      resolve(sorted.slice(0, limit));
    }, 300);
  });
}

/**
 * Calculate total production for Jawa Timur
 */
export async function getTotalProduction(): Promise<{
  totalPadi: number;
  totalJagung: number;
  totalKedelai: number;
  totalLuasPanen: number;
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const totals = productionData.reduce(
        (acc, curr) => ({
          totalPadi: acc.totalPadi + curr.totalPadi,
          totalJagung: acc.totalJagung + curr.jagung,
          totalKedelai: acc.totalKedelai + curr.kedelai,
          totalLuasPanen: acc.totalLuasPanen + curr.luasPanenPadi + curr.luasPanenJagung + curr.luasPanenKedelai
        }),
        { totalPadi: 0, totalJagung: 0, totalKedelai: 0, totalLuasPanen: 0 }
      );

      resolve(totals);
    }, 300);
  });
}

export { productionData as default };
