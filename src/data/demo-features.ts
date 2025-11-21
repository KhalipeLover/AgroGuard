/**
 * Demo Features Data
 * 
 * Mock data for features section
 * Simulates async API call
 */

export interface Feature {
  icon: string; // Icon name from lucide-react
  title: string;
  description: string;
  color: string; // Tailwind color classes
}

const featuresData: Feature[] = [
  {
    icon: 'Droplets',
    title: 'Manajemen Air Cerdas',
    description: 'Optimasi penggunaan air dan kelembapan tanah real-time',
    color: 'text-blue-600 dark:text-blue-400'
  },
  {
    icon: 'Leaf',
    title: 'Smart Plant Thresholds',
    description: 'Sistem rekomendasi penyiraman berbasis jenis tanaman (Cabe, Tomat, Bawang, Melon, Semangka)',
    color: 'text-green-600 dark:text-green-400'
  },
  {
    icon: 'BarChart3',
    title: 'Data Analytics',
    description: 'Analisis prediktif untuk keputusan pertanian yang lebih baik',
    color: 'text-purple-600 dark:text-purple-400'
  },
  {
    icon: 'Bell',
    title: 'Alert System',
    description: 'Notifikasi otomatis saat kondisi kritis terdeteksi',
    color: 'text-red-600 dark:text-red-400'
  },
  {
    icon: 'Shield',
    title: 'Keamanan Data',
    description: 'Enkripsi end-to-end dan cloud backup otomatis',
    color: 'text-gray-600 dark:text-gray-400'
  },
  {
    icon: 'Smartphone',
    title: 'Mobile-First',
    description: 'Akses dari mana saja melalui smartphone atau desktop',
    color: 'text-indigo-600 dark:text-indigo-400'
  }
];

/**
 * Simulates API call to fetch features
 * @param delay Optional delay in milliseconds (default: 350ms)
 * @returns Promise<Feature[]>
 */
export async function fetchFeatures(delay: number = 350): Promise<Feature[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(featuresData);
    }, delay);
  });
}

export default featuresData;
