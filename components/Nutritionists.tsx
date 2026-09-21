import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import paltaNutri from '../images/nutri/palta-nutricionista.png';
import wordmark from '../images/nutri/vokkado-nutri-wordmark.png';

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

const FlipTile: React.FC<{ flip: Flip; delay: number }> = ({ flip, delay }) => {
  const anim = useScrollAnimation({ animation: 'fade-up', delay, threshold: 0.15 });
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const shown = flipped || hovered;

  return (
    <div ref={anim.ref} style={{ perspective: '1200px' }}>
      <button
        type="button"
        onClick={() => setFlipped(f => !f)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-pressed={shown}
        aria-label={`${flip.backTitle}: ${flip.back}`}
        className="relative block w-full h-[250px] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark focus-visible:ring-offset-2 rounded-2xl"
      >
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)',
            transform: shown ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Frente: el día a día */}
          <div
            className="absolute inset-0 rounded-2xl border border-neutral-light bg-white shadow-sm p-6 flex flex-col justify-between"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          >
            <div className="w-11 h-11 rounded-xl bg-neutral-light flex items-center justify-center">
              <ion-icon name={flip.frontIcon} style={{ fontSize: '22px', color: '#374151' }} aria-hidden="true" />
            </div>
            <p className="font-sans text-base sm:text-lg font-semibold text-neutral-darkest leading-snug">{flip.front}</p>
            <span className="font-sans inline-flex items-center gap-1.5 text-xs font-semibold text-primary-dark">
              <ion-icon name="sync-outline" style={{ fontSize: '15px' }} aria-hidden="true" />
              girá para la respuesta
            </span>
          </div>

          {/* Dorso: cómo queda */}
          <div
            className="absolute inset-0 rounded-2xl bg-primary-dark shadow-md p-6 flex flex-col justify-between text-white"
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
      className="group bg-white rounded-3xl p-7 shadow-sm hover:shadow-lg border border-neutral-100 hover:border-primary-light/40 transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-2xl bg-primary-light/15 flex items-center justify-center mb-5 group-hover:bg-primary-light/30 transition-colors duration-300">
        <ion-icon name={item.icon} style={{ fontSize: '24px', color: '#22521D' }} aria-hidden="true" title={item.title} />
      </div>
      <h3 className="font-sans text-lg font-semibold text-neutral-darkest mb-2.5">{item.title}</h3>
      <p className="font-sans text-sm text-neutral-DEFAULT leading-relaxed">{item.desc}</p>
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
      className="group bg-white rounded-3xl p-7 shadow-sm hover:shadow-lg border border-neutral-100 hover:border-primary-light/40 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-primary-light/15 flex items-center justify-center group-hover:bg-primary-light/30 transition-colors duration-300">
          <ion-icon name={item.icon} style={{ fontSize: '24px', color: '#22521D' }} aria-hidden="true" title={item.title} />
        </div>
        <span className="font-sans text-xs font-bold text-primary-dark/60">{`0${index + 1}`}</span>
      </div>
      <h3 className="font-sans text-lg font-semibold text-neutral-darkest mb-2.5">{item.title}</h3>
      <p className="font-sans text-sm text-neutral-DEFAULT leading-relaxed">{item.desc}</p>
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
    <div ref={ref} className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-sm text-center">
      <div className="w-12 h-12 rounded-full bg-primary-dark text-white font-sans font-bold text-lg flex items-center justify-center mx-auto mb-5">
        {step.n}
      </div>
      <h3 className="font-sans text-lg font-semibold text-neutral-darkest mb-2.5">{step.title}</h3>
      <p className="font-sans text-sm text-neutral-DEFAULT leading-relaxed">{step.desc}</p>
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
        <div className="absolute top-[45%] left-[-160px] w-80 h-80 rounded-full bg-primary-lightest/60 blur-3xl" />
      </div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:grid md:grid-cols-5 md:gap-12 md:items-center">

            <div ref={heroTextRef} className="md:col-span-3 text-center md:text-left">
              <img
                src={wordmark}
                alt="Vokkado nutri"
                className="h-9 sm:h-11 w-auto mb-7 mx-auto md:mx-0"
              />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-darkest tracking-tight leading-tight mb-6">
                Menos planillas, <br className="hidden sm:block" />
                <span className="text-primary-dark">más consulta</span>
              </h1>
              <p className="font-sans text-lg md:text-xl text-neutral-dark leading-relaxed max-w-2xl mx-auto md:mx-0 mb-8">
                Estudiaste para acompañar personas, no para pelearte con una planilla. Tu agenda, tus fichas y tus planes, en un solo lugar.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                <button
                  type="button"
                  onClick={() => document.getElementById('modulos')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 bg-primary-dark text-white font-sans font-semibold text-sm px-6 py-3 rounded-xl hover:bg-primary-DEFAULT hover:scale-105 transition-all duration-200 shadow-sm"
                >
                  Ver cómo funciona
                  <ion-icon name="arrow-down-outline" style={{ fontSize: '16px' }} />
                </button>
                <a
                  href={GMAIL_COMPOSE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-primary-dark/25 text-primary-dark font-sans font-semibold text-sm px-6 py-3 rounded-xl hover:bg-primary-lightest hover:scale-105 transition-all duration-200"
                >
                  Quiero probarla
                  <ion-icon name="mail-outline" style={{ fontSize: '16px' }} />
                </a>
              </div>
            </div>

            <div ref={heroImgRef} className="md:col-span-2 mt-14 md:mt-0 flex justify-center md:justify-end">
              <div className="relative flex items-center justify-center w-72 h-72 sm:w-80 sm:h-80">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-light/30 via-[#d6eabf]/40 to-primary-lightest/20 blur-2xl" />
                <div className="absolute inset-4 rounded-full border border-primary-light/25 border-dashed" />
                <div className="absolute top-3 right-10 w-3 h-3 rounded-full bg-primary-light/50" />
                <div className="absolute bottom-6 left-8 w-2 h-2 rounded-full bg-primary-DEFAULT/40" />
                <div className="absolute top-1/2 right-2 w-2 h-2 rounded-full bg-primary-light/60" />
                <img
                  src={paltaNutri}
                  alt="La palta nutricionista de Vokkado"
                  className="relative z-10 w-60 sm:w-72 drop-shadow-[0_20px_40px_rgba(34,82,29,0.18)]"
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-darkest leading-tight">
              Esto también es <span className="text-primary-dark">trabajo</span>
            </h2>
            <p className="font-sans mt-5 text-lg text-neutral-dark max-w-2xl mx-auto">
              Todo lo que pasa alrededor de la consulta, coordinar, buscar, recalcular, recordar, se lleva horas que no se cobran. Girá cada tarjeta y mirá cómo queda cuando lo resolvés una sola vez.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto mb-14">
            {FLIPS.map((flip, i) => (
              <FlipTile key={flip.backTitle} flip={flip} delay={(i % 3) * 100} />
            ))}
          </div>

          <div ref={painClosingRef} className="text-center max-w-2xl mx-auto">
            <p className="font-sans text-xl sm:text-2xl text-neutral-darkest font-medium leading-relaxed">
              Tu criterio profesional no lo reemplaza ningún software.{' '}
              <span className="text-primary-dark font-bold">
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-darkest leading-tight">
              Todo tu consultorio, <span className="text-primary-dark">en un lugar</span>
            </h2>
            <p className="font-sans mt-5 text-lg text-neutral-dark max-w-2xl mx-auto">
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
      <section className="relative py-20 sm:py-28 overflow-hidden bg-primary-dark">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }}
        />
        <div ref={quoteRef} className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center relative">
          <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug">
            Tu paciente elige solo,
            <span className="text-primary-light"> parado en la góndola, </span>
            con el producto en la mano
          </blockquote>
          <p className="font-sans mt-8 text-white/80 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            En ese momento no te puede llamar, y ahí es donde el plan se cumple o se cae. Con Vokkado llegás hasta ahí: tu paciente escanea el producto y la app le responde con lo que definiste en la consulta.
          </p>
        </div>
      </section>

      {/* ── El puente con la app ── */}
      <section className="relative py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div ref={bridgeTitleRef} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-darkest leading-tight">
              Tu criterio, <span className="text-primary-dark">también fuera del consultorio</span>
            </h2>
            <p className="font-sans mt-5 text-lg text-neutral-dark max-w-2xl mx-auto">
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
            className="bg-white rounded-3xl border border-primary-light/30 shadow-sm p-8 sm:p-10 flex flex-col sm:flex-row items-start gap-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary-light/15 flex items-center justify-center flex-shrink-0">
              <ion-icon name="lock-closed-outline" style={{ fontSize: '26px', color: '#22521D' }} aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-sans text-lg font-semibold text-neutral-darkest mb-3">Acompañar no es vigilar</h3>
              <p className="font-sans text-sm sm:text-base text-neutral-DEFAULT leading-relaxed">
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
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-darkest">Cómo empezás</h2>
            <p className="font-sans mt-4 text-neutral-DEFAULT max-w-2xl mx-auto">
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
      <section className="relative py-20 sm:py-24 bg-[#f4f8ec] border-t border-primary-light/20">
        <div ref={ctaRef} className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-darkest mb-5 leading-tight">
            Estamos armando esto <span className="text-primary-dark">con nutricionistas</span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-dark leading-relaxed mb-9">
            Si atendés en consultorio y querés entrar al grupo que la está probando, escribinos. Nos interesa tu forma de trabajar antes que tu firma, porque lo que nos cuentes se convierte en lo próximo que construimos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={GMAIL_COMPOSE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary-dark text-white font-sans font-semibold text-sm px-7 py-3.5 rounded-xl hover:bg-primary-DEFAULT hover:scale-105 transition-all duration-200 shadow-sm"
            >
              Sumarme desde Gmail
              <ion-icon name="arrow-forward-outline" style={{ fontSize: '16px' }} />
            </a>
            <a
              href={MAILTO}
              className="inline-flex items-center justify-center gap-2 border border-primary-dark/25 text-primary-dark font-sans font-semibold text-sm px-7 py-3.5 rounded-xl hover:bg-white hover:scale-105 transition-all duration-200"
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
