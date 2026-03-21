import { useEffect, useRef } from 'react';

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
            if (once) observer.unobserve(el);
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

  return { ref };
}
