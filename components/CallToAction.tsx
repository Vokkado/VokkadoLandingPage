import React, { useState } from 'react';
import { APP_NAME, SECTION_IDS } from '../constants';
import PreRegisterModal from './PreRegisterModal';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import appstoreImg from '../images/appstore.png';
import googleplayImg from '../images/googleplay.png';

const CallToActionSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
          ¡Prepárate para transformar tu alimentación!
        </h2>
        <p
          ref={subtitleAnim.ref}
          className="text-lg sm:text-xl text-primary-lightest max-w-2xl mx-auto mb-10"
        >
          {APP_NAME} está cada vez más cerca. Sumate al acceso anticipado y descubrí cómo comer mejor, de forma inteligente.
        </p>

        <div ref={badgesAnim.ref} className="mt-12">
          <p className="text-sm text-primary-lightest mb-2">Descargala pronto en:</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setIsModalOpen(true)}
              aria-label="Pre-registro para App Store"
              className="cursor-pointer hover:opacity-80 hover:scale-105 transition-all duration-200 bg-transparent border-0 p-0"
            >
              <img src={appstoreImg} alt="App Store" className="h-10 sm:h-12 w-auto" />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              aria-label="Pre-registro para Google Play"
              className="cursor-pointer hover:opacity-80 hover:scale-105 transition-all duration-200 bg-transparent border-0 p-0"
            >
              <img src={googleplayImg} alt="Google Play" className="h-10 sm:h-12 w-auto" />
            </button>
          </div>
          <p className="mt-4 text-xs text-primary-lightest">(Próximamente)</p>
        </div>
      </div>

      <PreRegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default CallToActionSection;
