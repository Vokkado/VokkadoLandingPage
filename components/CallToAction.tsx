import React, { useState } from 'react';
import { APP_NAME, SECTION_IDS } from '../constants';
import PreRegisterModal from './PreRegisterModal';
import appstoreImg from '../images/appstore.png';
import googleplayImg from '../images/googleplay.png';

const CallToActionSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      id={SECTION_IDS.participate}
      className="bg-gradient-to-br from-primary-dark via-primary-DEFAULT to-primary-light py-16 sm:py-24 text-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          ¡Prepárate para transformar tu alimentación!
        </h2>
        <p className="text-lg sm:text-xl text-primary-lightest max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          {APP_NAME} está cada vez más cerca. Sumate al acceso anticipado y descubrí cómo comer mejor, de forma inteligente.
        </p>

        <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <p className="text-sm text-primary-lightest mb-2">Descargala pronto en:</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setIsModalOpen(true)}
              aria-label="Pre-registro para App Store"
              className="cursor-pointer hover:opacity-80 transition-opacity bg-transparent border-0 p-0"
            >
              <img src={appstoreImg} alt="App Store" className="h-10 sm:h-12 w-auto" />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              aria-label="Pre-registro para Google Play"
              className="cursor-pointer hover:opacity-80 transition-opacity bg-transparent border-0 p-0"
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