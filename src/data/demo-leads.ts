/**
 * Demo Leads Data
 * Data leads/prospective customers dari landing page
 * 
 * IMPORTANT: Leads are DIFFERENT from existing users!
 * Leads = Prospective customers (not yet using the system)
 * Users = Existing customers (already using AGROGUARD IoT)
 * 
 * Lead Status Flow:
 * new → contacted → qualified → converted (becomes user) | rejected
 */

export interface Lead {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  organization?: string;
  location: string;
  farmSize?: string;
  farmType: string;
  message?: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'rejected';
  source: 'roi-calculator' | 'cta-button' | 'contact-form';
  assignedTo?: string;
  notes?: string;
}

/**
 * 20 Prospective Customers (Leads)
 * All names and locations are DIFFERENT from existing 50 users
 * These are potential customers interested in AGROGUARD IoT
 */
const leadsData: Lead[] = [
  // NEW LEADS (5) - Recent inquiries, not yet contacted
  {
    id: 'lead-001',
    timestamp: '2025-11-02T14:30:00Z',
    name: 'Arif Wibowo',
    email: 'arif.wibowo@tanicerdas.com',
    phone: '+62 877-1234-5678',
    organization: 'Kelompok Tani Cerdas Makmur',
    location: 'Kec. Pakis, Kab. Malang',
    farmSize: '8',
    farmType: 'Padi',
    message: 'Tertarik implementasi IoT untuk sawah kelompok tani. Butuh info lebih detail soal harga dan instalasi.',
    status: 'new',
    source: 'roi-calculator'
  },
  {
    id: 'lead-002',
    timestamp: '2025-11-02T10:15:00Z',
    name: 'Dewi Sartika',
    email: 'dewi.sartika88@gmail.com',
    phone: '+62 856-9876-5432',
    location: 'Kec. Sumberpucung, Kab. Malang',
    farmSize: '3',
    farmType: 'Hortikultura',
    message: 'Saya petani cabai, ingin tau sistem monitoring kelembapan tanah.',
    status: 'new',
    source: 'cta-button'
  },
  {
    id: 'lead-003',
    timestamp: '2025-11-01T16:45:00Z',
    name: 'Teguh Prasetyo',
    email: 'teguh.p@kebuncirebon.id',
    phone: '+62 812-7654-3210',
    organization: 'Kebun Organik Cirebon',
    location: 'Kec. Tarik, Kab. Sidoarjo',
    farmSize: '12',
    farmType: 'Hortikultura',
    message: 'Kami kebun organik butuh sistem monitoring yang presisi untuk sayuran organik.',
    status: 'new',
    source: 'contact-form'
  },
  {
    id: 'lead-004',
    timestamp: '2025-11-01T09:20:00Z',
    name: 'Putu Wijaya',
    email: 'putu.wijaya@yahoo.com',
    phone: '+62 821-5555-6666',
    location: 'Kec. Gedangan, Kab. Sidoarjo',
    farmSize: '4',
    farmType: 'Jagung',
    message: 'Mau coba teknologi IoT buat ladang jagung saya.',
    status: 'new',
    source: 'roi-calculator'
  },
  {
    id: 'lead-005',
    timestamp: '2025-10-31T13:00:00Z',
    name: 'Niken Pratiwi',
    email: 'niken.pratiwi@outlook.com',
    phone: '+62 838-4444-3333',
    location: 'Kec. Porong, Kab. Sidoarjo',
    farmSize: '6',
    farmType: 'Kedelai',
    message: 'Tertarik dengan sistem penyiraman otomatis untuk lahan kedelai.',
    status: 'new',
    source: 'cta-button'
  },

  // CONTACTED LEADS (5) - Initial contact made, awaiting response
  {
    id: 'lead-006',
    timestamp: '2025-10-30T11:30:00Z',
    name: 'Bambang Sutejo',
    email: 'bambang.sutejo@tanikencana.co.id',
    phone: '+62 813-2222-1111',
    organization: 'PT Tani Kencana',
    location: 'Kec. Krian, Kab. Sidoarjo',
    farmSize: '25',
    farmType: 'Padi',
    message: 'Perusahaan kami ingin trial sistem IoT di area sawah 25 hektar.',
    status: 'contacted',
    source: 'roi-calculator',
    assignedTo: 'Sales Team A',
    notes: 'Sudah email penawaran, menunggu respon. Follow up 5 Nov.'
  },
  {
    id: 'lead-007',
    timestamp: '2025-10-29T14:20:00Z',
    name: 'Sri Wahyuni',
    email: 'sri.wahyuni77@gmail.com',
    phone: '+62 857-3333-4444',
    location: 'Kec. Balongbendo, Kab. Sidoarjo',
    farmSize: '5',
    farmType: 'Padi',
    message: 'Saya petani padi ingin hemat air dengan sistem pintar.',
    status: 'contacted',
    source: 'contact-form',
    assignedTo: 'Sales Team B',
    notes: 'Telepon pertama sudah dilakukan, tertarik demo. Jadwal pending.'
  },
  {
    id: 'lead-008',
    timestamp: '2025-10-28T10:45:00Z',
    name: 'Agung Santoso',
    email: 'agung.santoso@agromaju.id',
    phone: '+62 822-6666-7777',
    organization: 'CV Agro Maju Bersama',
    location: 'Kec. Sumobito, Kab. Jombang',
    farmSize: '15',
    farmType: 'Hortikultura',
    message: 'CV kami fokus sayuran premium, butuh monitoring realtime suhu dan kelembapan.',
    status: 'contacted',
    source: 'roi-calculator',
    assignedTo: 'Sales Team A',
    notes: 'Meeting online dijadwalkan 8 Nov pukul 10:00'
  },
  {
    id: 'lead-009',
    timestamp: '2025-10-27T15:30:00Z',
    name: 'Laila Nurjannah',
    email: 'laila.nurjannah@gmail.com',
    phone: '+62 815-8888-9999',
    location: 'Kec. Jogoroto, Kab. Jombang',
    farmSize: '7',
    farmType: 'Jagung',
    message: 'Ingin konsultasi sistem monitoring untuk jagung manis.',
    status: 'contacted',
    source: 'cta-button',
    assignedTo: 'Sales Team B',
    notes: 'WA sudah dibalas, menunggu konfirmasi waktu demo'
  },
  {
    id: 'lead-010',
    timestamp: '2025-10-26T09:00:00Z',
    name: 'Rizal Firmansyah',
    email: 'rizal.f@pertanianmodern.com',
    phone: '+62 811-5555-4444',
    organization: 'Pertanian Modern Nusantara',
    location: 'Kec. Tanggulangin, Kab. Sidoarjo',
    farmSize: '30',
    farmType: 'Padi',
    message: 'Proyek besar, butuh 50+ sensor untuk area 30 hektar sawah.',
    status: 'contacted',
    source: 'contact-form',
    assignedTo: 'Enterprise Sales',
    notes: 'Proposal besar sudah dikirim. Meeting dengan direktur minggu depan.'
  },

  // QUALIFIED LEADS (5) - High interest, moving toward deal
  {
    id: 'lead-011',
    timestamp: '2025-10-25T13:15:00Z',
    name: 'Slamet Widodo',
    email: 'slamet.widodo@tanitechno.id',
    phone: '+62 828-1111-2222',
    organization: 'Tani Techno Solutions',
    location: 'Kec. Wonoayu, Kab. Sidoarjo',
    farmSize: '10',
    farmType: 'Hortikultura',
    message: 'Sudah trial sistem lain, tertarik switch ke AGROGUARD karena fitur lebih lengkap.',
    status: 'qualified',
    source: 'roi-calculator',
    assignedTo: 'Senior Sales',
    notes: 'Hot prospect! Demo berhasil, minta quotation final. Closing target 15 Nov.'
  },
  {
    id: 'lead-012',
    timestamp: '2025-10-24T11:00:00Z',
    name: 'Retno Wulandari',
    email: 'retno.wulandari@kebunhijau.co.id',
    phone: '+62 856-7777-8888',
    organization: 'Kebun Hijau Indonesia',
    location: 'Kec. Diwek, Kab. Jombang',
    farmSize: '18',
    farmType: 'Hortikultura',
    message: 'Perusahaan kami ekspansi ke sayuran hidroponik, butuh monitoring 24/7.',
    status: 'qualified',
    source: 'contact-form',
    assignedTo: 'Senior Sales',
    notes: 'Budget approved, tinggal finalisasi kontrak. Visit lokasi 10 Nov.'
  },
  {
    id: 'lead-013',
    timestamp: '2025-10-23T14:45:00Z',
    name: 'Hadi Kusuma',
    email: 'hadi.kusuma88@yahoo.co.id',
    phone: '+62 813-9999-0000',
    location: 'Kec. Kudu, Kab. Jombang',
    farmSize: '9',
    farmType: 'Padi',
    message: 'Sudah lihat demo di sawah tetangga, impressed dengan hasil. Mau pasang juga.',
    status: 'qualified',
    source: 'cta-button',
    assignedTo: 'Sales Team A',
    notes: 'Referral dari existing customer (Bambang Susilo). Survey lokasi done. Deal 90%.'
  },
  {
    id: 'lead-014',
    timestamp: '2025-10-22T10:30:00Z',
    name: 'Fitriani Rahmawati',
    email: 'fitriani.r@smartfarm.id',
    phone: '+62 821-3333-2222',
    organization: 'Smart Farm Jatim',
    location: 'Kec. Perak, Kab. Jombang',
    farmSize: '22',
    farmType: 'Jagung',
    message: 'Kami startup agritech, ingin partnership untuk teknologi monitoring.',
    status: 'qualified',
    source: 'roi-calculator',
    assignedTo: 'Partnership Team',
    notes: 'Potensial partnership jangka panjang. Negotiation tahap akhir.'
  },
  {
    id: 'lead-015',
    timestamp: '2025-10-21T16:00:00Z',
    name: 'Yusuf Hidayat',
    email: 'yusuf.hidayat@gmail.com',
    phone: '+62 877-4444-5555',
    location: 'Kec. Bareng, Kab. Jombang',
    farmSize: '11',
    farmType: 'Hortikultura',
    message: 'Lahan bawang merah, butuh prediksi penyiraman otomatis.',
    status: 'qualified',
    source: 'contact-form',
    assignedTo: 'Sales Team B',
    notes: 'Site visit done. Waiting for approval dari kepala desa untuk izin instalasi.'
  },

  // CONVERTED LEADS (3) - Successfully closed, became customers
  {
    id: 'lead-016',
    timestamp: '2025-10-20T09:30:00Z',
    name: 'Cahya Nugraha',
    email: 'cahya.nugraha@tanicahaya.com',
    phone: '+62 812-6666-5555',
    organization: 'Tani Cahaya Mandiri',
    location: 'Kec. Ngoro, Kab. Jombang',
    farmSize: '14',
    farmType: 'Padi',
    message: 'Butuh sistem hemat air untuk sawah organik.',
    status: 'converted',
    source: 'roi-calculator',
    assignedTo: 'Implementation Team',
    notes: 'DEAL CLOSED! Kontrak signed 20 Okt. Instalasi scheduled 25 Nov. Payment 50% received.'
  },
  {
    id: 'lead-017',
    timestamp: '2025-10-18T13:20:00Z',
    name: 'Ayu Lestari Dewi',
    email: 'ayu.lestari@kebunorganik.id',
    phone: '+62 857-2222-3333',
    organization: 'Kebun Organik Sejahtera',
    location: 'Kec. Mojowarno, Kab. Jombang',
    farmSize: '16',
    farmType: 'Hortikultura',
    message: 'Kebun sayur organik premium, butuh monitoring tanpa pestisida kimia.',
    status: 'converted',
    source: 'contact-form',
    assignedTo: 'Implementation Team',
    notes: 'Customer baru! Instalasi selesai minggu lalu. Training done. Very satisfied!'
  },
  {
    id: 'lead-018',
    timestamp: '2025-10-15T11:45:00Z',
    name: 'Wawan Setiawan',
    email: 'wawan.setiawan77@yahoo.com',
    phone: '+62 815-7777-6666',
    location: 'Kec. Peterongan, Kab. Jombang',
    farmSize: '8',
    farmType: 'Jagung',
    message: 'Saya lihat teman pakai AGROGUARD hasil panen naik 20%. Saya juga mau!',
    status: 'converted',
    source: 'cta-button',
    assignedTo: 'Customer Success',
    notes: 'Fast closing! Referral customer. Instalasi 28 Okt. Onboarding in progress.'
  },

  // REJECTED LEADS (2) - Lost deals, various reasons
  {
    id: 'lead-019',
    timestamp: '2025-10-12T10:00:00Z',
    name: 'Budi Raharjo',
    email: 'budi.raharjo@email.com',
    phone: '+62 822-8888-7777',
    location: 'Kec. Ploso, Kab. Jombang',
    farmSize: '6',
    farmType: 'Padi',
    message: 'Mau tau harga sistem IoT untuk sawah.',
    status: 'rejected',
    source: 'roi-calculator',
    assignedTo: 'Sales Team A',
    notes: 'Budget tidak mencukupi. Minta diskon 50% tidak bisa dipenuhi. Lost to competitor.'
  },
  {
    id: 'lead-020',
    timestamp: '2025-10-10T14:30:00Z',
    name: 'Rina Marlina',
    email: 'rina.marlina@pertanianlama.id',
    phone: '+62 811-9999-8888',
    organization: 'Tani Tradisional Nusantara',
    location: 'Kec. Kabuh, Kab. Jombang',
    farmSize: '5',
    farmType: 'Padi',
    message: 'Cuma mau survey harga, belum yakin butuh teknologi.',
    status: 'rejected',
    source: 'contact-form',
    assignedTo: 'Sales Team B',
    notes: 'No response setelah 3x follow up. Not ready untuk teknologi baru. Archive.'
  },

  // ADDITIONAL 10 LEADS (21-30) - More diverse prospects
  {
    id: 'lead-021',
    timestamp: '2025-11-02T08:00:00Z',
    name: 'Iwan Setiawan',
    email: 'iwan.setiawan@organikfarm.id',
    phone: '+62 819-1111-2222',
    organization: 'Organik Farm Jaya',
    location: 'Kec. Trawas, Kab. Mojokerto',
    farmSize: '7',
    farmType: 'Hortikultura',
    message: 'Kebun strawberry organik, butuh monitoring suhu & kelembapan real-time.',
    status: 'new',
    source: 'roi-calculator'
  },
  {
    id: 'lead-022',
    timestamp: '2025-11-01T19:30:00Z',
    name: 'Maya Puspitasari',
    email: 'maya.puspita@yahoo.co.id',
    phone: '+62 878-3333-4444',
    location: 'Kec. Pacet, Kab. Mojokerto',
    farmSize: '4',
    farmType: 'Hortikultura',
    message: 'Lahan sayuran hidroponik, mau coba IoT untuk efisiensi air.',
    status: 'new',
    source: 'cta-button'
  },
  {
    id: 'lead-023',
    timestamp: '2025-11-01T11:15:00Z',
    name: 'Joko Widodo',
    email: 'joko.widodo@smartagri.co.id',
    phone: '+62 813-5555-6666',
    organization: 'Smart Agriculture Ventures',
    location: 'Kec. Dlanggu, Kab. Mojokerto',
    farmSize: '20',
    farmType: 'Jagung',
    message: 'Startup agritech, tertarik partnership untuk teknologi sensor IoT.',
    status: 'contacted',
    source: 'contact-form',
    assignedTo: 'Partnership Team',
    notes: 'Initial meeting done. Discussing B2B partnership untuk 100+ devices.'
  },
  {
    id: 'lead-024',
    timestamp: '2025-10-31T16:45:00Z',
    name: 'Endang Sulistyowati',
    email: 'endang.sulis@kebunbunga.id',
    phone: '+62 821-7777-8888',
    organization: 'Kebun Bunga Indah Asri',
    location: 'Kec. Sooko, Kab. Mojokerto',
    farmSize: '6',
    farmType: 'Hortikultura',
    message: 'Kebun bunga potong, perlu sistem monitoring untuk kualitas produk export.',
    status: 'contacted',
    source: 'roi-calculator',
    assignedTo: 'Sales Team A',
    notes: 'Demo scheduled 10 Nov. Interest tinggi untuk export quality monitoring.'
  },
  {
    id: 'lead-025',
    timestamp: '2025-10-30T13:20:00Z',
    name: 'Hariyanto Gunawan',
    email: 'hariyanto.g@tanidigital.com',
    phone: '+62 857-9999-0000',
    organization: 'PT Tani Digital Nusantara',
    location: 'Kec. Jetis, Kab. Mojokerto',
    farmSize: '35',
    farmType: 'Padi',
    message: 'Proyek smart farming skala enterprise, butuh 150+ sensors untuk 35 Ha.',
    status: 'qualified',
    source: 'contact-form',
    assignedTo: 'Enterprise Sales',
    notes: 'Big deal! Budget approved 800jt. Technical assessment next week. Closing probability 85%.'
  },
  {
    id: 'lead-026',
    timestamp: '2025-10-29T10:30:00Z',
    name: 'Lestari Wulandari',
    email: 'lestari.wulan@petanimuda.id',
    phone: '+62 812-1111-3333',
    location: 'Kec. Puri, Kab. Mojokerto',
    farmSize: '5',
    farmType: 'Kedelai',
    message: 'Petani muda, ingin modernisasi lahan kedelai keluarga.',
    status: 'qualified',
    source: 'cta-button',
    assignedTo: 'Sales Team B',
    notes: 'Enthusiastic young farmer. Proposal sent. Waiting for family approval.'
  },
  {
    id: 'lead-027',
    timestamp: '2025-10-28T15:00:00Z',
    name: 'Hendra Kusuma',
    email: 'hendra.kusuma88@gmail.com',
    phone: '+62 819-2222-4444',
    location: 'Kec. Gondang, Kab. Mojokerto',
    farmSize: '9',
    farmType: 'Padi',
    message: 'Sawah organik bersertifikat, butuh dokumentasi data untuk sertifikasi.',
    status: 'qualified',
    source: 'roi-calculator',
    assignedTo: 'Sales Team A',
    notes: 'Organic certification requirement. System helps with documentation. Quote sent.'
  },
  {
    id: 'lead-028',
    timestamp: '2025-10-27T12:45:00Z',
    name: 'Ratna Dewi',
    email: 'ratna.dewi@agrokompleks.id',
    phone: '+62 856-5555-7777',
    organization: 'Agro Kompleks Makmur',
    location: 'Kec. Trowulan, Kab. Mojokerto',
    farmSize: '18',
    farmType: 'Hortikultura',
    message: 'Kompleks pertanian terintegrasi sayur & buah, mau sistem monitoring terpusat.',
    status: 'converted',
    source: 'contact-form',
    assignedTo: 'Implementation Team',
    notes: 'DEAL CLOSED! Contract signed 27 Okt. 30 devices ordered. Installation 20 Nov.'
  },
  {
    id: 'lead-029',
    timestamp: '2025-10-25T09:15:00Z',
    name: 'Bambang Prasetyo',
    email: 'bambang.prasetyo@ternak-agri.com',
    phone: '+62 878-6666-8888',
    organization: 'Ternak & Agri Integration',
    location: 'Kec. Bangsal, Kab. Mojokerto',
    farmSize: '12',
    farmType: 'Jagung',
    message: 'Integrasi ternak & pertanian, jagung untuk pakan ternak. Butuh optimasi hasil panen.',
    status: 'converted',
    source: 'roi-calculator',
    assignedTo: 'Customer Success',
    notes: 'New customer! Instalasi complete. Training done. Very satisfied dengan results!'
  },
  {
    id: 'lead-030',
    timestamp: '2025-10-20T14:00:00Z',
    name: 'Susilo Wibowo',
    email: 'susilo.wibowo@traditionfarm.id',
    phone: '+62 811-2222-5555',
    location: 'Kec. Ngoro, Kab. Mojokerto',
    farmSize: '4',
    farmType: 'Padi',
    message: 'Saya petani tradisional, belum familiar dengan teknologi.',
    status: 'rejected',
    source: 'cta-button',
    assignedTo: 'Sales Team B',
    notes: 'Not ready for digital transformation. Concerns about complexity. Archived.'
  }
];

/**
 * Fetch all leads
 */
export async function fetchLeads(delay: number = 300): Promise<Lead[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Get from localStorage and merge with demo data
      const saved = localStorage.getItem('agroguard-leads');
      const savedLeads = saved ? JSON.parse(saved) : [];
      const allLeads = [...savedLeads, ...leadsData];
      // Sort by timestamp (newest first)
      allLeads.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      resolve(allLeads);
    }, delay);
  });
}

/**
 * Add new lead
 */
export async function addLead(lead: Omit<Lead, 'id' | 'timestamp' | 'status'>): Promise<Lead> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newLead: Lead = {
        ...lead,
        id: `lead-${Date.now()}`,
        timestamp: new Date().toISOString(),
        status: 'new'
      };
      
      // Save to localStorage
      const saved = localStorage.getItem('agroguard-leads');
      const leads = saved ? JSON.parse(saved) : [];
      leads.unshift(newLead);
      localStorage.setItem('agroguard-leads', JSON.stringify(leads));
      
      resolve(newLead);
    }, 500);
  });
}

/**
 * Update lead status
 */
export async function updateLeadStatus(
  leadId: string, 
  status: Lead['status'],
  notes?: string,
  assignedTo?: string
): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const saved = localStorage.getItem('agroguard-leads');
      if (saved) {
        const leads: Lead[] = JSON.parse(saved);
        const leadIndex = leads.findIndex(l => l.id === leadId);
        if (leadIndex !== -1) {
          leads[leadIndex].status = status;
          if (notes) leads[leadIndex].notes = notes;
          if (assignedTo) leads[leadIndex].assignedTo = assignedTo;
          localStorage.setItem('agroguard-leads', JSON.stringify(leads));
        }
      }
      resolve();
    }, 300);
  });
}

/**
 * Get leads statistics
 */
export async function getLeadsStats(): Promise<{
  total: number;
  new: number;
  contacted: number;
  qualified: number;
  converted: number;
}> {
  const leads = await fetchLeads(0);
  return {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    qualified: leads.filter(l => l.status === 'qualified').length,
    converted: leads.filter(l => l.status === 'converted').length
  };
}

export { leadsData as default };
