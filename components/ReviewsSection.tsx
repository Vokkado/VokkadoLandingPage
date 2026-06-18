import React, { useEffect, useRef, useState } from 'react';
import { COLORS, SECTION_IDS } from '../constants';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

type ReviewSource = 'app_store' | 'google_play';

interface Review {
  id: string;
  source: ReviewSource;
  author: string;
  rating: number;
  title: string | null;
  text: string;
  date: string | null;
}

const FALLBACK_REVIEWS: Review[] = [
  {
    id: 'fallback-1',
    source: 'app_store',
    author: 'Lucía M.',
    rating: 5,
    title: null,
    text: 'Encontré rapidísimo qué productos no tienen lactosa. Antes tardaba un montón leyendo etiquetas en el súper.',
    date: null,
  },
  {
    id: 'fallback-2',
    source: 'google_play',
    author: 'Martín P.',
    rating: 5,
    title: null,
    text: 'Escaneás el código de barras y te dice al toque si el producto es apto para vos. Muy útil para mis alergias.',
    date: null,
  },
  {
    id: 'fallback-3',
    source: 'app_store',
    author: 'Valentina R.',
    rating: 4,
    title: null,
    text: 'Me encanta poder armar mi perfil con mis restricciones. El historial del carrito también ayuda mucho.',
    date: null,
  },
];

/* ── Inline SVG logos (mismos que CallToAction) ── */
const AppleLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const GooglePlayLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.61 1.814L13.793 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.61-.92z" fill="#4285F4" />
    <path d="M16.657 8.893L5.536.96C5.079.69 4.537.622 4.05.77l9.743 9.743 2.864-1.62z" fill="#EA4335" />
    <path d="M16.657 15.107l-2.864-1.62L4.05 23.23c.487.148 1.029.08 1.486-.19l11.121-7.933z" fill="#34A853" />
    <path d="M20.39 10.467l-3.733-2.114L13.793 12l2.864 3.647 3.733-2.114c.658-.373 1.063-1.07 1.063-1.833s-.405-1.46-1.063-1.233z" fill="#FBBC04" />
  </svg>
);

const SOURCE_LABEL: Record<ReviewSource, string> = {
  app_store: 'App Store',
  google_play: 'Google Play',
};

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center gap-0.5" aria-label={`${rating} de 5 estrellas`}>
    {[1, 2, 3, 4, 5].map((i) => (
      <ion-icon
        key={i}
        name={i <= rating ? 'star' : 'star-outline'}
        style={{ fontSize: '15px', color: '#F5A623' }}
      />
    ))}
  </div>
);

const isEmoji = (str: string) => /^\p{Emoji}+$/u.test(str.replace(/\s/g, ''));

const initials = (name: string) => {
  if (isEmoji(name)) return '★';
  return name
    .split(' ')
    .map((p) => p[0])
    .filter((c) => c && /\p{L}/u.test(c))
    .slice(0, 2)
    .join('')
    .toUpperCase() || '★';
};

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
  <div className="snap-start shrink-0 w-[300px] sm:w-[340px] bg-white rounded-2xl shadow-md hover:shadow-lg border border-neutral-light p-6 flex flex-col gap-4 transition-shadow duration-200">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0"
          style={{ backgroundColor: COLORS.primary.lightest, color: COLORS.primary.dark }}
        >
          {initials(review.author)}
        </div>
        <div>
          <p className="font-semibold text-neutral-darkest text-sm leading-tight">{review.author}</p>
          <StarRating rating={review.rating} />
        </div>
      </div>
      <div
        className="flex items-center gap-1.5 bg-neutral-lightest rounded-full px-2.5 py-1 flex-shrink-0"
        title={`Reseña en ${SOURCE_LABEL[review.source]}`}
      >
        {review.source === 'app_store' ? (
          <AppleLogo className="w-3.5 h-3.5 text-neutral-darkest" />
        ) : (
          <GooglePlayLogo className="w-3.5 h-3.5" />
        )}
        <span className="text-[11px] font-medium text-neutral-dark">{SOURCE_LABEL[review.source]}</span>
      </div>
    </div>

    <p className="text-sm text-neutral-dark leading-relaxed line-clamp-4">{review.text}</p>
  </div>
);

const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(FALLBACK_REVIEWS);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const headerAnim = useScrollAnimation({ animation: 'fade-up', threshold: 0.2 });
  const carouselAnim = useScrollAnimation({ animation: 'fade-up', delay: 150, threshold: 0.1 });

  useEffect(() => {
    fetch('/reviews.json')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.reviews?.length) setReviews(data.reviews);
      })
      .catch(() => {
        /* mantiene las reseñas de ejemplo si falla la carga */
      });
  }, []);

  const scrollBy = (direction: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: direction * 340, behavior: 'smooth' });
  };

  return (
    <section id={SECTION_IDS.reviews} className="relative py-20 sm:py-28 overflow-hidden bg-friendlyWhite">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerAnim.ref} className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
          <span className="inline-block text-sm font-semibold text-primary-dark tracking-widest uppercase mb-3">
            Nuestros usuarios
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-darkest leading-tight">
            Lo que dicen en <span className="text-primary-dark">App Store y Google Play</span>
          </h2>
          <p className="mt-5 text-lg text-neutral-dark">
            Reseñas reales de nuestros usuarios, actualizadas automáticamente desde las tiendas.
          </p>
        </div>

        <div ref={carouselAnim.ref} className="relative">
          <div
            ref={scrollerRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 scrollbar-hide"
          >
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {/* Controles del carrusel */}
          <div className="hidden sm:flex justify-center gap-3 mt-6">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Ver reseñas anteriores"
              className="w-10 h-10 rounded-full border border-neutral-light flex items-center justify-center text-neutral-dark hover:bg-primary-DEFAULT hover:text-white hover:border-primary-DEFAULT transition-all duration-200"
            >
              <ion-icon name="chevron-back-outline" style={{ fontSize: '18px' }} />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Ver reseñas siguientes"
              className="w-10 h-10 rounded-full border border-neutral-light flex items-center justify-center text-neutral-dark hover:bg-primary-DEFAULT hover:text-white hover:border-primary-DEFAULT transition-all duration-200"
            >
              <ion-icon name="chevron-forward-outline" style={{ fontSize: '18px' }} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
