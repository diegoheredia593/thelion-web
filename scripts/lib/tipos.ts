/**
 * Genera `src/lib/content/modelo.generado.ts` desde `plataforma/`: la unión de claves de bloque y
 * una interfaz por colección. Así `astro check` falla si el código lee un bloque o un campo que no
 * existe en el modelo. `npm run verificar-modelo` comprueba que el archivo esté al día.
 */
import type { CustomFieldInput } from '../nucleo/custom';
import type { Modelo } from './modelo';

export const RUTA_TIPOS = 'src/lib/content/modelo.generado.ts';

const pascal = (s: string) => s[0]!.toUpperCase() + s.slice(1);
const lit = (s: string) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

function tipoCampo(f: CustomFieldInput, sangria: string): string {
  const base = (() => {
    switch (f.control) {
      case 'number':
        return 'number';
      case 'checkbox':
        return 'boolean';
      case 'option':
        return f.options!.map((o) => lit(o.value)).join(' | ');
      case 'options':
        return `(${f.options!.map((o) => lit(o.value)).join(' | ')})[]`;
      case 'textList':
        return 'string[]';
      case 'image':
        return 'Foto';
      case 'gallery':
        return 'Foto[]';
      case 'rich':
        return 'TextoEnriquecido';
      case 'video_youtube':
        return 'VideoYoutube';
      case 'videos_youtube':
        return 'VideoYoutube[]';
      case 'relation':
        return '{ slug: string; nombre: string } | null';
      case 'group':
        return `{\n${f.fields!.map((g) => `${sangria}  ${g.name}: ${tipoCampo(g, sangria + '  ')};`).join('\n')}\n${sangria}}`;
      default:
        return 'string';
    }
  })();
  const nuncaNulo = ['checkbox', 'options', 'textList', 'gallery', 'videos_youtube', 'group', 'relation'];
  return f.required || nuncaNulo.includes(f.control) ? base : `${base} | null`;
}

export function generarTipos(modelo: Modelo): string {
  const l: string[] = [
    '// GENERADO por `npm run verificar-modelo -- --escribir` desde plataforma/. No lo edites a mano.',
    '',
    "import type { Foto, TextoEnriquecido, VideoYoutube } from '../plataforma/sdk';",
    '',
    'export interface Bloques {',
    ...modelo.bloques.map((b) => {
      const t = b.control === 'image' ? 'Foto' : b.control === 'rich' ? 'TextoEnriquecido' : 'string';
      return `  ${lit(b.key)}: ${t} | null;`;
    }),
    '}',
    '',
    'export type ClaveBloque = keyof Bloques;',
    '',
    '/** Campos que la API agrega a todo elemento de colección. */',
    'export interface BaseElemento {',
    '  id: string;',
    '  slug: string | null;',
    '  orden: number;',
    '  creadoEn: string;',
    '  actualizadoEn: string;',
    '}',
  ];
  for (const [clave, { definicion }] of modelo.colecciones) {
    l.push('', `export interface ${pascal(clave)} extends BaseElemento {`);
    for (const f of definicion.fields) l.push(`  ${f.name}: ${tipoCampo(f, '  ')};`);
    l.push('}');
  }
  l.push('', 'export interface Colecciones {');
  for (const clave of modelo.colecciones.keys()) l.push(`  ${clave}: ${pascal(clave)};`);
  l.push('}', '', 'export type ClaveColeccion = keyof Colecciones;', '');
  return l.join('\n');
}
