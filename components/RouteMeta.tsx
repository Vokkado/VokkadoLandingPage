import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { claveRuta, NOT_FOUND_META, OG_IMAGE, PAGE_META, urlCanonica } from '../constants/seo';

/** Crea la etiqueta si no existe y le pone el contenido. */
const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const setCanonical = (href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
};

/**
 * Mantiene el título, la descripción y las etiquetas sociales en sintonía con
 * la ruta actual. Va adentro del Router, sin renderizar nada.
 */
const RouteMeta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // GitHub Pages sirve las subpáginas con barra final, así que quien entra
    // desde Google aterriza en /equipo/ y no en /equipo. Sin normalizar, esa
    // visita no encontraría sus metadatos y se marcaría como noindex.
    const clave = claveRuta(pathname);
    const conocida = PAGE_META[clave];
    const meta = conocida ?? NOT_FOUND_META;
    const url = urlCanonica(pathname);

    document.title = meta.title;
    setMeta('name', 'description', meta.description);
    setCanonical(url);

    setMeta('property', 'og:title', meta.title);
    setMeta('property', 'og:description', meta.description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', OG_IMAGE);

    setMeta('name', 'twitter:title', meta.title);
    setMeta('name', 'twitter:description', meta.description);
    setMeta('name', 'twitter:image', OG_IMAGE);

    // Las páginas legales y la de borrar cuenta no aportan nada en resultados
    // de búsqueda, pero tienen que seguir siendo accesibles para las tiendas.
    const noIndex = !conocida || clave === '/eliminar-cuenta';
    setMeta('name', 'robots', noIndex ? 'noindex, follow' : 'index, follow');

    // La barra del navegador toma el color de la línea en la que estás: verde
    // en la landing, teal en la plataforma profesional.
    setMeta('name', 'theme-color', clave === '/nutricionistas' ? '#0C4B45' : '#22521D');
  }, [pathname]);

  return null;
};

export default RouteMeta;
