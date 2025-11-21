/**
 * BenefitsSection Component
 * 
 * Benefits section dengan list dan image
 * Part of Landing Page modular components
 */

import motion from '../ui/motion-replacement';
import { Badge } from '../ui/badge';
import { CheckCircle2, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { BenefitsSkeleton } from './SkeletonLoaders';
import ErrorState from './ErrorState';

interface Benefit {
  text: string;
  icon: React.ReactNode;
}

interface BenefitsSectionProps {
  benefits: Benefit[];
  imageUrl?: string;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export default function BenefitsSection({ 
  benefits, 
  imageUrl = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzbWFydCUyMGZhcm0lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MTIyNzc5MXww&ixlib=rb-4.1.0&q=80&w=1080',
  loading = false,
  error = null,
  onRetry
}: BenefitsSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-[#3B945E] to-[#0077B6] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 right-10 w-96 h-96 bg-white rounded-full filter blur-3xl animate-blob" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#06B6D4] rounded-full filter blur-3xl animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <BenefitsSkeleton />
            <div className="h-96 glass-card dark:glass-card-dark rounded-2xl animate-pulse" />
          </div>
        )}

        {/* Error State */}
        {error && !loading && onRetry && (
          <div className="max-w-md mx-auto">
            <div className="glass-card p-6 rounded-2xl border-2 border-white/30 text-center">
              <p className="text-white mb-4">{error}</p>
              <button
                onClick={onRetry}
                className="px-6 py-2 rounded-xl bg-white text-[#3B945E] hover:bg-white/90 transition-smooth"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        )}

        {/* Success State */}
        {!loading && !error && benefits.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="glass-card text-white px-4 py-2 mb-4 border border-white/30">
                <TrendingUp className="w-4 h-4 mr-2 inline" />
                Manfaat Nyata
              </Badge>
              <div className="mb-6">
                <h2 className="text-white">Mengapa AGROGUARD?</h2>
              </div>
              <div className="mb-8">
                <p className="text-white/90">
                  Teknologi presisi yang terbukti meningkatkan efisiensi dan produktivitas pertanian modern
                </p>
              </div>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="text-white mt-0.5">
                      {benefit.icon}
                    </div>
                    <p className="text-white/90">{benefit.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <ImageWithFallback
                src={imageUrl}
                alt="Smart Farming Technology"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
