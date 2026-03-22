import React from 'react';
import { SECTION_IDS } from '../constants';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface FeatureItemProps {
  icon: string;
  title: string;
  description: string;
  index: number;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description, index }) => {
  const { ref } = useScrollAnimation({
    animation: 'fade-up',
    delay: index * 120,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className="group flex flex-col items-center text-center p-6 sm:p-8 bg-white rounded-2xl shadow-lg border border-neutral-light/60
        hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
    >
      <div className="w-14 h-14 bg-primary-dark rounded-xl mb-5 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
        <ion-icon name={icon} style={{ fontSize: '28px', color: 'white' }} />
      </div>
      <h3 className="text-lg font-bold text-neutral-darkest mb-2">{title}</h3>
      <p className="text-neutral-dark text-sm leading-relaxed">{description}</p>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  const headerAnim = useScrollAnimation({ animation: 'fade-up', threshold: 0.2 });

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
    <section id={SECTION_IDS.features} className="relative py-20 sm:py-28 overflow-hidden">
      {/* ── Fondo limpio ── */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-friendlyWhite via-[#f7faf2] to-friendlyWhite" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerAnim.ref} className="text-center mb-14">
          <span className="inline-block text-sm font-semibold text-primary-dark tracking-widest uppercase mb-3">
            Características
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-darkest">
            Todo lo que necesitás para{' '}
            <span className="text-primary-dark">comer mejor</span>
          </h2>
          <p className="mt-4 text-lg text-neutral-dark max-w-2xl mx-auto">
            Descubrí las herramientas que Vokkado te ofrece para cuidar tu alimentación.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              index={index}
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
