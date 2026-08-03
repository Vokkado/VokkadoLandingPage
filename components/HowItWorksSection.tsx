import React, { useEffect, useRef, useState } from 'react';
import IPhoneMockup from './common/IPhoneMockup';
import { SECTION_IDS, COLORS } from '../constants';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// Import step images (placeholders — drop real screenshots into images/steps/)
const stepModules = import.meta.glob('../images/steps/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' }) as Record<string, string>;
const stepImages: Record<string, string> = {};
for (const key of Object.keys(stepModules)) {
  const filename = key.split('/').pop()?.split('.')[0] ?? '';
  stepImages[filename] = stepModules[key];
}

interface StepData {
  tag: string;
  tagIcon: string;
  tagIconType: 'ion' | 'mdi';
  title: string;
  titleAccent: string;
  description: string;
  highlights: { icon: string; iconType: 'ion' | 'mdi'; text: string }[];
  imageKey: string;
  placeholderIcon: string;
  placeholderIconType: 'ion' | 'mdi';
}

const steps: StepData[] = [
  {
    tag: 'Paso 1',
    tagIcon: 'person-outline',
    tagIconType: 'ion',
    title: 'Contale a Vokkado ',
    titleAccent: 'quién sos',
    description:
      'Tus alergias, condiciones de salud y objetivos nutricionales. A partir de acá, cada respuesta es sobre vos, no una respuesta genérica.',
    highlights: [
      { icon: 'shield-checkmark-outline', iconType: 'ion', text: 'Alergias e intolerancias' },
      { icon: 'fitness-outline', iconType: 'ion', text: 'Condiciones de salud' },
      { icon: 'nutrition-outline', iconType: 'ion', text: 'Objetivos nutricionales' },
    ],
    imageKey: 'step-1-profile',
    placeholderIcon: 'person-circle-outline',
    placeholderIconType: 'ion',
  },
  {
    tag: 'Paso 2',
    tagIcon: 'barcode-scan',
    tagIconType: 'mdi',
    title: 'Dejá de descifrar ',
    titleAccent: 'etiquetas',
    description:
      'Apuntá la cámara al código de barras y listo. La letra chica deja de ser tu problema.',
    highlights: [
      { icon: 'camera-outline', iconType: 'ion', text: 'Escaneo instantáneo' },
      { icon: 'barcode-outline', iconType: 'ion', text: 'Miles de productos' },
      { icon: 'flash-outline', iconType: 'ion', text: 'Resultados en segundos' },
    ],
    imageKey: 'step-2-scan',
    placeholderIcon: 'scan-outline',
    placeholderIconType: 'ion',
  },
  {
    tag: 'Paso 3',
    tagIcon: 'bar-chart-outline',
    tagIconType: 'ion',
    title: 'Entendé lo que ',
    titleAccent: 'estás comprando',
    description:
      'Apto, precaución o no apto, con la explicación en lenguaje claro. No solo qué, también por qué: así aprendés en cada compra.',
    highlights: [
      { icon: 'checkmark-circle-outline', iconType: 'ion', text: '"Apto", "Precaución" o "No Apto"' },
      { icon: 'alert-circle-outline', iconType: 'ion', text: 'Alertas de alérgenos' },
      { icon: 'list-outline', iconType: 'ion', text: 'Detalle nutricional completo' },
    ],
    imageKey: 'step-3-analysis',
    placeholderIcon: 'analytics-outline',
    placeholderIconType: 'ion',
  },
  {
    tag: 'Paso 4',
    tagIcon: 'cart-outline',
    tagIconType: 'ion',
    title: 'Elegí con confianza ',
    titleAccent: 'toda tu compra',
    description:
      'Visualizá el impacto nutricional de tu carrito completo y decidí con seguridad antes de pagar.',
    highlights: [
      { icon: 'bag-check-outline', iconType: 'ion', text: 'Resumen de tu compra' },
      { icon: 'trending-up-outline', iconType: 'ion', text: 'Estadísticas nutricionales' },
      { icon: 'time-outline', iconType: 'ion', text: 'Historial de compras' },
    ],
    imageKey: 'step-4-cart',
    placeholderIcon: 'cart-outline',
    placeholderIconType: 'ion',
  },
];

/* ── Reusable icon renderer ── */
const IconEl: React.FC<{
  name: string;
  type: 'ion' | 'mdi';
  style?: React.CSSProperties;
  className?: string;
  ariaHidden?: boolean;
  title?: string;
}> = ({ name, type, style, className, ariaHidden = true, title }) =>
  type === 'ion' ? (
    <ion-icon name={name} style={style} className={className} aria-hidden={ariaHidden} title={title} />
  ) : (
    <span className={`mdi mdi-${name} ${className ?? ''}`} style={style} aria-hidden={ariaHidden} title={title} />
  );

/* ── Placeholder screen for a step without a screenshot ── */
const StepPlaceholder: React.FC<{ icon: string; type: 'ion' | 'mdi' }> = ({ icon, type }) => (
  <div className="w-full h-full bg-gradient-to-br from-primary-DEFAULT to-primary-light flex flex-col items-center justify-center text-white gap-3">
    <IconEl name={icon} type={type} style={{ fontSize: '56px', color: 'rgba(255,255,255,0.5)' }} />
    <span className="text-xs font-medium opacity-50">Captura próximamente</span>
  </div>
);

/* ── Un solo teléfono cuya pantalla cambia (crossfade) según el paso activo ── */
const PhoneScreens: React.FC<{ active: number; className?: string }> = ({ active, className }) => (
  <IPhoneMockup className={className}>
    <div className="relative w-full h-full">
      {steps.map((step, i) => {
        const src = stepImages[step.imageKey];
        return (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-500 ease-in-out"
            style={{ opacity: i === active ? 1 : 0 }}
            aria-hidden={i !== active}
          >
            {src ? (
              <img src={src} alt={`${step.tag}: ${step.titleAccent}`} className="w-full h-full object-cover" draggable={false} />
            ) : (
              <StepPlaceholder icon={step.placeholderIcon} type={step.placeholderIconType} />
            )}
          </div>
        );
      })}
    </div>
  </IPhoneMockup>
);

/* ── Contenido de texto de un paso (chip + título + descripción + highlights) ── */
const StepText: React.FC<{ step: StepData; isActive?: boolean; centered?: boolean }> = ({
  step,
  isActive = true,
  centered = false,
}) => (
  <>
    <div
      className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold mb-5 w-fit transition-colors duration-300 ${
        centered ? 'mx-auto' : ''
      } ${isActive ? 'bg-primary-dark text-white' : 'bg-primary-lightest text-primary-dark'}`}
    >
      <IconEl name={step.tagIcon} type={step.tagIconType} style={{ fontSize: '16px' }} />
      {step.tag}
    </div>

    <h3 className="text-3xl sm:text-4xl lg:text-[2.4rem] font-bold text-neutral-darkest leading-tight mb-4 text-balance">
      {step.title}
      <span className="text-primary-dark whitespace-nowrap">{step.titleAccent}</span>
    </h3>

    <p className={`text-base sm:text-lg text-neutral-dark leading-relaxed mb-8 ${centered ? 'mx-auto max-w-md' : 'max-w-xl'}`}>
      {step.description}
    </p>

    <div className={`flex flex-col gap-3 ${centered ? 'w-fit mx-auto text-left' : ''}`}>
      {step.highlights.map((h, i) => (
        <div key={i} className="flex items-center gap-3" title={h.text}>
          <div className="w-9 h-9 rounded-lg bg-primary-light/15 flex items-center justify-center flex-shrink-0">
            <IconEl name={h.icon} type={h.iconType} style={{ fontSize: '20px', color: COLORS.primary.DEFAULT }} title={h.text} />
          </div>
          <span className="text-sm sm:text-base text-neutral-dark font-medium">{h.text}</span>
        </div>
      ))}
    </div>
  </>
);

/* ── DESKTOP: bloque que avisa cuándo está activo (centrado en viewport) ── */
const StepBlock: React.FC<{
  step: StepData;
  index: number;
  active: number;
  onActivate: (i: number) => void;
}> = ({ step, index, active, onActivate }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onActivate(index);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [index, onActivate]);

  const isActive = index === active;

  return (
    <div
      ref={ref}
      className="min-h-screen flex flex-col justify-center transition-opacity duration-300"
      style={{ opacity: isActive ? 1 : 0.4 }}
    >
      <StepText step={step} isActive={isActive} />
    </div>
  );
};

/* ── MOBILE: teléfono estático de un paso (imagen única) ── */
const StepPhoneStatic: React.FC<{ step: StepData; className?: string }> = ({ step, className }) => {
  const src = stepImages[step.imageKey];
  return (
    <IPhoneMockup className={className}>
      {src ? (
        <img src={src} alt={`${step.tag}: ${step.titleAccent}`} className="w-full h-full object-cover" draggable={false} />
      ) : (
        <StepPlaceholder icon={step.placeholderIcon} type={step.placeholderIconType} />
      )}
    </IPhoneMockup>
  );
};

/* ── MOBILE: contenido de un paso (texto + teléfono juntos), centrado ── */
const CrossfadeStep: React.FC<{ step: StepData; number: number }> = ({ step, number }) => (
  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-2">
    <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold mb-4 bg-primary-dark text-white">
      <span className="w-5 h-5 rounded-full bg-white/25 flex items-center justify-center text-xs">{number}</span>
      {step.tag}
    </div>

    <h3 className="text-2xl sm:text-3xl font-bold text-neutral-darkest leading-tight mb-2">
      {step.title}
      <span className="text-primary-dark whitespace-nowrap">{step.titleAccent}</span>
    </h3>
    <p className="text-sm sm:text-base text-neutral-dark leading-relaxed max-w-xs mb-5">{step.description}</p>

    <StepPhoneStatic step={step} />
  </div>
);

/* ── MOBILE: escenario fijo + crossfade manejado por scroll ──
 * Track alto + escenario "sticky". El progreso (a: 0…n-1) hace que el paso
 * activo se desvanezca y entre el siguiente, texto y teléfono juntos.
 */
const MobileSteps: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [a, setA] = useState(0);
  const n = steps.length;

  useEffect(() => {
    let raf = 0;
    const compute = () => {
      raf = 0;
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      setA(p * (n - 1));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(compute); };
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [n]);

  // Meseta + desvanecido: cada paso queda 100% visible un tramo, y el que
  // sale llega a opacity 0 justo cuando el que entra arranca desde 0.
  // HOLD + FADE = 0.5 → el cruce se toca exactamente en 0, sin superposición.
  const HOLD = 0.2;
  const FADE = 0.3;
  const stepStyle = (i: number): React.CSSProperties => {
    const d = i - a;                       // 0 = activo; el signo indica arriba/abajo
    const dist = Math.abs(d);
    const vis = dist <= HOLD ? 1 : dist >= HOLD + FADE ? 0 : 1 - (dist - HOLD) / FADE;
    return {
      opacity: vis,
      transform: `translateY(${d * 40}px) scale(${0.94 + vis * 0.06})`,
      zIndex: vis > 0.5 ? 20 : 10,
      pointerEvents: vis > 0.9 ? 'auto' : 'none',
    };
  };

  const activeIdx = Math.round(a);

  return (
    <div ref={wrapRef} className="relative" style={{ height: `${n * 85}vh` }}>
      <div className="sticky top-0 h-screen pt-16 pb-8 flex flex-col items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-sm mx-auto flex-1 max-h-[600px]">
          {steps.map((step, i) => (
            <div key={i} className="absolute inset-0 will-change-transform" style={stepStyle(i)}>
              <CrossfadeStep step={step} number={i + 1} />
            </div>
          ))}
        </div>

        {/* Progreso */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIdx ? 'w-7 bg-primary-dark' : 'w-2 bg-neutral-light'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── Main section ── */
const HowItWorksSection: React.FC = () => {
  const headerAnim = useScrollAnimation({ animation: 'fade-up', threshold: 0.2 });
  const [active, setActive] = useState(0);

  return (
    <section id={SECTION_IDS.howItWorks} className="relative pt-8 pb-20 sm:pt-10 sm:pb-28">
      {/* ── Fondo limpio ── */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-friendlyWhite via-[#f4f8ec] to-friendlyWhite" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={headerAnim.ref} className="text-center mb-8 sm:mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-darkest leading-tight">
            Los pasos para <span className="text-primary-dark">saber elegir</span>
          </h2>
          <p className="mt-5 text-lg text-neutral-dark max-w-2xl mx-auto">
            En unos pasos pasás de la duda a una respuesta clara, personalizada y al instante.
          </p>
        </div>

        {/* DESKTOP: scrollytelling con teléfono sticky */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 max-w-6xl mx-auto">
          <div className="lg:sticky lg:top-0 lg:h-screen flex items-center justify-center order-2">
            <PhoneScreens active={active} />
          </div>
          <div className="order-1">
            {steps.map((step, i) => (
              <StepBlock key={i} step={step} index={i} active={active} onActivate={setActive} />
            ))}
          </div>
        </div>

        {/* MOBILE: módulo interactivo compacto */}
        <div className="lg:hidden">
          <MobileSteps />
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
