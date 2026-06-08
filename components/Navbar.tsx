import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../images/Logo.png';
import { NAV_LINKS, SECTION_IDS } from '../constants';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeOpaque = window.scrollY > 20 || isMobileMenuOpen;
      if (isScrolled !== shouldBeOpaque) {
        setIsScrolled(shouldBeOpaque);
      }
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


  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
    isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
  }`;

  const mobileIconColor = 'text-neutral-dark hover:text-primary-DEFAULT';

  // Returns classes for a nav link — active = verde + bold, inactive = gris normal
  const linkClass = (activePath: string | null) => {
    const isActive = activePath
      ? location.pathname === activePath
      : location.pathname === '/';
    return `px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
      isActive
        ? 'text-primary-dark font-bold'
        : 'font-medium text-neutral-dark hover:text-primary-DEFAULT'
    }`;
  };

  const mobileLinkClass = (activePath: string | null) => {
    const isActive = activePath
      ? location.pathname === activePath
      : location.pathname === '/';
    return `block px-3 py-2 rounded-md text-base transition-colors duration-200 ${
      isActive
        ? 'text-primary-dark font-bold bg-primary-lightest'
        : 'font-medium text-neutral-dark hover:text-primary-DEFAULT hover:bg-neutral-light'
    }`;
  };


  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="w-10 h-10 transition-transform duration-300 transform hover:rotate-[-5deg]" />
            <span className="text-xl font-alan text-primary-dark transition-colors duration-300 tracking-tight" style={{ fontWeight: 800 }}>
              Vokkado
            </span>
          </Link>

          
          <div className="hidden md:flex items-center space-x-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href="/#/"
                onClick={(e) => scrollToSection(e, link.sectionId)}
                className={linkClass(null)}
              >
                {link.name}
              </a>
            ))}
            <Link to="/equipo" className={linkClass('/equipo')}>
              Nosotros
            </Link>
            <Link to="/independencia" className={linkClass('/independencia')}>
              Independencia
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-colors duration-300 ${mobileIconColor}`}
              aria-label="Abrir menú principal"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Abrir menú principal</span>
              {isMobileMenuOpen ? (
                <ion-icon name="close-outline" style={{ fontSize: '24px' }} />
              ) : (
                <ion-icon name="menu-outline" style={{ fontSize: '24px' }} />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg"> {/* Mobile menu always has white background */}
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href="/#/"
                onClick={(e) => scrollToSection(e, link.sectionId)}
                className={mobileLinkClass(null)}
              >
                {link.name}
              </a>
            ))}
            <Link
              to="/equipo"
              onClick={() => setIsMobileMenuOpen(false)}
              className={mobileLinkClass('/equipo')}
            >
              Nosotros
            </Link>
            <Link
              to="/independencia"
              onClick={() => setIsMobileMenuOpen(false)}
              className={mobileLinkClass('/independencia')}
            >
              Independencia
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;