import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import Icono from './common/Icono';

interface TeaserProps {
  title: string;
  desc: string;
  linkTo: string;
  linkText: string;
  badge?: string;
}

/**
 * Bloque CTA reutilizable — fondo verde claro, animaciones de scroll escalonadas.
 * Usado en Team (/equipo) y en Independencia (/independencia).
 */
const Teaser: React.FC<TeaserProps> = ({ title, desc, linkTo, linkText, badge }) => {
  const { ref: badgeRef } = useScrollAnimation({ animation: 'fade-up', threshold: 0.15 });
  const { ref: titleRef } = useScrollAnimation({ animation: 'fade-up', delay: 100, threshold: 0.15 });
  const { ref: descRef  } = useScrollAnimation({ animation: 'fade-up', delay: 200, threshold: 0.15 });
  const { ref: btnRef   } = useScrollAnimation({ animation: 'fade-up', delay: 300, threshold: 0.15 });

  return (
    <section className="py-14 dark:border-white/10 text-center">
      <div className="container mx-auto px-4">
        {badge && (
          <p ref={badgeRef} className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-dark/70 dark:text-primary-light/80 mb-3">
            {badge}
          </p>
        )}
        <h2 ref={titleRef} className="text-2xl sm:text-3xl font-bold text-neutral-darkest dark:text-white mb-3">
          {title}
        </h2>
        <p ref={descRef} className="text-neutral dark:text-white/65 mb-7 max-w-md mx-auto text-sm">
          {desc}
        </p>
        <div ref={btnRef}>
          <Link
            to={linkTo}
            className="inline-flex items-center gap-2 bg-primary-dark dark:bg-primary-light text-white dark:text-night-deep font-semibold text-sm px-6 py-3 rounded-xl hover:bg-primary dark:hover:bg-primary-light/85 hover:scale-105 transition-all duration-200 shadow-sm"
          >
            {linkText}
            <Icono name="arrow-forward-outline" style={{ fontSize: '16px' }} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Teaser;
