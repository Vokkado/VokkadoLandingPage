import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import independientePng from '../images/independiente.png';

const PILLARS = [
  {
    icon: 'ban-outline',
    title: 'Sin publicidad',
    desc: 'Vokkado no muestra publicidad ni recibe dinero de marcas por aparecer en la app. Punto.',
  },
  {
    icon: 'shield-checkmark-outline',
    title: 'Sin influencias',
    desc: 'Ninguna empresa alimentaria tiene injerencia sobre los análisis, puntajes o recomendaciones que ve el usuario.',
  },
  {
    icon: 'eye-outline',
    title: 'Sin sesgos comerciales',
    desc: 'Cada resultado está basado exclusivamente en datos nutricionales. No hay acuerdos ni favores con fabricantes.',
  },
];

const HOW = [
  {
    icon: 'star-outline',
    title: 'Suscripción Premium (próximamente)',
    desc: 'Nuestro modelo de negocio es simple: usuarios que eligen pagar por funcionalidades avanzadas. Sin intermediarios, sin marcas.',
  },
  {
    icon: 'people-outline',
    title: 'Comunidad de usuarios',
    desc: 'Vokkado crece gracias a quienes lo usan y lo comparten. La mejor publicidad es que funcione de verdad.',
  },
];

const IndependenciaPage: React.FC = () => {
  const { ref: heroRef } = useScrollAnimation({ animation: 'fade-up', threshold: 0.15 });
  const { ref: pillarsRef } = useScrollAnimation({ animation: 'fade-up', delay: 80, threshold: 0.15 });
  const { ref: howRef } = useScrollAnimation({ animation: 'fade-up', threshold: 0.15 });
  const { ref: ctaRef } = useScrollAnimation({ animation: 'fade-up', threshold: 0.15 });

  return (
    <div className="bg-friendlyWhite text-neutral-dark">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[#f4f8ec] via-friendlyWhite to-white" />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'linear-gradient(#22521D 1px, transparent 1px), linear-gradient(90deg, #22521D 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
          <div className="absolute -top-28 right-[-120px] w-80 h-80 rounded-full bg-primary-light/25 blur-3xl" />
          <div className="absolute -bottom-24 left-[-120px] w-72 h-72 rounded-full bg-primary-lightest blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={heroRef} className="md:grid md:grid-cols-5 md:gap-12 md:items-center">
            <div className="md:col-span-3 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-darkest tracking-tight leading-tight mb-6">
              Saber lo que comés<br className="hidden sm:block" />
                <span className="text-primary-dark"> es cuidarte</span>
              </h1>
              <p className="text-lg md:text-xl text-neutral-dark leading-relaxed max-w-2xl mx-auto md:mx-0">
                Por eso te damos información clara y confiable para que tomes decisiones libres de cualquier influencia comercial.
              </p>
            </div>

            <div className="md:col-span-2 mt-12 md:mt-0 flex justify-center md:justify-end">
              <div className="relative isolate">
                <div className="absolute -inset-6 rounded-[2rem] bg-primary-light/20 blur-3xl" />
                <div className="relative rounded-[2rem] border border-primary-light/20 bg-white/70 backdrop-blur-sm p-5 shadow-[0_24px_60px_rgba(34,82,29,0.12)]">
                  <img
                    src={independientePng}
                    alt="Vokkado independiente"
                    className="w-56 sm:w-64 md:w-[19rem] max-w-full drop-shadow-[0_18px_30px_rgba(34,82,29,0.12)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 pilares ── */}
      <section className="py-16 sm:py-20 bg-white border-t border-neutral-100">
        <div ref={pillarsRef} className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.22em] text-primary-dark/70 mb-3">Nuestros compromisos</span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-darkest">Tres principios que no negociamos</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map((p) => (
              <div key={p.title} className="bg-[#f4f8ec] rounded-2xl p-7 border border-primary-light/20">
                <div className="w-11 h-11 rounded-xl bg-primary-dark flex items-center justify-center mb-5">
                  <ion-icon name={p.icon} style={{ fontSize: '22px', color: '#B8C445' }} />
                </div>
                <h3 className="text-lg font-bold text-neutral-darkest mb-2">{p.title}</h3>
                <p className="text-sm text-neutral-DEFAULT leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bloque oscuro: por qué importa ── */}
      <section className="relative py-16 sm:py-20 overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center relative">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-light mb-5">Por qué importa</p>
          <blockquote className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug">
            "Un análisis nutricional solo vale si la persona que lo hace<br className="hidden md:block" />
            <span className="text-primary-light"> no tiene nada que ganar</span> con el resultado."
          </blockquote>
          <p className="mt-8 text-white/65 text-base leading-relaxed max-w-xl mx-auto">
            La industria alimentaria mueve miles de millones al año. Nuestra promesa es que ese dinero no cambia lo que te decimos.
          </p>
        </div>
      </section>

      {/* ── Cómo nos sostenemos ── */}
      <section className="py-16 sm:py-20 bg-white border-t border-neutral-100">
        <div ref={howRef} className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.22em] text-primary-dark/70 mb-3">Transparencia</span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-darkest">¿Cómo nos sostenemos?</h2>
            <p className="mt-4 text-neutral-DEFAULT max-w-2xl mx-auto">
              Creemos que la transparencia sobre nuestro modelo de negocio es parte de ser independientes.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {HOW.map((h) => (
              <div key={h.title} className="flex items-start gap-4 p-6 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-primary-lightest flex items-center justify-center flex-shrink-0">
                  <ion-icon name={h.icon} style={{ fontSize: '20px', color: '#22521D' }} />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-darkest mb-1">{h.title}</h3>
                  <p className="text-sm text-neutral-DEFAULT leading-relaxed">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA → equipo ── */}
      <section className="py-14 bg-[#f4f8ec] border-t border-primary-light/20 text-center">
        <div ref={ctaRef} className="container mx-auto px-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-dark/70 mb-3">El equipo</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-darkest mb-3">
            Conocé a quienes están detrás de este compromiso
          </h2>
          <p className="text-neutral-DEFAULT mb-7 max-w-md mx-auto text-sm">
            Cuatro co-fundadores que decidieron hacer esto bien, desde el principio.
          </p>
          <Link
            to="/equipo"
            className="inline-flex items-center gap-2 bg-primary-dark text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-primary-DEFAULT hover:scale-105 transition-all duration-200 shadow-sm"
          >
            Conocer al equipo
            <ion-icon name="arrow-forward-outline" style={{ fontSize: '16px' }} />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default IndependenciaPage;
