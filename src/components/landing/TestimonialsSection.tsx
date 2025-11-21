/**
 * Testimonials Section Component - v3.0 CAROUSEL GROUPED SLIDES
 * ⚠️ SYNCHRONIZED with demo-data-sync.ts
 * 
 * Customer testimonials with auto-slide carousel
 * Features:
 * - Auto-advancing carousel slider (5 second intervals) ✅ FIXED
 * - Pause on hover, resume on leave
 * - 3 testimonials per slide (grouped)
 * - Real user data from Admin Dashboard
 * - Customer reviews with ratings
 * - Success metrics
 * - Profile photos/avatars
 * - Responsive grid layout (1/2/3 columns)
 * - 4 navigation methods: auto, arrows, dots, swipe ✅ ALL WORKING
 */

import { useState, useEffect } from 'react';
import motion from '../ui/motion-replacement';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from '../ui/carousel';
import { fetchTestimonials, type Testimonial } from '../../data';
import { MASTER_CONSTANTS, CALCULATED_VALUES } from '../../data';
import { TestimonialsSkeleton } from './SkeletonLoaders';
import ErrorState from './ErrorState';

export default function TestimonialsSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load testimonials data
  useEffect(() => {
    async function loadTestimonials() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchTestimonials();
        setTestimonials(data);
      } catch {
        setError('Gagal memuat testimoni. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    }
    loadTestimonials();
  }, []);

  // Update current slide when carousel changes
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', onSelect);
    onSelect();

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (!api || isPaused) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [api, isPaused]);

  // Retry loading
  const handleRetry = () => {
    setLoading(true);
    setError(null);
    fetchTestimonials()
      .then(setTestimonials)
      .catch(() => setError('Gagal memuat testimoni. Silakan coba lagi.'))
      .finally(() => setLoading(false));
  };

  // Group testimonials into slides of 3
  const testimonialsPerSlide = 3;
  const totalSlides = Math.ceil(testimonials.length / testimonialsPerSlide);

  return (
    <section 
      className="py-20 bg-gradient-to-br from-emerald-50/50 via-white to-blue-50/50 dark:from-[#0B2F2B] dark:via-[#0E172A] dark:to-[#0E172A] relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-20 dark:opacity-30">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#3B945E] rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#0077B6] rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          badge={{
            icon: Quote,
            text: 'Testimoni',
            color: 'bg-[#FFB703] dark:bg-[#FFC833]'
          }}
          title="Apa Kata Mereka?"
          description="Success stories dari petani dan agribusiness yang telah menggunakan AGROGUARD IoT"
        />

        {/* Loading State */}
        {loading && (
          <div className="max-w-6xl mx-auto">
            <TestimonialsSkeleton />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <ErrorState
            title="Gagal Memuat Testimoni"
            message={error}
            onRetry={handleRetry}
          />
        )}

        {/* Testimonials Carousel */}
        {!loading && !error && testimonials.length > 0 && (
          <div 
            className="max-w-7xl mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <Carousel
              setApi={setApi}
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {/* Group testimonials into slides of 3 */}
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <CarouselItem key={slideIndex}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                      {testimonials
                        .slice(slideIndex * testimonialsPerSlide, slideIndex * testimonialsPerSlide + testimonialsPerSlide)
                        .map((item, cardIndex) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: cardIndex * 0.1 }}
                            className="h-full"
                          >
                            <Card className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 p-6 h-full flex flex-col hover:shadow-2xl transition-smooth hover:scale-105">
                              {/* Header */}
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  <Avatar className="w-12 h-12 border-2 border-[#3B945E]/30">
                                    <AvatarFallback className="bg-gradient-to-br from-[#3B945E] to-[#0077B6] text-white">
                                      {item.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h4 className="text-foreground">{item.name}</h4>
                                    <p className="text-muted-foreground text-sm">{item.role}</p>
                                  </div>
                                </div>
                                <Quote className="w-8 h-8 text-[#3B945E]/20 dark:text-[#4CAF6E]/20" />
                              </div>

                              {/* Rating */}
                              <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-4 h-4 ${
                                      i < item.rating 
                                        ? 'fill-[#FFB703] text-[#FFB703]' 
                                        : 'text-gray-300 dark:text-gray-600'
                                    }`} 
                                  />
                                ))}
                              </div>

                              {/* Testimonial */}
                              <p className="text-muted-foreground leading-relaxed mb-4 flex-grow text-sm">
                                "{item.testimonial}"
                              </p>

                              {/* Company Info */}
                              <div className="mb-4 pb-4 border-b border-white/10">
                                <p className="text-foreground text-sm">{item.company}</p>
                                <p className="text-muted-foreground text-xs">{item.location}</p>
                              </div>

                              {/* Results */}
                              <div className="grid grid-cols-3 gap-2">
                                {item.results.map((result, idx) => (
                                  <div key={idx} className="text-center glass-card dark:glass-card-dark p-2 rounded-lg border border-white/20 dark:border-white/5">
                                    <div className="text-[#3B945E] dark:text-[#4CAF6E] mb-1 text-sm">
                                      {result.value}
                                    </div>
                                    <div className="text-muted-foreground text-xs">
                                      {result.label}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </Card>
                          </motion.div>
                        ))}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Navigation Arrows */}
              <CarouselPrevious className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 hover:border-[#3B945E]/50 transition-smooth -left-4 md:-left-12 z-10 cursor-pointer">
                <ChevronLeft className="w-6 h-6 text-[#3B945E] dark:text-[#4CAF6E]" />
              </CarouselPrevious>
              <CarouselNext className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 hover:border-[#3B945E]/50 transition-smooth -right-4 md:-right-12 z-10 cursor-pointer">
                <ChevronRight className="w-6 h-6 text-[#3B945E] dark:text-[#4CAF6E]" />
              </CarouselNext>
            </Carousel>

            {/* Dot Indicators - Updated to show slide count, not testimonial count */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalSlides }).map((_, index) => (
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

        {/* Stats Summary - Only show when data loaded */}
        {!loading && !error && testimonials.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { value: `${MASTER_CONSTANTS.TOTAL_USERS}+`, label: 'Petani Puas' },
              { value: '4.9/5', label: 'Rating Rata-rata' },
              { value: `${CALCULATED_VALUES.onlinePercentage}%`, label: 'Device Online' },
              { value: `${MASTER_CONSTANTS.TOTAL_DEVICES}`, label: 'Devices Aktif' }
            ].map((stat, index) => (
              <div key={index} className="text-center glass-card dark:glass-card-dark p-6 rounded-2xl border-2 border-white/30 dark:border-white/10 hover:shadow-xl transition-smooth">
                <div className="text-3xl md:text-4xl text-[#3B945E] dark:text-[#4CAF6E] mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
