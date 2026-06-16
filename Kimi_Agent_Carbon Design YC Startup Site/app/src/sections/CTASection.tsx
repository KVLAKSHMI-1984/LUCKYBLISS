import { Button } from '@/components/Button';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function CTASection() {
  const ref = useScrollReveal<HTMLDivElement>({ variant: 'fade' });

  return (
    <section className="relative w-full py-32 md:py-40 bg-[#1c1c1c] border-t border-white/[0.06] overflow-hidden">
      {/* Subtle particle effect background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(228,168,23,0.08) 0%, transparent 60%)',
          }}
        />
      </div>

      <div ref={ref} className="relative z-10 container-page text-center">
        <h2 className="text-display-lg text-[#f2f2f2] max-w-[800px] mx-auto mb-6">
          Start building the future of medicine
        </h2>

        <p className="text-body-large text-[#cccccc] max-w-[600px] mx-auto mb-10">
          Join hundreds of research teams already using VoxelBio to accelerate their discovery pipeline.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" href="#pricing" className="animate-pulse-glow">
            Start Free Trial
          </Button>
          <Button variant="secondary" href="#pricing">
            Talk to Sales
          </Button>
        </div>
      </div>
    </section>
  );
}
