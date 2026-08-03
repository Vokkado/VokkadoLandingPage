import React, { useState } from 'react';
import { SECTION_IDS } from '../constants';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface Flip {
  frontIcon: string;
  front: string;
  backTitle: string;
  back: string;
}

/**
 * Cada ítem arranca mostrando la situación (con humor, para que la persona se
 * identifique) y al pasar el mouse / tocar se da vuelta y aparece cómo lo
 * resuelve vokkado. La situación negativa vive solo en el frente; la vuelta
 * siempre es positiva.
 */
const flips: Flip[] = [
  {
    frontIcon: 'flask-outline',
    front: '¿Leés la etiqueta y parece un examen de química?',
    backTitle: 'Etiquetas en tu idioma',
    back: 'Vokkado traduce la letra chica a algo que se entiende. Sin diccionario.',
  },
  {
    frontIcon: 'help-circle-outline',
    front: '¿Miedo a mandarte una macana con lo que comés?',
    backTitle: 'Elegí tranqui',
    back: 'Apto, precaución o no apto para vos, y siempre el porqué.',
  },
  {
    frontIcon: 'chatbubbles-outline',
    front: '¿Diez opiniones distintas sobre el mismo producto?',
    backTitle: 'Una respuesta, no diez opiniones',
    back: 'Algo claro, pensado para vos y tu salud. Sin googlear a quién creerle.',
  },
  {
    frontIcon: 'hourglass-outline',
    front: '¿Media hora en la góndola googleando ingredientes?',
    backTitle: 'Escaneás y listo',
    back: 'Lo escaneás, te gusta, al carrito. Sin descifrar nada.',
  },
];

const FlipTile: React.FC<{ flip: Flip; delay: number }> = ({ flip, delay }) => {
  const anim = useScrollAnimation({ animation: 'fade-up', delay, threshold: 0.15 });
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const shown = flipped || hovered;

  return (
    <div ref={anim.ref} style={{ perspective: '1200px' }}>
      <button
        type="button"
        onClick={() => setFlipped(f => !f)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-pressed={shown}
        aria-label={`${flip.backTitle}: ${flip.back}`}
        className="relative block w-full h-[230px] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark focus-visible:ring-offset-2 rounded-2xl"
      >
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)',
            transform: shown ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* ── Frente: la situación ── */}
          <div
            className="absolute inset-0 rounded-2xl border border-neutral-light bg-white shadow-sm p-6 flex flex-col justify-between"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          >
            <div className="w-11 h-11 rounded-xl bg-neutral-light flex items-center justify-center">
              <ion-icon name={flip.frontIcon} style={{ fontSize: '22px', color: '#374151' }} aria-hidden />
            </div>
            <p className="text-lg sm:text-xl font-bold text-neutral-darkest leading-snug">{flip.front}</p>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-dark">
              <ion-icon name="sync-outline" style={{ fontSize: '15px' }} aria-hidden />
              girá para la respuesta
            </span>
          </div>

          {/* ── Dorso: la solución de vokkado ── */}
          <div
            className="absolute inset-0 rounded-2xl bg-primary-dark shadow-md p-6 flex flex-col justify-between text-white"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
              <ion-icon name="checkmark-circle-outline" style={{ fontSize: '24px', color: '#FCFCFC' }} aria-hidden />
            </div>
            <div>
              <h3 className="text-lg font-bold leading-snug mb-1.5">{flip.backTitle}</h3>
              <p className="text-sm text-white/85 leading-relaxed">{flip.back}</p>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

/**
 * Sección "La solución": fusiona lo que antes eran Problema + Transformación
 * en una sola pieza, siempre en clave positiva. Abre con una pregunta-espejo
 * con la que la persona se identifica y la responde con vokkado.
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

        {/* Flip tiles: situación → solución */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto mb-16">
          {flips.map((flip, i) => (
            <FlipTile key={flip.backTitle} flip={flip} delay={i * 100} />
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
