import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import Teaser from './Teaser';

const AppleLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const GooglePlayLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.61 1.814L13.793 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.61-.92z" fill="#4285F4" />
    <path d="M16.657 8.893L5.536.96C5.079.69 4.537.622 4.05.77l9.743 9.743 2.864-1.62z" fill="#EA4335" />
    <path d="M16.657 15.107l-2.864-1.62L4.05 23.23c.487.148 1.029.08 1.486-.19l11.121-7.933z" fill="#34A853" />
    <path d="M20.39 10.467l-3.733-2.114L13.793 12l2.864 3.647 3.733-2.114c.658-.373 1.063-1.07 1.063-1.833s-.405-1.46-1.063-1.233z" fill="#FBBC04" />
  </svg>
);

// Bandera de Uruguay (SVG inline para que se vea bien en todas las plataformas, incl. Windows).
const UruguayFlag: React.FC<{ className?: string }> = ({ className }) => {
  const sun = 6.667; // centro del Sol de Mayo (dentro del cantón)
  return (
    <svg className={className} viewBox="0 0 36 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="24" fill="#FFFFFF" />
      {[2.667, 8, 13.333, 18.667].map((y, i) => (
        <rect key={i} y={y} width="36" height="2.667" fill="#0038A8" />
      ))}
      {/* Cantón blanco (cubre las primeras 5 franjas) */}
      <rect width="13.333" height="13.333" fill="#FFFFFF" />
      {/* Sol de Mayo: rayos + disco */}
      <g stroke="#F6B40E" strokeWidth="0.6">
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i * Math.PI) / 8;
          return (
            <line
              key={i}
              x1={sun + Math.cos(a) * 2.1}
              y1={sun + Math.sin(a) * 2.1}
              x2={sun + Math.cos(a) * 4}
              y2={sun + Math.sin(a) * 4}
            />
          );
        })}
      </g>
      <circle cx={sun} cy={sun} r="2.1" fill="#F6B40E" />
    </svg>
  );
};

import photo1 from '../images/team/1.png';
import photo2 from '../images/team/2.png';
import photo3 from '../images/team/3.png';
import photo4 from '../images/team/4.png';

const MEMBERS = [
  {
    photo: photo1,
    name: 'Belén Drescher',
    role: 'CEO & Co-founder',
    bio: 'Siempre va para adelante y da la cara por el equipo. Su energía, iniciativa y capacidad para conectar con personas son fundamentales para impulsar el crecimiento de vokkado y acercar la solución a quienes más la necesitan.',
  },
  {
    photo: photo2,
    name: 'Nicolás De La Hoz',
    role: 'COO & Co-founder',
    bio: 'Mantiene al equipo organizado y enfocado. Siempre con una mirada práctica y realista, ayuda a convertir las ideas en acciones concretas y a que vokkado siga avanzando paso a paso.',
  },
  {
    photo: photo3,
    name: 'Lautaro Elosegui',
    role: 'CTO & Co-founder',
    bio: 'Aparece cuando algo se rompe. No importa la hora ni lo complicado del problema, siempre está dispuesto a encontrar una solución. Su dedicación y compromiso son clave para que vokkado siga funcionando y mejorando cada día.',
  },
  {
    photo: photo4,
    name: 'Juan Andrés Macedo',
    role: 'CIO & Co-founder',
    bio: 'Está atento para que vokkado nunca se detenga. Siempre detrás de escena, se encarga de que toda la infraestructura funcione correctamente para que la plataforma esté disponible cuando los usuarios la necesitan.',
  },
];

const VALUES = [
  { title: 'Personas primero', desc: 'Cada decisión que tomamos busca generar valor real para nuestros usuarios.' },
  { title: 'Confianza', desc: 'Brindamos recomendaciones transparentes, fáciles de entender y respaldadas por datos.' },
  { title: 'Innovación', desc: 'Utilizamos la tecnología para resolver problemas cotidianos de forma inteligente.' },
  { title: 'Compromiso', desc: 'Trabajamos con pasión para generar un impacto positivo en la salud y bienestar de las personas.' },
];

type TabKey = 'mision' | 'vision' | 'valores';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'mision',  label: 'Misión'  },
  { key: 'vision',  label: 'Visión'  },
  { key: 'valores', label: 'Valores' },
];

const TAB_CONTENT: Record<TabKey, React.ReactNode> = {
  mision: (
    <p className="text-neutral-dark leading-relaxed text-base md:text-lg">
      Empoderar a las personas para que tomen mejores decisiones alimentarias, transformando
      información nutricional compleja en recomendaciones claras, personalizadas y fáciles de
      entender según sus necesidades y objetivos.
    </p>
  ),
  vision: (
    <p className="text-neutral-dark leading-relaxed text-base md:text-lg">
      Ser la plataforma de referencia en alimentación personalizada, ayudando a millones de
      personas a comprender mejor lo que consumen y a elegir alimentos con mayor confianza y
      tranquilidad.
    </p>
  ),
  valores: (
    <ul className="space-y-5">
      {VALUES.map((v) => (
        <li key={v.title} className="flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-primary-dark mt-2 flex-shrink-0" />
          <p className="text-neutral-dark leading-relaxed text-base">
            <span className="font-semibold text-neutral-darkest">{v.title}: </span>
            {v.desc}
          </p>
        </li>
      ))}
    </ul>
  ),
};

/* ── AboutSection — animaciones internas propias ── */
const AboutSection: React.FC = () => {
  const [active, setActive] = useState<TabKey>('mision');
  const { ref: headerRef } = useScrollAnimation({ animation: 'fade-up', threshold: 0.2 });
  const { ref: pillsRef }  = useScrollAnimation({ animation: 'fade-up', delay: 120, threshold: 0.2 });
  const { ref: contentRef } = useScrollAnimation({ animation: 'fade-up', delay: 240, threshold: 0.2 });

  return (
    <section className="bg-white border-t border-neutral-100 pt-8 pb-16 sm:pt-10 sm:pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">

        {/* Header con líneas */}
        <div ref={headerRef} className="flex items-center gap-4 mb-10">
          <div className="flex-grow h-px bg-neutral-200" />
          <h2 className="text-xl md:text-2xl font-extrabold uppercase tracking-widest text-primary-dark whitespace-nowrap">
            Conocenos
          </h2>
          <div className="flex-grow h-px bg-neutral-200" />
        </div>

        {/* Pills */}
        <div ref={pillsRef} className="flex gap-2 mb-8">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                active === tab.key
                  ? 'bg-primary-dark text-white'
                  : 'bg-neutral-100 text-neutral-DEFAULT hover:bg-neutral-200 hover:text-neutral-dark'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Contenido */}
        <div ref={contentRef} style={{ minHeight: '160px' }} className="flex items-start">
          <div key={active} className="animate-fade-in-up w-full">
            {TAB_CONTENT[active]}
          </div>
        </div>
      </div>
    </section>
  );
};


/* ── MemberCard ── */
const MemberCard: React.FC<{ member: typeof MEMBERS[0]; index: number }> = ({ member, index }) => {
  const cardAnim  = useScrollAnimation({ animation: 'fade-up', delay: index * 120, threshold: 0.15 });
  const photoAnim = useScrollAnimation({ animation: 'scale',   delay: index * 120 + 80, threshold: 0.15 });

  return (
    <div ref={cardAnim.ref} className="group flex flex-col items-center w-full h-full transition-transform duration-300 group-hover:-translate-y-1">
      {/* Foto */}
      <div
        ref={photoAnim.ref}
        className="relative z-10 w-36 h-36 rounded-full overflow-hidden flex-shrink-0
          ring-1 ring-white shadow-lg
          transition-all duration-300
          group-hover:ring-primary-light"
      >
        <img
          src={member.photo}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ objectPosition: 'center', transform: 'scale(1.35)', transformOrigin: 'center' }}
        />
      </div>

      {/* Card */}
      <div className="relative w-full flex-grow -mt-16 bg-white rounded-2xl border border-neutral-light px-6 pt-20 pb-7 text-center flex flex-col
        shadow-sm transition-all duration-300
        group-hover:shadow-[0_8px_32px_rgba(34,82,29,0.15)] group-hover:border-primary-light/50"
      >
        <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-primary-dark bg-primary-lightest px-3 py-1 rounded-full mb-3 self-center border border-primary-light/40">
          {member.role}
        </span>
        <h3 className="text-lg font-bold text-neutral-darkest mb-3">{member.name}</h3>
        <p className="text-sm text-neutral-DEFAULT leading-relaxed">{member.bio}</p>
      </div>
    </div>
  );
};

/* ── UruguaySection ── */
const UruguaySection: React.FC = () => {
  const { ref: titleRef } = useScrollAnimation({ animation: 'fade-up', threshold: 0.15 });
  const { ref: card1Ref } = useScrollAnimation({ animation: 'fade-up', delay: 100, threshold: 0.15 });
  const { ref: card2Ref } = useScrollAnimation({ animation: 'fade-up', delay: 220, threshold: 0.15 });

  return (
    <section className="bg-white border-t border-neutral-100 pt-16 pb-10 sm:pt-20 sm:pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

        <div ref={titleRef} className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary-dark/70 mb-3">
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-darkest">
            Nacimos en <span className="text-primary-dark">Uruguay</span>, pensando en el mundo
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div ref={card1Ref} className="bg-[#f4f8ec] rounded-2xl p-7 border border-primary-light/20">
            <div className="w-11 h-11 rounded-xl bg-primary-light/20 flex items-center justify-center mb-4">
              <UruguayFlag className="w-[26px] h-[18px] rounded-[3px] ring-1 ring-black/10" />
            </div>
            <h3 className="font-bold text-neutral-darkest mb-2">Hoy, enfocados en Uruguay</h3>
            <p className="text-sm text-neutral-DEFAULT leading-relaxed">
              Somos un equipo uruguayo y estamos comenzando por casa. Hoy nuestro foco está en Uruguay: construir una base sólida, escuchar a nuestros usuarios y adaptar la app a la realidad local de los productos y el mercado.
            </p>
          </div>

          <div ref={card2Ref} className="bg-[#f4f8ec] rounded-2xl p-7 border border-primary-light/20">
            <div className="w-11 h-11 rounded-xl bg-primary-light/20 flex items-center justify-center mb-4">
              <ion-icon name="globe-outline" style={{ fontSize: '22px', color: '#22521D' }} />
            </div>
            <h3 className="font-bold text-neutral-darkest mb-2">Con la mirada en el horizonte</h3>
            <p className="text-sm text-neutral-DEFAULT leading-relaxed">
              El acceso a información nutricional clara no debería ser un privilegio. Queremos que la mayor cantidad de personas posible pueda saber qué hay en lo que come, sin importar dónde viva. Uruguay es el primer paso.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

/* ── Team page ── */
const Team: React.FC = () => {
  // Hero — cada elemento entra escalonado
  const { ref: heroTitleRef } = useScrollAnimation({ animation: 'fade-up', delay: 0,   threshold: 0.2 });
  const { ref: heroBodyRef  } = useScrollAnimation({ animation: 'fade-up', delay: 120, threshold: 0.2 });

  // Sección equipo — header desglosado
  const { ref: teamTitleRef } = useScrollAnimation({ animation: 'fade-up', delay: 0,   threshold: 0.2 });
  const { ref: teamDescRef  } = useScrollAnimation({ animation: 'fade-up', delay: 180, threshold: 0.2 });

  // CTA final
  const { ref: ctaTitleRef } = useScrollAnimation({ animation: 'fade-up', delay: 0,   threshold: 0.2 });
  const { ref: ctaDescRef  } = useScrollAnimation({ animation: 'fade-up', delay: 120, threshold: 0.2 });
  const { ref: ctaBtnsRef  } = useScrollAnimation({ animation: 'fade-up', delay: 240, threshold: 0.2 });

  return (
    <div className="bg-friendlyWhite text-neutral-dark">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-24 pb-10 sm:pt-28 sm:pb-12 text-center">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[#f4f8ec] via-friendlyWhite to-white" />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{ backgroundImage: 'linear-gradient(#22521D 1px, transparent 1px), linear-gradient(90deg, #22521D 1px, transparent 1px)', backgroundSize: '44px 44px' }}
          />
          <div className="absolute -top-28 right-[-120px] w-80 h-80 rounded-full bg-primary-light/30 blur-3xl" />
          <div className="absolute -bottom-24 left-[-120px] w-72 h-72 rounded-full bg-primary-lightest blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <h1 ref={heroTitleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-darkest tracking-tight leading-tight">
            Más que una app,
            <br className="hidden sm:block" />
            <span className="text-primary-dark"> un propósito</span>
          </h1>
          <p ref={heroBodyRef} className="mt-5 text-lg md:text-xl text-neutral-dark max-w-2xl mx-auto">
            Somos un equipo de cuatro amigos que cree que entender lo que comés no debería ser complicado. Conocé quiénes somos, qué nos mueve y hacia dónde vamos.
          </p>
        </div>
      </section>

      {/* ── Equipo ── */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 sm:pt-14 sm:pb-20">
        <div className="text-center mb-14">
          <h2 ref={teamTitleRef} className="text-3xl md:text-4xl font-bold text-neutral-darkest">
            Las personas detrás de vokkado
          </h2>
          <p ref={teamDescRef} className="mt-4 text-base sm:text-lg text-neutral-dark max-w-2xl mx-auto">
            Lideramos vokkado con foco en salud, tecnología y experiencia real para el usuario.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-4xl mx-auto items-stretch">
          {MEMBERS.map((member, i) => (
            <MemberCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </section>

      {/* ── Uruguay & visión global ── */}
      <UruguaySection />

      {/* ── Misión · Visión · Valores ── */}
      <AboutSection />

      {/* ── Teaser Nuestra Promesa ── */}
      <Teaser
        badge="Nuestra Promesa"
        title="Sin influencias. Solo la verdad."
        desc="Vokkado no recibe dinero de marcas. Cada análisis es objetivo, transparente y libre de conflictos de interés."
        linkTo="/independencia"
        linkText="Conocé nuestra promesa"
      />

      {/* ── CTA ── */}
      <div className="bg-gradient-to-br from-primary-dark via-primary-DEFAULT to-primary-dark py-16 text-center px-4 text-white">
        <p ref={ctaTitleRef} className="font-bold text-3xl mb-3">Escaneá. Elegí. Cuidate.</p>
        <p ref={ctaDescRef} className="text-primary-lightest text-sm mb-8">Descargá vokkado y empezá a tomar mejores decisiones hoy.</p>
        <div ref={ctaBtnsRef} className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => window.open('https://apps.apple.com/uy/app/vokkado/id6761864995?l=es-MX', '_blank', 'noopener,noreferrer')}
            className="flex items-center gap-2.5 bg-black hover:bg-neutral-darkest text-white rounded-xl px-5 py-2.5 border border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-200 cursor-pointer w-[190px]"
            aria-label="Descargar en App Store"
          >
            <AppleLogo className="w-6 h-6 flex-shrink-0" />
            <div className="text-left leading-tight">
              <span className="block text-[10px] font-normal tracking-wide opacity-80">Beta pública en</span>
              <span className="block text-[16px] font-semibold -mt-0.5">App Store</span>
            </div>
          </button>
          <button
            onClick={() => window.open('https://play.google.com/store/apps/details?id=com.scantoeat.app&pcampaignid=web_share', '_blank', 'noopener,noreferrer')}
            className="flex items-center gap-2.5 bg-black hover:bg-neutral-darkest text-white rounded-xl px-5 py-2.5 border border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-200 cursor-pointer w-[190px]"
            aria-label="Descargar en Google Play"
          >
            <GooglePlayLogo className="w-6 h-6 flex-shrink-0" />
            <div className="text-left leading-tight">
              <span className="block text-[10px] font-normal tracking-wide opacity-80">Beta pública en</span>
              <span className="block text-[16px] font-semibold -mt-0.5">Google Play</span>
            </div>
          </button>
        </div>
      </div>

    </div>
  );
};

export default Team;
