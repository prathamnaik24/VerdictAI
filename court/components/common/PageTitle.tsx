'use client';

export const PageTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">{title}</h1>
      {subtitle && <p className="text-gray-600">{subtitle}</p>}
    </div>
  );
};
