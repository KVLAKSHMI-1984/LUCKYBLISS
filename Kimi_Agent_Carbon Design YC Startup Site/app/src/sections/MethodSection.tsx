import { useEffect, useRef } from 'react';
import { SectionHeader } from '@/components/SectionHeader';
import { Button } from '@/components/Button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Upload,
  Search,
  Sparkles,
  Waves,
  BarChart3,
  Download,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    number: '01',
    icon: Upload,
    title: 'Import & Prepare',
    description: 'Upload PDB, SDF, SMILES, or CSV files. Automatic structure validation and preparation with intelligent protonation state detection.',
  },
  {
    number: '02',
    icon: Search,
    title: 'Screen & Search',
    description: 'Search billions of molecular structures in seconds. Filter by property ranges, scaffold similarity, or custom descriptors.',
  },
  {
    number: '03',
    icon: Sparkles,
    title: 'Generate & Optimize',
    description: 'AI generates novel molecular candidates optimized for your multi-objective target profile. Interactive exploration of chemical space.',
  },
  {
    number: '04',
    icon: Waves,
    title: 'Simulate & Validate',
    description: 'Run physics-based simulations with quantum accuracy. Molecular dynamics, docking, and free energy calculations on cloud infrastructure.',
  },
  {
    number: '05',
    icon: BarChart3,
    title: 'Predict & Score',
    description: 'Machine learning models predict ADMET properties, off-target effects, and synthetic accessibility before you commit resources.',
  },
  {
    number: '06',
    icon: Download,
    title: 'Export & Integrate',
    description: 'Download results in any format. Direct integration with your ELN, LIMS, and downstream synthesis workflows via REST API.',
  },
];

const cardTransforms = [
  { rotateY: -25, rotateX: 10, z: -100 },
  { rotateY: -15, rotateX: 5, z: -50 },
  { rotateY: -5, rotateX: 0, z: -25 },
  { rotateY: 5, rotateX: 0, z: -25 },
  { rotateY: 15, rotateX: -5, z: -50 },
  { rotateY: 25, rotateX: -10, z: -100 },
];

export function MethodSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cardEls = gridRef.current.querySelectorAll('.method-card');

    gsap.set(cardEls, {
      opacity: 0,
      rotateY: (i: number) => cardTransforms[i].rotateY,
      rotateX: (i: number) => cardTransforms[i].rotateX,
      z: (i: number) => cardTransforms[i].z,
    });

    gsap.to(cardEls, {
      opacity: 1,
      rotateY: 0,
      rotateX: 0,
      z: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === gridRef.current) st.kill();
      });
    };
  }, []);

  return (
    <section className="w-full py-24 md:py-32 bg-[#1c1c1c]">
      <div className="container-page">
        <SectionHeader
          eyebrow="METHOD"
          heading="Six ways VoxelBio transforms your workflow"
        />

        <div
          ref={gridRef}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: '1500px' }}
        >
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.number}
                className="method-card p-8 border border-white/[0.06] rounded-sm bg-[#1c1c1c] hover:border-white/[0.12] hover:shadow-[0_0_20px_rgba(228,168,23,0.05)] transition-all duration-300"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <span className="font-mono-data text-[#e4a817] text-sm mb-4 block">
                  {card.number}
                </span>
                <Icon className="w-10 h-10 text-[#f2f2f2] mb-4" />
                <h3 className="text-heading-2 text-[#f2f2f2] mb-3">{card.title}</h3>
                <p className="text-body text-[#cccccc]">{card.description}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-body-large text-[#cccccc] mb-6">
            Ready to accelerate your research?
          </p>
          <Button variant="primary" href="#pricing">Get Started Free</Button>
        </div>
      </div>
    </section>
  );
}
