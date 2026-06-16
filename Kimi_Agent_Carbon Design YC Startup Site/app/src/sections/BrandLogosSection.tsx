import { useScrollReveal } from '@/hooks/useScrollReveal';

const logos = [
  { name: 'Genentech', width: 120 },
  { name: 'Vertex', width: 100 },
  { name: 'Roche', width: 100 },
  { name: 'Moderna', width: 120 },
  { name: 'Pfizer', width: 80 },
  { name: 'Illumina', width: 120 },
];

function LogoPlaceholder({ name, width }: { name: string; width: number }) {
  return (
    <div
      className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300 shrink-0"
      style={{ width, minWidth: width }}
    >
      <span className="text-[#f2f2f2] text-sm font-medium tracking-widest uppercase whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export function BrandLogosSection() {
  const ref = useScrollReveal<HTMLDivElement>({ variant: 'fade' });

  return (
    <section className="w-full py-8 border-y border-white/[0.06] bg-[#1c1c1c]">
      <div ref={ref} className="container-page">
        <p className="text-body-small text-[#666666] text-center mb-6">
          Trusted by leading research teams
        </p>

        <div className="overflow-hidden">
          <div className="flex gap-12 animate-marquee">
            {/* First set */}
            {logos.map((logo) => (
              <LogoPlaceholder key={`a-${logo.name}`} name={logo.name} width={logo.width} />
            ))}
            {/* Duplicate set for seamless loop */}
            {logos.map((logo) => (
              <LogoPlaceholder key={`b-${logo.name}`} name={logo.name} width={logo.width} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
