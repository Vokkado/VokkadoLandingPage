import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import Icono from './common/Icono';

interface Pregunta {
  id: string;
  question: string;
  answer: string;
}

interface Categoria {
  categoria: string;
  preguntas: Pregunta[];
}

/**
 * Las preguntas son las mismas que se ven en la app, cargadas desde el admin.
 * No se piden a la API desde el navegador: un script las baja a public/faqs.json
 * (ver scripts/fetch-faqs.mjs), igual que con las reseñas. Así el sitio sigue
 * siendo estático y la página no depende de que la API esté arriba.
 */
const Faqs: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[] | null>(null);
  const [filtro, setFiltro] = useState('');
  const tituloAnim = useScrollAnimation({ animation: 'fade-up', threshold: 0.15 });

  useEffect(() => {
    fetch('/faqs.json')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setCategorias(Array.isArray(data?.categorias) ? data.categorias : []))
      .catch(() => setCategorias([]));
  }, []);

  const total = useMemo(
    () => (categorias ?? []).reduce((a, c) => a + c.preguntas.length, 0),
    [categorias]
  );

  const filtradas = useMemo(() => {
    const q = filtro.trim().toLowerCase();
    if (!q) return categorias ?? [];
    return (categorias ?? [])
      .map((c) => ({
        ...c,
        preguntas: c.preguntas.filter(
          (p) =>
            p.question.toLowerCase().includes(q) || p.answer.toLowerCase().includes(q)
        ),
      }))
      .filter((c) => c.preguntas.length > 0);
  }, [categorias, filtro]);

  const encontradas = filtradas.reduce((a, c) => a + c.preguntas.length, 0);

  /**
   * Datos estructurados de FAQ. Google los usa para mostrar las preguntas
   * desplegadas en los resultados, que es medio punto de la sección.
   */
  useEffect(() => {
    const ID = 'ld-faq';
    document.getElementById(ID)?.remove();
    if (!total) return;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = ID;
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: (categorias ?? []).flatMap((c) =>
        c.preguntas.map((p) => ({
          '@type': 'Question',
          name: p.question,
          acceptedAnswer: { '@type': 'Answer', text: p.answer },
        }))
      ),
    });
    document.head.appendChild(script);
    return () => { document.getElementById(ID)?.remove(); };
  }, [categorias, total]);

  return (
    <section className="relative pt-32 pb-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">

        <div ref={tituloAnim.ref} className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-darkest dark:text-white leading-tight mb-5">
            Preguntas <span className="text-primary-dark dark:text-primary-light">frecuentes</span>
          </h1>
          <p className="text-lg text-neutral-dark dark:text-white/75">
            Las mismas respuestas que vas a encontrar dentro de la app.
          </p>
        </div>

        {/* El buscador aparece recién cuando hay suficientes preguntas como para
            que buscar valga más que leer la lista entera. */}
        {total > 6 && (
          <div className="relative mb-10">
            <Icono
              name="search-outline"
              style={{ fontSize: '19px' }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral dark:text-white/50"
              aria-hidden="true"
            />
            <input
              type="search"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              placeholder="Buscar una pregunta"
              aria-label="Buscar entre las preguntas frecuentes"
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-night-card border border-neutral-soft dark:border-white/10 text-neutral-darkest dark:text-white placeholder:text-neutral dark:placeholder:text-white/40 focus:outline-none focus:border-primary-dark dark:focus:border-primary-light transition-colors duration-200"
            />
          </div>
        )}

        {/* Mientras carga no se muestra nada: el archivo es chico y local, y un
            esqueleto parpadeando molesta más de lo que informa. */}
        {categorias !== null && total === 0 && (
          <div className="text-center bg-white dark:bg-night-card rounded-3xl border border-neutral-light dark:border-white/10 p-10">
            <p className="text-neutral-dark dark:text-white/75 mb-6">
              Todavía no hay preguntas publicadas acá. Si tenés una, escribinos y te contestamos.
            </p>
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 bg-primary-dark dark:bg-primary-light text-white dark:text-night-deep font-semibold text-sm px-6 py-3 rounded-xl hover:bg-primary dark:hover:bg-primary-light/85 transition-colors duration-200"
            >
              Escribinos
            </Link>
          </div>
        )}

        {filtro && encontradas === 0 && total > 0 && (
          <p className="text-center text-neutral-dark dark:text-white/75 py-8" role="status">
            No encontramos nada con "{filtro}".{' '}
            <Link to="/contacto" className="text-primary-dark dark:text-primary-light font-semibold hover:underline">
              Preguntanos directamente
            </Link>
          </p>
        )}

        <div className="space-y-10">
          {filtradas.map((cat) => (
            <div key={cat.categoria}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-primary-dark dark:text-primary-light mb-4">
                {cat.categoria}
              </h2>

              <div className="space-y-3">
                {cat.preguntas.map((p) => (
                  /* <details> nativo: abre y cierra con teclado, lo entiende
                     cualquier lector de pantalla y funciona sin JavaScript. */
                  <details
                    key={p.id}
                    className="group bg-white dark:bg-night-card rounded-2xl border border-neutral-light dark:border-white/10 shadow-sm dark:shadow-black/30 overflow-hidden"
                  >
                    <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 text-base sm:text-lg font-semibold text-neutral-darkest dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark dark:focus-visible:ring-primary-light focus-visible:ring-inset rounded-2xl">
                      {p.question}
                      <Icono
                        name="chevron-down-outline"
                        style={{ fontSize: '20px' }}
                        className="flex-shrink-0 text-primary-dark dark:text-primary-light transition-transform duration-200 group-open:rotate-180"
                        aria-hidden="true"
                      />
                    </summary>
                    <div className="px-5 pb-5 -mt-1 text-neutral-dark dark:text-white/75 leading-relaxed whitespace-pre-line">
                      {p.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        {total > 0 && (
          <p className="text-center text-sm text-neutral dark:text-white/55 mt-12">
            ¿No estaba la tuya?{' '}
            <Link to="/contacto" className="text-primary-dark dark:text-primary-light font-semibold hover:underline">
              Escribinos
            </Link>
          </p>
        )}
      </div>
    </section>
  );
};

export default Faqs;
