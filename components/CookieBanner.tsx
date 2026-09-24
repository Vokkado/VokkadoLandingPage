import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { EVENTO_CONSENTIMIENTO, guardarConsentimiento, leerConsentimiento } from '../constants/consentimiento';

/**
 * Antes Analytics cargaba en el head, sin preguntar nada. Ahora la medición
 * arranca denegada y esto es lo que la habilita, solo si la persona dice que sí.
 *
 * Las dos opciones pesan igual a propósito: un "rechazar" escondido o en gris
 * no es una elección, es un trámite.
 */
const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Se muestra solo si todavía no respondió.
    const revisar = () => setVisible(leerConsentimiento() === null);
    revisar();
    // Y vuelve a aparecer si desde el pie piden cambiar la decisión.
    window.addEventListener(EVENTO_CONSENTIMIENTO, revisar);
    return () => window.removeEventListener(EVENTO_CONSENTIMIENTO, revisar);
  }, []);

  if (!visible) return null;

  const responder = (valor: 'aceptado' | 'rechazado') => {
    guardarConsentimiento(valor);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Preferencias de medición"
      className="fixed bottom-0 left-0 right-0 z-[60] p-3 sm:p-4"
    >
      <div className="container mx-auto max-w-3xl bg-white dark:bg-night-card border border-neutral-soft dark:border-white/10 rounded-2xl shadow-lg dark:shadow-black/50 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-5">
        <p className="text-sm text-neutral-dark dark:text-white/75 leading-relaxed flex-grow">
          Medimos cómo se usa el sitio para mejorarlo. Sin publicidad ni terceros.{' '}
          <Link
            to="/politica-privacidad"
            className="text-primary-dark dark:text-primary-light font-semibold hover:underline"
          >
            Cómo tratamos tus datos
          </Link>
        </p>

        <div className="flex gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={() => responder('rechazado')}
            className="flex-1 sm:flex-none px-5 py-3 rounded-xl text-sm font-semibold text-neutral-dark dark:text-white/75 bg-neutral-lightest dark:bg-white/5 border border-neutral-soft dark:border-white/15 hover:bg-neutral-light dark:hover:bg-white/10 transition-colors duration-200"
          >
            Rechazar
          </button>
          <button
            type="button"
            onClick={() => responder('aceptado')}
            className="flex-1 sm:flex-none px-5 py-3 rounded-xl text-sm font-semibold text-white dark:text-night-deep bg-primary-dark dark:bg-primary-light hover:bg-primary dark:hover:bg-primary-light/85 transition-colors duration-200"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
