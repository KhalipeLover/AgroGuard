/**
 * Demo FAQ Data
 * 
 * Mock data for Frequently Asked Questions section
 * Simulates async API call
 */

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  // General
  {
    question: 'Apa itu AGROGUARD IoT?',
    answer: 'AGROGUARD IoT adalah sistem monitoring pertanian cerdas berbasis Internet of Things (IoT) yang membantu petani memantau kondisi tanaman secara real-time, mengoptimalkan penggunaan air dan sumber daya, serta meningkatkan produktivitas hasil panen.',
    category: 'General'
  },
  {
    question: 'Siapa yang bisa menggunakan AGROGUARD IoT?',
    answer: 'AGROGUARD IoT dirancang untuk berbagai skala pertanian - mulai dari petani individu, komunitas desa, urban farming, hingga perusahaan agrikultur besar. Sistem kami fleksibel dan dapat disesuaikan dengan kebutuhan masing-masing.',
    category: 'General'
  },
  {
    question: 'Apa manfaat utama menggunakan AGROGUARD IoT?',
    answer: 'Manfaat utama meliputi: efisiensi penggunaan air hingga 95%, penghematan energi 40%, monitoring real-time 24/7, notifikasi dini masalah tanaman, data analytics untuk keputusan lebih baik, dan peningkatan produktivitas hasil panen hingga 30%.',
    category: 'General'
  },
  
  // Technical
  {
    question: 'Bagaimana cara setup device IoT pertama kali?',
    answer: 'Setup sangat mudah! Cukup 3 langkah: (1) Hubungkan device ke WiFi, (2) Pasang sensor di lahan, (3) Daftar akun dan mulai monitoring. Proses setup hanya membutuhkan 10-15 menit dan tidak memerlukan keahlian teknis khusus.',
    category: 'Technical'
  },
  {
    question: 'Apakah device AGROGUARD tahan air dan cuaca ekstrem?',
    answer: 'Ya! Semua device AGROGUARD dirancang dengan standar IP67 - tahan air, debu, dan cuaca ekstrem. Device dapat beroperasi normal di suhu -10°C hingga 60°C dan tahan terhadap hujan deras, panas terik, dan kelembapan tinggi.',
    category: 'Technical'
  },
  {
    question: 'Berapa jangkauan koneksi WiFi yang dibutuhkan?',
    answer: 'Device AGROGUARD memiliki WiFi range hingga 100 meter di area terbuka. Untuk area lebih luas, kami menyediakan WiFi extender dan mesh network solution. Device juga support koneksi 4G/LTE sebagai backup jika WiFi tidak tersedia.',
    category: 'Technical'
  },
  {
    question: 'Sensor apa saja yang tersedia?',
    answer: 'AGROGUARD menyediakan berbagai sensor: kelembapan tanah dengan threshold berbasis tanaman, suhu udara, kelembapan udara, pH tanah, NPK (nitrogen-fosfor-kalium), curah hujan, kecepatan angin, dan tekanan udara. Sistem kami memberikan rekomendasi penyiraman otomatis berdasarkan jenis tanaman yang Anda tanam (Cabe Rawit, Tomat, Bawang Merah, Melon, Semangka).',
    category: 'Technical'
  },
  
  // Data & Security
  {
    question: 'Apakah data saya aman?',
    answer: 'Keamanan data adalah prioritas utama kami. Kami menggunakan enkripsi end-to-end (AES-256), cloud backup otomatis, dan compliance dengan standar ISO 27001. Data Anda hanya dapat diakses oleh Anda dan tidak akan dibagikan ke pihak ketiga.',
    category: 'Data & Security'
  },
  {
    question: 'Berapa lama data tersimpan?',
    answer: 'Data monitoring tersimpan permanent di cloud. Anda dapat mengakses historical data kapan saja untuk analisis jangka panjang. Kami juga menyediakan fitur export data dalam format CSV, Excel, dan PDF.',
    category: 'Data & Security'
  },
  {
    question: 'Apakah saya bisa mengakses data secara offline?',
    answer: 'Device akan menyimpan data secara lokal saat koneksi terputus dan otomatis sinkronisasi ketika koneksi kembali. Aplikasi dashboard juga memiliki mode offline untuk melihat data yang sudah di-cache sebelumnya.',
    category: 'Data & Security'
  },
  
  // Support & Pricing
  {
    question: 'Berapa biaya berlangganan AGROGUARD IoT?',
    answer: 'Biaya investasi AGROGUARD IoT sangat terjangkau dan disesuaikan dengan skala lahan Anda. Kami menawarkan berbagai paket mulai dari paket pemula hingga enterprise. Untuk mendapatkan estimasi biaya yang akurat dan ROI sesuai lokasi serta luas lahan Anda, silakan gunakan Kalkulator ROI kami. Anda akan melihat perhitungan detail investasi hardware, biaya berlangganan, dan proyeksi penghematan yang bisa dicapai.',
    category: 'Support & Pricing'
  },
  {
    question: 'Apakah ada trial period?',
    answer: 'Ya! Kami menyediakan demo dan konsultasi gratis untuk membantu Anda memahami sistem AGROGUARD IoT. Anda dapat menggunakan Kalkulator ROI kami untuk melihat estimasi biaya dan manfaat sesuai kondisi lahan Anda. Tim kami juga siap memberikan presentasi demo langsung dan menjawab semua pertanyaan Anda sebelum memutuskan untuk berinvestasi.',
    category: 'Support & Pricing'
  },
  {
    question: 'Bagaimana cara mendapatkan support teknis?',
    answer: 'Kami menyediakan support 24/7 melalui: (1) Live chat di dashboard, (2) Email ke support@agroguard.id, (3) WhatsApp hotline, (4) Video call untuk troubleshooting kompleks. Response time rata-rata kami adalah < 2 jam.',
    category: 'Support & Pricing'
  },
  {
    question: 'Apakah ada garansi device?',
    answer: 'Semua device AGROGUARD dilengkapi garansi 2 tahun untuk kerusakan manufaktur. Kami juga menyediakan extended warranty dan insurance untuk kerusakan akibat bencana alam. Free replacement unit tersedia selama masa garansi.',
    category: 'Support & Pricing'
  }
];

/**
 * Simulates API call to fetch all FAQs
 * @param delay Optional delay in milliseconds (default: 400ms)
 * @returns Promise<FAQItem[]>
 */
export async function fetchFAQ(delay: number = 400): Promise<FAQItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(faqData);
    }, delay);
  });
}

/**
 * Fetch FAQs by category
 * @param category Category name
 * @param delay Optional delay in milliseconds
 * @returns Promise<FAQItem[]>
 */
export async function fetchFAQByCategory(category: string, delay: number = 300): Promise<FAQItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const items = faqData.filter(faq => faq.category === category);
      resolve(items);
    }, delay);
  });
}

/**
 * Search FAQs by keyword
 * @param keyword Search keyword
 * @param delay Optional delay in milliseconds
 * @returns Promise<FAQItem[]>
 */
export async function searchFAQ(keyword: string, delay: number = 200): Promise<FAQItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowerKeyword = keyword.toLowerCase();
      const results = faqData.filter(faq => 
        faq.question.toLowerCase().includes(lowerKeyword) || 
        faq.answer.toLowerCase().includes(lowerKeyword)
      );
      resolve(results);
    }, delay);
  });
}

/**
 * Get all FAQ categories
 * @returns string[] Array of unique categories
 */
export function getFAQCategories(): string[] {
  return Array.from(new Set(faqData.map(faq => faq.category)));
}

export default faqData;
