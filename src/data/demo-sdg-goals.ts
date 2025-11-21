/**
 * Demo SDG Goals Data
 * 
 * Mock data for Sustainable Development Goals section
 * Simulates async API call
 */

export interface SDGGoal {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
}

// Import SDG icons
import sdg2Icon from 'figma:asset/097b7628a46b2835e8189089a2a35b80d50981bb.png';
import sdg9Icon from 'figma:asset/8e44d9c82de72f05d8af8c00d2da26f5a5e4b516.png';
import sdg11Icon from 'figma:asset/8428a3bd8a4c0dabdf2595d305c1b509163a4795.png';
import sdg13Icon from 'figma:asset/a57ba80af0a2f259fe0a8a21a1157e6ef2f7a57b.png';

const sdgGoalsData: SDGGoal[] = [
  {
    number: '2',
    title: 'Zero Hunger',
    subtitle: 'Ketahanan Pangan',
    description: 'Meningkatkan produktivitas pertanian',
    imageUrl: sdg2Icon
  },
  {
    number: '9',
    title: 'Industry Innovation',
    subtitle: 'Inovasi & Infrastruktur',
    description: 'Teknologi IoT transformasi agrikultur',
    imageUrl: sdg9Icon
  },
  {
    number: '11',
    title: 'Sustainable Cities',
    subtitle: 'Kota & Desa Berkelanjutan',
    description: 'Solusi smart farming komunitas urban dan rural',
    imageUrl: sdg11Icon
  },
  {
    number: '13',
    title: 'Climate Action',
    subtitle: 'Aksi Iklim',
    description: 'Efisiensi sumber daya jejak karbon',
    imageUrl: sdg13Icon
  }
];

/**
 * Simulates API call to fetch SDG goals
 * @param delay Optional delay in milliseconds (default: 400ms)
 * @returns Promise<SDGGoal[]>
 */
export async function fetchSDGGoals(delay: number = 400): Promise<SDGGoal[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sdgGoalsData);
    }, delay);
  });
}

export default sdgGoalsData;
