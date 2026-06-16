import { useEffect, useRef } from 'react';
import { SectionHeader } from '@/components/SectionHeader';
import { Button } from '@/components/Button';
import { Shield, Users, Server } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    icon: Shield,
    title: 'SOC 2 & HIPAA Compliant',
    body: 'Enterprise-grade security with SOC 2 Type II certification and HIPAA compliance. Data encrypted at rest and in transit. On-premise deployment available.',
  },
  {
    icon: Users,
    title: 'SSO & Team Management',
    body: 'SAML 2.0 and OIDC single sign-on. Role-based access control, audit logs, and usage analytics. Manage teams across departments and external collaborators.',
  },
  {
    icon: Server,
    title: 'Dedicated Infrastructure',
    body: 'Run on isolated compute clusters with guaranteed SLAs. Custom model training on your proprietary data. Priority support with dedicated success engineers.',
  },
];

export function EnterpriseSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cardEls = gridRef.current.querySelectorAll('.enterprise-card');

    gsap.set(cardEls, {
      opacity: 0,
      rotateX: 90,
      transformOrigin: 'center bottom',
    });

    gsap.to(cardEls, {
      opacity: 1,
      rotateX: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 70%',
        end: 'bottom 50%',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === gridRef.current) st.kill();
      });
    };
  }, []);

  return (
    <section id="enterprise" className="w-full py-24 md:py-32 bg-[#1c1c1c]">
      <div className="container-page">
        <SectionHeader
          eyebrow="ENTERPRISE"
          heading="Built for organizations at scale"
        />

        <div
          ref={gridRef}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          style={{ perspective: '1500px' }}
        >
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="enterprise-card p-10 border border-white/[0.06] rounded-sm bg-[#1c1c1c] text-center hover:border-white/[0.12] transition-all duration-300"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Icon className="w-12 h-12 text-[#f2f2f2] mx-auto mb-6" />
                <h3 className="text-heading-2 text-[#f2f2f2] mb-4">{card.title}</h3>
                <p className="text-body text-[#cccccc]">{card.body}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button variant="secondary" href="#pricing">Contact Sales</Button>
        </div>
      </div>
    </section>
  );
}
