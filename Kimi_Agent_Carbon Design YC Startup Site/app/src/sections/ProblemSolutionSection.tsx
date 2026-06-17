import { SectionHeader } from '@/components/SectionHeader';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Zap, Target, Cloud, Plug } from 'lucide-react';

const stats = [
  { value: '$2.6B', label: 'Average cost per new drug' },
  { value: '10-15 yrs', label: 'Typical development timeline' },
  { value: '90%', label: 'Clinical trial failure rate' },
];

const benefits = [
  {
    icon: Zap,
    title: '100x Faster',
    description: 'Simulations that took months now complete in hours',
  },
  {
    icon: Target,
    title: 'Quantum Accuracy',
    description: 'AI models trained on ab initio data achieve DFT-level precision',
  },
  {
    icon: Cloud,
    title: 'Cloud-Native',
    description: 'No supercomputers needed. Run on AWS, GCP, or Azure',
  },
  {
    icon: Plug,
    title: 'Open Integration',
    description: 'Connect with your existing tools via API and Python SDK',
  },
];

export function ProblemSection() {
  const statsRef = useScrollReveal<HTMLDivElement>({ variant: 'grid-stagger', stagger: 0.15 });

  return (
    <section className="w-full py-24 md:py-32 bg-[#1c1c1c]">
      <div className="container-page">
        <SectionHeader
          eyebrow="THE CHALLENGE"
          heading="Drug discovery takes 10+ years and costs billions"
          body="Traditional molecular simulation requires massive computational resources, specialized expertise, and years of iteration. Most promising drug candidates fail late in development, wasting billions in R&D investment."
        />

        <div ref={statsRef} className="flex flex-col sm:flex-row gap-8 sm:gap-12 justify-center mt-12">
          {stats.map((stat) => (
            <AnimatedCounter key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function SolutionSection() {
  const gridRef = useScrollReveal<HTMLDivElement>({ variant: 'grid-stagger', stagger: 0.08 });

  return (
    <section className="w-full py-24 md:py-32 bg-[#1c1c1c]">
      <div className="container-page">
        <SectionHeader
          eyebrow="THE SOLUTION"
          heading="From years to weeks with AI-driven simulation"
          body="VoxelBio's generative AI models learn from millions of molecular interactions to predict behavior with quantum-level accuracy. Our platform runs on commodity cloud hardware, making advanced simulation accessible to any research team."
        />

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[800px] mx-auto mt-12">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="p-6 border border-white/[0.06] rounded-sm hover:border-white/[0.12] transition-all duration-300"
              >
                <Icon className="w-5 h-5 text-[#24a148] mb-3" />
                <h3 className="text-heading-3 text-[#f2f2f2] mb-2">{benefit.title}</h3>
                <p className="text-body text-[#cccccc]">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
