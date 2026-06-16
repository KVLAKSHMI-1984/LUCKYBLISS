import { useState, useEffect, useRef, useCallback } from 'react';
import { SectionHeader } from '@/components/SectionHeader';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const testimonials = [
  {
    quote: "VoxelBio reduced our lead optimization cycle from 18 months to 6 weeks. The generative models suggested molecular modifications we never would have considered, and two of them are now in preclinical development.",
    author: 'Dr. Sarah Chen',
    role: 'VP of Computational Chemistry',
    company: 'Apex Therapeutics',
  },
  {
    quote: "We screened a billion-compound virtual library in a single afternoon. The accuracy of the binding affinity predictions is remarkable — within 0.5 kcal/mol of our experimental measurements.",
    author: 'Dr. Marcus Webb',
    role: 'Director of Drug Discovery',
    company: 'Nexus Biopharma',
  },
  {
    quote: "The Python SDK integrated seamlessly with our existing pipeline. Within a week, our computational chemists were running predictions that previously required weeks of MD simulations.",
    author: 'Dr. Yuki Tanaka',
    role: 'Head of AI Research',
    company: 'Keystone Genomics',
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useScrollReveal<HTMLDivElement>({ variant: 'fade' });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoPlay = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
  }, []);

  useEffect(() => {
    if (!isPaused) {
      startAutoPlay();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, startAutoPlay]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <section
      className="w-full py-24 md:py-32 bg-[#1c1c1c]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container-page">
        <div ref={sectionRef}>
          <SectionHeader
            eyebrow="TESTIMONIALS"
            heading="Trusted by research teams worldwide"
          />
        </div>

        {/* Carousel */}
        <div className="mt-16 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="w-full shrink-0 px-0 md:px-4"
              >
                <div className="max-w-[800px] mx-auto border border-white/[0.06] rounded-sm p-8 md:p-10 bg-[#1c1c1c] relative">
                  {/* Quote icon */}
                  <svg
                    className="absolute top-6 left-6 w-10 h-10 text-[#e4a817]/20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>

                  <p className="text-body-large text-[#f2f2f2] italic mt-8 mb-8 leading-relaxed">
                    "{t.quote}"
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-body text-[#cccccc] font-medium">{t.author}</p>
                      <p className="text-body-small text-[#666666]">{t.role}</p>
                    </div>
                    <span className="text-body-small text-[#666666] font-medium">
                      {t.company}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveIndex(i);
                if (intervalRef.current) clearInterval(intervalRef.current);
                startAutoPlay();
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'bg-[#e4a817] scale-110'
                  : 'bg-[#333333] hover:bg-[#666666]'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
