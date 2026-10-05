# Núcleo de la plataforma (copia)

Copia literal de archivos de `agencia-plataforma`, commit `c59c4d9e43481a53cee8bca97af39f88ef977d4a`:

- `packages/core/src/content/`: `schema.ts`, `linkPattern.ts`, `custom.ts`, `migration.ts`, `fields.ts`
- `packages/core/src/`: `forms.ts`, `sitePages.ts`

`collections.ts` NO es copia: es un sustituto con las claves reservadas (el original arrastra las
9 colecciones fijas). `BLOCK_KEY_PATTERN` viene de `apps/plataforma/worker/lib/contentBlocks.ts` y
está en `scripts/lib/modelo.ts`.

Lo usan `npm run paquete` y `npm run verificar-modelo` para validar `plataforma/` con los mismos
esquemas que el importador. No lo edites aquí: si la plataforma cambia, vuelve a copiarlo y
actualiza el commit.
