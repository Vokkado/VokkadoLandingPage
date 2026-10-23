import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

import ortCie from '../images/apoyos/ort-cie.webp';
import anii from '../images/apoyos/anii.webp';
import ande from '../images/apoyos/ande.webp';

// En oscuro van en blanco liso: los originales en rojo, negro y colores se pierden sobre el fondo.
const APOYOS = [
  { src: ortCie, alt: 'Universidad ORT Uruguay, Centro de Innovación y Emprendimientos', ancho: 1044, alto: 'h-10 sm:h-12' },
  { src: anii, alt: 'ANII, Agencia Nacional de Investigación e Innovación', ancho: 997, alto: 'h-9 sm:h-11' },
  { src: ande, alt: 'ANDE, Agencia Nacional de Desarrollo', ancho: 675, alto: 'h-10 sm:h-12' },
];

const Apoyos: React.FC = () => {
  const { ref: tituloRef } = useScrollAnimation({ animation: 'fade-up', threshold: 0.2 });
  const { ref: logosRef } = useScrollAnimation<HTMLUListElement>({ animation: 'fade-up', delay: 120, threshold: 0.2 });

  return (
    <section aria-labelledby="apoyos-titulo" className="pb-16 sm:pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center border-t border-primary-dark/10 dark:border-white/10 pt-12 sm:pt-16">
        <div ref={tituloRef}>
          <h2
            id="apoyos-titulo"
            className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-dark/70 dark:text-primary-light/80 mb-3"
          >
            Con el apoyo de
          </h2>
          <p className="text-neutral-dark dark:text-white/75 text-base sm:text-lg max-w-xl mx-auto mb-10">
            Instituciones que creen en el proyecto y nos acompañan.
          </p>
        </div>
        <ul ref={logosRef} className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16">
          {APOYOS.map((apoyo) => (
            <li key={apoyo.alt}>
              <img
                loading="lazy"
                decoding="async"
                src={apoyo.src}
                alt={apoyo.alt}
                width={apoyo.ancho}
                height={160}
                className={`${apoyo.alto} w-auto dark:brightness-0 dark:invert dark:opacity-80`}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Apoyos;
