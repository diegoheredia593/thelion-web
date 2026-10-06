# The Lion Halloween Party 2026 (sitio) — notas para Claude

- **Si el repo tiene Workers Builds, cada push a `main` despliega: configura secretos y bindings ANTES
  del push.** Hasta confirmar si está conectado, se trabaja en ramas y nunca se hace push a `main`
  sin pedirlo.
- Astro (`output: 'server'`) + `@astrojs/cloudflare`, Worker `thelion-web`. Sin D1, KV ni R2: lee
  contenido y envía formularios a la plataforma (`agencia-plataforma`, cliente `thelionhalloween`)
  por service binding `PLATAFORMA`. La llave es el secreto `PLATAFORMA_LLAVE` (local: `.dev.vars`,
  ignorado). Nunca la pongas en archivos, commits ni capturas.
- **Nada editable en el código.** Todo texto es un bloque y toda lista es una colección. Ambos
  están en `plataforma/`, la fuente del paquete de importación. Tras cambiar `plataforma/`:
  `npm run verificar-modelo -- --escribir` (regenera `src/lib/content/modelo.generado.ts`) y
  `npm test`. Una definición de colección o formulario ya importada NO se pisa al reimportar:
  avísale al usuario y pásale el JSON nuevo.
- Las claves de bloque se citan siempre como literal completo (`b.t('inicio.portada.titulo')`): así
  `verificar-modelo` detecta las que sobran o faltan.
- Pendientes: en `plataforma/` van como `[PENDIENTE: …]`. El sitio los oculta con un solo helper,
  `lib/pendiente.ts` (`real()`). Una sección sin contenido real se oculta entera.
- Fotos: un solo helper, `lib/fotos.ts` (`atributosFoto`), que pasa todo `src` por
  `urlPublicaDeMedio()` (por el binding, la plataforma usa el host ficticio `agencia-plataforma`)
  y arma `srcset` + `sizes`. No pongas un `<img>` de una foto de la plataforma sin pasar por él.
- `lib/plataforma/{sdk,tipos,imagen,texto}.ts` y `scripts/nucleo/` son copias de la plataforma
  (commit en su cabecera / `LEEME.md`): no los edites aquí; actualízalos desde el origen.
- Local sin llave: `FUENTE=semilla` en `.dev.vars` (ver `.dev.vars.example`) y `npm run dev`. En
  producción nunca se usa la semilla.
- Si `npm run dev` con llave da 403 «Host not in allowlist» (sandbox que solo sale por proxy):
  `NODE_USE_ENV_PROXY=1 node scripts/relevo-local.mjs` y `PLATAFORMA_URL_DEV` en `.dev.vars`.
- Capturas: `node scripts/capturas.mjs [url] [rutas…]` (390 y 1440 px, en `capturas/`).
- Comentarios, commits y documentación en español. Detalle y pendientes: `REPORTE-PLATAFORMA.md`;
  pasos en la consola: `PUESTA-EN-MARCHA.md`.
