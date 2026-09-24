import React, { useState } from 'react';
import { SECTION_IDS } from '../constants';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCanHover } from '../hooks/useCanHover';
import Icono from './common/Icono';

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

const FlipTile: React.FC<{
  flip: Flip;
  delay: number;
  isOpen: boolean;
  onToggle: () => void;
  sugerir?: boolean;
}> = ({ flip, delay, isOpen, onToggle, sugerir = false }) => {
  const anim = useScrollAnimation({ animation: 'fade-up', delay, threshold: 0.15 });
  const puedeHover = useCanHover();
  const [hovered, setHovered] = useState(false);
  // Con mouse gira sola al pasar por encima, sin clic. Con dedo, el toque manda.
  const shown = puedeHover ? hovered : isOpen;

  return (
    <div ref={anim.ref} style={{ perspective: '1200px' }}>
      <button
        type="button"
        onClick={puedeHover ? undefined : onToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => puedeHover && setHovered(true)}
        onBlur={() => puedeHover && setHovered(false)}
        aria-pressed={shown}
        aria-label={`${flip.backTitle}: ${flip.back}`}
        className="relative block w-full h-[230px] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark dark:focus-visible:ring-primary-light focus-visible:ring-offset-2 focus-visible:ring-offset-friendlyWhite dark:focus-visible:ring-offset-night rounded-2xl"
      >
        <div
          className={`relative w-full h-full ${sugerir ? 'amague-giro' : ''}`}
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)',
            transform: shown ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* ── Frente: la situación ── */}
          <div
            className="absolute inset-0 rounded-2xl border border-neutral-light dark:border-white/10 bg-white dark:bg-night-card shadow-sm dark:shadow-black/30 p-6 flex flex-col justify-between"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="w-11 h-11 rounded-xl bg-neutral-light dark:bg-white/10 flex items-center justify-center">
                <Icono name={flip.frontIcon} style={{ fontSize: '22px' }} className="text-neutral-dark dark:text-white/75" aria-hidden />
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-lightest dark:bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-primary-dark dark:text-primary-light">
                <Icono name="sync-outline" style={{ fontSize: '13px' }} className="giro-lento" aria-hidden />
                {puedeHover ? 'pasá el mouse' : 'tocá la tarjeta'}
              </span>
            </div>
            <p className="text-lg sm:text-xl font-bold text-neutral-darkest dark:text-white leading-snug">{flip.front}</p>
          </div>

          {/* ── Dorso: la solución de vokkado ── */}
          <div
            className="absolute inset-0 rounded-2xl bg-primary-dark shadow-md p-6 flex flex-col justify-between text-white"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
              <Icono name="checkmark-circle-outline" style={{ fontSize: '24px', color: '#FCFCFC' }} aria-hidden />
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
  const [openFlip, setOpenFlip] = useState<number | null>(null);
  const puedeHover = useCanHover();

  return (
    <section id={SECTION_IDS.solution} className="relative py-20 sm:py-28 overflow-hidden">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerAnim.ref} className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-darkest dark:text-white leading-tight">
            Entender lo que comés es <span className="text-primary-dark dark:text-primary-light">fácil</span>
          </h2>
          <p className="mt-5 text-lg text-neutral-dark dark:text-white/75 max-w-2xl mx-auto">
            Ingredientes impronunciables, letra tamaño hormiga y una tabla que parece jeroglífico. Apuntás la cámara y Vokkado te lo explica en uruguayo.
          </p>
        </div>

        {/* Flip tiles: situación → solución */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto mb-16">
          {flips.map((flip, i) => (
            <FlipTile
              key={flip.backTitle}
              flip={flip}
              delay={i * 100}
              isOpen={openFlip === i}
              onToggle={() => setOpenFlip(prev => (prev === i ? null : i))}
              sugerir={!puedeHover && i === 0 && openFlip === null}
            />
          ))}
        </div>

        {/* Cierre: identificación + el verdadero valor (autonomía) */}
        <div ref={closingAnim.ref} className="text-center max-w-2xl mx-auto">
          <p className="text-xl sm:text-2xl text-neutral-darkest dark:text-white font-medium leading-relaxed">
            Nadie nació sabiendo leer una etiqueta.{' '}
            <span className="text-primary-dark dark:text-primary-light font-bold">
              Con Vokkado, cada compra te deja sabiendo un poco más, hasta que elegís bien casi sin pensarlo.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
