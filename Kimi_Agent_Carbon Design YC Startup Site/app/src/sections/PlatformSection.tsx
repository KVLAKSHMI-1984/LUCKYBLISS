import { useEffect, useRef, useState } from 'react';
import { SectionHeader } from '@/components/SectionHeader';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

const codeSnippet = `import voxelbio as vb

# Load molecule from SMILES
mol = vb.load_smiles(
    "CC(C)Cc1ccc(cc1)C(C)C(=O)O"
)

# Predict properties
properties = mol.predict([
    "binding_affinity",
    "solubility",
    "bioavailability",
    "toxicity"
])

print(f"Binding: {properties.binding:.2f} kcal/mol")
print(f"Solubility: {properties.solubility:.2f} mg/L")`;

function TypewriterCode() {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 80%',
      onEnter: () => setStarted(true),
      once: true,
    });

    return () => trigger.kill();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= codeSnippet.length) return;

    const timeout = setTimeout(() => {
      setDisplayed(codeSnippet.slice(0, displayed.length + 1));
    }, 30);

    return () => clearTimeout(timeout);
  }, [started, displayed]);

  const highlightCode = (code: string) => {
    return code.split('\n').map((line, i) => {
      // Simple syntax highlighting
      let highlighted = line
        .replace(/(import|from|print)/g, '<span class="text-[#24a148]">$1</span>')
        .replace(/('.*?')/g, '<span class="text-[#5a8a8a]">$1</span>')
        .replace(/(#.*)/g, '<span class="text-[#666666]">$1</span>')
        .replace(/\b(\d+\.?\d*)\b/g, '<span class="text-[#c9a96e]">$1</span>');

      return `<span class="text-[#666666] select-none mr-4">${String(i + 1).padStart(2, '0')}</span>${highlighted}`;
    }).join('\n');
  };

  return (
    <div ref={containerRef} className="bg-[#141414] rounded-sm border border-white/[0.06] overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
        <div className="w-3 h-3 rounded-full bg-[#b84848]" />
        <div className="w-3 h-3 rounded-full bg-[#e4a817]" />
        <div className="w-3 h-3 rounded-full bg-[#4a8a4a]" />
        <span className="text-body-small text-[#666666] ml-4">molecule.py</span>
      </div>
      {/* Code */}
      <pre className="p-4 overflow-x-auto">
        <code
          className="font-mono-data text-sm text-[#f2f2f2] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: highlightCode(displayed) }}
        />
        {started && displayed.length < codeSnippet.length && (
          <span className="inline-block w-2 h-4 bg-[#24a148] ml-0.5 animate-pulse" />
        )}
      </pre>
    </div>
  );
}

function VisualizerCard() {
  return (
    <div className="bg-[#141414] rounded-sm border border-white/[0.06] overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
        <div className="w-3 h-3 rounded-full bg-[#b84848]" />
        <div className="w-3 h-3 rounded-full bg-[#e4a817]" />
        <div className="w-3 h-3 rounded-full bg-[#4a8a4a]" />
        <span className="text-body-small text-[#666666] ml-4">3D Visualizer</span>
      </div>
      {/* 3D Viewport */}
      <div className="relative aspect-[16/10] bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] flex items-center justify-center overflow-hidden">
        {/* Molecular structure SVG */}
        <svg viewBox="0 0 400 300" className="w-3/4 h-3/4 animate-[spin_20s_linear_infinite]">
          {/* Backbone */}
          <path
            d="M50 150 Q100 80 150 120 T250 100 T350 150"
            fill="none"
            stroke="#24a148"
            strokeWidth="3"
            opacity="0.8"
          />
          {/* Secondary structure - helical */}
          <path
            d="M60 140 Q110 70 160 110 T260 90 T360 140"
            fill="none"
            stroke="#24a148"
            strokeWidth="2"
            opacity="0.4"
            strokeDasharray="8 4"
          />
          {/* Atoms */}
          <circle cx="50" cy="150" r="8" fill="#24a148" opacity="0.9" />
          <circle cx="150" cy="120" r="6" fill="#5a8a8a" opacity="0.8" />
          <circle cx="250" cy="100" r="7" fill="#24a148" opacity="0.9" />
          <circle cx="350" cy="150" r="8" fill="#5a8a8a" opacity="0.8" />
          <circle cx="100" cy="100" r="5" fill="#c9a96e" opacity="0.6" />
          <circle cx="200" cy="80" r="5" fill="#c9a96e" opacity="0.6" />
          <circle cx="300" cy="120" r="5" fill="#c9a96e" opacity="0.6" />
          {/* Bonds */}
          <line x1="50" y1="150" x2="100" y2="100" stroke="#24a148" strokeWidth="1.5" opacity="0.5" />
          <line x1="150" y1="120" x2="100" y2="100" stroke="#24a148" strokeWidth="1.5" opacity="0.5" />
          <line x1="150" y1="120" x2="200" y2="80" stroke="#5a8a8a" strokeWidth="1.5" opacity="0.5" />
          <line x1="250" y1="100" x2="200" y2="80" stroke="#24a148" strokeWidth="1.5" opacity="0.5" />
          <line x1="250" y1="100" x2="300" y2="120" stroke="#24a148" strokeWidth="1.5" opacity="0.5" />
          <line x1="350" y1="150" x2="300" y2="120" stroke="#5a8a8a" strokeWidth="1.5" opacity="0.5" />
          {/* Binding site highlight */}
          <circle cx="200" cy="100" r="25" fill="none" stroke="#5a8a8a" strokeWidth="1" opacity="0.3" strokeDasharray="4 2" />
        </svg>

        {/* Axis gizmo */}
        <div className="absolute bottom-3 right-3">
          <svg width="40" height="40" viewBox="0 0 40 40">
            <line x1="20" y1="20" x2="35" y2="10" stroke="#b84848" strokeWidth="1.5" />
            <line x1="20" y1="20" x2="8" y2="35" stroke="#4a8a4a" strokeWidth="1.5" />
            <line x1="20" y1="20" x2="32" y2="32" stroke="#6a9aba" strokeWidth="1.5" />
            <text x="36" y="10" fill="#b84848" fontSize="6" fontFamily="monospace">X</text>
            <text x="4" y="38" fill="#4a8a4a" fontSize="6" fontFamily="monospace">Y</text>
            <text x="34" y="38" fill="#6a9aba" fontSize="6" fontFamily="monospace">Z</text>
          </svg>
        </div>

        {/* Info overlay */}
        <div className="absolute top-3 left-3">
          <span className="font-mono-data text-[10px] text-[#666666]">PDB: 1A1U</span>
        </div>
      </div>
    </div>
  );
}

export function PlatformSection() {
  const cardsRef = useScrollReveal<HTMLDivElement>({ variant: 'card-3d', stagger: 0.2 });

  return (
    <section id="platform" className="w-full py-24 md:py-32 bg-[#1c1c1c] border-t border-white/[0.06]">
      <div className="container-page">
        <SectionHeader
          eyebrow="THE PLATFORM"
          heading="Powerful APIs, beautiful visualizations"
        />

        <div ref={cardsRef} className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Code Card */}
          <div className="method-card">
            <TypewriterCode />
            <h3 className="text-heading-2 text-[#f2f2f2] mt-6 mb-3">Python SDK</h3>
            <p className="text-body text-[#cccccc]">
              Integrate with your existing pipeline. Load molecules, run predictions, and export results with a few lines of code.
            </p>
          </div>

          {/* Visualizer Card */}
          <div className="method-card">
            <VisualizerCard />
            <h3 className="text-heading-2 text-[#f2f2f2] mt-6 mb-3">3D Visualizer</h3>
            <p className="text-body text-[#cccccc]">
              Interactive molecular visualization in the browser. Rotate, zoom, and annotate structures in real time. Share views with your team.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
