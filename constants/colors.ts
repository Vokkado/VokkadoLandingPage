// ─── Paleta de colores centralizada de Vokkado ───
// Alineada con la paleta del frontend (ScanToEat-Frontend/src/theme/colors.ts)
// Modificá los valores acá y se actualizan en toda la landing.

export const COLORS = {
  primary: {
    DEFAULT: '#5B8806',
    light: '#B8C445',
    dark: '#22521D',
    lightest: '#E8F0D4',
  },
  // Línea profesional (Vokkado nutri). Ver componentes de /nutricionistas.
  nutri: {
    DEFAULT: '#146B63',
    light: '#6FC2B8',
    dark: '#0C4B45',
    lightest: '#E3F2EF',
  },
  secondary: {
    DEFAULT: '#885B02',
    light: '#A67A2E',
    dark: '#6B4801',
  },
  // Superficies del modo oscuro. Cada línea tiene las suyas, teñidas con su
  // propio color, así el oscuro no es un gris genérico sino la misma marca con
  // menos luz. Deben coincidir con las de tailwind.config en index.html.
  night: {
    DEFAULT: '#101A12',
    soft: '#131F15',
    deep: '#0C150E',
    card: '#18241A',
  },
  nightNutri: {
    DEFAULT: '#0E1A18',
    soft: '#10201D',
    deep: '#0B1513',
    card: '#152422',
  },
  alternative: '#A7BECE',
  neutral: {
    lightest: '#F9FAFB',
    light: '#F3F4F6',
    medium: '#9CA3AF',
    DEFAULT: '#6B7280',
    dark: '#374151',
    darkest: '#1F2937',
  },
  black: '#000000',
  white: '#FCFCFC',
  friendlyWhite: '#F1F1F1',
  dark: '#161616',
  grey: '#727272',
};
