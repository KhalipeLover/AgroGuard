/**
 * FAQ Section Component
 * 
 * Frequently Asked Questions section with accordion-style expandable items
 * Features:
 * - Categorized questions
 * - Smooth animations
 * - Glass morphism design
 * - Search/filter capability
 * - Mobile responsive
 */

import { useState, useEffect } from 'react';
import motion, { AnimatePresence } from '../ui/motion-replacement';
import { ChevronDown, HelpCircle, Search, Calculator } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import SectionHeader from './SectionHeader';
import { fetchFAQ, type FAQItem } from '../../data';
import { FAQSkeleton } from './SkeletonLoaders';
import ErrorState from './ErrorState';

interface FAQSectionProps {
  onNavigateToROI?: () => void;
}

export default function FAQSection({ onNavigateToROI }: FAQSectionProps = {}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [faqData, setFaqData] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load FAQ data
  useEffect(() => {
    async function loadFAQ() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchFAQ();
        setFaqData(data);
      } catch {
        setError('Gagal memuat FAQ. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    }
    loadFAQ();
  }, []);

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(faqData.map(item => item.category)))];

  // Filter FAQs based on search and category
  const filteredFAQs = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Retry loading
  const handleRetry = () => {
    setLoading(true);
    setError(null);
    fetchFAQ()
      .then(setFaqData)
      .catch(() => setError('Gagal memuat FAQ. Silakan coba lagi.'))
      .finally(() => setLoading(false));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-white via-blue-50/30 to-emerald-50/30 dark:from-[#0E172A] dark:via-[#0B2F2B] dark:to-[#0E172A] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-20 dark:opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#3B945E] rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0077B6] rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          badge={{
            icon: HelpCircle,
            text: 'FAQ',
            color: 'bg-[#0077B6] dark:bg-[#0099E6]'
          }}
          title="Pertanyaan yang Sering Ditanyakan"
          description="Temukan jawaban untuk pertanyaan umum tentang AGROGUARD IoT"
        />

        {/* Loading State */}
        {loading && (
          <div className="max-w-4xl mx-auto">
            <FAQSkeleton />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <ErrorState
            title="Gagal Memuat FAQ"
            message={error}
            onRetry={handleRetry}
          />
        )}

        {/* FAQ Content */}
        {!loading && !error && (
          <>
            {/* Search and Filter */}
            <div className="max-w-4xl mx-auto mb-12 space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Cari pertanyaan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 glass-card dark:glass-card-dark border-white/30 dark:border-white/10 focus:border-[#3B945E]/50 focus:ring-[#3B945E]/20 transition-smooth"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full transition-smooth ${
                      selectedCategory === category
                        ? 'bg-gradient-to-br from-[#3B945E] to-[#0077B6] text-white shadow-lg'
                        : 'glass-card dark:glass-card-dark border border-white/30 dark:border-white/10 text-foreground hover:border-[#3B945E]/50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ Items */}
            <div className="max-w-4xl mx-auto space-y-4">
              {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-smooth"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-start justify-between gap-4 text-left hover:bg-white/30 dark:hover:bg-white/5 transition-smooth"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="px-3 py-1 rounded-full text-xs bg-[#3B945E]/10 dark:bg-[#3B945E]/20 text-[#3B945E] dark:text-[#4CAF6E]">
                        {faq.category}
                      </span>
                    </div>
                    <h3 className="text-foreground group-hover:text-[#3B945E] transition-smooth">
                      {faq.question}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 mt-1"
                  >
                    <ChevronDown className="w-5 h-5 text-[#3B945E] dark:text-[#4CAF6E]" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-2 space-y-4">
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                        
                        {/* CTA untuk pertanyaan pricing - navigasi ke ROI Calculator */}
                        {faq.category === 'Support & Pricing' && 
                         faq.question.toLowerCase().includes('biaya') && 
                         onNavigateToROI && (
                          <div className="pt-2">
                            <Button
                              onClick={onNavigateToROI}
                              className="group bg-gradient-to-r from-[#3B945E] to-[#0077B6] hover:from-[#2d7a4a] hover:to-[#005a8d] text-white shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                              <Calculator className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                              Hitung ROI Anda
                            </Button>
                            <p className="text-xs text-muted-foreground mt-2">
                              Dapatkan estimasi biaya dan ROI sesuai lokasi dan luas lahan Anda
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
                ))
              ) : (
                <div className="text-center py-12">
                  <HelpCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-foreground mb-2">Tidak ada hasil ditemukan</h3>
                  <p className="text-muted-foreground">
                    Coba kata kunci lain atau pilih kategori berbeda
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Contact Support CTA - Only show when data loaded */}
        {!loading && !error && (
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto mt-16 text-center glass-card dark:glass-card-dark border-2 border-[#3B945E]/30 dark:border-[#3B945E]/20 rounded-2xl p-8 shadow-xl"
        >
          <h3 className="text-foreground mb-3">
            Tidak menemukan jawaban yang Anda cari?
          </h3>
          <p className="text-muted-foreground mb-6">
            Tim support kami siap membantu Anda 24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@agroguard.id"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-br from-[#3B945E] to-[#0077B6] text-white hover:shadow-lg transition-smooth"
            >
              Email Support
            </a>
            <a
              href="tel:+622112345678"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl glass-card dark:glass-card-dark border-2 border-[#3B945E]/30 text-foreground hover:border-[#3B945E]/50 transition-smooth"
            >
              Hubungi Kami
            </a>
          </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
