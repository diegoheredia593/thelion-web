/**
 * Fuente `semilla`: SOLO para `npm run dev` sin llave (`FUENTE=semilla` en `.dev.vars`). Lee
 * `plataforma/` y devuelve EXACTAMENTE la misma forma que `/v1`: solo elementos `visible` (y
 * `scheduled`, como la API cuando ya pasó su hora: la semilla no tiene fecha), ordenados por `orden`,
 * con los campos comunes (`id`, `slug`, `orden`, `creadoEn`, `actualizadoEn`) y fotos con `src`
 * absoluto (servidas por Vite) y `variantes: []`.
 *
 * `fuente.ts` solo importa este módulo dentro de `if (import.meta.env.DEV)`, así que no entra en el
 * build de producción.
 */
import type { Bloque } from '../plataforma/sdk';

interface ElementoSemilla {
  idOrigen: string;
  slug: string | null;
  estado: 'visible' | 'hidden' | 'scheduled';
  orden: number;
  datos: Record<string, unknown>;
}
interface BloqueSemilla {
  key: string;
  page: string;
  section: string;
  value: unknown;
}

const bloques = import.meta.glob<BloqueSemilla[]>('/plataforma/bloques.json', { eager: true, import: 'default' });
const semillas = import.meta.glob<ElementoSemilla[]>('/plataforma/semilla/*.json', { eager: true, import: 'default' });
const fotos = import.meta.glob<string>('/plataforma/fotos/**/*.{webp,jpg,jpeg,png,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const CREADO = '2026-10-05T00:00:00.000Z';

/** Cambia cada `{ src: "/fotos/…", alt }` por la foto servida por Vite, con URL absoluta. */
function resolverFotos(valor: unknown, origen: string): unknown {
  if (Array.isArray(valor)) return valor.map((v) => resolverFotos(v, origen));
  if (valor && typeof valor === 'object') {
    const o = valor as Record<string, unknown>;
    if (typeof o['src'] === 'string' && 'alt' in o) {
      const servida = fotos[`/plataforma${o['src']}`];
      return { ...o, src: servida ? new URL(servida, origen).href : o['src'], variantes: [] };
    }
    return Object.fromEntries(Object.entries(o).map(([k, v]) => [k, resolverFotos(v, origen)]));
  }
  return valor;
}

export function bloquesSemilla(origen: string): Record<string, Bloque> {
  const lista = Object.values(bloques)[0] ?? [];
  return Object.fromEntries(
    lista.map((b) => [b.key, { pagina: b.page, seccion: b.section, valor: resolverFotos(b.value, origen) }]),
  );
}

export function coleccionSemilla(nombre: string, origen: string): Record<string, unknown>[] {
  const lista = semillas[`/plataforma/semilla/${nombre}.json`];
  if (!lista) throw new Error(`La colección "${nombre}" no existe en plataforma/semilla/ (la API daría 404).`);
  return lista
    .filter((e) => e.estado !== 'hidden')
    .sort((a, b) => a.orden - b.orden)
    .map((e) => ({
      id: e.idOrigen,
      slug: e.slug,
      orden: e.orden,
      creadoEn: CREADO,
      actualizadoEn: CREADO,
      ...(resolverFotos(e.datos, origen) as Record<string, unknown>),
    }));
}
