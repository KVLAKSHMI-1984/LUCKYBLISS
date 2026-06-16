import { useScrollReveal } from '@/hooks/useScrollReveal';

interface SectionHeaderProps {
  eyebrow: string;
  heading: string;
  body?: string;
  align?: 'center' | 'left';
  className?: string;
}

export function SectionHeader({ eyebrow, heading, body, align = 'center', className = '' }: SectionHeaderProps) {
  const ref = useScrollReveal<HTMLDivElement>({ variant: 'fade' });

  return (
    <div ref={ref} className={`${align === 'center' ? 'text-center' : ''} ${className}`}>
      <p className="text-label text-[#e4a817] mb-4">{eyebrow}</p>
      <h2 className="text-display-lg text-[#f2f2f2] mb-6">{heading}</h2>
      {body && (
        <p className="text-body text-[#cccccc] max-w-[600px] mx-auto">{body}</p>
      )}
    </div>
  );
}
