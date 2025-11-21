/**
 * ROI Calculator Recommendations Data (Hortikultura)
 * Rekomendasi jenis tanaman buah & sayur, luas lahan minimal 1m²,
 * sistem irigasi otomatis dengan sensor DHT + Soil Moisture
 * berdasarkan karakteristik kabupaten/kota di Jawa Timur
 */

export interface ROIRecommendation {
  kabupaten: string;
  recommendations: {
    // Tanaman yang direkomendasikan (hortikultura)
    tanamanUtama: 'cabai' | 'tomat' | 'selada' | 'sawi' | 'bayam' | 'kangkung' | 'terong' | 'timun' | 'pakcoy';
    tanamanAlternatif: string[];
    
    // Luas lahan optimal untuk ROI terbaik (dalam m²)
    luasLahanMin: number; // meter persegi (minimal 1m²)
    luasLahanOptimal: number; // meter persegi
    luasLahanMax: number; // meter persegi
    
    // Sistem irigasi yang tersedia (IoT-based)
    sistemIrigasiTersedia: ('manual' | 'otomatis-iot' | 'drip-manual')[];
    sistemIrigasiRekomendasi: 'manual' | 'otomatis-iot' | 'drip-manual';
    
    // Alasan rekomendasi
    alasanTanaman: string;
    alasanLuas: string;
    alasanIrigasi: string;
    
    // Potensi hasil
    potensiHasilPerM2: number; // kg per m² per tahun
    hargaJualPerKg: number; // Rupiah per kg
    tingkatKeberhasilan: 'Tinggi' | 'Sedang' | 'Rendah';
    
    // IoT Sensor specific
    sensorDHT: boolean; // Temperature & Humidity
    sensorSoilMoisture: boolean; // Soil Moisture
    automationLevel: 'Penuh' | 'Sebagian' | 'Manual';
  };
}

const roiRecommendations: ROIRecommendation[] = [
  {
    kabupaten: 'KOTA BATU',
    recommendations: {
      tanamanUtama: 'tomat',
      tanamanAlternatif: ['Strawberry', 'Selada', 'Paprika', 'Cabai', 'Brokoli'],
      luasLahanMin: 5,
      luasLahanOptimal: 100,
      luasLahanMax: 5000,
      sistemIrigasiTersedia: ['otomatis-iot', 'drip-manual'],
      sistemIrigasiRekomendasi: 'otomatis-iot',
      alasanTanaman: 'Iklim sejuk dataran tinggi sangat ideal untuk tomat premium. Permintaan pasar tinggi dari restoran & hotel.',
      alasanLuas: 'Urban farming 100m² optimal untuk produktivitas maksimal dengan IoT monitoring.',
      alasanIrigasi: 'IoT automation dengan drip irrigation meningkatkan efisiensi air 50%.',
      potensiHasilPerM2: 12,
      hargaJualPerKg: 18000,
      tingkatKeberhasilan: 'Tinggi',
      sensorDHT: true,
      sensorSoilMoisture: true,
      automationLevel: 'Penuh'
    }
  },
  {
    kabupaten: 'KABUPATEN MALANG',
    recommendations: {
      tanamanUtama: 'cabai',
      tanamanAlternatif: ['Tomat', 'Terong', 'Sawi', 'Kangkung', 'Brokoli'],
      luasLahanMin: 2,
      luasLahanOptimal: 200,
      luasLahanMax: 10000,
      sistemIrigasiTersedia: ['otomatis-iot', 'drip-manual', 'manual'],
      sistemIrigasiRekomendasi: 'otomatis-iot',
      alasanTanaman: 'Cabai varietas lokal dengan harga jual tinggi. Produktivitas sangat baik dengan IoT monitoring.',
      alasanLuas: '200m² memberikan hasil optimal dengan manajemen efisien menggunakan sensor otomatis.',
      alasanIrigasi: 'Sistem IoT menghemat air 50% dan meningkatkan hasil panen 35%.',
      potensiHasilPerM2: 8,
      hargaJualPerKg: 25000,
      tingkatKeberhasilan: 'Tinggi',
      sensorDHT: true,
      sensorSoilMoisture: true,
      automationLevel: 'Penuh'
    }
  },
  {
    kabupaten: 'KABUPATEN PASURUAN',
    recommendations: {
      tanamanUtama: 'tomat',
      tanamanAlternatif: ['Cabai', 'Timun', 'Terong', 'Melon', 'Semangka'],
      luasLahanMin: 3,
      luasLahanOptimal: 150,
      luasLahanMax: 8000,
      sistemIrigasiTersedia: ['otomatis-iot', 'drip-manual'],
      sistemIrigasiRekomendasi: 'otomatis-iot',
      alasanTanaman: 'Tomat komersial dengan permintaan tinggi dari pasar regional. Cuaca stabil sepanjang tahun.',
      alasanLuas: '150m² optimal untuk petani kecil-menengah dengan ROI cepat (8-10 bulan).',
      alasanIrigasi: 'Otomasi IoT mengurangi tenaga kerja 40% dan meningkatkan kualitas produk.',
      potensiHasilPerM2: 12,
      hargaJualPerKg: 15000,
      tingkatKeberhasilan: 'Tinggi',
      sensorDHT: true,
      sensorSoilMoisture: true,
      automationLevel: 'Penuh'
    }
  },
  {
    kabupaten: 'KABUPATEN LUMAJANG',
    recommendations: {
      tanamanUtama: 'cabai',
      tanamanAlternatif: ['Tomat', 'Terong', 'Sawi', 'Kangkung'],
      luasLahanMin: 2,
      luasLahanOptimal: 120,
      luasLahanMax: 6000,
      sistemIrigasiTersedia: ['otomatis-iot', 'drip-manual', 'manual'],
      sistemIrigasiRekomendasi: 'otomatis-iot',
      alasanTanaman: 'Cabai rawit dan cabai merah dengan produktivitas tinggi. Cocok untuk climate lokal.',
      alasanLuas: '120m² memberikan income stabil dengan management sederhana via smartphone.',
      alasanIrigasi: 'IoT monitoring mengoptimalkan penggunaan air dan pupuk cair.',
      potensiHasilPerM2: 8,
      hargaJualPerKg: 22000,
      tingkatKeberhasilan: 'Tinggi',
      sensorDHT: true,
      sensorSoilMoisture: true,
      automationLevel: 'Penuh'
    }
  },
  {
    kabupaten: 'KABUPATEN KEDIRI',
    recommendations: {
      tanamanUtama: 'sawi',
      tanamanAlternatif: ['Selada', 'Kangkung', 'Bayam', 'Pakcoy', 'Tomat'],
      luasLahanMin: 1,
      luasLahanOptimal: 80,
      luasLahanMax: 5000,
      sistemIrigasiTersedia: ['otomatis-iot', 'drip-manual', 'manual'],
      sistemIrigasiRekomendasi: 'otomatis-iot',
      alasanTanaman: 'Sayuran leafy green dengan siklus panen cepat (25-30 hari). Permintaan pasar konsisten.',
      alasanLuas: 'Lahan minimal 1m² bisa dimulai! 80m² optimal untuk pendapatan bulanan stabil.',
      alasanIrigasi: 'IoT menjaga kelembapan optimal untuk pertumbuhan cepat dan hasil maksimal.',
      potensiHasilPerM2: 14,
      hargaJualPerKg: 12000,
      tingkatKeberhasilan: 'Tinggi',
      sensorDHT: true,
      sensorSoilMoisture: true,
      automationLevel: 'Penuh'
    }
  },
  {
    kabupaten: 'KABUPATEN BLITAR',
    recommendations: {
      tanamanUtama: 'tomat',
      tanamanAlternatif: ['Cabai', 'Terong', 'Timun', 'Kangkung'],
      luasLahanMin: 2,
      luasLahanOptimal: 100,
      luasLahanMax: 6000,
      sistemIrigasiTersedia: ['otomatis-iot', 'drip-manual'],
      sistemIrigasiRekomendasi: 'otomatis-iot',
      alasanTanaman: 'Tomat cherry dan tomat lokal dengan harga jual premium di pasar modern.',
      alasanLuas: '100m² memberikan ROI dalam 10-12 bulan dengan monitoring IoT.',
      alasanIrigasi: 'Automation menghemat waktu dan meningkatkan konsistensi kualitas.',
      potensiHasilPerM2: 12,
      hargaJualPerKg: 16000,
      tingkatKeberhasilan: 'Tinggi',
      sensorDHT: true,
      sensorSoilMoisture: true,
      automationLevel: 'Penuh'
    }
  },
  {
    kabupaten: 'KABUPATEN JEMBER',
    recommendations: {
      tanamanUtama: 'cabai',
      tanamanAlternatif: ['Tomat', 'Terong', 'Timun', 'Sawi'],
      luasLahanMin: 3,
      luasLahanOptimal: 150,
      luasLahanMax: 8000,
      sistemIrigasiTersedia: ['otomatis-iot', 'drip-manual', 'manual'],
      sistemIrigasiRekomendasi: 'otomatis-iot',
      alasanTanaman: 'Cabai besar dengan permintaan export tinggi. Iklim tropis mendukung pertumbuhan optimal.',
      alasanLuas: '150m² dengan IoT memberikan produktivitas setara 300m² tradisional.',
      alasanIrigasi: 'IoT automation mencegah overwatering dan underwatering yang sering terjadi.',
      potensiHasilPerM2: 8,
      hargaJualPerKg: 24000,
      tingkatKeberhasilan: 'Tinggi',
      sensorDHT: true,
      sensorSoilMoisture: true,
      automationLevel: 'Penuh'
    }
  },
  {
    kabupaten: 'KABUPATEN BANYUWANGI',
    recommendations: {
      tanamanUtama: 'tomat',
      tanamanAlternatif: ['Cabai', 'Terong', 'Kangkung', 'Timun'],
      luasLahanMin: 2,
      luasLahanOptimal: 120,
      luasLahanMax: 7000,
      sistemIrigasiTersedia: ['otomatis-iot', 'drip-manual'],
      sistemIrigasiRekomendasi: 'otomatis-iot',
      alasanTanaman: 'Tomat dengan permintaan lokal dan regional tinggi. Produktivitas stabil dengan IoT.',
      alasanLuas: '120m² optimal untuk farmer pemula dengan dukungan teknologi sensor.',
      alasanIrigasi: 'IoT monitoring real-time via smartphone meningkatkan efisiensi 45%.',
      potensiHasilPerM2: 12,
      hargaJualPerKg: 14000,
      tingkatKeberhasilan: 'Tinggi',
      sensorDHT: true,
      sensorSoilMoisture: true,
      automationLevel: 'Penuh'
    }
  },
  {
    kabupaten: 'KABUPATEN BONDOWOSO',
    recommendations: {
      tanamanUtama: 'selada',
      tanamanAlternatif: ['Sawi', 'Bayam', 'Kangkung', 'Brokoli', 'Kale'],
      luasLahanMin: 1,
      luasLahanOptimal: 60,
      luasLahanMax: 4000,
      sistemIrigasiTersedia: ['otomatis-iot', 'drip-manual'],
      sistemIrigasiRekomendasi: 'otomatis-iot',
      alasanTanaman: 'Dataran tinggi ideal untuk sayuran premium seperti selada. Pasar cafe & restoran kuat.',
      alasanLuas: 'Urban farming 60m² cocok untuk lahan terbatas dengan hasil maksimal.',
      alasanIrigasi: 'IoT drip irrigation menghemat air 60% di daerah dengan keterbatasan air.',
      potensiHasilPerM2: 15,
      hargaJualPerKg: 18000,
      tingkatKeberhasilan: 'Tinggi',
      sensorDHT: true,
      sensorSoilMoisture: true,
      automationLevel: 'Penuh'
    }
  },
  {
    kabupaten: 'KABUPATEN PROBOLINGGO',
    recommendations: {
      tanamanUtama: 'cabai',
      tanamanAlternatif: ['Tomat', 'Terong', 'Timun', 'Melon'],
      luasLahanMin: 2,
      luasLahanOptimal: 100,
      luasLahanMax: 6000,
      sistemIrigasiTersedia: ['otomatis-iot', 'drip-manual', 'manual'],
      sistemIrigasiRekomendasi: 'otomatis-iot',
      alasanTanaman: 'Cabai merah keriting dengan harga stabil tinggi. Climate tropis mendukung.',
      alasanLuas: '100m² memberikan pendapatan bulanan stabil dengan IoT monitoring.',
      alasanIrigasi: 'Automation mengurangi risiko gagal panen akibat kesalahan irigasi.',
      potensiHasilPerM2: 8,
      hargaJualPerKg: 23000,
      tingkatKeberhasilan: 'Tinggi',
      sensorDHT: true,
      sensorSoilMoisture: true,
      automationLevel: 'Penuh'
    }
  },
  {
    kabupaten: 'KOTA SURABAYA',
    recommendations: {
      tanamanUtama: 'selada',
      tanamanAlternatif: ['Bayam', 'Kangkung', 'Pakcoy', 'Sawi'],
      luasLahanMin: 1,
      luasLahanOptimal: 50,
      luasLahanMax: 2000,
      sistemIrigasiTersedia: ['otomatis-iot', 'drip-manual'],
      sistemIrigasiRekomendasi: 'otomatis-iot',
      alasanTanaman: 'Urban farming di rooftop/balkon. Sayuran hijau premium untuk pasar urban.',
      alasanLuas: 'Lahan minimal 1m² bisa dimulai! 50m² optimal untuk hobby farmer urban.',
      alasanIrigasi: 'IoT automation perfect untuk urban dwellers yang sibuk. Monitor via smartphone.',
      potensiHasilPerM2: 15,
      hargaJualPerKg: 20000,
      tingkatKeberhasilan: 'Tinggi',
      sensorDHT: true,
      sensorSoilMoisture: true,
      automationLevel: 'Penuh'
    }
  },
  {
    kabupaten: 'KOTA MALANG',
    recommendations: {
      tanamanUtama: 'tomat',
      tanamanAlternatif: ['Selada', 'Sawi', 'Brokoli', 'Strawberry'],
      luasLahanMin: 2,
      luasLahanOptimal: 80,
      luasLahanMax: 4000,
      sistemIrigasiTersedia: ['otomatis-iot', 'drip-manual'],
      sistemIrigasiRekomendasi: 'otomatis-iot',
      alasanTanaman: 'Iklim sejuk ideal untuk tomat premium & sayuran dataran tinggi. Pasar urban kuat.',
      alasanLuas: '80m² optimal untuk urban farming dengan ROI cepat 8 bulan.',
      alasanIrigasi: 'IoT monitoring menjaga suhu & kelembapan optimal untuk climate sejuk.',
      potensiHasilPerM2: 12,
      hargaJualPerKg: 19000,
      tingkatKeberhasilan: 'Tinggi',
      sensorDHT: true,
      sensorSoilMoisture: true,
      automationLevel: 'Penuh'
    }
  },
  {
    kabupaten: 'KABUPATEN SIDOARJO',
    recommendations: {
      tanamanUtama: 'kangkung',
      tanamanAlternatif: ['Bayam', 'Sawi', 'Pakcoy', 'Selada'],
      luasLahanMin: 1,
      luasLahanOptimal: 80,
      luasLahanMax: 5000,
      sistemIrigasiTersedia: ['otomatis-iot', 'drip-manual', 'manual'],
      sistemIrigasiRekomendasi: 'otomatis-iot',
      alasanTanaman: 'Kangkung darat dengan siklus panen super cepat (20-25 hari). Permintaan pasar sangat tinggi.',
      alasanLuas: 'Lahan minimal 1m² bisa panen! 80m² menghasilkan income bulanan konsisten.',
      alasanIrigasi: 'IoT menjaga kelembapan tinggi yang dibutuhkan kangkung untuk pertumbuhan cepat.',
      potensiHasilPerM2: 16,
      hargaJualPerKg: 10000,
      tingkatKeberhasilan: 'Tinggi',
      sensorDHT: true,
      sensorSoilMoisture: true,
      automationLevel: 'Penuh'
    }
  },
  {
    kabupaten: 'KABUPATEN GRESIK',
    recommendations: {
      tanamanUtama: 'bayam',
      tanamanAlternatif: ['Kangkung', 'Sawi', 'Pakcoy', 'Tomat'],
      luasLahanMin: 1,
      luasLahanOptimal: 70,
      luasLahanMax: 4000,
      sistemIrigasiTersedia: ['otomatis-iot', 'drip-manual'],
      sistemIrigasiRekomendasi: 'otomatis-iot',
      alasanTanaman: 'Bayam hijau & bayam merah dengan permintaan pasar tradisional & modern tinggi.',
      alasanLuas: '70m² optimal untuk petani pemula dengan teknologi IoT support.',
      alasanIrigasi: 'Automation mengurangi water stress dan meningkatkan kualitas daun.',
      potensiHasilPerM2: 14,
      hargaJualPerKg: 11000,
      tingkatKeberhasilan: 'Tinggi',
      sensorDHT: true,
      sensorSoilMoisture: true,
      automationLevel: 'Penuh'
    }
  },
  {
    kabupaten: 'KABUPATEN MOJOKERTO',
    recommendations: {
      tanamanUtama: 'sawi',
      tanamanAlternatif: ['Pakcoy', 'Kangkung', 'Bayam', 'Tomat'],
      luasLahanMin: 1,
      luasLahanOptimal: 80,
      luasLahanMax: 4500,
      sistemIrigasiTersedia: ['otomatis-iot', 'drip-manual', 'manual'],
      sistemIrigasiRekomendasi: 'otomatis-iot',
      alasanTanaman: 'Sawi putih & sawi hijau dengan siklus panen 30 hari. ROI cepat.',
      alasanLuas: 'Lahan minimal 1m² cocok untuk test. 80m² memberikan cash flow bulanan.',
      alasanIrigasi: 'IoT automation perfect untuk busy farmers. Monitor from anywhere.',
      potensiHasilPerM2: 14,
      hargaJualPerKg: 12000,
      tingkatKeberhasilan: 'Tinggi',
      sensorDHT: true,
      sensorSoilMoisture: true,
      automationLevel: 'Penuh'
    }
  },
  {
    kabupaten: 'KABUPATEN JOMBANG',
    recommendations: {
      tanamanUtama: 'tomat',
      tanamanAlternatif: ['Cabai', 'Terong', 'Timun', 'Kangkung'],
      luasLahanMin: 2,
      luasLahanOptimal: 100,
      luasLahanMax: 6000,
      sistemIrigasiTersedia: ['otomatis-iot', 'drip-manual'],
      sistemIrigasiRekomendasi: 'otomatis-iot',
      alasanTanaman: 'Tomat lokal dengan kualitas bagus. Akses pasar regional mudah.',
      alasanLuas: '100m² memberikan balance antara investasi dan return yang optimal.',
      alasanIrigasi: 'IoT drip irrigation meningkatkan efisiensi water usage 45%.',
      potensiHasilPerM2: 12,
      hargaJualPerKg: 15000,
      tingkatKeberhasilan: 'Tinggi',
      sensorDHT: true,
      sensorSoilMoisture: true,
      automationLevel: 'Penuh'
    }
  },
  {
    kabupaten: 'KABUPATEN NGANJUK',
    recommendations: {
      tanamanUtama: 'cabai',
      tanamanAlternatif: ['Tomat', 'Terong', 'Sawi', 'Kangkung'],
      luasLahanMin: 2,
      luasLahanOptimal: 120,
      luasLahanMax: 7000,
      sistemIrigasiTersedia: ['otomatis-iot', 'drip-manual', 'manual'],
      sistemIrigasiRekomendasi: 'otomatis-iot',
      alasanTanaman: 'Cabai rawit super pedas dengan harga jual premium untuk export.',
      alasanLuas: '120m² dengan IoT menghasilkan yield setara 250m² traditional farming.',
      alasanIrigasi: 'Smart irrigation mengurangi penyakit tanaman akibat overwatering.',
      potensiHasilPerM2: 8,
      hargaJualPerKg: 26000,
      tingkatKeberhasilan: 'Tinggi',
      sensorDHT: true,
      sensorSoilMoisture: true,
      automationLevel: 'Penuh'
    }
  },
  {
    kabupaten: 'KABUPATEN MADIUN',
    recommendations: {
      tanamanUtama: 'tomat',
      tanamanAlternatif: ['Cabai', 'Terong', 'Kangkung', 'Sawi'],
      luasLahanMin: 2,
      luasLahanOptimal: 100,
      luasLahanMax: 6000,
      sistemIrigasiTersedia: ['otomatis-iot', 'drip-manual'],
      sistemIrigasiRekomendasi: 'otomatis-iot',
      alasanTanaman: 'Tomat dengan kualitas konsisten untuk pasar modern & traditional.',
      alasanLuas: '100m² optimal untuk ROI 10-12 bulan dengan smart monitoring.',
      alasanIrigasi: 'IoT automation meningkatkan crop quality dan market value.',
      potensiHasilPerM2: 12,
      hargaJualPerKg: 14000,
      tingkatKeberhasilan: 'Tinggi',
      sensorDHT: true,
      sensorSoilMoisture: true,
      automationLevel: 'Penuh'
    }
  },
  {
    kabupaten: 'KABUPATEN MAGETAN',
    recommendations: {
      tanamanUtama: 'tomat',
      tanamanAlternatif: ['Cabai', 'Brokoli', 'Sawi', 'Selada'],
      luasLahanMin: 2,
      luasLahanOptimal: 90,
      luasLahanMax: 5000,
      sistemIrigasiTersedia: ['otomatis-iot', 'drip-manual'],
      sistemIrigasiRekomendasi: 'otomatis-iot',
      alasanTanaman: 'Dataran tinggi cocok untuk tomat premium dan sayuran sejuk.',
      alasanLuas: '90m² dengan IoT memberikan produktivitas tinggi dengan effort minimal.',
      alasanIrigasi: 'Smart sensors menjaga kondisi optimal untuk climate sejuk.',
      potensiHasilPerM2: 12,
      hargaJualPerKg: 17000,
      tingkatKeberhasilan: 'Tinggi',
      sensorDHT: true,
      sensorSoilMoisture: true,
      automationLevel: 'Penuh'
    }
  },
  {
    kabupaten: 'KABUPATEN PONOROGO',
    recommendations: {
      tanamanUtama: 'cabai',
      tanamanAlternatif: ['Tomat', 'Terong', 'Sawi', 'Kangkung'],
      luasLahanMin: 2,
      luasLahanOptimal: 110,
      luasLahanMax: 6000,
      sistemIrigasiTersedia: ['otomatis-iot', 'drip-manual'],
      sistemIrigasiRekomendasi: 'otomatis-iot',
      alasanTanaman: 'Cabai merah & rawit dengan permintaan pasar lokal tinggi.',
      alasanLuas: '110m² optimal untuk produktivitas dengan manageable workload.',
      alasanIrigasi: 'IoT automation reduces labor cost 40% dengan hasil lebih konsisten.',
      potensiHasilPerM2: 8,
      hargaJualPerKg: 22000,
      tingkatKeberhasilan: 'Tinggi',
      sensorDHT: true,
      sensorSoilMoisture: true,
      automationLevel: 'Penuh'
    }
  }
];

/**
 * Get recommendation by kabupaten
 */
export async function fetchROIRecommendation(
  kabupaten: string,
  delay: number = 300
): Promise<ROIRecommendation | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const normalized = kabupaten.toUpperCase().trim();
      const found = roiRecommendations.find(
        r => r.kabupaten.toUpperCase() === normalized
      );
      resolve(found || null);
    }, delay);
  });
}

/**
 * Get all available kabupaten
 */
export function getAvailableKabupaten(): string[] {
  return roiRecommendations.map(r => r.kabupaten).sort();
}

/**
 * Get recommendations by crop type
 */
export function getRecommendationsByCrop(
  cropType: string
): ROIRecommendation[] {
  return roiRecommendations.filter(
    r => r.recommendations.tanamanUtama.toLowerCase() === cropType.toLowerCase() ||
         r.recommendations.tanamanAlternatif.some(
           alt => alt.toLowerCase().includes(cropType.toLowerCase())
         )
  );
}

/**
 * Calculate estimated ROI
 */
export function calculateEstimatedROI(
  luasLahan: number, // m²
  potensiHasilPerM2: number,
  hargaJualPerKg: number,
  deviceCost: number,
  subscriptionCost: number
): {
  revenuePerYear: number;
  totalCostYear1: number;
  profitYear1: number;
  roiPercentage: number;
  breakEvenMonths: number;
} {
  const totalYield = luasLahan * potensiHasilPerM2;
  const revenuePerYear = totalYield * hargaJualPerKg;
  
  // Traditional farming costs
  const traditionalCostPerM2 = 2900; // Rp 2,900/m²/year (water+fertilizer+labor+misc)
  const traditionalCost = luasLahan * traditionalCostPerM2;
  
  // With IoT - cost savings 40%
  const iotFarmingCost = traditionalCost * 0.6; // 40% savings
  
  const totalCostYear1 = deviceCost + (subscriptionCost * 12) + iotFarmingCost;
  const profitYear1 = revenuePerYear - totalCostYear1;
  const roiPercentage = ((profitYear1 / totalCostYear1) * 100);
  
  // Monthly profit calculation
  const monthlyCostAfterDevice = (subscriptionCost + (iotFarmingCost / 12));
  const monthlyRevenue = revenuePerYear / 12;
  const monthlyProfit = monthlyRevenue - monthlyCostAfterDevice;
  
  const breakEvenMonths = monthlyProfit > 0 
    ? Math.ceil(deviceCost / monthlyProfit) 
    : 24;
  
  return {
    revenuePerYear,
    totalCostYear1,
    profitYear1,
    roiPercentage,
    breakEvenMonths
  };
}

export { roiRecommendations as default };
