import React, { useEffect, useState } from 'react';
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
  {
    id: 'fallback-4',
    source: 'google_play',
    author: 'Federico A.',
    rating: 5,
    title: null,
    text: 'App simple y clara. La uso cada vez que voy de compras para chequear los productos nuevos.',
    date: null,
  },
];

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
        style={{ fontSize: '14px', color: '#F5A623' }}
      />
    ))}
  </div>
);

const isEmoji = (str: string) => /^\p{Emoji}+$/u.test(str.replace(/\s/g, ''));

const initials = (name: string) => {
  if (isEmoji(name)) return '★';
  return (
    name
      .split(' ')
      .map((p) => p[0])
      .filter((c) => c && /\p{L}/u.test(c))
      .slice(0, 2)
      .join('')
      .toUpperCase() || '★'
  );
};

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
  <div className="shrink-0 w-[300px] sm:w-[320px] bg-white rounded-2xl shadow-sm border border-neutral-light p-5 flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0"
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
          <AppleLogo className="w-3 h-3 text-neutral-darkest" />
        ) : (
          <GooglePlayLogo className="w-3 h-3" />
        )}
        <span className="text-[10px] font-medium text-neutral-dark">{SOURCE_LABEL[review.source]}</span>
      </div>
    </div>
    <p className="text-sm text-neutral-dark leading-relaxed line-clamp-3">{review.text}</p>
  </div>
);

/* Fila de marquee que se mueve sola. `reverse` la hace ir en dirección opuesta. */
const MarqueeRow: React.FC<{ reviews: Review[]; reverse?: boolean }> = ({ reviews, reverse = false }) => {
  /* Duplicamos las cards para que el loop sea continuo */
  const doubled = [...reviews, ...reviews];
  return (
    <div className="overflow-hidden">
      <div className={`flex gap-5 w-max ${reverse ? 'marquee-reverse' : 'marquee'}`}>
        {doubled.map((review, i) => (
          <ReviewCard key={`${review.id}-${i}`} review={review} />
        ))}
      </div>
    </div>
  );
};

const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(FALLBACK_REVIEWS);
  const headerAnim = useScrollAnimation({ animation: 'fade-up', threshold: 0.2 });
  const rowsAnim = useScrollAnimation({ animation: 'fade-up', delay: 150, threshold: 0.1 });

  useEffect(() => {
    fetch('/reviews.json')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.reviews?.length) setReviews(data.reviews);
      })
      .catch(() => {});
  }, []);

  /* Fila 1: todas las reseñas en orden
     Fila 2: mismas reseñas pero rotadas a la mitad, así siempre se ven tarjetas distintas */
  const offset = Math.ceil(reviews.length / 2);
  const row1 = reviews;
  const row2 = [...reviews.slice(offset), ...reviews.slice(0, offset)];
  const safeRow2 = row2.length ? row2 : row1;

  return (
    <section id={SECTION_IDS.reviews} className="relative py-20 sm:py-28 overflow-hidden bg-friendlyWhite">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerAnim.ref} className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-darkest leading-tight">
            Personas que ya eligen <span className="text-primary-dark">con confianza</span>
          </h2>
          <p className="mt-5 text-lg text-neutral-dark">
            Reseñas reales, actualizadas automáticamente desde las tiendas.
          </p>
        </div>
      </div>

      {/* Las filas van de borde a borde, fuera del container */}
      <div ref={rowsAnim.ref} className="flex flex-col gap-5 px-6 sm:px-12 lg:px-24">
        <MarqueeRow reviews={row1} />
        <MarqueeRow reviews={safeRow2} reverse />
      </div>
    </section>
  );
};

export default ReviewsSection;
