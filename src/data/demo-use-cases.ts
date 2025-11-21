/**
 * Demo Use Cases Data
 * 
 * Mock data for use cases section
 * Simulates async API call
 */

export interface UseCase {
  title: string;
  description: string;
  image: string;
  icon: string; // Icon name from lucide-react
  stats: string[];
}

const useCasesData: UseCase[] = [
  {
    title: 'Smart Village',
    description: 'Transformasi desa pertanian menjadi desa digital berkelanjutan',
    image: 'https://images.unsplash.com/photo-1753018302272-282d3ea2c430?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMHZpbGxhZ2UlMjBhZ3JpY3VsdHVyZXxlbnwxfHx8fDE3NjEyMjc3OTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: 'Users',
    stats: ['20+ Desa', '500+ Petani']
  },
  {
    title: 'Urban Farming',
    description: 'Solusi pertanian kota dengan greenhouse & vertical farming',
    image: 'https://images.unsplash.com/photo-1758524057756-7dc8ce53d88c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBncmVlbmhvdXNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjEyMjc3OTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: 'Building2',
    stats: ['15+ Kota', '100+ Greenhouse']
  },
  {
    title: 'Rice Field Management',
    description: 'Monitoring sawah terasering dengan teknologi presisi',
    image: 'https://images.unsplash.com/photo-1565970237376-a6632adf1361?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwZmllbGQlMjB0ZXJyYWNlc3xlbnwxfHx8fDE3NjEyMjc3OTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: 'TreePine',
    stats: ['5000+ Ha', '300+ Petani']
  }
];

/**
 * Simulates API call to fetch use cases
 * @param delay Optional delay in milliseconds (default: 450ms)
 * @returns Promise<UseCase[]>
 */
export async function fetchUseCases(delay: number = 450): Promise<UseCase[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(useCasesData);
    }, delay);
  });
}

export default useCasesData;
