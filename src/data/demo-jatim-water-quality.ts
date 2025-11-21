/**
 * Data Kualitas Air Sungai Surabaya
 * 
 * Sumber: Data Kualitas Air Sungai Surabaya
 * URL: https://dlh.jatimprov.go.id/data/kualitas-air-sungai-surabaya
 * Lisensi: Open Access, penggunaan dengan atribusi
 * Deskripsi: "Data dari Dinas Lingkungan Hidup Provinsi Jawa Timur"
 * 
 * Data pengukuran kualitas air di Sungai Surabaya berdasarkan parameter
 * DO, pH, BOD, COD, TSS, Fosfat, Nitrat, dan lainnya
 */

export interface WaterQualityStation {
  id: string;
  namaLokasi: string;
  kodeLokasi: string;
  sungai: string;
  kecamatan: string;
  kabupaten: string;
  latitude: number;
  longitude: number;
  tipeArea: 'Hulu' | 'Tengah' | 'Hilir';
  fungsiSungai: 'Pertanian' | 'Industri' | 'Domestik' | 'Campuran';
}

export interface WaterQualityData {
  id: string;
  kodeLokasi: string;
  tanggalPengukuran: string;
  // Parameter Fisika
  suhu: number; // °C
  tds: number; // mg/L (Total Dissolved Solids)
  tss: number; // mg/L (Total Suspended Solids)
  kekeruhan: number; // NTU
  warna: number; // Pt-Co
  // Parameter Kimia
  ph: number;
  do: number; // mg/L (Dissolved Oxygen)
  bod: number; // mg/L (Biochemical Oxygen Demand)
  cod: number; // mg/L (Chemical Oxygen Demand)
  amonia: number; // mg/L
  nitrat: number; // mg/L
  nitrit: number; // mg/L
  fosfat: number; // mg/L
  sulfat: number; // mg/L
  klorida: number; // mg/L
  // Logam Berat
  besi: number; // mg/L
  mangan: number; // mg/L
  tembaga: number; // mg/L
  seng: number; // mg/L
  timbal: number; // mg/L
  kadmium: number; // mg/L
  merkuri: number; // mg/L
  // Parameter Mikrobiologi
  koli: number; // MPN/100ml (Total Coliform)
  eKoli: number; // MPN/100ml (E. coli)
  // Status Kualitas
  statusMutu: 'Baik' | 'Sedang' | 'Cemar Ringan' | 'Cemar Sedang' | 'Cemar Berat';
  indeksKualitas: number; // 0-100
}

// Stasiun Monitoring Sungai Surabaya
export const waterQualityStations: WaterQualityStation[] = [
  {
    id: 'wqs-001',
    namaLokasi: 'Sungai Brantas - Karangkates',
    kodeLokasi: 'SBY-001',
    sungai: 'Sungai Brantas',
    kecamatan: 'Wajak',
    kabupaten: 'Kabupaten Malang',
    latitude: -8.1523,
    longitude: 112.4567,
    tipeArea: 'Hulu',
    fungsiSungai: 'Pertanian'
  },
  {
    id: 'wqs-002',
    namaLokasi: 'Sungai Brantas - Kediri',
    kodeLokasi: 'SBY-002',
    sungai: 'Sungai Brantas',
    kecamatan: 'Mojoroto',
    kabupaten: 'Kota Kediri',
    latitude: -7.8147,
    longitude: 112.0126,
    tipeArea: 'Tengah',
    fungsiSungai: 'Campuran'
  },
  {
    id: 'wqs-003',
    namaLokasi: 'Sungai Brantas - Kertosono',
    kodeLokasi: 'SBY-003',
    sungai: 'Sungai Brantas',
    kecamatan: 'Kertosono',
    kabupaten: 'Kabupaten Nganjuk',
    latitude: -7.5833,
    longitude: 112.1000,
    tipeArea: 'Tengah',
    fungsiSungai: 'Campuran'
  },
  {
    id: 'wqs-004',
    namaLokasi: 'Sungai Brantas - Mojokerto',
    kodeLokasi: 'SBY-004',
    sungai: 'Sungai Brantas',
    kecamatan: 'Mojokerto',
    kabupaten: 'Kabupaten Mojokerto',
    latitude: -7.4664,
    longitude: 112.4338,
    tipeArea: 'Hilir',
    fungsiSungai: 'Campuran'
  },
  {
    id: 'wqs-005',
    namaLokasi: 'Intake PDAM Karangpilang',
    kodeLokasi: 'SBY-005',
    sungai: 'Sungai Surabaya',
    kecamatan: 'Karangpilang',
    kabupaten: 'Kota Surabaya',
    latitude: -7.3183,
    longitude: 112.7125,
    tipeArea: 'Hilir',
    fungsiSungai: 'Domestik'
  },
  {
    id: 'wqs-006',
    namaLokasi: 'Kali Surabaya - Gunungsari',
    kodeLokasi: 'SBY-006',
    sungai: 'Kali Surabaya',
    kecamatan: 'Gunungsari',
    kabupaten: 'Kota Surabaya',
    latitude: -7.2894,
    longitude: 112.7342,
    tipeArea: 'Hilir',
    fungsiSungai: 'Campuran'
  },
  {
    id: 'wqs-007',
    namaLokasi: 'Kali Mas - Wonokromo',
    kodeLokasi: 'SBY-007',
    sungai: 'Kali Mas',
    kecamatan: 'Wonokromo',
    kabupaten: 'Kota Surabaya',
    latitude: -7.2847,
    longitude: 112.7456,
    tipeArea: 'Hilir',
    fungsiSungai: 'Campuran'
  },
  {
    id: 'wqs-008',
    namaLokasi: 'Kali Mas - Tambak Langon',
    kodeLokasi: 'SBY-008',
    sungai: 'Kali Mas',
    kecamatan: 'Mulyorejo',
    kabupaten: 'Kota Surabaya',
    latitude: -7.2678,
    longitude: 112.7734,
    tipeArea: 'Hilir',
    fungsiSungai: 'Industri'
  },
  {
    id: 'wqs-009',
    namaLokasi: 'Kali Porong - Porong',
    kodeLokasi: 'SBY-009',
    sungai: 'Kali Porong',
    kecamatan: 'Porong',
    kabupaten: 'Kabupaten Sidoarjo',
    latitude: -7.5456,
    longitude: 112.7234,
    tipeArea: 'Tengah',
    fungsiSungai: 'Campuran'
  },
  {
    id: 'wqs-010',
    namaLokasi: 'Sungai Welang - Pasuruan',
    kodeLokasi: 'SBY-010',
    sungai: 'Sungai Welang',
    kecamatan: 'Wonorejo',
    kabupaten: 'Kabupaten Pasuruan',
    latitude: -7.6543,
    longitude: 112.9123,
    tipeArea: 'Tengah',
    fungsiSungai: 'Pertanian'
  }
];

// Generate data kualitas air untuk 12 bulan terakhir
const waterQualityData: WaterQualityData[] = [];

function generateWaterQuality(station: WaterQualityStation, month: number, year: number): WaterQualityData {
  const date = new Date(year, month, 15);
  const dateStr = date.toISOString().split('T')[0];
  
  // Generate data berdasarkan tipe area dan fungsi sungai
  let qualityFactor = 1.0;
  
  // Hulu = lebih bersih, Hilir = lebih tercemar
  if (station.tipeArea === 'Hulu') qualityFactor = 0.3;
  else if (station.tipeArea === 'Tengah') qualityFactor = 0.6;
  else qualityFactor = 1.0;
  
  // Fungsi sungai mempengaruhi tingkat pencemaran
  if (station.fungsiSungai === 'Pertanian') qualityFactor *= 0.8;
  else if (station.fungsiSungai === 'Domestik') qualityFactor *= 1.0;
  else if (station.fungsiSungai === 'Industri') qualityFactor *= 1.4;
  else qualityFactor *= 1.1;
  
  // Musim hujan (Nov-Mar) = dilusi lebih baik
  const isRainySeason = month >= 10 || month <= 2;
  if (isRainySeason) qualityFactor *= 0.8;
  
  // Parameter Fisika
  const suhu = 26 + Math.random() * 4;
  const tds = (150 + Math.random() * 200) * qualityFactor;
  const tss = (20 + Math.random() * 80) * qualityFactor;
  const kekeruhan = (5 + Math.random() * 40) * qualityFactor;
  const warna = (10 + Math.random() * 40) * qualityFactor;
  
  // Parameter Kimia
  const ph = 6.5 + Math.random() * 2;
  const doValue = 7 - (qualityFactor * 2) + Math.random();
  const bod = (2 + Math.random() * 8) * qualityFactor;
  const cod = (10 + Math.random() * 40) * qualityFactor;
  const amonia = (0.02 + Math.random() * 0.5) * qualityFactor;
  const nitrat = (1 + Math.random() * 8) * qualityFactor;
  const nitrit = (0.01 + Math.random() * 0.15) * qualityFactor;
  const fosfat = (0.05 + Math.random() * 0.4) * qualityFactor;
  const sulfat = (20 + Math.random() * 80) * qualityFactor;
  const klorida = (50 + Math.random() * 200) * qualityFactor;
  
  // Logam Berat (konsentrasi rendah dalam mg/L)
  const besi = (0.1 + Math.random() * 0.8) * qualityFactor;
  const mangan = (0.05 + Math.random() * 0.3) * qualityFactor;
  const tembaga = (0.01 + Math.random() * 0.05) * qualityFactor;
  const seng = (0.02 + Math.random() * 0.15) * qualityFactor;
  const timbal = (0.005 + Math.random() * 0.02) * qualityFactor;
  const kadmium = (0.001 + Math.random() * 0.005) * qualityFactor;
  const merkuri = (0.0001 + Math.random() * 0.001) * qualityFactor;
  
  // Mikrobiologi
  const koli = Math.floor((100 + Math.random() * 900) * qualityFactor);
  const eKoli = Math.floor((20 + Math.random() * 180) * qualityFactor);
  
  // Hitung indeks kualitas (lebih tinggi = lebih baik)
  let indeksKualitas = 100;
  indeksKualitas -= (qualityFactor * 30);
  indeksKualitas -= (bod > 3 ? (bod - 3) * 2 : 0);
  indeksKualitas -= (cod > 25 ? (cod - 25) * 0.5 : 0);
  indeksKualitas -= (doValue < 5 ? (5 - doValue) * 5 : 0);
  indeksKualitas = Math.max(0, Math.min(100, indeksKualitas));
  
  // Status mutu berdasarkan indeks
  let statusMutu: 'Baik' | 'Sedang' | 'Cemar Ringan' | 'Cemar Sedang' | 'Cemar Berat';
  if (indeksKualitas >= 80) statusMutu = 'Baik';
  else if (indeksKualitas >= 60) statusMutu = 'Sedang';
  else if (indeksKualitas >= 40) statusMutu = 'Cemar Ringan';
  else if (indeksKualitas >= 20) statusMutu = 'Cemar Sedang';
  else statusMutu = 'Cemar Berat';
  
  return {
    id: `wqd-${station.kodeLokasi}-${dateStr}`,
    kodeLokasi: station.kodeLokasi,
    tanggalPengukuran: dateStr,
    suhu: Math.round(suhu * 10) / 10,
    tds: Math.round(tds * 10) / 10,
    tss: Math.round(tss * 10) / 10,
    kekeruhan: Math.round(kekeruhan * 10) / 10,
    warna: Math.round(warna),
    ph: Math.round(ph * 100) / 100,
    do: Math.round(doValue * 100) / 100,
    bod: Math.round(bod * 100) / 100,
    cod: Math.round(cod * 100) / 100,
    amonia: Math.round(amonia * 1000) / 1000,
    nitrat: Math.round(nitrat * 100) / 100,
    nitrit: Math.round(nitrit * 1000) / 1000,
    fosfat: Math.round(fosfat * 1000) / 1000,
    sulfat: Math.round(sulfat * 10) / 10,
    klorida: Math.round(klorida * 10) / 10,
    besi: Math.round(besi * 1000) / 1000,
    mangan: Math.round(mangan * 1000) / 1000,
    tembaga: Math.round(tembaga * 10000) / 10000,
    seng: Math.round(seng * 10000) / 10000,
    timbal: Math.round(timbal * 10000) / 10000,
    kadmium: Math.round(kadmium * 100000) / 100000,
    merkuri: Math.round(merkuri * 1000000) / 1000000,
    koli,
    eKoli,
    statusMutu,
    indeksKualitas: Math.round(indeksKualitas)
  };
}

// Generate data untuk 12 bulan terakhir (Nov 2023 - Oct 2024)
waterQualityStations.forEach(station => {
  for (let i = 0; i < 12; i++) {
    const month = (9 - i + 12) % 12; // Oct 2024 back to Nov 2023
    const year = month > 9 ? 2023 : 2024;
    waterQualityData.push(generateWaterQuality(station, month, year));
  }
});

/**
 * Fetch water quality data with filtering
 */
export async function fetchWaterQualityData(
  options: {
    kodeLokasi?: string;
    tanggalMulai?: string;
    tanggalAkhir?: string;
    statusMutu?: string;
    delay?: number;
  } = {}
): Promise<WaterQualityData[]> {
  const { kodeLokasi, tanggalMulai, tanggalAkhir, statusMutu, delay = 300 } = options;

  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...waterQualityData];

      if (kodeLokasi) {
        filtered = filtered.filter(d => d.kodeLokasi === kodeLokasi);
      }

      if (tanggalMulai) {
        filtered = filtered.filter(d => d.tanggalPengukuran >= tanggalMulai);
      }

      if (tanggalAkhir) {
        filtered = filtered.filter(d => d.tanggalPengukuran <= tanggalAkhir);
      }

      if (statusMutu) {
        filtered = filtered.filter(d => d.statusMutu === statusMutu);
      }

      // Sort by date descending
      filtered.sort((a, b) => b.tanggalPengukuran.localeCompare(a.tanggalPengukuran));

      resolve(filtered);
    }, delay);
  });
}

/**
 * Get water quality statistics by station
 */
export async function getWaterQualityStatsByStation(kodeLokasi: string): Promise<{
  rataIndeksKualitas: number;
  rataDO: number;
  rataBOD: number;
  rataCOD: number;
  rataPH: number;
  statusTerbanyak: string;
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stationData = waterQualityData.filter(d => d.kodeLokasi === kodeLokasi);
      
      if (stationData.length === 0) {
        resolve({
          rataIndeksKualitas: 0,
          rataDO: 0,
          rataBOD: 0,
          rataCOD: 0,
          rataPH: 0,
          statusTerbanyak: 'N/A'
        });
        return;
      }

      const stats = stationData.reduce(
        (acc, curr) => ({
          totalIndeks: acc.totalIndeks + curr.indeksKualitas,
          totalDO: acc.totalDO + curr.do,
          totalBOD: acc.totalBOD + curr.bod,
          totalCOD: acc.totalCOD + curr.cod,
          totalPH: acc.totalPH + curr.ph,
          statusCount: {
            ...acc.statusCount,
            [curr.statusMutu]: (acc.statusCount[curr.statusMutu] || 0) + 1
          }
        }),
        { totalIndeks: 0, totalDO: 0, totalBOD: 0, totalCOD: 0, totalPH: 0, statusCount: {} as Record<string, number> }
      );

      const statusTerbanyak = Object.entries(stats.statusCount)
        .sort((a, b) => b[1] - a[1])[0][0];

      resolve({
        rataIndeksKualitas: Math.round(stats.totalIndeks / stationData.length),
        rataDO: Math.round((stats.totalDO / stationData.length) * 100) / 100,
        rataBOD: Math.round((stats.totalBOD / stationData.length) * 100) / 100,
        rataCOD: Math.round((stats.totalCOD / stationData.length) * 100) / 100,
        rataPH: Math.round((stats.totalPH / stationData.length) * 100) / 100,
        statusTerbanyak
      });
    }, 300);
  });
}

/**
 * Get water quality comparison across all stations
 */
export async function getWaterQualityComparison(): Promise<Array<{
  kodeLokasi: string;
  namaLokasi: string;
  indeksKualitas: number;
  statusMutu: string;
}>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const comparison = waterQualityStations.map(station => {
        const latestData = waterQualityData
          .filter(d => d.kodeLokasi === station.kodeLokasi)
          .sort((a, b) => b.tanggalPengukuran.localeCompare(a.tanggalPengukuran))[0];

        return {
          kodeLokasi: station.kodeLokasi,
          namaLokasi: station.namaLokasi,
          indeksKualitas: latestData ? latestData.indeksKualitas : 0,
          statusMutu: latestData ? latestData.statusMutu : 'N/A'
        };
      });

      resolve(comparison);
    }, 300);
  });
}

/**
 * Fetch water quality stations
 */
export async function fetchWaterQualityStations(delay: number = 300): Promise<WaterQualityStation[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...waterQualityStations]), delay);
  });
}

export { waterQualityData as default };
