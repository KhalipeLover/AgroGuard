/**
 * Documentation Section Component - v2.0 AUTO CAROUSEL ADDED
 * 
 * Interactive carousel slider with documentation guides and tutorials
 * Features:
 * - Carousel slider with navigation
 * - Auto-advancing every 6 seconds ✅ NEW
 * - Pause on hover, resume on leave ✅ NEW
 * - Photo with description per slide
 * - Category badges
 * - Responsive layout
 * - Touch/swipe support
 * - Clickable tutorial buttons with modal
 * - PDF download simulation
 * - External link handling
 * - Toast notifications
 * - Step-by-step tutorial viewer
 * - ALL navigation working (auto, arrows, dots, swipe) ✅ FIXED
 */

import { useState, useEffect } from 'react';
import motion from '../ui/motion-replacement';
import { ChevronLeft, ChevronRight, Download, ExternalLink, FileText, Book, BookOpen, CheckCircle } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from '../ui/carousel';
import { Card } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import SectionHeader from './SectionHeader';
import { toast } from '../ui/simple-toast';
import { fetchDocumentation, type DocumentationSlide } from '../../data';
import { DocumentationSkeleton } from './SkeletonLoaders';
import ErrorState from './ErrorState';

export default function DocumentationSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState<DocumentationSlide | null>(null);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [documentationSlides, setDocumentationSlides] = useState<DocumentationSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load documentation data
  useEffect(() => {
    async function loadDocumentation() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchDocumentation();
        setDocumentationSlides(data);
      } catch {
        setError('Gagal memuat dokumentasi. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    }
    loadDocumentation();
  }, []);

  // Update current slide when carousel changes
  useEffect(() => {
    if (!api) return;

    // Set initial current slide
    setCurrent(api.selectedScrollSnap());

    // Listen to select event
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    // Cleanup
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Auto-advance carousel every 6 seconds
  useEffect(() => {
    if (!api || isPaused) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [api, isPaused]);

  // Retry loading
  const handleRetry = () => {
    setLoading(true);
    setError(null);
    fetchDocumentation()
      .then(setDocumentationSlides)
      .catch(() => setError('Gagal memuat dokumentasi. Silakan coba lagi.'))
      .finally(() => setLoading(false));
  };

  // Handle tutorial view
  const handleViewTutorial = (slide: DocumentationSlide) => {
    setSelectedSlide(slide);
    setIsTutorialOpen(true);
  };

  // Handle PDF download
  const handleDownloadPDF = (slide: DocumentationSlide) => {
    // Simulate PDF download
    toast.success('Downloading PDF...', {
      description: `${slide.pdfUrl || 'document.pdf'} will be downloaded shortly`,
      duration: 3000,
    });

    // In a real app, this would trigger actual file download
    // const link = document.createElement('a');
    // link.href = slide.pdfUrl;
    // link.download = slide.pdfUrl;
    // link.click();
  };

  // Handle external link
  const handleExternalLink = (url: string, title: string) => {
    toast.info('Opening external link...', {
      description: title,
      duration: 2000,
    });
    // window.open(url, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50/50 via-white to-emerald-50/50 dark:from-[#0E172A] dark:via-[#0B2F2B] dark:to-[#0E172A] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-20 dark:opacity-30">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#0077B6] rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-[#3B945E] rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          badge={{
            icon: BookOpen,
            text: 'Dokumentasi',
            color: 'bg-[#0077B6] dark:bg-[#0099E6]'
          }}
          title="Panduan & Tutorial"
          description="Pelajari cara menggunakan AGROGUARD IoT"
        />

        {/* Loading State */}
        {loading && (
          <div className="max-w-5xl mx-auto">
            <DocumentationSkeleton />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <ErrorState
            title="Gagal Memuat Dokumentasi"
            message={error}
            onRetry={handleRetry}
          />
        )}

        {/* Documentation Carousel */}
        {!loading && !error && documentationSlides.length > 0 && (
          <div 
            className="max-w-5xl mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <Carousel
              setApi={setApi}
              opts={{
                align: 'center',
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {documentationSlides.map((slide, index) => (
                <CarouselItem key={slide.id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="p-2"
                  >
                    <Card className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 overflow-hidden shadow-2xl">
                      <div className="grid md:grid-cols-2 gap-0">
                        {/* Image Side */}
                        <div className="relative h-64 md:h-auto overflow-hidden">
                          <ImageWithFallback
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                          />
                          {/* Category Badge on Image */}
                          <div className="absolute top-4 left-4">
                            <span className={`px-4 py-2 rounded-full text-white text-sm ${slide.categoryColor} shadow-lg backdrop-blur-sm`}>
                              {slide.category}
                            </span>
                          </div>
                          {/* Step Number */}
                          <div className="absolute bottom-4 right-4">
                            <div className="w-12 h-12 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                              <span className="text-foreground">{slide.id}/6</span>
                            </div>
                          </div>
                        </div>

                        {/* Content Side */}
                        <div className="p-8 flex flex-col justify-center">
                          <h3 className="text-foreground text-2xl mb-4">
                            {slide.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed mb-6">
                            {slide.description}
                          </p>
                          
                          {/* Action Buttons */}
                          <div className="flex gap-3">
                            <button 
                              onClick={() => handleViewTutorial(slide)}
                              className="px-6 py-3 rounded-xl bg-gradient-to-br from-[#3B945E] to-[#0077B6] text-white hover:shadow-lg hover:scale-105 active:scale-95 transition-smooth flex items-center gap-2"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Lihat Tutorial
                            </button>
                            <button 
                              onClick={() => handleDownloadPDF(slide)}
                              className="px-6 py-3 rounded-xl glass-card dark:glass-card-dark border-2 border-[#3B945E]/30 text-foreground hover:border-[#3B945E]/50 hover:scale-105 active:scale-95 transition-smooth flex items-center gap-2"
                            >
                              <Download className="w-4 h-4" />
                              Download PDF
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Arrows - FIXED: Proper z-index and pointer-events */}
            <CarouselPrevious className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 hover:border-[#3B945E]/50 transition-smooth -left-4 md:-left-12 z-10 cursor-pointer">
              <ChevronLeft className="w-6 h-6 text-[#3B945E] dark:text-[#4CAF6E]" />
            </CarouselPrevious>
            <CarouselNext className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 hover:border-[#3B945E]/50 transition-smooth -right-4 md:-right-12 z-10 cursor-pointer">
              <ChevronRight className="w-6 h-6 text-[#3B945E] dark:text-[#4CAF6E]" />
            </CarouselNext>
          </Carousel>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {documentationSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 rounded-full transition-smooth cursor-pointer ${
                  index === current
                    ? 'w-8 bg-gradient-to-r from-[#3B945E] to-[#0077B6]'
                    : 'w-2 glass-card dark:glass-card-dark border border-white/30 dark:border-white/10 hover:border-[#3B945E]/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          </div>
        )}

        {/* Additional Resources - Only show when data loaded */}
        {!loading && !error && documentationSlides.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <Card className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 p-6 text-center hover:shadow-xl transition-smooth">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3B945E] to-[#0077B6] flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-foreground mb-2">Full Documentation</h4>
              <p className="text-muted-foreground text-sm mb-4">
                Akses dokumentasi lengkap dengan search dan filter
              </p>
              {/* <button 
                onClick={() => handleExternalLink('https://docs.agroguard.id', 'Full Documentation')}
                className="text-[#3B945E] dark:text-[#4CAF6E] hover:underline text-sm hover:scale-105 transition-smooth inline-flex items-center gap-1"
              >
                Buka Docs →
              </button> */}
            </Card>

            <Card className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 p-6 text-center hover:shadow-xl transition-smooth">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFB703] to-[#F59E0B] flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-foreground mb-2">Video Tutorials</h4>
              <p className="text-muted-foreground text-sm mb-4">
                Tutorial video step-by-step dari setup hingga advanced
              </p>
              {/* <button 
                onClick={() => handleExternalLink('https://youtube.com/@agroguard', 'Video Tutorials')}
                className="text-[#FFB703] dark:text-[#FFC833] hover:underline text-sm hover:scale-105 transition-smooth inline-flex items-center gap-1"
              >
                Watch Now →
              </button> */}
            </Card>

            <Card className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 p-6 text-center hover:shadow-xl transition-smooth">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0077B6] to-[#06B6D4] flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h4 className="text-foreground mb-2">Community Forum</h4>
              <p className="text-muted-foreground text-sm mb-4">
                Diskusi dengan pengguna lain dan dapatkan tips
              </p>
              {/* <button 
                onClick={() => handleExternalLink('https://forum.agroguard.id', 'Community Forum')}
                className="text-[#0077B6] dark:text-[#0099E6] hover:underline text-sm hover:scale-105 transition-smooth inline-flex items-center gap-1"
              >
                Join Forum →
              </button> */}
            </Card>
          </motion.div>
        )}
      </div>

      {/* Tutorial Dialog - Mobile-First Responsive Design */}
      <Dialog open={isTutorialOpen} onOpenChange={setIsTutorialOpen}>
        <DialogContent className="w-full h-full sm:w-[calc(100vw-4rem)] max-w-full sm:max-w-4xl sm:h-auto sm:max-h-[95vh] bg-white/98 dark:bg-[#0E172A]/98 sm:bg-white/95 sm:dark:bg-[#0E172A]/95 backdrop-blur-xl border-0 sm:border-2 sm:border-white/30 sm:dark:border-white/10 shadow-2xl p-0 gap-0 rounded-none sm:rounded-xl">
          {selectedSlide && (
            <>
              {/* Mobile-Optimized Header */}
              <DialogHeader className="flex-shrink-0 px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b border-white/20 dark:border-white/10 bg-gradient-to-br from-[#3B945E]/10 to-[#0077B6]/10 dark:from-[#3B945E]/20 dark:to-[#0077B6]/20 sm:bg-gradient-to-r sm:from-white/40 sm:to-white/20 sm:dark:from-black/30 sm:dark:to-black/20 backdrop-blur-md gap-0">
                {/* Mobile: Compact Header */}
                <div className="flex sm:hidden items-center gap-3">
                  <div className={`p-2 rounded-lg ${selectedSlide.categoryColor} text-white shadow-md flex-shrink-0`}>
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <DialogTitle className="text-lg text-foreground mb-0.5 truncate">
                      {selectedSlide.title}
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                      {selectedSlide.description}
                    </DialogDescription>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-white text-xs ${selectedSlide.categoryColor}`}>
                      {selectedSlide.category}
                    </span>
                  </div>
                </div>

                {/* Desktop/Tablet: Full Header */}
                <div className="hidden sm:flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className={`p-3 rounded-xl ${selectedSlide.categoryColor} text-white shadow-lg flex-shrink-0`}>
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <DialogTitle className="text-2xl text-foreground mb-1 truncate">
                        {selectedSlide.title}
                      </DialogTitle>
                      <DialogDescription className="text-sm text-muted-foreground line-clamp-2">
                        {selectedSlide.description}
                      </DialogDescription>
                    </div>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-white text-sm ${selectedSlide.categoryColor} shadow-md flex-shrink-0`}>
                    {selectedSlide.category}
                  </span>
                </div>
              </DialogHeader>

              {/* Scrollable Content Area - Responsive Padding */}
              <div className="overflow-y-auto h-[calc(100vh-180px)] sm:h-auto sm:max-h-[calc(95vh-240px)] px-3 sm:px-6 py-3 sm:py-6">
                <div className="space-y-4 sm:space-y-8">
                  {/* Mobile-Optimized Image */}
                  <div className="relative w-full h-40 sm:h-64 md:h-80 rounded-lg sm:rounded-2xl overflow-hidden border border-white/30 sm:border-2 dark:border-white/20 shadow-xl sm:shadow-2xl">
                    <ImageWithFallback
                      src={selectedSlide.image}
                      alt={selectedSlide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                  </div>

                  {/* Tutorial Steps - Mobile-Compact Design */}
                  {selectedSlide.tutorialSteps && selectedSlide.tutorialSteps.length > 0 && (
                    <div className="space-y-3 sm:space-y-4 pb-2 sm:pb-4">
                      {/* Mobile: Simplified Header */}
                      <div className="flex items-center gap-2 sm:gap-3 pb-2 border-b border-white/20 dark:border-white/10">
                        <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-[#3B945E] to-[#0077B6] dark:from-[#4CAF6E] dark:to-[#0099E6] text-white shadow-md">
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <h3 className="text-base sm:text-xl text-foreground">
                          Langkah-langkah Tutorial
                        </h3>
                      </div>
                      
                      {/* Steps Grid - Mobile Compact */}
                      <div className="grid gap-2.5 sm:gap-4">
                        {selectedSlide.tutorialSteps.map((step, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.08, duration: 0.3 }}
                            className="group relative"
                          >
                            {/* Mobile: Compact Step Card */}
                            <div className="flex gap-2.5 sm:gap-4 p-3 sm:p-5 bg-white/80 dark:bg-white/5 sm:bg-white/70 sm:dark:bg-white/5 rounded-lg sm:rounded-xl border border-white/30 dark:border-white/10 backdrop-blur-md hover:bg-white/95 dark:hover:bg-white/10 hover:border-[#3B945E]/40 dark:hover:border-[#4CAF6E]/40 hover:shadow-lg transition-all duration-300">
                              <div className="flex-shrink-0 w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#3B945E] to-[#0077B6] dark:from-[#4CAF6E] dark:to-[#0099E6] flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                                <span className="text-sm sm:text-base font-semibold">{index + 1}</span>
                              </div>
                              <p className="flex-1 text-sm sm:text-base text-muted-foreground leading-snug sm:leading-relaxed pt-0.5 sm:pt-1.5">
                                {step}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile-Optimized Footer */}
              <div className="flex-shrink-0 px-3 sm:px-6 py-3 sm:py-5 border-t border-white/20 dark:border-white/10 bg-gradient-to-br from-[#3B945E]/5 to-[#0077B6]/5 dark:from-[#3B945E]/10 dark:to-[#0077B6]/10 sm:bg-gradient-to-r sm:from-white/50 sm:to-white/30 sm:dark:from-black/30 sm:dark:to-black/20 backdrop-blur-md">
                <div className="grid grid-cols-1 gap-2 sm:gap-3">
                  {/* Download PDF Button - Mobile-Optimized */}
                  <button
                    onClick={() => handleDownloadPDF(selectedSlide)}
                    className="group relative overflow-hidden px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#3B945E] to-[#0077B6] dark:from-[#4CAF6E] dark:to-[#0099E6] sm:bg-white/80 sm:dark:bg-white/10 border-2 border-transparent sm:border-[#3B945E]/30 sm:dark:border-[#4CAF6E]/30 text-white sm:text-foreground shadow-md hover:shadow-lg sm:hover:bg-white sm:dark:hover:bg-white/15 sm:hover:border-[#3B945E] sm:dark:hover:border-[#4CAF6E] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 backdrop-blur-md"
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5 text-white sm:text-[#3B945E] sm:dark:text-[#4CAF6E]" />
                    <span className="text-sm sm:text-base font-medium">Download PDF</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
