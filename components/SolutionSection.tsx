import React from 'react';
import { SECTION_IDS } from '../constants';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface Benefit {
  icon: string;
  title: string;
  text: string;
}

/**
 * Cada beneficio es un dolor dado vuelta, siempre en positivo:
 *  etiquetas indescifrables   → "Etiquetas en tu idioma"
 *  miedo a equivocarte        → "Elegí tranqui"
 *  información contradictoria → "Una respuesta, no diez opiniones"
 *  tiempo perdido             → "Escaneás y listo"
 */
const benefits: Benefit[] = [
  {
    icon: 'language-outline',
    title: 'Etiquetas en tu idioma',
    text: 'Esos nombres imposibles de la letra chica, traducidos a algo que se entiende. Sin diccionario.',
  },
  {
    icon: 'shield-checkmark-outline',
    title: 'Elegí tranqui',
    text: 'Apto, precaución o no apto para vos, y el porqué. Te damos la confianza para elegir sin miedo a equivocarte.',
  },
  {
    icon: 'chatbubble-ellipses-outline',
    title: 'Una respuesta, no diez opiniones',
    text: 'Basta de googlear a quién creerle. Algo claro, pensado para vos y tu salud.',
  },
  {
    icon: 'cart-outline',
    title: 'Escaneás y listo',
    text: 'Lo escaneás, te gusta, al carrito. Sin quedarte parado en la góndola leyendo ingrediente por ingrediente.',
  },
];

const BenefitCard: React.FC<{ benefit: Benefit; delay: number }> = ({ benefit, delay }) => {
  const anim = useScrollAnimation({ animation: 'fade-up', delay, threshold: 0.15 });
  return (
    <div
      ref={anim.ref}
      className="bg-white rounded-2xl border border-neutral-light shadow-sm p-6 flex flex-col gap-3"
    >
      <div className="w-11 h-11 rounded-xl bg-primary-lightest flex items-center justify-center">
        <ion-icon name={benefit.icon} style={{ fontSize: '22px', color: '#22521D' }} aria-hidden />
      </div>
      <h3 className="text-lg font-bold text-neutral-darkest">{benefit.title}</h3>
      <p className="text-sm sm:text-base text-neutral-dark leading-relaxed">{benefit.text}</p>
    </div>
  );
};

/**
 * Sección "La solución": fusiona lo que antes eran Problema + Transformación
 * en una sola pieza, siempre en clave positiva. Abre con una pregunta-espejo
 * con la que la persona se identifica y la responde con Vokkado.
 */
const SolutionSection: React.FC = () => {
  const headerAnim = useScrollAnimation({ animation: 'fade-up', threshold: 0.2 });
  const closingAnim = useScrollAnimation({ animation: 'fade-up', delay: 150, threshold: 0.2 });

  return (
    <section id={SECTION_IDS.solution} className="relative py-20 sm:py-28 overflow-hidden bg-friendlyWhite">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-friendlyWhite via-[#f4f8ec] to-friendlyWhite" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerAnim.ref} className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-darkest leading-tight">
            Entender lo que comés es <span className="text-primary-dark">fácil</span>
          </h2>
          <p className="mt-5 text-lg text-neutral-dark max-w-2xl mx-auto">
            Ingredientes impronunciables, letra tamaño hormiga y una tabla que parece jeroglífico. Apuntás la cámara y Vokkado te lo explica en uruguayo.
          </p>
        </div>

        {/* Beneficios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto mb-16">
          {benefits.map((benefit, i) => (
            <BenefitCard key={benefit.title} benefit={benefit} delay={i * 100} />
          ))}
        </div>

        {/* Cierre: identificación + el verdadero valor (autonomía) */}
        <div ref={closingAnim.ref} className="text-center max-w-2xl mx-auto">
          <p className="text-xl sm:text-2xl text-neutral-darkest font-medium leading-relaxed">
            Nadie nació sabiendo leer una etiqueta.{' '}
            <span className="text-primary-dark font-bold">
              Con Vokkado, cada compra te deja sabiendo un poco más, hasta que elegís bien casi sin pensarlo.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
