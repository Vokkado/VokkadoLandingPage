// Trae las preguntas frecuentes que se cargan desde el admin de Vokkado y las
// escribe en public/faqs.json.
//
// Se hace igual que con las reseñas: la landing lee un archivo estático en vez
// de pegarle a la API desde el navegador. Así el sitio sigue siendo estático,
// no hay que abrir CORS para vokkado.com, no se expone la URL de la API en el
// bundle, y la página no depende de que la API esté arriba para renderizar.
//
// A mano:   VOKKADO_API_URL=https://tu-api/api node scripts/fetch-faqs.mjs
// En CI:    ver .github/workflows/update-faqs.yml

import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'faqs.json');

// El endpoint es público: GET /api/faqs, sin autenticación.
const API_URL = (process.env.VOKKADO_API_URL || 'http://localhost:3000/api').replace(/\/$/, '');

/** Orden de las categorías en la página. Las que no estén acá van al final, alfabéticas. */
const ORDEN_CATEGORIAS = (process.env.FAQ_CATEGORY_ORDER || '')
  .split(',')
  .map((c) => c.trim())
  .filter(Boolean);

async function traerFaqs() {
  const url = `${API_URL}/faqs`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) {
    throw new Error(`La API respondió ${res.status} ${res.statusText} en ${url}`);
  }
  const json = await res.json();
  if (!json?.success || !Array.isArray(json.data)) {
    throw new Error(`Respuesta inesperada de ${url}: ${JSON.stringify(json).slice(0, 200)}`);
  }
  return json.data;
}

/** Agrupa por categoría respetando el orden pedido. Las keywords no se publican. */
function agrupar(faqs) {
  const porCategoria = new Map();
  for (const faq of faqs) {
    const categoria = (faq.category || 'General').trim();
    if (!porCategoria.has(categoria)) porCategoria.set(categoria, []);
    porCategoria.get(categoria).push({
      id: faq.id,
      question: (faq.question || '').trim(),
      answer: (faq.answer || '').trim(),
    });
  }

  const nombres = [...porCategoria.keys()].sort((a, b) => {
    const ia = ORDEN_CATEGORIAS.indexOf(a);
    const ib = ORDEN_CATEGORIAS.indexOf(b);
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
    return a.localeCompare(b, 'es');
  });

  return nombres.map((nombre) => ({
    categoria: nombre,
    preguntas: porCategoria.get(nombre).filter((p) => p.question && p.answer),
  }));
}

async function main() {
  console.log(`Trayendo preguntas frecuentes de ${API_URL}/faqs ...`);
  const faqs = await traerFaqs();
  const categorias = agrupar(faqs);
  const total = categorias.reduce((a, c) => a + c.preguntas.length, 0);

  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(
    OUTPUT_PATH,
    JSON.stringify({ updatedAt: new Date().toISOString(), categorias }, null, 2) + '\n'
  );

  console.log(`Listo, ${total} preguntas en ${categorias.length} categoría(s) guardadas en ${OUTPUT_PATH}`);
  if (total === 0) {
    console.warn('Ojo: no vino ninguna pregunta. La sección no se va a mostrar en la landing.');
  }
}

main().catch((err) => {
  console.error('No se pudieron traer las preguntas frecuentes:', err.message);
  process.exit(1);
});
