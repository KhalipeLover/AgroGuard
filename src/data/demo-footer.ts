/**
 * Demo Footer Data
 * 
 * Footer content untuk Landing Page:
 * - Footer links (product, company, support)
 * - Social media links
 * - Contact information
 */

import type { LegalType } from './demo-legal-content';

export interface FooterLink {
  label: string;
  sectionId: string;
}

export interface LegalLink {
  label: string;
  type: LegalType;
}

export interface SocialMedia {
  icon: string; // Icon name from lucide-react
  href: string;
  label: string;
  color: string;
}

export interface ContactInfo {
  icon: string; // Icon name from lucide-react
  label: string;
  type: string;
  copyText: string;
  href?: string;
}

export interface FooterData {
  brand: {
    name: string;
    tagline: string;
    description: string;
  };
  links: {
    product: FooterLink[];
    company: FooterLink[];
    support: FooterLink[];
    legal: LegalLink[];
  };
  socialMedia: SocialMedia[];
  contactInfo: ContactInfo[];
  copyright: {
    year: number;
    text: string;
  };
}

const footerData: FooterData = {
  brand: {
    name: 'AGROGUARD IoT',
    tagline: 'Smart Agriculture Solution',
    description: 'Platform monitoring pertanian cerdas berbasis IoT yang membantu petani meningkatkan efisiensi dan produktivitas dengan teknologi presisi.'
  },
  
  links: {
    product: [
      { label: 'Fitur', sectionId: 'features' },
      { label: 'Use Cases', sectionId: 'use-cases' },
      { label: 'How It Works', sectionId: 'how-it-works' },
      { label: 'Manfaat', sectionId: 'benefits' },
      { label: 'Kalkulator ROI', sectionId: 'roi-calculator' }
    ],
    company: [
      { label: 'Tentang Kami', sectionId: 'hero' },
      { label: 'SDG Goals', sectionId: 'sdg' },
      { label: 'Testimoni', sectionId: 'testimonials' },
      { label: 'Kontak', sectionId: 'footer' }
    ],
    support: [
      { label: 'Dokumentasi', sectionId: 'documentation' },
      { label: 'Tutorial', sectionId: 'how-it-works' },
      { label: 'FAQ', sectionId: 'faq' },
      { label: 'Hubungi Kami', sectionId: 'footer' }
    ],
    legal: [
      { label: 'Privacy Policy', type: 'privacy' },
      { label: 'Terms of Service', type: 'terms' },
      { label: 'Cookie Policy', type: 'cookies' },
      { label: 'Open Source', type: 'licenses' }
    ]
  },
  
  socialMedia: [
    {
      icon: 'Linkedin',
      href: 'https://linkedin.com/company/agroguard-iot',
      label: 'LinkedIn',
      color: '#0A66C2'
    },
    {
      icon: 'Youtube',
      href: 'https://youtube.com/@agroguard-iot',
      label: 'YouTube',
      color: '#FF0000'
    }
  ],
  
  contactInfo: [
    {
      icon: 'MapPin',
      label: 'Surabaya, Indonesia',
      type: 'Alamat',
      copyText: 'Surabaya, Indonesia'
    },
    {
      icon: 'Mail',
      label: 'info@agroguard.id',
      type: 'Email',
      copyText: 'info@agroguard.id',
      href: 'mailto:info@agroguard.id'
    },
    {
      icon: 'Phone',
      label: '+6281357097158',
      type: 'Telepon',
      copyText: '+6281357097158',
      href: 'tel:+6281357097158'
    }
  ],
  
  copyright: {
    year: new Date().getFullYear(),
    text: 'AGROGUARD IoT. All rights reserved.'
  }
};

/**
 * Get footer data
 * @returns FooterData
 */
export function getFooterData(): FooterData {
  return footerData;
}

/**
 * Get social media links
 * @returns SocialMedia[]
 */
export function getSocialMediaLinks(): SocialMedia[] {
  return footerData.socialMedia;
}

/**
 * Get contact information
 * @returns ContactInfo[]
 */
export function getContactInfo(): ContactInfo[] {
  return footerData.contactInfo;
}

export default footerData;
