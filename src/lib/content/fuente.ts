/**
 * Fuente de contenido del sitio, con dos modos detrás de la misma interfaz:
 *
 * - `plataforma` (producción y `npm run dev` con llave): lee `/v1/bloques` y `/v1/colecciones` (como
 *   Fluvida). Lo leído se guarda en memoria **por versión de contenido**: `GET /v1/version` se consulta
 *   como mucho cada `TTL_VERSION_MS` y, si cambió, se descarta todo. Si la plataforma no responde y ya
 *   hay algo en memoria, se sirve eso antes que romper la página. Solo se guardan datos ya resueltos
 *   (nunca promesas): en Workers, una promesa de I/O de una petición no puede esperarse desde otra.
 * - `semilla`: SOLO en `npm run dev` y sin llave (`FUENTE=semilla` en `.dev.vars`), lee
 *   `plataforma/` con la misma forma que `/v1` (ver `semilla.ts`). En producción sin llave el sitio
 *   falla con un error claro; nunca cae a la semilla.
 */
import { env } from 'cloudflare:workers';
import { plataforma } from '../plataforma/cliente';
import type { Bloque } from '../plataforma/sdk';

const TTL_VERSION_MS = 15_000;
const POR_PAGINA = 100;

interface Instantanea {
  version: number;
  verificadaEn: number;
  bloques?: Record<string, Bloque>;
  colecciones: Map<string, Record<string, unknown>[]>;
}

let memoria: Instantanea | undefined;

function usaSemilla(): boolean {
  if (env.FUENTE !== 'semilla') return false;
  if (!import.meta.env.DEV) throw new Error('FUENTE=semilla solo funciona en `npm run dev`; en producción hace falta PLATAFORMA_LLAVE.');
  if (env.PLATAFORMA_LLAVE) throw new Error('Hay PLATAFORMA_LLAVE y FUENTE=semilla a la vez en .dev.vars: deja solo uno.');
  return true;
}

async function vigente(): Promise<Instantanea> {
  const ahora = Date.now();
  if (memoria && ahora - memoria.verificadaEn < TTL_VERSION_MS) return memoria;
  try {
    const version = await plataforma().version();
    if (memoria && memoria.version === version) memoria.verificadaEn = ahora;
    else memoria = { version, verificadaEn: ahora, colecciones: new Map() };
  } catch (e) {
    if (!memoria) throw e;
    console.error('No se pudo consultar la versión de contenido; se sirve lo guardado.', e);
  }
  return memoria!;
}

/**
 * Consulta la versión UNA vez antes de leer en paralelo bloques y colecciones: sin esto, con la
 * memoria vacía (Worker recién arrancado) cada lectura paralela consultaría `/v1/version` por su
 * cuenta. En modo semilla no hace nada.
 */
export async function prepararFuente(): Promise<void> {
  if (import.meta.env.DEV && usaSemilla()) return;
  await vigente();
}

/** Todos los bloques en una sola petición. `origen` es el de la página (solo lo usa la semilla). */
export async function leerBloques(origen: string): Promise<Record<string, Bloque>> {
  if (import.meta.env.DEV && usaSemilla()) return (await import('./semilla')).bloquesSemilla(origen);
  const m = await vigente();
  m.bloques ??= await plataforma().bloques();
  return m.bloques;
}

/** Todos los elementos públicos de una colección, recorriendo todas las páginas. */
export async function leerColeccion(nombre: string, origen: string): Promise<Record<string, unknown>[]> {
  if (import.meta.env.DEV && usaSemilla()) return (await import('./semilla')).coleccionSemilla(nombre, origen);
  const m = await vigente();
  const guardada = m.colecciones.get(nombre);
  if (guardada) return guardada;
  const items: Record<string, unknown>[] = [];
  for (let pagina = 1; ; pagina++) {
    const r = await plataforma().coleccion(nombre, { pagina, porPagina: POR_PAGINA });
    items.push(...r.elementos);
    if (r.paginaActual >= r.totalPaginas) break;
  }
  m.colecciones.set(nombre, items);
  return items;
}
