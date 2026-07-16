import React from 'react';
import { SECTION_IDS } from '../constants';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface Pain {
  icon: string;
  title: string;
  text: string;
}

const pains: Pain[] = [
  {
    icon: 'swap-horizontal-outline',
    title: 'Información contradictoria',
    text: 'Un día algo es saludable, al siguiente ya no. ¿A quién creerle?',
  },
  {
    icon: 'document-text-outline',
    title: 'Etiquetas indescifrables',
    text: 'Ingredientes con nombres imposibles y letra chica que no aclara nada.',
  },
  {
    icon: 'alert-circle-outline',
    title: 'Miedo a equivocarte',
    text: 'Con alergias o condiciones de salud, un error no es un detalle.',
  },
  {
    icon: 'hourglass-outline',
    title: 'Tiempo perdido',
    text: 'Buscar respuestas ingrediente por ingrediente, parado frente a la góndola.',
  },
];

const PainCard: React.FC<{ pain: Pain; delay: number }> = ({ pain, delay }) => {
  const anim = useScrollAnimation({ animation: 'fade-up', delay, threshold: 0.15 });
  return (
    <div
      ref={anim.ref}
      className="bg-white rounded-2xl border border-neutral-light shadow-sm p-6 flex flex-col gap-3"
    >
      <div className="w-11 h-11 rounded-xl bg-primary-lightest flex items-center justify-center">
        <ion-icon name={pain.icon} style={{ fontSize: '22px', color: '#22521D' }} aria-hidden />
      </div>
      <h3 className="text-lg font-bold text-neutral-darkest">{pain.title}</h3>
      <p className="text-sm sm:text-base text-neutral-dark leading-relaxed">{pain.text}</p>
    </div>
  );
};

/**
 * Sección "El problema": la landing empieza por lo que vive la persona,
 * no por lo que hace el producto. Vokkado aparece recién al final,
 * como respuesta a ese problema.
 */
const ProblemSection: React.FC = () => {
  const headerAnim = useScrollAnimation({ animation: 'fade-up', threshold: 0.2 });
  const bridgeAnim = useScrollAnimation({ animation: 'fade-up', delay: 150, threshold: 0.2 });

  return (
    <section id={SECTION_IDS.problem} className="relative py-20 sm:py-28 overflow-hidden bg-friendlyWhite">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerAnim.ref} className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
          <span className="inline-block text-sm font-semibold text-primary-dark tracking-widest uppercase mb-3">
            El problema
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-darkest leading-tight">
            Elegir qué comer no debería ser <span className="text-primary-dark">tan difícil</span>
          </h2>
          <p className="mt-5 text-lg text-neutral-dark max-w-2xl mx-auto">
            Hoy, decidir qué llevás a tu mesa implica demasiadas dudas y muy pocas certezas.
          </p>
        </div>

        {/* Pains */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto mb-16">
          {pains.map((pain, i) => (
            <PainCard key={pain.title} pain={pain} delay={i * 100} />
          ))}
        </div>

        {/* Puente hacia Vokkado */}
        <div ref={bridgeAnim.ref} className="text-center max-w-2xl mx-auto">
          <p className="text-xl sm:text-2xl text-neutral-darkest font-medium leading-relaxed">
            Ahí aparece Vokkado.{' '}
            <span className="text-primary-dark font-bold">
              No para escanear productos: para devolverte claridad y confianza.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
