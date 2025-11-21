/**
 * Demo Benefits Data
 * 
 * Mock data for benefits section
 * Simulates async API call
 */

export interface Benefit {
  text: string;
  icon: string; // Icon name from lucide-react
}

const benefitsData: Benefit[] = [
  { text: 'Hemat air hingga 95% dengan irigasi presisi', icon: 'CheckCircle2' },
  { text: 'Tingkatkan produktivitas pertanian 40-60%', icon: 'CheckCircle2' },
  { text: 'Kurangi penggunaan pupuk & pestisida 30%', icon: 'CheckCircle2' },
  { text: 'Monitoring 24/7 dari mana saja', icon: 'CheckCircle2' },
  { text: 'Data historis untuk analisis jangka panjang', icon: 'CheckCircle2' },
  { text: 'Dukungan teknis & training gratis', icon: 'CheckCircle2' }
];

/**
 * Simulates API call to fetch benefits
 * @param delay Optional delay in milliseconds (default: 300ms)
 * @returns Promise<Benefit[]>
 */
export async function fetchBenefits(delay: number = 300): Promise<Benefit[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(benefitsData);
    }, delay);
  });
}

export default benefitsData;
