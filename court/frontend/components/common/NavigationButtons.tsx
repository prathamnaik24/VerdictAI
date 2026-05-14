'use client';

import Link from 'next/link';

interface NavigationButton {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export const NavigationButtons = ({ buttons }: { buttons: NavigationButton[] }) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {buttons.map((button) => (
        <Link
          key={button.href}
          href={button.href}
          className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30 ${
            button.variant === 'primary'
              ? 'bg-navy text-white hover:bg-navy/90 shadow-sm'
              : button.variant === 'secondary'
              ? 'bg-white text-navy border border-navy/20 hover:bg-offwhite hover:border-navy/40'
              : 'text-navy/70 hover:text-navy hover:bg-navy/5'
          }`}
        >
          {button.label}
        </Link>
      ))}
    </div>
  );
};
