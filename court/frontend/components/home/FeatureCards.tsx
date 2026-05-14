'use client';

export const FeatureCards = () => {
  const features = [
    { title: 'Case Assessment', description: 'AI-powered evaluation of legal cases' },
    { title: 'Precedent Retrieval', description: 'Find relevant case law and precedents' },
    { title: 'Courtroom Simulator', description: 'Practice cross-examination and arguments' },
    { title: 'Risk Analysis', description: 'Understand risk factors and favorable points' },
  ];

  return (
    <section className="grid grid-cols-2 gap-6 py-12">
      {features.map((feature) => (
        <div key={feature.title} className="p-6 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </div>
      ))}
    </section>
  );
};
