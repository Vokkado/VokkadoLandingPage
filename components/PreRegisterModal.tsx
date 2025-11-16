import React, { useState } from 'react';
import Button from './common/Button';

// ⚠️ IMPORTANTE: Reemplaza esta URL con la de tu Google Apps Script
// Instrucciones en: GOOGLE_SHEETS_SETUP.md
const GOOGLE_SCRIPT_URL = 'https://vercel-proxy-landing.vercel.app/api/preregister';

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
    if (!GOOGLE_SCRIPT_URL) {
      throw new Error('Google Script URL no configurada.');
    }

    console.log("Enviando datos:", {
      nombre: formData.name,
      email: formData.email,
    });

    // Enviar JSON (NO FormData)
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre: formData.name,
        email: formData.email,
      })
    });

    const data = await response.json();
    console.log("Respuesta del servidor:", data);

    if (data.result === "success") {
      setSubmitSuccess(true);

      if (window.gtag) {
        window.gtag("event", "pre_register_submit", {
          user_name: formData.name,
        });
      }

      setTimeout(() => {
        setFormData({ name: "", email: "" });
        setSubmitSuccess(false);
        setError(null);
        onClose();
      }, 2000);

    } else {
      setError(data.error || "Error desconocido.");
    }

  } catch (err) {
    console.error("Error enviando pre-registro:", err);
    setError("Hubo un error de conexión. Intentá nuevamente.");
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
