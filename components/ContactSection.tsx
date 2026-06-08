import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const ContactSection: React.FC = () => {
  const { ref: tagRef }   = useScrollAnimation({ animation: 'fade-up', threshold: 0.15 });
  const { ref: titleRef } = useScrollAnimation({ animation: 'fade-up', delay: 100, threshold: 0.15 });
  const { ref: descRef  } = useScrollAnimation({ animation: 'fade-up', delay: 200, threshold: 0.15 });
  const { ref: cardRef  } = useScrollAnimation({ animation: 'fade-up', delay: 300, threshold: 0.15 });

  const [copied, setCopied] = useState(false);

  const EMAIL = 'contact@vokkado.com';
  const SUBJECT = 'Consulta desde Vokkado';
  const GMAIL_COMPOSE = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent(SUBJECT)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section className="relative min-h-screen flex items-center py-24 sm:py-32 overflow-hidden">
      {/* Fondo con gradiente sutil y decoraciones */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-friendlyWhite via-white to-[#f4f8ec]" />
        {/* Patrón decorativo sutil */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#22521D 1px, transparent 1px), linear-gradient(90deg, #22521D 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
        {/* Halos decorativos difuminados */}
        <div className="absolute -top-40 right-[-200px] w-96 h-96 rounded-full bg-primary-light/20 blur-3xl" />
        <div className="absolute -bottom-32 left-[-150px] w-80 h-80 rounded-full bg-primary-lightest/40 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center relative">
        {/* Título */}
        <h2 ref={titleRef} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-darkest mb-6 leading-tight">
          ¿Tenés alguna <span className="text-primary-dark">consulta?</span>
        </h2>

        {/* Descripción */}
        <p ref={descRef} className="text-lg sm:text-xl text-neutral-dark max-w-xl mx-auto mb-12 leading-relaxed">
          Ya sea una duda, sugerencia o simplemente quieras saber más sobre Vokkado, escribinos. Leemos cada mensaje y nos encanta escuchar a nuestros usuarios.
        </p>

        {/* Card principal */}
        <div ref={cardRef} className="group bg-white rounded-3xl border border-neutral-100 shadow-sm hover:shadow-2xl p-10 sm:p-12 flex flex-col items-center gap-8 transition-all duration-300 hover:border-primary-light/40">
          
          {/* Icono principal */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-primary-light/20 to-primary-light/10 flex items-center justify-center group-hover:from-primary-light/30 group-hover:to-primary-light/15 transition-all duration-300">
            <ion-icon name="mail-outline" style={{ fontSize: '40px', color: '#22521D' }} />
          </div>

          {/* Descripción */}
          <div>
            <p className="text-sm sm:text-base text-neutral-DEFAULT mb-3 font-medium">Mandanos un email a</p>
            <a
              href={GMAIL_COMPOSE}
              target="_blank"
              rel="noopener noreferrer"
              title={`Escribir a ${EMAIL} por Gmail`}
              className="text-2xl sm:text-3xl font-bold text-primary-dark hover:text-primary-light transition-colors duration-200 break-all"
            >
              {EMAIL}
            </a>
          </div>

          {/* Divisor visual */}
          <div className="w-12 h-px bg-neutral-200 group-hover:bg-primary-light/30 transition-colors duration-300" />

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <a
              href={GMAIL_COMPOSE}
              target="_blank"
              rel="noopener noreferrer"
              title={`Escribir a ${EMAIL} por Gmail`}
              className="inline-flex items-center justify-center gap-2.5 bg-primary-dark text-white font-semibold text-sm px-7 py-3.5 rounded-xl hover:bg-primary-DEFAULT hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap"
            >
              <ion-icon name="send-outline" style={{ fontSize: '16px' }} />
              Escribirnos
            </a>

            <button
              onClick={handleCopy}
              title={`Copiar email: ${EMAIL}`}
              className="inline-flex items-center justify-center gap-2.5 bg-neutral-50 text-neutral-dark font-semibold text-sm px-7 py-3.5 rounded-xl border border-neutral-200 hover:border-primary-light/50 hover:bg-primary-light/5 hover:text-primary-dark hover:scale-105 transition-all duration-200 whitespace-nowrap"
            >
              <ion-icon name={copied ? 'checkmark-done-outline' : 'copy-outline'} style={{ fontSize: '16px' }} />
              {copied ? '¡Copiado!' : 'Copiar email'}
            </button>
          </div>

        </div>

        {/* Mensaje de apoyo */}
        <p className="mt-12 text-sm text-neutral-dark/60">
          💡 Responderemos lo antes posible
        </p>

      </div>
    </section>
  );
};

export default ContactSection;
