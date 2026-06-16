import { useState } from 'react';
import { SectionHeader } from '@/components/SectionHeader';
import { Button } from '@/components/Button';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    priceMonthly: 'Free',
    priceAnnual: 'Free',
    period: 'Forever',
    features: [
      '100 predictions/month',
      '5 molecular simulations',
      'Community support',
      'Public model hub access',
    ],
    cta: 'Get Started',
    ctaVariant: 'secondary' as const,
    highlighted: false,
  },
  {
    name: 'Professional',
    priceMonthly: '$299',
    priceAnnual: '$239',
    period: '/month',
    features: [
      'Unlimited predictions',
      '100 molecular simulations/month',
      'Priority email support',
      'Python SDK & REST API',
      'Team collaboration (up to 5)',
      'Custom model training',
    ],
    cta: 'Start Free Trial',
    ctaVariant: 'primary' as const,
    highlighted: true,
  },
  {
    name: 'Enterprise',
    priceMonthly: 'Custom',
    priceAnnual: 'Custom',
    period: 'Contact us for pricing',
    features: [
      'Everything in Professional',
      'Unlimited simulations',
      'SSO & SAML authentication',
      'Dedicated infrastructure',
      'SLA guarantee',
      'On-premise deployment option',
      'Custom model development',
    ],
    cta: 'Contact Sales',
    ctaVariant: 'secondary' as const,
    highlighted: false,
  },
];

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);
  const cardsRef = useScrollReveal<HTMLDivElement>({ variant: 'grid-stagger', stagger: 0.15 });

  return (
    <section id="pricing" className="w-full py-24 md:py-32 bg-[#1c1c1c] border-t border-white/[0.06]">
      <div className="container-page">
        <SectionHeader
          eyebrow="PRICING"
          heading="Simple, transparent pricing"
        />

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mt-8 mb-12">
          <span className={`text-label ${!isAnnual ? 'text-[#f2f2f2]' : 'text-[#666666]'}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative w-12 h-6 rounded-full transition-colors duration-200 cursor-pointer"
            style={{ backgroundColor: isAnnual ? '#e4a817' : '#333333' }}
            aria-label="Toggle annual billing"
          >
            <div
              className="absolute top-0.5 w-5 h-5 rounded-full bg-[#f2f2f2] transition-transform duration-200"
              style={{ transform: isAnnual ? 'translateX(26px)' : 'translateX(2px)' }}
            />
          </button>
          <span className={`text-label ${isAnnual ? 'text-[#f2f2f2]' : 'text-[#666666]'}`}>
            Annual <span className="text-[#e4a817]">(save 20%)</span>
          </span>
        </div>

        {/* Pricing Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-8 md:p-10 rounded-sm bg-[#1c1c1c] ${
                plan.highlighted
                  ? 'border border-[#e4a817]'
                  : 'border border-white/[0.06]'
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 right-6 bg-[#e4a817] text-[#1c1c1c] text-label px-3 py-1 rounded-sm">
                  Most Popular
                </span>
              )}

              <h3 className="text-heading-2 text-[#f2f2f2] mb-4">{plan.name}</h3>

              <div className="mb-6">
                <span className="text-display-lg text-[#f2f2f2]">
                  {isAnnual ? plan.priceAnnual : plan.priceMonthly}
                </span>
                <span className="text-body-small text-[#666666] ml-2">{plan.period}</span>
              </div>

              <ul className="flex flex-col gap-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#e4a817] shrink-0 mt-0.5" />
                    <span className="text-body text-[#cccccc]">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.ctaVariant}
                href="#pricing"
                className="w-full"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        <p className="text-body-small text-[#666666] text-center mt-8">
          All plans include a 14-day free trial
        </p>
      </div>
    </section>
  );
}
