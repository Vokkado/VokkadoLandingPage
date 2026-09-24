import path from 'path';
import { defineConfig } from 'vite';

// Acá había un `define` que metía GEMINI_API_KEY en el bundle del cliente.
// La landing no usa Gemini, y todo lo que se define así queda escrito en
// texto plano dentro del JS público. Si alguna vez hace falta una clave, va
// del lado del servidor, nunca acá.
export default defineConfig(() => {
  return {
    base: '/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
