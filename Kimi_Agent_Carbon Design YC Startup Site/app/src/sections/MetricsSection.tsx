import { useEffect, useRef, useState } from 'react';
import { SectionHeader } from '@/components/SectionHeader';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { label: 'Compound screening', voxelValue: 100, tradValue: 2, voxelLabel: '2.4M/hr', tradLabel: '50K/hr' },
  { label: 'MD simulation', voxelValue: 100, tradValue: 10, voxelLabel: '100 ns/day', tradLabel: '10 ns/day' },
  { label: 'Property prediction', voxelValue: 100, tradValue: 0.1, voxelLabel: '1M/min', tradLabel: '100/min' },
  { label: 'Library search', voxelValue: 100, tradValue: 0.5, voxelLabel: '1B/sec', tradLabel: '1M/sec' },
  { label: 'Cost per compound', voxelValue: 100, tradValue: 0.4, voxelLabel: '$0.001', tradLabel: '$0.50' },
];

export function MetricsSection() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [barWidths, setBarWidths] = useState<number[]>(metrics.map(() => 0));

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = gsap.context(() => {
      metrics.forEach((_, i) => {
        gsap.to({}, {
          duration: 1.2,
          delay: i * 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: chartRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          onStart: () => {
            setBarWidths((prev) => {
              const next = [...prev];
              next[i] = 1;
              return next;
            });
          },
        });
      });
    }, chartRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full py-24 md:py-32 bg-[#1c1c1c] border-t border-white/[0.06]">
      <div className="container-page">
        <SectionHeader
          eyebrow="PERFORMANCE"
          heading="Built for speed at every scale"
          body="From single-molecule screening to billion-compound library searches, VoxelBio scales elastically with your compute budget."
        />

        <div ref={chartRef} className="mt-16 max-w-[900px] mx-auto flex flex-col gap-6">
          {metrics.map((metric, i) => (
            <div key={metric.label}>
              <div className="flex justify-between mb-2">
                <span className="text-body-small text-[#666666]">{metric.label}</span>
              </div>
              <div className="flex flex-col gap-2">
                {/* VoxelBio bar */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-6 bg-white/[0.04] rounded-sm overflow-hidden">
                    <div
                      className="h-full bg-[#24a148] rounded-sm flex items-center justify-end pr-2 transition-all duration-[1200ms] ease-out"
                      style={{ width: barWidths[i] ? `${metric.voxelValue}%` : '0%' }}
                    >
                      <span className="font-mono-data text-xs text-[#1c1c1c] font-medium whitespace-nowrap">
                        {metric.voxelLabel}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Traditional bar */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-6 bg-white/[0.04] rounded-sm overflow-hidden">
                    <div
                      className="h-full bg-[#333333] rounded-sm flex items-center justify-end pr-2 transition-all duration-[1200ms] ease-out"
                      style={{ width: barWidths[i] ? `${Math.max(metric.tradValue, 8)}%` : '0%' }}
                    >
                      <span className="font-mono-data text-xs text-[#666666] whitespace-nowrap">
                        {metric.tradLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Legend */}
          <div className="flex gap-6 mt-4 justify-end">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#24a148] rounded-sm" />
              <span className="text-body-small text-[#cccccc]">VoxelBio</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#333333] rounded-sm" />
              <span className="text-body-small text-[#cccccc]">Traditional</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
