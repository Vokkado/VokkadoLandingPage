import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import GoogleAnalytics from './components/GoogleAnalytics';

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
import PrivacyPolicy from './components/PrivacyPolicy';
import DeleteAccount from './components/DeleteAccount';
import TermsAndConditions from './components/TermsAndConditions';
import Team from './components/Team';
import IndependenciaPage from './components/Independence';
import ContactSection from './components/ContactSection';
import TeamTeaser from './components/TeamTeaser';

/**
 * Orden narrativo (de la persona hacia el producto):
 * 1. Hero — la promesa: saber elegir es cuidarte
 * 2. Solución — el problema resuelto en clave positiva (fusión de problema + transformación)
 * 3. Cómo funciona — recién acá aparece el producto, como medio
 * 4. Reviews — prueba social
 * 5. Equipo + CTA
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
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans text-gray-700">
        <ScrollToTop />
        <GoogleAnalytics />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/politica-privacidad" element={<PrivacyPolicy />} />
            <Route path="/eliminar-cuenta" element={<DeleteAccount />} />
            <Route path="/terminos-y-condiciones" element={<TermsAndConditions />} />
            <Route path="/equipo" element={<Team />} />
            <Route path="/independencia" element={<IndependenciaPage />} />
            <Route path="/contacto" element={<ContactSection />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;