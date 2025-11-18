import React from 'react';
import IconCard from './common/IconCard';
import { SECTION_IDS } from '../constants';

// Placeholder simple SVG icons
const ProfileIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const ScanIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6.598 4.002A4.502 4.502 0 0112 20.5a4.502 4.502 0 01-5.402-4.498M4 12H2m13.598-7.002A4.502 4.502 0 0012 3.5a4.502 4.502 0 00-5.402 4.498M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const AnalysisIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);


const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      icon: (
        <div className="p-4 bg-primary-light rounded-full inline-block">
          <ProfileIcon className="w-10 h-10 text-white" />
        </div>
      ),
      title: '1. Creá tu perfil único',
      description: 'Definí tus preferencias dietéticas, intolerancias, condiciones y edad.',
    },
    {
      icon: (
        <div className="p-4 bg-primary-light rounded-full inline-block">
          <ScanIcon className="w-10 h-10 text-white" />
        </div>
      ),
      title: '2. Escaneá productos',
      description: 'Utilizá la cámara de tu celular para escanear el código de barras de cualquier alimento o bebida.',
    },
    {
      icon: (
        <div className="p-4 bg-primary-light rounded-full inline-block">
          <AnalysisIcon className="w-10 h-10 text-white" />
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