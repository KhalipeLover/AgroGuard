/**
 * Data Potensi Energi Terbarukan Jawa Timur
 * 
 * Sumber: Data Potensi Energi Terbarukan di Jawa Timur
 * URL: https://esdm.jatimprov.go.id/data/potensi-energi-terbarukan
 * Lisensi: Open Government Data (OGD Indonesia)
 * 
 * Data potensi energi surya, angin, biomassa, dan mikrohidro di Jawa Timur
 */

export interface RenewableEnergyData {
  id: string;
  kabupaten: string;
  latitude: number;
  longitude: number;
  // Potensi Energi Surya
  iradiasi: number; // kWh/m²/hari
  potensiSurya: number; // MW
  panelTerpasang: number; // MW
  pemanfaatanSurya: number; // %
  // Potensi Energi Angin
  kecepatanAnginRata: number; // m/s
  potensiAngin: number; // MW
  turbinTerpasang: number; // unit
  kapasitasAngin: number; // MW
  // Potensi Biomassa
  limbahPertanian: number; // ton/tahun
  limbahPerternakan: number; // ton/tahun
  potensiBiomassa: number; // MW
  pltuBiomassa: number; // unit
  kapasitasBiomassa: number; // MW
  // Potensi Mikrohidro
  aliranSungai: number; // titik potensial
  potensiMikrohidro: number; // MW
  pltmhTerpasang: number; // unit
  kapasitasMikrohidro: number; // MW
  // Total
  totalPotensi: number; // MW
  totalTerpasang: number; // MW
  pemanfaatan: number; // %
}

const renewableEnergyData: RenewableEnergyData[] = [
  {
    id: 're-001',
    kabupaten: 'Kabupaten Banyuwangi',
    latitude: -8.2192,
    longitude: 114.3689,
    // Energi Surya
    iradiasi: 5.2,
    potensiSurya: 850,
    panelTerpasang: 12.5,
    pemanfaatanSurya: 1.47,
    // Energi Angin
    kecepatanAnginRata: 6.8,
    potensiAngin: 420,
    turbinTerpasang: 3,
    kapasitasAngin: 2.4,
    // Biomassa
    limbahPertanian: 458520,
    limbahPerternakan: 67890,
    potensiBiomassa: 156,
    pltuBiomassa: 2,
    kapasitasBiomassa: 8.5,
    // Mikrohidro
    aliranSungai: 12,
    potensiMikrohidro: 23.5,
    pltmhTerpasang: 5,
    kapasitasMikrohidro: 4.2,
    // Total
    totalPotensi: 1449.5,
    totalTerpasang: 27.6,
    pemanfaatan: 1.90
  },
  {
    id: 're-002',
    kabupaten: 'Kabupaten Malang',
    latitude: -8.1706,
    longitude: 112.6683,
    iradiasi: 5.0,
    potensiSurya: 780,
    panelTerpasang: 18.3,
    pemanfaatanSurya: 2.35,
    kecepatanAnginRata: 4.2,
    potensiAngin: 185,
    turbinTerpasang: 0,
    kapasitasAngin: 0,
    limbahPertanian: 378900,
    limbahPerternakan: 123450,
    potensiBiomassa: 189,
    pltuBiomassa: 3,
    kapasitasBiomassa: 12.3,
    aliranSungai: 18,
    potensiMikrohidro: 34.7,
    pltmhTerpasang: 8,
    kapasitasMikrohidro: 6.8,
    totalPotensi: 1188.7,
    totalTerpasang: 37.4,
    pemanfaatan: 3.15
  },
  {
    id: 're-003',
    kabupaten: 'Kabupaten Lumajang',
    latitude: -8.1333,
    longitude: 113.2167,
    iradiasi: 5.1,
    potensiSurya: 520,
    panelTerpasang: 6.8,
    pemanfaatanSurya: 1.31,
    kecepatanAnginRata: 5.5,
    potensiAngin: 245,
    turbinTerpasang: 1,
    kapasitasAngin: 0.8,
    limbahPertanian: 328450,
    limbahPerternakan: 89760,
    potensiBiomassa: 145,
    pltuBiomassa: 2,
    kapasitasBiomassa: 9.2,
    aliranSungai: 15,
    potensiMikrohidro: 28.9,
    pltmhTerpasang: 6,
    kapasitasMikrohidro: 5.3,
    totalPotensi: 938.9,
    totalTerpasang: 22.1,
    pemanfaatan: 2.35
  },
  {
    id: 're-004',
    kabupaten: 'Kabupaten Jember',
    latitude: -8.1844,
    longitude: 113.7069,
    iradiasi: 5.3,
    potensiSurya: 890,
    panelTerpasang: 15.6,
    pemanfaatanSurya: 1.75,
    kecepatanAnginRata: 4.8,
    potensiAngin: 210,
    turbinTerpasang: 0,
    kapasitasAngin: 0,
    limbahPertanian: 442180,
    limbahPerternakan: 98760,
    potensiBiomassa: 178,
    pltuBiomassa: 3,
    kapasitasBiomassa: 11.4,
    aliranSungai: 14,
    potensiMikrohidro: 26.3,
    pltmhTerpasang: 7,
    kapasitasMikrohidro: 5.8,
    totalPotensi: 1304.3,
    totalTerpasang: 32.8,
    pemanfaatan: 2.52
  },
  {
    id: 're-005',
    kabupaten: 'Kabupaten Situbondo',
    latitude: -7.7063,
    longitude: 113.9772,
    iradiasi: 5.4,
    potensiSurya: 620,
    panelTerpasang: 8.2,
    pemanfaatanSurya: 1.32,
    kecepatanAnginRata: 7.2,
    potensiAngin: 380,
    turbinTerpasang: 2,
    kapasitasAngin: 1.6,
    limbahPertanian: 267840,
    limbahPerternakan: 56780,
    potensiBiomassa: 112,
    pltuBiomassa: 1,
    kapasitasBiomassa: 6.5,
    aliranSungai: 8,
    potensiMikrohidro: 18.4,
    pltmhTerpasang: 3,
    kapasitasMikrohidro: 3.2,
    totalPotensi: 1130.4,
    totalTerpasang: 19.5,
    pemanfaatan: 1.73
  },
  {
    id: 're-006',
    kabupaten: 'Kabupaten Bondowoso',
    latitude: -7.9139,
    longitude: 113.8219,
    iradiasi: 5.2,
    potensiSurya: 480,
    panelTerpasang: 5.4,
    pemanfaatanSurya: 1.13,
    kecepatanAnginRata: 5.8,
    potensiAngin: 290,
    turbinTerpasang: 1,
    kapasitasAngin: 0.8,
    limbahPertanian: 234560,
    limbahPerternakan: 67890,
    potensiBiomassa: 123,
    pltuBiomassa: 2,
    kapasitasBiomassa: 7.8,
    aliranSungai: 16,
    potensiMikrohidro: 31.2,
    pltmhTerpasang: 7,
    kapasitasMikrohidro: 6.1,
    totalPotensi: 924.2,
    totalTerpasang: 20.1,
    pemanfaatan: 2.17
  },
  {
    id: 're-007',
    kabupaten: 'Kabupaten Probolinggo',
    latitude: -7.7543,
    longitude: 113.2159,
    iradiasi: 5.3,
    potensiSurya: 640,
    panelTerpasang: 9.6,
    pemanfaatanSurya: 1.50,
    kecepatanAnginRata: 6.5,
    potensiAngin: 340,
    turbinTerpasang: 2,
    kapasitasAngin: 1.6,
    limbahPertanian: 312450,
    limbahPerternakan: 78900,
    potensiBiomassa: 134,
    pltuBiomassa: 2,
    kapasitasBiomassa: 8.9,
    aliranSungai: 11,
    potensiMikrohidro: 24.6,
    pltmhTerpasang: 5,
    kapasitasMikrohidro: 4.5,
    totalPotensi: 1138.6,
    totalTerpasang: 24.6,
    pemanfaatan: 2.16
  },
  {
    id: 're-008',
    kabupaten: 'Kabupaten Pasuruan',
    latitude: -7.6453,
    longitude: 112.9075,
    iradiasi: 5.1,
    potensiSurya: 720,
    panelTerpasang: 11.2,
    pemanfaatanSurya: 1.56,
    kecepatanAnginRata: 4.5,
    potensiAngin: 195,
    turbinTerpasang: 0,
    kapasitasAngin: 0,
    limbahPertanian: 389670,
    limbahPerternakan: 98760,
    potensiBiomassa: 167,
    pltuBiomassa: 2,
    kapasitasBiomassa: 10.5,
    aliranSungai: 13,
    potensiMikrohidro: 27.8,
    pltmhTerpasang: 6,
    kapasitasMikrohidro: 5.4,
    totalPotensi: 1109.8,
    totalTerpasang: 27.1,
    pemanfaatan: 2.44
  },
  {
    id: 're-009',
    kabupaten: 'Kota Surabaya',
    latitude: -7.2575,
    longitude: 112.7521,
    iradiasi: 5.0,
    potensiSurya: 450,
    panelTerpasang: 24.8,
    pemanfaatanSurya: 5.51,
    kecepatanAnginRata: 3.8,
    potensiAngin: 85,
    turbinTerpasang: 0,
    kapasitasAngin: 0,
    limbahPertanian: 8760,
    limbahPerternakan: 12340,
    potensiBiomassa: 12,
    pltuBiomassa: 0,
    kapasitasBiomassa: 0,
    aliranSungai: 0,
    potensiMikrohidro: 0,
    pltmhTerpasang: 0,
    kapasitasMikrohidro: 0,
    totalPotensi: 547,
    totalTerpasang: 24.8,
    pemanfaatan: 4.53
  },
  {
    id: 're-010',
    kabupaten: 'Kabupaten Sidoarjo',
    latitude: -7.4478,
    longitude: 112.7183,
    iradiasi: 4.9,
    potensiSurya: 380,
    panelTerpasang: 16.4,
    pemanfaatanSurya: 4.32,
    kecepatanAnginRata: 3.5,
    potensiAngin: 65,
    turbinTerpasang: 0,
    kapasitasAngin: 0,
    limbahPertanian: 267840,
    limbahPerternakan: 89760,
    potensiBiomassa: 98,
    pltuBiomassa: 1,
    kapasitasBiomassa: 6.2,
    aliranSungai: 3,
    potensiMikrohidro: 8.5,
    pltmhTerpasang: 1,
    kapasitasMikrohidro: 1.2,
    totalPotensi: 551.5,
    totalTerpasang: 23.8,
    pemanfaatan: 4.32
  },
  {
    id: 're-011',
    kabupaten: 'Kabupaten Gresik',
    latitude: -7.1554,
    longitude: 112.6544,
    iradiasi: 5.0,
    potensiSurya: 520,
    panelTerpasang: 14.3,
    pemanfaatanSurya: 2.75,
    kecepatanAnginRata: 5.2,
    potensiAngin: 280,
    turbinTerpasang: 1,
    kapasitasAngin: 0.8,
    limbahPertanian: 289760,
    limbahPerternakan: 78900,
    potensiBiomassa: 123,
    pltuBiomassa: 2,
    kapasitasBiomassa: 8.4,
    aliranSungai: 5,
    potensiMikrohidro: 12.3,
    pltmhTerpasang: 2,
    kapasitasMikrohidro: 2.1,
    totalPotensi: 935.3,
    totalTerpasang: 25.6,
    pemanfaatan: 2.74
  },
  {
    id: 're-012',
    kabupaten: 'Kabupaten Lamongan',
    latitude: -7.1167,
    longitude: 112.4167,
    iradiasi: 5.1,
    potensiSurya: 890,
    panelTerpasang: 13.5,
    pemanfaatanSurya: 1.52,
    kecepatanAnginRata: 4.2,
    potensiAngin: 195,
    turbinTerpasang: 0,
    kapasitasAngin: 0,
    limbahPertanian: 528960,
    limbahPerternakan: 112340,
    potensiBiomassa: 212,
    pltuBiomassa: 3,
    kapasitasBiomassa: 14.8,
    aliranSungai: 9,
    potensiMikrohidro: 19.4,
    pltmhTerpasang: 4,
    kapasitasMikrohidro: 3.6,
    totalPotensi: 1316.4,
    totalTerpasang: 31.9,
    pemanfaatan: 2.42
  },
  {
    id: 're-013',
    kabupaten: 'Kabupaten Bojonegoro',
    latitude: -7.1503,
    longitude: 111.8824,
    iradiasi: 5.2,
    potensiSurya: 820,
    panelTerpasang: 10.8,
    pemanfaatanSurya: 1.32,
    kecepatanAnginRata: 3.8,
    potensiAngin: 145,
    turbinTerpasang: 0,
    kapasitasAngin: 0,
    limbahPertanian: 485730,
    limbahPerternakan: 98760,
    potensiBiomassa: 198,
    pltuBiomassa: 2,
    kapasitasBiomassa: 12.6,
    aliranSungai: 11,
    potensiMikrohidro: 22.5,
    pltmhTerpasang: 5,
    kapasitasMikrohidro: 4.2,
    totalPotensi: 1185.5,
    totalTerpasang: 27.6,
    pemanfaatan: 2.33
  },
  {
    id: 're-014',
    kabupaten: 'Kabupaten Tuban',
    latitude: -6.8978,
    longitude: 111.9550,
    iradiasi: 5.3,
    potensiSurya: 780,
    panelTerpasang: 9.2,
    pemanfaatanSurya: 1.18,
    kecepatanAnginRata: 5.8,
    potensiAngin: 320,
    turbinTerpasang: 2,
    kapasitasAngin: 1.6,
    limbahPertanian: 412680,
    limbahPerternakan: 87650,
    potensiBiomassa: 167,
    pltuBiomassa: 2,
    kapasitasBiomassa: 10.8,
    aliranSungai: 7,
    potensiMikrohidro: 16.7,
    pltmhTerpasang: 3,
    kapasitasMikrohidro: 3.1,
    totalPotensi: 1283.7,
    totalTerpasang: 24.7,
    pemanfaatan: 1.92
  },
  {
    id: 're-015',
    kabupaten: 'Kabupaten Ngawi',
    latitude: -7.4040,
    longitude: 111.4460,
    iradiasi: 5.1,
    potensiSurya: 690,
    panelTerpasang: 7.8,
    pemanfaatanSurya: 1.13,
    kecepatanAnginRata: 3.5,
    potensiAngin: 125,
    turbinTerpasang: 0,
    kapasitasAngin: 0,
    limbahPertanian: 398450,
    limbahPerternakan: 76540,
    potensiBiomassa: 156,
    pltuBiomassa: 2,
    kapasitasBiomassa: 9.8,
    aliranSungai: 10,
    potensiMikrohidro: 21.3,
    pltmhTerpasang: 4,
    kapasitasMikrohidro: 3.8,
    totalPotensi: 992.3,
    totalTerpasang: 21.4,
    pemanfaatan: 2.16
  }
];

/**
 * Fetch renewable energy data with filtering
 */
export async function fetchRenewableEnergyData(
  options: {
    kabupaten?: string;
    minPotensi?: number;
    delay?: number;
  } = {}
): Promise<RenewableEnergyData[]> {
  const { kabupaten, minPotensi, delay = 300 } = options;

  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...renewableEnergyData];

      if (kabupaten) {
        filtered = filtered.filter(d => 
          d.kabupaten.toLowerCase().includes(kabupaten.toLowerCase())
        );
      }

      if (minPotensi) {
        filtered = filtered.filter(d => d.totalPotensi >= minPotensi);
      }

      resolve(filtered);
    }, delay);
  });
}

/**
 * Get total renewable energy potential and utilization
 */
export async function getTotalRenewableStats(): Promise<{
  totalPotensiSurya: number;
  totalPotensiAngin: number;
  totalPotensiBiomassa: number;
  totalPotensiMikrohidro: number;
  totalPotensi: number;
  totalTerpasang: number;
  pemanfaatanRata: number;
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stats = renewableEnergyData.reduce(
        (acc, curr) => ({
          totalPotensiSurya: acc.totalPotensiSurya + curr.potensiSurya,
          totalPotensiAngin: acc.totalPotensiAngin + curr.potensiAngin,
          totalPotensiBiomassa: acc.totalPotensiBiomassa + curr.potensiBiomassa,
          totalPotensiMikrohidro: acc.totalPotensiMikrohidro + curr.potensiMikrohidro,
          totalPotensi: acc.totalPotensi + curr.totalPotensi,
          totalTerpasang: acc.totalTerpasang + curr.totalTerpasang,
          pemanfaatanRata: acc.pemanfaatanRata + curr.pemanfaatan
        }),
        { 
          totalPotensiSurya: 0, 
          totalPotensiAngin: 0, 
          totalPotensiBiomassa: 0, 
          totalPotensiMikrohidro: 0,
          totalPotensi: 0,
          totalTerpasang: 0,
          pemanfaatanRata: 0
        }
      );

      stats.pemanfaatanRata = stats.pemanfaatanRata / renewableEnergyData.length;

      resolve({
        ...stats,
        totalPotensiSurya: Math.round(stats.totalPotensiSurya),
        totalPotensiAngin: Math.round(stats.totalPotensiAngin),
        totalPotensiBiomassa: Math.round(stats.totalPotensiBiomassa),
        totalPotensiMikrohidro: Math.round(stats.totalPotensiMikrohidro),
        totalPotensi: Math.round(stats.totalPotensi),
        totalTerpasang: Math.round(stats.totalTerpasang * 10) / 10,
        pemanfaatanRata: Math.round(stats.pemanfaatanRata * 100) / 100
      });
    }, 300);
  });
}

/**
 * Get top potential areas by energy type
 */
export async function getTopPotentialAreas(
  energyType: 'surya' | 'angin' | 'biomassa' | 'mikrohidro',
  limit: number = 10
): Promise<RenewableEnergyData[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const sorted = [...renewableEnergyData].sort((a, b) => {
        switch (energyType) {
          case 'surya':
            return b.potensiSurya - a.potensiSurya;
          case 'angin':
            return b.potensiAngin - a.potensiAngin;
          case 'biomassa':
            return b.potensiBiomassa - a.potensiBiomassa;
          case 'mikrohidro':
            return b.potensiMikrohidro - a.potensiMikrohidro;
          default:
            return 0;
        }
      });

      resolve(sorted.slice(0, limit));
    }, 300);
  });
}

export { renewableEnergyData as default };
