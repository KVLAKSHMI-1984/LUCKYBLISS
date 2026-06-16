import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionHeader } from '@/components/SectionHeader';
import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

interface FeatureRowProps {
  eyebrow: string;
  title: string;
  body: string;
  link: string;
  imageLeft: boolean;
  defaultImage: string;
  hoverImage: string;
}

function DualImageHover({ defaultImage, hoverImage }: { defaultImage: string; hoverImage: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const hoverImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Preload hover image
    const img = new Image();
    img.src = hoverImage;
  }, [hoverImage]);

  return (
    <div
      className="relative aspect-[4/3] overflow-hidden rounded-sm cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={defaultImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[800ms]"
        style={{
          opacity: isHovered ? 0 : 1,
          transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
        }}
        loading="lazy"
      />
      <img
        ref={hoverImgRef}
        src={hoverImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[800ms]"
        style={{
          opacity: isHovered ? 1 : 0,
          transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
        }}
        loading="lazy"
      />
    </div>
  );
}

function FeatureRow({ eyebrow, title, body, link, imageLeft, defaultImage, hoverImage }: FeatureRowProps) {
  const rowRef = useScrollReveal<HTMLDivElement>({ variant: 'default', y: 30 });

  const textContent = (
    <div className="flex flex-col justify-center">
      <p className="text-label text-[#e4a817] mb-3">{eyebrow}</p>
      <h3 className="text-heading-1 text-[#f2f2f2] mb-4">{title}</h3>
      <p className="text-body text-[#cccccc] mb-6">{body}</p>
      <a
        href="#"
        className="inline-flex items-center gap-2 text-[#f2f2f2] text-label group"
        onClick={(e) => e.preventDefault()}
      >
        {link}
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
      </a>
    </div>
  );

  const imageContent = (
    <DualImageHover defaultImage={defaultImage} hoverImage={hoverImage} />
  );

  return (
    <div ref={rowRef} className={`flex flex-col ${imageLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 items-center`}>
      <div className="w-full md:w-1/2">
        {imageContent}
      </div>
      <div className="w-full md:w-1/2">
        {textContent}
      </div>
    </div>
  );
}

const features: FeatureRowProps[] = [
  {
    eyebrow: 'GENERATIVE DESIGN',
    title: 'Design novel molecules from scratch',
    body: 'Our AI generates molecular structures optimized for your target properties — binding affinity, solubility, bioavailability, and toxicity. Explore vast chemical space without leaving your browser.',
    link: 'Learn more',
    imageLeft: true,
    defaultImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=800&h=600&fit=crop&q=80',
  },
  {
    eyebrow: 'REAL-TIME SIMULATION',
    title: 'Watch molecules interact in real time',
    body: 'Run molecular dynamics simulations with femtosecond precision. Visualize protein folding, ligand binding, and conformational changes as they happen.',
    link: 'Explore simulation',
    imageLeft: false,
    defaultImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=600&fit=crop&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&h=600&fit=crop&q=80',
  },
  {
    eyebrow: 'PREDICTIVE ANALYTICS',
    title: 'Predict properties before synthesis',
    body: 'Our models predict ADMET properties, binding affinity, and off-target effects with accuracy that rivals wet-lab experiments. Make data-driven decisions before spending on synthesis.',
    link: 'See predictions',
    imageLeft: true,
    defaultImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80',
  },
  {
    eyebrow: 'COLLABORATION',
    title: 'Built for teams, designed for science',
    body: 'Share models, annotate structures, and track experiments with your entire team. Version control for molecules, integrated notebooks, and seamless handoffs between computational and wet-lab teams.',
    link: 'Explore workspace',
    imageLeft: false,
    defaultImage: 'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=800&h=600&fit=crop&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=80',
  },
];

export function FeaturesSection() {
  const headerRef = useScrollReveal<HTMLDivElement>({ variant: 'fade' });

  return (
    <section id="features" className="w-full py-24 md:py-32 bg-[#1c1c1c]">
      <div className="container-page">
        <div ref={headerRef}>
          <SectionHeader
            eyebrow="FEATURES"
            heading="Everything you need to design molecules"
          />
        </div>

        <div className="mt-16 flex flex-col gap-20 md:gap-28">
          {features.map((feature) => (
            <FeatureRow key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
