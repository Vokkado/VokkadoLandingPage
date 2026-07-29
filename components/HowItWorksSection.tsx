import React from 'react';
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
      'Tus alergias, condiciones de salud y objetivos nutricionales. A partir de acá, cada respuesta es sobre vos — no una respuesta genérica.',
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
      'Apto, precaución o no apto — con la explicación en lenguaje claro. No solo qué, también por qué: así aprendés en cada compra.',
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
      'Visualizá el impacto nutricional de tu carrito completo y decidí con seguridad antes de pagar — no producto por producto, sino tu compra entera.',
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
}> = ({
  name,
  type,
  style,
  className,
  ariaHidden = true,
  title,
}) =>
  type === 'ion' ? (
    <ion-icon
      name={name}
      style={style}
      className={className}
      aria-hidden={ariaHidden}
      title={title}
    />
  ) : (
    <span
      className={`mdi mdi-${name} ${className ?? ''}`}
      style={style}
      aria-hidden={ariaHidden}
      title={title}
    />
  );

/* ── Phone screen content (wraps IPhoneMockup) ── */
const StepPhone: React.FC<{ imageSrc?: string; placeholderIcon: string; placeholderIconType: 'ion' | 'mdi'; alt: string }> = ({
  imageSrc,
  placeholderIcon,
  placeholderIconType,
  alt,
}) => (
  <IPhoneMockup>
    {imageSrc ? (
      <img src={imageSrc} alt={alt} className="w-full h-full object-cover" draggable={false} />
    ) : (
      <div className="w-full h-full bg-gradient-to-br from-primary-DEFAULT to-primary-light flex flex-col items-center justify-center text-white gap-3">
        <IconEl name={placeholderIcon} type={placeholderIconType} style={{ fontSize: '56px', color: 'rgba(255,255,255,0.5)' }} />
        <span className="text-xs font-medium opacity-50">Captura próximamente</span>
      </div>
    )}
  </IPhoneMockup>
);

/* ── Single step row (con animaciones al scroll) ── */
const StepRow: React.FC<{ step: StepData; reversed: boolean }> = ({ step, reversed }) => {
  const phoneAnim = useScrollAnimation({
    animation: reversed ? 'fade-right' : 'fade-left',
    delay: 0,
    threshold: 0.15,
  });
  const textAnim = useScrollAnimation({
    animation: reversed ? 'fade-left' : 'fade-right',
    delay: 150,
    threshold: 0.15,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-16">
      {/* Phone column */}
      <div
        ref={phoneAnim.ref}
        className={`lg:col-span-5 flex justify-center order-2 ${reversed ? 'lg:order-2' : 'lg:order-1'}`}
      >
        <StepPhone
          imageSrc={stepImages[step.imageKey]}
          placeholderIcon={step.placeholderIcon}
          placeholderIconType={step.placeholderIconType}
          alt={`${step.tag} — ${step.titleAccent}`}
        />
      </div>

      {/* Text column */}
      <div
        ref={textAnim.ref}
        className={`lg:col-span-7 flex flex-col justify-center order-1 ${reversed ? 'lg:order-1 lg:items-end lg:text-right' : 'lg:order-2'}`}
      >
        {/* Step tag */}
        <div
          className="inline-flex items-center gap-2 bg-primary-DEFAULT/10 text-primary-DEFAULT rounded-full px-4 py-1.5 text-sm font-semibold mb-5 w-fit"
          title={`Paso ${steps.indexOf(step) + 1} del proceso`}
        >
          <IconEl name={step.tagIcon} type={step.tagIconType} style={{ fontSize: '16px' }} />
          {step.tag}
        </div>

        {/* Title */}
        <h3 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-neutral-darkest leading-tight mb-4">
          {step.title}
          <span className="text-primary-dark">{step.titleAccent}</span>
        </h3>

        {/* Description */}
        <p className="text-base sm:text-lg text-neutral-dark leading-relaxed mb-8 max-w-xl">
          {step.description}
        </p>

        {/* Highlights */}
        <div className="flex flex-col gap-3">
          {step.highlights.map((h, i) => (
            <div key={i} className="flex items-center gap-3 group" title={h.text}>
              <div className="w-9 h-9 rounded-lg bg-primary-light/15 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-primary-DEFAULT/15 transition-all duration-200">
                <IconEl
                  name={h.icon}
                  type={h.iconType}
                  style={{ fontSize: '20px', color: COLORS.primary.DEFAULT }}
                  title={h.text}
                />
              </div>
              <span className="text-sm sm:text-base text-neutral-dark font-medium">{h.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── Main section ── */
const HowItWorksSection: React.FC = () => {
  const headerAnim = useScrollAnimation({ animation: 'fade-up', threshold: 0.2 });

  return (
    <section id={SECTION_IDS.howItWorks} className="relative pt-8 pb-20 sm:pt-10 sm:pb-28 overflow-hidden">
      {/* ── Fondo limpio ── */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-friendlyWhite via-[#f4f8ec] to-friendlyWhite" />
        {/* Línea decorativa vertical sutil */}
        <div className="hidden lg:block absolute left-1/2 top-48 bottom-24 w-px bg-gradient-to-b from-transparent via-neutral-light to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={headerAnim.ref} className="text-center mb-16 sm:mb-24 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-darkest leading-tight">
            Los pasos para <span className="text-primary-dark">saber elegir</span>
          </h2>
          <p className="mt-5 text-lg text-neutral-dark max-w-2xl mx-auto">
            En unos pasos pasás de la duda a una respuesta clara, personalizada y al instante.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-20 sm:gap-28 lg:gap-32">
          {steps.map((step, i) => (
            <StepRow key={i} step={step} reversed={i % 2 !== 0} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
