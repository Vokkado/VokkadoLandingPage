import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import Icono from './common/Icono';

const ContactSection: React.FC = () => {
  const { ref: titleRef } = useScrollAnimation({ animation: 'fade-up', threshold: 0.15 });
  const { ref: descRef  } = useScrollAnimation({ animation: 'fade-up', delay: 200, threshold: 0.15 });
  const { ref: cardRef  } = useScrollAnimation({ animation: 'fade-up', delay: 300, threshold: 0.15 });

  const [copied, setCopied] = useState(false);

  const EMAIL = 'contact@vokkado.com';
  const SUBJECT = 'Consulta desde Vokkado';
  // La acción principal es mailto: abre el cliente de correo que la persona
  // realmente usa. Antes esto mandaba a la pantalla de redacción de Gmail, así
  // que quien usa Outlook, Apple Mail o el correo del trabajo caía en un login
  // ajeno. Gmail queda como alternativa, para quien lo prefiera.
  const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}`;
  const GMAIL_COMPOSE = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent(SUBJECT)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-24 sm:py-32 overflow-hidden">
      {/* Mismo fondo que el resto de la landing: un gradiente y nada más */}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center relative">
        {/* Título */}
        <h2 ref={titleRef} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-darkest dark:text-white mb-6 leading-tight">
          ¿Tenés alguna <span className="text-primary-dark dark:text-primary-light">consulta?</span>
        </h2>

        {/* Descripción */}
        <p ref={descRef} className="text-lg sm:text-xl text-neutral-dark dark:text-white/75 max-w-xl mx-auto mb-12 leading-relaxed">
          Ya sea una duda, sugerencia o simplemente quieras saber más sobre Vokkado, escribinos. Leemos cada mensaje y nos encanta escuchar a nuestros usuarios.
        </p>

        {/* Card principal */}
        <div ref={cardRef} className="group bg-white dark:bg-night-card rounded-3xl border border-neutral-light dark:border-white/10 shadow-sm hover:shadow-2xl dark:shadow-black/30 p-10 sm:p-12 flex flex-col items-center gap-8 transition-all duration-300 hover:border-primary-light/40">
          
          {/* Icono principal */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-primary-light/20 to-primary-light/10 flex items-center justify-center group-hover:from-primary-light/30 group-hover:to-primary-light/15 transition-all duration-300">
            <Icono name="mail-outline" style={{ fontSize: '40px' }} className="text-primary-dark dark:text-primary-light" />
          </div>

          {/* Descripción */}
          <div>
            <p className="text-sm sm:text-base text-neutral dark:text-white/65 mb-3 font-medium">Mandanos un email a</p>
            <a
              href={MAILTO}
              title={`Escribir a ${EMAIL}`}
              className="text-2xl sm:text-3xl font-bold text-primary-dark dark:text-primary-light hover:text-primary-light dark:hover:text-primary transition-colors duration-200 break-all"
            >
              {EMAIL}
            </a>
          </div>

          {/* Divisor visual */}
          <div className="w-12 h-px bg-neutral-soft dark:bg-white/15 group-hover:bg-primary-light/30 transition-colors duration-300" />

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <a
              href={MAILTO}
              title={`Escribir a ${EMAIL}`}
              className="inline-flex items-center justify-center gap-2.5 bg-primary-dark dark:bg-primary-light text-white dark:text-night-deep font-semibold text-sm px-7 py-3.5 rounded-xl hover:bg-primary dark:hover:bg-primary-light/85 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap"
            >
              <Icono name="send-outline" style={{ fontSize: '16px' }} />
              Escribirnos
            </a>

            <button
              onClick={handleCopy}
              title={`Copiar email: ${EMAIL}`}
              className="inline-flex items-center justify-center gap-2.5 bg-neutral-lightest dark:bg-white/5 text-neutral-dark dark:text-white/75 font-semibold text-sm px-7 py-3.5 rounded-xl border border-neutral-soft dark:border-white/10 hover:border-primary-light/50 hover:bg-primary-light/5 dark:hover:bg-primary-light/10 hover:text-primary-dark dark:hover:text-primary-light hover:scale-105 transition-all duration-200 whitespace-nowrap"
            >
              <Icono name={copied ? 'checkmark-done-outline' : 'copy-outline'} style={{ fontSize: '16px' }} />
              {copied ? '¡Copiado!' : 'Copiar email'}
            </button>
          </div>

        </div>

        {/* Mensaje de apoyo */}
        <p className="mt-8 text-sm text-neutral dark:text-white/55">
          ¿Usás Gmail en el navegador?{' '}
          <a
            href={GMAIL_COMPOSE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-dark dark:text-primary-light font-semibold hover:underline"
          >
            Escribinos desde ahí
          </a>
        </p>

        <p className="mt-6 text-sm text-neutral-dark/60 dark:text-white/50">
          Te respondemos lo antes posible.
        </p>

      </div>
    </section>
  );
};

export default ContactSection;
