import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

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
    <section className="py-14 bg-[#f4f8ec] border-t border-primary-light/20 text-center">
      <div className="container mx-auto px-4">
        {badge && (
          <p ref={badgeRef} className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-dark/70 mb-3">
            {badge}
          </p>
        )}
        <h2 ref={titleRef} className="text-2xl sm:text-3xl font-bold text-neutral-darkest mb-3">
          {title}
        </h2>
        <p ref={descRef} className="text-neutral-DEFAULT mb-7 max-w-md mx-auto text-sm">
          {desc}
        </p>
        <div ref={btnRef}>
          <Link
            to={linkTo}
            className="inline-flex items-center gap-2 bg-primary-dark text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-primary-DEFAULT hover:scale-105 transition-all duration-200 shadow-sm"
          >
            {linkText}
            <ion-icon name="arrow-forward-outline" style={{ fontSize: '16px' }} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Teaser;
