export { COLORS } from './colors';

export const SECTION_IDS = {
  home: 'inicio', // Matches Navbar and Hero section ID
  howItWorks: 'cómo-funciona', // Matches Navbar, HowItWorks section ID, and Hero scroll link
  participate: 'call-to-action', // Matches CallToAction section ID and Hero button target
};

export const APP_NAME = "Vokkado";

export const NAV_LINKS = [
  { name: 'Inicio', href: `#${SECTION_IDS.home}`, sectionId: SECTION_IDS.home },
  { name: 'Cómo Funciona', href: `#${SECTION_IDS.howItWorks}`, sectionId: SECTION_IDS.howItWorks },
];