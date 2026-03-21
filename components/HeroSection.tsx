import React, { useState } from 'react';
import Button from './common/Button';
import IPhoneMockup from './common/IPhoneMockup';
import PreRegisterModal from './PreRegisterModal';
import { SECTION_IDS } from '../constants';

// Importar todas las imágenes de la galería automáticamente
const galleryModules = import.meta.glob('../images/gallery/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' }) as Record<string, string>;
const galleryImages: string[] = Object.keys(galleryModules)
  .sort()
  .map((key) => galleryModules[key]);

const HeroSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <section
      id={SECTION_IDS.home}
      className="relative text-black min-h-[calc(100vh-4rem)] md:min-h-screen flex md:items-center py-20 md:py-28 overflow-hidden"
    >
      {/* ── Fondo limpio ── */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f4f8ec] via-white to-white" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:grid md:grid-cols-5 md:gap-12 md:items-center">
          {/* Left Column: Text and CTAs */}
          <div className="md:col-span-3 text-center md:text-left animate-fade-in-up">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight mb-6 leading-tight">
              <span className="text-primary-DEFAULT font-bold">
                <span className="text-primary font-bold"> Saber </span>
                lo que comés,
              </span> <br />
              <span className="text-primary-DEFAULT font-bold"> es </span>
              <span className="text-primary font-bold">  cuidarte</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-neutral-dark max-w-xl mx-auto md:mx-0 mb-10 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              Todo lo que tus productos esconden, Vokkado te lo cuenta.
            </p>

            {/* Pre-registro callout */}
            <div
              className="bg-white/70 backdrop-blur-md border border-primary/20 rounded-2xl p-6 mb-8 shadow-xl max-w-xl mx-auto md:mx-0 animate-fade-in-up hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: '300ms' }}
            >
              <p className="text-neutral-darkest text-base md:text-lg mb-4">
                🎉 <strong className="text-primary">Sumate al acceso exclusivo,</strong> dejanos tu mail y probá la app antes que nadie
              </p>
              <Button
                variant="primary"
                size="lg"
                className="shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto"
                onClick={() => setIsModalOpen(true)}
              >
               Quiero unirme
              </Button>
            </div>
          </div>

          {/* Right Column: iPhone Mockup Gallery */}
          <div className="md:col-span-2 mt-16 md:mt-0 flex items-center justify-center animate-fade-in-right" style={{ animationDelay: '400ms' }}>
            <div className="relative">
              <IPhoneMockup>
                {galleryImages.length > 0 ? (
                  <img
                    src={galleryImages[currentImageIndex]}
                    alt={`Vokkado captura ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover transition-opacity duration-500"
                    draggable={false}
                  />
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
                    className="absolute left-[-40px] top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-primary-DEFAULT rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-all hover:scale-110"
                    aria-label="Imagen anterior"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)}
                    className="absolute right-[-40px] top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-primary-DEFAULT rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-all hover:scale-110"
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
                          ? 'bg-primary-DEFAULT w-6 h-2.5'
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

      {/* Modal de Pre-registro */}
      <PreRegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default HeroSection;
