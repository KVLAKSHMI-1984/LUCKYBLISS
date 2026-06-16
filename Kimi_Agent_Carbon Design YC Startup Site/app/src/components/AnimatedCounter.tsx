import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
  value: string;
  label: string;
  className?: string;
}

export function AnimatedCounter({ value, label, className = '' }: AnimatedCounterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Parse numeric portion from value string
    const numericMatch = value.match(/[\d.]+/);
    if (!numericMatch) {
      setDisplayValue(value);
      return;
    }

    const targetNum = parseFloat(numericMatch[0]);
    const prefix = value.substring(0, numericMatch.index);
    const suffix = value.substring((numericMatch.index || 0) + numericMatch[0].length);
    const isDecimal = numericMatch[0].includes('.');

    const proxy = { val: 0 };

    const tween = gsap.to(proxy, {
      val: targetNum,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        if (isDecimal) {
          setDisplayValue(`${prefix}${proxy.val.toFixed(1)}${suffix}`);
        } else {
          setDisplayValue(`${prefix}${Math.round(proxy.val)}${suffix}`);
        }
      },
    });

    return () => {
      tween.kill();
    };
  }, [value]);

  return (
    <div ref={containerRef} className={`text-center ${className}`}>
      <span ref={numberRef} className="text-display-lg text-[#f2f2f2] block">
        {displayValue}
      </span>
      <span className="text-body-small text-[#666666] mt-2 block">{label}</span>
    </div>
  );
}
