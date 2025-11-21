/**
 * Demo How It Works Steps Data
 * 
 * Mock data for how it works section
 * Simulates async API call
 */

export interface HowItWorksStep {
  step: string;
  title: string;
  description: string;
  color: string; // Tailwind background color classes
  icon: string; // Icon name from lucide-react
}

const howItWorksData: HowItWorksStep[] = [
  {
    step: '1',
    title: 'Daftarkan Device',
    description: 'Hubungkan device IoT melalui WiFi setup yang mudah dan cepat',
    color: 'bg-[#3B945E] dark:bg-[#4CAF6E]',
    icon: 'Wifi'
  },
  {
    step: '2',
    title: 'Monitoring Real-time',
    description: 'Pantau kondisi tanah, suhu, kelembapan secara langsung',
    color: 'bg-[#0077B6] dark:bg-[#0099E6]',
    icon: 'BarChart3'
  },
  {
    step: '3',
    title: 'Optimasi Hasil',
    description: 'Gunakan insights data untuk keputusan yang lebih baik',
    color: 'bg-[#FFB703] dark:bg-[#FFC833]',
    icon: 'TrendingUp'
  }
];

/**
 * Simulates API call to fetch how it works steps
 * @param delay Optional delay in milliseconds (default: 300ms)
 * @returns Promise<HowItWorksStep[]>
 */
export async function fetchHowItWorks(delay: number = 300): Promise<HowItWorksStep[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(howItWorksData);
    }, delay);
  });
}

export default howItWorksData;
