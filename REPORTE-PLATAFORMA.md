# Reporte de plataforma — The Lion Halloween Party 2026

Estado: **en producción** en `https://thelion-web.herediadiego963.workers.dev` (Fases 0–4). Falta el
dominio final, la prueba de edición desde el portal y los pendientes del organizador (sección 1).
**Preventa y venta en el sitio (2026-10-14):** en la rama `claude/new-session-i8x2iw`, sin
fusionar a `main`; pasos para publicarla en la sección 7.

- Cliente: `thelionhalloween` · Worker: `thelion-web` · Repo: `diegoheredia593/thelion-web`
- Modelo: `plataforma/` (199 bloques, 16 colecciones, 104 elementos, 2 formularios, 5 páginas).
- `npm test` = `verificar-modelo` + `astro check`: en verde.

## 1. Lista de pendientes para el organizador

Ordenada como «Por confirmar» del documento de copy. Mientras un dato esté pendiente, el sitio no lo
muestra; entre paréntesis, dónde se completa en el portal.

1. **Qué incluye cada localidad y si vale para la tarde, la noche o ambas.**
   - (Entradas → cada localidad: «Qué incluye» y «Para qué horario vale».)
   - Hoy las tarjetas muestran solo nombre, precio y botón.
   - También la pregunta frecuente «¿Mi entrada vale para la tarde y la noche?», que está oculta.
2. **Edad mínima de la fiesta de noche.**
   - (Inicio → «De noche: edad mínima».)
   - También la pregunta «¿Pueden entrar menores a la fiesta de noche?», oculta.
3. **Premios: confirmar $1.000 de día + $2.000 de noche ($3.000) y cómo se reparten.**
   - (Concursos → «Reparto de los premios» en los 3 concursos.)
   - Del concurso de noche falta además **cómo inscribirse y a qué hora es la pasarela** (Concursos
     → Disfraces de noche → «Cómo participar»).
4. **Nombres y fotos de los 7 artistas y los 3 DJs.**
   - (Line-up: un elemento por artista o DJ, con foto cuadrada.)
   - El line-up no aparece hasta que haya al menos uno.
5. **Horas exactas del programa de día, y qué es el «concierto en vivo» que cierra la tarde.**
   - (Programa de la tarde → «Hora» de cada uno de los 10 momentos.)
   - Hoy la línea de tiempo sale sin horas.
6. **Horario de las atracciones «Por confirmar».**
   - Son 5: Dinosaurios y zombies, Toro loco mecánico, Piñata gigante, Juegos mecánicos, Cerveza
     artesanal y asados.
   - (Atracciones → «Horario».) Hoy aparecen solo en el filtro «Todo», sin etiqueta.
7. **Stands: la promoción de $99 / $69 venció el 30 de septiembre.**
   - Se publicó **$120 / $80**, como dice la tabla del copy.
   - Si hay una promo nueva, se cambia el precio en Paquetes de stand.
8. **Stands: método de pago, rubros permitidos y reglas** (por ejemplo, venta de alcohol).
   - (Pasos → «Paga y envía tu comprobante» → «Detalle», y Inicio → «Stands: rubros permitidos y
     reglas».)
9. **Sponsors: beneficios y precios de cada paquete, y media kit en PDF.**
   - Los beneficios **propuestos** del copy ya están publicados.
   - Los precios están pendientes (Paquetes de sponsor → «Precio») y no se muestran.
   - Media kit: Inicio → «Sponsors: enlace al media kit». Sin él, el botón «Descargar media kit» no
     aparece.
10. **WhatsApp de contacto, referencia del lugar, parqueo, reingreso y objetos prohibidos.**
    - WhatsApp: «Número de WhatsApp», con código de país (593…). **Sin número no aparece ningún
      botón de WhatsApp**, ni el flotante ni el de stands.
    - Referencia y parqueo: Inicio → Ubicación.
    - Las preguntas «¿Hay parqueo?», «¿Puedo salir y volver a entrar?» y «¿Qué no puedo llevar?»
      están ocultas hasta tener respuesta.
11. **Bases de los concursos y política de privacidad.** También faltan los términos y condiciones.
    - Texto de cada página legal, y su descripción para Google.
    - Mientras estén vacías, las páginas dan 404 y no aparecen sus enlaces: pie, botón «Ver bases
      del concurso» y el enlace del aviso del formulario.
    - **Ojo:** el formulario recoge datos personales; conviene publicar la política de privacidad
      antes de mover tráfico.
12. **Fotos y video para la portada y la galería.**
    - (Inicio → «Portada: imagen de fondo»; Fotos de la galería; «Imagen para compartir 1200 × 630».)
    - El video en loop de la portada (sugerido en el copy) no está en el modelo: la plataforma solo
      guarda videos de YouTube. Por ahora la portada usa imagen.

Pendientes que no están en esa lista:

- **Logo** del evento («Logo»). Mientras falte, se ve un wordmark tipográfico «THE LION / HALLOWEEN
  PARTY».
- **Crédito del sitio**: «Sitio por [agencia]» («Pie: crédito del sitio»).
- **Textos del correo para avisos** (rótulo del campo y del botón), que solo aparece después del
  evento, desde el 1 de noviembre.
- **Venta (nuevo, ver sección 7):** número de WhatsApp (sin él no hay botón de compra), enlace del
  checkout y de la consulta de pedidos del portal, precios normales, cupo de Preferencia, minutos de
  reserva, tiempo de verificación, bebidas VIP y la política para los Términos de compra.
- **Mapa:** la URL del mapa incrustado y los enlaces de Google Maps y Waze buscan la dirección
  del copy. Conviene cambiarlos por los enlaces exactos del lugar.

## 2. Cambios al copy y por qué

| Dónde | Copy | En el sitio | Por qué |
| --- | --- | --- | --- |
| §12 Formulario | Casilla obligatoria «Acepto que mis datos se usen…» | Aviso bajo el botón: «Al enviar, aceptas que usemos tus datos para contactarte sobre este evento, según la Política de privacidad.» | Los formularios de la plataforma no tienen tipo casilla (adaptación 4 del prompt). |
| §10 Paquete Rugido | «…presentado por [Marca]» | «…presentado por tu marca» | Aprobado en la Fase 0 (pregunta 2). |
| §10 Patrocina una atracción | «Party Bus by [Marca]» | «Party Bus by tu marca» | Ídem. |
| §7 Paso 2 | «Inscríbete al llegar, en la mesa oficial de inscripción (o antes, con el formulario del sitio, si lo habilitan).» | «Inscríbete al llegar, en la mesa oficial de inscripción, o antes con el formulario del sitio.» | Aprobado en la Fase 0 (pregunta 4): el formulario sí tiene el perfil Concursante. |
| §7 y §4 | Texto en negrita + resto en la misma línea | Título en negrita y el resto debajo, con mayúscula inicial («Primera ronda: 5 participantes», «Para el horario en que quieres concursar.») | Formato de línea de tiempo y de pasos. |
| §9 Paso 3 | «Paga y envía tu comprobante: [método de pago].» | «Paga y envía tu comprobante.» + el método como detalle aparte (pendiente) | Para que el pendiente no se vea. |
| §7 Tabla | «Disfraces de día (niños, adolescentes y familias)» | Nombre «Disfraces de día» y debajo «Niños, adolescentes y familias» | Formato de tarjeta. |
| §9 Tabla | «Extensión nocturna (adicional a cualquier paquete)» | Nombre «Extensión nocturna» y nota «Adicional a cualquier paquete»; precio «+$50» | Ídem. |
| §10 Beneficios | Una frase separada por comas | Un beneficio por línea, con mayúscula inicial | Formato de lista. |
| Varios | Etiquetas en negrita (Programa de la tarde, Line-up, Cómo participar, Cómo reservar, Por qué patrocinar, Paquetes, Patrocina una atracción, Ya confían en nosotros, Cuándo, Premios, Espacio, Incluye) | Publicadas como subtítulos y rótulos | Aprobado en la Fase 0 (pregunta 1). |
| §13 | «(ficha del lugar)» con enlace a Vamos Eventos | No se publica | Se leyó como fuente para el equipo. |
| §1 | «Preventa desde $10, solo hasta el 28 de octubre.» | Igual, pero el precio sale solo de la localidad visible más barata | Pedido del prompt. |

Enlaces que el copy no define y elegí:

- «Comprar entradas» del menú baja a la sección Entradas, para elegir localidad. Los demás «Comprar
  entradas» van al checkout del portal o, mientras no exista, a la sección Entradas.
- «Ver mapa» y «Cómo llegar» bajan a Ubicación.
- «Ver fotos del evento» baja a la galería.
- «Contacto» del pie lleva al formulario.

## 3. Mapa página → bloques y colecciones

**Inicio (`/`)**

| Sección | Bloques | Colecciones |
| --- | --- | --- |
| Menú, pie, WhatsApp, SEO común | `global.marca.*`, `global.menu.*`, `global.entradas.*` (checkout, pedidos y fin de la preventa, este último system), `global.pie.*`, `global.redes.*`, `global.contacto.whatsapp`, `global.whatsapp.*`, `global.evento.*` (system), `global.seo.imagen` | — |
| SEO | `inicio.seo.*` | `localidades` (JSON-LD `Event` con un `offers` por localidad) |
| 1 Portada + franja | `inicio.portada.*`, `inicio.datos.*` | `localidades` (precio «desde») |
| 2 Dos experiencias | `inicio.experiencias.*` | — |
| 3 Lo que vas a vivir | `inicio.vivir.*` | `pilares`, `cifras` |
| 4 De día | `inicio.dia.*` | `destacados` (Día), `programaDia` |
| 5 De noche | `inicio.noche.*` | `destacados` (Noche), `artistas` |
| 6 Atracciones | `inicio.atracciones.*` | `atracciones` |
| 7 Concursos | `inicio.concursos.*` | `concursos`, `pasos` (Concurso) |
| 8 Entradas | `inicio.entradas.*` | `localidades`, `pasos` (Entradas) |
| 9 Stands | `inicio.stands.*` | `paquetesStand`, `pasos` (Stand) |
| 10 Sponsors | `inicio.sponsors.*` | `razonesSponsor`, `paquetesSponsor`, `experienciasPatrocinables`, `marcasAliadas` |
| 11 Galería | `inicio.galeria.*` | `fotosGaleria` |
| 12 Formulario | `inicio.participar.*` | formulario `participar` |
| 13 Ubicación | `inicio.ubicacion.*` | — |
| 14 Preguntas | `inicio.preguntas.titulo` | `preguntas` |
| 15 Cuenta final | `inicio.final.*` | formulario `avisos` |

**Privacidad (`/privacidad`), Términos (`/terminos`), Términos de compra (`/terminos-de-compra`,
página `compra`) y Bases (`/bases-concursos`):** cada una usa
`<pagina>.contenido.titulo`, `<pagina>.contenido.texto` (texto enriquecido) y `<pagina>.seo.*`.

**Cambios de modelo frente a la Fase 0** (antes de importar, sin costo):

- `concursos.experiencia` (De día / De noche): da el color de la tarjeta sin adivinarlo por el
  nombre.
- `fotosGaleria.titulo`: el título de un elemento no puede ser una foto; es un nombre interno.
- Las etiquetas y opciones del formulario salen de su definición
  (`plataforma/formularios/participar.json`), no de bloques: el portal del cliente no las edita y
  así nunca difieren de la plataforma. Los valores son legibles («Emprendedor (stand)») porque la
  bandeja muestra el valor tal cual.

## 4. Textos que quedan en código (técnicos de interfaz)

| Texto | Dónde |
| --- | --- |
| «Ir al contenido» | `layouts/Base.astro` |
| «Abrir menú» / «Cerrar menú», «Secciones» (aria) | `components/Cabecera.astro` |
| «Pie de página» (aria), «Instagram» / «WhatsApp» (solo lectores de pantalla) | `components/Pie.astro` |
| «Escribir por WhatsApp» (aria) | `components/WhatsappFlotante.astro` |
| «(opcional)», «Elige una opción», «Enviando…», «No llenes este campo» (señuelo, oculto) | `components/secciones/Participar.astro` |
| «Enviaste varios formularios seguidos…» (429), «Revisa los campos marcados.» (422) | `pages/api/formularios/[tipo].ts` |
| Mensajes de validación por campo («Este campo es obligatorio.», etc.) | Los de la plataforma (`scripts/nucleo/forms.ts`) |
| «DJ» (etiqueta del rol en el line-up) | `components/secciones/Noche.astro` |
| «404», «Página no encontrada», «Esta página no existe.», «Volver al inicio» | `pages/404.astro` |
| Formato de precios («$», separador de miles, «+» de los adicionales) | `lib/formato.ts`, `Stands.astro` |

## 5. Advertencias del importador

Paquete importado el 2026-10-06. La plataforma tiene los 176 bloques con los mismos valores que el
paquete y los elementos esperados (comprobado por `/v1`).

## 6. Despliegue y verificación en producción (Fase 4)

- **Workers Builds: conectado el 2026-10-06** (rama de producción `main`; build `npm ci && npm run
  build`; deploy `npx wrangler deploy`). El primer build falló a propósito: `main` solo tenía los
  documentos, sin `package.json`.
- **Incidente del primer despliegue (500):** el secreto `PLATAFORMA_LLAVE` se había creado en otro
  lugar del panel y el Worker no lo tenía (`wrangler secret list` vacío). Se configuró con
  `wrangler secret put` el 2026-10-06 15:05 UTC; desde entonces, 200.

### Verificado en producción (2026-10-06, `https://thelion-web.herediadiego963.workers.dev`)

| Comprobación | Resultado |
| --- | --- |
| Rutas | `/` 200 · `/?perfil=sponsor` 200 (perfil preelegido) · `/privacidad`, `/terminos`, `/bases-concursos` 404 (sin texto todavía) · `/no-existe` 404 |
| Contenido | Sale de la plataforma: el texto y los enlaces son idénticos a los de la semilla; ningún `[PENDIENTE` en el HTML; los bloques que no aparecen son los que dependen de un dato pendiente |
| Fotos | Todavía no hay ninguna; ningún `src` con el host `agencia-plataforma` |
| CSS, JS y fuentes | 200; los archivos de `/_astro/` con `Cache-Control: public, max-age=31536000, immutable` |
| JSON-LD `Event` | Nombre, inicio y fin con -05:00, lugar con dirección y 4 `offers` en USD. **Falta** pasarlo por la prueba de resultados enriquecidos de Google (no tengo acceso desde mi entorno) |
| Formulario `participar` | Envío real «PRUEBA Claude (borrar)» → 201. 422 con el error junto al campo; sin JavaScript, 303 de vuelta al formulario; origen ajeno, 403 |
| Formulario `avisos` | Envío real `prueba-avisos@example.com` → 201 |
| LCP (390 px, 4G 1,6 Mbps / 150 ms, CPU ×4, sin caché) | **~1,4 s** con el Worker en caliente. Con una instancia nueva del Worker, ~3,6 s (ver abajo) |
| Prueba de edición (< 20 s) | **Pendiente**: hay que cambiar un texto en el portal |

**Primera visita a una instancia nueva.** Con el Worker en caliente, la página se arma en ~20 ms.
Una instancia nueva tarda 1,4–1,8 s (medido con `wrangler tail`; CPU 36–44 ms): espera a la
plataforma para la versión, los bloques y 16 colecciones. Ya se quitaron las 16 consultas de versión
repetidas (`prepararFuente`). Mejora pendiente: **con dominio propio**, guardar las respuestas en la
Cache API de Cloudflare por versión de contenido. En `*.workers.dev` la Cache API no funciona.

**Fuente display.** Rubik Dirt pesa 247 KB incluso recortada al español (la textura va en cada
glifo). Se precarga y usa `font-display: swap`: el título aparece al instante con la fuente de
respaldo.

### Versiones y cómo volver atrás

| Versión | Qué es |
| --- | --- |
| `ac86b3cc-147e-4895-aeb4-9e86e936cb07` | **Actual**: commit `d75a606` (una sola consulta de versión) |
| `4b1cef8d-df0f-4fcb-9610-144783cb69b0` | Commit `6fdd2ae` (fuente recortada y precargada) |
| `f72789f8-2b2b-4e2d-8d8e-d4bbad40eb73` | Commit `969c98a` + el secreto: la primera versión que funcionó |

```sh
npx wrangler deployments list --name thelion-web
npx wrangler rollback <version-id> --name thelion-web --yes
```

Un rollback no toca el contenido: el contenido vive en la plataforma. Un push a `main` vuelve a
desplegar la última versión del código.

## 7. Preventa y venta en el sitio (2026-10-14)

Copy nuevo (`docs/COPY-THE-LION-HALLOWEEN-PARTY.md`) y referencias en `docs/referencias/`. Commits
`1a80863` (copy) y `ce1784a` (sitio y modelo) en `claude/new-session-i8x2iw`. **Sin fusionar a
`main`**: un push a `main` despliega.

### Cómo funciona la compra ahora

El módulo de boletería del portal todavía no existe (revisado en `agencia-plataforma` el
2026-10-14: `/v1` no expone localidades, cupos ni checkout). Mientras tanto:

- Precios, zonas y textos salen de la colección **Entradas** (`localidades`), como antes.
- Cada tarjeta abre **WhatsApp** con «Hola, quiero comprar entradas {localidad}…»
  (`global.whatsapp.entradas`). **Sin número de WhatsApp no aparece ningún botón de compra.**
- Los «Comprar entradas» generales (portada, menú, secciones) bajan a Entradas.
- Al poner el enlace del checkout (`global.entradas.checkout`), sin tocar código: cada botón abre
  `checkout?zona=<zona>&origen=sitio`, los generales van al checkout y aparecen «Cómo comprar tu
  entrada» (5 pasos), el botón «Comprar entradas», la reserva y el aviso de venta oficial. Los
  nombres de los parámetros se ajustan en `lib/enlaces.ts` cuando el módulo los defina.
- «¿Ya compraste?» (menú, Entradas, pie) aparece al poner `global.entradas.pedidos`.
- **Falta para conectar el módulo:** disponibilidad en vivo («Quedan {n}», «Últimos lugares»,
  «Agotado» y botón desactivado), lugares vendidos apagados en el mapa (cada lugar ya tiene
  `data-lugar`), precios leídos del portal con respaldo de los últimos datos guardados, y las
  `offers` del JSON-LD desde el portal. Nada de eso se simuló.

### Qué cambió en el sitio

| Sección | Cambio |
| --- | --- |
| Portada | «Edición Miami Style» bajo el título; «Preventa desde $10, solo hasta el 28 de octubre.»; el contador corto dice «La preventa termina en…» y cuenta hasta `2026-10-28T23:59:59-05:00` (`global.entradas.finPreventa`), después hasta el evento. Sin JavaScript se ve la fecha del evento, como antes. |
| Entradas | Etiqueta «PREVENTA · SOLO HASTA EL 28 DE OCTUBRE», «Elige tu lugar», mapa SVG por zonas (`components/MapaEvento.astro`, colores dorado, magenta, naranja y cian; cada zona enlaza a su tarjeta) y tarjetas con ubicación, lugares, precio de preventa, precio normal tachado (cuando exista) y botón del color de la zona. El mapa aparece cuando las localidades tienen su «Zona del mapa». |
| Preguntas | Nueva respuesta de «¿Dónde compro las entradas?» y 9 preguntas nuevas; 3 visibles (QR por persona, no imprimir, después del 28) y 6 ocultas hasta tener respuesta. «No me llegó el correo» va oculta: habla de «¿Ya compraste?», que aún no existe. |
| Pie | @thelionus junto a @thelionhalloweenparty; «Términos de compra» (página `/terminos-de-compra`, 404 mientras su texto esté pendiente); «¿Ya compraste?». |
| SEO | Meta descripción nueva; `offers` con `validThrough` de la preventa y enlace de compra (el checkout o, sin él, la sección Entradas). |

Ningún otro cambio visible: medí alto y texto de cada sección antes y después (390 y 1440 px) y
solo cambian portada, Entradas, Preguntas y el pie. La ticketera externa ya no aparece en el repo (solo en el
historial de git). Se borró `scripts/generar-modelo.mjs`, el generador de un solo uso, que la citaba.

### Pasos en la consola, en este orden

Antes del push a `main` (nada de esto rompe el sitio publicado hoy):

1. **Definición de Pasos** ← pegar `plataforma/colecciones/pasos.json`: agrega la opción
   «Entradas» a «Sección». Va antes de importar, para que los 5 pasos nuevos entren bien.
2. **Importar el paquete nuevo** (`npm run paquete` → `paquete/migracion-thelionhalloween.zip`).
   Debe decir: **24 bloques nuevos**, **14 elementos nuevos** (9 preguntas y 5 pasos) y **1
   colección distinta que se omite con aviso** (Entradas: paso 5). Los bloques que ya existen no
   cambian de valor; solo se actualizan etiqueta, ayuda y orden.
3. **Páginas y contenido:** pegar `plataforma/paginas.json` → Validar → Guardar. Agrega «Términos de
   compra» (`/terminos-de-compra`).
4. **Bloques que ya existen: cambiar el valor** (justo antes del push: el texto nuevo ya no nombra a
   la ticketera y el sitio publicado todavía lleva allí):

   | Bloque | Valor nuevo |
   | --- | --- |
   | `inicio.seo.descripcion` | Halloween en familia de 12:00 a 18:00 y fiesta Back to the Old School de 20:00 a 02:00 en Santa Ana Garden. $3.000 en premios. Preventa desde $10 hasta el 28 de octubre. |
   | `inicio.portada.desde` | Preventa desde {precio}, solo hasta el 28 de octubre. |
   | `inicio.entradas.titulo` | Elige tu lugar |
   | `inicio.entradas.texto` | Los precios de preventa valen solo hasta el 28 de octubre; después regresan a su valor normal. Elige tu zona en el mapa y asegura tu lugar. |
   | `inicio.entradas.microcopy` | [PENDIENTE: minutos de reserva] Tus lugares quedan reservados 30 minutos mientras completas el pago. |
   | `inicio.entradas.aviso` | Las entradas se venden solo en este sitio. Tus QR llegan desde un correo @thelionproductions.com y cada uno se puede usar una sola vez. No compres a revendedores. |
   | `global.contacto.whatsapp` | **El número, con código de país (593…). Sin él no hay botón de compra.** |

   Y la respuesta de la pregunta «¿Dónde compro las entradas?» → «Solo en este sitio, con el botón
   «Comprar entradas». Hay cuatro localidades, de $10 a $40 en preventa hasta el 28 de octubre.».
   Luego ordenar las preguntas: las 9 nuevas llegan con orden 1–9 y chocan con las de antes; van
   justo después de «¿Dónde compro las entradas?», como en la semilla.

Después del push a `main` (el sitio nuevo ya no usa el enlace de la ticketera):

5. **Definición de Entradas** ← pegar `plataforma/colecciones/localidades.json`: agrega «Zona del
   mapa», «Ubicación», «Lugares» y «Precio normal»; quita «Enlace de compra»; el precio pasa a
   llamarse «Precio de preventa». Luego, en cada localidad:

   | Elemento | Nombre | Zona | Ubicación | Lugares | Qué incluye | Texto del botón |
   | --- | --- | --- | --- | --- | --- | --- |
   | The Lion Experience VIP | **The Lion VIP Experience** | The Lion VIP | Frente al Escenario 360 | 12 numerados (1–12) | 3 bebidas | Elegir The Lion VIP |
   | Miami Style VIP | (igual) | Miami Style VIP | Segundo anillo | 18 numerados (1–18) | 3 bebidas | Elegir Miami Style VIP |
   | Santa Ana VIP | (igual) | Santa Ana VIP | Anillo exterior | 30 numerados (1–30) | 3 bebidas | Elegir Santa Ana VIP |
   | Preferencia | (igual) | Preferencia | Zonas laterales y del fondo | General, sin numerar | Entrada general | Elegir Preferencia |

   «Precio normal» queda vacío hasta que se confirme; los precios ($40, $30, $20, $10) no cambian.
   Hasta este paso el sitio nuevo muestra las tarjetas sin mapa.
6. Borrar el bloque `global.entradas.enlace` (el enlace general de la ticketera).

### Despliegue y cómo volver atrás

- **No hace falta ningún secreto, variable ni binding nuevo.**
- Pendiente de verificar en producción (no se hizo: no está fusionado): todas las URLs dan 200,
  ningún enlace a la ticketera, cada botón abre WhatsApp con la localidad correcta. La prueba de
  compra completa con datos «PRUEBA» espera al checkout del portal.
- Volver atrás: `npx wrangler rollback ac86b3cc-147e-4895-aeb4-9e86e936cb07 --name thelion-web
  --yes` (la versión actual, commit `d75a606`). Si ya se borró el campo «Enlace de compra» de
  Entradas, los botones de esa versión quedan sin destino: hay que volver a agregarlo.
