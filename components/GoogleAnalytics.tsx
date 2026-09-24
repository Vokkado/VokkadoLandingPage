import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { EVENTO_CONSENTIMIENTO, leerConsentimiento } from '../constants/consentimiento';

/**
 * Único lugar donde se carga Google Analytics.
 *
 * Antes había dos: un snippet suelto en index.html con una propiedad y este
 * componente con otra. Eso cargaba gtag dos veces y partía la medición entre
 * dos propiedades, ninguna con los datos completos. Ahora se carga una sola
 * vez y el evento se manda a las dos.
 */
const MEASUREMENT_IDS = ['G-1WR8Q02XH9', 'G-Y8NKT8RHB8'];

const SCRIPT_ID = 'ga-gtag';

/**
 * gtag necesita recibir el objeto `arguments`, no un array. Con un array la
 * librería no reconoce la forma del comando y el evento se pierde en silencio,
 * que es lo que venía pasando.
 */
function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
  }
  return window.gtag;
}

const GoogleAnalytics = () => {
  const { pathname, search } = useLocation();
  const cargado = useRef(false);

  // Carga del script, una sola vez en toda la vida de la página.
  useEffect(() => {
    if (cargado.current || document.getElementById(SCRIPT_ID)) {
      cargado.current = true;
      return;
    }
    cargado.current = true;

    const gtag = ensureGtag();

    // Consent Mode. Se declara ANTES de configurar las propiedades: hasta que
    // la persona responda el banner, gtag no escribe ni lee cookies. Anuncios
    // y personalización quedan denegados siempre, el sitio no los usa.
    const yaRespondio = leerConsentimiento();
    gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: yaRespondio === 'aceptado' ? 'granted' : 'denied',
    });

    gtag('js', new Date());

    // send_page_view en false porque la vista la mandamos nosotros en cada
    // cambio de ruta. Si no, la primera se contaría dos veces.
    MEASUREMENT_IDS.forEach((id) => {
      gtag('config', id, { send_page_view: false });
    });

    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_IDS[0]}`;
    script.async = true;
    script.id = SCRIPT_ID;
    document.head.appendChild(script);
  }, []);

  // Cuando la persona responde el banner, se le avisa a gtag en el momento,
  // sin recargar la página.
  useEffect(() => {
    const alResponder = () => {
      ensureGtag()('consent', 'update', {
        analytics_storage: leerConsentimiento() === 'aceptado' ? 'granted' : 'denied',
      });
    };
    window.addEventListener(EVENTO_CONSENTIMIENTO, alResponder);
    return () => window.removeEventListener(EVENTO_CONSENTIMIENTO, alResponder);
  }, []);

  // Una vista por ruta. Sin esto, con navegación de SPA solo se medía la
  // primera pantalla y /equipo, /nutricionistas y el resto nunca aparecían.
  useEffect(() => {
    const gtag = ensureGtag();
    gtag('event', 'page_view', {
      page_path: `${pathname}${search}`,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, search]);

  return null;
};

export default GoogleAnalytics;
