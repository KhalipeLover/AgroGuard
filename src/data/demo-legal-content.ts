/**
 * Demo Legal Content Data
 * 
 * Legal documents untuk Footer dan Legal Dialog:
 * - Privacy Policy
 * - Terms of Service
 * - Cookie Policy
 * - Open Source Licenses
 */

import { Shield, FileText, Cookie, Code2 } from 'lucide-react';

export type LegalType = 'privacy' | 'terms' | 'cookies' | 'licenses';

export interface LegalContentData {
  icon: string; // Icon name from lucide-react
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export interface LegalSection {
  heading: string;
  content: string;
  listItems?: string[];
}

const legalContents: Record<LegalType, LegalContentData> = {
  privacy: {
    icon: 'Shield',
    title: 'Privacy Policy',
    description: 'Kebijakan Privasi AGROGUARD IoT',
    lastUpdated: 'November 2025',
    sections: [
      {
        heading: '1. Informasi yang Kami Kumpulkan',
        content: 'AGROGUARD IoT mengumpulkan informasi yang Anda berikan saat mendaftar dan menggunakan layanan kami:',
        listItems: [
          'Informasi akun: nama, email, nomor telepon',
          'Informasi device: ID device, lokasi pemasangan, konfigurasi sensor',
          'Data sensor: suhu, kelembapan, pH tanah, dan data monitoring lainnya',
          'Data penggunaan: log aktivitas, preferensi dashboard, notifikasi'
        ]
      },
      {
        heading: '2. Bagaimana Kami Menggunakan Data Anda',
        content: 'Data yang kami kumpulkan digunakan untuk:',
        listItems: [
          'Menyediakan layanan monitoring dan analisis pertanian',
          'Mengirimkan notifikasi penting tentang kondisi tanaman',
          'Meningkatkan kualitas layanan melalui analisis penggunaan',
          'Memberikan dukungan teknis yang lebih baik',
          'Mengembangkan fitur baru berdasarkan kebutuhan pengguna'
        ]
      },
      {
        heading: '3. Keamanan Data',
        content: 'Kami mengimplementasikan standar keamanan industri:',
        listItems: [
          'Enkripsi end-to-end (AES-256) untuk semua data sensitif',
          'Backup otomatis dan disaster recovery',
          'Compliance dengan ISO 27001 dan GDPR',
          'Regular security audits dan penetration testing',
          'Two-factor authentication (2FA) untuk akun'
        ]
      },
      {
        heading: '4. Berbagi Data dengan Pihak Ketiga',
        content: 'AGROGUARD IoT tidak akan menjual atau menyewakan data pribadi Anda. Kami hanya berbagi data dalam kondisi berikut:',
        listItems: [
          'Dengan persetujuan eksplisit dari Anda',
          'Untuk memenuhi kewajiban hukum',
          'Dengan service providers yang membantu operasional (dengan NDA ketat)',
          'Data yang telah di-anonymize untuk research dan development'
        ]
      },
      {
        heading: '5. Hak Anda',
        content: 'Anda memiliki hak untuk:',
        listItems: [
          'Mengakses dan download semua data Anda',
          'Mengoreksi informasi yang tidak akurat',
          'Menghapus akun dan data Anda (right to be forgotten)',
          'Opt-out dari komunikasi marketing',
          'Mengajukan complaint ke otoritas perlindungan data'
        ]
      },
      {
        heading: '6. Cookie dan Tracking',
        content: 'Website kami menggunakan cookies untuk meningkatkan pengalaman pengguna. Anda dapat mengatur preferensi cookies di browser Anda. Lihat Cookie Policy untuk detail lebih lanjut.'
      },
      {
        heading: '7. Perubahan Kebijakan',
        content: 'Kami dapat memperbarui Privacy Policy ini dari waktu ke waktu. Perubahan signifikan akan kami notifikasikan melalui email atau pemberitahuan di dashboard.'
      },
      {
        heading: '8. Kontak',
        content: 'Jika Anda memiliki pertanyaan tentang Privacy Policy ini, silakan hubungi kami di privacy@agroguard.id atau +6281357097158.'
      }
    ]
  },
  
  terms: {
    icon: 'FileText',
    title: 'Terms of Service',
    description: 'Syarat dan Ketentuan Layanan AGROGUARD IoT',
    lastUpdated: 'November 2025',
    sections: [
      {
        heading: '1. Penerimaan Syarat',
        content: 'Dengan menggunakan layanan AGROGUARD IoT, Anda menyetujui syarat dan ketentuan berikut. Jika Anda tidak setuju, mohon untuk tidak menggunakan layanan kami.'
      },
      {
        heading: '2. Layanan yang Disediakan',
        content: 'AGROGUARD IoT menyediakan:',
        listItems: [
          'Platform monitoring IoT untuk pertanian',
          'Dashboard analytics dan visualisasi data',
          'Notifikasi real-time untuk kondisi pertanian',
          'Cloud storage untuk historical data',
          'Support teknis 24/7',
          'API access untuk integrasi (paket tertentu)'
        ]
      },
      {
        heading: '3. Akun Pengguna',
        content: 'Tanggung jawab Anda sebagai pengguna:',
        listItems: [
          'Memberikan informasi akurat saat registrasi',
          'Menjaga kerahasiaan credentials login Anda',
          'Bertanggung jawab atas semua aktivitas di akun Anda',
          'Notifikasi kami jika ada unauthorized access',
          'Tidak membagikan akun dengan pihak lain'
        ]
      },
      {
        heading: '4. Penggunaan yang Dilarang',
        content: 'Anda tidak diperbolehkan:',
        listItems: [
          'Menggunakan layanan untuk aktivitas ilegal',
          'Mencoba mengakses sistem atau data pengguna lain',
          'Mengirim spam atau malware',
          'Reverse engineering atau decompiling software kami',
          'Menyalahgunakan resources atau bandwidth',
          'Menghapus atau mengubah copyright notices'
        ]
      },
      {
        heading: '5. Pembayaran dan Refund',
        content: 'Kebijakan pembayaran kami:',
        listItems: [
          'Pembayaran subscription dilakukan di awal periode',
          'Harga dapat berubah dengan notifikasi 30 hari',
          'Refund penuh tersedia dalam 14 hari pertama',
          'Partial refund untuk kasus tertentu (kebijakan berlaku)',
          'Akses dihentikan jika pembayaran tertunda > 7 hari'
        ]
      },
      {
        heading: '6. Garansi Device',
        content: 'Untuk hardware device AGROGUARD:',
        listItems: [
          'Garansi 2 tahun untuk kerusakan manufaktur',
          'Free replacement jika terbukti manufacturing defect',
          'Extended warranty tersedia (biaya tambahan)',
          'Garansi void jika ada modifikasi unauthorized',
          'Shipping cost ditanggung sesuai kebijakan warranty'
        ]
      },
      {
        heading: '7. Limitasi Liability',
        content: 'AGROGUARD IoT tidak bertanggung jawab atas:',
        listItems: [
          'Kerugian dari force majeure (bencana alam, perang, dll)',
          'Kerusakan akibat penggunaan tidak sesuai panduan',
          'Data loss akibat kesalahan pengguna',
          'Indirect atau consequential damages',
          'Downtime karena maintenance terjadwal (dengan notifikasi)'
        ]
      },
      {
        heading: '8. Terminasi',
        content: 'Kami berhak terminate akun Anda jika terjadi pelanggaran Terms of Service. Anda dapat terminate akun sendiri kapan saja melalui dashboard settings.'
      },
      {
        heading: '9. Perubahan Terms',
        content: 'Kami dapat mengubah Terms of Service dengan notifikasi 30 hari sebelumnya. Penggunaan berkelanjutan setelah perubahan berarti Anda menyetujui terms baru.'
      },
      {
        heading: '10. Hukum yang Berlaku',
        content: 'Terms of Service ini diatur oleh hukum Indonesia. Dispute resolution melalui mediasi, atau jika gagal, melalui pengadilan di Surabaya, Indonesia.'
      }
    ]
  },
  
  cookies: {
    icon: 'Cookie',
    title: 'Cookie Policy',
    description: 'Kebijakan Cookie AGROGUARD IoT',
    lastUpdated: 'November 2025',
    sections: [
      {
        heading: '1. Apa itu Cookies?',
        content: 'Cookies adalah file kecil yang disimpan di browser Anda saat mengunjungi website. Cookies membantu website mengingat preferensi Anda dan meningkatkan pengalaman browsing.'
      },
      {
        heading: '2. Jenis Cookies yang Kami Gunakan',
        content: 'AGROGUARD IoT menggunakan beberapa jenis cookies:',
        listItems: [
          'Essential Cookies: Diperlukan untuk fungsi dasar website (login, session)',
          'Functional Cookies: Mengingat preferensi Anda (tema dark/light, language)',
          'Analytics Cookies: Membantu kami memahami cara pengguna menggunakan website',
          'Performance Cookies: Monitoring kecepatan dan performance website'
        ]
      },
      {
        heading: '3. Essential Cookies (Wajib)',
        content: 'Cookies ini tidak dapat dinonaktifkan karena diperlukan untuk operasional website:',
        listItems: [
          'session_token: Menjaga login session Anda',
          'csrf_token: Keamanan untuk melindungi dari CSRF attacks',
          'cookie_consent: Menyimpan preferensi cookie Anda'
        ]
      },
      {
        heading: '4. Optional Cookies',
        content: 'Anda dapat memilih untuk mengaktifkan atau menonaktifkan cookies berikut:',
        listItems: [
          'theme_preference: Menyimpan pilihan dark/light mode',
          'language_preference: Bahasa yang Anda pilih',
          'analytics_id: Untuk Google Analytics (anonim)',
          'dashboard_layout: Layout preferences di dashboard'
        ]
      },
      {
        heading: '5. Third-Party Cookies',
        content: 'Kami menggunakan beberapa third-party services yang mungkin set cookies:',
        listItems: [
          'Google Analytics: Web analytics (data anonim)',
          'Unsplash: Image loading dan optimization',
          'Cloudflare: CDN dan security'
        ]
      },
      {
        heading: '6. Mengelola Cookies',
        content: 'Anda dapat mengelola cookies melalui:',
        listItems: [
          'Browser settings: Hapus atau block cookies',
          'Cookie consent banner: Pilih kategori yang ingin Anda terima',
          'Dashboard settings: Manage preferensi cookies spesifik AGROGUARD',
          'Opt-out tools: Google Analytics opt-out browser add-on'
        ]
      },
      {
        heading: '7. Cookies dan Mobile Apps',
        content: 'Jika Anda menggunakan mobile app AGROGUARD IoT, kami menggunakan teknologi serupa dengan cookies untuk menyimpan preferensi dan session data.'
      },
      {
        heading: '8. Perubahan Cookie Policy',
        content: 'Kami dapat memperbarui Cookie Policy ini. Perubahan akan ditampilkan di halaman ini dengan tanggal "Last Updated" yang baru.'
      }
    ]
  },
  
  licenses: {
    icon: 'Code2',
    title: 'Open Source Licenses',
    description: 'Lisensi Open Source yang Digunakan AGROGUARD IoT',
    lastUpdated: 'November 2025',
    sections: [
      {
        heading: '1. Penggunaan Open Source',
        content: 'AGROGUARD IoT dibangun dengan menggunakan berbagai library dan framework open source. Kami berterima kasih kepada komunitas open source atas kontribusinya.'
      },
      {
        heading: '2. React & React DOM',
        content: 'License: MIT License',
        listItems: [
          'Copyright (c) Meta Platforms, Inc. and affiliates.',
          'Digunakan untuk: UI framework dan rendering',
          'Repository: https://github.com/facebook/react'
        ]
      },
      {
        heading: '3. Tailwind CSS',
        content: 'License: MIT License',
        listItems: [
          'Copyright (c) Tailwind Labs, Inc.',
          'Digunakan untuk: Utility-first CSS framework',
          'Repository: https://github.com/tailwindlabs/tailwindcss'
        ]
      },
      {
        heading: '4. Lucide React',
        content: 'License: ISC License',
        listItems: [
          'Copyright (c) Lucide Contributors',
          'Digunakan untuk: Icon library',
          'Repository: https://github.com/lucide-icons/lucide'
        ]
      },
      {
        heading: '5. Radix UI',
        content: 'License: MIT License',
        listItems: [
          'Copyright (c) WorkOS',
          'Digunakan untuk: Accessible UI components (dialog, dropdown, dll)',
          'Repository: https://github.com/radix-ui/primitives'
        ]
      },
      {
        heading: '6. Leaflet',
        content: 'License: BSD 2-Clause License',
        listItems: [
          'Copyright (c) 2010-2023, Vladimir Agafonkin',
          'Digunakan untuk: Interactive maps',
          'Repository: https://github.com/Leaflet/Leaflet'
        ]
      },
      {
        heading: '7. TypeScript',
        content: 'License: Apache License 2.0',
        listItems: [
          'Copyright (c) Microsoft Corporation',
          'Digunakan untuk: Type-safe JavaScript',
          'Repository: https://github.com/microsoft/TypeScript'
        ]
      },
      {
        heading: '8. Other Dependencies',
        content: 'Library lain yang kami gunakan (semua open source):',
        listItems: [
          'clsx - MIT License (class name utilities)',
          'date-fns - MIT License (date manipulation)',
          'zustand - MIT License (state management)',
          'react-leaflet - Hippocratic License (React wrapper for Leaflet)'
        ]
      },
      {
        heading: '9. Full Attribution',
        content: 'Daftar lengkap dependencies dan lisensinya dapat dilihat di file package.json dan LICENSES.txt di repository kami.'
      },
      {
        heading: '10. Kontribusi',
        content: 'Jika Anda ingin berkontribusi ke AGROGUARD IoT atau melaporkan isu terkait licensing, silakan hubungi opensource@agroguard.id'
      }
    ]
  }
};

/**
 * Get legal content by type
 * @param type Legal document type
 * @returns LegalContentData
 */
export function getLegalContent(type: LegalType): LegalContentData {
  return legalContents[type];
}

/**
 * Get all legal types
 * @returns Array of legal types
 */
export function getAllLegalTypes(): LegalType[] {
  return Object.keys(legalContents) as LegalType[];
}

export default legalContents;
