/**
 * Demo Testimonials Data - v2.0 EXPANDED TO 15 TESTIMONIALS
 * 
 * Mock data for testimonials section
 * Simulates async API call from customer reviews
 */

export interface TestimonialResult {
  label: string;
  value: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  rating: number;
  testimonial: string;
  results: TestimonialResult[];
}

const testimonialsData: Testimonial[] = [
  {
    id: '1',
    name: 'Pak Budi Santoso',
    role: 'Petani Padi',
    company: 'Sawah Berkah',
    location: 'Bandung, Jawa Barat',
    rating: 5,
    testimonial: 'AGROGUARD IoT benar-benar mengubah cara saya bertani. Dengan monitoring real-time dari 2 device, saya bisa tahu kapan waktu tepat untuk irigasi. Hasil panen meningkat 35% dan penggunaan air hemat 40%. Luar biasa!',
    results: [
      { label: 'Peningkatan Hasil', value: '+35%' },
      { label: 'Hemat Air', value: '40%' },
      { label: 'ROI', value: '6 bulan' }
    ]
  },
  {
    id: '2',
    name: 'Ibu Siti Aminah',
    role: 'Urban Farmer',
    company: 'Green Rooftop',
    location: 'Yogyakarta, DIY',
    rating: 5,
    testimonial: 'Sebagai urban farmer, space management sangat penting. AGROGUARD membantu saya optimize setiap meter persegi dengan data yang akurat. Sekarang saya bisa supply sayuran organik ke 5 restoran secara konsisten. Dashboard-nya user-friendly!',
    results: [
      { label: 'Produktivitas', value: '+50%' },
      { label: 'Kualitas', value: 'A+' },
      { label: 'Clients', value: '5 resto' }
    ]
  },
  {
    id: '3',
    name: 'Ahmad Hidayat',
    role: 'Farm Manager',
    company: 'Agro Jaya Farm',
    location: 'Surabaya, Jawa Timur',
    rating: 5,
    testimonial: 'Dengan 10 device tersebar di 5 hektar lahan, saya bisa monitor seluruh farm dari smartphone. Notifikasi alert sangat membantu ketika ada anomali. Tim support juga responsif 24/7. Investasi yang sangat worth it!',
    results: [
      { label: 'Coverage', value: '5 Ha' },
      { label: 'Devices', value: '10 unit' },
      { label: 'Uptime', value: '99.8%' }
    ]
  },
  {
    id: '4',
    name: 'Dewi Kusuma',
    role: 'Greenhouse Manager',
    company: 'Urban Green Indonesia',
    location: 'Jakarta Selatan',
    rating: 5,
    testimonial: 'Greenhouse hidroponik saya kini full automated dengan AGROGUARD. Sensor humidity dan temperature sangat akurat. Data analytics membantu saya predict harvest time dengan precision tinggi. Produksi naik 45%!',
    results: [
      { label: 'Automation', value: '100%' },
      { label: 'Production', value: '+45%' },
      { label: 'Quality', value: 'Premium' }
    ]
  },
  {
    id: '5',
    name: 'Rizky Pratama',
    role: 'Agritech Entrepreneur',
    company: 'Smart Farm Nusantara',
    location: 'Malang, Jawa Timur',
    rating: 5,
    testimonial: 'Saya manage 15 greenhouse dengan AGROGUARD centralized dashboard. Export data ke Excel untuk business analytics sangat mudah. Integration dengan sistem accounting juga lancar. Recommended untuk scale-up farming business!',
    results: [
      { label: 'Greenhouses', value: '15 unit' },
      { label: 'Revenue', value: '+60%' },
      { label: 'Efficiency', value: '85%' }
    ]
  },
  {
    id: '6',
    name: 'Pak Agus Wijaya',
    role: 'Ketua Kelompok Tani',
    company: 'Tani Maju Bersama',
    location: 'Bogor, Jawa Barat',
    rating: 5,
    testimonial: 'AGROGUARD membawa perubahan besar untuk komunitas tani kami. 25 anggota sudah pakai dan hasilnya luar biasa. Training gratis dari tim AGROGUARD sangat membantu petani tradisional adaptasi dengan teknologi IoT.',
    results: [
      { label: 'Members', value: '25 petani' },
      { label: 'Area', value: '15 Ha' },
      { label: 'Growth', value: '+40%' }
    ]
  },
  {
    id: '7',
    name: 'Linda Wijayanti',
    role: 'Horticultural Expert',
    company: 'Flower Paradise',
    location: 'Lembang, Jawa Barat',
    rating: 5,
    testimonial: 'Sebagai petani bunga hias, kontrol suhu dan kelembapan sangat critical. AGROGUARD sensor memberikan data real-time yang sangat membantu menjaga kualitas bunga. Export ke Eropa kini lebih lancar dengan standar kualitas yang konsisten!',
    results: [
      { label: 'Export Ready', value: '95%' },
      { label: 'Quality', value: 'Grade A' },
      { label: 'Waste', value: '-30%' }
    ]
  },
  {
    id: '8',
    name: 'Bambang Setiawan',
    role: 'Organic Farmer',
    company: 'Bio Farm Indonesia',
    location: 'Batu, Jawa Timur',
    rating: 5,
    testimonial: 'Sistem monitoring AGROGUARD sangat cocok untuk organic farming. Saya bisa tracking kondisi tanah tanpa chemical sensors. Data history membantu saya improve soil quality dari bulan ke bulan. Sertifikasi organik jadi lebih mudah!',
    results: [
      { label: 'Organic', value: '100%' },
      { label: 'Soil Health', value: '+55%' },
      { label: 'Price', value: '+35%' }
    ]
  },
  {
    id: '9',
    name: 'Ibu Nur Hidayati',
    role: 'Mushroom Farmer',
    company: 'Jamur Sehat Nusantara',
    location: 'Depok, Jawa Barat',
    rating: 5,
    testimonial: 'Budidaya jamur sangat sensitive terhadap humidity dan temperature. AGROGUARD alert system sangat membantu mencegah crop failure. Sekarang produksi jamur saya stabil dan kualitas top. Customer satisfaction meningkat drastis!',
    results: [
      { label: 'Stability', value: '98%' },
      { label: 'Yield', value: '+42%' },
      { label: 'Rating', value: '4.9/5' }
    ]
  },
  {
    id: '10',
    name: 'Hendra Gunawan',
    role: 'Agribusiness Owner',
    company: 'Sayur Segar Group',
    location: 'Semarang, Jawa Tengah',
    rating: 5,
    testimonial: 'Dengan 20 device di 3 lokasi berbeda, saya bisa monitor semua farm dari satu dashboard. Multi-location management jadi sangat mudah. AGROGUARD analytics membantu optimize resource allocation dan maximize profit!',
    results: [
      { label: 'Locations', value: '3 farm' },
      { label: 'Profit', value: '+70%' },
      { label: 'Scale', value: '20 Ha' }
    ]
  },
  {
    id: '11',
    name: 'Pak Wawan Setyawan',
    role: 'Fruit Farmer',
    company: 'Kebun Melon Manis',
    location: 'Gresik, Jawa Timur',
    rating: 5,
    testimonial: 'Melon farming membutuhkan precision irrigation. AGROGUARD soil moisture sensor sangat akurat dan real-time notification membantu saya respond cepat. Sweetness level melon meningkat dan rejection rate turun 50%!',
    results: [
      { label: 'Sweetness', value: '14 Brix' },
      { label: 'Quality', value: 'Premium' },
      { label: 'Reject', value: '-50%' }
    ]
  },
  {
    id: '12',
    name: 'Siti Maryam',
    role: 'Aquaponics Farmer',
    company: 'Eco Aquaponics',
    location: 'Bekasi, Jawa Barat',
    rating: 5,
    testimonial: 'System aquaponics saya combine fish dan plant. AGROGUARD water quality sensor sangat membantu maintain pH dan temperature optimal. Hasil panen ikan dan sayur meningkat bersamaan. Sistem closed-loop jadi lebih efficient!',
    results: [
      { label: 'Fish Yield', value: '+48%' },
      { label: 'Veggie', value: '+52%' },
      { label: 'Water Save', value: '60%' }
    ]
  },
  {
    id: '13',
    name: 'Doni Prasetyo',
    role: 'Coffee Plantation Owner',
    company: 'Java Coffee Heritage',
    location: 'Garut, Jawa Barat',
    rating: 5,
    testimonial: 'Coffee plantation di altitude tinggi membutuhkan monitoring climate yang akurat. AGROGUARD weather station membantu saya predict frost dan protect tanaman. Coffee quality score meningkat dan harga jual naik signifikan!',
    results: [
      { label: 'Quality', value: '88 pts' },
      { label: 'Price', value: '+45%' },
      { label: 'Award', value: '3 medali' }
    ]
  },
  {
    id: '14',
    name: 'Ibu Ratna Sari',
    role: 'Herb Garden Manager',
    company: 'Herbal Indonesia',
    location: 'Sukabumi, Jawa Barat',
    rating: 5,
    testimonial: 'Budidaya tanaman herbal untuk pharmaceutical membutuhkan dokumentasi yang detail. AGROGUARD data logging sangat membantu compliance dengan GMP standards. Export approval jadi lebih cepat dan buyer confidence meningkat!',
    results: [
      { label: 'GMP', value: 'Certified' },
      { label: 'Export', value: '8 negara' },
      { label: 'Compliance', value: '100%' }
    ]
  },
  {
    id: '15',
    name: 'Pak Yusuf Rahman',
    role: 'Chili Farmer',
    company: 'Cabai Pedas Nusantara',
    location: 'Brebes, Jawa Tengah',
    rating: 5,
    testimonial: 'Cabai sangat sensitive terhadap overwatering. AGROGUARD irrigation controller otomatis adjust based on weather forecast dan soil condition. Penyakit tanaman turun drastis dan hasil panen lebih consistent sepanjang tahun!',
    results: [
      { label: 'Disease', value: '-65%' },
      { label: 'Consistency', value: '92%' },
      { label: 'Income', value: '+55%' }
    ]
  }
];

/**
 * Simulates API call to fetch testimonials
 * @param delay Optional delay in milliseconds (default: 500ms)
 * @returns Promise<Testimonial[]>
 */
export async function fetchTestimonials(delay: number = 500): Promise<Testimonial[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(testimonialsData);
    }, delay);
  });
}

/**
 * Fetch single testimonial by ID
 * @param id Testimonial ID
 * @param delay Optional delay in milliseconds
 * @returns Promise<Testimonial | null>
 */
export async function fetchTestimonialById(id: string, delay: number = 300): Promise<Testimonial | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const testimonial = testimonialsData.find(t => t.id === id);
      resolve(testimonial || null);
    }, delay);
  });
}

export default testimonialsData;
