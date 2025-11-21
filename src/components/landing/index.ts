/**
 * Landing Page Components Index
 * 
 * Centralized exports for all landing page components
 */

// Section Components
export { default as HeroSection } from './HeroSection';
export { default as SectionHeader } from './SectionHeader';
export { default as BenefitsSection } from './BenefitsSection';
export { default as CTASection } from './CTASection';
export { default as FAQSection } from './FAQSection';
export { default as TestimonialsSection } from './TestimonialsSection';
export { default as DocumentationSection } from './DocumentationSection';
export { default as Footer } from './Footer';
export { ROICalculator } from './ROICalculator';

// Card Components
export { default as SDGCard } from './SDGCard';
export { default as UseCaseCard } from './UseCaseCard';
export { default as FeatureCard } from './FeatureCard';
export { default as HowItWorksCard } from './HowItWorksCard';

// Utility Components
export { default as ScrollToTop } from './ScrollToTop';
export { default as SectionBackground } from './SectionBackground';
export { default as LegalDialog } from './LegalDialog';
export type { LegalType } from './LegalDialog';
export { default as LeadDialog } from './LeadDialog';
export { default as ErrorState } from './ErrorState';

// Skeleton Loaders
export {
  StatisticsSkeleton,
  SDGGoalsSkeleton,
  FeaturesSkeleton,
  UseCasesSkeleton,
  BenefitsSkeleton,
  HowItWorksSkeleton,
  TestimonialsSkeleton,
  DocumentationSkeleton,
  FAQSkeleton,
  ContentSkeleton
} from './SkeletonLoaders';
