/**
 * Footer Component
 * 
 * Landing page footer dengan informasi kontak, links, dan social media
 * Part of Landing Page modular components
 * 
 * Features:
 * - Data loaded from /data/demo-footer.ts
 * - Smooth scroll to sections
 * - Working social media links
 * - Click to copy contact info
 * - Modular and accessible
 */

import { 
  Linkedin,  
  Youtube, 
  ChevronUp,
  ExternalLink,
  MapPin,
  Mail,
  Phone,
  Sprout,
  LucideIcon
} from 'lucide-react';

import motion from '../ui/motion-replacement';
import { Separator } from '../ui/separator';
import { toast } from '../ui/simple-toast';
import { copyToClipboard } from '../../utils/clipboardHelpers';
import LegalDialog, { type LegalType } from './LegalDialog';
import { getFooterData } from '../../data';

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Linkedin: Linkedin,
  Youtube: Youtube,
  MapPin: MapPin,
  Mail: Mail,
  Phone: Phone
};

export default function Footer() {
  // Load footer data from /data/
  const footerData = getFooterData();
  
  // Smooth scroll handler for internal links
  const handleScrollTo = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    } else {
      // If section doesn't exist, scroll to top (for future sections)
      window.scrollTo({ top: 0, behavior: 'smooth' });
      toast.info(`Section "${sectionId}" akan segera tersedia`);
    }
  };

  // Handle contact info click - copy to clipboard
  const handleContactClick = async (text: string, type: string) => {
    await copyToClipboard(text, {
      onSuccess: () => {
        toast.success(`${type} berhasil disalin!`);
      },
      onError: () => {
        toast.error('Gagal menyalin. Silakan salin manual.');
      }
    });
  };

  return (
    <footer id="footer" className="bg-gradient-to-br from-[#0E172A] via-[#0B2F2B] to-[#0E172A] text-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#3B945E] rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0077B6] rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-3 mb-6 group cursor-pointer transition-smooth hover:scale-105"
                aria-label="Scroll to top"
              >
                <div className="bg-gradient-to-br from-[#3B945E] to-[#0077B6] p-3 rounded-2xl shadow-xl glow-primary group-hover:shadow-2xl transition-smooth">
                  <Sprout className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-white text-xl">{footerData.brand.name}</h3>
                  <p className="text-white/60 text-sm">{footerData.brand.tagline}</p>
                </div>
              </button>
              <p className="text-white/70 mb-6 leading-relaxed">
                {footerData.brand.description}
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                {footerData.contactInfo.map((contact, index) => {
                  const IconComponent = iconMap[contact.icon] || MapPin;
                  
                  return (
                    <div key={index}>
                      {contact.href ? (
                        <a
                          href={contact.href}
                          onClick={(e) => {
                            e.preventDefault();
                            handleContactClick(contact.copyText, contact.type);
                            // If it's an email or phone, also open in default app
                            if (contact.href.startsWith('mailto:') || contact.href.startsWith('tel:')) {
                              window.location.href = contact.href;
                            }
                          }}
                          className="flex items-center gap-3 text-white/70 hover:text-white transition-smooth cursor-pointer group"
                          title={`Klik untuk salin ${contact.type}`}
                        >
                          <div className="text-[#3B945E] group-hover:scale-110 transition-smooth">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <span className="text-sm">{contact.label}</span>
                        </a>
                      ) : (
                        <button
                          onClick={() => handleContactClick(contact.copyText, contact.type)}
                          className="flex items-center gap-3 text-white/70 hover:text-white transition-smooth cursor-pointer group w-full text-left"
                          title={`Klik untuk salin ${contact.type}`}
                        >
                          <div className="text-[#3B945E] group-hover:scale-110 transition-smooth">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <span className="text-sm">{contact.label}</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-white mb-4">Product</h4>
              <ul className="space-y-3">
                {footerData.links.product.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleScrollTo(link.sectionId)}
                      className="text-white/70 hover:text-white text-sm transition-smooth cursor-pointer hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-white mb-4">Company</h4>
              <ul className="space-y-3">
                {footerData.links.company.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleScrollTo(link.sectionId)}
                      className="text-white/70 hover:text-white text-sm transition-smooth cursor-pointer hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-white mb-4">Support</h4>
              <ul className="space-y-3">
                {footerData.links.support.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleScrollTo(link.sectionId)}
                      className="text-white/70 hover:text-white text-sm transition-smooth cursor-pointer hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-white mb-4">Legal</h4>
              <ul className="space-y-3">
                {footerData.links.legal.map((link, index) => (
                  <li key={index}>
                    <LegalDialog type={link.type}>
                      <button className="text-white/70 hover:text-white text-sm transition-smooth cursor-pointer hover:translate-x-1 inline-block text-left">
                        {link.label}
                      </button>
                    </LegalDialog>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Separator className="bg-white/10" />

        {/* Bottom Footer */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <p className="text-white/60 text-sm text-center md:text-left">
              &copy; {footerData.copyright.year} {footerData.copyright.text}
            </p>

            {/* Social Media */}
            <div className="flex gap-4">
              {footerData.socialMedia.map((social, index) => {
                const IconComponent = iconMap[social.icon] || Linkedin;
                
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full glass-card dark:glass-card-dark border border-white/20 flex items-center justify-center text-white hover:scale-110 hover:shadow-lg transition-all duration-300 group"
                    aria-label={social.label}
                    whileHover={{ y: -2 }}
                    style={{
                      boxShadow: `0 0 20px ${social.color}20`
                    }}
                  >
                    <IconComponent className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>

            {/* Scroll to Top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-smooth group"
              aria-label="Scroll to top"
            >
              <span className="hidden sm:inline">Back to Top</span>
              <ChevronUp className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
