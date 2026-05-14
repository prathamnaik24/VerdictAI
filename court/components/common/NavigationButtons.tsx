'use client';

import Link from 'next/link';

interface NavigationButton {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
}

export const NavigationButtons = ({ buttons }: { buttons: NavigationButton[] }) => {
  return (
    <div className="flex gap-4 justify-center">
      {buttons.map((button) => (
        <Link
          key={button.href}
          href={button.href}
          className={`px-6 py-2 rounded font-medium transition ${
            button.variant === 'primary'
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
          }`}
        >
          {button.label}
        </Link>
      ))}
    </div>
  );
};
