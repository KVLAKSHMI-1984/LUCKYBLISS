import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/sections/HeroSection';
import { BrandLogosSection } from '@/sections/BrandLogosSection';
import { ProblemSection, SolutionSection } from '@/sections/ProblemSolutionSection';
import { FeaturesSection } from '@/sections/FeaturesSection';
import { MethodSection } from '@/sections/MethodSection';
import { MetricsSection } from '@/sections/MetricsSection';
import { ResearchSection } from '@/sections/ResearchSection';
import { PlatformSection } from '@/sections/PlatformSection';
import { EnterpriseSection } from '@/sections/EnterpriseSection';
import { IntegrationsSection } from '@/sections/IntegrationsSection';
import { TestimonialsSection } from '@/sections/TestimonialsSection';
import { PricingSection } from '@/sections/PricingSection';
import { FAQSection } from '@/sections/FAQSection';
import { CTASection } from '@/sections/CTASection';
import { Footer } from '@/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      syncTouch: false,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="bg-[#1c1c1c] min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <BrandLogosSection />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <MethodSection />
        <MetricsSection />
        <ResearchSection />
        <PlatformSection />
        <EnterpriseSection />
        <IntegrationsSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
