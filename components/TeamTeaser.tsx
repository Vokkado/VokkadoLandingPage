import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

import photo1 from '../images/team/1.webp';
import photo2 from '../images/team/2.webp';
import photo3 from '../images/team/3.webp';
import photo4 from '../images/team/4.webp';
import Icono from './common/Icono';

// 2×2 grid: [[1,2],[3,4]]
// Con nombre y todo: el alt decía "Co-fundador 1" a 4, en masculino para el
// equipo entero, y la página de /equipo ya los nombra uno por uno.
const ROWS = [
  [
    { src: photo1, nombre: 'Belén Drescher' },
    { src: photo2, nombre: 'Nicolás De La Hoz' },
  ],
  [
    { src: photo3, nombre: 'Lautaro Elosegui' },
    { src: photo4, nombre: 'Juan Andrés Macedo' },
  ],
];

const TeamTeaser: React.FC = () => {
  const { ref: titleRef } = useScrollAnimation({ animation: 'fade-up', threshold: 0.2 });
  const { ref: photosRef } = useScrollAnimation({ animation: 'fade-up', delay: 100, threshold: 0.2 });
  const { ref: textRef } = useScrollAnimation({ animation: 'fade-up', delay: 200, threshold: 0.2 });

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Mismo fondo que HowItWorks — flujo continuo */}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">

        {/* Título */}
        <div ref={titleRef}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-darkest dark:text-white leading-tight mb-12">
            Un equipo <span className="text-primary-dark dark:text-primary-light">comprometido</span>
          </h2>
        </div>

        {/* Fotos 2×2 */}
        <div ref={photosRef} className="flex flex-col items-center gap-4 mb-10">
          {ROWS.map((row, ri) => (
            <div key={ri} className="flex gap-4">
              {row.map((persona) => (
                <div
                  key={persona.nombre}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white dark:border-night-card shadow-md dark:shadow-black/40"
                >
                  <img loading="lazy" decoding="async"
                    src={persona.src}
                    alt={persona.nombre}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center 10%', transform: 'scale(1.3)', transformOrigin: 'center 20%' }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Descripción + link */}
        <div ref={textRef} className="max-w-md">
          <p className="text-neutral-dark dark:text-white/75 text-base sm:text-lg leading-relaxed mb-7">
            Detrás de Vokkado hay cuatro personas apasionadas por hacer que la alimentación saludable sea simple para todos.
          </p>
          <Link
            to="/equipo"
            className="inline-flex items-center gap-2 text-primary-dark dark:text-primary-light font-semibold text-base hover:gap-3 transition-all duration-200"
          >
            Conocer al equipo
            <Icono name="arrow-forward-outline" style={{ fontSize: '18px' }} />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default TeamTeaser;
