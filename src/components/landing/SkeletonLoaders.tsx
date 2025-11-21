/**
 * Skeleton Loaders for Landing Page Sections
 * 
 * Reusable skeleton components with Neo-Skeuo Glass Fusion design
 * Consistent with AGROGUARD IoT design system
 */

import { Skeleton } from '../ui/skeleton';

/**
 * Statistics Skeleton - For Hero Section
 */
export function StatisticsSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="glass-card dark:glass-card-dark p-6 rounded-2xl border-2 border-white/30 dark:border-white/10 backdrop-blur-xl"
        >
          <div className="flex items-center gap-4">
            <Skeleton className="w-12 h-12 rounded-xl bg-white/20 dark:bg-white/5" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-8 w-20 bg-white/20 dark:bg-white/5" />
              <Skeleton className="h-4 w-24 bg-white/20 dark:bg-white/5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * SDG Goals Skeleton
 */
export function SDGGoalsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="glass-card dark:glass-card-dark p-6 rounded-2xl border-2 border-white/30 dark:border-white/10 backdrop-blur-xl"
        >
          <Skeleton className="w-20 h-20 rounded-2xl mb-4 bg-white/20 dark:bg-white/5" />
          <Skeleton className="h-6 w-32 mb-2 bg-white/20 dark:bg-white/5" />
          <Skeleton className="h-4 w-full mb-1 bg-white/20 dark:bg-white/5" />
          <Skeleton className="h-4 w-3/4 bg-white/20 dark:bg-white/5" />
        </div>
      ))}
    </div>
  );
}

/**
 * Features Skeleton
 */
export function FeaturesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="glass-card dark:glass-card-dark p-6 md:p-8 rounded-2xl border-2 border-white/30 dark:border-white/10 backdrop-blur-xl"
        >
          <Skeleton className="w-16 h-16 rounded-2xl mb-4 bg-white/20 dark:bg-white/5" />
          <Skeleton className="h-6 w-3/4 mb-3 bg-white/20 dark:bg-white/5" />
          <Skeleton className="h-4 w-full mb-2 bg-white/20 dark:bg-white/5" />
          <Skeleton className="h-4 w-5/6 bg-white/20 dark:bg-white/5" />
        </div>
      ))}
    </div>
  );
}

/**
 * Use Cases Skeleton
 */
export function UseCasesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="glass-card dark:glass-card-dark rounded-2xl overflow-hidden border-2 border-white/30 dark:border-white/10 backdrop-blur-xl"
        >
          <Skeleton className="w-full h-48 bg-white/20 dark:bg-white/5" />
          <div className="p-6">
            <Skeleton className="h-6 w-2/3 mb-3 bg-white/20 dark:bg-white/5" />
            <Skeleton className="h-4 w-full mb-2 bg-white/20 dark:bg-white/5" />
            <Skeleton className="h-4 w-4/5 mb-4 bg-white/20 dark:bg-white/5" />
            <div className="flex gap-3">
              <Skeleton className="h-8 w-20 rounded-full bg-white/20 dark:bg-white/5" />
              <Skeleton className="h-8 w-24 rounded-full bg-white/20 dark:bg-white/5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Benefits Skeleton
 */
export function BenefitsSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="flex items-start gap-4 p-4 glass-card dark:glass-card-dark rounded-xl border border-white/30 dark:border-white/10 backdrop-blur-md"
        >
          <Skeleton className="w-5 h-5 rounded-full flex-shrink-0 bg-white/20 dark:bg-white/5" />
          <Skeleton className="h-5 flex-1 bg-white/20 dark:bg-white/5" />
        </div>
      ))}
    </div>
  );
}

/**
 * How It Works Skeleton
 */
export function HowItWorksSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="relative glass-card dark:glass-card-dark p-8 rounded-2xl border-2 border-white/30 dark:border-white/10 backdrop-blur-xl"
        >
          <Skeleton className="w-16 h-16 rounded-full mb-6 bg-white/20 dark:bg-white/5" />
          <Skeleton className="h-8 w-24 mb-4 bg-white/20 dark:bg-white/5" />
          <Skeleton className="h-6 w-3/4 mb-3 bg-white/20 dark:bg-white/5" />
          <Skeleton className="h-4 w-full mb-2 bg-white/20 dark:bg-white/5" />
          <Skeleton className="h-4 w-5/6 bg-white/20 dark:bg-white/5" />
        </div>
      ))}
    </div>
  );
}

/**
 * Testimonials Skeleton
 */
export function TestimonialsSkeleton() {
  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div className="flex gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <div className="glass-card dark:glass-card-dark p-6 md:p-8 rounded-2xl border-2 border-white/30 dark:border-white/10 backdrop-blur-xl h-full">
                <div className="flex items-start gap-4 mb-6">
                  <Skeleton className="w-14 h-14 rounded-full bg-white/20 dark:bg-white/5" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-32 bg-white/20 dark:bg-white/5" />
                    <Skeleton className="h-4 w-24 bg-white/20 dark:bg-white/5" />
                    <Skeleton className="h-4 w-28 bg-white/20 dark:bg-white/5" />
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  <Skeleton className="h-4 w-full bg-white/20 dark:bg-white/5" />
                  <Skeleton className="h-4 w-full bg-white/20 dark:bg-white/5" />
                  <Skeleton className="h-4 w-3/4 bg-white/20 dark:bg-white/5" />
                </div>
                <div className="flex gap-3">
                  <Skeleton className="h-12 flex-1 rounded-lg bg-white/20 dark:bg-white/5" />
                  <Skeleton className="h-12 flex-1 rounded-lg bg-white/20 dark:bg-white/5" />
                  <Skeleton className="h-12 flex-1 rounded-lg bg-white/20 dark:bg-white/5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Documentation Skeleton
 */
export function DocumentationSkeleton() {
  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div className="flex gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <div className="glass-card dark:glass-card-dark rounded-2xl overflow-hidden border-2 border-white/30 dark:border-white/10 backdrop-blur-xl">
                <Skeleton className="w-full h-56 bg-white/20 dark:bg-white/5" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-5 w-24 rounded-full bg-white/20 dark:bg-white/5" />
                  <Skeleton className="h-6 w-3/4 bg-white/20 dark:bg-white/5" />
                  <Skeleton className="h-4 w-full bg-white/20 dark:bg-white/5" />
                  <Skeleton className="h-4 w-5/6 bg-white/20 dark:bg-white/5" />
                  <Skeleton className="h-10 w-full rounded-xl bg-white/20 dark:bg-white/5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * FAQ Skeleton
 */
export function FAQSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="glass-card dark:glass-card-dark p-6 rounded-2xl border-2 border-white/30 dark:border-white/10 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between mb-3">
            <Skeleton className="h-5 w-3/4 bg-white/20 dark:bg-white/5" />
            <Skeleton className="w-5 h-5 rounded bg-white/20 dark:bg-white/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Generic Content Skeleton
 */
export function ContentSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 bg-white/20 dark:bg-white/5 ${
            i === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        />
      ))}
    </div>
  );
}
