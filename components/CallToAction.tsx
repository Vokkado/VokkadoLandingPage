import React from 'react';
import { APP_NAME, SECTION_IDS } from '../constants';

// Note: The Button component import is removed as it's no longer used here after form removal.

const CallToActionSection: React.FC = () => {
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
        
        {/* Email form removed */}
        
        <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}> {/* Adjusted animation delay */}
          <p className="text-sm text-primary-lightest mb-2">Descargala pronto en:</p>
          <div className="flex justify-center space-x-4">
            <a href="#" aria-label="Próximamente en App Store" className="bg-neutral-darkest text-white py-2 px-5 rounded-lg hover:bg-black transition-colors flex items-center space-x-2">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Apple_Store_logo.svg/2048px-Apple_Store_logo.svg.png" alt="Apple Store" className="w-6 h-6" />
              <span>App Store</span>
            </a>
            <a href="#" aria-label="Próximamente en Google Play" className="bg-neutral-darkest text-white py-2 px-5 rounded-lg hover:bg-black transition-colors flex items-center space-x-2">
  <img src="https://cdn-icons-png.flaticon.com/512/732/732208.png" alt="Google Play" className="w-6 h-6" />
  <span>Google Play</span>
</a>

          </div>
           <p className="mt-4 text-xs text-primary-lightest">(Próximamente)</p>
        </div>

      </div>
    </section>
  );
};

export default CallToActionSection;