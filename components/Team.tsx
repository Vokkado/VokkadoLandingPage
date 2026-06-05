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

const PURPOSES = [
  {
    label: 'Misión',
    text: 'Empoderar a las personas para que tomen mejores decisiones alimentarias, transformando información nutricional compleja en recomendaciones claras, personalizadas y fáciles de entender según sus necesidades y objetivos.',
  },
  {
    label: 'Visión',
    text: 'Ser la plataforma de referencia en alimentación personalizada, ayudando a millones de personas a comprender mejor lo que consumen y a elegir alimentos con mayor confianza y tranquilidad.',
  },
];

type TabKey = 'mision' | 'vision' | 'valores';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'mision',  label: 'Misión'  },
  { key: 'vision',  label: 'Visión'  },
  { key: 'valores', label: 'Valores' },
];

const TAB_CONTENT: Record<TabKey, React.ReactNode> = {
  mision: (
    <div>
      <p className="text-neutral-dark leading-relaxed text-base md:text-lg">
        Empoderar a las personas para que tomen mejores decisiones alimentarias, transformando
        información nutricional compleja en recomendaciones claras, personalizadas y fáciles de
        entender según sus necesidades y objetivos.
      </p>
    </div>
  ),
  vision: (
    <div>
      <p className="text-neutral-dark leading-relaxed text-base md:text-lg">
        Ser la plataforma de referencia en alimentación personalizada, ayudando a millones de
        personas a comprender mejor lo que consumen y a elegir alimentos con mayor confianza y
        tranquilidad.
      </p>
    </div>
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

const AboutSection: React.FC<{ sectionRef: React.RefObject<HTMLDivElement>; headerRef: React.RefObject<HTMLDivElement> }> = ({ sectionRef, headerRef }) => {
  const [active, setActive] = useState<TabKey>('mision');

  return (
    <section className="bg-white border-t border-neutral-100 py-16 sm:py-20">
      <div ref={sectionRef} className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">

        {/* Título estilo Swiggy — texto uppercase con líneas a los lados */}
        <div ref={headerRef} className="flex items-center gap-4 mb-14">
          <div className="flex-grow h-px bg-neutral-200" />
          <h2 className="text-xl md:text-2xl font-extrabold font-lexend uppercase tracking-widest text-primary-dark whitespace-nowrap">
            Conocenos
          </h2>
          <div className="flex-grow h-px bg-neutral-200" />
        </div>

        {/* Layout: tabs izquierda | contenido derecha — altura fija */}
        <div className="flex flex-col md:flex-row gap-0" style={{ height: '280px' }}>

          {/* Tabs — texto puro + separadores */}
          <div className="md:w-48 flex-shrink-0 flex md:flex-col justify-around md:justify-center border-b md:border-b-0 md:border-r border-neutral-200 pr-0 md:pr-0">
            {TABS.map((tab, i) => (
              <React.Fragment key={tab.key}>
                {i > 0 && <div className="hidden md:block h-px bg-neutral-200 mx-0" />}
                <button
                  onClick={() => setActive(tab.key)}
                  className="group flex items-center gap-2 py-5 md:py-6 px-2 md:px-0 text-left transition-colors duration-200"
                >
                  <span className={`text-base md:text-lg font-semibold transition-colors duration-200 ${
                    active === tab.key ? 'text-primary-dark' : 'text-neutral-medium hover:text-neutral-dark'
                  }`}>
                    {tab.label}
                  </span>
                  <span className={`transition-all duration-200 text-primary-dark ${active === tab.key ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1'}`}>
                    →
                  </span>
                </button>
              </React.Fragment>
            ))}
          </div>

          {/* Contenido — overflow hidden para que no crezca */}
          <div className="flex-grow md:pl-14 flex items-center overflow-hidden">
            <div key={active} className="animate-fade-in-up w-full">
              {TAB_CONTENT[active]}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const MemberCard: React.FC<{ member: typeof MEMBERS[0]; index: number }> = ({ member, index }) => {
  const cardAnim = useScrollAnimation({ animation: 'fade-up', delay: index * 120, threshold: 0.15 });
  const photoAnim = useScrollAnimation({ animation: 'scale', delay: index * 120 + 80, threshold: 0.15 });

  return (
    <div ref={cardAnim.ref} className="group flex flex-col items-center w-full">
      {/* Foto */}
      <div
        ref={photoAnim.ref}
        className="relative z-10 w-36 h-36 rounded-full overflow-hidden ring-4 ring-white shadow-lg group-hover:scale-105 group-hover:shadow-xl transition-all duration-300 flex-shrink-0"
      >
        <img
          src={member.photo}
          alt={member.name}
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center', transform: 'scale(1.35)', transformOrigin: 'center' }}
        />
      </div>

      {/* Card — sube para solaparse con la foto */}
      <div className="w-full -mt-16 bg-white rounded-2xl shadow-sm border border-neutral-light px-6 pt-20 pb-7 text-center flex flex-col group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300">
        <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-primary-dark bg-primary-lightest px-3 py-1 rounded-full mb-3 self-center border border-primary-light/40">
          {member.role}
        </span>
        <h3 className="text-lg font-bold text-neutral-darkest mb-3">{member.name}</h3>
        <p className="text-sm text-neutral-DEFAULT leading-relaxed">{member.bio}</p>
      </div>
    </div>
  );
};

const Team: React.FC = () => {
  const heroTitleAnim = useScrollAnimation({ animation: 'fade-up', threshold: 0.2 });
  const heroBodyAnim = useScrollAnimation({ animation: 'fade-up', delay: 120, threshold: 0.2 });
  const teamHeaderAnim = useScrollAnimation({ animation: 'fade-up', threshold: 0.2 });
  const aboutHeaderAnim = useScrollAnimation({ animation: 'fade-up', threshold: 0.2 });
  const missionAnim = useScrollAnimation({ animation: 'fade-up', threshold: 0.2 });

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
          <div ref={heroTitleAnim.ref}>
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.28em] text-primary-dark/70 mb-5">
              Nosotros
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-darkest tracking-tight leading-tight">
              Más que una app,
              <br className="hidden sm:block" />
              <span className="text-primary-dark"> un propósito</span>
            </h1>
          </div>
          <p
            ref={heroBodyAnim.ref}
            className="mt-5 text-lg md:text-xl text-neutral-dark max-w-2xl mx-auto"
          >
            Somos un equipo de cuatro amigos que cree que entender lo que comés no debería ser complicado. Conocé quiénes somos, qué nos mueve y hacia dónde vamos.
          </p>
        </div>
      </section>

      {/* ── Equipo ── */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 sm:pt-14 sm:pb-20">
        <div ref={teamHeaderAnim.ref} className="text-center mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.22em] text-primary-dark/70 mb-3">
            El equipo
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-darkest">Co-fundadores</h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-dark max-w-2xl mx-auto">
            Lideramos Vokkado con foco en salud, tecnología y experiencia real para el usuario.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 max-w-4xl mx-auto justify-items-center">
          {MEMBERS.map((member, i) => (
            <MemberCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </section>

      {/* ── Misión · Visión · Valores ── */}
      <AboutSection sectionRef={missionAnim.ref} headerRef={aboutHeaderAnim.ref} />

      {/* ── CTA ── */}
      <div className="bg-gradient-to-br from-primary-dark via-primary-DEFAULT to-primary-dark py-16 text-center px-4 text-white">
        <p className="font-bold text-3xl mb-2">Escaneá. Elegí. Cuidate.</p>
        <p className="text-primary-lightest text-sm mb-7">Descargá Vokkado y empezá a tomar mejores decisiones hoy.</p>
        <Link
          to="/"
          className="inline-block bg-white text-primary-dark font-semibold text-sm px-7 py-3 rounded-xl hover:bg-primary-lightest hover:scale-105 transition-all duration-200 shadow-md"
        >
          Conocé la app
        </Link>
      </div>
    </div>
  );
};

export default Team;
