import React, { useState } from 'react';
import Button from './common/Button';

// ⚠️ IMPORTANTE: Reemplaza esta URL con la de tu Google Apps Script
// Instrucciones en: GOOGLE_SHEETS_SETUP.md
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxdYYtXQviNPw2BTESG12xhZm_DKMOoYV-C7ESPdbE8q0-N4VvhnOxqGku-Vpm5ouqigQ/exec';

interface PreRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PreRegisterModal: React.FC<PreRegisterModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Si no hay URL configurada, mostrar error
      if (!GOOGLE_SCRIPT_URL) {
        throw new Error('Google Script URL no configurada. Ver GOOGLE_SHEETS_SETUP.md');
      }

      console.log('Enviando datos:', {
        nombre: formData.name,
        email: formData.email
      });

      // Crear un FormData para enviar (alternativa a JSON que funciona mejor con CORS)
      const formDataToSend = new FormData();
      formDataToSend.append('nombre', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('timestamp', new Date().toISOString());

      // Usar fetch con redirect: 'follow' y mode: 'no-cors'
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formDataToSend,
        redirect: 'follow'
      });

      // Con no-cors no podemos leer la respuesta, pero si llegamos aquí sin error, asumimos éxito
      console.log('Datos enviados exitosamente (mode: no-cors)');
      
      setSubmitSuccess(true);
      
      // Track event con Google Analytics
      if (window.gtag) {
        window.gtag('event', 'pre_register_submit', {
          user_name: formData.name,
        });
      }

      // Resetear después de 2 segundos
      setTimeout(() => {
        setFormData({ name: '', email: '' });
        setSubmitSuccess(false);
        setError(null);
        onClose();
      }, 2000);

    } catch (err) {
      console.error('Error al enviar pre-registro:', err);
      setError('Hubo un error al enviar tu registro. Verifica tu conexión a internet.');
      setSubmitSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fade-in" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-dark hover:text-neutral-darkest transition-colors"
          aria-label="Cerrar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!submitSuccess ? (
          <>
            <h2 className="text-3xl font-bold text-primary-DEFAULT mb-2">
              ¡Pre-regístrate!
            </h2>
            <p className="text-neutral-dark mb-6">
              Sé de los primeros en conocer cuando lancemos ScanToEat.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}
              
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-neutral-darkest mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-neutral-light rounded-lg focus:outline-none focus:border-primary-DEFAULT transition-colors"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-neutral-darkest mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-neutral-light rounded-lg focus:outline-none focus:border-primary-DEFAULT transition-colors"
                  placeholder="tu@email.com"
                />
              </div>

              <Button
                type="submit"
                variant="secondary"
                size="md"
                className="w-full shadow-lg hover:shadow-xl transform hover:scale-105"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Pre-registrarme'}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-secondary-dark rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-primary-DEFAULT mb-2">
              ¡Gracias!
            </h3>
            <p className="text-neutral-dark">
              Te avisaremos cuando estemos listos.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreRegisterModal;
