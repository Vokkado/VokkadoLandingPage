import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { EVENTO_CONSENTIMIENTO, leerConsentimiento } from '../constants/consentimiento';

/**
 * Pixel de Meta, para medir las campañas de Instagram y Facebook.
 *
 * A diferencia de Analytics, acá no hay modo de consentimiento que permita
 * cargar el script sin cookies: el pixel escribe _fbp apenas arranca. Por eso
 * no se carga nada hasta que la persona acepta en el banner. Quien rechaza o
 * todavía no respondió no hace ni un pedido a connect.facebook.net.
 *
 * El identificador es el del conjunto de datos "Vokkado web" del portfolio
 * empresarial de Vokkado.
 */
const PIXEL_ID = '1106450378460374';

const SCRIPT_ID = 'meta-pixel';

/**
 * El stub oficial de Meta: guarda en una cola las llamadas que se hacen antes
 * de que baje fbevents.js y las reproduce cuando llega. Sin esto, el init y la
 * primera vista se pierden en las conexiones lentas.
 */
type Fbq = Window['fbq'];

function ensureFbq(): Fbq {
  if (window.fbq) return window.fbq;

  const cola: unknown[][] = [];
  const fbq = ((...args: unknown[]) => {
    if (fbq.callMethod) fbq.callMethod(...args);
    else cola.push(args);
  }) as unknown as Fbq;

  fbq.queue = cola;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';

  window.fbq = fbq;
  if (!window._fbq) window._fbq = fbq;

  return fbq;
}

const MetaPixel = () => {
  const { pathname, search } = useLocation();
  const cargado = useRef(false);

  /** Baja el script e inicializa. Devuelve true solo la primera vez. */
  const cargar = () => {
    if (cargado.current || document.getElementById(SCRIPT_ID)) {
      cargado.current = true;
      return false;
    }
    cargado.current = true;

    ensureFbq()('init', PIXEL_ID);

    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    script.async = true;
    script.id = SCRIPT_ID;
    document.head.appendChild(script);

    return true;
  };

  // Si la persona ya había aceptado en una visita anterior, se carga de entrada.
  useEffect(() => {
    if (leerConsentimiento() === 'aceptado') cargar();
  }, []);

  // Cuando responde el banner. Si acepta recién ahí, se carga y se cuenta la
  // vista de la pantalla en la que está, que si no se perdería.
  useEffect(() => {
    const alResponder = () => {
      if (leerConsentimiento() !== 'aceptado') {
        if (cargado.current) ensureFbq()('consent', 'revoke');
        return;
      }
      const primeraVez = cargar();
      if (primeraVez) ensureFbq()('track', 'PageView');
      else ensureFbq()('consent', 'grant');
    };
    window.addEventListener(EVENTO_CONSENTIMIENTO, alResponder);
    return () => window.removeEventListener(EVENTO_CONSENTIMIENTO, alResponder);
  }, []);

  // Una vista por ruta, igual que en Analytics. Con navegación de SPA el pixel
  // solo contaría la primera pantalla.
  useEffect(() => {
    if (!cargado.current) return;
    ensureFbq()('track', 'PageView');
  }, [pathname, search]);

  return null;
};

export default MetaPixel;
