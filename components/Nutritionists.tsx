import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import IPhoneMockup from './common/IPhoneMockup';
import paltaNutri from '../images/nutri/palta-nutricionista.png';
import capturaAnalisis from '../images/gallery/5alfajor.png';

const EMAIL = 'contact@vokkado.com';
const SUBJECT = 'Quiero sumarme a Vokkado para nutricionistas';
const GMAIL_COMPOSE = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent(SUBJECT)}`;
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}`;

/* ──────────────────────────────────────────────────────────────
   1. Frases de consultorio: en primera persona, para que la
      nutricionista se reconozca. Marca la que le pasa y ve
      cómo queda resuelta.
   ────────────────────────────────────────────────────────────── */
interface Frase {
  dicho: string;
  respuesta: string;
}

const FRASES: Frase[] = [
  {
    dicho: 'Me escriben a las once de la noche para cambiar la hora.',
    respuesta: 'Tus pacientes piden hora desde la app, solo en los horarios que habilitaste. El recordatorio sale solo.',
  },
  {
    dicho: 'Tengo la ficha de hace ocho meses repartida entre un cuaderno, un Excel y tres audios de WhatsApp.',
    respuesta: 'Anamnesis, antecedentes y la evolución de cada consulta en una sola ficha, guardada y fechada.',
  },
  {
    dicho: 'Me quedo un domingo de noche armando un plan desde cero en el Word.',
    respuesta: 'El plan parte del diagnóstico que cargaste, calcula requerimientos y sale en PDF con tu nombre.',
  },
  {
    dicho: 'En cada control paso peso, talla y pliegues a una planilla para ver si algo cambió.',
    respuesta: 'Cargás la medición una vez, los indicadores se calculan y la curva se dibuja sola.',
  },
  {
    dicho: 'Vuelve a las tres semanas y lo que comió es lo que se acuerda.',
    respuesta: 'Si el paciente lo habilita, ves qué compró desde la última consulta y cuánto quedó marcado como no apto o con precaución.',
  },
  {
    dicho: 'Un sábado de tarde me llega la foto de una etiqueta desde el súper: ¿esto puedo comer? ¿es mejor este producto o este?',
    respuesta: 'Con la app escanea y sabe al toque si le sirve. Y si lo habilita, vos después ves qué terminó comprando.',
  },
];

interface FraseRowProps {
  frase: Frase;
  index: number;
  marcada: boolean;
  onToggle: () => void;
}

const FraseRow: React.FC<FraseRowProps> = ({ frase, index, marcada, onToggle }) => {
  const { ref } = useScrollAnimation<HTMLLIElement>({ animation: 'fade-up', delay: index * 70, threshold: 0.1 });
  return (
    <li ref={ref} className="border-t border-nutri-dark/15 dark:border-white/10 last:border-b">
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={marcada}
        className="group w-full grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] gap-x-4 sm:gap-x-8 gap-y-4 items-start py-6 sm:py-8 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-nutri-dark dark:focus-visible:ring-nutri-light rounded-lg"
      >
        {/* Número */}
        <span
          className={`font-sans text-xs font-bold tabular-nums pt-2 transition-colors duration-300 ${
            marcada ? 'text-nutri-dark dark:text-nutri-light' : 'text-neutral-medium dark:text-white/35'
          }`}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* La frase y, si la marcó, la respuesta */}
        <div className="min-w-0">
          <p
            className={`font-display text-xl sm:text-2xl lg:text-[1.75rem] leading-snug text-balance transition-colors duration-300 ${
              marcada
                ? 'text-neutral-darkest dark:text-white'
                : 'text-neutral-dark/80 dark:text-white/60 group-hover:text-neutral-darkest dark:group-hover:text-white'
            }`}
          >
            “{frase.dicho}”
          </p>
          <div
            className="grid transition-[grid-template-rows] duration-500 ease-out"
            style={{ gridTemplateRows: marcada ? '1fr' : '0fr' }}
            aria-hidden={!marcada}
          >
            <div className="overflow-hidden">
              <p
                className={`flex items-start gap-3 pt-4 sm:pt-5 font-sans text-sm sm:text-base leading-relaxed text-neutral-dark dark:text-white/75 transition-opacity duration-500 ${
                  marcada ? 'opacity-100 delay-150' : 'opacity-0'
                }`}
              >
                <span className="mt-0.5 w-6 h-6 rounded-full bg-nutri-dark dark:bg-nutri-light text-white dark:text-nightNutri-deep flex items-center justify-center shrink-0">
                  <ion-icon name="checkmark-outline" style={{ fontSize: '15px' }} aria-hidden="true" />
                </span>
                <span>{frase.respuesta}</span>
              </p>
            </div>
          </div>
        </div>

        {/* "Me pasa": en celular baja a la segunda fila, debajo de la frase */}
        <span
          className={`col-start-2 sm:col-start-3 justify-self-start sm:justify-self-end sm:mt-1 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-sans text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
            marcada
              ? 'border-nutri-dark bg-nutri-dark text-white dark:border-nutri-light dark:bg-nutri-light dark:text-nightNutri-deep'
              : 'border-neutral-medium/50 text-neutral-dark dark:border-white/25 dark:text-white/70 group-hover:border-nutri-dark group-hover:text-nutri-dark dark:group-hover:border-nutri-light dark:group-hover:text-nutri-light'
          }`}
        >
          <span
            className={`w-3.5 h-3.5 rounded-full border-[1.5px] flex items-center justify-center transition-colors duration-300 ${
              marcada ? 'border-white/80 dark:border-nightNutri-deep/70' : 'border-current'
            }`}
            aria-hidden="true"
          >
            {marcada && <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-nightNutri-deep" />}
          </span>
          Me pasa
        </span>
      </button>
    </li>
  );
};

const FrasesDeConsultorio: React.FC = () => {
  const [marcadas, setMarcadas] = useState<Set<number>>(() => new Set());
  const cuantas = marcadas.size;

  const toggle = (i: number) =>
    setMarcadas(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const balance =
    cuantas === 0
      ? 'Marcá las que te pasan.'
      : cuantas === 1
        ? 'Te pasa una. Con una ya vale la pena seguir leyendo.'
        : cuantas < FRASES.length
          ? `Te pasan ${cuantas} de ${FRASES.length}. Cada una es tiempo que hoy no se cobra.`
          : 'Te pasan todas. Esta página la hicimos pensando en vos.';

  return (
    <div className="max-w-4xl mx-auto">
      <ul>
        {FRASES.map((f, i) => (
          <FraseRow key={f.dicho} frase={f} index={i} marcada={marcadas.has(i)} onToggle={() => toggle(i)} />
        ))}
      </ul>
      <p
        aria-live="polite"
        className={`mt-6 font-sans text-sm sm:text-base transition-colors duration-300 ${
          cuantas === 0 ? 'text-neutral dark:text-white/50' : 'text-nutri-dark dark:text-nutri-light font-medium'
        }`}
      >
        {balance}
      </p>
    </div>
  );
};

/* ──────────────────────────────────────────────────────────────
   2. Los módulos, mostrados como el menú de la plataforma:
      la barra lateral a la izquierda, el detalle a la derecha.
   ────────────────────────────────────────────────────────────── */
interface Modulo {
  icon: string;
  title: string;
  desc: string;
  puntos: string[];
  /* Vive adentro de la ficha del paciente, no es una entrada propia del menú. */
  dentroDePacientes?: boolean;
  /* Está en el menú de la plataforma pero todavía no se puede abrir. */
  pronto?: boolean;
}

const MODULES: Modulo[] = [
  {
    icon: 'home-outline',
    title: 'Inicio',
    desc: 'Tu día de un vistazo: la agenda de hoy y un panel que te avisa qué necesita atención, como turnos sin confirmar, controles vencidos o pacientes que faltaron y no reagendaron.',
    puntos: ['Agenda de hoy', 'Turnos sin confirmar', 'Controles vencidos'],
  },
  {
    icon: 'people-outline',
    title: 'Pacientes',
    desc: 'La ficha de cada persona: datos, contacto, mutualista, consentimientos, documentos y contactos de emergencia. Buscás por nombre y está todo ahí. Desde la ficha también lo vinculás con la app.',
    puntos: ['Ficha y mutualista', 'Consentimientos', 'Documentos', 'Vínculo con la app'],
  },
  {
    icon: 'folder-open-outline',
    title: 'Historia clínica',
    dentroDePacientes: true,
    desc: 'Cada consulta en cuatro fases: evaluación, diagnóstico, intervención y monitoreo. El diagnóstico se escribe en formato PES y la consulta cerrada no se toca: si hay que corregir, queda una nota con fecha y autor.',
    puntos: ['Evaluación', 'Diagnóstico PES', 'Intervención', 'Monitoreo'],
  },
  {
    icon: 'body-outline',
    title: 'Antropometría',
    dentroDePacientes: true,
    desc: 'Peso, talla, perímetros, siete pliegues y bioimpedancia en series históricas, con IMC e índice cintura cadera calculados. La evolución del peso se ve en un gráfico, no en una planilla.',
    puntos: ['Peso, talla y perímetros', 'Siete pliegues', 'Bioimpedancia', 'Gráfico de evolución'],
  },
  {
    icon: 'restaurant-outline',
    title: 'Plan nutricional',
    dentroDePacientes: true,
    desc: 'La prescripción de cada consulta: cálculo de requerimientos con Mifflin o Harris Benedict, valor calórico total, macros, estructura de comidas y listas de intercambio con plantillas reutilizables. El constructor de planes con PDF viene después.',
    puntos: ['Requerimientos', 'Macros', 'Estructura de comidas', 'Intercambios'],
  },
  {
    icon: 'trending-up-outline',
    title: 'Seguimiento',
    dentroDePacientes: true,
    desc: 'En el monitoreo evaluás cada objetivo con su evidencia y, si el paciente comparte sus compras, ves cuánto de lo que compró quedó marcado como no apto o con precaución. Al cerrar con fecha de control, el próximo turno se agenda solo.',
    puntos: ['Objetivos con evidencia', 'Adherencia de compras', 'Próximo control automático'],
  },
  {
    icon: 'calendar-outline',
    title: 'Agenda',
    desc: 'Tus tipos de consulta, tu disponibilidad semanal, los bloqueos y la lista de espera. Dos turnos no se pueden pisar y reprogramar no borra el historial.',
    puntos: ['Tipos de consulta', 'Disponibilidad y bloqueos', 'Lista de espera'],
  },
  {
    icon: 'bar-chart-outline',
    title: 'Estadísticas',
    desc: 'Cuántas consultas hiciste, cuántos pacientes nuevos entraron, la tasa de asistencia y qué tipo de consulta pesa más, en 30 días, 90 días o el último año.',
    puntos: ['Consultas por mes', 'Asistencia', 'Pacientes nuevos'],
  },
  {
    icon: 'chatbubbles-outline',
    title: 'Mensajes',
    desc: 'Mensajería con tus pacientes desde la misma plataforma, para que tu vida personal deje de compartir bandeja con tu consultorio.',
    puntos: ['Mensajes con pacientes', 'Plantillas'],
    pronto: true,
  },
  {
    icon: 'card-outline',
    title: 'Facturación',
    desc: 'Cada consulta cerrada genera su cargo, con cobros online y mutualistas. Sabés quién pagó y quién no sin sentarte a sumar a fin de mes.',
    puntos: ['Cargo por consulta', 'Cobros online', 'Mutualistas'],
    pronto: true,
  },
  {
    icon: 'book-outline',
    title: 'Recursos',
    desc: 'Material para compartir con tus pacientes y plantillas para lo que escribís siempre, guardado en un solo lugar.',
    puntos: ['Material para pacientes', 'Plantillas'],
    pronto: true,
  },
];

const ExploradorDeModulos: React.FC = () => {
  const [activo, setActivo] = useState(0);
  const detalle = MODULES[activo];
  const { ref } = useScrollAnimation({ animation: 'fade-up', delay: 100, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className="rounded-3xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-nightNutri-card shadow-lg shadow-nutri-dark/5 dark:shadow-black/40 overflow-hidden"
    >
      {/* Barra de la ventana */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-neutral-100 dark:border-white/10 bg-neutral-50/80 dark:bg-white/[0.03]">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-white/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-white/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-white/20" />
        </span>
        <span className="font-sans text-xs text-neutral dark:text-white/45 truncate">Vokkado nutri · tu consultorio</span>
      </div>

      {/* En celular la barra lateral queda colapsada a solo íconos, como en
          cualquier app; de tablet para arriba muestra los nombres. */}
      {/* Altura fija: al cambiar de módulo la ventana no se agranda ni se achica. */}
      <div className="grid grid-cols-[3.75rem_1fr] md:grid-cols-[250px_1fr] lg:grid-cols-[280px_1fr] h-[540px] md:h-[500px]">
        <nav
          aria-label="Módulos de la plataforma"
          className="flex flex-col gap-0.5 md:gap-1 p-2 md:p-3 border-r border-neutral-100 dark:border-white/10 bg-neutral-50/50 dark:bg-white/[0.02] overflow-hidden"
        >
          {MODULES.map((mod, i) => {
            const es = i === activo;
            return (
              <button
                key={mod.title}
                type="button"
                onClick={() => setActivo(i)}
                onMouseEnter={() => setActivo(i)}
                aria-current={es ? 'true' : undefined}
                aria-label={mod.title}
                title={mod.title}
                className={`relative flex items-center justify-center md:justify-start gap-3 h-11 md:h-auto md:py-2 rounded-xl text-left font-sans text-sm whitespace-nowrap transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-nutri-dark dark:focus-visible:ring-nutri-light ${
                  mod.dentroDePacientes ? 'md:pl-8 md:pr-3.5' : 'md:px-3.5'
                } ${
                  es
                    ? 'bg-nutri-lightest dark:bg-white/10 text-nutri-dark dark:text-nutri-light font-semibold'
                    : 'text-neutral-dark dark:text-white/65 hover:bg-neutral-100 dark:hover:bg-white/5'
                }`}
              >
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full bg-nutri-dark dark:bg-nutri-light transition-opacity duration-200 ${
                    es ? 'opacity-100' : 'opacity-0'
                  }`}
                  aria-hidden="true"
                />
                <ion-icon name={mod.icon} style={{ fontSize: '20px' }} aria-hidden="true" className={mod.pronto ? 'opacity-60' : ''} />
                <span className={`hidden md:inline ${mod.pronto ? 'opacity-60' : ''}`}>{mod.title}</span>
                {mod.pronto && (
                  <span className="hidden md:inline ml-auto font-sans text-[10px] font-semibold uppercase tracking-wide text-neutral-medium dark:text-white/35">
                    Pronto
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Detalle del módulo elegido */}
        <div className="p-5 sm:p-8 md:p-10 lg:p-12 flex flex-col overflow-hidden">
          <div className="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-nutri-light/20 flex items-center justify-center mb-5 md:mb-8">
            <ion-icon name={detalle.icon} style={{ fontSize: '22px' }} className="text-nutri-dark dark:text-nutri-light" aria-hidden="true" />
          </div>

          <div key={detalle.title} className="texto-entra flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-3 md:mb-4">
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-neutral-darkest dark:text-white">{detalle.title}</h3>
              {detalle.pronto && (
                <span className="font-sans text-[11px] font-semibold px-2.5 py-1 rounded-full bg-neutral-light dark:bg-white/10 text-neutral-dark dark:text-white/60">
                  Próximamente
                </span>
              )}
            </div>
            <p className="font-sans text-sm sm:text-base md:text-lg text-neutral-dark dark:text-white/75 leading-relaxed max-w-xl">{detalle.desc}</p>
            <ul className="flex flex-wrap gap-1.5 md:gap-2 mt-5 md:mt-7">
              {detalle.puntos.map(pt => (
                <li
                  key={pt}
                  className="font-sans text-[11px] sm:text-xs md:text-sm font-medium px-2.5 md:px-3 py-1 md:py-1.5 rounded-full border border-nutri-dark/20 dark:border-nutri-light/30 text-nutri-dark dark:text-nutri-light"
                >
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────────────────────
   3. El puente con la app que usan tus pacientes: el recorrido
      de tu criterio y lo que ve el paciente en el súper.
   ────────────────────────────────────────────────────────────── */
const BRIDGE = [
  {
    lugar: 'En tu consultorio',
    icon: 'key-outline',
    title: 'Vinculás a tu paciente con un código',
    desc: 'Desde su ficha generás un código de un solo uso. Tu paciente lo carga en la app y elige qué compartir con vos: escaneos, carrito, lista de compras o restricciones.',
  },
  {
    lugar: 'En el súper',
    icon: 'scan-outline',
    title: 'Tu paciente escanea y compra como siempre',
    desc: 'La app le dice si cada producto es apto, con precaución o no apto según sus restricciones, y le muestra los sellos de excesos. Cuando confirma el carrito, esa compra queda registrada.',
  },
  {
    lugar: 'De vuelta en tu consultorio',
    icon: 'stats-chart-outline',
    title: 'Ves lo que pasó de verdad',
    desc: 'Con su permiso, abrís su historial de escaneos, sus carritos confirmados y su lista. En el monitoreo tenés cuánto de lo que compró desde la última consulta quedó marcado como no apto o con precaución.',
  },
];

const Recorrido: React.FC = () => (
  <ol className="relative">
    {/* La línea que une los tres pasos */}
    <span className="absolute left-[19px] top-6 bottom-6 w-px bg-nutri-dark/15 dark:bg-white/15" aria-hidden="true" />
    {BRIDGE.map((b, i) => (
      <PasoRecorrido key={b.title} paso={b} index={i} />
    ))}
  </ol>
);

const PasoRecorrido: React.FC<{ paso: typeof BRIDGE[0]; index: number }> = ({ paso, index }) => {
  const { ref } = useScrollAnimation<HTMLLIElement>({ animation: 'fade-up', delay: index * 120, threshold: 0.15 });
  return (
    <li ref={ref} className="relative flex gap-5 sm:gap-6 pb-10 last:pb-0">
      <span className="relative z-10 w-10 h-10 shrink-0 rounded-full bg-white dark:bg-nightNutri-card border border-nutri-dark/20 dark:border-nutri-light/30 flex items-center justify-center text-nutri-dark dark:text-nutri-light">
        <ion-icon name={paso.icon} style={{ fontSize: '18px' }} aria-hidden="true" />
      </span>
      <div className="pt-1.5">
        <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-nutri-dark/70 dark:text-nutri-light/70">
          {paso.lugar}
        </span>
        <h3 className="font-display text-xl sm:text-2xl font-semibold text-neutral-darkest dark:text-white mt-1.5 mb-2 text-balance">
          {paso.title}
        </h3>
        <p className="font-sans text-sm sm:text-base text-neutral-dark dark:text-white/70 leading-relaxed max-w-md">{paso.desc}</p>
      </div>
    </li>
  );
};

/* Lo que ve el paciente cuando escanea: una captura real de la app,
   en el mismo mockup que usa el inicio. */
const PantallaDelPaciente: React.FC = () => {
  const { ref } = useScrollAnimation({ animation: 'fade-left', delay: 150, threshold: 0.15 });
  return (
    <div ref={ref} className="relative">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[80%] rounded-full bg-nutri-light/25 dark:bg-nutri/15 blur-3xl" aria-hidden="true" />
      <IPhoneMockup className="relative">
        <img
          src={capturaAnalisis}
          alt="Análisis de un producto en la app de Vokkado: no es apto por las restricciones del paciente"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </IPhoneMockup>
    </div>
  );
};

/* ──────────────────────────────────────────────────────────────
   4. Cómo empezás
   ────────────────────────────────────────────────────────────── */
const STEPS = [
  { n: '1', title: 'Creás tu cuenta', desc: 'Tu perfil profesional, tus tipos de consulta y tus horarios. En una tarde estás pronta para atender.' },
  { n: '2', title: 'Traés tus pacientes', desc: 'Cargás la ficha de cada uno con lo que ya sabés y seguís desde donde estabas, sin empezar de cero con nadie.' },
  { n: '3', title: 'Los vinculás con la app', desc: 'Desde la ficha generás un código de un solo uso. Tu paciente lo carga en la app y elige qué compartir con vos.' },
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

  return (
    <div className="relative bg-friendlyWhite dark:bg-nightNutri text-neutral-dark dark:text-white/75 overflow-hidden">

      {/* ── Fondo continuo ── */}
      <div className="absolute inset-0 -z-10 fondo-luz-nutri">
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
                Estudiaste para acompañar personas, no para pelearte con una planilla. Tu agenda, tus fichas y tus consultas, en un solo lugar.
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

      {/* ── Frases de consultorio ── */}
      <section className="relative py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={painTitleRef} className="text-center mb-12 sm:mb-14 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-darkest dark:text-white leading-tight">
              ¿Te suena <span className="text-nutri-dark dark:text-nutri-light">alguna?</span>
            </h2>
            <p className="font-sans mt-5 text-lg text-neutral-dark dark:text-white/75 max-w-2xl mx-auto">
              Son cosas que nos contaron nutricionistas de acá. Marcá las que te pasan y mirá cómo queda cada una cuando la resolvés una sola vez.
            </p>
          </div>

          <div className="mb-14">
            <FrasesDeConsultorio />
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
              Cada parte conversa con las demás, así no cargás el mismo dato dos veces. Lo que dice "pronto" es lo que viene.
            </p>
          </div>

          <ExploradorDeModulos />
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
            En ese momento no te puede llamar, y ahí es donde el plan se cumple o se cae. Con Vokkado llegás hasta ahí: tu paciente escanea el producto, la app le dice si le sirve, y vos después ves qué compró.
          </p>
        </div>
      </section>

      {/* ── El puente con la app del paciente ── */}
      <section className="relative py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div ref={bridgeTitleRef} className="text-center mb-14 sm:mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-darkest dark:text-white leading-tight">
              Lo que pasa en el súper, <span className="text-nutri-dark dark:text-nutri-light">también en tu consultorio</span>
            </h2>
            <p className="font-sans mt-5 text-lg text-neutral-dark dark:text-white/75 max-w-2xl mx-auto">
              Tu paciente escanea y compra con la app de Vokkado. Si él lo permite, eso llega a tu ficha.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_auto] gap-14 lg:gap-20 items-center max-w-5xl mx-auto">
            <Recorrido />
            <PantallaDelPaciente />
          </div>

          <div
            ref={privacyRef}
            className="mt-16 sm:mt-20 pt-8 border-t border-nutri-dark/15 dark:border-white/10 flex flex-col sm:flex-row gap-4 sm:gap-6 max-w-5xl mx-auto"
          >
            <ion-icon name="lock-closed-outline" style={{ fontSize: '22px' }} className="text-nutri-dark dark:text-nutri-light shrink-0 sm:mt-0.5" aria-hidden="true" />
            <p className="font-sans text-sm sm:text-base text-neutral-dark dark:text-white/70 leading-relaxed">
              <span className="font-semibold text-neutral-darkest dark:text-white">Acompañar no es vigilar.</span>{' '}
              El paciente elige qué comparte, dato por dato: escaneos, carrito, lista de compras o restricciones. Puede sacarte cualquiera de esos permisos cuando quiera, y si se desvincula se corta todo. Esa frontera es la que hace que se anime a compartir, y es lo que vuelve el dato confiable para vos.
            </p>
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
      <section className="relative py-20 sm:py-24 dark:border-white/10">
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
