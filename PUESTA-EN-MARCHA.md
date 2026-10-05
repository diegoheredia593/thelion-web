# Puesta en marcha en la plataforma — The Lion Halloween Party 2026

Pasos en la consola de la plataforma (superadmin), en este orden. No hace falta código.

Archivos que vas a usar (en el repo `thelion-web`):

- `paquete/migracion-thelionhalloween.zip` — se genera con `npm run paquete` (no está en git; te
  lo paso aparte).
- `plataforma/paginas.json` — para el paso 3.

## 1. Crear el cliente

| Campo | Valor |
| --- | --- |
| Nombre | The Lion Halloween Party |
| Slug | `thelionhalloween` |
| Color de acento | `#ff2bd6` (magenta neón) |

El color es **provisional**: sale de la paleta del diseño. Hay que compararlo con los flyers, que
todavía no están en `docs/referencias/`. Si cambia, se edita después en la ficha del cliente.

## 2. Contenido → Importar paquete

1. Sube `migracion-thelionhalloween.zip`.
2. Revisa la vista previa. Debe decir:
   - **Colecciones:** 16 nuevas (Entradas, Atracciones, Programa de la tarde, Destacados de día y
     de noche, Lo que vas a vivir, Cifras, Concursos, Pasos, Paquetes de stand, Paquetes de sponsor,
     Por qué patrocinar, Atracciones para patrocinar, Line-up, Marcas aliadas, Preguntas frecuentes,
     Fotos de la galería).
   - **Formularios:** 2 nuevos («¿Cómo quieres ser parte?» y «Avisos de la próxima edición»).
   - **Bloques:** 176 nuevos, 172 con valor. Quedan vacíos el logo, la imagen de portada, la
     imagen para compartir y el enlace del media kit. Los datos pendientes llegan como
     `[PENDIENTE: …]` y el sitio no los muestra.
   - **Elementos:** 90 nuevos. Las 5 preguntas frecuentes con respuesta pendiente llegan ocultas a
     propósito.
   - **Fotos:** 0 (todavía no hay fotos).
   - **Advertencias:** ninguna. Si aparece alguna, pásamela antes de aplicar.
3. **Aplicar.**

## 3. Páginas y contenido

Pega el contenido de `plataforma/paginas.json` → **Validar** → **Guardar**. Crea 4 páginas: Inicio
(`/`), Política de privacidad (`/privacidad`), Términos y condiciones (`/terminos`) y Bases de los
concursos (`/bases-concursos`). Todas las colecciones quedan en Inicio.

## 4. Módulos

- Las 16 colecciones se activan solas al importar.
- **Contactos (CRM):** actívalo si el plan del cliente es Pro. El formulario trae WhatsApp y correo,
  así que cada envío crea o actualiza el contacto solo.

## 5. API → llave del sitio

Crea la llave **«Sitio The Lion Halloween Party»** con los dos alcances:

- `contenido:leer`
- `formularios:enviar`

Copia el token (solo se muestra una vez) y pásamelo por un canal privado. Nunca lo pongas en un
archivo, un commit ni una captura. Yo lo configuro como secreto del Worker `thelion-web` **antes**
de cualquier push que lo necesite (Fase 3).

## 6. Equipo → invitar al cliente

Invita a la persona del organizador que va a editar el sitio. Desde su portal puede:

- cambiar textos, precios y enlaces de entradas;
- actualizar «Stands disponibles» (solo el número) a medida que se venden;
- completar los datos pendientes (lista en `REPORTE-PLATAFORMA.md`);
- subir el logo, la imagen de portada, la imagen para compartir y las fotos de la galería y del
  line-up.

## Después de importar: cambios de modelo

Si después cambio la definición de una colección o de un formulario que ya está importado,
reimportar el paquete **no** la pisa. Te aviso cada vez y te paso el JSON nuevo para pegarlo en la
consola.

Cambio ya hecho después de la Fase 0, sin efecto porque aún no hay nada importado: `concursos`
tiene un campo nuevo, `experiencia` (De día / De noche), que da el color a cada tarjeta.
