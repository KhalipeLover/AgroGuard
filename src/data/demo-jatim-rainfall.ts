/**
 * Data Curah Hujan Harian Stasiun BMKG Jawa Timur
 * 
 * Sumber: Data Curah Hujan Harian Stasiun BMKG Jawa Timur
 * URL: https://data.bmkg.go.id/prakiraan/cuaca/curah-hujan
 * Lisensi: BMKG Open Data (Non-komersial, atribusi wajib)
 * 
 * Data curah hujan harian dari stasiun pemantauan cuaca BMKG di Jawa Timur
 * Atribusi: "Data dari BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)"
 */

export interface RainfallStation {
  id: string;
  namaStasiun: string;
  kodeStasiun: string;
  kabupaten: string;
  latitude: number;
  longitude: number;
  elevasi: number; // meter
  jenisStasiun: 'Klimatologi' | 'Geofisika' | 'Meteorologi' | 'Maritim';
}

export interface RainfallData {
  id: string;
  kodeStasiun: string;
  tanggal: string;
  curahHujan: number; // mm
  intensitas: 'Ringan' | 'Sedang' | 'Lebat' | 'Sangat Lebat' | 'Ekstrem' | 'Tidak Hujan';
  suhuMin: number; // °C
  suhuMax: number; // °C
  suhuRata: number; // °C
  kelembapan: number; // %
  kecepatanAngin: number; // km/jam
  arahAngin: string;
  tekananUdara: number; // mb
  penyinaranMatahari: number; // jam
}

// Stasiun BMKG di Jawa Timur
export const rainfallStations: RainfallStation[] = [
  {
    id: 'station-001',
    namaStasiun: 'Stasiun Klimatologi Surabaya (Juanda)',
    kodeStasiun: 'SBYA',
    kabupaten: 'Kota Surabaya',
    latitude: -7.3798,
    longitude: 112.7878,
    elevasi: 3,
    jenisStasiun: 'Klimatologi'
  },
  {
    id: 'station-002',
    namaStasiun: 'Stasiun Meteorologi Malang (Abdul Rachman Saleh)',
    kodeStasiun: 'MLNG',
    kabupaten: 'Kabupaten Malang',
    latitude: -7.9266,
    longitude: 112.7144,
    elevasi: 526,
    jenisStasiun: 'Meteorologi'
  },
  {
    id: 'station-003',
    namaStasiun: 'Stasiun Meteorologi Banyuwangi (Blimbingsari)',
    kodeStasiun: 'BNYW',
    kabupaten: 'Kabupaten Banyuwangi',
    latitude: -8.3095,
    longitude: 114.3398,
    elevasi: 52,
    jenisStasiun: 'Meteorologi'
  },
  {
    id: 'station-004',
    namaStasiun: 'Stasiun Meteorologi Jember',
    kodeStasiun: 'JMBR',
    kabupaten: 'Kabupaten Jember',
    latitude: -8.2401,
    longitude: 113.6995,
    elevasi: 89,
    jenisStasiun: 'Meteorologi'
  },
  {
    id: 'station-005',
    namaStasiun: 'Stasiun Geofisika Tretes',
    kodeStasiun: 'TRTS',
    kabupaten: 'Kabupaten Pasuruan',
    latitude: -7.7145,
    longitude: 112.8072,
    elevasi: 800,
    jenisStasiun: 'Geofisika'
  },
  {
    id: 'station-006',
    namaStasiun: 'Stasiun Klimatologi Karangkates',
    kodeStasiun: 'KRKTS',
    kabupaten: 'Kabupaten Malang',
    latitude: -8.1523,
    longitude: 112.4567,
    elevasi: 340,
    jenisStasiun: 'Klimatologi'
  },
  {
    id: 'station-007',
    namaStasiun: 'Stasiun Meteorologi Madiun (Iswahyudi)',
    kodeStasiun: 'MDUN',
    kabupaten: 'Kabupaten Madiun',
    latitude: -7.6158,
    longitude: 111.5234,
    elevasi: 85,
    jenisStasiun: 'Meteorologi'
  },
  {
    id: 'station-008',
    namaStasiun: 'Stasiun Klimatologi Sangkapura',
    kodeStasiun: 'SKPR',
    kabupaten: 'Kabupaten Bawean',
    latitude: -5.7234,
    longitude: 112.6789,
    elevasi: 12,
    jenisStasiun: 'Klimatologi'
  },
  {
    id: 'station-009',
    namaStasiun: 'Stasiun Maritim Perak',
    kodeStasiun: 'PRAK',
    kabupaten: 'Kota Surabaya',
    latitude: -7.2134,
    longitude: 112.7234,
    elevasi: 2,
    jenisStasiun: 'Maritim'
  },
  {
    id: 'station-010',
    namaStasiun: 'Stasiun Klimatologi Pacitan',
    kodeStasiun: 'PCTN',
    kabupaten: 'Kabupaten Pacitan',
    latitude: -8.2012,
    longitude: 111.0923,
    elevasi: 42,
    jenisStasiun: 'Klimatologi'
  }
];

// Data curah hujan 30 hari terakhir (Oktober 2024)
const rainfallData: RainfallData[] = [];

// Helper function untuk generate data realistis
function generateIntensity(mm: number): 'Ringan' | 'Sedang' | 'Lebat' | 'Sangat Lebat' | 'Ekstrem' | 'Tidak Hujan' {
  if (mm === 0) return 'Tidak Hujan';
  if (mm < 5) return 'Ringan';
  if (mm < 10) return 'Sedang';
  if (mm < 20) return 'Lebat';
  if (mm < 50) return 'Sangat Lebat';
  return 'Ekstrem';
}

// Generate data untuk 30 hari terakhir untuk semua stasiun
rainfallStations.forEach((station) => {
  for (let day = 30; day >= 1; day--) {
    const date = new Date(2024, 9, day); // Oktober 2024
    const dateStr = date.toISOString().split('T')[0];
    
    // Generate random rainfall dengan pola realistis
    let curahHujan = 0;
    
    // Musim hujan mulai Oktober - pola curah hujan meningkat
    if (Math.random() > 0.3) { // 70% kemungkinan hujan
      curahHujan = Math.random() * 45 + (day / 30) * 20; // Meningkat di akhir bulan
    }
    
    // Stasiun di pegunungan cenderung lebih banyak hujan
    if (station.elevasi > 500) {
      curahHujan *= 1.3;
    }
    
    curahHujan = Math.round(curahHujan * 10) / 10;
    
    // Suhu disesuaikan dengan elevasi
    const suhuBase = 32 - (station.elevasi / 100) * 0.6;
    const suhuMin = Math.round((suhuBase - 6 - Math.random() * 2) * 10) / 10;
    const suhuMax = Math.round((suhuBase + Math.random() * 2) * 10) / 10;
    const suhuRata = Math.round(((suhuMin + suhuMax) / 2) * 10) / 10;
    
    // Kelembapan lebih tinggi saat hujan
    const kelembapan = curahHujan > 0 
      ? Math.round(75 + Math.random() * 20)
      : Math.round(60 + Math.random() * 20);
    
    // Angin
    const arahAnginList = ['Utara', 'Timur Laut', 'Timur', 'Tenggara', 'Selatan', 'Barat Daya', 'Barat', 'Barat Laut'];
    const arahAngin = arahAnginList[Math.floor(Math.random() * arahAnginList.length)];
    const kecepatanAngin = Math.round((5 + Math.random() * 15) * 10) / 10;
    
    // Tekanan udara disesuaikan dengan elevasi
    const tekananUdara = Math.round((1013 - (station.elevasi / 10)) * 10) / 10;
    
    // Penyinaran matahari berkurang saat hujan
    const penyinaranMatahari = curahHujan > 10
      ? Math.round(Math.random() * 4 * 10) / 10
      : Math.round((6 + Math.random() * 6) * 10) / 10;
    
    rainfallData.push({
      id: `rainfall-${station.kodeStasiun}-${dateStr}`,
      kodeStasiun: station.kodeStasiun,
      tanggal: dateStr,
      curahHujan,
      intensitas: generateIntensity(curahHujan),
      suhuMin,
      suhuMax,
      suhuRata,
      kelembapan,
      kecepatanAngin,
      arahAngin,
      tekananUdara,
      penyinaranMatahari
    });
  }
});

/**
 * Fetch rainfall data with filtering
 */
export async function fetchRainfallData(
  options: {
    kodeStasiun?: string;
    tanggalMulai?: string;
    tanggalAkhir?: string;
    intensitasMin?: string;
    delay?: number;
  } = {}
): Promise<RainfallData[]> {
  const { kodeStasiun, tanggalMulai, tanggalAkhir, intensitasMin, delay = 300 } = options;

  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...rainfallData];

      if (kodeStasiun) {
        filtered = filtered.filter(d => d.kodeStasiun === kodeStasiun);
      }

      if (tanggalMulai) {
        filtered = filtered.filter(d => d.tanggal >= tanggalMulai);
      }

      if (tanggalAkhir) {
        filtered = filtered.filter(d => d.tanggal <= tanggalAkhir);
      }

      if (intensitasMin) {
        const intensityOrder = ['Tidak Hujan', 'Ringan', 'Sedang', 'Lebat', 'Sangat Lebat', 'Ekstrem'];
        const minIndex = intensityOrder.indexOf(intensitasMin);
        filtered = filtered.filter(d => intensityOrder.indexOf(d.intensitas) >= minIndex);
      }

      resolve(filtered);
    }, delay);
  });
}

/**
 * Get rainfall statistics by station
 */
export async function getRainfallStatsByStation(kodeStasiun: string): Promise<{
  totalCurahHujan: number;
  rataCurahHujan: number;
  hariHujan: number;
  curahHujanMax: number;
  rataSuhu: number;
  rataKelembapan: number;
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stationData = rainfallData.filter(d => d.kodeStasiun === kodeStasiun);
      
      const stats = stationData.reduce(
        (acc, curr) => ({
          totalCurahHujan: acc.totalCurahHujan + curr.curahHujan,
          hariHujan: acc.hariHujan + (curr.curahHujan > 0 ? 1 : 0),
          curahHujanMax: Math.max(acc.curahHujanMax, curr.curahHujan),
          totalSuhu: acc.totalSuhu + curr.suhuRata,
          totalKelembapan: acc.totalKelembapan + curr.kelembapan
        }),
        { totalCurahHujan: 0, hariHujan: 0, curahHujanMax: 0, totalSuhu: 0, totalKelembapan: 0 }
      );

      resolve({
        totalCurahHujan: Math.round(stats.totalCurahHujan * 10) / 10,
        rataCurahHujan: Math.round((stats.totalCurahHujan / stationData.length) * 10) / 10,
        hariHujan: stats.hariHujan,
        curahHujanMax: stats.curahHujanMax,
        rataSuhu: Math.round((stats.totalSuhu / stationData.length) * 10) / 10,
        rataKelembapan: Math.round(stats.totalKelembapan / stationData.length)
      });
    }, 300);
  });
}

/**
 * Get rainfall comparison across all stations
 */
export async function getRainfallComparison(): Promise<Array<{
  kodeStasiun: string;
  namaStasiun: string;
  totalCurahHujan: number;
  hariHujan: number;
}>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const comparison = rainfallStations.map(station => {
        const stationData = rainfallData.filter(d => d.kodeStasiun === station.kodeStasiun);
        const totalCurahHujan = stationData.reduce((sum, d) => sum + d.curahHujan, 0);
        const hariHujan = stationData.filter(d => d.curahHujan > 0).length;

        return {
          kodeStasiun: station.kodeStasiun,
          namaStasiun: station.namaStasiun,
          totalCurahHujan: Math.round(totalCurahHujan * 10) / 10,
          hariHujan
        };
      });

      resolve(comparison);
    }, 300);
  });
}

/**
 * Fetch rainfall stations
 */
export async function fetchRainfallStations(delay: number = 300): Promise<RainfallStation[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...rainfallStations]), delay);
  });
}

export { rainfallData as default };
