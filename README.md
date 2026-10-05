# thelion-web

Sitio de **The Lion Halloween Party 2026** (31 de octubre, Santa Ana Garden, Guayaquil). Una
landing en Astro sobre Cloudflare Workers. El contenido y los formularios viven en la plataforma de
la agencia (cliente `thelionhalloween`).

```sh
npm install
cp .dev.vars.example .dev.vars   # FUENTE=semilla: contenido de plataforma/, sin llave
npm run dev                       # http://localhost:4321
npm test                          # verificar-modelo + astro check
npm run paquete                   # paquete/migracion-thelionhalloween.zip para la consola
```

- `plataforma/`: modelo de contenido (bloques, colecciones, semilla, formularios, páginas).
- `docs/`: prompt maestro, copy aprobado (`COPY-THE-LION-HALLOWEEN-PARTY.md`) y la propuesta de
  modelo de la Fase 0.
- `PUESTA-EN-MARCHA.md`: pasos en la consola de la plataforma.
- `REPORTE-PLATAFORMA.md`: pendientes, cambios de copy, mapa del contenido y verificación.
