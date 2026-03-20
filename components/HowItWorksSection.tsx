import React from 'react';
import IconCard from './common/IconCard';
import { SECTION_IDS } from '../constants';

// Ionicons web components (loaded via CDN in index.html)
declare namespace JSX {
  interface IntrinsicElements {
    'ion-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { name: string; size?: string }, HTMLElement>;
  }
}


const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      icon: (
        <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center">
          <ion-icon name="person-outline" style={{ fontSize: '40px', color: 'white' }} />
        </div>
      ),
      title: '1. Creá tu perfil único',
      description: 'Definí tus preferencias dietéticas, intolerancias, condiciones y edad.',
    },
    {
      icon: (
        <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center">
          <span className="mdi mdi-barcode-scan" style={{ fontSize: '40px', color: 'white' }} />
        </div>
      ),
      title: '2. Escaneá productos',
      description: 'Utilizá la cámara de tu celular para escanear el código de barras de cualquier alimento o bebida.',
    },
    {
      icon: (
        <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center">
          <ion-icon name="bar-chart-outline" style={{ fontSize: '40px', color: 'white' }} />
        </div>
      ),
      title: '3. Recibí análisis personalizados',
      description: 'Obtené información clara y al instante sobre si el producto es adecuado para vos.',
    },
  ];

  return (
    <section id={SECTION_IDS.howItWorks} className="py-16 sm:py-24 bg-neutral-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-darkest">
            Simple, rápido y <span className="text-primary-DEFAULT"></span> <span className="text-secondary-dark">personalizado</span>
          </h2>
          <p className="mt-4 text-lg text-neutral-dark max-w-2xl mx-auto">
            Entender las etiquetas nunca fue tan fácil.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 sm:gap-12">
          {steps.map((step, index) => (
            <IconCard
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              className="transform transition-transform duration-300 hover:scale-105"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;