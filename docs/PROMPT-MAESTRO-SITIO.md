# Prompt maestro — sitio de cliente conectado a la plataforma desde el inicio

> Cómo usarlo: copia todo desde «INICIO DEL PROMPT» en un chat nuevo de Claude Code abierto sobre el
> repo del sitio y llena los cuatro datos entre corchetes. Sirve para un sitio nuevo y para uno a medio
> hacer (la Fase 0 hace el inventario). Basado en los dos cortes reales: Wellbusiness y Fluvida.

---

INICIO DEL PROMPT

# Sitio de [NOMBRE DEL CLIENTE], conectado a la plataforma de la agencia

Datos del proyecto:
- Cliente: [NOMBRE DEL CLIENTE] · slug en la plataforma: [slug] (minúsculas, sin espacios)
- Repo del sitio: [owner/repo] · dominio final: [dominio o "todavía no"]
- Copy y estructura aprobados: [ruta del documento de copy, o "los que ya están en el código"]

Respuestas, reportes y commits en español; código en inglés o español, pero consistente.

## Contexto: qué es la plataforma

`agencia-plataforma` es un Worker de Cloudflare en la MISMA cuenta (`84ffa5d2db10e557297317693d5ae3bf`).
Es la única fuente de contenido del sitio y el único destino de sus formularios. El cliente edita
todo desde su portal, sin tocar código. Antes de escribir nada, lee:

1. `agencia-plataforma/docs/api.md` completo (API `/v1`, llaves, formularios, caché, sin CORS).
2. `agencia-plataforma/packages/core/src/content/migration.ts` (formato del paquete de importación),
   `content/custom.ts` (colecciones personalizadas y sus 18 controles), `content/schema.ts` (bloques,
   imagen, texto enriquecido, video), `forms.ts` (formularios) y `sitePages.ts` (páginas del sitio).
3. Los dos sitios ya conectados, como plantilla: `fluvida-web/apps/web/src/lib/plataforma/`
   (`cliente.ts`, `medios.ts`, `sdk.ts`, `tipos.ts`), `fluvida-web/apps/web/src/lib/content/fuente.ts`
   (caché por versión) y su endpoint `src/pages/api/formularios/[tipo].ts`; y
   `wellbusiness-web/REPORTE-CORTE-WELLBUSINESS.md` (incidente de las fotos y cómo volver atrás).

## Reglas que no se negocian

1. **Stack:** Astro con `output: 'server'` y `@astrojs/cloudflare`, desplegado como Worker en esa
   cuenta. TypeScript estricto. Si el sitio ya usa otro stack, PARA y pregúntame antes de migrarlo.
2. **Nada editable queda escrito en el código.** Todo texto que el cliente podría querer cambiar es
   un **bloque**; toda lista que crece o se repite (servicios, productos, noticias, equipo, preguntas,
   testimonios, sedes…) es una **colección**; toda foto viene de la plataforma; todo formulario se
   define en la plataforma. Solo pueden quedar en código los textos técnicos de interfaz («Cerrar
   menú», «Cargando…»), y cada uno se lista en el reporte.
3. **La llave nunca llega al navegador.** Solo el servidor del sitio habla con `/v1` (no hay CORS, a
   propósito). Ningún `fetch` a la plataforma desde JavaScript de cliente.
4. **Producción habla con la plataforma por service binding**, nunca por la URL pública: Worker a
   Worker por `*.workers.dev` da error 1042.
5. **Toda foto pasa por `urlPublicaDeMedio()`**: por el binding, la plataforma arma los `src` con el
   host ficticio `agencia-plataforma`, que en el navegador sale roto (incidente real de Wellbusiness).
6. **Git:** push después de cada commit; nunca desplegar código que no esté en `origin/main`. Si el
   repo tiene Workers Builds, **cada push a main despliega**: secretos y bindings se configuran ANTES
   del push que los necesita (incidente real de Fluvida).
7. Sin lorem ipsum ni datos inventados: el contenido inicial sale del copy aprobado. Lo que falte
   queda como `[PENDIENTE: …]` y se lista en el reporte.

## El modelo de contenido vive en el repo: carpeta `plataforma/`

Es la fuente única desde la que se genera el paquete que se importa en la consola. Con eso, la
plataforma no necesita una sola línea de código nueva para este cliente.

```
plataforma/
  paginas.json                 páginas del sitio y a qué página pertenece cada colección
  bloques.json                 todos los bloques, con su valor inicial
  colecciones/<clave>.json     una definición de colección personalizada por archivo
  formularios/<clave>.json     una definición de formulario por archivo
  semilla/<clave>.json         elementos iniciales de cada colección
  fotos/…                      fotos de la semilla y de los bloques
```

**Bloques** (`bloques.json`): `{ key, page, section, label, help, control, level, maxLength, required, order, value }`.
- `key` = `pagina.seccion.campo`, cada tramo `[a-z0-9][a-zA-Z0-9]*` (ej. `inicio.hero.titulo`,
  `global.footer.telefono`). `page` y `section` coinciden con los dos primeros tramos.
- `control`: `text` | `textLong` | `rich` | `url` | `image`. `label` y `help` en español claro: los lee
  el cliente en su portal («Título grande de la portada», no `heroTitle`).
- `level`: `content` (lo edita el cliente) | `system` (solo el superadmin: metaetiquetas, códigos).
- Lo que se ve en todas las páginas (menú, pie, redes, teléfono, WhatsApp) va en `global.*`.
- SEO por página: `<pagina>.seo.titulo` y `<pagina>.seo.descripcion` (nivel `content`, para que el
  cliente los mejore), y `global.seo.*` para lo común.

**Colecciones** (`colecciones/<clave>.json`): formato de `customDefinitionSchema` en `custom.ts`.
- `key` en camelCase que empieza con minúscula. Nunca una clave reservada (`categories`, `products`,
  `promotions`, `articles`, `gallery`, `team`, `testimonials`, `faq`, `branches`): usa siempre
  colecciones personalizadas, aunque se parezcan a una fija.
- `label` (plural), `singular`, `gender` (`f`|`m`, para «Nueva noticia» / «Nuevo servicio»),
  `description`, `titleField`, `searchFields`, `sortBy` (`"order"` o `{ field, direction }`),
  `slugField` solo si cada elemento tiene página propia (con un campo `slug` y `from`).
- Controles disponibles: `text`, `textLong`, `rich`, `slug`, `date`, `url`, `link`, `number`,
  `checkbox`, `option`, `options`, `textList`, `image`, `gallery`, `video_youtube`, `videos_youtube`,
  `relation`, `group`. Usa `aspectRatio` en las fotos que el diseño recorta (ej. `"4:3"`), `max` en
  textos con límite visual y `help` en todo campo cuyo uso no sea obvio.
- Una relación guarda el valor del campo `relation.value` del elemento relacionado; la API la entrega
  resuelta como `{ slug, nombre }`.

**Formularios** (`formularios/<clave>.json`): `{ key, label, active, fields: [{ name, label, type, required, max?, options? }] }`.
- `type`: `text` | `email` | `phone` | `textLong` | `option`. Todo formulario de contacto lleva un campo
  `email` y/o `phone`: con eso el CRM crea y deduplica el contacto solo. Usa `nombre` para el nombre y
  `empresa` para la empresa (el CRM los reconoce).
- Los `name` del HTML son EXACTAMENTE los de la definición. Un campo de más da 422.

**Páginas** (`paginas.json`): `{ pages: [{ key, name, route, blockPrefixes? }], collections: [{ collection, page, alsoOn? }] }`
(formato de `sitePages.ts`). Cada página del sitio es una entrada (`key` en minúsculas, `route` real,
como `/servicios`), y cada colección se asigna a la página donde se edita. No declares `global`: es fija.

**Semilla** (`semilla/<clave>.json`): una lista de elementos `{ idOrigen, slug, estado, orden, datos }`.
- `idOrigen` estable y legible (`servicio-instalacion`): reimportar no duplica.
- `estado`: `visible` | `hidden` | `scheduled`.
- Una foto en los datos es `{ "src": "/fotos/<ruta>", "alt": "…", "width": n, "height": n }`, y
  esa ruta existe en `plataforma/fotos/`. Texto enriquecido: el JSON de `richTextSchema`
  (párrafos y listas con `text`, `bold`, `italic`, `link`). Video: `{ "id": "<11 caracteres>", "title": "…" }`.
- Fotos: webp, máximo 1600 px en el lado mayor y **menos de 2 MB** (es el tope de la plataforma),
  todas con `alt` descriptivo.

## Herramientas que vas a escribir en este repo

1. **`npm run paquete`** genera `paquete/migracion-[slug].zip` con `migracion.json` + `fotos/…` en el
   formato exacto de `migrationPackageSchema` (`version: 1`, `origen: "<repo>@<commit>"`, `generadoEn`,
   `colecciones`, `formularios`, `bloques`, `elementos` con `coleccion` + `idOrigen`, `fotos` con
   `ruta`/`origen`/`ancho`/`alto`/`alt`, `advertencias: []`). Mide `ancho` y `alto` de la foto real.
   `paquete/` va en `.gitignore`.
2. **`npm run verificar-modelo`** (también corre en `npm test`), que falla si:
   - una clave de bloque usada en el código no está en `bloques.json`, o un bloque no se usa en ninguna parte;
   - el código lee un campo que no existe en la definición de su colección;
   - un `name` de un formulario HTML no está en su definición, o falta uno obligatorio;
   - una foto citada no existe, pesa 2 MB o más, o no tiene `alt`;
   - una colección no tiene página en `paginas.json`, o una ruta de `paginas.json` no existe en el sitio;
   - alguna clave, nombre de campo o `key` no cumple los patrones de `custom.ts`, `forms.ts` o `sitePages.ts`.
3. **Fuente de contenido** (`src/lib/content/`), con dos modos detrás de la misma interfaz:
   - `plataforma`: la de Fluvida, que guarda en memoria por versión (`/v1/version` cada 15 s como mucho),
     sirve lo guardado si la plataforma no responde, recorre todas las páginas de una colección y lee
     los bloques en una sola petición.
   - `semilla`: SOLO en `astro dev` y cuando no hay llave (`FUENTE=semilla` en `.dev.vars`). Lee
     `plataforma/` y devuelve EXACTAMENTE la misma forma que `/v1`: relaciones resueltas a
     `{ slug, nombre }`, solo elementos `visible`, orden de la definición y fotos servidas por una ruta
     de desarrollo. En producción, sin llave, el sitio falla con un error claro, nunca cae a la semilla.
4. **Imágenes:** un único componente o helper para todas las fotos (`urlPublicaDeMedio` + `width`/`height`
   + `alt` + `loading="lazy"`, salvo la imagen principal de cada página). La plataforma todavía no genera
   tamaños: cuando lo haga, el `srcset` se agrega en ese único lugar.
5. **Formularios:** endpoint `src/pages/api/formularios/[tipo].ts` como el de `api.md` y el de Fluvida:
   - comprueba `Origin`;
   - señuelo `sitioWeb`;
   - Turnstile opcional (`TURNSTILE_SITE_KEY` en `vars` y secreto `TURNSTILE_SECRET`; vacío = desactivado);
   - reenvía con `ip` (`cf-connecting-ip`) y `pagina`;
   - 422 con cada error junto a su campo, 429 con un mensaje claro y 502 genérico.

   Sin JavaScript, el formulario funciona igual (POST y vuelve con un mensaje de éxito o error). Con
   JavaScript, envía sin recargar la página.

## Configuración del Worker (`wrangler.jsonc`)

`name`, `account_id`, `main: "@astrojs/cloudflare/entrypoints/server"`, `assets` con binding `ASSETS`,
`compatibility_flags: ["nodejs_compat", "global_fetch_strictly_public"]`,
`services: [{ "binding": "PLATAFORMA", "service": "agencia-plataforma" }]`, `observability`.
Sin D1, sin KV y sin R2 propios. `routes` con `custom_domain` solo cuando yo confirme el dominio.
Cliente de la plataforma como en `cliente.ts` de Fluvida: URL del binding
`https://agencia-plataforma/c/[slug]/v1` en producción y la URL pública
`https://agencia-plataforma.herediadiego963.workers.dev/c/[slug]/v1` en local. Llave: secreto
`PLATAFORMA_LLAVE` (alcances `contenido:leer` y `formularios:enviar`), `.dev.vars` en local y un
`.dev.vars.example` sin valores en el repo.

## Fases (PARA donde se indica)

**Fase 0 — Inventario y modelo.** Si el sitio ya existe, recorre cada página y lista todo el contenido
escrito en el código. Propón el modelo completo en una tabla por página: qué es bloque (clave y
control), qué es colección (clave, campos y controles), qué formularios y con qué campos, y qué
queda en código y por qué. **PARA y espera mi aprobación del modelo.**

**Fase 1 — Modelo y semilla.** Escribe `plataforma/` completo con el copy real, `npm run paquete` y
`npm run verificar-modelo` en verde.

**Fase 2 — El sitio lee del modelo.** Pasa cada página a leer de la fuente (modo `semilla`) y cada
formulario al endpoint. Al terminar, `grep` del copy en `src/` no debe encontrar textos editables.
Capturas a 390 y 1440 px de todas las páginas: antes y después deben verse idénticas.
**PARA y entrégame el zip del paquete y la guía de puesta en marcha.**

**Fase 3 — Conexión (después de que yo importe y te pase la llave).** Pon `PLATAFORMA_LLAVE` en
`.dev.vars` y como secreto del Worker (`wrangler secret put`) ANTES de cualquier push. Cambia a modo
`plataforma` y comprueba en local que todas las páginas se ven igual que con la semilla.

**Fase 4 — Despliegue y verificación en producción.**
- Todas las URLs dan 200 (y la 404 da 404).
- Todas las imágenes cargan y ninguna usa el host `agencia-plataforma`.
- Un envío real de cada formulario, marcado «PRUEBA», llega a la bandeja; luego se borra.
- Prueba de edición: cambio un texto en el portal y aparece en el sitio en menos de 20 s.
- Anota las versiones desplegadas y cómo volver atrás.

## Lo que entregas

- **`PUESTA-EN-MARCHA.md`**: los pasos que hago yo en la consola, sin código, con los valores exactos:
  1. crear el cliente (nombre, slug y color de acento en hex);
  2. Contenido → Importar paquete → revisar la vista previa → aplicar;
  3. Páginas y contenido → pegar `paginas.json` → validar → guardar;
  4. módulos a activar (contactos si el plan es Pro);
  5. API → crear la llave «Sitio [cliente]» con los dos alcances y pasártela;
  6. Equipo → invitar al cliente.
- **`REPORTE-PLATAFORMA.md`**: el mapa página → bloques y colecciones, los textos que quedaron en
  código y por qué, los `[PENDIENTE]`, las advertencias del importador y la verificación de la Fase 4.
- **`CLAUDE.md` del repo** con estas reglas resumidas, para las sesiones futuras.
- **Cambios de modelo después de importar:** una colección o un formulario que YA existe en la
  plataforma con otra definición no se pisa al reimportar. Esos cambios los hago yo en la consola,
  pegando el JSON nuevo. Dímelo explícitamente cada vez que cambies una definición ya importada.

FIN DEL PROMPT
