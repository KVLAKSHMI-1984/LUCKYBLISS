import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionHeader } from '@/components/SectionHeader';

const steps = [
  {
    number: '01',
    title: 'Physics-informed neural networks',
    body: "Our models don't just learn patterns — they understand the underlying physics of molecular interactions. By incorporating quantum mechanical constraints and conservation laws directly into the architecture, we achieve accuracy that pure data-driven approaches cannot match.",
  },
  {
    number: '02',
    title: 'Active learning from experiment',
    body: 'The platform continuously improves by learning from your experimental results. Each wet-lab measurement feeds back into the model, creating a virtuous cycle where predictions get sharper with every iteration.',
  },
  {
    number: '03',
    title: 'Uncertainty quantified',
    body: 'Every prediction comes with calibrated confidence intervals. Know when to trust the model and when to run an experiment. No black boxes — full interpretability of model decisions with molecular attribution maps.',
  },
];

export function ResearchSection() {
  const stepsRef = useScrollReveal<HTMLDivElement>({ variant: 'grid-stagger', stagger: 0.2, y: 30 });

  return (
    <section id="research" className="w-full py-24 md:py-32 bg-[#1c1c1c]">
      <div className="container-page">
        <SectionHeader
          eyebrow="OUR METHODOLOGY"
          heading="Science-first AI, built for discovery"
        />

        <div ref={stepsRef} className="mt-16 max-w-[800px] mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`py-12 ${index < steps.length - 1 ? 'border-b border-white/[0.06]' : ''}`}
            >
              <span className="font-mono-data text-[clamp(4rem,10vw,8rem)] text-[#24a148]/30 leading-none block mb-4">
                {step.number}
              </span>
              <h3 className="text-heading-1 text-[#f2f2f2] mb-4">{step.title}</h3>
              <p className="text-body-large text-[#cccccc]">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
