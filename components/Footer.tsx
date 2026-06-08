import React from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../constants';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-darkest text-neutral-medium">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-semibold text-white">{APP_NAME}</span>
            </Link>
            <p className="mt-2 text-sm max-w-xs">
              Saber lo que comés, es cuidarte.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-4 text-sm font-semibold text-neutral-lightest uppercase">Recursos</h2>
              <ul className="space-y-3">
                <li><Link to="/" className="hover:text-primary-light transition-colors">Inicio</Link></li>
                <li><Link to="/equipo" className="hover:text-primary-light transition-colors">Nosotros</Link></li>
                <li><Link to="/independencia" className="hover:text-primary-light transition-colors">Nuestra Promesa</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-sm font-semibold text-neutral-lightest uppercase">Legal</h2>
              <ul className="space-y-3">
                <li>
                  <Link to="/politica-privacidad" className="hover:text-primary-light transition-colors">
                    Política de Privacidad
                  </Link>
                </li>
                <li>
                  <Link to="/eliminar-cuenta" className="hover:text-primary-light transition-colors">
                    Eliminar cuenta
                  </Link>
                </li>
                <li>
                  <Link to="/terminos-y-condiciones" className="hover:text-primary-light transition-colors">
                    Términos y Condiciones
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-sm font-semibold text-neutral-lightest uppercase">Síguenos</h2>
              <div className="flex space-x-4 mt-2">
                <a href="https://www.instagram.com/vokkado.uy" className="text-neutral-medium hover:text-primary-light transition-colors" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <ion-icon name="logo-instagram" style={{ fontSize: '24px' }} />
                </a>
                <a href="https://www.linkedin.com/company/vokkado" className="text-neutral-medium hover:text-primary-light transition-colors" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                  <ion-icon name="logo-linkedin" style={{ fontSize: '24px' }} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-neutral-dark sm:mx-auto lg:my-8" />
        <div className="text-center text-sm">
          &copy; {currentYear} <Link to="/" className="hover:underline">{APP_NAME}™</Link>. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};
