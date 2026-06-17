import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  children: React.ReactNode;
  href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = 'primary', children, className = '', href, ...props }, ref) => {
    const baseClasses =
      'inline-flex items-center justify-center text-label transition-all duration-200 cursor-pointer';

    const variantClasses = {
      primary:
        'bg-[#10b981] text-[#1c1c1c] px-6 py-3 rounded-sm hover:bg-[#059669] hover:scale-[1.02] active:bg-[#047857] active:scale-[0.98]',
      secondary:
        'border border-[#f2f2f2] text-[#f2f2f2] px-6 py-3 rounded-sm hover:bg-white/[0.08] hover:border-white active:bg-white/[0.12]',
      tertiary:
        'text-[#f2f2f2] px-0 py-2 hover:underline underline-offset-4',
    };

    const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          onClick={(e) => {
            if (href.startsWith('#')) {
              e.preventDefault();
              const target = document.querySelector(href);
              target?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
