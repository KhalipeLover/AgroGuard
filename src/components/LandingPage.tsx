/**
 * Landing Page Component
 * 
 * Main landing page with async data loading from /data/
 * All sections use centralized data management
 */

import { useState, useEffect } from 'react';
import { Target, Award } from 'lucide-react';
import * as Icons from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import {
  HeroSection,
  SectionHeader,
  SectionBackground,
  SDGCard,
  UseCaseCard,
  FeatureCard,
  HowItWorksCard,
  BenefitsSection,
  CTASection,
  FAQSection,
  TestimonialsSection,
  DocumentationSection,
  Footer,
  ScrollToTop,
  SDGGoalsSkeleton,
  FeaturesSkeleton,
  UseCasesSkeleton,
  BenefitsSkeleton,
  HowItWorksSkeleton,
  ErrorState,
  ROICalculator
} from './landing';
import {
  fetchSDGGoals,
  fetchFeatures,
  fetchUseCases,
  fetchBenefits,
  fetchHowItWorks,
  fetchStatistics,
  type SDGGoal,
  type Feature,
  type UseCase,
  type Benefit,
  type HowItWorksStep,
  type Statistic
} from '../data';

interface LandingPageProps {
  onNavigate: (page: 'device-setup' | 'login') => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  // State for all sections
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [sdgGoals, setSdgGoals] = useState<SDGGoal[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [useCases, setUseCases] = useState<UseCase[]>([]);
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [howItWorks, setHowItWorks] = useState<HowItWorksStep[]>([]);
  
  // Function to scroll to ROI Calculator
  const scrollToROICalculator = () => {
    const roiSection = document.getElementById('roi-calculator');
    if (roiSection) {
      roiSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Loading states
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingSDG, setLoadingSDG] = useState(true);
  const [loadingFeatures, setLoadingFeatures] = useState(true);
  const [loadingUseCases, setLoadingUseCases] = useState(true);
  const [loadingBenefits, setLoadingBenefits] = useState(true);
  const [loadingHowItWorks, setLoadingHowItWorks] = useState(true);

  // Error states
  const [errorStats, setErrorStats] = useState<string | null>(null);
  const [errorSDG, setErrorSDG] = useState<string | null>(null);
  const [errorFeatures, setErrorFeatures] = useState<string | null>(null);
  const [errorUseCases, setErrorUseCases] = useState<string | null>(null);
  const [errorBenefits, setErrorBenefits] = useState<string | null>(null);
  const [errorHowItWorks, setErrorHowItWorks] = useState<string | null>(null);

  // Load all data on mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = () => {
    loadStatistics();
    loadSDGGoals();
    loadFeatures();
    loadUseCases();
    loadBenefits();
    loadHowItWorksSteps();
  };

  const loadStatistics = async () => {
    try {
      setLoadingStats(true);
      setErrorStats(null);
      const data = await fetchStatistics();
      setStatistics(data);
    } catch {
      setErrorStats('Gagal memuat statistik');
    } finally {
      setLoadingStats(false);
    }
  };

  const loadSDGGoals = async () => {
    try {
      setLoadingSDG(true);
      setErrorSDG(null);
      const data = await fetchSDGGoals();
      setSdgGoals(data);
    } catch {
      setErrorSDG('Gagal memuat SDG goals');
    } finally {
      setLoadingSDG(false);
    }
  };

  const loadFeatures = async () => {
    try {
      setLoadingFeatures(true);
      setErrorFeatures(null);
      const data = await fetchFeatures();
      setFeatures(data);
    } catch {
      setErrorFeatures('Gagal memuat fitur');
    } finally {
      setLoadingFeatures(false);
    }
  };

  const loadUseCases = async () => {
    try {
      setLoadingUseCases(true);
      setErrorUseCases(null);
      const data = await fetchUseCases();
      setUseCases(data);
    } catch {
      setErrorUseCases('Gagal memuat use cases');
    } finally {
      setLoadingUseCases(false);
    }
  };

  const loadBenefits = async () => {
    try {
      setLoadingBenefits(true);
      setErrorBenefits(null);
      const data = await fetchBenefits();
      setBenefits(data);
    } catch {
      setErrorBenefits('Gagal memuat benefits');
    } finally {
      setLoadingBenefits(false);
    }
  };

  const loadHowItWorksSteps = async () => {
    try {
      setLoadingHowItWorks(true);
      setErrorHowItWorks(null);
      const data = await fetchHowItWorks();
      setHowItWorks(data);
    } catch {
      setErrorHowItWorks('Gagal memuat how it works');
    } finally {
      setLoadingHowItWorks(false);
    }
  };

  // Map icon names to actual Icon components
  const getIconComponent = (iconName: string) => {
    const Icon = Icons[iconName as keyof typeof Icons];
    return Icon ? <Icon className="w-6 h-6" /> : null;
  };

  const getFeatureIconComponent = (iconName: string) => {
    const Icon = Icons[iconName as keyof typeof Icons];
    return Icon ? <Icon className="w-8 h-8" /> : null;
  };

  // Map statistics with icons
  const statsWithIcons = statistics.map(stat => ({
    ...stat,
    icon: getIconComponent(stat.icon)
  }));

  // Map features with icons
  const featuresWithIcons = features.map(feature => ({
    ...feature,
    icon: getFeatureIconComponent(feature.icon)
  }));

  // Map use cases with icons
  const useCasesWithIcons = useCases.map(useCase => ({
    ...useCase,
    icon: getIconComponent(useCase.icon)
  }));

  // Map benefits with icons
  const benefitsWithIcons = benefits.map(benefit => ({
    ...benefit,
    icon: getIconComponent(benefit.icon)
  }));

  // Map how it works with icons
  const howItWorksWithIcons = howItWorks.map(step => ({
    ...step,
    icon: getIconComponent(step.icon)
  }));

  return (
    <div className="min-h-screen bg-background transition-colors overflow-x-hidden">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      {/* Hero Section */}
      <section id="hero">
        <HeroSection 
          statistics={statsWithIcons} 
          onNavigate={onNavigate}
          loading={loadingStats}
          error={errorStats}
          onRetry={loadStatistics}
        />
      </section>

      {/* SDG Goals Section */}
      <section id="sdg" className="py-20 bg-gradient-to-br from-white via-blue-50/30 to-emerald-50/30 dark:from-[#0E172A] dark:via-[#0B2F2B] dark:to-[#0E172A] relative overflow-hidden">
        <SectionBackground variant="blue" position="top-right" />
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            badge={{
              icon: Target,
              text: 'Sustainable Development Goals'
            }}
            title="Mendukung Pembangunan Berkelanjutan"
            description="AGROGUARD IoT berkontribusi langsung terhadap 4 tujuan pembangunan berkelanjutan PBB"
          />

          {loadingSDG && <SDGGoalsSkeleton />}
          
          {errorSDG && !loadingSDG && (
            <ErrorState
              title="Gagal Memuat SDG Goals"
              message={errorSDG}
              onRetry={loadSDGGoals}
            />
          )}

          {!loadingSDG && !errorSDG && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {sdgGoals.map((goal, index) => (
                <SDGCard key={index} goal={goal} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-emerald-50/50 via-white to-blue-50/50 dark:from-[#0B2F2B] dark:via-[#0E172A] dark:to-[#0B2F2B] relative overflow-hidden">
        <SectionBackground variant="green" position="top-left" />

        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            badge={{
              icon: Award,
              text: 'Fitur Unggulan'
            }}
            title="Teknologi IoT Terdepan"
            description="Solusi monitoring pertanian yang lengkap dan mudah digunakan"
          />

          {loadingFeatures && <FeaturesSkeleton />}

          {errorFeatures && !loadingFeatures && (
            <ErrorState
              title="Gagal Memuat Fitur"
              message={errorFeatures}
              onRetry={loadFeatures}
            />
          )}

          {!loadingFeatures && !errorFeatures && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featuresWithIcons.map((feature, index) => (
                <FeatureCard key={index} feature={feature} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-20 bg-gradient-to-br from-white via-emerald-50/30 to-blue-50/30 dark:from-[#0E172A] dark:via-[#0B2F2B] dark:to-[#0E172A] relative overflow-hidden">
        <SectionBackground variant="blue" position="bottom-right" />

        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            title="Diterapkan di Berbagai Sektor"
            description="AGROGUARD IoT terbukti efektif di berbagai jenis pertanian"
          />

          {loadingUseCases && <UseCasesSkeleton />}

          {errorUseCases && !loadingUseCases && (
            <ErrorState
              title="Gagal Memuat Use Cases"
              message={errorUseCases}
              onRetry={loadUseCases}
            />
          )}

          {!loadingUseCases && !errorUseCases && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {useCasesWithIcons.map((useCase, index) => (
                <UseCaseCard key={index} useCase={useCase} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-blue-50/50 via-white to-emerald-50/50 dark:from-[#0B2F2B] dark:via-[#0E172A] dark:to-[#0B2F2B] relative overflow-hidden">
        <SectionBackground variant="yellow" position="top-left" />

        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            title="Cara Kerja AGROGUARD IoT"
            description="Mulai monitoring pertanian Anda dalam 3 langkah mudah"
          />

          {loadingHowItWorks && <HowItWorksSkeleton />}

          {errorHowItWorks && !loadingHowItWorks && (
            <ErrorState
              title="Gagal Memuat How It Works"
              message={errorHowItWorks}
              onRetry={loadHowItWorksSteps}
            />
          )}

          {!loadingHowItWorks && !errorHowItWorks && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {howItWorksWithIcons.map((step, index) => (
                <HowItWorksCard 
                  key={index} 
                  item={step} 
                  index={index}
                  isLast={index === howItWorksWithIcons.length - 1}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits">
        <BenefitsSection 
          benefits={benefitsWithIcons}
          loading={loadingBenefits}
          error={errorBenefits}
          onRetry={loadBenefits}
        />
      </section>

      {/* Testimonials Section */}
      <section id="testimonials">
        <TestimonialsSection />
      </section>

      {/* Documentation Section */}
      <section id="documentation">
        <DocumentationSection />
      </section>

      {/* FAQ Section */}
      <section id="faq">
        <FAQSection onNavigateToROI={scrollToROICalculator} />
      </section>

      {/* ROI Calculator Section */}
      <section id="roi-calculator">
        <ROICalculator />
      </section>

      {/* CTA Section */}
      <section id="cta">
        <CTASection onNavigate={onNavigate} />
      </section>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}
