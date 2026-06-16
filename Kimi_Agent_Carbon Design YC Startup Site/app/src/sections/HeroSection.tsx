import { useEffect, useRef } from 'react';
import { Button } from '@/components/Button';
import { MolecularSimulation } from '@/lib/MolecularSimulation';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import gsap from 'gsap';

export function HeroSection() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const simRef = useRef<MolecularSimulation | null>(null);
  const reducedMotion = useReducedMotion();
  const contentRef = useRef<HTMLDivElement>(null);

  // Initialize molecular simulation
  useEffect(() => {
    if (!canvasContainerRef.current) return;

    const sim = new MolecularSimulation(4000);
    sim.mount(canvasContainerRef.current);
    sim.setReducedMotion(reducedMotion);
    simRef.current = sim;

    return () => {
      sim.unmount();
      simRef.current = null;
    };
  }, [reducedMotion]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!simRef.current) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      simRef.current.setMouse(x, y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Text entrance animations
  useEffect(() => {
    if (!contentRef.current) return;
    const elements = contentRef.current.querySelectorAll('.hero-animate');
    gsap.set(elements, { opacity: 0, y: 30 });
    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      delay: 0.3,
      ease: 'power3.out',
    });
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#1c1c1c]">
      {/* WebGL Canvas Container */}
      <div
        ref={canvasContainerRef}
        className="absolute inset-0 z-0"
        style={{ opacity: 0.7 }}
      />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 container-page text-center pt-20">
        <p className="hero-animate text-label text-[#e4a817] mb-6">
          AI-POWERED MOLECULAR SIMULATION
        </p>

        <h1 className="hero-animate text-display-xl text-[#f2f2f2] max-w-[900px] mx-auto mb-6">
          Accelerate Drug Discovery with AI-Powered Molecular Simulation
        </h1>

        <p className="hero-animate text-body-large text-[#cccccc] max-w-[640px] mx-auto mb-10">
          VoxelBio combines physics-based simulation with generative AI to predict molecular behavior, design novel therapeutics, and reduce wet-lab experimentation by orders of magnitude.
        </p>

        <div className="hero-animate flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" href="#pricing">Start Free Trial</Button>
          <Button variant="secondary" href="#features">Watch Demo</Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce-subtle">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
    </section>
  );
}
