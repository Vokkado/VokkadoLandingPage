import React, { useState, useRef, useEffect, useCallback } from 'react';
import IPhoneMockup from './common/IPhoneMockup';
import { SECTION_IDS } from '../constants';

const galleryModules = import.meta.glob('../images/gallery/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' }) as Record<string, string>;
const galleryImages: string[] = Object.keys(galleryModules).sort().map((k) => galleryModules[k]);

const AppleLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const GooglePlayLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path d="M3.61 1.814L13.793 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.61-.92z" fill="#4285F4" />
    <path d="M16.657 8.893L5.536.96C5.079.69 4.537.622 4.05.77l9.743 9.743 2.864-1.62z" fill="#EA4335" />
    <path d="M16.657 15.107l-2.864-1.62L4.05 23.23c.487.148 1.029.08 1.486-.19l11.121-7.933z" fill="#34A853" />
    <path d="M20.39 10.467l-3.733-2.114L13.793 12l2.864 3.647 3.733-2.114c.658-.373 1.063-1.07 1.063-1.833s-.405-1.46-1.063-1.233z" fill="#FBBC04" />
  </svg>
);

const HeroSection: React.FC = () => {
  const n = galleryImages.length;

  // ── Carrusel simple: un solo teléfono centrado, crossfade entre capturas ──
  // Sin teléfonos laterales ni blur: siempre se ve exactamente lo mismo.
  const [idx, setIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goNext = useCallback(() => setIdx(i => (i + 1) % n), [n]);
  const goPrev = useCallback(() => setIdx(i => (i - 1 + n) % n), [n]);

  useEffect(() => {
    if (isPaused || n <= 1) return;
    const id = setInterval(goNext, 4000);
    return () => clearInterval(id);
  }, [isPaused, n, goNext]);

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; setIsPaused(true); };
  const onTouchEnd   = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff < -40) goNext();
    else if (diff > 40) goPrev();
    touchStartX.current = null;
    setIsPaused(false);
  };

  return (
    <section
      id={SECTION_IDS.home}
      className="relative text-black min-h-[calc(100vh-4rem)] lg:min-h-screen flex lg:items-center py-20 lg:py-28"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f4f8ec] via-friendlyWhite to-friendlyWhite" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-5 lg:gap-12 lg:items-center">

          {/* ── Texto ── */}
          <div className="lg:col-span-3 text-center lg:text-left animate-fade-in-up" style={{ position: 'relative', zIndex: 1 }}>
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight mb-6" style={{ lineHeight: 0.9 }}>
              <span className="font-bold">Saber elegir </span>
              <br />
              <span className="block" style={{ marginTop: '0.15em', marginLeft: '-0.01em' }}>
                <span className="font-bold">es </span>
                <span className="text-primary-dark font-bold">cuidarte</span>
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-neutral-dark max-w-xl mx-auto md:mx-0 mb-10 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              No hace falta ser nutricionista para entender lo que comés. Vokkado traduce la etiqueta y te dice si es para vos, y por qué.
            </p>
            <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
                <button
                  onClick={() => window.open('https://apps.apple.com/uy/app/vokkado/id6761864995?l=es-MX', '_blank', 'noopener,noreferrer')}
                  className="group flex items-center gap-3.5 bg-black hover:bg-neutral-darkest text-white rounded-xl px-6 py-3.5 border border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-200 cursor-pointer w-[230px]"
                  aria-label="Descargar Vokkado en App Store"
                  title="Descargar Vokkado beta pública en App Store"
                >
                  <AppleLogo className="w-8 h-8 flex-shrink-0" />
                  <div className="text-left leading-tight">
                    <span className="block text-[11px] font-normal tracking-wide opacity-80">Beta pública en</span>
                    <span className="block text-[20px] font-semibold -mt-0.5">App Store</span>
                  </div>
                </button>
                <button
                  onClick={() => window.open('https://play.google.com/store/apps/details?id=com.scantoeat.app&pcampaignid=web_share', '_blank', 'noopener,noreferrer')}
                  className="group flex items-center gap-3.5 bg-black hover:bg-neutral-darkest text-white rounded-xl px-6 py-3.5 border border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-200 cursor-pointer w-[230px]"
                  aria-label="Descargar Vokkado en Google Play"
                  title="Descargar Vokkado beta pública en Google Play"
                >
                  <GooglePlayLogo className="w-8 h-8 flex-shrink-0" />
                  <div className="text-left leading-tight">
                    <span className="block text-[11px] font-normal tracking-wide opacity-80">Beta pública en</span>
                    <span className="block text-[20px] font-semibold -mt-0.5">Google Play</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* ── Teléfono único con crossfade ── */}
          <div
            className="lg:col-span-2 mt-16 lg:mt-0 flex items-center justify-center animate-fade-in-right"
            style={{ animationDelay: '400ms' }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <IPhoneMockup>
              {galleryImages.length > 0 ? (
                <div className="relative w-full h-full select-none">
                  {galleryImages.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`Vokkado captura ${i + 1}`}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
                      style={{ opacity: i === idx ? 1 : 0 }}
                      draggable={false}
                      aria-hidden={i !== idx}
                    />
                  ))}
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-b from-primary-dark to-primary-DEFAULT flex flex-col items-center justify-center text-white p-4">
                  <p className="text-sm font-semibold text-center">Próximamente</p>
                  <p className="text-xs text-center opacity-80 mt-1">Capturas de la app</p>
                </div>
              )}
            </IPhoneMockup>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
