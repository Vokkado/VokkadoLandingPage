import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCanHover } from '../hooks/useCanHover';
import paltaNutri from '../images/nutri/palta-nutricionista.png';

const EMAIL = 'contact@vokkado.com';
const SUBJECT = 'Quiero sumarme a Vokkado para nutricionistas';
const GMAIL_COMPOSE = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent(SUBJECT)}`;
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}`;

/* ──────────────────────────────────────────────────────────────
   1. El día a día del consultorio: la situación adelante,
      cómo queda resuelto del otro lado.
   ────────────────────────────────────────────────────────────── */
interface Flip {
  frontIcon: string;
  front: string;
  backTitle: string;
  back: string;
}

const FLIPS: Flip[] = [
  {
    frontIcon: 'logo-whatsapp',
    front: '¿Tu agenda vive en WhatsApp y te escriben a las once de la noche?',
    backTitle: 'La agenda se ordena sola',
    back: 'Tus pacientes piden el turno desde la app, solo en los horarios que vos habilitás. Vos confirmás y el recordatorio sale sin que te acuerdes.',
  },
  {
    frontIcon: 'file-tray-full-outline',
    front: '¿La ficha de un paciente de hace ocho meses está entre un cuaderno, un Excel y tres audios?',
    backTitle: 'Una historia clínica que encontrás',
    back: 'Anamnesis, antecedentes y la evolución de cada consulta en una sola ficha, con todo lo que escribiste guardado y fechado.',
  },
  {
    frontIcon: 'document-text-outline',
    front: '¿Armás cada plan desde cero, en un Word, un domingo de noche?',
    backTitle: 'El plan parte de lo que ya sabés',
    back: 'Se apoya en el diagnóstico y los objetivos que cargaste en la consulta, calcula requerimientos y lo exportás en PDF con tu nombre.',
  },
  {
    frontIcon: 'analytics-outline',
    front: '¿Pasás peso, talla y pliegues a una planilla para poder graficar la evolución?',
    backTitle: 'La evolución se dibuja sola',
    back: 'Cargás la medición una vez, los indicadores se calculan y la serie histórica queda lista para mostrarle al paciente en pantalla.',
  },
  {
    frontIcon: 'help-circle-outline',
    front: '¿El paciente vuelve a las tres semanas y la adherencia es lo que él se acuerda?',
    backTitle: 'Sabés qué pasó entre consultas',
    back: 'Si el paciente lo habilita, ves un resumen de lo que compró frente a lo que le indicaste. Llegás con datos, no con suposiciones.',
  },
  {
    frontIcon: 'camera-outline',
    front: '¿Te llega la foto de una etiqueta un sábado, desde la góndola?',
    backTitle: 'Respondés una vez y vale siempre',
    back: 'Las restricciones que cargás en la consulta viajan a la app del paciente, y cuando escanea un producto le contesta con tu criterio.',
  },
];

const FlipTile: React.FC<{
  flip: Flip;
  delay: number;
  isOpen: boolean;
  onToggle: () => void;
  sugerir?: boolean;
}> = ({ flip, delay, isOpen, onToggle, sugerir = false }) => {
  const anim = useScrollAnimation({ animation: 'fade-up', delay, threshold: 0.15 });
  const puedeHover = useCanHover();
  const [hovered, setHovered] = useState(false);
  // Con mouse gira sola al pasar por encima, sin clic. Con dedo, el toque manda.
  const shown = puedeHover ? hovered : isOpen;

  return (
    <div ref={anim.ref} style={{ perspective: '1200px' }}>
      <button
        type="button"
        onClick={puedeHover ? undefined : onToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => puedeHover && setHovered(true)}
        onBlur={() => puedeHover && setHovered(false)}
        aria-pressed={shown}
        aria-label={`${flip.backTitle}: ${flip.back}`}
        className="relative block w-full h-[250px] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-nutri-dark dark:focus-visible:ring-nutri-light focus-visible:ring-offset-2 focus-visible:ring-offset-friendlyWhite dark:focus-visible:ring-offset-nightNutri rounded-2xl"
      >
        <div
          className={`relative w-full h-full ${sugerir ? 'amague-giro' : ''}`}
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)',
            transform: shown ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Frente: el día a día */}
          <div
            className="absolute inset-0 rounded-2xl border border-neutral-light dark:border-white/10 bg-white dark:bg-nightNutri-card shadow-sm dark:shadow-black/30 p-6 flex flex-col justify-between"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="w-11 h-11 rounded-xl bg-neutral-light dark:bg-white/10 flex items-center justify-center">
                <ion-icon name={flip.frontIcon} style={{ fontSize: '22px' }} className="text-neutral-dark dark:text-white/75" aria-hidden="true" />
              </div>
              <span className="font-sans inline-flex items-center gap-1.5 rounded-full bg-nutri-lightest dark:bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-nutri-dark dark:text-nutri-light">
                <ion-icon name="sync-outline" style={{ fontSize: '13px' }} className="giro-lento" aria-hidden="true" />
                {puedeHover ? 'pasá el mouse' : 'tocá la tarjeta'}
              </span>
            </div>
            <p className="font-sans text-base sm:text-lg font-semibold text-neutral-darkest dark:text-white leading-snug">{flip.front}</p>
          </div>

          {/* Dorso: cómo queda */}
          <div
            className="absolute inset-0 rounded-2xl bg-nutri-dark shadow-md p-6 flex flex-col justify-between text-white"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
              <ion-icon name="checkmark-circle-outline" style={{ fontSize: '24px', color: '#FCFCFC' }} aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-sans text-lg font-semibold leading-snug mb-2 text-white">{flip.backTitle}</h3>
              <p className="font-sans text-sm text-white/95 leading-relaxed">{flip.back}</p>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

/* ──────────────────────────────────────────────────────────────
   2. Los módulos de la plataforma
   ────────────────────────────────────────────────────────────── */
interface ModuleCard {
  icon: string;
  title: string;
  desc: string;
}

const MODULES: ModuleCard[] = [
  {
    icon: 'calendar-outline',
    title: 'Agenda y turnos',
    desc: 'Tu calendario con tipos de consulta, bloqueos y lista de espera. El paciente pide el turno desde la app, en los horarios que habilitaste, y vos confirmás. El recordatorio sale solo.',
  },
  {
    icon: 'people-outline',
    title: 'Pacientes',
    desc: 'La ficha maestra de cada persona: datos, contacto, mutualista, consentimientos y documentos. Buscás por nombre y está todo ahí, sin revolver carpetas.',
  },
  {
    icon: 'folder-open-outline',
    title: 'Historia clínica',
    desc: 'Anamnesis, antecedentes, notas de evolución y diagnóstico nutricional. Cada nota queda guardada y fechada, así tu registro respalda lo que decidiste.',
  },
  {
    icon: 'body-outline',
    title: 'Antropometría',
    desc: 'Peso, talla, pliegues y bioimpedancia en series históricas, con los indicadores calculados. La evolución se ve en un gráfico, no en una planilla.',
  },
  {
    icon: 'restaurant-outline',
    title: 'Plan nutricional',
    desc: 'Constructor de planes con cálculo de requerimientos, versiones guardadas y exportación a PDF. Cada plan referencia el diagnóstico que le dio origen.',
  },
  {
    icon: 'trending-up-outline',
    title: 'Seguimiento y adherencia',
    desc: 'Compara lo indicado con lo que pasó de verdad, te avisa cuando un paciente se está alejando y te propone cuándo conviene citarlo de nuevo.',
  },
  {
    icon: 'chatbubbles-outline',
    title: 'Comunicación',
    desc: 'Mensajería con tus pacientes y plantillas para lo que escribís siempre. Tu vida personal deja de compartir bandeja con tu consultorio.',
  },
  {
    icon: 'card-outline',
    title: 'Facturación y pagos',
    desc: 'Cada consulta cerrada genera su cargo, con cobros online y mutualistas. Sabés quién pagó y quién no sin sentarte a sumar a fin de mes.',
  },
  {
    icon: 'bar-chart-outline',
    title: 'Reportes',
    desc: 'Retención, ingresos, adherencia promedio y cuán llena está tu agenda. Números claros para decidir cómo crece tu práctica.',
  },
];

const ModuleTile: React.FC<{ item: ModuleCard; index: number }> = ({ item, index }) => {
  const { ref } = useScrollAnimation({ animation: 'fade-up', delay: (index % 3) * 100, threshold: 0.1 });
  return (
    <div
      ref={ref}
      className="group bg-white dark:bg-nightNutri-card rounded-3xl p-7 shadow-sm dark:shadow-black/30 hover:shadow-lg border border-neutral-100 dark:border-white/10 hover:border-nutri-light/50 transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-2xl bg-nutri-light/20 flex items-center justify-center mb-5 group-hover:bg-nutri-light/35 transition-colors duration-300">
        <ion-icon name={item.icon} style={{ fontSize: '24px' }} className="text-nutri-dark dark:text-nutri-light" aria-hidden="true" title={item.title} />
      </div>
      <h3 className="font-sans text-lg font-semibold text-neutral-darkest dark:text-white mb-2.5">{item.title}</h3>
      <p className="font-sans text-sm text-neutral dark:text-white/65 leading-relaxed">{item.desc}</p>
    </div>
  );
};

/* ──────────────────────────────────────────────────────────────
   3. El puente con la app que usan tus pacientes
   ────────────────────────────────────────────────────────────── */
const BRIDGE = [
  {
    icon: 'clipboard-outline',
    title: 'Cargás la restricción una vez',
    desc: 'La alergia, la patología o el objetivo que definís en la consulta queda en la ficha y viaja a la app del paciente vinculado.',
  },
  {
    icon: 'scan-outline',
    title: 'El paciente la lleva al súper',
    desc: 'Cuando escanea un producto, la app le responde con tu criterio: apto, precaución o no apto, y le explica por qué.',
  },
  {
    icon: 'stats-chart-outline',
    title: 'Vuelve como información útil',
    desc: 'Si él lo habilita, sus compras confirmadas se resumen y se comparan con el plan. Llegás a la consulta sabiendo qué pasó.',
  },
];

const BridgeCard: React.FC<{ item: typeof BRIDGE[0]; index: number }> = ({ item, index }) => {
  const { ref } = useScrollAnimation({ animation: 'fade-up', delay: index * 120, threshold: 0.1 });
  return (
    <div
      ref={ref}
      className="group bg-white dark:bg-nightNutri-card rounded-3xl p-7 shadow-sm dark:shadow-black/30 hover:shadow-lg border border-neutral-100 dark:border-white/10 hover:border-nutri-light/50 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-nutri-light/20 flex items-center justify-center group-hover:bg-nutri-light/35 transition-colors duration-300">
          <ion-icon name={item.icon} style={{ fontSize: '24px' }} className="text-nutri-dark dark:text-nutri-light" aria-hidden="true" title={item.title} />
        </div>
        <span className="font-sans text-xs font-bold text-nutri-dark/60 dark:text-nutri-light/70">{`0${index + 1}`}</span>
      </div>
      <h3 className="font-sans text-lg font-semibold text-neutral-darkest dark:text-white mb-2.5">{item.title}</h3>
      <p className="font-sans text-sm text-neutral dark:text-white/65 leading-relaxed">{item.desc}</p>
    </div>
  );
};

/* ──────────────────────────────────────────────────────────────
   4. Cómo empezás
   ────────────────────────────────────────────────────────────── */
const STEPS = [
  { n: '1', title: 'Creás tu cuenta', desc: 'Tu perfil profesional, tus tipos de consulta y tus horarios. En una tarde estás pronta para atender.' },
  { n: '2', title: 'Traés tus pacientes', desc: 'Cargás las fichas que ya tenés y seguís desde donde estabas, sin empezar de cero con nadie.' },
  { n: '3', title: 'Invitás a tus pacientes', desc: 'Le pasás a cada uno su código, lo acepta desde la app y queda vinculado a tu agenda y a tu criterio.' },
];

const StepCard: React.FC<{ step: typeof STEPS[0]; index: number }> = ({ step, index }) => {
  const { ref } = useScrollAnimation({ animation: 'fade-up', delay: index * 120, threshold: 0.1 });
  return (
    <div ref={ref} className="bg-white dark:bg-nightNutri-card rounded-3xl p-8 border border-neutral-100 dark:border-white/10 shadow-sm text-center">
      <div className="w-12 h-12 rounded-full bg-nutri-dark dark:bg-nutri-light text-white dark:text-nightNutri-deep font-sans font-bold text-lg flex items-center justify-center mx-auto mb-5">
        {step.n}
      </div>
      <h3 className="font-sans text-lg font-semibold text-neutral-darkest dark:text-white mb-2.5">{step.title}</h3>
      <p className="font-sans text-sm text-neutral dark:text-white/65 leading-relaxed">{step.desc}</p>
    </div>
  );
};

/* ──────────────────────────────────────────────────────────────
   Página
   ────────────────────────────────────────────────────────────── */
const NutritionistsPage: React.FC = () => {
  const { ref: heroTextRef } = useScrollAnimation({ animation: 'fade-right', threshold: 0.1 });
  const { ref: heroImgRef } = useScrollAnimation({ animation: 'fade-left', delay: 120, threshold: 0.1 });
  const { ref: painTitleRef } = useScrollAnimation({ animation: 'fade-up', threshold: 0.15 });
  const { ref: painClosingRef } = useScrollAnimation({ animation: 'fade-up', delay: 120, threshold: 0.15 });
  const { ref: modulesTitleRef } = useScrollAnimation({ animation: 'fade-up', threshold: 0.15 });
  const { ref: quoteRef } = useScrollAnimation({ animation: 'fade-up', threshold: 0.15 });
  const { ref: bridgeTitleRef } = useScrollAnimation({ animation: 'fade-up', threshold: 0.15 });
  const { ref: privacyRef } = useScrollAnimation({ animation: 'fade-up', delay: 150, threshold: 0.15 });
  const { ref: stepsTitleRef } = useScrollAnimation({ animation: 'fade-up', threshold: 0.15 });
  const { ref: ctaRef } = useScrollAnimation({ animation: 'fade-up', threshold: 0.15 });
  const [openFlip, setOpenFlip] = useState<number | null>(null);
  const puedeHover = useCanHover();

  return (
    <div className="relative bg-friendlyWhite dark:bg-nightNutri text-neutral-dark dark:text-white/75 overflow-hidden">

      {/* ── Fondo continuo ── */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#E3F2EF] via-friendlyWhite to-white dark:from-nightNutri-soft dark:via-nightNutri dark:to-nightNutri-deep" />
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05] text-nutri dark:text-nutri-light"
          style={{
            backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
        <div className="absolute -top-28 right-[-120px] w-96 h-96 rounded-full bg-nutri-light/20 dark:bg-nutri/15 blur-3xl" />
        <div className="absolute top-[45%] left-[-160px] w-80 h-80 rounded-full bg-nutri-lightest/70 dark:bg-nutri-dark/30 blur-3xl" />
      </div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-36 sm:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:grid md:grid-cols-5 md:gap-12 md:items-center">

            <div ref={heroTextRef} className="md:col-span-3 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-darkest dark:text-white tracking-tight leading-tight mb-6">
                Menos planillas, <br className="hidden sm:block" />
                <span className="text-nutri-dark dark:text-nutri-light">más consulta</span>
              </h1>
              <p className="font-sans text-lg md:text-xl text-neutral-dark dark:text-white/75 leading-relaxed max-w-2xl mx-auto md:mx-0 mb-8">
                Estudiaste para acompañar personas, no para pelearte con una planilla. Tu agenda, tus fichas y tus planes, en un solo lugar.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                <button
                  type="button"
                  onClick={() => document.getElementById('modulos')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 bg-nutri-dark dark:bg-nutri-light text-white dark:text-nightNutri-deep font-sans font-semibold text-sm px-6 py-3 rounded-xl hover:bg-nutri dark:hover:bg-nutri-light/85 hover:scale-105 transition-all duration-200 shadow-sm"
                >
                  Ver cómo funciona
                  <ion-icon name="arrow-down-outline" style={{ fontSize: '16px' }} />
                </button>
                <a
                  href={GMAIL_COMPOSE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-nutri-dark/25 dark:border-nutri-light/40 text-nutri-dark dark:text-nutri-light font-sans font-semibold text-sm px-6 py-3 rounded-xl hover:bg-nutri-lightest dark:hover:bg-white/5 hover:scale-105 transition-all duration-200"
                >
                  Quiero probarla
                  <ion-icon name="mail-outline" style={{ fontSize: '16px' }} />
                </a>
              </div>
            </div>

            <div ref={heroImgRef} className="md:col-span-2 mt-14 md:mt-0 flex justify-center md:justify-end">
              <div className="relative flex items-center justify-center w-72 h-72 sm:w-80 sm:h-80">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-nutri-light/30 via-[#cfe9e4]/50 to-nutri-lightest/40 dark:from-nutri/25 dark:via-nutri-dark/30 dark:to-nutri-dark/20 blur-2xl" />
                <div className="absolute inset-4 rounded-full border border-nutri-light/35 border-dashed" />
                <div className="absolute top-3 right-10 w-3 h-3 rounded-full bg-nutri-light/50" />
                <div className="absolute bottom-6 left-8 w-2 h-2 rounded-full bg-nutri/40" />
                <div className="absolute top-1/2 right-2 w-2 h-2 rounded-full bg-nutri-light/60" />
                <img
                  src={paltaNutri}
                  alt="La palta nutricionista de Vokkado"
                  className="relative z-10 w-60 sm:w-72 drop-shadow-[0_20px_40px_rgba(12,75,69,0.20)] dark:drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── El día a día del consultorio ── */}
      <section className="relative py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={painTitleRef} className="text-center mb-12 sm:mb-14 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-darkest dark:text-white leading-tight">
              Esto también es <span className="text-nutri-dark dark:text-nutri-light">trabajo</span>
            </h2>
            <p className="font-sans mt-5 text-lg text-neutral-dark dark:text-white/75 max-w-2xl mx-auto">
              Todo lo que pasa alrededor de la consulta, coordinar, buscar, recalcular, recordar, se lleva horas que no se cobran. Girá cada tarjeta y mirá cómo queda cuando lo resolvés una sola vez.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto mb-14">
            {FLIPS.map((flip, i) => (
              <FlipTile
                key={flip.backTitle}
                flip={flip}
                delay={(i % 3) * 100}
                isOpen={openFlip === i}
                onToggle={() => setOpenFlip(prev => (prev === i ? null : i))}
                sugerir={!puedeHover && i === 0 && openFlip === null}
              />
            ))}
          </div>

          <div ref={painClosingRef} className="text-center max-w-2xl mx-auto">
            <p className="font-sans text-xl sm:text-2xl text-neutral-darkest dark:text-white font-medium leading-relaxed">
              Tu criterio profesional no lo reemplaza ningún software.{' '}
              <span className="text-nutri-dark dark:text-nutri-light font-bold">
                Lo que sí podemos sacarte de encima es todo lo que te distrae de ejercerlo.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ── Módulos ── */}
      <section id="modulos" className="relative py-16 sm:py-20 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div ref={modulesTitleRef} className="text-center mb-14 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-darkest dark:text-white leading-tight">
              Todo tu consultorio, <span className="text-nutri-dark dark:text-nutri-light">en un lugar</span>
            </h2>
            <p className="font-sans mt-5 text-lg text-neutral-dark dark:text-white/75 max-w-2xl mx-auto">
              Cada módulo resuelve una parte de tu semana y conversa con los demás, así no cargás el mismo dato dos veces.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODULES.map((m, i) => (
              <ModuleTile key={m.title} item={m} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Bloque oscuro: qué nos hace distintos ── */}
      <section className="relative py-20 sm:py-28 overflow-hidden bg-nutri-dark">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }}
        />
        <div ref={quoteRef} className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center relative">
          <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug">
            Tu paciente elige solo,
            <span className="text-nutri-light"> parado en la góndola, </span>
            con el producto en la mano
          </blockquote>
          <p className="font-sans mt-8 text-white/80 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            En ese momento no te puede llamar, y ahí es donde el plan se cumple o se cae. Con Vokkado llegás hasta ahí: tu paciente escanea el producto y la app le responde con lo que definiste en la consulta.
          </p>
        </div>
      </section>

      {/* ── El puente con la app del paciente ── */}
      <section className="relative py-20 sm:py-24 bg-[#EDF6F4] dark:bg-nightNutri-soft border-b border-nutri-light/30 dark:border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div ref={bridgeTitleRef} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-darkest dark:text-white leading-tight">
              Tu criterio, <span className="text-nutri-dark dark:text-nutri-light">también fuera del consultorio</span>
            </h2>
            <p className="font-sans mt-5 text-lg text-neutral-dark dark:text-white/75 max-w-2xl mx-auto">
              Lo que definís en la consulta no se queda en la ficha, acompaña a tu paciente en cada compra.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {BRIDGE.map((b, i) => (
              <BridgeCard key={b.title} item={b} index={i} />
            ))}
          </div>

          <div
            ref={privacyRef}
            className="bg-white dark:bg-nightNutri-card rounded-3xl border border-nutri-light/40 dark:border-white/10 shadow-sm dark:shadow-black/30 p-8 sm:p-10 flex flex-col sm:flex-row items-start gap-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-nutri-light/20 flex items-center justify-center flex-shrink-0">
              <ion-icon name="lock-closed-outline" style={{ fontSize: '26px' }} className="text-nutri-dark dark:text-nutri-light" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-sans text-lg font-semibold text-neutral-darkest dark:text-white mb-3">Acompañar no es vigilar</h3>
              <p className="font-sans text-sm sm:text-base text-neutral dark:text-white/65 leading-relaxed">
                El paciente decide qué comparte y puede dejar de compartirlo cuando quiera. Vos ves un resumen de sus compras confirmadas, nunca sus escaneos sueltos ni lo que anduvo mirando. Esa frontera es la que hace que el paciente se anime a compartir, y es lo que vuelve el dato confiable para vos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Cómo empezás ── */}
      <section className="relative py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div ref={stepsTitleRef} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-darkest dark:text-white">Cómo empezás</h2>
            <p className="font-sans mt-4 text-neutral dark:text-white/65 max-w-2xl mx-auto">
              Sin migraciones eternas ni capacitaciones de una semana.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((s, i) => (
              <StepCard key={s.n} step={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA exclusivo ── */}
      <section className="relative py-20 sm:py-24 bg-[#E3F2EF] dark:bg-nightNutri-soft border-t border-nutri-light/30 dark:border-white/10">
        <div ref={ctaRef} className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-darkest dark:text-white mb-5 leading-tight">
            Estamos armando esto <span className="text-nutri-dark dark:text-nutri-light">con nutricionistas</span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-dark dark:text-white/75 leading-relaxed mb-9">
            Si atendés en consultorio y querés entrar al grupo que la está probando, escribinos. Nos interesa tu forma de trabajar antes que tu firma, porque lo que nos cuentes se convierte en lo próximo que construimos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={GMAIL_COMPOSE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-nutri-dark dark:bg-nutri-light text-white dark:text-nightNutri-deep font-sans font-semibold text-sm px-7 py-3.5 rounded-xl hover:bg-nutri dark:hover:bg-nutri-light/85 hover:scale-105 transition-all duration-200 shadow-sm"
            >
              Sumarme desde Gmail
              <ion-icon name="arrow-forward-outline" style={{ fontSize: '16px' }} />
            </a>
            <a
              href={MAILTO}
              className="inline-flex items-center justify-center gap-2 border border-nutri-dark/25 dark:border-nutri-light/40 text-nutri-dark dark:text-nutri-light font-sans font-semibold text-sm px-7 py-3.5 rounded-xl hover:bg-white dark:hover:bg-white/5 hover:scale-105 transition-all duration-200"
            >
              Escribir a {EMAIL}
              <ion-icon name="mail-outline" style={{ fontSize: '16px' }} />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default NutritionistsPage;
