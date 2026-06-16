import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionHeader } from '@/components/SectionHeader';
import { useRef, useCallback } from 'react';

const integrations = [
  { name: 'PyMOL', description: 'Visualize structures directly from simulation results' },
  { name: 'Schrödinger', description: 'Import Maestro files and export docking scores' },
  { name: 'Jupyter', description: 'Run simulations from notebooks with our Python kernel' },
  { name: 'AWS', description: 'Deploy on EC2 with pre-configured GPU instances' },
  { name: 'Google Cloud', description: 'Run on TPU-optimized instances for maximum speed' },
  { name: 'Azure', description: 'Seamless integration with Microsoft research tools' },
  { name: 'Benchling', description: 'Sync molecular data with your ELN and registry' },
  { name: 'RDKit', description: 'Import cheminformatics data and SMILES strings' },
  { name: 'Zapier', description: 'Automate workflows with 5000+ app connections' },
];

function IntegrationCard({ name, description }: { name: string; description: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    cardRef.current.style.transform = `translate(${x * 8}px, ${y * 8}px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'translate(0, 0)';
  }, []);

  return (
    <div
      ref={cardRef}
      className="p-6 border border-white/[0.06] rounded-sm bg-[#1c1c1c] text-center hover:border-white/[0.12] hover:shadow-[0_0_20px_rgba(228,168,23,0.05)] transition-all duration-300 cursor-default"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.1s ease-out, border-color 0.3s ease, box-shadow 0.3s ease' }}
    >
      <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center border border-white/[0.08] rounded-sm">
        <span className="font-mono-data text-xs text-[#f2f2f2]">
          {name.slice(0, 2).toUpperCase()}
        </span>
      </div>
      <h3 className="text-heading-3 text-[#f2f2f2] mb-2">{name}</h3>
      <p className="text-body-small text-[#666666]">{description}</p>
    </div>
  );
}

export function IntegrationsSection() {
  const gridRef = useScrollReveal<HTMLDivElement>({ variant: 'grid-stagger', stagger: 0.08 });

  return (
    <section className="w-full py-24 md:py-32 bg-[#1c1c1c] border-t border-white/[0.06]">
      <div className="container-page">
        <SectionHeader
          eyebrow="INTEGRATIONS"
          heading="Connect with your existing tools"
        />

        <div ref={gridRef} className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((integration) => (
            <IntegrationCard key={integration.name} {...integration} />
          ))}
        </div>
      </div>
    </section>
  );
}
