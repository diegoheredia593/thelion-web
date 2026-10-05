/**
 * Carga y valida `plataforma/` con los MISMOS esquemas que el importador de la plataforma
 * (`scripts/nucleo/`, copia literal). Lo usan `npm run paquete` y `npm run verificar-modelo`.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { z } from 'zod';
import { imageSize } from 'image-size';
import { buildCollectionDefinition, parseCustomDefinition, type CustomCollectionDefinition } from '../nucleo/custom';
import { parseFormDefinition, type FormDefinition } from '../nucleo/forms';
import { parseSitePagesDocument, type SitePagesDocument } from '../nucleo/sitePages';
import {
  ITEM_BASE_FIELDS,
  ITEM_STATES,
  validateBlockValue,
  type CollectionDefinition,
} from '../nucleo/schema';
import { collectImageSources, migrationBlockSchema } from '../nucleo/migration';

export const RAIZ = new URL('../..', import.meta.url).pathname;
export const DIR_PLATAFORMA = join(RAIZ, 'plataforma');
export const DIR_FOTOS = join(DIR_PLATAFORMA, 'fotos');

/** De `apps/plataforma/worker/lib/contentBlocks.ts` (commit en `scripts/nucleo/LEEME.md`). */
export const BLOCK_KEY_PATTERN = /^[a-z0-9][a-zA-Z0-9]*(?:\.[a-z0-9][a-zA-Z0-9]*){2}$/;
/** Tope de la plataforma por foto. */
export const MAX_FOTO_BYTES = 2 * 1024 * 1024;

export type Bloque = z.infer<typeof migrationBlockSchema>;
export interface Elemento {
  idOrigen: string;
  slug: string | null;
  estado: (typeof ITEM_STATES)[number];
  orden: number;
  datos: Record<string, unknown>;
}
export interface Foto {
  ruta: string;
  origen: string;
  ancho: number;
  alto: number;
  alt: string;
  bytes: number;
}
export interface Modelo {
  paginas: SitePagesDocument;
  bloques: Bloque[];
  colecciones: Map<string, { definicion: CustomCollectionDefinition; coleccion: CollectionDefinition }>;
  formularios: Map<string, FormDefinition>;
  semilla: Map<string, Elemento[]>;
  fotos: Foto[];
}

const elementoSchema = z
  .object({
    idOrigen: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'idOrigen en minúsculas con guiones.'),
    slug: z.string().nullable(),
    estado: z.enum(ITEM_STATES),
    orden: z.number().int(),
    datos: z.record(z.string(), z.unknown()),
  })
  .strict();

const leerJson = (ruta: string): unknown => JSON.parse(readFileSync(ruta, 'utf8'));
const jsonsDe = (dir: string) =>
  existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith('.json')).sort() : [];

function archivosBajo(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((n) => {
    const r = join(dir, n);
    return statSync(r).isDirectory() ? archivosBajo(r) : [r];
  });
}

/** Igual que `validateComplete` / `validateDraft` de la plataforma (content/validation.ts). */
const BASE_FALSA = { id: 'x', state: 'visible', order: 0, createdAt: '', updatedAt: '' };
const vacio = (v: unknown) =>
  v === null || v === undefined || (typeof v === 'string' && v.trim() === '') || (Array.isArray(v) && v.length === 0);

function validarElemento(def: CollectionDefinition, datos: Record<string, unknown>, completo: boolean): string[] {
  const errores: string[] = [];
  const conocidos = Object.keys(def.schema.shape).filter((k) => !(ITEM_BASE_FIELDS as readonly string[]).includes(k));
  for (const k of Object.keys(datos)) if (!conocidos.includes(k)) errores.push(`campo "${k}" no existe en la colección`);
  if (completo) {
    const r = def.schema.safeParse({ ...datos, ...BASE_FALSA });
    if (!r.success) for (const i of r.error.issues) errores.push(`${i.path.join('.')}: ${i.message}`);
  } else {
    for (const campo of conocidos) {
      const v = datos[campo];
      if (vacio(v)) continue;
      const r = (def.schema.shape[campo] as z.ZodType).safeParse(v);
      if (!r.success) for (const i of r.error.issues) errores.push(`${[campo, ...i.path].join('.')}: ${i.message}`);
    }
  }
  return errores;
}

/** Carga `plataforma/` y devuelve el modelo y todos los errores encontrados (vacío = válido). */
export function cargarModelo(): { modelo: Modelo; errores: string[] } {
  const errores: string[] = [];
  const err = (donde: string, msg: string) => errores.push(`${donde}: ${msg}`);

  // Páginas
  const p = parseSitePagesDocument(leerJson(join(DIR_PLATAFORMA, 'paginas.json')));
  let paginas: SitePagesDocument = { pages: [], collections: [] };
  if (p.ok) paginas = p.document;
  else for (const i of p.issues) err(`paginas.json ${i.path}`, i.message);
  const clavesPagina = new Set(['global', ...paginas.pages.flatMap((pg) => [pg.key, ...(pg.blockPrefixes ?? [])])]);

  // Colecciones
  const colecciones: Modelo['colecciones'] = new Map();
  for (const f of jsonsDe(join(DIR_PLATAFORMA, 'colecciones'))) {
    const r = parseCustomDefinition(leerJson(join(DIR_PLATAFORMA, 'colecciones', f)));
    if (!r.ok) {
      for (const e of r.errors) err(`colecciones/${f} ${e.path}`, e.message);
      continue;
    }
    if (`${r.definition.key}.json` !== f) err(`colecciones/${f}`, `la clave "${r.definition.key}" no coincide con el archivo`);
    colecciones.set(r.definition.key, { definicion: r.definition, coleccion: buildCollectionDefinition(r.definition) });
  }
  const asignadas = new Set(paginas.collections.map((c) => c.collection));
  for (const k of colecciones.keys()) if (!asignadas.has(k)) err(`colecciones/${k}.json`, 'no tiene página en paginas.json');
  for (const k of asignadas) if (!colecciones.has(k)) err('paginas.json', `asigna "${k}", que no está en colecciones/`);

  // Formularios
  const formularios: Modelo['formularios'] = new Map();
  for (const f of jsonsDe(join(DIR_PLATAFORMA, 'formularios'))) {
    const r = parseFormDefinition(leerJson(join(DIR_PLATAFORMA, 'formularios', f)));
    if (!r.ok) {
      for (const i of r.issues) err(`formularios/${f} ${i.path}`, i.message);
      continue;
    }
    if (`${r.definition.key}.json` !== f) err(`formularios/${f}`, `la clave "${r.definition.key}" no coincide con el archivo`);
    if (!r.definition.fields.some((c) => c.type === 'email' || c.type === 'phone'))
      err(`formularios/${f}`, 'necesita un campo email o phone (para el CRM)');
    formularios.set(r.definition.key, r.definition);
  }

  // Bloques
  const crudos = leerJson(join(DIR_PLATAFORMA, 'bloques.json'));
  const bloques: Bloque[] = [];
  if (!Array.isArray(crudos)) err('bloques.json', 'debe ser una lista');
  else {
    const vistas = new Set<string>();
    crudos.forEach((crudo, n) => {
      const r = migrationBlockSchema.safeParse(crudo);
      if (!r.success) return err(`bloques.json [${n}]`, r.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; '));
      const blq = r.data;
      const donde = `bloque ${blq.key}`;
      if (!BLOCK_KEY_PATTERN.test(blq.key)) err(donde, 'la clave no es pagina.seccion.campo');
      const [pagina, seccion] = blq.key.split('.');
      if (blq.page !== pagina || blq.section !== seccion) err(donde, '`page` y `section` no coinciden con la clave');
      if (!clavesPagina.has(pagina!)) err(donde, `la página "${pagina}" no está en paginas.json`);
      if (vistas.has(blq.key)) err(donde, 'clave repetida');
      vistas.add(blq.key);
      const problema = validateBlockValue({ ...blq, required: false });
      if (problema) err(donde, problema);
      if (blq.required && vacio(blq.value)) err(donde, 'es obligatorio y está vacío');
      bloques.push(blq);
    });
  }

  // Semilla
  const semilla: Modelo['semilla'] = new Map();
  const idsOrigen = new Set<string>();
  for (const [clave, { coleccion }] of colecciones) {
    const ruta = join(DIR_PLATAFORMA, 'semilla', `${clave}.json`);
    if (!existsSync(ruta)) {
      err(`semilla/${clave}.json`, 'falta (usa [] si no hay elementos)');
      continue;
    }
    const lista = z.array(elementoSchema).safeParse(leerJson(ruta));
    if (!lista.success) {
      err(`semilla/${clave}.json`, lista.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; '));
      continue;
    }
    for (const e of lista.data) {
      const donde = `semilla/${clave}.json ${e.idOrigen}`;
      if (idsOrigen.has(e.idOrigen)) err(donde, 'idOrigen repetido');
      idsOrigen.add(e.idOrigen);
      for (const m of validarElemento(coleccion, e.datos, e.estado !== 'hidden')) err(donde, m);
    }
    semilla.set(clave, lista.data);
  }
  for (const f of jsonsDe(join(DIR_PLATAFORMA, 'semilla')))
    if (!colecciones.has(f.replace(/\.json$/, ''))) err(`semilla/${f}`, 'no hay una colección con esa clave');

  // Fotos: toda foto citada existe, pesa menos de 2 MB y tiene alt
  const fotos: Foto[] = [];
  const citadas = new Map<string, string>();
  const registrar = (valor: unknown, donde: string) =>
    collectImageSources(valor).forEach((src) => citadas.set(src, donde));
  bloques.forEach((blq) => registrar(blq.value, `bloque ${blq.key}`));
  for (const [clave, lista] of semilla) lista.forEach((e) => registrar(e.datos, `semilla/${clave}.json ${e.idOrigen}`));
  const altDe = new Map<string, string>();
  const recogerAlt = (v: unknown): void => {
    if (Array.isArray(v)) v.forEach(recogerAlt);
    else if (v && typeof v === 'object') {
      const o = v as Record<string, unknown>;
      if (typeof o['src'] === 'string') altDe.set(o['src'], typeof o['alt'] === 'string' ? o['alt'] : '');
      else Object.values(o).forEach(recogerAlt);
    }
  };
  bloques.forEach((blq) => recogerAlt(blq.value));
  for (const lista of semilla.values()) lista.forEach((e) => recogerAlt(e.datos));
  for (const [src, donde] of citadas) {
    if (!src.startsWith('/fotos/')) {
      err(donde, `la foto "${src}" debe citarse como /fotos/<ruta>`);
      continue;
    }
    const archivo = join(DIR_PLATAFORMA, src);
    if (!existsSync(archivo)) {
      err(donde, `la foto "${src}" no existe en plataforma/fotos/`);
      continue;
    }
    const bytes = statSync(archivo).size;
    if (bytes >= MAX_FOTO_BYTES) err(donde, `la foto "${src}" pesa ${(bytes / 1048576).toFixed(2)} MB (máx. < 2 MB)`);
    const alt = (altDe.get(src) ?? '').trim();
    if (!alt) err(donde, `la foto "${src}" no tiene alt`);
    const { width, height } = imageSize(readFileSync(archivo));
    if (!width || !height) err(donde, `no se pudo medir "${src}"`);
    fotos.push({ ruta: `fotos/${src.slice('/fotos/'.length)}`, origen: src, ancho: width ?? 0, alto: height ?? 0, alt, bytes });
  }
  for (const archivo of archivosBajo(DIR_FOTOS)) {
    const src = '/' + relative(DIR_PLATAFORMA, archivo).split('\\').join('/');
    if (!citadas.has(src) && !archivo.endsWith('.gitkeep')) err(`plataforma${src}`, 'foto que nada cita (sobra)');
  }

  return { modelo: { paginas, bloques, colecciones, formularios, semilla, fotos }, errores };
}
