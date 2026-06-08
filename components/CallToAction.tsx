import React from 'react';
import { APP_NAME, SECTION_IDS } from '../constants';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

/* ── Inline SVG logos ── */
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

const CallToActionSection: React.FC = () => {
  const headerAnim = useScrollAnimation({ animation: 'fade-up', threshold: 0.2 });
  const subtitleAnim = useScrollAnimation({ animation: 'fade-up', delay: 150, threshold: 0.2 });
  const badgesAnim = useScrollAnimation({ animation: 'scale', delay: 300, threshold: 0.2 });

  return (
    <section
      id={SECTION_IDS.participate}
      className="relative py-20 sm:py-28 text-white overflow-hidden"
    >
      {/* ── Fondo limpio ── */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary-DEFAULT to-primary-dark" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <h2
          ref={headerAnim.ref}
          className="text-4xl sm:text-5xl font-bold mb-6"
        >
          ¡Preparate para transformar tu alimentación!
        </h2>
        <p
          ref={subtitleAnim.ref}
          className="text-lg sm:text-xl text-primary-lightest max-w-2xl mx-auto mb-10"
        >
          {APP_NAME} ya está disponible como beta pública en Google Play y App Store. Descargala y empezá a escanear tus productos.
        </p>

        <div ref={badgesAnim.ref} className="mt-12">
          <p className="text-sm text-primary-lightest mb-4">Disponible ahora en:</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            {/* App Store button */}
            <button
              onClick={() => window.open('https://apps.apple.com/uy/app/vokkado/id6761864995?l=es-MX', '_blank', 'noopener,noreferrer')}
              className="group flex items-center gap-2.5 bg-black hover:bg-neutral-darkest text-white rounded-lg px-4 py-2.5 border border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-200 cursor-pointer w-[180px]"
              aria-label="Descargar beta pública en App Store"
            >
              <AppleLogo className="w-6 h-6 flex-shrink-0" />
              <div className="text-left leading-tight">
                <span className="block text-[9px] font-normal tracking-wide opacity-80">Beta pública en</span>
                <span className="block text-base font-semibold -mt-0.5">App Store</span>
              </div>
            </button>

            {/* Google Play button */}
            <button
              onClick={() => window.open('https://play.google.com/store/apps/details?id=com.scantoeat.app&pcampaignid=web_share', '_blank', 'noopener,noreferrer')}
              className="group flex items-center gap-2.5 bg-black hover:bg-neutral-darkest text-white rounded-lg px-4 py-2.5 border border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-200 cursor-pointer w-[180px]"
              aria-label="Descargar beta pública en Google Play"
            >
              <GooglePlayLogo className="w-6 h-6 flex-shrink-0" />
              <div className="text-left leading-tight">
                <span className="block text-[9px] font-normal tracking-wide opacity-80">Beta pública en</span>
                <span className="block text-base font-semibold -mt-0.5">Google Play</span>
              </div>
            </button>
          </div>
        </div>
      </div>

    </section>
  );
};

export default CallToActionSection;
