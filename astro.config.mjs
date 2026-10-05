// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// Todas las páginas leen el contenido de la plataforma en cada visita (`output: 'server'`): la
// fuente (`src/lib/content/fuente.ts`) lo guarda en memoria por versión de contenido.
export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    // Sin servicio de imágenes de Cloudflare (evita el binding IMAGES): las fotos vienen de la
    // plataforma con sus variantes.
    imageService: 'passthrough',
  }),
  // Sin sesiones: evita que el adaptador cree un binding KV.
  session: false,
  // Sin la barra de herramientas de desarrollo (sale en las capturas).
  devToolbar: { enabled: false },
  trailingSlash: 'never',
  build: { format: 'file' },
});
