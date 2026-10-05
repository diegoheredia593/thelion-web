# Fase 0 — Modelo de contenido propuesto (The Lion Halloween Party 2026)

Sitio nuevo: no hay código que inventariar. El modelo sale de `docs/COPY-THE-LION-HALLOWEEN-PARTY.md`
(el «copy») y del modelo de partida del prompt del sitio, ajustado a lo que exige el código de
`agencia-plataforma` (commit `c59c4d9e`). Cliente `thelionhalloween`.

Convenciones:

- `[P]` = el valor inicial queda como `[PENDIENTE: …]` en `plataforma/` y el sitio no lo muestra.
- Las claves de bloque llevan exactamente tres tramos (`BLOCK_KEY_PATTERN` del importador):
  `pagina.seccion.campo`.
- Los números de sección (§) son los del copy.

## 1. Páginas (`paginas.json`)

| key | name | route | Contenido |
| --- | --- | --- | --- |
| `inicio` | Inicio | `/` | Toda la landing (§1–§16) y todas las colecciones |
| `privacidad` | Política de privacidad | `/privacidad` | `privacidad.contenido.titulo` (text) + `privacidad.contenido.texto` (rich, [P]) + SEO |
| `terminos` | Términos y condiciones | `/terminos` | igual, `terminos.*` |
| `bases` | Bases de los concursos | `/bases-concursos` | igual, `bases.*` |

Mientras el texto de una página legal sea `[P]`, la ruta responde 404 y se ocultan los enlaces
que llevan a ella (pie, «Ver bases del concurso» y el enlace del aviso de privacidad). Todas las
colecciones se asignan a `inicio`.

## 2. Bloques

Valor inicial = texto del copy, tal cual. Todos de nivel `content` salvo donde se indica.

### `global.*` (en todo el sitio)

| Clave | Control | Valor inicial |
| --- | --- | --- |
| `global.marca.nombre` | text | The Lion Halloween Party (wordmark mientras falte el logo; también JSON-LD) |
| `global.marca.logo` | image | vacío — [P] logo |
| `global.menu.evento` / `dia` / `noche` / `atracciones` / `concursos` / `stands` / `sponsors` / `preguntas` | text | El evento · De día · De noche · Atracciones · Concursos · Stands · Sponsors · Preguntas |
| `global.menu.entradas` | text | Comprar entradas |
| `global.entradas.enlace` | url | Ticketshow + `utm_content=general` (botones generales de compra) |
| `global.pie.linea` | text | Este Halloween tiene rey. |
| `global.pie.evento` / `entradas` / `stands` / `sponsors` / `preguntas` / `contacto` | text | El evento · Entradas · Stands · Sponsors · Preguntas frecuentes · Contacto |
| `global.pie.privacidad` / `terminos` / `bases` | text | Política de privacidad · Términos y condiciones · Bases de los concursos |
| `global.pie.copyright` | text | © 2026 The Lion Halloween Party |
| `global.pie.credito` | text | [P] «Sitio por [agencia]» |
| `global.redes.instagram` | text | @thelionhalloweenparty |
| `global.redes.instagramEnlace` | url | https://www.instagram.com/thelionhalloweenparty/ |
| `global.contacto.whatsapp` | text | [P] número (sin él no hay botón flotante ni botones de WhatsApp) |
| `global.whatsapp.general` / `stand` / `sponsor` / `concursante` | textLong | Los cuatro mensajes prellenados de «Notas para el equipo» y §9 |
| `global.evento.inicio` | text, **system** | 2026-10-31T12:00:00-05:00 |
| `global.evento.fin` | text, **system** | 2026-11-01T02:00:00-05:00 |
| `global.seo.imagen` | image | vacío — [P] imagen para compartir 1200 × 630 |

### `inicio.*`

| Sección (§) | Bloques (control `text` salvo indicación) |
| --- | --- |
| `seo` | `titulo`, `descripcion` (textLong), `compartirTitulo`, `compartirDescripcion` (vista previa de WhatsApp/Instagram) |
| `portada` (§1) | `etiqueta`, `titulo`, `subtitulo`, `texto` (textLong), `botonEntradas`, `botonStand`, `desde` = «Entradas desde {precio} en Ticketshow.» ({precio} lo pone el sitio con la localidad visible más barata), `imagen` (image, vacía), `faltan`, `dias`, `horas`, `min`, `seg` |
| `datos` (§1, franja) | `fechaEtiqueta`, `fecha`, `lugarEtiqueta`, `lugar`, `verMapa`, `diaEtiqueta`, `dia`, `nocheEtiqueta`, `noche` |
| `experiencias` (§2) | `titulo`, `diaEtiqueta`, `diaTitulo`, `diaTexto` (textLong), `diaBoton`, `nocheEtiqueta`, `nocheTitulo`, `nocheTexto` (textLong), `nocheBoton` |
| `vivir` (§3) | `titulo`, `boton` |
| `dia` (§4) | `etiqueta`, `titulo`, `texto` (textLong), `programaTitulo`*, `nota`, `boton` |
| `noche` (§5) | `etiqueta` = «DE NOCHE · 20:00 A 02:00», `edadMinima` ([P]), `titulo`, `subtitulo`, `texto` (textLong), `lineupTitulo`*, `cierre`, `boton` |
| `atracciones` (§6) | `titulo`, `subtitulo`, `filtroTodo`, `filtroDia`, `filtroNoche`, `ambos` = «Día y noche» (etiqueta de tarjeta), `boton` |
| `concursos` (§7) | `titulo`, `texto` (textLong), `cuando`*, `premios`*, `comoParticipar`* (rótulos de las tarjetas), `pasosTitulo`*, `botonInscribir`, `botonBases` |
| `entradas` (§8) | `titulo`, `texto`, `incluye`* (rótulo), `microcopy`, `aviso` |
| `stands` (§9) | `etiqueta`, `titulo`, `texto` (textLong), `disponibles` = 100, `contador` = «Quedan {n} stands disponibles.», `espacio`*, `incluye`* (rótulos), `horario` (textLong), `pasosTitulo`*, `botonReservar`, `botonWhatsapp`, `letraPequena`, `reglas` ([P]) |
| `sponsors` (§10) | `titulo`, `texto` (textLong), `razonesTitulo`*, `paquetesTitulo`*, `atraccionTitulo`*, `atraccionTexto` (textLong), `botonSponsor`, `botonMediaKit`, `mediaKit` (url, [P]), `aliadosTitulo` = «Ya confían en nosotros» |
| `galeria` (§11) | `titulo`, `texto`, `boton` |
| `participar` (§12) | `titulo`, `texto`, `nombre`, `telefono`, `email`, `perfil`, `perfilAsistente`, `perfilEmprendedor`, `perfilSponsor`, `perfilConcursante`, `empresa`, `paquete`, `categoria`, `mensaje` (rótulos de campo y de opción), `boton`, `aviso` (aviso de privacidad, adaptación 4), `exito`, `error` |
| `ubicacion` (§13) | `titulo`, `lugar`, `direccion`, `referenciaEtiqueta`, `referencia` ([P]), `parqueoEtiqueta`, `parqueo` ([P]), `mapa` (url del mapa incrustado), `googleMaps` (url), `waze` (url), `botonMaps`, `botonWaze` |
| `preguntas` (§14) | `titulo` |
| `final` (§15) | `antesTitulo`, `dias`, `horas`, `minutos`, `segundos`, `antesTexto`, `antesBoton`, `durante`, `duranteBoton`, `despues`, `despuesBoton`, `avisosCorreo`, `avisosBoton` ([P], ver pregunta 5) |

\* Subtítulos y rótulos que en el copy aparecen como etiqueta en negrita (pregunta 1).

Unos 170 bloques. Las URLs del mapa, Google Maps y Waze se arman con la dirección del copy
(búsqueda por «Santa Ana Garden, 4to Callejón 11 NE, Guayaquil»), sin coordenadas inventadas. El
cliente puede cambiarlas por los enlaces exactos.

## 3. Colecciones (todas personalizadas)

| Clave | Elementos de la semilla | Campos (control) | Cambio frente al modelo de partida |
| --- | --- | --- | --- |
| `localidades` | 4 (§8) | `nombre` (text), `precio` (number), `incluye` (textList, [P]), `validez` (text, [P]: tarde, noche o ambas), `enlace` (url con UTM por localidad), `textoBoton` (text), `destacada` (checkbox) | **+`validez`**: el copy lo pide como dato pendiente aparte. `destacada` queda en falso en las cuatro: el copy no dice cuál destacar |
| `atracciones` | 15 (§6) | `nombre`, `texto` (textLong, max 120), `horario` (option: dia, noche, ambos, porConfirmar), `icono` (option: set SVG del sitio), `foto` (image 4:3, opcional) | — |
| `programaDia` | 10 (§4) | `titulo` (parte en negrita), `detalle` (resto), `hora` (text, [P]) | — |
| `destacados` | 7 de día + 9 de noche | `texto`, `experiencia` (option: dia, noche), `icono` (option, opcional) | **+`icono`**: los de día van «como íconos en fila» |
| `pilares` | 4 (§3) | `titulo`, `texto` (textLong) | — |
| `cifras` | 5 (§3) | `numero` (text), `texto` | — |
| `concursos` | 3 (§7) | `nombre`, `publico` (text, opcional: «niños, adolescentes y familias»), `cuando`, `premios`, `reparto` (text, [P]), `comoParticipar` (text) | **+`publico`**, y el «[reparto]» va **en su propio campo**: el helper solo oculta valores que *empiezan* con `[PENDIENTE`, así que un pendiente en medio de un texto se vería |
| `pasos` | 3 de concurso + 4 de stand | `titulo`, `detalle` (opcional), `grupo` (option: concurso, stand) | El paso 3 del stand se parte: «Paga y envía tu comprobante» + detalle [P] «método de pago» |
| `paquetesStand` | 3 (§9) | `nombre`, `espacio`, `incluye` (textLong), `precio` (number), `adicional` (checkbox → se muestra «+$50») | — |
| `paquetesSponsor` | 3 (§10) | `nombre`, `subtitulo`, `beneficios` (textList), `precio` (**text**, [P]) | **`precio` es text, no number**: un number no admite `[PENDIENTE]` y el organizador puede querer «Desde $…» |
| `razonesSponsor` | 4 (§10) | `texto`, `icono` (option) | — |
| `experienciasPatrocinables` | 6 (§10) | `nombre` | — |
| `artistas` | 0 | `nombre`, `rol` (option: artista, dj), `foto` (image 1:1) | Sin elementos: el line-up se oculta |
| `marcasAliadas` | 0 | `nombre`, `logo` (image), `enlace` (url, opcional) | La franja aparece con 3 o más |
| `preguntas` | 10 (§14), **5 ocultas** | `pregunta`, `respuesta` (rich) | Ocultas (`hidden`) las de respuesta pendiente: tarde y noche, menores, parqueo, reingreso y objetos prohibidos |
| `fotosGaleria` | 0 | `foto` (image, obligatoria, con su `alt`) | **Sin campo `alt` aparte**: la imagen de la plataforma ya trae `alt` obligatorio |

Todas usan `sortBy: "order"` (orden manual, como en el copy) y ninguna tiene `slugField` (no hay
páginas por elemento).

## 4. Formularios

**`participar`** (§12): igual que en el modelo de partida (`nombre`, `telefono` phone, `email`,
`perfil`, `empresa`, `paquete`, `categoria`, `mensaje`). Valores de `perfil`: `asistente`,
`emprendedor`, `sponsor`, `concursante` (los que lee `?perfil=…#participar`). Una sola diferencia:
la etiqueta de `categoria` es «Categoría y horario», como dice el copy, no «Concurso».

**`avisos`** (§15, nuevo): un solo campo, `email` (obligatorio). Es el «campo de correo para avisos
de la próxima edición» del estado «después». `participar` no sirve para esto porque exige nombre y
WhatsApp. Ver la pregunta 5.

## 5. Lo que queda en código (textos técnicos de interfaz)

«Abrir menú», «Cerrar menú», «Ir al contenido», «Enviando…», los mensajes genéricos de 422, 429 y
502, las etiquetas accesibles (aria) del contador, del filtro y del botón flotante, y los nombres
«Instagram» y «WhatsApp» como rótulo de red. Cada uno irá listado en el reporte.

## 6. Partes del copy que se dividen (no cambian el texto)

- §5 «DE NOCHE · 20:00 A 02:00 · [EDAD MÍNIMA]» → `etiqueta` + `edadMinima` [P].
- §7 «Parte de los $1.000 de la tarde: [reparto]» → `premios` + `reparto` [P]. Lo mismo con «$2.000: [reparto]».
- §9 «Quedan [100] stands…» → `contador` con `{n}` + `disponibles`.
- §9 letra pequeña → `letraPequena` + `reglas` [P].
- §13 texto de ubicación → `direccion`, `referencia` [P] y `parqueo` [P]. No se publica el enlace
  «ficha del lugar» (Vamos Eventos): se lee como fuente para el equipo.
- §1 «Entradas desde $10 en Ticketshow.» → bloque con `{precio}`, calculado.

## 7. Preguntas antes de la Fase 1

1. **Subtítulos en negrita.** «Programa de la tarde», «Line-up», «Cómo participar», «Cómo
   reservar», «Por qué patrocinar», «Paquetes», «Patrocina una atracción» y los rótulos de las tablas
   (Cuándo, Premios, Espacio, Incluye…) son etiquetas en negrita, y la regla dice que no se publican.
   Propongo publicarlos como subtítulos (marcados con * arriba): sin ellos las listas quedan sin
   título. ¿De acuerdo?
2. **Paquetes de sponsor «propuestos».** ¿Publico los beneficios propuestos, con el precio oculto
   hasta que se defina? ¿Y qué va en lugar de «[Marca]»: «tu marca» (sería un cambio de copy)? La
   otra opción es ocultar los paquetes hasta que el organizador los confirme. Lo mismo vale para
   «Party Bus by [Marca]» en «Patrocina una atracción».
3. **Huecos en los mensajes de WhatsApp.** «Paquete __», «[sí / no]», «Mi marca es __» y
   «[disfraces / talentos] de [día / noche]» los llena el visitante; no son datos pendientes. ¿Los
   dejo tal cual en el mensaje prellenado?
4. **Paso 2 del concurso:** «(o antes, con el formulario del sitio, si lo habilitan)». El
   formulario sí tiene el perfil Concursante. ¿Lo publico como «Inscríbete al llegar, en la mesa
   oficial de inscripción, o antes con el formulario del sitio.»? ¿O quito el paréntesis?
5. **Correo para avisos (después del evento):** el copy no trae la etiqueta del campo ni el texto
   del botón. ¿Me los das, o dejo el campo como [P] (solo aparece desde el 1 de noviembre)?

## 8. Lo que falta para la parada de diseño

- `docs/referencias/` no está en el repo: **faltan los flyers** (y el logo, si existe). Sin ellos
  no puedo sacar la paleta ni el hex del magenta para `PUESTA-EN-MARCHA.md`.
- **Despliegue:** trabajo en la rama `claude/new-session-52sxxf`, no en `main`. Antes del primer
  push a `main`, dime si el repo ya está conectado a Workers Builds.
