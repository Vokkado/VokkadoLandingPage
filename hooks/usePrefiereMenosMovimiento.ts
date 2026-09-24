import { useEffect, useState } from 'react';

const CONSULTA = '(prefers-reduced-motion: reduce)';

/**
 * Si la persona pidió menos movimiento en su sistema. El CSS ya respeta esa
 * preferencia en las animaciones, pero lo que se mueve solo con JavaScript,
 * como el carrusel del hero, tiene que preguntarlo acá.
 */
export function usePrefiereMenosMovimiento(): boolean {
  const [prefiereMenos, setPrefiereMenos] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(CONSULTA).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(CONSULTA);
    const actualizar = () => setPrefiereMenos(mq.matches);
    actualizar();
    mq.addEventListener('change', actualizar);
    return () => mq.removeEventListener('change', actualizar);
  }, []);

  return prefiereMenos;
}
