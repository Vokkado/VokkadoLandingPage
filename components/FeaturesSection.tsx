import React from 'react';
import { SECTION_IDS } from '../constants';

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
    <div className="w-16 h-16 bg-primary-light rounded-full mb-4 flex items-center justify-center">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-neutral-darkest mb-2">{title}</h3>
    <p className="text-neutral-dark text-sm">{description}</p>
  </div>
);

// Ionicons web components (loaded via CDN in index.html)
declare namespace JSX {
  interface IntrinsicElements {
    'ion-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { name: string; size?: string }, HTMLElement>;
  }
}


const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <ion-icon name="shield-checkmark-outline" style={{ fontSize: '40px', color: 'white' }} />,
      title: 'Perfiles detallados',
      description: 'Configurá múltiples restricciones, preferencias y alergias alimentarias en detalle.',
    },
    {
      icon: <ion-icon name="flash-outline" style={{ fontSize: '40px', color: 'white' }} />,
      title: 'Análisis instantáneo',
      description: 'Compará productos, información y valores nutricionales contra tu perfil y obtené un análisis en segundos.',
    },
    {
      icon: <ion-icon name="information-circle-outline" style={{ fontSize: '40px', color: 'white' }} />,
      title: 'Información transparente',
      description: 'Resultados fáciles de entender: "Apto", "Precaución", o "No Apto", con explicaciones detalladas y sencillas.',
    },
    {
      icon: <ion-icon name="heart-outline" style={{ fontSize: '40px', color: 'white' }} />,
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