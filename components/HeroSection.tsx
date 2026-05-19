import React, { useState, useRef } from 'react';
import IPhoneMockup from './common/IPhoneMockup';
import { SECTION_IDS } from '../constants';

// Importar todas las imágenes de la galería automáticamente
const galleryModules = import.meta.glob('../images/gallery/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' }) as Record<string, string>;
const galleryImages: string[] = Object.keys(galleryModules)
  .sort()
  .map((key) => galleryModules[key]);

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

const HeroSection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<{ x: number; time: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (clientX: number) => {
    dragStart.current = { x: clientX, time: Date.now() };
    setIsDragging(true);
  };

  const handleDragMove = (clientX: number) => {
    if (!dragStart.current || !containerRef.current) return;
    const width = containerRef.current.offsetWidth;
    const diff = clientX - dragStart.current.x;
    // Limit drag to ±1 image width
    setDragOffset(Math.max(-width, Math.min(width, diff)));
  };

  const handleDragEnd = () => {
    if (!dragStart.current || !containerRef.current) return;
    const width = containerRef.current.offsetWidth;
    const threshold = width * 0.2;
    const offset = dragOffset;

    if (offset < -threshold && currentImageIndex < galleryImages.length - 1) {
      setCurrentImageIndex((prev) => prev + 1);
    } else if (offset > threshold && currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1);
    }

    setDragOffset(0);
    setIsDragging(false);
    dragStart.current = null;
  };

  return (
    <section
      id={SECTION_IDS.home}
      className="relative text-black min-h-[calc(100vh-4rem)] md:min-h-screen flex md:items-center py-20 md:py-28 overflow-hidden"
    >
      {/* ── Fondo limpio ── */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f4f8ec] via-friendlyWhite to-friendlyWhite" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:grid md:grid-cols-5 md:gap-12 md:items-center">
          {/* Left Column: Text and CTAs */}
          <div className="md:col-span-3 text-center md:text-left animate-fade-in-up">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight mb-6" style={{ lineHeight: 0.9 }}>
              <span className="text-primary-dark font-bold">Saber </span>
              <span className="font-bold">lo que comés,</span>
              <br />
              <span className="block" style={{ marginTop: '0.15em', marginLeft: '-0.01em' }}>
                <span className="font-bold">es </span>
                <span className="text-primary-dark font-bold">cuidarte</span>
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-neutral-dark max-w-xl mx-auto md:mx-0 mb-10 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              Todo lo que tus productos esconden, Vokkado te lo cuenta.
            </p>

            {/* App badges */}
            <div
              className="mb-8 animate-fade-in-up"
              style={{ animationDelay: '300ms' }}
            >
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-5">
                <button
                  onClick={() => window.open('https://apps.apple.com/uy/app/vokkado/id6761864995?l=es-MX', '_blank', 'noopener,noreferrer')}
                  className="group flex items-center gap-3.5 bg-black hover:bg-neutral-darkest text-white rounded-xl px-6 py-3.5 border border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-200 cursor-pointer w-[230px]"
                  aria-label="Descargar beta pública en App Store"
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
                  aria-label="Descargar beta pública en Google Play"
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

          {/* Right Column: iPhone Mockup Gallery */}
          <div className="md:col-span-2 mt-16 md:mt-0 flex items-center justify-center animate-fade-in-right" style={{ animationDelay: '400ms' }}>
            <div className="relative">
              <IPhoneMockup>
                {galleryImages.length > 0 ? (
                  <div
                    ref={containerRef}
                    className="w-full h-full overflow-hidden touch-pan-y"
                    onMouseDown={(e) => { e.preventDefault(); handleDragStart(e.clientX); }}
                    onMouseMove={(e) => { if (isDragging) handleDragMove(e.clientX); }}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={() => { if (isDragging) handleDragEnd(); }}
                    onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
                    onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
                    onTouchEnd={handleDragEnd}
                  >
                    <div
                      className={`flex h-full ${isDragging ? '' : 'transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]'}`}
                      style={{ transform: `translateX(calc(-${currentImageIndex * 100}% + ${dragOffset}px))` }}
                    >
                      {galleryImages.map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt={`Vokkado captura ${i + 1}`}
                          className="w-full h-full object-cover flex-shrink-0 select-none pointer-events-none"
                          draggable={false}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gradient-to-b from-primary-dark to-primary-DEFAULT flex flex-col items-center justify-center text-white p-4">
                    <p className="text-sm font-semibold text-center">Próximamente</p>
                    <p className="text-xs text-center opacity-80 mt-1">Capturas de la app</p>
                  </div>
                )}
              </IPhoneMockup>

              {/* Gallery Navigation Arrows */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
                    className="absolute left-[-40px] top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-primary-dark rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-all hover:scale-110"
                    aria-label="Imagen anterior"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)}
                    className="absolute right-[-40px] top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-primary-dark rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-all hover:scale-110"
                    aria-label="Imagen siguiente"
                  >
                    ›
                  </button>
                </>
              )}

              {/* Gallery Dots Indicator */}
              {galleryImages.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {galleryImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? 'bg-primary-dark w-6 h-2.5'
                          : 'bg-neutral-medium w-2.5 h-2.5 hover:bg-primary-light'
                      }`}
                      aria-label={`Ir a imagen ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
