import React from 'react';
import { ICONOS } from './iconos';

interface IconoProps {
  /** Mismo nombre que usaba ion-icon, por ejemplo "cart-outline". */
  name: string;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

/**
 * Reemplaza al viejo ion-icon. Misma forma de llamarlo, pero el dibujo sale del
 * bundle en vez de pedirse a un CDN.
 *
 * El tamaño se sigue pasando por `style={{ fontSize: '20px' }}`, como antes,
 * porque el svg mide 1em. Así no hubo que tocar ninguna llamada.
 *
 * Por defecto es decorativo (aria-hidden). Un icono que sí comunica algo lleva
 * `title`, y ahí pasa a anunciarse.
 */
const Icono: React.FC<IconoProps> = ({ name, className, style, title, 'aria-hidden': ariaHidden }) => {
  const contenido = ICONOS[name];

  if (!contenido) {
    // Mejor un hueco del tamaño correcto que romper el layout.
    if (import.meta.env.DEV) console.warn(`[Icono] No existe "${name}" en iconos.ts`);
    return <span className={className} style={{ display: 'inline-block', width: '1em', height: '1em', ...style }} />;
  }

  const decorativo = title ? undefined : true;

  return (
    <svg
      viewBox="0 0 512 512"
      className={className}
      style={{ width: '1em', height: '1em', display: 'inline-block', flexShrink: 0, ...style }}
      fill="currentColor"
      role={title ? 'img' : undefined}
      aria-hidden={ariaHidden ?? decorativo}
      focusable="false"
      dangerouslySetInnerHTML={{
        __html: (title ? `<title>${title}</title>` : '') + contenido,
      }}
    />
  );
};

export default Icono;
