import { useState, useRef, useEffect } from 'react';
import { SectionHeader } from '@/components/SectionHeader';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import gsap from 'gsap';

const faqs = [
  {
    question: 'How does VoxelBio differ from traditional molecular dynamics software?',
    answer: 'Traditional MD software like GROMACS or AMBER requires massive computational resources and specialized expertise. VoxelBio uses AI to achieve comparable accuracy at a fraction of the cost and time. Our models are trained on extensive quantum mechanical data, allowing predictions in seconds that would take days with conventional methods.',
  },
  {
    question: 'What file formats are supported?',
    answer: 'We support all major molecular file formats including PDB, SDF, MOL2, SMILES, InChI, and CSV. You can also import directly from PubChem, ChEMBL, and Zinc databases. Export formats include all input formats plus JSON, XML, and custom formats via our API.',
  },
  {
    question: 'Can I use VoxelBio with my existing computational pipeline?',
    answer: 'Absolutely. Our Python SDK and REST API are designed for integration. Most customers integrate VoxelBio into their existing workflow within a day. We provide connectors for popular tools like RDKit, Open Babel, Schrödinger, and KNIME.',
  },
  {
    question: 'How accurate are the predictions?',
    answer: 'Our binding affinity predictions achieve a mean absolute error of 0.8 kcal/mol on benchmark datasets, comparable to expensive free energy perturbation methods. ADMET property predictions average 85-92% accuracy depending on the endpoint. All predictions include calibrated confidence intervals.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes. VoxelBio is SOC 2 Type II certified and HIPAA compliant. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We offer on-premise deployment for organizations with strict data residency requirements. Enterprise customers receive dedicated infrastructure with network isolation.',
  },
  {
    question: 'What kind of support do you offer?',
    answer: 'Starter plans include community support via our forum. Professional plans include priority email support with 24-hour response time. Enterprise customers receive a dedicated success engineer, Slack channel access, and quarterly business reviews. All plans include comprehensive documentation and video tutorials.',
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const answerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!answerRef.current) return;

    if (isOpen) {
      gsap.set(answerRef.current, { height: 'auto' });
      const fullHeight = answerRef.current.offsetHeight;
      gsap.fromTo(
        answerRef.current,
        { height: hasAnimated.current ? 0 : fullHeight, opacity: hasAnimated.current ? 0 : 1 },
        { height: fullHeight, opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
      hasAnimated.current = true;
    } else {
      gsap.to(answerRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
      hasAnimated.current = true;
    }
  }, [isOpen]);

  return (
    <div className="border-b border-white/[0.06]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left cursor-pointer group"
      >
        <span className="text-heading-3 text-[#f2f2f2] pr-8 group-hover:text-[#24a148] transition-colors duration-200">
          {question}
        </span>
        <span
          className="text-[#24a148] text-2xl shrink-0 transition-transform duration-300"
          style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          +
        </span>
      </button>
      <div ref={answerRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <div className="pb-6">
          <p className="text-body text-[#cccccc]">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const listRef = useScrollReveal<HTMLDivElement>({ variant: 'fade' });

  return (
    <section className="w-full py-24 md:py-32 bg-[#1c1c1c]">
      <div className="container-page max-w-[800px]">
        <SectionHeader
          eyebrow="FAQ"
          heading="Frequently asked questions"
        />

        <div ref={listRef} className="mt-12">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
