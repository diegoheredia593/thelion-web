/**
 * Sustituto mínimo de `packages/core/src/content/collections.ts` de la plataforma: solo las dos
 * constantes que usa `custom.ts`. Las claves reservadas son las de las 9 colecciones fijas
 * (docs/api.md de la plataforma).
 */
export const RESERVED_COLLECTION_KEYS: readonly string[] = [
  'categories',
  'products',
  'promotions',
  'articles',
  'gallery',
  'team',
  'testimonials',
  'faq',
  'branches',
];
export const CONTENT_MODULE_PREFIX = 'content:';
