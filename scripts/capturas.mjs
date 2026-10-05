/**
 * Capturas de página completa a 390 y 1440 px: `node scripts/capturas.mjs [url-base] [rutas…]`.
 * Por defecto http://localhost:4321 y `/`. Salen en `capturas/` (ignorada por git).
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const [base = 'http://localhost:4321', ...rutas] = process.argv.slice(2);
const lista = rutas.length ? rutas : ['/'];
mkdirSync('capturas', { recursive: true });
let navegador;
try {
  navegador = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
} catch {
  navegador = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
}
for (const ancho of [390, 1440]) {
  const pagina = await navegador.newPage({ viewport: { width: ancho, height: ancho < 800 ? 844 : 900 }, deviceScaleFactor: ancho < 800 ? 2 : 1 });
  for (const ruta of lista) {
    await pagina.goto(base + ruta, { waitUntil: 'networkidle' });
    await pagina.evaluate(() => document.fonts.ready);
    const nombre = `capturas/${ruta === '/' ? 'inicio' : ruta.replace(/\W+/g, '-').replace(/^-|-$/g, '')}-${ancho}.png`;
    await pagina.screenshot({ path: nombre, fullPage: true });
    const desborde = await pagina.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    console.log(nombre, desborde > 0 ? `¡desborde horizontal de ${desborde}px!` : '');
  }
  await pagina.close();
}
await navegador.close();
