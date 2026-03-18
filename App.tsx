import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import GoogleAnalytics from './components/GoogleAnalytics';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import CallToActionSection from './components/CallToAction';
import { Footer } from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import DeleteAccount from './components/DeleteAccount';

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection /> 
      <HowItWorksSection />
      <CallToActionSection />
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans text-gray-700">
        <GoogleAnalytics />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/politica-privacidad" element={<PrivacyPolicy />} />
            <Route path="/eliminar-cuenta" element={<DeleteAccount />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;