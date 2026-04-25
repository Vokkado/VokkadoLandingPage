import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const GOOGLE_SCRIPT_URL = 'https://vercel-proxy-landing.vercel.app/api/preregister';

interface PreRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PreRegisterModal: React.FC<PreRegisterModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    acceptsTerms: false,
    acceptsPrivacy: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showValidation, setShowValidation] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowValidation(true);
    setError(null);

    if (!formData.acceptsTerms || !formData.acceptsPrivacy) return;

    setIsSubmitting(true);

    try {
      if (!formData.name.trim()) { setError('Por favor, ingresá tu nombre.'); setIsSubmitting(false); return; }
      if (!formData.email.trim()) { setError('Por favor, ingresá tu email.'); setIsSubmitting(false); return; }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) { setError('Por favor, ingresá un email válido.'); setIsSubmitting(false); return; }

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: formData.name, email: formData.email }),
      });
      const data = await response.json();

      if (data.result === 'success') {
        setSubmitSuccess(true);
        if (window.gtag) { window.gtag('event', 'pre_register_submit', { user_name: formData.name }); }
        setTimeout(() => {
          setFormData({ name: '', email: '', acceptsTerms: false, acceptsPrivacy: false });
          setSubmitSuccess(false);
          setError(null);
          onClose();
        }, 2500);
      } else {
        setError(data.error || 'Error desconocido.');
      }
    } catch {
      setError('Hubo un error de conexión. Intentá nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backgroundColor: 'rgba(0,0,0,0.6)' }}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full animate-fade-in-up"
        style={{ maxWidth: '480px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {!submitSuccess ? (
          <div className="p-5 sm:p-7" style={{ position: 'relative' }}>
            {/* Cerrar */}
            <button
              onClick={onClose}
              className="flex items-center justify-center rounded-full hover:bg-neutral-lightest transition-all bg-transparent border-0 cursor-pointer"
              style={{ position: 'absolute', top: '16px', right: '16px', width: '32px', height: '32px', zIndex: 10, color: '#666' }}
              aria-label="Cerrar"
            >
              <ion-icon name="close-outline" style={{ fontSize: '22px' }} />
            </button>

            {/* Título con acento verde */}
            <div className="mb-5 pr-10">
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-darkest">Vokkado en iOS</h2>
              <p className="text-sm text-neutral-DEFAULT mt-1">
                Estamos trabajando para que <span style={{ color: '#5B8806' }}>Vokkado</span> esté disponible en App Store. Mientras tanto,
                podés unirte al acceso anticipado para recibir novedades y ser de los primeros en probar Vokkado en iOS.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-xs">{error}</div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-neutral-darkest mb-1.5">Nombre</label>
                <input
                  type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-light rounded-lg focus:outline-none focus:border-primary-dark focus:ring-1 focus:ring-primary-dark/30 transition-all text-sm sm:text-base text-neutral-darkest bg-white"
                  style={{ color: '#1a1a1a' }}
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-neutral-darkest mb-1.5">Email</label>
                <input
                  type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-light rounded-lg focus:outline-none focus:border-primary-dark focus:ring-1 focus:ring-primary-dark/30 transition-all text-sm sm:text-base text-neutral-darkest bg-white"
                  style={{ color: '#1a1a1a' }}
                  placeholder="tu@email.com"
                />
              </div>

              <div className="space-y-1.5 pt-0.5">
                <label htmlFor="acceptsTerms" className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" id="acceptsTerms" name="acceptsTerms" checked={formData.acceptsTerms} onChange={handleChange}
                    className={`flex-shrink-0 mt-0.5 h-4 w-4 rounded cursor-pointer accent-primary-DEFAULT ${showValidation && !formData.acceptsTerms ? 'ring-2 ring-red-400 ring-offset-1' : ''}`}
                  />
                  <span className="text-xs sm:text-sm text-neutral-dark leading-relaxed">
                    Acepto que mi email sea usado para recibir novedades y ser notificado del lanzamiento.
                  </span>
                </label>
                <label htmlFor="acceptsPrivacy" className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" id="acceptsPrivacy" name="acceptsPrivacy" checked={formData.acceptsPrivacy} onChange={handleChange}
                    className={`flex-shrink-0 mt-0.5 h-4 w-4 rounded cursor-pointer accent-primary-DEFAULT ${showValidation && !formData.acceptsPrivacy ? 'ring-2 ring-red-400 ring-offset-1' : ''}`}
                  />
                  <span className="text-xs sm:text-sm text-neutral-dark leading-relaxed">
                    He leído y acepto la{' '}
                    <Link to="/politica-privacidad" target="_blank" className="text-primary-DEFAULT hover:text-primary-dark font-semibold underline underline-offset-2" onClick={(e) => e.stopPropagation()}>
                      Política de Privacidad
                    </Link>.
                  </span>
                </label>
              </div>

              {showValidation && (!formData.acceptsTerms || !formData.acceptsPrivacy) && (
                <p className="text-red-500 text-[11px] text-center">
                  {!formData.acceptsTerms && !formData.acceptsPrivacy ? 'Debes aceptar ambas casillas' : !formData.acceptsTerms ? 'Debes aceptar recibir novedades' : 'Debes aceptar la Política de Privacidad'}
                </p>
              )}

              <button type="submit" disabled={isSubmitting}
                className="w-full py-3 font-bold rounded-lg text-base active:scale-[0.98] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed text-sm cursor-pointer"
                style={{ backgroundColor: '#5B8806', color: 'white', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#4a7005')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#5B8806')}
              >
                {isSubmitting ? 'Enviando...' : 'Pre-registrarme'}
              </button>
            </form>
          </div>
        ) : (
          <div className="p-6 py-10 text-center" style={{ position: 'relative' }}>
            <button
              onClick={onClose}
              className="flex items-center justify-center rounded-full hover:bg-neutral-lightest transition-all bg-transparent border-0 cursor-pointer"
              style={{ position: 'absolute', top: '16px', right: '16px', width: '32px', height: '32px', color: '#666' }}
              aria-label="Cerrar"
            >
              <ion-icon name="close-outline" style={{ fontSize: '22px' }} />
            </button>
            <div className="w-14 h-14 bg-primary-DEFAULT rounded-full flex items-center justify-center mx-auto mb-3">
              <ion-icon name="checkmark-outline" style={{ fontSize: '28px', color: 'white' }} />
            </div>
            <h3 className="text-xl font-bold text-neutral-darkest mb-1">¡Gracias!</h3>
            <p className="text-neutral-dark text-sm">Te avisaremos cuando estemos listos.</p>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default PreRegisterModal;
