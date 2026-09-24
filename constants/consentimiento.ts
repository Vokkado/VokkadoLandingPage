/**
 * La decisión de la persona sobre la medición, y nada más.
 *
 * Hasta que responda, Analytics arranca con el consentimiento denegado
 * (Consent Mode), así que no guarda ni lee cookies. Recién si acepta se
 * habilita `analytics_storage`. Publicidad y personalización quedan denegadas
 * siempre, porque el sitio no las usa.
 */

const CLAVE = 'vokkado:consentimiento';
export const EVENTO_CONSENTIMIENTO = 'vokkado:consentimiento';

export type Consentimiento = 'aceptado' | 'rechazado' | null;

export function leerConsentimiento(): Consentimiento {
  try {
    const v = localStorage.getItem(CLAVE);
    return v === 'aceptado' || v === 'rechazado' ? v : null;
  } catch {
    // Navegación privada o almacenamiento bloqueado: se trata como sin respuesta.
    return null;
  }
}

export function guardarConsentimiento(valor: Exclude<Consentimiento, null>) {
  try {
    localStorage.setItem(CLAVE, valor);
  } catch {
    // Si no se puede guardar, la decisión vale para esta visita igual.
  }
  window.dispatchEvent(new CustomEvent(EVENTO_CONSENTIMIENTO, { detail: valor }));
}

/** Borra la decisión guardada para que el banner vuelva a preguntar. */
export function reabrirConsentimiento() {
  try {
    localStorage.removeItem(CLAVE);
  } catch {
    // Si no se puede borrar, igual se avisa y el banner reaparece en esta visita.
  }
  window.dispatchEvent(new CustomEvent(EVENTO_CONSENTIMIENTO, { detail: null }));
}
