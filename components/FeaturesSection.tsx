import React from 'react';
import { SECTION_IDS } from '../constants';

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
    <div className="p-4 bg-primary-light rounded-full mb-4 inline-block">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-neutral-darkest mb-2">{title}</h3>
    <p className="text-neutral-dark text-sm">{description}</p>
  </div>
);

// Placeholder simple SVG icons
const UserShieldIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);
const ZapIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);
const InfoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const HeartIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);


const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <UserShieldIcon className="w-10 h-10 text-white" />,
      title: 'Perfiles detallados',
      description: 'Configurá múltiples restricciones: vegetarianismo, celiaquía, alergias, insuficiencia renal, y más.',
    },
    {
      icon: <ZapIcon className="w-10 h-10 text-white" />,
      title: 'Análisis instantáneo',
      description: 'Compará productos, información y valores nutricionales contra tu perfil y obtené un análisis en segundos.',
    },
    {
      icon: <InfoIcon className="w-10 h-10 text-white" />,
      title: 'Información transparente',
      description: 'Resultados fáciles de entender: "Apto", "Precaución", o "No Apto", con explicaciones detalladas y sencillas.',
    },
    {
      icon: <HeartIcon className="w-10 h-10 text-white" />,
      title: 'Bienestar a tu alcance',
      description: 'Tomá decisiones alimentarias informadas y alineadas con tu salud y estilo de vida, sin complicaciones.',
    },
  ];

  return (
    <section id={SECTION_IDS.features} className="py-16 sm:py-24 bg-neutral-lightest">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-darkest">
            Todo lo que necesitás para <span className="text-primary-DEFAULT"></span><span className="text-secondary-dark">comer mejor</span>
          </h2>
          <p className="mt-4 text-lg text-neutral-dark max-w-2xl mx-auto">
            Descubrí las herramientas que ScanToEat te ofrece para cuidar tu alimentación.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;