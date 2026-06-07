import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import independientePng from '../images/independiente.png';

const PILLARS = [
  {
    icon: 'ban-outline',
    title: 'Sin marcas patrocinadoras',
    desc: 'Ninguna empresa alimentaria financia ni influye en los resultados de la app.',
  },
  {
    icon: 'eye-outline',
    title: 'Transparencia total',
    desc: 'Mostramos la información tal como es, sin omitir ni suavizar datos que no convengan.',
  },
  {
    icon: 'shield-checkmark-outline',
    title: 'Sin sesgos comerciales',
    desc: 'Nuestras recomendaciones se basan en datos nutricionales, no en acuerdos con fabricantes.',
  },
  {
    icon: 'heart-outline',
    title: 'Tu salud primero',
    desc: 'Cada decisión de diseño y cada dato que mostramos tiene un único objetivo: cuidarte.',
  },
];

const IndependenciaSection: React.FC = () => {
  const textRef  = useScrollAnimation({ animation: 'fade-right', threshold: 0.15 });
  const imageRef = useScrollAnimation({ animation: 'fade-left',  delay: 100, threshold: 0.15 });

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Fondo verde oscuro — contraste con la sección anterior */}
      <div className="absolute inset-0 -z-10 bg-primary-dark" />
      {/* Puntos decorativos sutiles */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.06]"
        style={{ backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Texto */}
          <div ref={textRef}>
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.22em] text-primary-light mb-5">
              Independencia
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Sin influencias.<br />
              <span className="text-primary-light">Solo la verdad.</span>
            </h2>
            <p className="text-white/75 text-base sm:text-lg leading-relaxed mb-10 max-w-lg">
              Vokkado no recibe dinero de marcas ni empresas alimentarias. Cada análisis es completamente objetivo, transparente y libre de conflictos de interés.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {PILLARS.map((p) => (
                <div key={p.title} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ion-icon name={p.icon} style={{ fontSize: '18px', color: '#B8C445' }} />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm mb-0.5">{p.title}</p>
                    <p className="text-white/60 text-xs leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Imagen */}
          <div ref={imageRef} className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Halo difuminado detrás */}
              <div className="absolute inset-[-30px] rounded-full bg-primary-light/20 blur-3xl" />
              {/* Contenedor circular con fondo claro — marco intencional */}
              <div className="relative rounded-full overflow-hidden w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-[#f4f8ec] shadow-2xl border-4 border-white/10 flex items-center justify-center">
                <img
                  src={independientePng}
                  alt="Vokkado — independiente y objetivo"
                  className="w-[85%] h-[85%] object-contain"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default IndependenciaSection;
