import { useEffect } from 'react';

const GA_MEASUREMENT_ID = 'G-Y8NKT8RHB8';

const GoogleAnalytics = () => {
  useEffect(() => {
    const scriptTagId = 'ga-gtag';

    // Si el script ya existe, no lo volvemos a cargar
    if (!document.getElementById(scriptTagId)) {
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      script.async = true;
      script.id = scriptTagId;
      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag(...args: unknown[]) {
          window.dataLayer.push(args);
        }
        window.gtag = gtag;

        window.gtag('js', new Date());
        window.gtag('config', GA_MEASUREMENT_ID);
      };
      document.head.appendChild(script);
    }
  }, []);

  return null;
};

export default GoogleAnalytics;
