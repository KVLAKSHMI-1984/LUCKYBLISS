import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type RevealVariant = 'default' | 'fade' | 'grid-stagger' | 'card-3d' | 'card-flip';

interface ScrollRevealOptions {
  variant?: RevealVariant;
  stagger?: number;
  delay?: number;
  duration?: number;
  y?: number;
  start?: string;
}

export function useScrollReveal<T extends HTMLElement>(options: ScrollRevealOptions = {}) {
  const ref = useRef<T>(null);
  const {
    variant = 'default',
    stagger = 0.1,
    delay = 0,
    duration = 0.8,
    y = 30,
    start = 'top 80%',
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.children.length > 0 ? Array.from(el.children) : [el];

    let fromVars: gsap.TweenVars = { opacity: 0 };
    let toVars: gsap.TweenVars = {
      opacity: 1,
      duration,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
    };

    switch (variant) {
      case 'default':
        fromVars = { opacity: 0, y };
        toVars = { ...toVars, y: 0 };
        break;
      case 'fade':
        fromVars = { opacity: 0 };
        toVars = { ...toVars, duration: 1 };
        break;
      case 'grid-stagger':
        fromVars = { opacity: 0, y: 40 };
        toVars = { ...toVars, y: 0, stagger };
        break;
      case 'card-3d':
        fromVars = { opacity: 0, rotateX: 15, y: 50 };
        toVars = { ...toVars, rotateX: 0, y: 0, stagger, duration: 1 };
        el.style.perspective = '1500px';
        break;
      case 'card-flip':
        fromVars = { opacity: 0, rotateX: 90 };
        toVars = {
          ...toVars,
          rotateX: 0,
          opacity: 1,
          stagger,
          duration: 1,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: el,
            start: 'top 70%',
            end: 'bottom 50%',
            scrub: true,
          },
        };
        el.style.perspective = '1500px';
        break;
    }

    gsap.set(children, fromVars);
    const tween = gsap.to(children, toVars);

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [variant, stagger, delay, duration, y, start]);

  return ref;
}
