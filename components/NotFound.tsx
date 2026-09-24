import React from 'react';
import { Link } from 'react-router-dom';
import Icono from './common/Icono';

/**
 * Cualquier URL que no exista termina acá. Antes se renderizaba la barra y el
 * pie con el medio vacío, que desde afuera se lee como un sitio roto.
 */
const NotFound: React.FC = () => (
  <section className="relative min-h-[70vh] flex items-center pt-32 pb-24">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-xl text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary-lightest dark:bg-white/10 flex items-center justify-center mx-auto mb-7">
        <Icono
          name="compass-outline"
          style={{ fontSize: '34px' }}
          className="text-primary-dark dark:text-primary-light"
          aria-hidden="true"
        />
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-neutral-darkest dark:text-white mb-4 leading-tight">
        Esta página no existe
      </h1>
      <p className="text-lg text-neutral-dark dark:text-white/75 mb-9">
        Puede que el link esté viejo o que tenga algo mal escrito. Volvé al inicio y seguimos desde ahí.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 bg-primary-dark dark:bg-primary-light text-white dark:text-night-deep font-semibold text-sm px-6 py-3 rounded-xl hover:bg-primary dark:hover:bg-primary-light/85 transition-colors duration-200"
        >
          <Icono name="arrow-back-outline" style={{ fontSize: '16px' }} aria-hidden="true" />
          Ir al inicio
        </Link>
        <Link
          to="/contacto"
          className="inline-flex items-center justify-center gap-2 bg-neutral-lightest dark:bg-white/5 text-neutral-dark dark:text-white/75 font-semibold text-sm px-6 py-3 rounded-xl border border-neutral-soft dark:border-white/10 hover:bg-neutral-light dark:hover:bg-white/10 transition-colors duration-200"
        >
          Escribinos
        </Link>
      </div>
    </div>
  </section>
);

export default NotFound;
