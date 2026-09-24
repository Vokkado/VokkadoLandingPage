/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './index.tsx',
    './App.tsx',
    './components/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
    './constants/**/*.{ts,tsx}',
  ],
  // El oscuro lo decide el navegador, no un botón nuestro: las variantes
  // dark: se activan solas con prefers-color-scheme: dark.
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        alan: ['"Alan Sans"', 'sans-serif'],
        display: ['"Clash Display"', 'Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#5B8806',
          light: '#B8C445',
          dark: '#22521D',
          lightest: '#E8F0D4',
        },
        // Línea profesional (Vokkado nutri). El verde es la góndola,
        // el teal es el consultorio: mismo sistema, otro territorio.
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
        // Superficies del modo oscuro. Cada línea tiene las suyas, teñidas
        // con su propio color, así el oscuro no es un gris genérico sino
        // la misma marca con menos luz.
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
        // Ojo: al definir `neutral` acá se reemplaza la paleta numérica de
        // Tailwind entera. Por eso no existen neutral-100, neutral-200, etc.
        // Se usan estos nombres y nada más.
        neutral: {
          lightest: '#F9FAFB',
          light: '#F3F4F6',
          soft: '#E5E7EB',
          line: '#D1D5DB',
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
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in-down': 'fadeInDown 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in-left': 'fadeInLeft 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in-right': 'fadeInRight 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};
