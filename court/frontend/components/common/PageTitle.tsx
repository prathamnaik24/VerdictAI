'use client';

export const PageTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => {
  return (
    <div className="mb-10 text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-navy font-serif tracking-tight mb-3">{title}</h1>
      {subtitle && <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">{subtitle}</p>}
    </div>
  );
};
