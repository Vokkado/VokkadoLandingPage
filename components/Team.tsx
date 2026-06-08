import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

import photo1 from '../images/team/1.png';
import photo2 from '../images/team/2.png';
import photo3 from '../images/team/3.png';
import photo4 from '../images/team/4.png';

const MEMBERS = [
  {
    photo: photo1,
    name: 'Belén Drescher',
    role: 'CEO & Co-founder',
    bio: 'Siempre va para adelante y da la cara por el equipo. Su energía, iniciativa y capacidad para conectar con personas son fundamentales para impulsar el crecimiento de Vokkado y acercar la solución a quienes más la necesitan.',
  },
  {
    photo: photo2,
    name: 'Nicolás De La Hoz',
    role: 'COO & Co-founder',
    bio: 'Mantiene al equipo organizado y enfocado. Siempre con una mirada práctica y realista, ayuda a convertir las ideas en acciones concretas y a que Vokkado siga avanzando paso a paso.',
  },
  {
    photo: photo3,
    name: 'Lautaro Elosegui',
    role: 'CTO & Co-founder',
    bio: 'Aparece cuando algo se rompe. No importa la hora ni lo complicado del problema, siempre está dispuesto a encontrar una solución. Su dedicación y compromiso son clave para que Vokkado siga funcionando y mejorando cada día.',
  },
  {
    photo: photo4,
    name: 'Juan Andrés Macedo',
    role: 'CIO & Co-founder',
    bio: 'Está atento para que Vokkado nunca se detenga. Siempre detrás de escena, se encarga de que toda la infraestructura funcione correctamente para que la plataforma esté disponible cuando los usuarios la necesitan.',
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
    <section className="bg-white border-t border-neutral-100 py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">

        {/* Header con líneas */}
        <div ref={headerRef} className="flex items-center gap-4 mb-14">
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

/* ── IndependenciaTeaser — animaciones internas propias ── */
const IndependenciaTeaser: React.FC = () => {
  const { ref: badgeRef }  = useScrollAnimation({ animation: 'fade-up', threshold: 0.15 });
  const { ref: titleRef }  = useScrollAnimation({ animation: 'fade-up', delay: 100, threshold: 0.15 });
  const { ref: descRef }   = useScrollAnimation({ animation: 'fade-up', delay: 200, threshold: 0.15 });
  const { ref: btnRef }    = useScrollAnimation({ animation: 'fade-up', delay: 300, threshold: 0.15 });

  return (
    <section className="py-14 bg-[#f4f8ec] border-t border-primary-light/20 text-center">
      <div className="container mx-auto px-4">
        <p ref={badgeRef} className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-dark/70 mb-3">
          Independencia
        </p>
        <h2 ref={titleRef} className="text-2xl sm:text-3xl font-bold text-neutral-darkest mb-3">
          Sin influencias. Solo la verdad.
        </h2>
        <p ref={descRef} className="text-neutral-DEFAULT mb-7 max-w-md mx-auto text-sm">
          Vokkado no recibe dinero de marcas. Cada análisis es objetivo, transparente y libre de conflictos de interés.
        </p>
        <div ref={btnRef}>
          <Link
            to="/independencia"
            className="inline-flex items-center gap-2 bg-primary-dark text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-primary-DEFAULT hover:scale-105 transition-all duration-200 shadow-sm"
          >
            Conocer más
            <ion-icon name="arrow-forward-outline" style={{ fontSize: '16px' }} />
          </Link>
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

/* ── Team page ── */
const Team: React.FC = () => {
  // Hero — cada elemento entra escalonado
  const { ref: heroBadgeRef } = useScrollAnimation({ animation: 'fade-up', delay: 0,   threshold: 0.2 });
  const { ref: heroTitleRef } = useScrollAnimation({ animation: 'fade-up', delay: 100, threshold: 0.2 });
  const { ref: heroBodyRef  } = useScrollAnimation({ animation: 'fade-up', delay: 220, threshold: 0.2 });

  // Sección equipo — header desglosado
  const { ref: teamBadgeRef } = useScrollAnimation({ animation: 'fade-up', delay: 0,   threshold: 0.2 });
  const { ref: teamTitleRef } = useScrollAnimation({ animation: 'fade-up', delay: 90,  threshold: 0.2 });
  const { ref: teamDescRef  } = useScrollAnimation({ animation: 'fade-up', delay: 180, threshold: 0.2 });

  // CTA final
  const { ref: ctaTitleRef } = useScrollAnimation({ animation: 'fade-up', delay: 0,   threshold: 0.2 });
  const { ref: ctaDescRef  } = useScrollAnimation({ animation: 'fade-up', delay: 120, threshold: 0.2 });

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
          <span ref={heroBadgeRef} className="inline-block text-xs font-semibold uppercase tracking-[0.22em] text-primary-dark/70 mb-4">
            El equipo
          </span>
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
          <span ref={teamBadgeRef} className="inline-block text-sm font-semibold text-primary-dark tracking-widest uppercase mb-3">
            Co-fundadores
          </span>
          <h2 ref={teamTitleRef} className="text-3xl md:text-4xl font-bold text-neutral-darkest">
            Las personas detrás de Vokkado
          </h2>
          <p ref={teamDescRef} className="mt-4 text-base sm:text-lg text-neutral-dark max-w-2xl mx-auto">
            Lideramos Vokkado con foco en salud, tecnología y experiencia real para el usuario.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-4xl mx-auto items-stretch">
          {MEMBERS.map((member, i) => (
            <MemberCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </section>

      {/* ── Misión · Visión · Valores ── */}
      <AboutSection />

      {/* ── Teaser Independencia ── */}
      <IndependenciaTeaser />

      {/* ── CTA ── */}
      <div className="bg-gradient-to-br from-primary-dark via-primary-DEFAULT to-primary-dark py-14 text-center px-4 text-white">
        <p ref={ctaTitleRef} className="font-bold text-3xl mb-2">Escaneá. Elegí. Cuidate.</p>
        <p ref={ctaDescRef} className="text-primary-lightest text-sm">Descargá Vokkado y empezá a tomar mejores decisiones hoy.</p>
      </div>

    </div>
  );
};

export default Team;
