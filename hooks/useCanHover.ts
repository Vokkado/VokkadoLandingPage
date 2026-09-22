import { useEffect, useState } from 'react';

const CONSULTA = '(hover: hover) and (pointer: fine)';

/**
 * Si el dispositivo tiene un puntero de verdad. Se consulta en vivo, no una sola
 * vez: un iPad al que le enchufan un mouse, o una ventana que pasa a modo táctil,
 * cambian la respuesta y la interfaz tiene que acompañar.
 */
export function useCanHover(): boolean {
  const [puedeHover, setPuedeHover] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(CONSULTA).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(CONSULTA);
    const actualizar = () => setPuedeHover(mq.matches);
    actualizar();
    mq.addEventListener('change', actualizar);
    return () => mq.removeEventListener('change', actualizar);
  }, []);

  return puedeHover;
}
