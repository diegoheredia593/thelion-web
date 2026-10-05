/**
 * `npm run verificar-modelo` (también corre en `npm test`). Falla si:
 * - `plataforma/` no cumple los esquemas de la plataforma (claves, campos, formularios, páginas,
 *   semilla, fotos: que existan, pesen < 2 MB y tengan alt);
 * - `src/lib/content/modelo.generado.ts` no está al día (regenéralo con `-- --escribir`); con ese
 *   archivo, `astro check` falla si el código lee un bloque o un campo que no existe;
 * - una clave de bloque citada en `src/` no está en bloques.json, o un bloque no se usa en `src/`;
 * - un `name` de un formulario HTML no está en su definición, o falta uno obligatorio;
 * - una ruta de paginas.json no existe en `src/pages/`.
 */
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { cargarModelo, RAIZ } from './lib/modelo';
import { generarTipos, RUTA_TIPOS } from './lib/tipos';

const { modelo, errores } = cargarModelo();
const err = (m: string) => errores.push(m);

// Tipos generados
const tipos = generarTipos(modelo);
const rutaTipos = join(RAIZ, RUTA_TIPOS);
if (process.argv.includes('--escribir')) {
  writeFileSync(rutaTipos, tipos);
  console.log(`Escrito ${RUTA_TIPOS}.`);
} else if (!existsSync(rutaTipos) || readFileSync(rutaTipos, 'utf8') !== tipos) {
  err(`${RUTA_TIPOS} no está al día con plataforma/: npm run verificar-modelo -- --escribir`);
}

// Código del sitio
const SRC = join(RAIZ, 'src');
const archivos = (dir: string): string[] =>
  existsSync(dir)
    ? readdirSync(dir).flatMap((n) => {
        const r = join(dir, n);
        return statSync(r).isDirectory() ? archivos(r) : /\.(astro|ts|tsx|js|mjs)$/.test(n) ? [r] : [];
      })
    : [];
const codigo = archivos(SRC)
  .filter((f) => !f.endsWith('modelo.generado.ts'))
  .map((f) => ({ ruta: relative(RAIZ, f), texto: readFileSync(f, 'utf8') }));

if (!existsSync(join(SRC, 'pages'))) {
  console.log('Aviso: todavía no hay src/pages; se omiten las comprobaciones contra el código.');
} else {
  // Bloques: citados ↔ definidos. Las claves se citan siempre como literal completo.
  const paginasBloque = ['global', ...modelo.paginas.pages.map((p) => p.key)].join('|');
  const patron = new RegExp(`['"\`]((?:${paginasBloque})\\.[a-z0-9][a-zA-Z0-9]*\\.[a-z0-9][a-zA-Z0-9]*)['"\`]`, 'g');
  const definidos = new Set(modelo.bloques.map((b) => b.key));
  const usados = new Set<string>();
  for (const { ruta, texto } of codigo)
    for (const m of texto.matchAll(patron)) {
      usados.add(m[1]!);
      if (!definidos.has(m[1]!)) err(`${ruta}: el bloque "${m[1]}" no está en bloques.json`);
    }
  for (const k of definidos) if (!usados.has(k)) err(`bloques.json: el bloque "${k}" no se usa en src/`);

  // Formularios: cada <form data-formulario="clave"> envía solo campos de su definición.
  const TECNICOS = new Set(['sitioWeb', 'cf-turnstile-response']);
  for (const { ruta, texto } of codigo) {
    for (const m of texto.matchAll(/data-formulario=["']([a-zA-Z0-9-]+)["']/g)) {
      const def = modelo.formularios.get(m[1]!);
      if (!def) {
        err(`${ruta}: el formulario "${m[1]}" no está en plataforma/formularios/`);
        continue;
      }
      const nombres = new Set(def.fields.map((f) => f.name));
      const literales = [...texto.matchAll(/\sname=["']([^"']+)["']/g)].map((n) => n[1]!);
      for (const n of literales) if (!nombres.has(n) && !TECNICOS.has(n)) err(`${ruta}: name="${n}" no está en el formulario "${def.key}"`);
      const desdeDefinicion = texto.includes(`formularios/${def.key}.json`);
      for (const f of def.fields)
        if (f.required && !desdeDefinicion && !literales.includes(f.name))
          err(`${ruta}: falta el campo obligatorio "${f.name}" del formulario "${def.key}"`);
    }
  }

  // Rutas de paginas.json
  for (const p of modelo.paginas.pages) {
    const base = p.route === '/' ? 'index' : p.route.slice(1);
    const candidatos = [`${base}.astro`, `${base}/index.astro`, `${base}.ts`].map((c) => join(SRC, 'pages', c));
    if (!candidatos.some((c) => existsSync(c))) err(`paginas.json: la ruta ${p.route} no existe en src/pages/`);
  }
}

if (errores.length) {
  console.error(`verificar-modelo: ${errores.length} problema(s)\n- ${errores.join('\n- ')}`);
  process.exit(1);
}
const elementos = [...modelo.semilla.values()].flat();
console.log(
  `verificar-modelo: OK — ${modelo.bloques.length} bloques, ${modelo.colecciones.size} colecciones, ` +
    `${elementos.length} elementos (${elementos.filter((e) => e.estado === 'hidden').length} ocultos), ` +
    `${modelo.formularios.size} formularios, ${modelo.fotos.length} fotos.`,
);
