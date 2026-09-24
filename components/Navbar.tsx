import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../images/Logo.png';
import nutriWordmark from '../images/nutri/vokkado-nutri-wordmark-teal.webp';
import nutriWordmarkLight from '../images/nutri/vokkado-nutri-wordmark-light.webp';
import { NAV_LINKS } from '../constants';
import { claveRuta } from '../constants/seo';
import Icono from './common/Icono';

/**
 * Cada línea de la marca con sus clases escritas completas. Tailwind hace
 * purga mirando el código fuente como texto: si la clase no aparece literal
 * en ningún archivo, no existe en el CSS compilado.
 */
const ACENTO = {
  primary: {
    activo: 'text-primary-dark dark:text-primary-light',
    activoMobile: 'text-primary-dark dark:text-primary-light bg-primary-lightest dark:bg-white/10',
    hover: 'hover:text-primary dark:hover:text-primary-light',
    superficie: 'dark:bg-night',
  },
  nutri: {
    activo: 'text-nutri-dark dark:text-nutri-light',
    activoMobile: 'text-nutri-dark dark:text-nutri-light bg-nutri-lightest dark:bg-white/10',
    hover: 'hover:text-nutri dark:hover:text-nutri-light',
    superficie: 'dark:bg-nightNutri',
  },
} as const;

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Vokkado nutri tiene su propio color. Mientras estás en esa sección, la
  // barra lo toma: la marca sigue siendo la misma, cambia la línea.
  // Normalizada, porque GitHub Pages sirve las subpáginas con barra final y
  // quien entra desde Google aterriza en /nutricionistas/, no en /nutricionistas.
  const rutaActual = claveRuta(location.pathname);
  const isNutri = rutaActual === '/nutricionistas';
  // Las clases van escritas enteras a propósito: Tailwind lee el código como
  // texto plano, así que una clase armada por interpolación (`text-${x}-dark`)
  // nunca llega al CSS final.
  const acento = isNutri ? ACENTO.nutri : ACENTO.primary;

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeOpaque = window.scrollY > 20 || isMobileMenuOpen;
      if (isScrolled !== shouldBeOpaque) setIsScrolled(shouldBeOpaque);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen, isScrolled]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsScrolled(true);
    } else if (window.scrollY <= 20) {
      setIsScrolled(false);
    }
  }, [isMobileMenuOpen]);

  const handleNavLink = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);

    if (!sectionId) {
      // Link directo a la página principal (igual que el logo)
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // La superficie oscura también cambia de línea: verde en la landing,
  // teal en /nutricionistas. Así la barra nunca desentona con lo que tapa.
  const surface = acento.superficie;

  const navClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
    isScrolled ? `bg-white ${surface} shadow-lg dark:shadow-black/40` : 'bg-transparent dark:bg-transparent'
  }`;

  const linkClass = (activePath: string | null) => {
    const isActive = activePath ? rutaActual === activePath : rutaActual === '/';
    return `px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
      isActive
        ? `${acento.activo} font-bold`
        : `font-medium text-neutral-dark dark:text-white/75 ${acento.hover}`
    }`;
  };

  const mobileLinkClass = (activePath: string | null) => {
    const isActive = activePath ? rutaActual === activePath : rutaActual === '/';
    return `block px-3 py-2 rounded-md text-base transition-colors duration-200 ${
      isActive
        ? `${acento.activoMobile} font-bold`
        : `font-medium text-neutral-dark dark:text-white/75 ${acento.hover} hover:bg-neutral-light dark:hover:bg-white/5`
    }`;
  };

  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo. En la línea profesional manda el logotipo de Vokkado nutri. */}
          <Link to="/" className="flex items-center gap-3 pr-2">
            {/* El isotipo es el mismo en las dos líneas y ocupa el mismo lugar:
                solo cambia lo que va a su derecha. */}
            <img src={logo} alt="Logo" className="w-10 h-10 transition-transform duration-300 transform hover:rotate-[-5deg]" />
            {isNutri ? (
              <>
                <img src={nutriWordmark} alt="Vokkado nutri" className="h-7 w-auto dark:hidden" />
                <img src={nutriWordmarkLight} alt="" aria-hidden="true" className="h-7 w-auto hidden dark:block" />
              </>
            ) : (
              <span className="text-[28px] leading-none font-alan text-primary-dark dark:text-primary-light transition-colors duration-300 tracking-tight" style={{ fontWeight: 800 }}>
                Vokkado
              </span>
            )}
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavLink(e, link.sectionId)}
                className={linkClass(null)}
              >
                {link.name}
              </a>
            ))}
            <Link to="/equipo" className={linkClass('/equipo')}>
              Nosotros
            </Link>
            <Link to="/independencia" className={linkClass('/independencia')}>
              Nuestra promesa
            </Link>
            <Link to="/nutricionistas" className={linkClass('/nutricionistas')}>
              Nutricionistas
            </Link>
            <Link to="/contacto" className={linkClass('/contacto')}>
              Contacto
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-colors duration-300 text-neutral-dark dark:text-white/75 ${acento.hover}`}
              aria-label="Abrir menú principal"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Abrir menú principal</span>
              {isMobileMenuOpen
                ? <Icono name="close-outline" style={{ fontSize: '24px' }} />
                : <Icono name="menu-outline" style={{ fontSize: '24px' }} />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden bg-white ${surface} shadow-lg dark:shadow-black/40`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavLink(e, link.sectionId)}
                className={mobileLinkClass(null)}
              >
                {link.name}
              </a>
            ))}
            <Link to="/equipo" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass('/equipo')}>
              Nosotros
            </Link>
            <Link to="/independencia" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass('/independencia')}>
              Nuestra promesa
            </Link>
            <Link to="/nutricionistas" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass('/nutricionistas')}>
              Nutricionistas
            </Link>
            <Link to="/contacto" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass('/contacto')}>
              Contacto
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
