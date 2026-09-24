/**
 * Metadatos por ruta.
 *
 * Los buscadores que ejecutan JavaScript (Google) leen lo que este archivo
 * aplica al entrar a cada página. Los scrapers de redes (WhatsApp, Facebook,
 * LinkedIn) NO ejecutan JavaScript: esos leen las etiquetas estáticas que
 * están escritas a mano en index.html, que son las de la home.
 */

export const SITE_URL = 'https://vokkado.com';
export const OG_IMAGE = `${SITE_URL}/og-image.png`;

export interface PageMeta {
  title: string;
  description: string;
}

export const DEFAULT_META: PageMeta = {
  title: 'Vokkado, entendé lo que comés y elegí con confianza',
  description:
    'Escaneá cualquier producto del súper y Vokkado te dice si es apto para vos y por qué, según tus alergias, tu salud y tus objetivos. Gratis, y hecho en Uruguay.',
};

/** Título y descripción de la pantalla de ruta inexistente. */
export const NOT_FOUND_META: PageMeta = {
  title: 'Esta página no existe | Vokkado',
  description: 'El link que seguiste no lleva a ninguna página de Vokkado.',
};

export const PAGE_META: Record<string, PageMeta> = {
  '/': DEFAULT_META,
  '/equipo': {
    title: 'Nosotros, el equipo detrás de Vokkado',
    description:
      'Somos cuatro personas que creen que entender lo que comés no debería ser un privilegio. Conocé quiénes hacemos Vokkado y por qué nos importa.',
  },
  '/independencia': {
    title: 'Nuestra promesa de independencia | Vokkado',
    description:
      'Ninguna marca nos paga para salir mejor puntuada. Te contamos cómo se sostiene Vokkado y por qué tu análisis nunca depende de quién pagó.',
  },
  '/nutricionistas': {
    title: 'Vokkado nutri, tu consultorio en un solo lugar',
    description:
      'Turnos, historia clínica y seguimiento entre consultas. La plataforma de Vokkado para nutricionistas que quieren dedicarle el tiempo al paciente y no a la planilla.',
  },
  '/preguntas-frecuentes': {
    title: 'Preguntas frecuentes | Vokkado',
    description:
      'Las respuestas a lo que más nos preguntan sobre Vokkado: cómo funciona el escaneo, qué pasa con tus datos, cómo se arma tu perfil y qué significa cada resultado.',
  },
  '/contacto': {
    title: 'Contacto | Vokkado',
    description:
      'Dudas, sugerencias o ganas de saber más sobre Vokkado. Escribinos, leemos todos los mensajes.',
  },
  '/politica-privacidad': {
    title: 'Política de privacidad | Vokkado',
    description:
      'Qué datos guarda Vokkado, para qué los usa y cómo podés ejercer tus derechos sobre ellos.',
  },
  '/terminos-y-condiciones': {
    title: 'Términos y condiciones | Vokkado',
    description: 'Las condiciones de uso de la app y del sitio de Vokkado.',
  },
  '/eliminar-cuenta': {
    title: 'Eliminar tu cuenta | Vokkado',
    description:
      'Cómo pedir la eliminación de tu cuenta de Vokkado y de los datos asociados a ella.',
  },
};

/** Rutas que van al sitemap, en orden de importancia. */
export const INDEXABLE_PATHS = [
  '/',
  '/nutricionistas',
  '/equipo',
  '/independencia',
  '/preguntas-frecuentes',
  '/contacto',
  '/politica-privacidad',
  '/terminos-y-condiciones',
];
