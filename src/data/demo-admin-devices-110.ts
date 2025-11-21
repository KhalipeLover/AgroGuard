/**
 * Admin Dashboard - Devices Management (110 Devices)
 * 
 * 110 IoT devices distributed across 50 users
 * Each device linked to owner by email
 * Synced with demo-admin-users-50-unique.ts
 */

export interface AdminDevice {
  id: string;
  deviceId: string;
  owner: string;
  ownerEmail: string;
  location: string;
  temperature: number;
  humidity: number;
  soilMoisture: number;
  status: 'online' | 'offline' | 'warning';
  lastSync: string;
  installDate: string;
  latitude: number;
  longitude: number;
}

/**
 * Generate devices for 110 total
 * Distribution matches demo-admin-users-50-unique.ts
 */

const adminDevicesData: AdminDevice[] = [];

// Helper to generate device data
const generateDevice = (
  deviceNum: number,
  owner: string,
  ownerEmail: string,
  location: string,
  lat: number,
  lng: number,
  installDate: string
): AdminDevice => {
  const now = new Date();
  const lastSyncOffset = Math.random() * 60; // 0-60 minutes ago
  const lastSync = new Date(now.getTime() - lastSyncOffset * 60000).toISOString();
  
  // 85% online, 12% offline, 3% warning
  const rand = Math.random();
  const status: 'online' | 'offline' | 'warning' = 
    rand < 0.85 ? 'online' : rand < 0.97 ? 'offline' : 'warning';

  const prefix = location.split(',')[1]?.trim().split('.')[1]?.trim().substring(0, 3).toUpperCase() || 'DEV';
  
  return {
    id: `AGR-${prefix}-${String(deviceNum).padStart(3, '0')}`,
    deviceId: `${prefix}${String(deviceNum).padStart(3, '0')}`,
    owner,
    ownerEmail,
    location,
    temperature: 20 + Math.random() * 15, // 20-35°C
    humidity: 40 + Math.random() * 50, // 40-90%
    soilMoisture: 30 + Math.random() * 50, // 30-80%
    status,
    lastSync,
    installDate,
    latitude: lat + (Math.random() - 0.5) * 0.01,
    longitude: lng + (Math.random() - 0.5) * 0.01
  };
};

// User data for device generation (50 users, 110 devices total)
// Synced with demo-admin-users-50-unique.ts
const users = [
  { id: 1, name: 'Budi Santoso', email: 'budi.santoso@user.id', location: 'Kec. Dau, Kab. Malang', devices: 3, lat: -8.1706, lng: 112.6683, install: '2024-09-04' },
  { id: 2, name: 'Siti Aminah', email: 'siti.aminah@user.id', location: 'Kec. Ambulu, Kab. Jember', devices: 1, lat: -8.3450, lng: 113.5981, install: '2024-01-19' },
  { id: 3, name: 'Ahmad Hidayat', email: 'ahmad.hidayat@user.id', location: 'Kec. Wonokromo, Kota Surabaya', devices: 3, lat: -7.2850, lng: 112.7519, install: '2024-04-12' },
  { id: 4, name: 'Rina Kusuma', email: 'rina.kusuma@user.id', location: 'Kec. Genteng, Kab. Banyuwangi', devices: 2, lat: -8.3650, lng: 114.1495, install: '2024-07-04' },
  { id: 5, name: 'Dedi Kurniawan', email: 'dedi.kurniawan@user.id', location: 'Kec. Babat, Kab. Lamongan', devices: 3, lat: -7.1114, lng: 112.1623, install: '2024-07-21' },
  { id: 6, name: 'Wahyu Prasetyo', email: 'wahyu.prasetyo@user.id', location: 'Kec. Kalitidu, Kab. Bojonegoro', devices: 2, lat: -7.1620, lng: 111.8819, install: '2024-06-02' },
  { id: 7, name: 'Indah Pertiwi', email: 'indah.pertiwi@user.id', location: 'Kec. Waru, Kab. Sidoarjo', devices: 2, lat: -7.3600, lng: 112.7314, install: '2024-08-26' },
  { id: 8, name: 'Agus Setiawan', email: 'agus.setiawan@user.id', location: 'Kec. Trawas, Kab. Mojokerto', devices: 1, lat: -7.6091, lng: 112.5435, install: '2024-07-03' },
  { id: 9, name: 'Lestari Wulandari', email: 'lestari.wulandari@user.id', location: 'Kec. Tosari, Kab. Pasuruan', devices: 3, lat: -7.9053, lng: 112.9133, install: '2024-05-26' },
  { id: 10, name: 'Bambang Susilo', email: 'bambang.susilo@user.id', location: 'Kec. Senduro, Kab. Lumajang', devices: 2, lat: -8.1236, lng: 113.2167, install: '2024-02-15' },
  { id: 11, name: 'Endang Suryani', email: 'endang.suryani@user.id', location: 'Kec. Kraksaan, Kab. Probolinggo', devices: 1, lat: -7.7589, lng: 113.3959, install: '2024-03-26' },
  { id: 12, name: 'Hendra Gunawan', email: 'hendra.gunawan@user.id', location: 'Kec. Asembagus, Kab. Situbondo', devices: 3, lat: -7.6181, lng: 113.9614, install: '2024-05-28' },
  { id: 13, name: 'Sri Mulyani', email: 'sri.mulyani@user.id', location: 'Kec. Ijen, Kab. Bondowoso', devices: 3, lat: -7.9250, lng: 113.8175, install: '2024-09-25' },
  { id: 14, name: 'Yusuf Hakim', email: 'yusuf.hakim@user.id', location: 'Kec. Gurah, Kab. Kediri', devices: 2, lat: -7.8489, lng: 112.0475, install: '2024-04-24' },
  { id: 15, name: 'Fitri Handayani', email: 'fitri.handayani@user.id', location: 'Kec. Lowokwaru, Kota Malang', devices: 2, lat: -7.9445, lng: 112.6142, install: '2024-02-02' },
  { id: 16, name: 'Rudi Hartono', email: 'rudi.hartono@user.id', location: 'Kec. Kanigoro, Kab. Blitar', devices: 3, lat: -8.0989, lng: 112.1606, install: '2024-06-21' },
  { id: 17, name: 'Dewi Lestari', email: 'dewi.lestari@user.id', location: 'Kec. Boyolangu, Kab. Tulungagung', devices: 3, lat: -8.1192, lng: 111.9044, install: '2024-09-12' },
  { id: 18, name: 'Sutrisno', email: 'sutrisno@user.id', location: 'Kec. Watulimo, Kab. Trenggalek', devices: 3, lat: -8.4089, lng: 111.5356, install: '2024-03-15' },
  { id: 19, name: 'Nurul Hidayah', email: 'nurul.hidayah@user.id', location: 'Kec. Mojoagung, Kab. Jombang', devices: 2, lat: -7.5733, lng: 112.4333, install: '2024-07-23' },
  { id: 20, name: 'Eko Prasetyo', email: 'eko.prasetyo@user.id', location: 'Kec. Berbek, Kab. Nganjuk', devices: 1, lat: -7.6039, lng: 111.9039, install: '2024-01-16' },
  { id: 21, name: 'Ratna Sari', email: 'ratna.sari@user.id', location: 'Kec. Mejayan, Kab. Madiun', devices: 1, lat: -7.5700, lng: 111.5233, install: '2024-09-12' },
  { id: 22, name: 'Fajar Nugroho', email: 'fajar.nugroho@user.id', location: 'Kec. Kartoharjo, Kota Madiun', devices: 2, lat: -7.6298, lng: 111.5239, install: '2024-04-15' },
  { id: 23, name: 'Ani Purwanti', email: 'ani.purwanti@user.id', location: 'Kec. Panekan, Kab. Magetan', devices: 2, lat: -7.6406, lng: 111.3489, install: '2024-04-10' },
  { id: 24, name: 'Joko Widodo', email: 'joko.widodo@user.id', location: 'Kec. Geneng, Kab. Ngawi', devices: 1, lat: -7.4039, lng: 111.4486, install: '2024-03-23' },
  { id: 25, name: 'Kartika Sari', email: 'kartika.sari@user.id', location: 'Kec. Babadan, Kab. Ponorogo', devices: 2, lat: -7.8656, lng: 111.4625, install: '2024-03-29' },
  { id: 26, name: 'Slamet Riyadi', email: 'slamet.riyadi@user.id', location: 'Kec. Donorojo, Kab. Pacitan', devices: 2, lat: -8.0389, lng: 111.0933, install: '2024-04-16' },
  { id: 27, name: 'Wulan Dari', email: 'wulan.dari@user.id', location: 'Kec. Jenu, Kab. Tuban', devices: 3, lat: -6.9053, lng: 111.8372, install: '2024-06-24' },
  { id: 28, name: 'Hari Susanto', email: 'hari.susanto@user.id', location: 'Kec. Benjeng, Kab. Gresik', devices: 3, lat: -7.2450, lng: 112.5642, install: '2024-10-17' },
  { id: 29, name: 'Mega Wati', email: 'mega.wati@user.id', location: 'Kec. Arosbaya, Kab. Bangkalan', devices: 3, lat: -7.0300, lng: 112.8000, install: '2024-02-06' },
  { id: 30, name: 'Anton Wijaya', email: 'anton.wijaya@user.id', location: 'Kec. Camplong, Kab. Sampang', devices: 2, lat: -7.1872, lng: 113.2517, install: '2024-08-04' },
  { id: 31, name: 'Rini Susanti', email: 'rini.susanti@user.id', location: 'Kec. Pademawu, Kab. Pamekasan', devices: 2, lat: -7.1575, lng: 113.4747, install: '2024-03-16' },
  { id: 32, name: 'Hadi Purnomo', email: 'hadi.purnomo@user.id', location: 'Kec. Kalianget, Kab. Sumenep', devices: 3, lat: -7.0428, lng: 113.9411, install: '2024-06-07' },
  { id: 33, name: 'Dwi Rahayu', email: 'dwi.rahayu@user.id', location: 'Kec. Widodaren, Kab. Ngawi', devices: 3, lat: -7.4528, lng: 111.3708, install: '2024-01-31' },
  { id: 34, name: 'Irwan Setiawan', email: 'irwan.setiawan@user.id', location: 'Kec. Slahung, Kab. Ponorogo', devices: 3, lat: -7.7206, lng: 111.2050, install: '2024-05-04' },
  { id: 35, name: 'Sari Wulandari', email: 'sari.wulandari@user.id', location: 'Kec. Nawangan, Kab. Pacitan', devices: 3, lat: -7.9706, lng: 111.2547, install: '2024-02-19' },
  { id: 36, name: 'Muhammad Rizki', email: 'muhammad.rizki@user.id', location: 'Kec. Montong, Kab. Tuban', devices: 2, lat: -6.9797, lng: 111.9478, install: '2024-01-18' },
  { id: 37, name: 'Linda Ratnasari', email: 'linda.ratnasari@user.id', location: 'Kec. Driyorejo, Kab. Gresik', devices: 2, lat: -7.3653, lng: 112.6214, install: '2024-04-09' },
  { id: 38, name: 'Tono Supriyanto', email: 'tono.supriyanto@user.id', location: 'Kec. Socah, Kab. Bangkalan', devices: 1, lat: -7.0539, lng: 112.8192, install: '2024-04-18' },
  { id: 39, name: 'Diah Permatasari', email: 'diah.permatasari@user.id', location: 'Kec. Omben, Kab. Sampang', devices: 1, lat: -7.2208, lng: 113.5283, install: '2024-09-23' },
  { id: 40, name: 'Heru Prasetyo', email: 'heru.prasetyo@user.id', location: 'Kec. Larangan, Kab. Pamekasan', devices: 3, lat: -7.1247, lng: 113.3528, install: '2024-09-09' },
  { id: 41, name: 'Vina Agustina', email: 'vina.agustina@user.id', location: 'Kec. Dungkek, Kab. Sumenep', devices: 2, lat: -7.0058, lng: 114.1714, install: '2024-06-18' },
  { id: 42, name: 'Gunawan Wijaya', email: 'gunawan.wijaya@user.id', location: 'Kec. Singosari, Kab. Malang', devices: 1, lat: -7.8953, lng: 112.6658, install: '2024-01-15' },
  { id: 43, name: 'Ayu Lestari', email: 'ayu.lestari@user.id', location: 'Kec. Sumbersari, Kab. Jember', devices: 3, lat: -8.1850, lng: 113.7289, install: '2024-01-20' },
  { id: 44, name: 'Benny Kurniawan', email: 'benny.kurniawan@user.id', location: 'Kec. Bubutan, Kota Surabaya', devices: 3, lat: -7.2380, lng: 112.7358, install: '2024-02-09' },
  { id: 45, name: 'Citra Dewi', email: 'citra.dewi@user.id', location: 'Kec. Rogojampi, Kab. Banyuwangi', devices: 3, lat: -8.2586, lng: 114.2208, install: '2024-05-22' },
  { id: 46, name: 'Darmawan', email: 'darmawan@user.id', location: 'Kec. Mantup, Kab. Lamongan', devices: 3, lat: -7.0842, lng: 112.2478, install: '2024-04-05' },
  { id: 47, name: 'Erna Sulastri', email: 'erna.sulastri@user.id', location: 'Kec. Cepu, Kab. Bojonegoro', devices: 1, lat: -7.1481, lng: 111.5931, install: '2024-02-23' },
  { id: 48, name: 'Faisal Rahman', email: 'faisal.rahman@user.id', location: 'Kec. Buduran, Kab. Sidoarjo', devices: 2, lat: -7.4281, lng: 112.7233, install: '2024-08-25' },
  { id: 49, name: 'Gita Puspita', email: 'gita.puspita@user.id', location: 'Kec. Puri, Kab. Mojokerto', devices: 1, lat: -7.4756, lng: 112.4917, install: '2024-10-12' },
  { id: 50, name: 'Hendri Gunawan', email: 'hendri.gunawan@user.id', location: 'Kec. Pandaan, Kab. Pasuruan', devices: 2, lat: -7.6478, lng: 112.6881, install: '2024-03-23' },
];

// Generate devices
let deviceCounter = 1;
users.forEach(user => {
  for (let i = 0; i < user.devices; i++) {
    adminDevicesData.push(
      generateDevice(
        deviceCounter++,
        user.name,
        user.email,
        user.location,
        user.lat,
        user.lng,
        user.install
      )
    );
  }
});

/**
 * Fetch all admin devices with async delay
 */
export async function fetchAdminDevices(delay: number = 300): Promise<AdminDevice[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...adminDevicesData]), delay);
  });
}

/**
 * Search devices by ID, owner, or location
 */
export function searchDevices(query: string): AdminDevice[] {
  const lowerQuery = query.toLowerCase();
  return adminDevicesData.filter(
    device =>
      device.id.toLowerCase().includes(lowerQuery) ||
      device.deviceId.toLowerCase().includes(lowerQuery) ||
      device.owner.toLowerCase().includes(lowerQuery) ||
      device.location.toLowerCase().includes(lowerQuery)
  );
}

export { adminDevicesData as default };
