import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import paltaNutri from '../images/nutri/palta-nutricionista.png';

const PROOFS = [
  { icon: 'calendar-outline', text: 'Turnos pedidos desde la app' },
  { icon: 'folder-open-outline', text: 'Historia clínica en un lugar' },
  { icon: 'trending-up-outline', text: 'Seguimiento entre consultas' },
];

/**
 * Puente hacia la plataforma profesional. Va después del equipo, cuando la
 * persona ya entendió la app, para que el profesional que llega a la landing
 * encuentre su propia puerta sin interrumpir el relato del consumidor.
 */
const NutritionistTeaser: React.FC = () => {
  const { ref: imgRef } = useScrollAnimation({ animation: 'fade-right', threshold: 0.15 });
  const { ref: textRef } = useScrollAnimation({ animation: 'fade-left', delay: 120, threshold: 0.15 });

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-friendlyWhite via-[#f4f8ec] to-friendlyWhite" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto md:grid md:grid-cols-5 md:gap-12 md:items-center">

          {/* ── La palta nutricionista ── */}
          <div ref={imgRef} className="md:col-span-2 flex justify-center mb-10 md:mb-0">
            <div className="relative flex items-center justify-center w-60 h-60 sm:w-72 sm:h-72">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-light/30 via-[#d6eabf]/40 to-primary-lightest/20 blur-2xl" />
              <div className="absolute inset-4 rounded-full border border-primary-light/25 border-dashed" />
              <img
                src={paltaNutri}
                alt="La palta nutricionista de Vokkado"
                className="relative z-10 w-52 sm:w-60 drop-shadow-[0_18px_36px_rgba(34,82,29,0.18)]"
              />
            </div>
          </div>

          {/* ── Invitación ── */}
          <div ref={textRef} className="md:col-span-3 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-darkest leading-tight mb-5">
              ¿Sos <span className="text-primary-dark">nutricionista?</span>
            </h2>
            <p className="font-sans text-lg text-neutral-dark leading-relaxed max-w-xl mx-auto md:mx-0 mb-7">
              Hicimos una plataforma para manejar todo tu consultorio desde un solo lugar.
            </p>

            <div className="flex flex-col gap-3 mb-8 w-fit mx-auto md:mx-0 text-left">
              {PROOFS.map((p) => (
                <div key={p.text} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary-light/15 flex items-center justify-center flex-shrink-0">
                    <ion-icon name={p.icon} style={{ fontSize: '19px', color: '#22521D' }} aria-hidden="true" />
                  </div>
                  <span className="font-sans text-sm sm:text-base text-neutral-dark font-medium">{p.text}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-center md:justify-start">
              <Link
                to="/nutricionistas"
                className="inline-flex items-center gap-2 bg-primary-dark text-white font-sans font-semibold text-sm px-6 py-3 rounded-xl hover:bg-primary-DEFAULT hover:scale-105 transition-all duration-200 shadow-sm"
              >
                Conocer la plataforma
                <ion-icon name="arrow-forward-outline" style={{ fontSize: '16px' }} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NutritionistTeaser;
