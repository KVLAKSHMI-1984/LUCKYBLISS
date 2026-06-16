import { useEffect, useRef, useState } from 'react';
import { Button } from './Button';
import gsap from 'gsap';

const navLinks = [
  { label: 'Product', href: '#features' },
  { label: 'Platform', href: '#platform' },
  { label: 'Research', href: '#research' },
  { label: 'Enterprise', href: '#enterprise' },
  { label: 'Pricing', href: '#pricing' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    const els = navRef.current.querySelectorAll('.nav-animate');
    gsap.set(els, { opacity: 0, y: -10 });
    gsap.to(els, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.05,
      delay: 0.2,
      ease: 'power3.out',
    });
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-[1000] h-16 flex items-center transition-all duration-300 ${
        scrolled
          ? 'bg-[#1c1c1c]/95 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <div className="container-page w-full flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="nav-animate flex items-center gap-2 opacity-0">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2L24 8V20L14 26L4 20V8L14 2Z" stroke="#f2f2f2" strokeWidth="1.5" fill="none" />
            <path d="M14 2V14M14 14L4 8M14 14L24 8M14 14V26M14 14L4 20M14 14L24 20" stroke="#f2f2f2" strokeWidth="1" opacity="0.5" />
            <circle cx="14" cy="14" r="3" fill="#e4a817" />
          </svg>
          <span className="text-[#f2f2f2] font-medium text-base tracking-tight">VoxelBio</span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-animate text-label text-[#f2f2f2] hover:underline underline-offset-4 transition-all duration-200 opacity-0"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                setMobileOpen(false);
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="nav-animate hidden md:block opacity-0">
          <Button variant="primary" href="#pricing">Get Started</Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#f2f2f2] p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-[#1c1c1c]/98 backdrop-blur-xl border-b border-white/[0.06] py-6 px-8">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-label text-[#f2f2f2] py-2"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                  setMobileOpen(false);
                }}
              >
                {link.label}
              </a>
            ))}
            <Button variant="primary" href="#pricing" className="mt-4">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
