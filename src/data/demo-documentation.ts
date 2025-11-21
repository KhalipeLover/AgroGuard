/**
 * Demo Documentation Slides Data
 * 
 * Mock data for documentation/tutorial section
 * Simulates async API call
 */

export interface DocumentationSlide {
  id: number;
  category: string;
  title: string;
  description: string;
  image: string;
  categoryColor: string;
  tutorialSteps?: string[];
  videoUrl?: string;
  pdfUrl?: string;
}

const documentationData: DocumentationSlide[] = [
  {
    id: 1,
    category: 'Getting Started',
    title: 'Setup Device Pertama Kali',
    description: 'Panduan lengkap untuk setup device IoT AGROGUARD pertama kali. Mulai dari unboxing, koneksi WiFi, hingga registrasi device ke akun Anda. Proses setup hanya membutuhkan 10-15 menit.',
    image: 'https://images.unsplash.com/photo-1716380703770-c3dd70781e82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBzZXR1cCUyMHRlY2hub2xvZ3klMjBkZXZpY2V8ZW58MXx8fHwxNzYxMjYzMzMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    categoryColor: 'bg-[#3B945E]',
    tutorialSteps: [
      'Buka package dan pastikan semua komponen lengkap (device, kabel USB, sensor)',
      'Hubungkan device ke power adapter atau power bank',
      'Tekan tombol power selama 3 detik hingga LED berkedip biru',
      'Buka aplikasi AGROGUARD dan pilih "Tambah Device Baru"',
      'Scan QR code yang ada di belakang device',
      'Pilih jaringan WiFi dan masukkan password',
      'Tunggu hingga LED berubah hijau (koneksi berhasil)',
      'Beri nama device sesuai lokasi/lahan Anda',
      'Selesai! Device siap monitoring'
    ],
    videoUrl: 'https://youtube.com/watch?v=demo',
    pdfUrl: 'agroguard-setup-guide.pdf'
  },
  {
    id: 2,
    category: 'Dashboard Guide',
    title: 'Navigasi Dashboard & Interface',
    description: 'Tour lengkap interface dashboard AGROGUARD. Pelajari setiap section, cara membaca data sensor, mengakses analytics, dan kustomisasi tampilan sesuai kebutuhan Anda.',
    image: 'https://images.unsplash.com/photo-1748366465774-aaa2160fe78d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkYXNoYm9hcmQlMjBjb21wdXRlciUyMHNjcmVlbnxlbnwxfHx8fDE3NjEyNjMzMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    categoryColor: 'bg-[#0077B6]',
    tutorialSteps: [
      'Login ke dashboard dengan akun yang sudah terdaftar',
      'Pada halaman utama, lihat overview semua device Anda',
      'Klik card device untuk melihat detail sensor real-time',
      'Gunakan tab "Analytics" untuk melihat grafik historical data',
      'Tab "Maps" menunjukkan lokasi semua device di peta',
      'Section "Alerts" menampilkan notifikasi penting',
      'Klik ikon gear untuk mengakses Settings',
      'Gunakan filter tanggal untuk analisis periode tertentu'
    ],
    videoUrl: 'https://youtube.com/watch?v=demo',
    pdfUrl: 'agroguard-dashboard-guide.pdf'
  },
  {
    id: 3,
    category: 'Sensor Setup',
    title: 'Konfigurasi Sensor & Kalibrasi',
    description: 'Cara setup berbagai jenis sensor (kelembapan, suhu, pH, NPK) dan melakukan kalibrasi untuk akurasi maksimal. Includes tips optimal sensor placement untuk hasil terbaik.',
    image: 'https://images.unsplash.com/photo-1758577515333-e71b713059f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwc2Vuc29yJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjEyNjMzMzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    categoryColor: 'bg-[#FFB703]',
    tutorialSteps: [
      'Pasang sensor kelembapan tanah di kedalaman 10-15cm',
      'Tempatkan sensor suhu di area yang teduh',
      'Untuk sensor pH, pastikan probe bersih sebelum digunakan',
      'Sensor NPK harus ditanam di dekat akar tanaman',
      'Lakukan kalibrasi dengan air standar (pH 7.0)',
      'Atur threshold warning di dashboard',
      'Test sensor dengan membandingkan manual measurement',
      'Simpan konfigurasi dan mulai monitoring'
    ],
    videoUrl: 'https://youtube.com/watch?v=demo',
    pdfUrl: 'agroguard-sensor-calibration.pdf'
  },
  {
    id: 4,
    category: 'Data Analytics',
    title: 'Membaca & Menginterpretasi Data',
    description: 'Tutorial mendalam tentang cara membaca data sensor, memahami grafik trends, menggunakan historical data untuk decision making, dan export data untuk analisis lebih lanjut.',
    image: 'https://images.unsplash.com/photo-1758691736498-422201cc57da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwY2hhcnQlMjBzY3JlZW58ZW58MXx8fHwxNzYxMjYzMzMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    categoryColor: 'bg-[#06B6D4]',
    tutorialSteps: [
      'Buka tab Analytics di dashboard device Anda',
      'Pilih sensor yang ingin dianalisis (temperature, humidity, dll)',
      'Atur range tanggal untuk historical data',
      'Perhatikan trend line - naik/turun menunjukkan perubahan',
      'Area berwarna merah = warning zone, perlu tindakan',
      'Area hijau = optimal condition untuk tanaman',
      'Gunakan fitur "Compare" untuk bandingkan beberapa device',
      'Export data ke CSV/Excel untuk analisis lanjutan'
    ],
    videoUrl: 'https://youtube.com/watch?v=demo',
    pdfUrl: 'agroguard-data-analytics.pdf'
  },
  {
    id: 5,
    category: 'Notifications',
    title: 'Setup Alert & Notifikasi',
    description: 'Panduan setup sistem notifikasi untuk berbagai kondisi tanaman. Konfigurasi threshold values, pilih channel notifikasi (email, SMS, push), dan customize alert messages.',
    image: 'https://images.unsplash.com/photo-1606495813362-8efff01b8573?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbm90aWZpY2F0aW9uJTIwYWxlcnR8ZW58MXx8fHwxNzYxMjYzMzMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    categoryColor: 'bg-[#F59E0B]',
    tutorialSteps: [
      'Masuk ke Settings > Notifications',
      'Aktifkan notifikasi untuk parameter yang diinginkan',
      'Set threshold untuk setiap sensor (misal: pH < 6.0)',
      'Pilih channel notifikasi: Email, SMS, atau Push',
      'Atur jadwal notifikasi (realtime/daily summary)',
      'Customize pesan alert sesuai kebutuhan',
      'Test notifikasi dengan tombol "Send Test"',
      'Simpan konfigurasi dan monitor inbox Anda'
    ],
    videoUrl: 'https://youtube.com/watch?v=demo',
    pdfUrl: 'agroguard-notifications-setup.pdf'
  },
  {
    id: 6,
    category: 'Troubleshooting',
    title: 'Common Issues & Solutions',
    description: 'Solusi untuk masalah umum yang mungkin Anda temui. Dari koneksi WiFi terputus, sensor tidak akurat, hingga battery management. Step-by-step troubleshooting guide.',
    image: 'https://images.unsplash.com/photo-1750740628893-a52c9e2dff61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobmljaWFuJTIwdHJvdWJsZXNob290JTIwZWxlY3Ryb25pY3N8ZW58MXx8fHwxNzYxMjYzMzM0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    categoryColor: 'bg-[#EF4444]',
    tutorialSteps: [
      'Device offline? Check power supply dan WiFi connection',
      'LED merah berkedip = low battery, charge segera',
      'Sensor tidak update? Restart device dengan hold button 5 detik',
      'Data tidak akurat? Lakukan re-kalibrasi sensor',
      'Notifikasi spam? Adjust threshold values di Settings',
      'Koneksi lambat? Pindahkan device lebih dekat ke WiFi router',
      'Masih error? Contact support 24/7 via live chat',
      'Factory reset: Hold reset button 10 detik (last resort)'
    ],
    videoUrl: 'https://youtube.com/watch?v=demo',
    pdfUrl: 'agroguard-troubleshooting.pdf'
  }
];

/**
 * Simulates API call to fetch documentation slides
 * @param delay Optional delay in milliseconds (default: 600ms)
 * @returns Promise<DocumentationSlide[]>
 */
export async function fetchDocumentation(delay: number = 600): Promise<DocumentationSlide[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(documentationData);
    }, delay);
  });
}

/**
 * Fetch single documentation slide by ID
 * @param id Slide ID
 * @param delay Optional delay in milliseconds
 * @returns Promise<DocumentationSlide | null>
 */
export async function fetchDocumentationById(id: number, delay: number = 300): Promise<DocumentationSlide | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const slide = documentationData.find(s => s.id === id);
      resolve(slide || null);
    }, delay);
  });
}

/**
 * Fetch documentation slides by category
 * @param category Category name
 * @param delay Optional delay in milliseconds
 * @returns Promise<DocumentationSlide[]>
 */
export async function fetchDocumentationByCategory(category: string, delay: number = 400): Promise<DocumentationSlide[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const slides = documentationData.filter(s => s.category === category);
      resolve(slides);
    }, delay);
  });
}

export default documentationData;
