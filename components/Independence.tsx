import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import Teaser from './Teaser';
import independientePng from '../images/independiente.webp';
import Icono from './common/Icono';

/* Lo que no vas a encontrar en Vokkado, y por qué. Cada renglón es una
   promesa concreta, no un valor abstracto. */
const NUNCA = [
  {
    titulo: 'Publicidad adentro de la app',
    porque: 'Ni banners, ni marcas destacadas, ni "producto sugerido" pagado. La pantalla es tuya.',
  },
  {
    titulo: 'Un producto mejor puntuado porque alguien pagó',
    porque: 'El puntaje sale de la etiqueta, de la ley de rotulado y de tus restricciones. Ningún fabricante puede tocarlo.',
  },
  {
    titulo: 'Una alternativa recomendada por acuerdo comercial',
    porque: 'Cuando te sugerimos otro producto, es porque le va mejor a tu perfil, no porque nos convenga a nosotros.',
  },
  {
    titulo: 'Tus datos vendidos con tu nombre',
    porque: 'Lo que escaneás y comprás es tuyo. Si algún día compartimos tendencias con la industria, van anónimas y agregadas.',
  },
];

const RenglonNunca: React.FC<{ item: typeof NUNCA[0]; index: number }> = ({ item, index }) => {
  const { ref } = useScrollAnimation<HTMLLIElement>({ animation: 'fade-up', delay: index * 90, threshold: 0.1 });
  return (
    <li ref={ref} className="grid grid-cols-[auto_1fr] gap-x-5 sm:gap-x-7 py-7 sm:py-8 border-t border-primary-dark/15 dark:border-white/10 last:border-b">
      <span
        className="mt-1 w-8 h-8 rounded-full border border-primary-dark/25 dark:border-primary-light/40 text-primary-dark dark:text-primary-light flex items-center justify-center shrink-0"
        aria-hidden="true"
      >
        <Icono name="close-outline" style={{ fontSize: '18px' }} />
      </span>
      <div>
        <h3 className="font-display text-xl sm:text-2xl lg:text-[1.75rem] font-semibold leading-snug text-neutral-darkest dark:text-white text-balance">
          {item.titulo}
        </h3>
        <p className="mt-2.5 text-sm sm:text-base text-neutral-dark dark:text-white/70 leading-relaxed max-w-2xl">{item.porque}</p>
      </div>
    </li>
  );
};

/* De dónde sale la plata. Dicho sin vueltas, porque es parte de la promesa. */
const SOSTEN = [
  {
    n: '01',
    titulo: 'Vos, si querés más',
    estado: 'Próximamente',
    desc: 'Una suscripción para quien quiera funciones avanzadas. La app de todos los días sigue siendo gratis, y nadie que pague ve un análisis distinto.',
  },
  {
    n: '02',
    titulo: 'Tendencias para la industria',
    desc: 'Le contamos a marcas y supermercados qué busca la gente y qué deja en la góndola, en números anónimos y agregados. Nunca quién sos ni qué compraste vos.',
  },
];

const ColumnaSosten: React.FC<{ item: typeof SOSTEN[0]; index: number }> = ({ item, index }) => {
  const { ref } = useScrollAnimation({ animation: 'fade-up', delay: index * 120, threshold: 0.1 });
  return (
    <div ref={ref} className="md:border-l md:border-primary-dark/15 md:dark:border-white/10 md:pl-8">
      <span className="font-sans text-xs font-bold tabular-nums text-primary-dark/60 dark:text-primary-light/60">{item.n}</span>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-2 mb-3">
        <h3 className="font-display text-2xl font-semibold text-neutral-darkest dark:text-white">{item.titulo}</h3>
        {item.estado && (
          <span className="font-sans text-[11px] font-semibold px-2.5 py-1 rounded-full bg-neutral-light dark:bg-white/10 text-neutral-dark dark:text-white/60">
            {item.estado}
          </span>
        )}
      </div>
      <p className="text-sm sm:text-base text-neutral-dark dark:text-white/70 leading-relaxed">{item.desc}</p>
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
    <div className="relative text-neutral-dark dark:text-white/75 overflow-hidden">

      {/* ── Fondo continuo ── */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05] text-primary-dark dark:text-primary-light"
          style={{
            backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
        <div className="absolute -top-28 right-[-120px] w-96 h-96 rounded-full bg-primary-light/20 dark:bg-primary/15 blur-3xl" />
        <div className="absolute top-[40%] left-[-160px] w-80 h-80 rounded-full bg-primary-lightest/60 dark:bg-primary-dark/25 blur-3xl" />
      </div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-36 sm:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:grid md:grid-cols-5 md:gap-12 md:items-center">

            {/* Texto */}
            <div ref={heroTextRef} className="md:col-span-3 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-darkest dark:text-white tracking-tight leading-tight mb-6">
                Nadie nos paga <br className="hidden sm:block" />
                por lo que <span className="text-primary-dark dark:text-primary-light">te decimos</span>
              </h1>
              <p className="text-lg md:text-xl text-neutral-dark dark:text-white/75 leading-relaxed max-w-2xl mx-auto md:mx-0">
                Ni marcas, ni supermercados, ni publicidad. Lo que Vokkado dice de un producto sale de su etiqueta y de tus restricciones. De nada más.
              </p>
            </div>

            {/* Imagen — flota sobre aura circular, sin caja rectangular */}
            <div ref={heroImgRef} className="md:col-span-2 mt-16 md:mt-0 flex justify-center md:justify-end">
              <div className="relative flex items-center justify-center w-72 h-72 sm:w-80 sm:h-80">
                {/* Aura de fondo */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-light/30 via-[#d6eabf]/40 to-primary-lightest/20 dark:from-primary/25 dark:via-primary-dark/30 dark:to-primary-dark/20 blur-2xl" />
                {/* Círculo decorativo */}
                <div className="absolute inset-4 rounded-full border border-primary-light/25 dark:border-primary-light/20 border-dashed" />
                {/* Puntos decorativos flotantes */}
                <div className="absolute top-3 right-10 w-3 h-3 rounded-full bg-primary-light/50" />
                <div className="absolute bottom-6 left-8 w-2 h-2 rounded-full bg-primary/40" />
                <div className="absolute top-1/2 right-2 w-2 h-2 rounded-full bg-primary-light/60" />
                {/* Imagen */}
                <img loading="lazy" decoding="async"
                  src={independientePng}
                  alt="Vokkado independiente"
                  className="relative z-10 w-52 sm:w-60 md:w-64 max-w-full drop-shadow-[0_20px_40px_rgba(34,82,29,0.18)] dark:drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Lo que nunca vas a ver ── */}
      <section className="relative pb-20 sm:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div ref={pillarsTitleRef} className="mb-10 sm:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-darkest dark:text-white leading-tight">
              Lo que nunca vas a ver <span className="text-primary-dark dark:text-primary-light">en Vokkado</span>
            </h2>
            <p className="mt-4 text-lg text-neutral-dark dark:text-white/75 max-w-2xl">
              Cuatro cosas que nos comprometemos a no hacer, aunque paguen bien.
            </p>
          </div>
          <ul>
            {NUNCA.map((item, i) => (
              <RenglonNunca key={item.titulo} item={item} index={i} />
            ))}
          </ul>
        </div>
      </section>

      {/* ── El corazón de la página: la promesa dicha en una frase ── */}
      <section className="relative py-28 sm:py-40 overflow-hidden fondo-luz-profunda">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }}
        />
        {/* Comillas enormes de fondo: sostienen la frase sin competirle */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 font-display text-white/[0.07] leading-none select-none text-[12rem] sm:text-[18rem]"
        >
          “
        </span>

        <div ref={quoteRef} className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center relative">
          <blockquote className="text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.12] text-balance">
            Quien se beneficia de lo que elegís
            <span className="text-primary-light"> no puede ser </span>
            quien te lo recomienda
          </blockquote>

          <span className="block w-16 h-px bg-primary-light/50 mx-auto mt-10" />

          <p className="mt-8 text-white/80 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            La industria alimentaria mueve miles de millones al año. Esa plata no va a cambiar lo que Vokkado te dice de un producto. Esa es la promesa.
          </p>
        </div>
      </section>

      {/* ── De dónde sale la plata ── */}
      <section className="relative py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div ref={howTitleRef} className="mb-12 sm:mb-14 max-w-3xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-darkest dark:text-white leading-tight">
              Entonces, <span className="text-primary-dark dark:text-primary-light whitespace-nowrap">¿de dónde sale la plata?</span>
            </h2>
            <p className="mt-4 text-lg text-neutral-dark dark:text-white/75">
              Decirlo con claridad también es parte de ser independientes. Hay dos caminos, y ninguno pasa por venderte algo en la góndola.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-10 md:gap-12">
            {SOSTEN.map((item, i) => (
              <ColumnaSosten key={item.n} item={item} index={i} />
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
