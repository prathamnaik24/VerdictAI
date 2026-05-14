'use client';

import Link from 'next/link';
import { ROUTES } from '@/frontend/lib/routes';

export const CTASection = () => {
  return (
    <section className="text-center py-12">
      <p className="text-lg text-gray-600 mb-6">
        Supported for: Cheque Bounce, Consumer Complaints, Employment Disputes
      </p>
      <Link
        href={ROUTES.INTAKE}
        className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
      >
        Get Started
      </Link>
    </section>
  );
};
