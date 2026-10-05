/**
 * `npm run paquete`: genera `paquete/migracion-thelionhalloween.zip` (migracion.json + fotos/…)
 * en el formato exacto de `migrationPackageSchema`, para importarlo en la consola de la plataforma
 * (ficha del cliente → Contenido → Importar paquete). No genera nada si `plataforma/` no es válido.
 */
import { execSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { zipSync } from 'fflate';
import { MIGRATION_FILE, MIGRATION_PACKAGE_VERSION, migrationPackageSchema, type MigrationPackageInput } from './nucleo/migration';
import { cargarModelo, DIR_PLATAFORMA, RAIZ } from './lib/modelo';

const SLUG = 'thelionhalloween';

const { modelo, errores } = cargarModelo();
if (errores.length) {
  console.error(`plataforma/ tiene ${errores.length} error(es); no se genera el paquete:\n- ${errores.join('\n- ')}`);
  process.exit(1);
}

const git = (cmd: string) => execSync(`git ${cmd}`, { cwd: RAIZ, encoding: 'utf8' }).trim();
const sucio = git('status --porcelain -- plataforma') !== '';
const origen = `thelion-web@${git('rev-parse --short HEAD')}${sucio ? '+cambios-sin-commit' : ''}`;

const paquete: MigrationPackageInput = {
  version: MIGRATION_PACKAGE_VERSION,
  origen,
  generadoEn: new Date().toISOString(),
  colecciones: [...modelo.colecciones.values()].map((c) => c.definicion as unknown as Record<string, unknown>),
  formularios: [...modelo.formularios.values()] as unknown as Record<string, unknown>[],
  bloques: modelo.bloques,
  elementos: [...modelo.semilla].flatMap(([coleccion, lista]) =>
    lista.map((e) => ({ coleccion, idOrigen: e.idOrigen, slug: e.slug, estado: e.estado, orden: e.orden, datos: e.datos })),
  ),
  fotos: modelo.fotos.map(({ ruta, origen, ancho, alto, alt }) => ({ ruta, origen, ancho, alto, alt })),
  advertencias: [],
};

const r = migrationPackageSchema.safeParse(paquete);
if (!r.success) {
  console.error('El paquete no cumple migrationPackageSchema:', r.error.issues);
  process.exit(1);
}

const archivos: Record<string, Uint8Array> = {
  [MIGRATION_FILE]: new TextEncoder().encode(JSON.stringify(paquete, null, 2)),
};
for (const f of modelo.fotos) archivos[f.ruta] = readFileSync(join(DIR_PLATAFORMA, f.origen));

const destino = join(RAIZ, 'paquete', `migracion-${SLUG}.zip`);
mkdirSync(join(RAIZ, 'paquete'), { recursive: true });
writeFileSync(destino, zipSync(archivos, { level: 9 }));

if (sucio) console.warn('Aviso: plataforma/ tiene cambios sin commit; el origen del paquete lo indica.');
console.log(
  `paquete/migracion-${SLUG}.zip (${origen}): ${paquete.colecciones.length} colecciones, ` +
    `${paquete.formularios?.length ?? 0} formularios, ${paquete.bloques.length} bloques, ` +
    `${paquete.elementos.length} elementos, ${paquete.fotos.length} fotos.`,
);
