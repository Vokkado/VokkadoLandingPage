import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import Teaser from './Teaser';
import independientePng from '../images/independiente.png';

const PILLARS = [
  {
    icon: 'ban-outline',
    title: 'Sin publicidad',
    desc: 'Vokkado no muestra publicidad ni recibe dinero de marcas por aparecer en la app.',
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
    icon: 'bar-chart-outline',
    title: 'Tendencias para la industria',
    desc: 'Compartimos tendencias y preferencias de consumo de forma anónima para ayudar a marcas y supermercados a mejorar sus productos, sin comprometer la privacidad de las personas.',
  },
];

/* ── Tarjeta individual pillar — tiene su propio hook para la animación escalonada ── */
const PillarCard: React.FC<{ pillar: typeof PILLARS[0]; index: number }> = ({ pillar, index }) => {
  const { ref } = useScrollAnimation({ animation: 'fade-up', delay: index * 110, threshold: 0.1 });
  return (
    <div
      ref={ref}
      className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg border border-neutral-100 hover:border-primary-light/40 transition-all duration-300"
    >
      <div className="w-14 h-14 rounded-2xl bg-primary-light/15 flex items-center justify-center mb-6 group-hover:bg-primary-light/30 transition-colors duration-300">
        <ion-icon
          name={pillar.icon}
          style={{ fontSize: '26px', color: '#22521D' }}
          aria-hidden="true"
          title={pillar.title}
        />
      </div>
      <h3 className="text-lg font-bold text-neutral-darkest mb-3">{pillar.title}</h3>
      <p className="text-sm text-neutral-DEFAULT leading-relaxed">{pillar.desc}</p>
    </div>
  );
};

/* ── Tarjeta individual HOW ── */
const HowCard: React.FC<{ item: typeof HOW[0]; index: number }> = ({ item, index }) => {
  const { ref } = useScrollAnimation({ animation: 'fade-up', delay: index * 120, threshold: 0.1 });
  return (
    <div
      ref={ref}
      className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg border border-neutral-100 hover:border-primary-light/40 transition-all duration-300 flex items-start gap-5"
    >
      <div className="w-12 h-12 rounded-2xl bg-primary-light/15 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-light/30 transition-colors duration-300">
        <ion-icon
          name={item.icon}
          style={{ fontSize: '22px', color: '#22521D' }}
          aria-hidden="true"
          title={item.title}
        />
      </div>
      <div>
        <h3 className="font-bold text-neutral-darkest mb-2">{item.title}</h3>
        <p className="text-sm text-neutral-DEFAULT leading-relaxed">{item.desc}</p>
      </div>
    </div>
  );
};

const IndependenciaPage: React.FC = () => {
  const { ref: heroTextRef }  = useScrollAnimation({ animation: 'fade-right', threshold: 0.15 });
  const { ref: heroImgRef }   = useScrollAnimation({ animation: 'fade-left', delay: 120, threshold: 0.15 });
  const { ref: pillarsTitleRef } = useScrollAnimation({ animation: 'fade-up', threshold: 0.15 });
  const { ref: quoteRef }     = useScrollAnimation({ animation: 'fade-up', threshold: 0.15 });
  const { ref: howTitleRef }  = useScrollAnimation({ animation: 'fade-up', threshold: 0.15 });

  return (
    <div className="relative bg-friendlyWhite text-neutral-dark overflow-hidden">

      {/* ── Fondo continuo ── */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f4f8ec] via-friendlyWhite to-white" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'linear-gradient(#22521D 1px, transparent 1px), linear-gradient(90deg, #22521D 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
        <div className="absolute -top-28 right-[-120px] w-96 h-96 rounded-full bg-primary-light/20 blur-3xl" />
        <div className="absolute top-[40%] left-[-160px] w-80 h-80 rounded-full bg-primary-lightest/60 blur-3xl" />
      </div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:grid md:grid-cols-5 md:gap-12 md:items-center">

            {/* Texto */}
            <div ref={heroTextRef} className="md:col-span-3 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-darkest tracking-tight leading-tight mb-6">
                La independencia <br className="hidden sm:block" />
                es <span className="text-primary-dark">clave</span> en <br className="hidden sm:block" />
                nuestra misión
              </h1>
              <p className="text-lg md:text-xl text-neutral-dark leading-relaxed max-w-2xl mx-auto md:mx-0">
                Te damos información clara y confiable para que tomes decisiones libres de cualquier influencia comercial.
              </p>
            </div>

            {/* Imagen — flota sobre aura circular, sin caja rectangular */}
            <div ref={heroImgRef} className="md:col-span-2 mt-16 md:mt-0 flex justify-center md:justify-end">
              <div className="relative flex items-center justify-center w-72 h-72 sm:w-80 sm:h-80">
                {/* Aura de fondo */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-light/30 via-[#d6eabf]/40 to-primary-lightest/20 blur-2xl" />
                {/* Círculo decorativo */}
                <div className="absolute inset-4 rounded-full border border-primary-light/25 border-dashed" />
                {/* Puntos decorativos flotantes */}
                <div className="absolute top-3 right-10 w-3 h-3 rounded-full bg-primary-light/50" />
                <div className="absolute bottom-6 left-8 w-2 h-2 rounded-full bg-primary-DEFAULT/40" />
                <div className="absolute top-1/2 right-2 w-2 h-2 rounded-full bg-primary-light/60" />
                {/* Imagen */}
                <img
                  src={independientePng}
                  alt="Vokkado independiente"
                  className="relative z-10 w-52 sm:w-60 md:w-64 max-w-full drop-shadow-[0_20px_40px_rgba(34,82,29,0.18)]"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3 pilares ── */}
      <section className="relative pb-20 sm:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div ref={pillarsTitleRef} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-darkest">
              Tres principios que no negociamos
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map((p, i) => (
              <PillarCard key={p.title} pillar={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Bloque oscuro: por qué importa ── */}
      <section className="relative py-20 sm:py-28 overflow-hidden bg-primary-dark">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }}
        />
        <div ref={quoteRef} className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center relative">
          <blockquote className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug">
            La información en la que confiás no debería estar
            <span className="text-primary-light"> influenciada </span>
            por quien se beneficia de
            <span className="text-primary-light"> tu elección</span>
          </blockquote>
          <p className="mt-8 text-white/65 text-base leading-relaxed max-w-xl mx-auto">
            La industria alimentaria mueve miles de millones al año. Nuestra promesa es que ese dinero no va a cambiar lo que te decimos.
          </p>
        </div>
      </section>

      {/* ── Cómo nos sostenemos ── */}
      <section className="relative py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div ref={howTitleRef} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-darkest">¿Cómo nos sostenemos?</h2>
            <p className="mt-4 text-neutral-DEFAULT max-w-2xl mx-auto">
              Creemos que la transparencia sobre nuestro modelo de negocio es parte de ser independientes.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {HOW.map((h, i) => (
              <HowCard key={h.title} item={h} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA → equipo ── */}
      <Teaser
        badge="Nosotros"
        title="Conocé quiénes están detrás de este compromiso"
        desc="Cuatro co-fundadores que decidieron hacer esto bien, desde el principio."
        linkTo="/equipo"
        linkText="Conocer al equipo"
      />

    </div>
  );
};

export default IndependenciaPage;
