# Reporte de plataforma — The Lion Halloween Party 2026

Estado: **Fase 2 terminada** (el sitio lee todo de `plataforma/` en modo semilla). Faltan la Fase 3
(llave y conexión) y la Fase 4 (despliegue y verificación en producción).

- Cliente: `thelionhalloween` · Worker: `thelion-web` · Repo: `diegoheredia593/thelion-web`
- Modelo: `plataforma/` (176 bloques, 16 colecciones, 90 elementos, 2 formularios, 4 páginas).
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
- **Ticketshow con UTM:** no pude comprobar desde mi entorno (la red bloquea Ticketshow) que el
  evento abre bien con `?utm_source=web&utm_medium=landing&utm_campaign=lion2026&utm_content=…`.
  Hay que probarlo en un navegador. Si falla, se cambian los enlaces en Entradas y en «Enlace
  general de compra en Ticketshow».
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
| §1 | «Entradas desde $10 en Ticketshow.» | Igual, pero el precio sale solo de la localidad visible más barata | Pedido del prompt. |

Enlaces que el copy no define y elegí:

- «Comprar entradas» del menú baja a la sección Entradas, para elegir localidad. Los demás «Comprar
  entradas» van directo a Ticketshow.
- «Ver mapa» y «Cómo llegar» bajan a Ubicación.
- «Ver fotos del evento» baja a la galería.
- «Contacto» del pie lleva al formulario.

## 3. Mapa página → bloques y colecciones

**Inicio (`/`)**

| Sección | Bloques | Colecciones |
| --- | --- | --- |
| Menú, pie, WhatsApp, SEO común | `global.marca.*`, `global.menu.*`, `global.entradas.enlace`, `global.pie.*`, `global.redes.*`, `global.contacto.whatsapp`, `global.whatsapp.*`, `global.evento.*` (system), `global.seo.imagen` | — |
| SEO | `inicio.seo.*` | `localidades` (JSON-LD `Event` con un `offers` por localidad) |
| 1 Portada + franja | `inicio.portada.*`, `inicio.datos.*` | `localidades` (precio «desde») |
| 2 Dos experiencias | `inicio.experiencias.*` | — |
| 3 Lo que vas a vivir | `inicio.vivir.*` | `pilares`, `cifras` |
| 4 De día | `inicio.dia.*` | `destacados` (Día), `programaDia` |
| 5 De noche | `inicio.noche.*` | `destacados` (Noche), `artistas` |
| 6 Atracciones | `inicio.atracciones.*` | `atracciones` |
| 7 Concursos | `inicio.concursos.*` | `concursos`, `pasos` (Concurso) |
| 8 Entradas | `inicio.entradas.*` | `localidades` |
| 9 Stands | `inicio.stands.*` | `paquetesStand`, `pasos` (Stand) |
| 10 Sponsors | `inicio.sponsors.*` | `razonesSponsor`, `paquetesSponsor`, `experienciasPatrocinables`, `marcasAliadas` |
| 11 Galería | `inicio.galeria.*` | `fotosGaleria` |
| 12 Formulario | `inicio.participar.*` | formulario `participar` |
| 13 Ubicación | `inicio.ubicacion.*` | — |
| 14 Preguntas | `inicio.preguntas.titulo` | `preguntas` |
| 15 Cuenta final | `inicio.final.*` | formulario `avisos` |

**Privacidad (`/privacidad`), Términos (`/terminos`) y Bases (`/bases-concursos`):** cada una usa
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

Todavía no se ha importado. Al validar el paquete con los mismos esquemas del importador
(`npm run verificar-modelo`), no hay errores ni advertencias. Se completará después del paso 2 de
`PUESTA-EN-MARCHA.md`.

## 6. Despliegue y verificación en producción (Fase 4)

- **Workers Builds: no está conectado** (confirmado por el usuario el 2026-10-06). El despliegue es
  manual con `wrangler`, desde `origin/main`.
- Verificación: pendiente.
