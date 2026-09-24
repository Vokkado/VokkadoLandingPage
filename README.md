# Vokkado, landing

Sitio público de Vokkado, en [vokkado.com](https://vokkado.com). React con Vite,
Tailwind y React Router.

## Correrlo

**Requisitos:** Node.js 20 o más.

```bash
npm install
npm run dev
```

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo en el 5173 |
| `npm run build` | Compila a `dist/` |
| `npm run preview` | Sirve `dist/` como en producción |
| `npm run deploy` | Publica `dist/` en GitHub Pages |
| `npm run fetch-reviews` | Baja las reseñas de App Store y Google Play a `public/reviews.json` |
| `npm run fetch-faqs` | Baja las preguntas frecuentes del admin a `public/faqs.json` |

Las reseñas y las preguntas frecuentes se actualizan solas: hay dos acciones de
GitHub que corren `fetch-reviews` y `fetch-faqs` todos los días y commitean el
resultado en `develop`.

**Las preguntas frecuentes salen del admin de Vokkado**, de la misma tabla que
alimenta la app. No se piden a la API desde el navegador: `fetch-faqs` las baja
a `public/faqs.json` y la página lee ese archivo. Así el sitio sigue siendo
estático, no hay que abrir CORS para vokkado.com y la página no se rompe si la
API está caída. Para que la acción funcione hay que cargar el secret
`VOKKADO_API_URL` en el repo, apuntando a la API de producción con `/api`
incluido. Mientras `faqs.json` esté vacío, la página muestra un mensaje
invitando a escribir a contacto, en vez de una lista vacía.

## Cosas que conviene saber antes de tocar

**Rutas reales, no hash.** El sitio usa `BrowserRouter`. GitHub Pages no sabe de
rutas de una SPA, así que `public/404.html` guarda la ruta pedida y la devuelve
desde `index.html`. Si agregás una ruta, sumala también a `INDEXABLE_PATHS` en
`constants/seo.ts` y al `public/sitemap.xml`.

**Los metadatos por ruta** los pone `components/RouteMeta.tsx` leyendo
`constants/seo.ts`. Ojo: los scrapers de WhatsApp, Facebook y LinkedIn no
ejecutan JavaScript, así que las etiquetas Open Graph que ven son las escritas a
mano en `index.html`, que son las de la home.

**Tailwind es local**, configurado en `tailwind.config.js`. Se purgan las clases
que no aparezcan literales en el código: nunca armes una clase por
interpolación (`text-${color}-dark`), porque no llega al CSS final. Mirá
`ACENTO` en `components/Navbar.tsx` para el patrón que usamos.

**La paleta `neutral` reemplaza la escala numérica de Tailwind.** No existen
`neutral-100` ni `neutral-200`: van los nombres (`lightest`, `light`, `soft`,
`line`, `medium`, `dark`, `darkest`).

**Los iconos están adentro del bundle**, en `components/common/iconos.ts`, y se
usan con `<Icono name="cart-outline" />`. Antes venían de ionicons por CDN, que
pedía cada icono como un SVG aparte, y de Material Design Icons, que se bajaba
entero (54 KB más la fuente) para dibujar uno solo. Para sumar un icono: bajar
el svg de ionicons, copiar lo de adentro de `<svg>` en ese archivo con el mismo
nombre, y listo.

**Las páginas que no son la home se cargan por demanda**, con `React.lazy` en
`App.tsx`. Si agregás una página, sumala ahí de la misma forma y no al bundle
principal.

**Las imágenes van en WebP.** Los PNG originales están en `images/_masters/`,
que no entra al bundle porque Vite solo empaqueta lo que se importa.

**Analytics arranca denegado.** `components/GoogleAnalytics.tsx` declara Consent
Mode antes de configurar nada, y recién mide si la persona acepta en el banner.

## Marca

Antes de escribir cualquier texto, leer [BRAND_MESSAGING.md](BRAND_MESSAGING.md).
Voseo siempre, y se comunica la transformación, no la funcionalidad.
