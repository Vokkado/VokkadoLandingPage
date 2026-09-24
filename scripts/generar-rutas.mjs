// Genera un index.html real para cada ruta, dentro de dist/.
//
// Por qué: GitHub Pages no sabe de rutas de una SPA. Sin esto, pedir
// /nutricionistas devuelve HTTP 404 y el 404.html redirige por JavaScript. Para
// una persona funciona, pero Googlebot ve un 404 y descarta la página, aunque
// después renderice el contenido. O sea que el sitemap apuntaría a ocho URLs
// que el buscador ignora.
//
// Con un dist/nutricionistas/index.html, GitHub Pages responde 200 y el router
// sigue trabajando igual. El 404.html queda como red para las URLs que de
// verdad no existen.
//
// De paso, cada archivo lleva SU título, su descripción y sus etiquetas Open
// Graph escritas en el HTML. Eso arregla lo otro: los scrapers de WhatsApp,
// Facebook y LinkedIn no ejecutan JavaScript, así que hasta ahora compartir
// cualquier página mostraba la vista previa de la home.

import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { build } from 'esbuild';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.join(__dirname, '..');
const DIST = path.join(RAIZ, 'dist');

/** Carga constants/seo.ts sin duplicar los textos acá. */
async function cargarSeo() {
  const res = await build({
    entryPoints: [path.join(RAIZ, 'constants', 'seo.ts')],
    bundle: true,
    write: false,
    format: 'esm',
    platform: 'node',
  });
  const codigo = res.outputFiles[0].text;
  return import(`data:text/javascript;base64,${Buffer.from(codigo).toString('base64')}`);
}

const escapar = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Cambia el contenido de una etiqueta meta ya existente. */
function reemplazarMeta(html, attr, clave, valor) {
  const re = new RegExp(`(<meta\\s+${attr}="${clave}"\\s+content=")[^"]*(")`, 'i');
  return html.replace(re, `$1${escapar(valor)}$2`);
}

async function main() {
  const { PAGE_META, urlCanonica } = await cargarSeo();
  const base = await readFile(path.join(DIST, 'index.html'), 'utf8');

  const rutas = Object.keys(PAGE_META).filter((r) => r !== '/');
  for (const ruta of rutas) {
    const meta = PAGE_META[ruta];
    const url = urlCanonica(ruta);

    let html = base
      .replace(/<title>[^<]*<\/title>/i, `<title>${escapar(meta.title)}</title>`)
      .replace(
        /(<link rel="canonical" href=")[^"]*(")/i,
        `$1${url}$2`
      );

    html = reemplazarMeta(html, 'name', 'description', meta.description);
    html = reemplazarMeta(html, 'property', 'og:title', meta.title);
    html = reemplazarMeta(html, 'property', 'og:description', meta.description);
    html = reemplazarMeta(html, 'property', 'og:url', url);
    html = reemplazarMeta(html, 'name', 'twitter:title', meta.title);
    html = reemplazarMeta(html, 'name', 'twitter:description', meta.description);

    // La de borrar cuenta no va a resultados de búsqueda, pero tiene que seguir
    // siendo accesible para las tiendas.
    if (ruta === '/eliminar-cuenta') {
      html = reemplazarMeta(html, 'name', 'robots', 'noindex, follow');
    }

    const destino = path.join(DIST, ruta.replace(/^\//, ''), 'index.html');
    await mkdir(path.dirname(destino), { recursive: true });
    await writeFile(destino, html);
    console.log(`  ${ruta}/index.html`);
  }

  console.log(`Listo, ${rutas.length} rutas generadas en dist/`);
}

main().catch((err) => {
  console.error('No se pudieron generar las rutas:', err.message);
  process.exit(1);
});
