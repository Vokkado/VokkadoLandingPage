import React from 'react';
import { SECTION_IDS } from '../constants';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface Stage {
  icon: string;
  label: string;
  text: string;
}

const stages: Stage[] = [
  {
    icon: 'help-circle-outline',
    label: 'Confusión',
    text: '"No entiendo qué estoy comprando."',
  },
  {
    icon: 'bulb-outline',
    label: 'Comprensión',
    text: '"Ahora entiendo qué tiene y qué significa para mí."',
  },
  {
    icon: 'shield-checkmark-outline',
    label: 'Confianza',
    text: '"Puedo elegir sin miedo a equivocarme."',
  },
  {
    icon: 'rocket-outline',
    label: 'Autonomía',
    text: '"Cada vez decido mejor por mi cuenta."',
  },
];

const StageCard: React.FC<{ stage: Stage; index: number }> = ({ stage, index }) => {
  const anim = useScrollAnimation({ animation: 'fade-up', delay: index * 150, threshold: 0.15 });
  const isLast = index === stages.length - 1;
  return (
    <div ref={anim.ref} className="relative flex flex-col items-center text-center px-4">
      {/* Flecha conectora (solo desktop, entre etapas) */}
      {!isLast && (
        <div className="hidden lg:flex absolute top-7 -right-5 items-center justify-center w-10">
          <ion-icon
            name="arrow-forward-outline"
            style={{ fontSize: '22px', color: '#B8C445' }}
            aria-hidden
          />
        </div>
      )}
      <div
        className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${
          isLast ? 'bg-primary-dark' : 'bg-primary-lightest'
        }`}
      >
        <ion-icon
          name={stage.icon}
          style={{ fontSize: '26px', color: isLast ? '#FCFCFC' : '#22521D' }}
          aria-hidden
        />
      </div>
      <h3 className="text-lg font-bold text-neutral-darkest mb-2">{stage.label}</h3>
      <p className="text-sm sm:text-base text-neutral-dark leading-relaxed italic max-w-[220px]">
        {stage.text}
      </p>
    </div>
  );
};

/**
 * Sección "La transformación": el por qué de Vokkado.
 * No vendemos escanear → resultado, sino
 * confusión → comprensión → confianza → autonomía.
 */
const TransformationSection: React.FC = () => {
  const headerAnim = useScrollAnimation({ animation: 'fade-up', threshold: 0.2 });
  const closingAnim = useScrollAnimation({ animation: 'fade-up', delay: 200, threshold: 0.2 });

  return (
    <section id={SECTION_IDS.transformation} className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-friendlyWhite via-[#f4f8ec] to-friendlyWhite" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerAnim.ref} className="text-center mb-14 sm:mb-20 max-w-3xl mx-auto">
          <span className="inline-block text-sm font-semibold text-primary-dark tracking-widest uppercase mb-3">
            Por qué existe Vokkado
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-darkest leading-tight">
            De la confusión a la <span className="text-primary-dark">autonomía</span>
          </h2>
          <p className="mt-5 text-lg text-neutral-dark max-w-2xl mx-auto">
            Vokkado no cambia lo que hay en la góndola. Cambia cómo te parás frente a ella.
          </p>
        </div>

        {/* Etapas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 max-w-5xl mx-auto mb-16">
          {stages.map((stage, i) => (
            <StageCard key={stage.label} stage={stage} index={i} />
          ))}
        </div>

        {/* Cierre: la app es el medio, el fin es la autonomía */}
        <div ref={closingAnim.ref} className="text-center max-w-2xl mx-auto">
          <p className="text-xl sm:text-2xl text-neutral-darkest font-medium leading-relaxed">
            La app es solo el medio.{' '}
            <span className="text-primary-dark font-bold">
              El objetivo es que cada vez decidas mejor por tu cuenta.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default TransformationSection;
