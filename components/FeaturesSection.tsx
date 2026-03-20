import React from 'react';
import { SECTION_IDS } from '../constants';

declare namespace JSX {
  interface IntrinsicElements {
    'ion-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { name: string; size?: string }, HTMLElement>;
  }
}

interface FeatureItemProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-6 sm:p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-neutral-light/60">
    <div className="w-14 h-14 bg-primary-light rounded-xl mb-5 flex items-center justify-center">
      <ion-icon name={icon} style={{ fontSize: '28px', color: 'white' }} />
    </div>
    <h3 className="text-lg font-bold text-neutral-darkest mb-2">{title}</h3>
    <p className="text-neutral-dark text-sm leading-relaxed">{description}</p>
  </div>
);

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: 'shield-checkmark-outline',
      title: 'Perfiles detallados',
      description: 'Configurá restricciones, preferencias y alergias alimentarias en detalle.',
    },
    {
      icon: 'flash-outline',
      title: 'Análisis instantáneo',
      description: 'Compará valores nutricionales contra tu perfil y obtené resultados en segundos.',
    },
    {
      icon: 'information-circle-outline',
      title: 'Información transparente',
      description: '"Apto", "Precaución" o "No Apto", con explicaciones claras y sencillas.',
    },
    {
      icon: 'heart-outline',
      title: 'Bienestar a tu alcance',
      description: 'Decisiones alimentarias informadas, alineadas con tu salud y estilo de vida.',
    },
  ];

  return (
    <section id={SECTION_IDS.features} className="py-16 sm:py-24 bg-neutral-lightest">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-primary-dark tracking-widest uppercase mb-3">
            Características
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-darkest">
            Todo lo que necesitás para{' '}
            <span className="text-primary-dark">comer mejor</span>
          </h2>
          <p className="mt-4 text-lg text-neutral-dark max-w-2xl mx-auto">
            Descubrí las herramientas que ScanToEat te ofrece para cuidar tu alimentación.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
