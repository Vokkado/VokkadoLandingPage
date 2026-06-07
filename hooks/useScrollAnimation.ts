import { useEffect, useRef, type RefObject } from 'react';

type AnimationType = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale';

interface ScrollAnimationOptions {
  animation?: AnimationType;
  threshold?: number;
  delay?: number;
  once?: boolean;
}

const ANIMATION_CLASSES: Record<AnimationType, string> = {
  'fade-up': 'scroll-fade-up',
  'fade-down': 'scroll-fade-down',
  'fade-left': 'scroll-fade-left',
  'fade-right': 'scroll-fade-right',
  'scale': 'scroll-scale-in',
};

/**
 * Hook que observa un elemento y le agrega/quita una clase CSS
 * cuando entra al viewport. Todo manejado por CSS, sin re-renders.
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: ScrollAnimationOptions = {}
) {
  const { threshold = 0.15, delay = 0, once = true, animation = 'fade-up' } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Aplica la clase base que lo oculta
    el.classList.add(ANIMATION_CLASSES[animation]);

    // Pone el delay como CSS variable
    if (delay > 0) {
      el.style.transitionDelay = `${delay}ms`;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('scroll-visible');
            if (once) {
              observer.unobserve(el);
              // Reset delay after the entrance animation finishes
              // so hover transitions are instantaneous and in sync
              setTimeout(() => {
                el.style.transitionDelay = '0ms';
              }, delay + 750);
            }
          } else if (!once) {
            el.classList.remove('scroll-visible');
          }
        });
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animation, delay, once, threshold]);

  return { ref: ref as RefObject<T> };
}
