import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import GoogleAnalytics from './components/GoogleAnalytics';
import RouteMeta from './components/RouteMeta';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SolutionSection from './components/SolutionSection';
import HowItWorksSection from './components/HowItWorksSection';
import ReviewsSection from './components/ReviewsSection';
import CallToActionSection from './components/CallToAction';
import { Footer } from './components/Footer';
import TeamTeaser from './components/TeamTeaser';
import NutritionistTeaser from './components/NutritionistTeaser';
import CookieBanner from './components/CookieBanner';

/**
 * Las páginas que no son la home se bajan recién cuando alguien las visita.
 * Antes el bundle traía las seis, más la de nutricionistas que sola son 680
 * líneas, a todo el que entraba al inicio y no las miraba nunca.
 *
 * La home no se divide a propósito: es lo primero que se ve, y partirla solo
 * agregaría una espera antes de pintar.
 */
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const DeleteAccount = lazy(() => import('./components/DeleteAccount'));
const TermsAndConditions = lazy(() => import('./components/TermsAndConditions'));
const Team = lazy(() => import('./components/Team'));
const IndependenciaPage = lazy(() => import('./components/Independence'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const NutritionistsPage = lazy(() => import('./components/Nutritionists'));
const Faqs = lazy(() => import('./components/Faqs'));
const NotFound = lazy(() => import('./components/NotFound'));

/** Hueco del alto de una pantalla mientras llega el trozo, para que no salte el pie. */
const Cargando = () => <div className="min-h-[70vh]" aria-hidden="true" />;


/**
 * Orden narrativo (de la persona hacia el producto):
 * 1. Hero — la promesa: saber elegir es cuidarte
 * 2. Solución — el problema resuelto en clave positiva (fusión de problema + transformación)
 * 3. Cómo funciona — recién acá aparece el producto, como medio
 * 4. Reviews — prueba social
 * 5. Equipo — quiénes están detrás
 * 6. CTA — la invitación a empezar
 * 7. Nutricionistas — la puerta de la línea profesional, después del cierre
 *    del recorrido del consumidor, para no cortarle el relato justo antes de
 *    pedirle que descargue.
 */
const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <SolutionSection />
      <HowItWorksSection />
      <ReviewsSection />
      <TeamTeaser />
      <CallToActionSection />
      <NutritionistTeaser />
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans text-neutral-dark dark:text-white/75">
        <ScrollToTop />
        <RouteMeta />
        <GoogleAnalytics />
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<Cargando />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/politica-privacidad" element={<PrivacyPolicy />} />
              <Route path="/eliminar-cuenta" element={<DeleteAccount />} />
              <Route path="/terminos-y-condiciones" element={<TermsAndConditions />} />
              <Route path="/equipo" element={<Team />} />
              <Route path="/independencia" element={<IndependenciaPage />} />
              <Route path="/nutricionistas" element={<NutritionistsPage />} />
              <Route path="/contacto" element={<ContactSection />} />
              <Route path="/preguntas-frecuentes" element={<Faqs />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <CookieBanner />
      </div>
    </Router>
  );
};

export default App;