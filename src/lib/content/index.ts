/**
 * Lo que leen las páginas: bloques por clave y colecciones, ya tipados con el modelo
 * (`modelo.generado.ts`) y pasados por `real()` (`lib/pendiente.ts`): un valor vacío o pendiente
 * llega como `null`.
 */
import { real } from '../pendiente';
import { textoEnriquecidoAHtml, type Foto } from '../plataforma/sdk';
import { leerBloques, leerColeccion } from './fuente';
import type { ClaveBloque, ClaveColeccion, Colecciones } from './modelo.generado';

export type { ClaveBloque, Colecciones } from './modelo.generado';

export interface Bloques {
  /** Texto de un bloque, o `null` si está vacío o pendiente. */
  t(clave: ClaveBloque): string | null;
  /** Igual que `t`, con `{nombre}` reemplazados; `null` si falta el bloque o algún valor. */
  plantilla(clave: ClaveBloque, valores: Record<string, string | number | null>): string | null;
  /** Foto de un bloque de imagen, o `null`. */
  foto(clave: ClaveBloque): Foto | null;
  /** HTML seguro de un bloque de texto enriquecido, o `null`. */
  rico(clave: ClaveBloque): string | null;
}

export async function cargarBloques(url: URL): Promise<Bloques> {
  const crudos = await leerBloques(url.origin);
  const valor = (clave: ClaveBloque) => real(crudos[clave]?.valor ?? null);
  const t = (clave: ClaveBloque) => {
    const v = valor(clave);
    return typeof v === 'string' ? v : null;
  };
  return {
    t,
    plantilla(clave, valores) {
      const base = t(clave);
      if (base === null) return null;
      let falta = false;
      const texto = base.replace(/\{(\w+)\}/g, (_, nombre: string) => {
        const v = valores[nombre];
        if (v === null || v === undefined) falta = true;
        return String(v ?? '');
      });
      return falta ? null : texto;
    },
    foto(clave) {
      const v = valor(clave);
      return v && typeof v === 'object' && !Array.isArray(v) ? (v as Foto) : null;
    },
    rico(clave) {
      const v = valor(clave);
      return Array.isArray(v) ? textoEnriquecidoAHtml(v as Parameters<typeof textoEnriquecidoAHtml>[0]) : null;
    },
  };
}

/** Elementos públicos de una colección, en su orden. Los campos siguen tal cual: pásalos por `real()`. */
export async function coleccion<K extends ClaveColeccion>(clave: K, url: URL): Promise<Colecciones[K][]> {
  return (await leerColeccion(clave, url.origin)) as unknown as Colecciones[K][];
}
