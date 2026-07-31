import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

import photo1 from '../images/team/1.png';
import photo2 from '../images/team/2.png';
import photo3 from '../images/team/3.png';
import photo4 from '../images/team/4.png';

// 2×2 grid: [[1,2],[3,4]]
const ROWS = [[photo1, photo2], [photo3, photo4]];

const TeamTeaser: React.FC = () => {
  const { ref: titleRef } = useScrollAnimation({ animation: 'fade-up', threshold: 0.2 });
  const { ref: photosRef } = useScrollAnimation({ animation: 'fade-up', delay: 100, threshold: 0.2 });
  const { ref: textRef } = useScrollAnimation({ animation: 'fade-up', delay: 200, threshold: 0.2 });

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Mismo fondo que HowItWorks — flujo continuo */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-friendlyWhite via-[#f4f8ec] to-friendlyWhite" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">

        {/* Título */}
        <div ref={titleRef}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-darkest leading-tight mb-12">
            Un equipo <span className="text-primary-dark">comprometido</span>
          </h2>
        </div>

        {/* Fotos 2×2 */}
        <div ref={photosRef} className="flex flex-col items-center gap-4 mb-10">
          {ROWS.map((row, ri) => (
            <div key={ri} className="flex gap-4">
              {row.map((src, ci) => (
                <div
                  key={ci}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-md"
                >
                  <img
                    src={src}
                    alt={`Co-fundador ${ri * 2 + ci + 1}`}
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
          <p className="text-neutral-dark text-base sm:text-lg leading-relaxed mb-7">
            Detrás de vokkado hay cuatro personas apasionadas por hacer que la alimentación saludable sea simple para todos.
          </p>
          <Link
            to="/equipo"
            className="inline-flex items-center gap-2 text-primary-dark font-semibold text-base hover:gap-3 transition-all duration-200"
          >
            Conocer al equipo
            <ion-icon name="arrow-forward-outline" style={{ fontSize: '18px' }} />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default TeamTeaser;
