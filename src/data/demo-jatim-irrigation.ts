/**
 * Data Irigasi dan Jaringan Irigasi Jawa Timur
 * 
 * Sumber: Data Irigasi dan Jaringan Irigasi Jawa Timur
 * URL: https://data.jatimprov.go.id/dataset/data-irigasi-dan-jaringan-irigasi-jawa-timur
 * Lisensi: Open Government Data (OGD Indonesia)
 * 
 * Data ini mencakup informasi jaringan irigasi, luas areal, kondisi jaringan,
 * dan status pemeliharaan di Jawa Timur
 */

export interface IrrigationData {
  id: string;
  kabupaten: string;
  namaJaringan: string;
  jenisIrigasi: 'Teknis' | 'Semi Teknis' | 'Sederhana' | 'PU';
  // Luas areal (ha)
  luasAreal: number;
  luasLayanan: number;
  // Kondisi jaringan (%)
  kondisiBaik: number;
  kondisiRusak Ringan: number;
  kondisiRusakBerat: number;
  // Infrastruktur
  bendung: number;
  saluranPrimer: number; // km
  saluranSekunder: number; // km
  saluranTersier: number; // km
  bangunanPembagi: number;
  // Status pemeliharaan
  statusPemeliharaan: 'Baik' | 'Sedang' | 'Buruk';
  tahunRehab: number;
  biayaPemeliharaan: number; // juta rupiah/tahun
}

const irrigationData: IrrigationData[] = [
  {
    id: 'irr-001',
    kabupaten: 'Kabupaten Lamongan',
    namaJaringan: 'DI Bengawan Solo',
    jenisIrigasi: 'Teknis',
    luasAreal: 28540,
    luasLayanan: 26780,
    kondisiBaik: 75,
    kondisiRusakRingan: 20,
    kondisiRusakBerat: 5,
    bendung: 3,
    saluranPrimer: 45.8,
    saluranSekunder: 126.5,
    saluranTersier: 340.2,
    bangunanPembagi: 89,
    statusPemeliharaan: 'Baik',
    tahunRehab: 2022,
    biayaPemeliharaan: 4560
  },
  {
    id: 'irr-002',
    kabupaten: 'Kabupaten Jember',
    namaJaringan: 'DI Jember Kanan',
    jenisIrigasi: 'Teknis',
    luasAreal: 22340,
    luasLayanan: 20890,
    kondisiBaik: 70,
    kondisiRusakRingan: 22,
    kondisiRusakBerat: 8,
    bendung: 2,
    saluranPrimer: 38.5,
    saluranSekunder: 98.3,
    saluranTersier: 287.6,
    bangunanPembagi: 67,
    statusPemeliharaan: 'Baik',
    tahunRehab: 2021,
    biayaPemeliharaan: 3890
  },
  {
    id: 'irr-003',
    kabupaten: 'Kabupaten Banyuwangi',
    namaJaringan: 'DI Banyuwangi',
    jenisIrigasi: 'Teknis',
    luasAreal: 19780,
    luasLayanan: 18560,
    kondisiBaik: 68,
    kondisiRusakRingan: 25,
    kondisiRusakBerat: 7,
    bendung: 2,
    saluranPrimer: 34.2,
    saluranSekunder: 89.7,
    saluranTersier: 256.8,
    bangunanPembagi: 58,
    statusPemeliharaan: 'Sedang',
    tahunRehab: 2020,
    biayaPemeliharaan: 3450
  },
  {
    id: 'irr-004',
    kabupaten: 'Kabupaten Bojonegoro',
    namaJaringan: 'DI Bojonegoro',
    jenisIrigasi: 'Teknis',
    luasAreal: 24560,
    luasLayanan: 23120,
    kondisiBaik: 72,
    kondisiRusakRingan: 21,
    kondisiRusakBerat: 7,
    bendung: 3,
    saluranPrimer: 42.6,
    saluranSekunder: 112.4,
    saluranTersier: 312.5,
    bangunanPembagi: 76,
    statusPemeliharaan: 'Baik',
    tahunRehab: 2023,
    biayaPemeliharaan: 4120
  },
  {
    id: 'irr-005',
    kabupaten: 'Kabupaten Sidoarjo',
    namaJaringan: 'DI Porong',
    jenisIrigasi: 'Teknis',
    luasAreal: 15670,
    luasLayanan: 14890,
    kondisiBaik: 78,
    kondisiRusakRingan: 18,
    kondisiRusakBerat: 4,
    bendung: 1,
    saluranPrimer: 28.4,
    saluranSekunder: 72.6,
    saluranTersier: 198.3,
    bangunanPembagi: 52,
    statusPemeliharaan: 'Baik',
    tahunRehab: 2023,
    biayaPemeliharaan: 2890
  },
  {
    id: 'irr-006',
    kabupaten: 'Kabupaten Mojokerto',
    namaJaringan: 'DI Mojokerto',
    jenisIrigasi: 'Semi Teknis',
    luasAreal: 12340,
    luasLayanan: 11560,
    kondisiBaik: 65,
    kondisiRusakRingan: 27,
    kondisiRusakBerat: 8,
    bendung: 1,
    saluranPrimer: 22.5,
    saluranSekunder: 58.9,
    saluranTersier: 167.4,
    bangunanPembagi: 43,
    statusPemeliharaan: 'Sedang',
    tahunRehab: 2019,
    biayaPemeliharaan: 2340
  },
  {
    id: 'irr-007',
    kabupaten: 'Kabupaten Jombang',
    namaJaringan: 'DI Jombang',
    jenisIrigasi: 'Teknis',
    luasAreal: 18900,
    luasLayanan: 17650,
    kondisiBaik: 70,
    kondisiRusakRingan: 23,
    kondisiRusakBerat: 7,
    bendung: 2,
    saluranPrimer: 32.8,
    saluranSekunder: 85.3,
    saluranTersier: 234.7,
    bangunanPembagi: 61,
    statusPemeliharaan: 'Baik',
    tahunRehab: 2022,
    biayaPemeliharaan: 3120
  },
  {
    id: 'irr-008',
    kabupaten: 'Kabupaten Nganjuk',
    namaJaringan: 'DI Nganjuk',
    jenisIrigasi: 'Teknis',
    luasAreal: 16780,
    luasLayanan: 15890,
    kondisiBaik: 68,
    kondisiRusakRingan: 24,
    kondisiRusakBerat: 8,
    bendung: 2,
    saluranPrimer: 29.6,
    saluranSekunder: 76.8,
    saluranTersier: 212.3,
    bangunanPembagi: 55,
    statusPemeliharaan: 'Sedang',
    tahunRehab: 2020,
    biayaPemeliharaan: 2780
  },
  {
    id: 'irr-009',
    kabupaten: 'Kabupaten Kediri',
    namaJaringan: 'DI Brantas',
    jenisIrigasi: 'Teknis',
    luasAreal: 21560,
    luasLayanan: 20120,
    kondisiBaik: 73,
    kondisiRusakRingan: 20,
    kondisiRusakBerat: 7,
    bendung: 2,
    saluranPrimer: 37.4,
    saluranSekunder: 94.6,
    saluranTersier: 267.8,
    bangunanPembagi: 69,
    statusPemeliharaan: 'Baik',
    tahunRehab: 2021,
    biayaPemeliharaan: 3560
  },
  {
    id: 'irr-010',
    kabupaten: 'Kabupaten Tulungagung',
    namaJaringan: 'DI Tulungagung',
    jenisIrigasi: 'Semi Teknis',
    luasAreal: 14560,
    luasLayanan: 13450,
    kondisiBaik: 65,
    kondisiRusakRingan: 28,
    kondisiRusakBerat: 7,
    bendung: 1,
    saluranPrimer: 25.6,
    saluranSekunder: 65.4,
    saluranTersier: 184.2,
    bangunanPembagi: 48,
    statusPemeliharaan: 'Sedang',
    tahunRehab: 2019,
    biayaPemeliharaan: 2450
  },
  {
    id: 'irr-011',
    kabupaten: 'Kabupaten Blitar',
    namaJaringan: 'DI Blitar',
    jenisIrigasi: 'Teknis',
    luasAreal: 17890,
    luasLayanan: 16670,
    kondisiBaik: 71,
    kondisiRusakRingan: 22,
    kondisiRusakBerat: 7,
    bendung: 2,
    saluranPrimer: 31.2,
    saluranSekunder: 81.5,
    saluranTersier: 223.6,
    bangunanPembagi: 58,
    statusPemeliharaan: 'Baik',
    tahunRehab: 2022,
    biayaPemeliharaan: 2980
  },
  {
    id: 'irr-012',
    kabupaten: 'Kabupaten Malang',
    namaJaringan: 'DI Malang Selatan',
    jenisIrigasi: 'Semi Teknis',
    luasAreal: 15340,
    luasLayanan: 14120,
    kondisiBaik: 62,
    kondisiRusakRingan: 30,
    kondisiRusakBerat: 8,
    bendung: 1,
    saluranPrimer: 26.8,
    saluranSekunder: 68.9,
    saluranTersier: 189.4,
    bangunanPembagi: 49,
    statusPemeliharaan: 'Sedang',
    tahunRehab: 2018,
    biayaPemeliharaan: 2560
  },
  {
    id: 'irr-013',
    kabupaten: 'Kabupaten Lumajang',
    namaJaringan: 'DI Lumajang',
    jenisIrigasi: 'Semi Teknis',
    luasAreal: 13450,
    luasLayanan: 12340,
    kondisiBaik: 60,
    kondisiRusakRingan: 32,
    kondisiRusakBerat: 8,
    bendung: 1,
    saluranPrimer: 23.4,
    saluranSekunder: 61.2,
    saluranTersier: 172.8,
    bangunanPembagi: 45,
    statusPemeliharaan: 'Sedang',
    tahunRehab: 2018,
    biayaPemeliharaan: 2230
  },
  {
    id: 'irr-014',
    kabupaten: 'Kabupaten Probolinggo',
    namaJaringan: 'DI Probolinggo',
    jenisIrigasi: 'Semi Teknis',
    luasAreal: 14890,
    luasLayanan: 13670,
    kondisiBaik: 63,
    kondisiRusakRingan: 29,
    kondisiRusakBerat: 8,
    bendung: 1,
    saluranPrimer: 26.2,
    saluranSekunder: 67.4,
    saluranTersier: 186.5,
    bangunanPembagi: 47,
    statusPemeliharaan: 'Sedang',
    tahunRehab: 2019,
    biayaPemeliharaan: 2450
  },
  {
    id: 'irr-015',
    kabupaten: 'Kabupaten Pasuruan',
    namaJaringan: 'DI Pasuruan',
    jenisIrigasi: 'Teknis',
    luasAreal: 16780,
    luasLayanan: 15670,
    kondisiBaik: 69,
    kondisiRusakRingan: 24,
    kondisiRusakBerat: 7,
    bendung: 2,
    saluranPrimer: 29.4,
    saluranSekunder: 75.8,
    saluranTersier: 208.9,
    bangunanPembagi: 54,
    statusPemeliharaan: 'Baik',
    tahunRehab: 2021,
    biayaPemeliharaan: 2780
  },
  {
    id: 'irr-016',
    kabupaten: 'Kabupaten Situbondo',
    namaJaringan: 'DI Situbondo',
    jenisIrigasi: 'Sederhana',
    luasAreal: 11230,
    luasLayanan: 10120,
    kondisiBaik: 58,
    kondisiRusakRingan: 34,
    kondisiRusakBerat: 8,
    bendung: 1,
    saluranPrimer: 19.6,
    saluranSekunder: 52.3,
    saluranTersier: 148.7,
    bangunanPembagi: 38,
    statusPemeliharaan: 'Buruk',
    tahunRehab: 2017,
    biayaPemeliharaan: 1890
  },
  {
    id: 'irr-017',
    kabupaten: 'Kabupaten Bondowoso',
    namaJaringan: 'DI Bondowoso',
    jenisIrigasi: 'Sederhana',
    luasAreal: 10560,
    luasLayanan: 9450,
    kondisiBaik: 56,
    kondisiRusakRingan: 36,
    kondisiRusakBerat: 8,
    bendung: 1,
    saluranPrimer: 18.4,
    saluranSekunder: 49.6,
    saluranTersier: 141.2,
    bangunanPembagi: 36,
    statusPemeliharaan: 'Buruk',
    tahunRehab: 2017,
    biayaPemeliharaan: 1780
  },
  {
    id: 'irr-018',
    kabupaten: 'Kabupaten Tuban',
    namaJaringan: 'DI Tuban',
    jenisIrigasi: 'Teknis',
    luasAreal: 17560,
    luasLayanan: 16340,
    kondisiBaik: 70,
    kondisiRusakRingan: 23,
    kondisiRusakBerat: 7,
    bendung: 2,
    saluranPrimer: 30.6,
    saluranSekunder: 78.9,
    saluranTersier: 217.3,
    bangunanPembagi: 56,
    statusPemeliharaan: 'Baik',
    tahunRehab: 2022,
    biayaPemeliharaan: 2890
  },
  {
    id: 'irr-019',
    kabupaten: 'Kabupaten Ngawi',
    namaJaringan: 'DI Ngawi',
    jenisIrigasi: 'Semi Teknis',
    luasAreal: 14230,
    luasLayanan: 13120,
    kondisiBaik: 64,
    kondisiRusakRingan: 28,
    kondisiRusakBerat: 8,
    bendung: 1,
    saluranPrimer: 24.8,
    saluranSekunder: 63.7,
    saluranTersier: 178.9,
    bangunanPembagi: 46,
    statusPemeliharaan: 'Sedang',
    tahunRehab: 2019,
    biayaPemeliharaan: 2340
  },
  {
    id: 'irr-020',
    kabupaten: 'Kabupaten Madiun',
    namaJaringan: 'DI Madiun',
    jenisIrigasi: 'Semi Teknis',
    luasAreal: 13560,
    luasLayanan: 12450,
    kondisiBaik: 65,
    kondisiRusakRingan: 27,
    kondisiRusakBerat: 8,
    bendung: 1,
    saluranPrimer: 23.6,
    saluranSekunder: 60.8,
    saluranTersier: 171.2,
    bangunanPembagi: 44,
    statusPemeliharaan: 'Sedang',
    tahunRehab: 2020,
    biayaPemeliharaan: 2230
  }
];

/**
 * Fetch irrigation data with optional filtering
 */
export async function fetchIrrigationData(
  options: {
    kabupaten?: string;
    jenisIrigasi?: string;
    kondisiMinimal?: number;
    delay?: number;
  } = {}
): Promise<IrrigationData[]> {
  const { kabupaten, jenisIrigasi, kondisiMinimal, delay = 300 } = options;

  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...irrigationData];

      if (kabupaten) {
        filtered = filtered.filter(d => 
          d.kabupaten.toLowerCase().includes(kabupaten.toLowerCase())
        );
      }

      if (jenisIrigasi) {
        filtered = filtered.filter(d => d.jenisIrigasi === jenisIrigasi);
      }

      if (kondisiMinimal) {
        filtered = filtered.filter(d => d.kondisiBaik >= kondisiMinimal);
      }

      resolve(filtered);
    }, delay);
  });
}

/**
 * Get irrigation statistics
 */
export async function getIrrigationStats(): Promise<{
  totalJaringan: number;
  totalLuasAreal: number;
  totalLuasLayanan: number;
  rataKondisiBaik: number;
  totalBiayaPemeliharaan: number;
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stats = irrigationData.reduce(
        (acc, curr) => ({
          totalJaringan: acc.totalJaringan + 1,
          totalLuasAreal: acc.totalLuasAreal + curr.luasAreal,
          totalLuasLayanan: acc.totalLuasLayanan + curr.luasLayanan,
          rataKondisiBaik: acc.rataKondisiBaik + curr.kondisiBaik,
          totalBiayaPemeliharaan: acc.totalBiayaPemeliharaan + curr.biayaPemeliharaan
        }),
        { totalJaringan: 0, totalLuasAreal: 0, totalLuasLayanan: 0, rataKondisiBaik: 0, totalBiayaPemeliharaan: 0 }
      );

      stats.rataKondisiBaik = stats.rataKondisiBaik / irrigationData.length;

      resolve(stats);
    }, 300);
  });
}

/**
 * Get irrigation networks by condition
 */
export async function getNetworksByCondition(): Promise<{
  baik: number;
  sedang: number;
  buruk: number;
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const counts = irrigationData.reduce(
        (acc, curr) => {
          acc[curr.statusPemeliharaan.toLowerCase() as 'baik' | 'sedang' | 'buruk']++;
          return acc;
        },
        { baik: 0, sedang: 0, buruk: 0 }
      );

      resolve(counts);
    }, 300);
  });
}

export { irrigationData as default };
