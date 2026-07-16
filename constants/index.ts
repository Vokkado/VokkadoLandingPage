export { COLORS } from './colors';

export const SECTION_IDS = {
  home: 'inicio', // Matches Navbar and Hero section ID
  problem: 'el-problema', // ProblemSection: el problema que vive la persona
  transformation: 'transformacion', // TransformationSection: confusión → autonomía
  howItWorks: 'cómo-funciona', // Matches Navbar, HowItWorks section ID, and Hero scroll link
  participate: 'call-to-action', // Matches CallToAction section ID and Hero button target
  reviews: 'reseñas',
  contact: 'contacto',
};

export const APP_NAME = "Vokkado";

// sectionId vacío → el link navega a "/" directamente (igual que el logo)
export const NAV_LINKS = [
  { name: 'Inicio', href: '/', sectionId: '' },
];