'use client';

import Link from 'next/link';
import { ROUTES } from '@/frontend/lib/routes';

export const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <Link href={ROUTES.HOME} className="text-xl font-bold text-gray-900">
          VerdictAI
        </Link>
        <div className="flex gap-6">
          <Link href={ROUTES.HOME} className="text-gray-700 hover:text-gray-900">
            Home
          </Link>
          <Link href={ROUTES.INTAKE} className="text-gray-700 hover:text-gray-900">
            Intake
          </Link>
          <Link href={ROUTES.DASHBOARD} className="text-gray-700 hover:text-gray-900">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};
