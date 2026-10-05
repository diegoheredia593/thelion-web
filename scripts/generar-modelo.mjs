/**
 * Generador ÚNICO Y DE UN SOLO USO de `plataforma/` a partir del copy aprobado
 * (`docs/COPY-THE-LION-HALLOWEEN-PARTY.md`). Se conserva como registro de cómo se armó el modelo.
 *
 * Desde que `plataforma/` existe, la fuente de verdad son sus JSON: edítalos directamente. Volver a
 * correr esto PISA esos archivos (`node scripts/generar-modelo.mjs --forzar`).
 */
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const RAIZ = new URL('..', import.meta.url).pathname;
const DIR = join(RAIZ, 'plataforma');
if (existsSync(join(DIR, 'bloques.json')) && !process.argv.includes('--forzar')) {
  console.error('plataforma/ ya existe: edita sus JSON. Para regenerar (pisa todo): --forzar');
  process.exit(1);
}

const P = (que) => `[PENDIENTE: ${que}]`;
const TICKETSHOW = 'https://www.ticketshow.com.ec/evento/THE-LION-HALLOWEEN-PARTY-GUAYAQUIL-2026';
const ticketshow = (contenido) =>
  `${TICKETSHOW}?utm_source=web&utm_medium=landing&utm_campaign=lion2026&utm_content=${contenido}`;
const DIRECCION = 'Santa Ana Garden, 4to Callejón 11 NE, Guayaquil';
const rich = (...parrafos) => parrafos.map((text) => ({ type: 'paragraph', content: [{ text }] }));

// ---------------------------------------------------------------------------
// Bloques
// ---------------------------------------------------------------------------

const bloques = [];
let orden = 0;
/** b(clave, etiqueta, valor, opciones) — control `text` y nivel `content` por defecto. */
function b(key, label, value, o = {}) {
  const [page, section] = key.split('.');
  bloques.push({
    key,
    page,
    section,
    label,
    help: o.help ?? null,
    control: o.control ?? 'text',
    level: o.level ?? 'content',
    maxLength: o.maxLength ?? null,
    required: o.required ?? false,
    order: orden++,
    value,
  });
}
const largo = { control: 'textLong' };

// global — marca, menú, pie, redes, WhatsApp, evento, SEO
b('global.marca.nombre', 'Nombre del evento', 'The Lion Halloween Party', {
  help: 'Se usa como logo de texto mientras no haya logo, y en los datos para Google.',
  required: true,
});
b('global.marca.logo', 'Logo', null, { control: 'image', help: 'Si está vacío, se muestra el nombre del evento en letras.' });
b('global.menu.evento', 'Menú: El evento', 'El evento');
b('global.menu.dia', 'Menú: De día', 'De día');
b('global.menu.noche', 'Menú: De noche', 'De noche');
b('global.menu.atracciones', 'Menú: Atracciones', 'Atracciones');
b('global.menu.concursos', 'Menú: Concursos', 'Concursos');
b('global.menu.stands', 'Menú: Stands', 'Stands');
b('global.menu.sponsors', 'Menú: Sponsors', 'Sponsors');
b('global.menu.preguntas', 'Menú: Preguntas', 'Preguntas');
b('global.menu.entradas', 'Botón de entradas del menú', 'Comprar entradas', {
  help: 'Siempre visible arriba, también en el celular.',
});
b('global.entradas.enlace', 'Enlace general de compra en Ticketshow', ticketshow('general'), {
  control: 'url',
  help: 'Lo usan los botones «Comprar entradas» que no son de una localidad concreta.',
  required: true,
});
b('global.pie.linea', 'Frase del pie de página', 'Este Halloween tiene rey.');
b('global.pie.evento', 'Pie: El evento', 'El evento');
b('global.pie.entradas', 'Pie: Entradas', 'Entradas');
b('global.pie.stands', 'Pie: Stands', 'Stands');
b('global.pie.sponsors', 'Pie: Sponsors', 'Sponsors');
b('global.pie.preguntas', 'Pie: Preguntas frecuentes', 'Preguntas frecuentes');
b('global.pie.contacto', 'Pie: Contacto', 'Contacto', { help: 'Lleva al formulario «¿Cómo quieres ser parte?».' });
b('global.pie.privacidad', 'Pie: Política de privacidad', 'Política de privacidad');
b('global.pie.terminos', 'Pie: Términos y condiciones', 'Términos y condiciones');
b('global.pie.bases', 'Pie: Bases de los concursos', 'Bases de los concursos');
b('global.pie.copyright', 'Pie: derechos', '© 2026 The Lion Halloween Party');
b('global.pie.credito', 'Pie: crédito del sitio', P('Sitio por [agencia]'));
b('global.redes.instagram', 'Usuario de Instagram', '@thelionhalloweenparty');
b('global.redes.instagramEnlace', 'Enlace de Instagram', 'https://www.instagram.com/thelionhalloweenparty/', {
  control: 'url',
});
b('global.contacto.whatsapp', 'Número de WhatsApp', P('número de WhatsApp'), {
  help: 'Con código de país y sin signos, por ejemplo 593991234567. Si está vacío, no aparece ningún botón de WhatsApp.',
});
b('global.whatsapp.general', 'Mensaje de WhatsApp: general', 'Hola, quiero información sobre The Lion Halloween Party.', largo);
b(
  'global.whatsapp.stand',
  'Mensaje de WhatsApp: stands',
  'Hola, quiero reservar un stand para The Lion Halloween Party. Me interesa el Paquete __ y [sí / no] la extensión nocturna.',
  { ...largo, help: 'Los espacios «__» y «[sí / no]» los completa la persona antes de enviar.' },
);
b(
  'global.whatsapp.sponsor',
  'Mensaje de WhatsApp: sponsors',
  'Hola, me interesa ser sponsor de The Lion Halloween Party. Mi marca es __.',
  largo,
);
b(
  'global.whatsapp.concursante',
  'Mensaje de WhatsApp: concursantes',
  'Hola, quiero inscribirme en el concurso de [disfraces / talentos] de [día / noche].',
  largo,
);
b('global.evento.inicio', 'Inicio del evento (contador)', '2026-10-31T12:00:00-05:00', {
  level: 'system',
  help: 'Formato ISO con la zona de Ecuador (-05:00).',
  required: true,
});
b('global.evento.fin', 'Fin del evento (contador)', '2026-11-01T02:00:00-05:00', {
  level: 'system',
  help: 'Formato ISO con la zona de Ecuador (-05:00).',
  required: true,
});
b('global.seo.imagen', 'Imagen para compartir (1200 × 630)', null, {
  control: 'image',
  help: 'La que aparece al compartir el enlace en WhatsApp, Instagram o Facebook.',
});

// inicio — SEO
b('inicio.seo.titulo', 'Título de la página en Google', 'The Lion Halloween Party 2026 · 31 oct · Guayaquil', { maxLength: 70 });
b(
  'inicio.seo.descripcion',
  'Descripción en Google',
  'Halloween en familia de 12:00 a 18:00 y fiesta Back to the Old School de 20:00 a 02:00 en Santa Ana Garden. $3.000 en premios. Entradas en Ticketshow.',
  { ...largo, maxLength: 170 },
);
b('inicio.seo.compartirTitulo', 'Título al compartir', 'The Lion Halloween Party 2026');
b('inicio.seo.compartirDescripcion', 'Descripción al compartir', 'Sábado 31 de octubre · De día en familia, de noche old school.');

// §1 Portada
b('inicio.portada.etiqueta', 'Portada: etiqueta superior', 'SÁBADO 31 DE OCTUBRE · SANTA ANA GARDEN · GUAYAQUIL');
b('inicio.portada.titulo', 'Portada: título grande', 'The Lion Halloween Party 2026', { required: true });
b('inicio.portada.subtitulo', 'Portada: subtítulo', 'Este Halloween tiene rey.');
b(
  'inicio.portada.texto',
  'Portada: texto',
  'De día, Halloween en familia. De noche, el regreso del reggaetón old school. Disfraces, shows en vivo, casa del terror, dinosaurios, zombies y $3.000 en premios en 12 horas de Halloween.',
  largo,
);
b('inicio.portada.botonEntradas', 'Portada: botón principal', 'Comprar entradas');
b('inicio.portada.botonStand', 'Portada: botón secundario', 'Reservar un stand');
b('inicio.portada.desde', 'Portada: frase bajo los botones', 'Entradas desde {precio} en Ticketshow.', {
  help: '{precio} se reemplaza solo por el precio de la entrada visible más barata.',
});
b('inicio.portada.imagen', 'Portada: imagen de fondo', null, {
  control: 'image',
  help: 'Horizontal, oscura o con espacio para el texto. Si está vacía, se usa el fondo de diseño.',
});
b('inicio.portada.faltan', 'Portada: contador «Faltan»', 'Faltan');
b('inicio.portada.dias', 'Portada: contador «Días»', 'Días');
b('inicio.portada.horas', 'Portada: contador «Horas»', 'Horas');
b('inicio.portada.min', 'Portada: contador «Min»', 'Min');
b('inicio.portada.seg', 'Portada: contador «Seg»', 'Seg');

// §1 Franja de datos
b('inicio.datos.fechaEtiqueta', 'Franja: rótulo de la fecha', 'Fecha');
b('inicio.datos.fecha', 'Franja: fecha', 'Sábado 31 de octubre de 2026', {
  help: 'También se muestra en lugar del contador cuando el navegador no ejecuta JavaScript.',
});
b('inicio.datos.lugarEtiqueta', 'Franja: rótulo del lugar', 'Lugar');
b('inicio.datos.lugar', 'Franja: lugar', 'Santa Ana Garden, Guayaquil');
b('inicio.datos.verMapa', 'Franja: enlace al mapa', 'Ver mapa');
b('inicio.datos.diaEtiqueta', 'Franja: rótulo de día', 'De día');
b('inicio.datos.dia', 'Franja: horario de día', '12:00 a 18:00 · Familias');
b('inicio.datos.nocheEtiqueta', 'Franja: rótulo de noche', 'De noche');
b('inicio.datos.noche', 'Franja: horario de noche', '20:00 a 02:00 · Fiesta');

// §2 Dos experiencias
b('inicio.experiencias.titulo', 'Dos experiencias: título', 'Un solo día. Dos maneras de vivir Halloween.');
b('inicio.experiencias.diaEtiqueta', 'Tarjeta De día: etiqueta', 'DE DÍA · 12:00 A 18:00');
b('inicio.experiencias.diaTitulo', 'Tarjeta De día: título', 'Halloween en familia');
b(
  'inicio.experiencias.diaTexto',
  'Tarjeta De día: texto',
  'Para niños, adolescentes y toda la familia. Personajes en vivo, dulce o truco, dinosaurios sueltos, concursos de disfraces y talentos y $1.000 en premios.',
  largo,
);
b('inicio.experiencias.diaBoton', 'Tarjeta De día: botón', 'Ver programa de día');
b('inicio.experiencias.nocheEtiqueta', 'Tarjeta De noche: etiqueta', 'DE NOCHE · 20:00 A 02:00');
b('inicio.experiencias.nocheTitulo', 'Tarjeta De noche: título', 'Back to the Old School');
b(
  'inicio.experiencias.nocheTexto',
  'Tarjeta De noche: texto',
  'La fiesta. 7 artistas en tributo al reggaetón clásico, 3 de los mejores DJs de latin music, escenario 360 y $2.000 en premios para los mejores disfraces.',
  largo,
);
b('inicio.experiencias.nocheBoton', 'Tarjeta De noche: botón', 'Ver la fiesta de noche');

// §3 Lo que vas a vivir
b('inicio.vivir.titulo', 'Lo que vas a vivir: título', 'Más que una fiesta: una experiencia inolvidable.');
b('inicio.vivir.boton', 'Lo que vas a vivir: botón', 'Asegurar mi entrada');

// §4 De día
b('inicio.dia.etiqueta', 'De día: etiqueta', 'DE DÍA · 12:00 A 18:00 · NIÑOS, ADOLESCENTES Y FAMILIAS');
b('inicio.dia.titulo', 'De día: título', 'Halloween en familia');
b(
  'inicio.dia.texto',
  'De día: texto',
  'Saca el disfraz del clóset y trae a toda la familia. La tarde arranca con la inscripción de concursantes y no para: personajes de Toy Story, Beetlejuice y K-pop en vivo, dulce o truco, dinosaurios sueltos y $1.000 en premios para los mejores disfraces y talentos.',
  largo,
);
b('inicio.dia.programaTitulo', 'De día: título del programa', 'Programa de la tarde');
b('inicio.dia.nota', 'De día: nota bajo el programa', 'Toda la tarde: dulce o truco, Zona Jurásica, casa del terror y DJ.');
b('inicio.dia.boton', 'De día: botón', 'Comprar entradas');

// §5 De noche
b('inicio.noche.etiqueta', 'De noche: etiqueta', 'DE NOCHE · 20:00 A 02:00');
b('inicio.noche.edadMinima', 'De noche: edad mínima', P('edad mínima'), {
  help: 'Se muestra junto a la etiqueta, por ejemplo «+18».',
});
b('inicio.noche.titulo', 'De noche: título', 'Back to the Old School');
b('inicio.noche.subtitulo', 'De noche: subtítulo', 'La fiesta de Halloween que trae de vuelta el reggaetón clásico.');
b(
  'inicio.noche.texto',
  'De noche: texto',
  'Cuando cae el sol, Santa Ana Garden se transforma. Siete artistas en vivo rinden tributo al reggaetón que marcó una época, tres de los mejores DJs de latin music mantienen la pista encendida y un escenario 360 te pone en el centro del show. Entre canción y canción: un cementerio hecho discoteca, una casa del terror para entrar mientras rumbeas y un party bus dentro de la fiesta.',
  largo,
);
b('inicio.noche.lineupTitulo', 'De noche: título del line-up', 'Line-up', {
  help: 'El line-up solo aparece cuando hay artistas visibles.',
});
b('inicio.noche.cierre', 'De noche: frase de cierre', 'Ven disfrazado. La pista es tuya y el premio puede ser tuyo también.');
b('inicio.noche.boton', 'De noche: botón', 'Comprar entradas');

// §6 Atracciones
b('inicio.atracciones.titulo', 'Atracciones: título', 'Todo lo que te espera');
b('inicio.atracciones.subtitulo', 'Atracciones: subtítulo', '12 horas, dos experiencias y sustos en cada rincón.');
b('inicio.atracciones.filtroTodo', 'Atracciones: filtro «Todo»', 'Todo');
b('inicio.atracciones.filtroDia', 'Atracciones: filtro y etiqueta «De día»', 'De día');
b('inicio.atracciones.filtroNoche', 'Atracciones: filtro y etiqueta «De noche»', 'De noche');
b('inicio.atracciones.ambos', 'Atracciones: etiqueta «Día y noche»', 'Día y noche');
b('inicio.atracciones.boton', 'Atracciones: botón', 'Comprar entradas');

// §7 Concursos
b('inicio.concursos.titulo', 'Concursos: título', 'Tu disfraz puede ganar');
b(
  'inicio.concursos.texto',
  'Concursos: texto',
  'Hay $3.000 en premios repartidos en tres concursos. De día compiten disfraces y talentos; de noche, el mejor disfraz de la fiesta. Prepárate, inscríbete y sube a la pasarela.',
  largo,
);
b('inicio.concursos.cuando', 'Concursos: rótulo «Cuándo»', 'Cuándo');
b('inicio.concursos.premios', 'Concursos: rótulo «Premios»', 'Premios');
b('inicio.concursos.comoParticipar', 'Concursos: rótulo «Cómo participar»', 'Cómo participar');
b('inicio.concursos.pasosTitulo', 'Concursos: título de los pasos', 'Cómo participar');
b('inicio.concursos.botonInscribir', 'Concursos: botón de inscripción', 'Inscribirme');
b('inicio.concursos.botonBases', 'Concursos: botón de bases', 'Ver bases del concurso', {
  help: 'Solo aparece cuando la página de bases tiene texto.',
});

// §8 Entradas
b('inicio.entradas.titulo', 'Entradas: título', 'Elige tu experiencia');
b(
  'inicio.entradas.texto',
  'Entradas: texto',
  'Las entradas se venden solo en Ticketshow, el canal oficial. Elige tu localidad y asegura tu lugar.',
  largo,
);
b('inicio.entradas.incluye', 'Entradas: rótulo «Incluye»', 'Incluye');
b('inicio.entradas.microcopy', 'Entradas: texto bajo los botones', 'Serás redirigido a Ticketshow para completar tu compra.');
b(
  'inicio.entradas.aviso',
  'Entradas: aviso de seguridad',
  'Compra solo en Ticketshow. No nos hacemos responsables por entradas compradas a terceros.',
  largo,
);

// §9 Stands
b('inicio.stands.etiqueta', 'Stands: etiqueta', 'PAQUETES PARA EMPRENDEDORES');
b('inicio.stands.titulo', 'Stands: título', 'Vende en el Halloween de Guayaquil');
b(
  'inicio.stands.texto',
  'Stands: texto',
  'Pon tu emprendimiento frente a familias por la tarde y, si quieres, frente a la fiesta por la noche. Elige tu paquete, reserva tu espacio y nosotros ponemos la gente.',
  largo,
);
b('inicio.stands.disponibles', 'Stands disponibles', '100', {
  help: 'Solo el número. Actualízalo a medida que se venden.',
});
b('inicio.stands.contador', 'Stands: frase del contador', 'Quedan {n} stands disponibles.', {
  help: '{n} se reemplaza por el número de «Stands disponibles».',
});
b('inicio.stands.espacio', 'Stands: rótulo «Espacio»', 'Espacio');
b('inicio.stands.incluye', 'Stands: rótulo «Incluye»', 'Incluye');
b('inicio.stands.adicional', 'Stands: nota de la extensión', 'Adicional a cualquier paquete');
b(
  'inicio.stands.horario',
  'Stands: horario',
  'Horario base: 12:00 a 18:00. Con la extensión nocturna, tu stand se traslada al área de emprendedores de la entrada principal y atiende hasta las 02:00.',
  largo,
);
b('inicio.stands.pasosTitulo', 'Stands: título de los pasos', 'Cómo reservar');
b('inicio.stands.botonReservar', 'Stands: botón de reserva', 'Reservar mi stand');
b('inicio.stands.botonWhatsapp', 'Stands: botón de WhatsApp', 'Preguntar por WhatsApp');
b('inicio.stands.letraPequena', 'Stands: letra pequeña', 'Cupos limitados. La reserva se confirma con el pago.');
b('inicio.stands.reglas', 'Stands: rubros permitidos y reglas', P('rubros permitidos y reglas, por ejemplo venta de alcohol'), largo);

// §10 Sponsors
b('inicio.sponsors.titulo', 'Sponsors: título', 'Pon tu marca en el centro de Halloween');
b(
  'inicio.sponsors.texto',
  'Sponsors: texto',
  'Un solo día te da dos públicos: familias con niños y adolescentes por la tarde, y adultos de fiesta por la noche. Tu marca puede estar en los dos, durante 12 horas, en el escenario, en los concursos y en las redes del evento.',
  largo,
);
b('inicio.sponsors.razonesTitulo', 'Sponsors: título de «Por qué patrocinar»', 'Por qué patrocinar');
b('inicio.sponsors.paquetesTitulo', 'Sponsors: título de los paquetes', 'Paquetes');
b('inicio.sponsors.atraccionTitulo', 'Sponsors: título de «Patrocina una atracción»', 'Patrocina una atracción');
b(
  'inicio.sponsors.atraccionTexto',
  'Sponsors: texto de «Patrocina una atracción»',
  'Pon tu nombre en una experiencia concreta, por ejemplo «Party Bus by tu marca».',
  largo,
);
b('inicio.sponsors.botonSponsor', 'Sponsors: botón principal', 'Quiero ser sponsor');
b('inicio.sponsors.botonMediaKit', 'Sponsors: botón del media kit', 'Descargar media kit');
b('inicio.sponsors.mediaKit', 'Sponsors: enlace al media kit (PDF)', null, {
  control: 'url',
  help: 'Mientras esté vacío, el botón «Descargar media kit» no aparece.',
});
b('inicio.sponsors.aliadosTitulo', 'Sponsors: título de la franja de marcas', 'Ya confían en nosotros', {
  help: 'La franja aparece cuando hay al menos 3 marcas aliadas visibles.',
});

// §11 Galería
b('inicio.galeria.titulo', 'Galería: título', 'Síguenos y no te pierdas nada');
b('inicio.galeria.texto', 'Galería: texto', 'Line-up, anuncios y sorpresas salen primero en Instagram.');
b('inicio.galeria.boton', 'Galería: botón', 'Seguir en Instagram');

// §12 Participar
b('inicio.participar.titulo', 'Formulario: título', '¿Cómo quieres ser parte?');
b('inicio.participar.texto', 'Formulario: texto', 'Elige tu perfil y déjanos tus datos. Te escribimos por WhatsApp.');
b('inicio.participar.boton', 'Formulario: botón', 'Enviar');
b(
  'inicio.participar.aviso',
  'Formulario: aviso de privacidad',
  'Al enviar, aceptas que usemos tus datos para contactarte sobre este evento, según la Política de privacidad.',
  { ...largo, help: '«Política de privacidad» se convierte en enlace cuando esa página tiene texto.' },
);
b('inicio.participar.exito', 'Formulario: mensaje de éxito', '¡Listo! Recibimos tus datos. Pronto te escribimos por WhatsApp.');
b('inicio.participar.error', 'Formulario: mensaje de error', 'Algo salió mal. Inténtalo de nuevo o escríbenos por WhatsApp.');

// §13 Ubicación
b('inicio.ubicacion.titulo', 'Ubicación: título', 'Cómo llegar');
b('inicio.ubicacion.lugar', 'Ubicación: lugar', 'Santa Ana Garden');
b('inicio.ubicacion.direccion', 'Ubicación: dirección', '4to Callejón 11 NE, Guayaquil');
b('inicio.ubicacion.referenciaEtiqueta', 'Ubicación: rótulo «Referencia»', 'Referencia:');
b('inicio.ubicacion.referencia', 'Ubicación: referencia', P('referencia del lugar'));
b('inicio.ubicacion.parqueoEtiqueta', 'Ubicación: rótulo «Parqueo»', 'Parqueo:');
b('inicio.ubicacion.parqueo', 'Ubicación: parqueo', P('parqueo'));
b(
  'inicio.ubicacion.mapa',
  'Ubicación: mapa incrustado (URL)',
  `https://www.google.com/maps?q=${encodeURIComponent(DIRECCION)}&output=embed`,
  { control: 'url', help: 'URL de «Insertar un mapa» de Google Maps (la que va en el src del iframe).' },
);
b(
  'inicio.ubicacion.googleMaps',
  'Ubicación: enlace a Google Maps',
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(DIRECCION)}`,
  { control: 'url' },
);
b('inicio.ubicacion.waze', 'Ubicación: enlace a Waze', `https://waze.com/ul?q=${encodeURIComponent(DIRECCION)}&navigate=yes`, {
  control: 'url',
});
b('inicio.ubicacion.botonMaps', 'Ubicación: botón de Google Maps', 'Abrir en Google Maps');
b('inicio.ubicacion.botonWaze', 'Ubicación: botón de Waze', 'Abrir en Waze');

// §14 Preguntas
b('inicio.preguntas.titulo', 'Preguntas frecuentes: título', 'Preguntas frecuentes');

// §15 Cuenta regresiva final
b('inicio.final.antesTitulo', 'Cuenta final: título (antes)', 'Faltan');
b('inicio.final.dias', 'Cuenta final: «Días»', 'Días');
b('inicio.final.horas', 'Cuenta final: «Horas»', 'Horas');
b('inicio.final.minutos', 'Cuenta final: «Minutos»', 'Minutos');
b('inicio.final.segundos', 'Cuenta final: «Segundos»', 'Segundos');
b('inicio.final.antesTexto', 'Cuenta final: texto (antes)', 'El 31 de octubre, Halloween tiene rey. ¿Ya tienes tu entrada?');
b('inicio.final.antesBoton', 'Cuenta final: botón (antes)', 'Comprar entradas');
b('inicio.final.durante', 'Cuenta final: texto (durante)', '¡Ya empezó! Te esperamos en Santa Ana Garden.');
b('inicio.final.duranteBoton', 'Cuenta final: botón (durante)', 'Cómo llegar');
b('inicio.final.despues', 'Cuenta final: texto (después)', 'Gracias por rugir con nosotros. Nos vemos en 2027.');
b('inicio.final.despuesBoton', 'Cuenta final: botón (después)', 'Ver fotos del evento');
b('inicio.final.avisosCorreo', 'Cuenta final: rótulo del correo para avisos', P('rótulo del campo de correo'), {
  help: 'Aparece después del evento. Mientras esté vacío, no se muestra el campo de correo.',
});
b('inicio.final.avisosBoton', 'Cuenta final: botón del correo para avisos', P('texto del botón'));

// Páginas legales
for (const [page, titulo] of [
  ['privacidad', 'Política de privacidad'],
  ['terminos', 'Términos y condiciones'],
  ['bases', 'Bases de los concursos'],
]) {
  b(`${page}.contenido.titulo`, `${titulo}: título`, titulo);
  b(`${page}.contenido.texto`, `${titulo}: texto`, rich(P(`texto de ${titulo.toLowerCase()}`)), {
    control: 'rich',
    help: 'Mientras esté vacío, la página no existe y no aparecen los enlaces a ella.',
  });
  b(`${page}.seo.titulo`, `${titulo}: título en Google`, `${titulo} · The Lion Halloween Party 2026`, { maxLength: 70 });
  b(`${page}.seo.descripcion`, `${titulo}: descripción en Google`, P(`descripción de ${titulo.toLowerCase()}`), {
    ...largo,
    maxLength: 170,
  });
}

// ---------------------------------------------------------------------------
// Colecciones
// ---------------------------------------------------------------------------

const ICONOS = [
  ['calabaza', 'Calabaza'],
  ['fantasma', 'Fantasma'],
  ['casa', 'Casa embrujada'],
  ['tienda', 'Tienda / feria'],
  ['mascara', 'Máscara / personajes'],
  ['dulces', 'Dulces'],
  ['dinosaurio', 'Dinosaurio'],
  ['microfono', 'Micrófono / concierto'],
  ['disco', 'Disco / DJ'],
  ['escenario', 'Escenario'],
  ['lapida', 'Lápida'],
  ['bus', 'Bus'],
  ['zombi', 'Zombi'],
  ['toro', 'Toro mecánico'],
  ['pinata', 'Piñata'],
  ['montana', 'Juegos mecánicos'],
  ['cerveza', 'Cerveza'],
  ['trofeo', 'Trofeo / premio'],
  ['estrella', 'Estrella / talento'],
  ['personas', 'Público'],
  ['reloj', 'Reloj'],
  ['megafono', 'Megáfono / difusión'],
].map(([value, label]) => ({ value, label }));
const icono = (required = false) => ({
  name: 'icono',
  control: 'option',
  label: 'Ícono',
  help: 'Dibujo del set del sitio que acompaña al texto.',
  required,
  options: ICONOS,
});

const colecciones = {
  localidades: {
    key: 'localidades',
    label: 'Entradas',
    singular: 'localidad',
    gender: 'f',
    description: 'Tipos de entrada a la venta en Ticketshow. La portada muestra el precio de la más barata visible.',
    titleField: 'nombre',
    searchFields: ['nombre'],
    sortBy: 'order',
    fields: [
      { name: 'nombre', control: 'text', label: 'Nombre de la localidad', required: true, max: 60 },
      { name: 'precio', control: 'number', label: 'Precio (USD)', required: true, min: 0 },
      { name: 'incluye', control: 'textList', label: 'Qué incluye', help: 'Un beneficio por línea.', required: false, max: 8, maxItem: 120 },
      { name: 'validez', control: 'text', label: 'Para qué horario vale', help: 'Por ejemplo: «Tarde y noche».', required: false, max: 80 },
      { name: 'enlace', control: 'url', label: 'Enlace de compra en Ticketshow', required: true },
      { name: 'textoBoton', control: 'text', label: 'Texto del botón', required: true, max: 40 },
      { name: 'destacada', control: 'checkbox', label: 'Destacar esta localidad', required: false },
    ],
  },
  atracciones: {
    key: 'atracciones',
    label: 'Atracciones',
    singular: 'atracción',
    gender: 'f',
    description: 'Tarjetas de «Todo lo que te espera», filtrables por De día y De noche.',
    titleField: 'nombre',
    searchFields: ['nombre', 'texto'],
    sortBy: 'order',
    fields: [
      { name: 'nombre', control: 'text', label: 'Nombre', required: true, max: 60 },
      { name: 'texto', control: 'textLong', label: 'Texto de la tarjeta', required: true, max: 120 },
      {
        name: 'horario',
        control: 'option',
        label: 'Horario',
        help: '«Día y noche» aparece en los dos filtros. «Por confirmar» solo en «Todo» y sin etiqueta.',
        required: true,
        options: [
          { value: 'dia', label: 'De día' },
          { value: 'noche', label: 'De noche' },
          { value: 'ambos', label: 'Día y noche' },
          { value: 'porConfirmar', label: 'Por confirmar' },
        ],
      },
      icono(true),
      { name: 'foto', control: 'image', label: 'Foto (opcional)', help: 'Si tiene foto, reemplaza al ícono.', required: false, aspectRatio: '4:3' },
    ],
  },
  programaDia: {
    key: 'programaDia',
    label: 'Programa de la tarde',
    singular: 'momento del programa',
    gender: 'm',
    description: 'Línea de tiempo de la experiencia De día, en orden.',
    titleField: 'titulo',
    sortBy: 'order',
    fields: [
      { name: 'titulo', control: 'text', label: 'Qué pasa', required: true, max: 80 },
      { name: 'detalle', control: 'text', label: 'Detalle', required: false, max: 120 },
      { name: 'hora', control: 'text', label: 'Hora', help: 'Por ejemplo: «12:30».', required: false, max: 20 },
    ],
  },
  destacados: {
    key: 'destacados',
    label: 'Destacados de día y de noche',
    singular: 'destacado',
    gender: 'm',
    description: 'Íconos de la sección De día y lista de la sección De noche.',
    titleField: 'texto',
    sortBy: 'order',
    fields: [
      { name: 'texto', control: 'text', label: 'Texto', required: true, max: 100 },
      {
        name: 'experiencia',
        control: 'option',
        label: 'Sección',
        required: true,
        options: [
          { value: 'dia', label: 'De día' },
          { value: 'noche', label: 'De noche' },
        ],
      },
      icono(false),
    ],
  },
  pilares: {
    key: 'pilares',
    label: 'Lo que vas a vivir',
    singular: 'columna',
    gender: 'f',
    description: 'Las cuatro columnas de «Más que una fiesta».',
    titleField: 'titulo',
    sortBy: 'order',
    fields: [
      { name: 'titulo', control: 'text', label: 'Título', required: true, max: 60 },
      { name: 'texto', control: 'textLong', label: 'Texto', required: true, max: 220 },
    ],
  },
  cifras: {
    key: 'cifras',
    label: 'Cifras',
    singular: 'cifra',
    gender: 'f',
    description: 'Banda de números grandes con un texto corto debajo.',
    titleField: 'numero',
    sortBy: 'order',
    fields: [
      { name: 'numero', control: 'text', label: 'Número', help: 'Por ejemplo: «$3.000» o «12 horas».', required: true, max: 20 },
      { name: 'texto', control: 'text', label: 'Texto debajo', required: true, max: 60 },
    ],
  },
  concursos: {
    key: 'concursos',
    label: 'Concursos',
    singular: 'concurso',
    gender: 'm',
    description: 'Los concursos de día y de noche.',
    titleField: 'nombre',
    sortBy: 'order',
    fields: [
      { name: 'nombre', control: 'text', label: 'Nombre', required: true, max: 60 },
      { name: 'publico', control: 'text', label: 'Para quién', required: false, max: 80 },
      { name: 'cuando', control: 'text', label: 'Cuándo', required: true, max: 80 },
      { name: 'premios', control: 'text', label: 'Premios', required: true, max: 80 },
      { name: 'reparto', control: 'text', label: 'Reparto de los premios', help: 'Se muestra después de «Premios».', required: false, max: 160 },
      { name: 'comoParticipar', control: 'text', label: 'Cómo participar', required: false, max: 160 },
    ],
  },
  pasos: {
    key: 'pasos',
    label: 'Pasos',
    singular: 'paso',
    gender: 'm',
    description: 'Pasos de «Cómo participar» (concursos) y de «Cómo reservar» (stands).',
    titleField: 'titulo',
    sortBy: 'order',
    fields: [
      { name: 'titulo', control: 'text', label: 'Paso', required: true, max: 100 },
      { name: 'detalle', control: 'text', label: 'Detalle', required: false, max: 160 },
      {
        name: 'grupo',
        control: 'option',
        label: 'Sección',
        required: true,
        options: [
          { value: 'concurso', label: 'Concursos' },
          { value: 'stand', label: 'Stands' },
        ],
      },
    ],
  },
  paquetesStand: {
    key: 'paquetesStand',
    label: 'Paquetes de stand',
    singular: 'paquete de stand',
    gender: 'm',
    description: 'Paquetes para emprendedores y la extensión nocturna.',
    titleField: 'nombre',
    sortBy: 'order',
    fields: [
      { name: 'nombre', control: 'text', label: 'Nombre', required: true, max: 60 },
      { name: 'espacio', control: 'text', label: 'Espacio', required: true, max: 100 },
      { name: 'incluye', control: 'textLong', label: 'Incluye', required: true, max: 160 },
      { name: 'precio', control: 'number', label: 'Precio (USD)', required: true, min: 0 },
      { name: 'adicional', control: 'checkbox', label: 'Es un adicional', help: 'Se muestra con «+» delante del precio.', required: false },
    ],
  },
  paquetesSponsor: {
    key: 'paquetesSponsor',
    label: 'Paquetes de sponsor',
    singular: 'paquete de sponsor',
    gender: 'm',
    description: 'Paquetes de patrocinio con sus beneficios.',
    titleField: 'nombre',
    sortBy: 'order',
    fields: [
      { name: 'nombre', control: 'text', label: 'Nombre', required: true, max: 40 },
      { name: 'subtitulo', control: 'text', label: 'Subtítulo', required: false, max: 80 },
      { name: 'beneficios', control: 'textList', label: 'Beneficios', help: 'Un beneficio por línea.', required: true, max: 12, maxItem: 160 },
      { name: 'precio', control: 'text', label: 'Precio', help: 'Como debe leerse, por ejemplo «$1.500» o «Desde $500».', required: false, max: 40 },
    ],
  },
  razonesSponsor: {
    key: 'razonesSponsor',
    label: 'Por qué patrocinar',
    singular: 'razón',
    gender: 'f',
    description: 'Íconos de «Por qué patrocinar».',
    titleField: 'texto',
    sortBy: 'order',
    fields: [{ name: 'texto', control: 'text', label: 'Texto', required: true, max: 100 }, icono(true)],
  },
  experienciasPatrocinables: {
    key: 'experienciasPatrocinables',
    label: 'Atracciones para patrocinar',
    singular: 'atracción para patrocinar',
    gender: 'f',
    description: 'Lista de «Patrocina una atracción».',
    titleField: 'nombre',
    sortBy: 'order',
    fields: [{ name: 'nombre', control: 'text', label: 'Nombre', required: true, max: 60 }],
  },
  artistas: {
    key: 'artistas',
    label: 'Line-up',
    singular: 'artista',
    gender: 'm',
    description: 'Artistas y DJs de la noche. La sección se oculta mientras no haya ninguno visible.',
    titleField: 'nombre',
    searchFields: ['nombre'],
    sortBy: 'order',
    fields: [
      { name: 'nombre', control: 'text', label: 'Nombre', required: true, max: 60 },
      {
        name: 'rol',
        control: 'option',
        label: 'Rol',
        required: true,
        options: [
          { value: 'artista', label: 'Artista' },
          { value: 'dj', label: 'DJ' },
        ],
      },
      { name: 'foto', control: 'image', label: 'Foto', help: 'Cuadrada, con la cara centrada.', required: true, aspectRatio: '1:1' },
    ],
  },
  marcasAliadas: {
    key: 'marcasAliadas',
    label: 'Marcas aliadas',
    singular: 'marca aliada',
    gender: 'f',
    description: 'Logos de sponsors confirmados. La franja aparece con 3 o más visibles.',
    titleField: 'nombre',
    searchFields: ['nombre'],
    sortBy: 'order',
    fields: [
      { name: 'nombre', control: 'text', label: 'Marca', required: true, max: 60 },
      { name: 'logo', control: 'image', label: 'Logo', help: 'PNG o WebP con fondo transparente, de preferencia claro.', required: true },
      { name: 'enlace', control: 'url', label: 'Sitio web de la marca', required: false },
    ],
  },
  preguntas: {
    key: 'preguntas',
    label: 'Preguntas frecuentes',
    singular: 'pregunta',
    gender: 'f',
    description: 'Preguntas frecuentes, en el orden en que se muestran.',
    titleField: 'pregunta',
    searchFields: ['pregunta'],
    sortBy: 'order',
    fields: [
      { name: 'pregunta', control: 'text', label: 'Pregunta', required: true, max: 140 },
      { name: 'respuesta', control: 'rich', label: 'Respuesta', required: true, max: 800 },
    ],
  },
  fotosGaleria: {
    key: 'fotosGaleria',
    label: 'Fotos de la galería',
    singular: 'foto',
    gender: 'f',
    description: 'Fotos de la sección «Síguenos». Se muestran hasta 9.',
    titleField: 'titulo',
    sortBy: 'order',
    fields: [
      { name: 'titulo', control: 'text', label: 'Nombre interno', help: 'Solo para reconocerla en el portal.', required: true, max: 60 },
      { name: 'foto', control: 'image', label: 'Foto', required: true, aspectRatio: '1:1' },
    ],
  },
};

// ---------------------------------------------------------------------------
// Semilla
// ---------------------------------------------------------------------------

const semilla = {};
function el(coleccion, idOrigen, datos, estado = 'visible') {
  const lista = (semilla[coleccion] ??= []);
  lista.push({ idOrigen, slug: null, estado, orden: lista.length, datos });
}

for (const [id, nombre, precio, boton] of [
  ['lion-experience-vip', 'The Lion Experience VIP', 40, 'Comprar Lion Experience VIP'],
  ['miami-style-vip', 'Miami Style VIP', 30, 'Comprar Miami Style VIP'],
  ['santa-ana-vip', 'Santa Ana VIP', 20, 'Comprar Santa Ana VIP'],
  ['preferencia', 'Preferencia', 10, 'Comprar Preferencia'],
])
  el('localidades', `localidad-${id}`, {
    nombre,
    precio,
    incluye: [P('beneficios')],
    validez: P('tarde, noche o ambas'),
    enlace: ticketshow(id),
    textoBoton: boton,
    destacada: false,
  });

for (const [id, nombre, texto, horario, ic] of [
  ['casa-del-terror', 'Casa del Terror', '15 × 9 metros de sustos. ¿Entras o te quedas mirando?', 'ambos', 'casa'],
  ['feria', 'Feria de emprendedores', 'Emprendimientos locales con comida, productos y más.', 'ambos', 'tienda'],
  ['personajes', 'Personajes en vivo', 'Shows de Toy Story, Beetlejuice y K-pop para chicos y grandes.', 'dia', 'mascara'],
  ['dulce-o-truco', 'Dulce o truco', 'La tradición de siempre: ningún niño se va con las manos vacías.', 'dia', 'dulces'],
  ['zona-jurasica', 'Zona Jurásica', 'Una zona tomada por dinosaurios. Trae la cámara.', 'dia', 'dinosaurio'],
  ['concierto', 'Concierto Back to the Old School', '7 artistas en vivo en tributo al reggaetón clásico.', 'noche', 'microfono'],
  ['djs', '3 DJs de latin music', 'Tres de los mejores DJs de latin music, sin pausa hasta las 2:00.', 'noche', 'disco'],
  ['escenario-360', 'Escenario 360', 'El show pasa a tu alrededor, no solo frente a ti.', 'noche', 'escenario'],
  ['cementerio', 'Cementerio Discoteque', 'Baila entre lápidas en la pista más oscura de la noche.', 'noche', 'lapida'],
  ['party-bus', 'Party Bus', 'Un bus de fiesta dentro de la fiesta. Súbete y sigue bailando.', 'noche', 'bus'],
  ['dinosaurios-zombies', 'Dinosaurios y zombies rondando', 'No se quedan quietos: rondan el evento y te pueden encontrar.', 'porConfirmar', 'zombi'],
  ['toro', 'Toro loco mecánico', '¿Cuántos segundos aguantas arriba?', 'porConfirmar', 'toro'],
  ['pinata', 'Piñata gigante con premios', 'Una piñata tamaño Halloween, llena de premios.', 'porConfirmar', 'pinata'],
  ['juegos', 'Juegos mecánicos', 'Para que la adrenalina no baje.', 'porConfirmar', 'montana'],
  ['cerveza', 'Cerveza artesanal y asados', 'Para recargar energía entre show y show.', 'porConfirmar', 'cerveza'],
])
  el('atracciones', `atraccion-${id}`, { nombre, texto, horario, icono: ic, foto: null });

for (const [id, titulo, detalle] of [
  ['inscripcion', 'Inscripción oficial', 'De concursantes de disfraces y de talentos'],
  ['toy-story', 'Show de Toy Story en vivo', null],
  ['talentos-1', 'Show de talentos', 'Primera ronda: 5 participantes'],
  ['pasarela-1', 'Primera pasarela de disfraces', null],
  ['beetlejuice', 'Show de Beetlejuice en vivo', null],
  ['talentos-2', 'Show de talentos', 'Segunda ronda: 5 participantes más'],
  ['pasarela-2', 'Segunda pasarela de disfraces', null],
  ['premiacion', 'Premiación', 'De disfraces y talentos'],
  ['kpop', 'Show de K-pop en vivo', null],
  ['cierre', 'Cierre con concierto en vivo', null],
])
  el('programaDia', `programa-${id}`, { titulo, detalle, hora: P('hora') });

for (const [id, texto, ic] of [
  ['dulce-o-truco', 'Dulce o truco', 'dulces'],
  ['personajes', 'Personajes en vivo', 'mascara'],
  ['zona-jurasica', 'Zona Jurásica', 'dinosaurio'],
  ['casa-del-terror', 'Casa del terror', 'casa'],
  ['disfraces', 'Concurso de disfraces', 'calabaza'],
  ['talentos', 'Concurso de talentos', 'estrella'],
  ['premios', '$1.000 en premios', 'trofeo'],
])
  el('destacados', `destacado-dia-${id}`, { texto, experiencia: 'dia', icono: ic });
for (const [id, texto, ic] of [
  ['concierto', 'Concierto en vivo: 7 artistas en tributo al reggaetón clásico', 'microfono'],
  ['djs', '3 de los mejores DJs de latin music', 'disco'],
  ['escenario-360', 'Escenario 360', 'escenario'],
  ['cementerio', 'Cementerio Discoteque', 'lapida'],
  ['casa-del-terror', 'Casa del terror, mientras rumbeas', 'casa'],
  ['party-bus', 'Party bus dentro de la fiesta', 'bus'],
  ['zombies', 'Zombies rondando la fiesta', 'zombi'],
  ['premios', '$2.000 en premios para los mejores disfraces', 'trofeo'],
  ['cerveza', 'Cerveza artesanal y asados', 'cerveza'],
])
  el('destacados', `destacado-noche-${id}`, { texto, experiencia: 'noche', icono: ic });

for (const [id, titulo, texto] of [
  ['terror', 'Un mundo de terror a tu alrededor.', 'Casa del terror, un cementerio convertido en discoteca, zombies y dinosaurios rondando. Aquí el susto no se queda en la puerta.'],
  ['shows', 'Shows en vivo todo el día.', 'Personajes de Toy Story, Beetlejuice y K-pop por la tarde; concierto old school y DJs por la noche.'],
  ['disfraz', 'Tu disfraz puede ganar.', '$3.000 en premios entre los concursos de día y de noche. Pasarelas, jurado y premiación en vivo.'],
  ['comer', 'Para comer, brindar y bailar.', 'Cerveza artesanal, asados, feria de emprendedores, toro mecánico y una piñata gigante llena de premios.'],
])
  el('pilares', `pilar-${id}`, { titulo, texto });

for (const [id, numero, texto] of [
  ['premios', '$3.000', 'en premios'],
  ['horas', '12 horas', 'de Halloween'],
  ['artistas', '7 artistas', 'en tributo al reggaetón clásico'],
  ['djs', '3 DJs', 'de latin music'],
  ['experiencias', '2 experiencias', 'de día y de noche'],
])
  el('cifras', `cifra-${id}`, { numero, texto });

el('concursos', 'concurso-disfraces-dia', {
  nombre: 'Disfraces de día',
  publico: 'Niños, adolescentes y familias',
  cuando: '12:00–18:00, dos pasarelas',
  premios: 'Parte de los $1.000 de la tarde',
  reparto: P('reparto de los premios'),
  comoParticipar: 'Inscripción oficial al inicio de la jornada',
});
el('concursos', 'concurso-talentos-dia', {
  nombre: 'Talentos de día',
  publico: null,
  cuando: '12:00–18:00, dos rondas de shows',
  premios: 'Parte de los $1.000 de la tarde',
  reparto: P('reparto de los premios'),
  comoParticipar: 'Inscripción oficial al inicio de la jornada',
});
el('concursos', 'concurso-disfraces-noche', {
  nombre: 'Disfraces de noche',
  publico: null,
  cuando: '20:00–02:00',
  premios: '$2.000',
  reparto: P('reparto de los premios'),
  comoParticipar: P('inscripción y hora de pasarela'),
});

for (const [id, titulo, detalle] of [
  ['entrada', 'Compra tu entrada', 'Para el horario en que quieres concursar.'],
  ['inscripcion', 'Inscríbete', 'Al llegar, en la mesa oficial de inscripción, o antes con el formulario del sitio.'],
  ['pasarela', 'Sube a la pasarela', 'O al escenario. El jurado elige y la premiación es en vivo.'],
])
  el('pasos', `paso-concurso-${id}`, { titulo, detalle, grupo: 'concurso' });
for (const [id, titulo, detalle] of [
  ['paquete', 'Elige tu paquete.', null],
  ['formulario', 'Llena el formulario con los datos de tu emprendimiento y lo que vendes.', null],
  ['pago', 'Paga y envía tu comprobante.', P('método de pago')],
  ['confirmacion', 'Recibe la confirmación y la ubicación de tu stand.', null],
])
  el('pasos', `paso-stand-${id}`, { titulo, detalle, grupo: 'stand' });

el('paquetesStand', 'stand-paquete-1', { nombre: 'Paquete 1 · Completo', espacio: '3 × 3 m', incluye: 'Carpa, luz, mesa y 2 sillas', precio: 120, adicional: false });
el('paquetesStand', 'stand-paquete-2', { nombre: 'Paquete 2 · Solo espacio', espacio: '3 × 3 m', incluye: 'Luz (sin carpa, mesa ni sillas)', precio: 80, adicional: false });
el('paquetesStand', 'stand-extension', {
  nombre: 'Extensión nocturna',
  espacio: 'Área especial de emprendedores en la entrada principal',
  incluye: 'Seguir vendiendo durante la fiesta, hasta las 02:00',
  precio: 50,
  adicional: true,
});

el('paquetesSponsor', 'sponsor-rugido', {
  nombre: 'Rugido',
  subtitulo: 'Sponsor presentador (1 cupo)',
  beneficios: [
    '«The Lion Halloween Party presentado por tu marca»',
    'Logo principal en escenario y en todas las piezas',
    'Menciones del animador',
    'Espacio de activación',
    'Entradas de cortesía',
    'Exclusividad de categoría',
  ],
  precio: P('precio'),
});
el('paquetesSponsor', 'sponsor-garra', {
  nombre: 'Garra',
  subtitulo: 'Sponsor oficial',
  beneficios: ['Logo en escenario y en el sitio', 'Menciones', 'Espacio de activación', 'Publicaciones en redes', 'Entradas de cortesía'],
  precio: P('precio'),
});
el('paquetesSponsor', 'sponsor-huella', {
  nombre: 'Huella',
  subtitulo: 'Aliado',
  beneficios: ['Logo en el sitio y en piezas digitales', 'Una publicación en redes', 'Entradas de cortesía'],
  precio: P('precio'),
});

for (const [id, texto, ic] of [
  ['publicos', 'Dos públicos en un día', 'personas'],
  ['horas', '12 horas de exposición', 'reloj'],
  ['concursos', 'Concursos con $3.000 en premios que generan contenido', 'trofeo'],
  ['difusion', 'Difusión en @thelionhalloweenparty', 'megafono'],
])
  el('razonesSponsor', `razon-${id}`, { texto, icono: ic });

for (const [id, nombre] of [
  ['casa-del-terror', 'Casa del Terror'],
  ['party-bus', 'Party Bus'],
  ['cementerio', 'Cementerio Discoteque'],
  ['escenario-360', 'Escenario 360'],
  ['concurso-disfraces', 'Concurso de disfraces'],
  ['pinata', 'Piñata gigante'],
])
  el('experienciasPatrocinables', `patrocinable-${id}`, { nombre });

for (const [id, pregunta, respuesta] of [
  ['entradas', '¿Dónde compro las entradas?', 'Solo en Ticketshow, desde los botones de este sitio. Hay cuatro localidades, de $10 a $40.'],
  ['tarde-y-noche', '¿Mi entrada vale para la tarde y la noche?', null],
  ['menores', '¿Pueden entrar menores a la fiesta de noche?', null],
  ['disfraz', '¿Es obligatorio ir disfrazado?', 'No, pero es Halloween: con disfraz lo vives mejor y puedes concursar.'],
  ['concursos', '¿Cómo participo en los concursos?', 'Inscríbete al inicio de la jornada en la mesa oficial de inscripción. Revisa las bases en la sección Concursos.'],
  ['comida', '¿Hay comida y bebida?', 'Sí: cerveza artesanal, asados y la feria de emprendedores.'],
  ['parqueo', '¿Hay parqueo?', null],
  ['reingreso', '¿Puedo salir y volver a entrar?', null],
  ['prohibidos', '¿Qué no puedo llevar?', null],
  ['stand', '¿Cómo reservo un stand?', 'Elige tu paquete en la sección Stands y llena el formulario. La reserva se confirma con el pago.'],
])
  el(
    'preguntas',
    `pregunta-${id}`,
    { pregunta, respuesta: rich(respuesta ?? P(id === 'prohibidos' ? 'objetos prohibidos' : 'respuesta')) },
    respuesta ? 'visible' : 'hidden',
  );

// ---------------------------------------------------------------------------
// Formularios y páginas
// ---------------------------------------------------------------------------

const formularios = {
  participar: {
    key: 'participar',
    label: '¿Cómo quieres ser parte?',
    active: true,
    fields: [
      { name: 'nombre', label: 'Nombre', type: 'text', required: true, max: 120 },
      { name: 'telefono', label: 'WhatsApp', type: 'phone', required: true },
      { name: 'email', label: 'Correo', type: 'email', required: false },
      {
        name: 'perfil',
        label: 'Perfil',
        type: 'option',
        required: true,
        options: ['Asistente', 'Emprendedor (stand)', 'Sponsor', 'Concursante'].map((v) => ({ value: v, label: v })),
      },
      { name: 'empresa', label: 'Nombre del emprendimiento o marca', type: 'text', required: false, max: 120 },
      {
        name: 'paquete',
        label: 'Paquete de interés',
        type: 'option',
        required: false,
        options: [
          'Paquete 1 · Completo',
          'Paquete 2 · Solo espacio',
          'Paquete 1 + extensión nocturna',
          'Paquete 2 + extensión nocturna',
        ].map((v) => ({ value: v, label: v })),
      },
      {
        name: 'categoria',
        label: 'Categoría y horario',
        type: 'option',
        required: false,
        options: ['Disfraces de día', 'Talentos de día', 'Disfraces de noche'].map((v) => ({ value: v, label: v })),
      },
      { name: 'mensaje', label: 'Mensaje', type: 'textLong', required: false, max: 1500 },
    ],
  },
  avisos: {
    key: 'avisos',
    label: 'Avisos de la próxima edición',
    active: true,
    fields: [{ name: 'email', label: 'Correo', type: 'email', required: true }],
  },
};

const paginas = {
  pages: [
    { key: 'inicio', name: 'Inicio', route: '/' },
    { key: 'privacidad', name: 'Política de privacidad', route: '/privacidad' },
    { key: 'terminos', name: 'Términos y condiciones', route: '/terminos' },
    { key: 'bases', name: 'Bases de los concursos', route: '/bases-concursos' },
  ],
  collections: Object.keys(colecciones).map((collection) => ({ collection, page: 'inicio' })),
};

// ---------------------------------------------------------------------------
// Escritura
// ---------------------------------------------------------------------------

const escribir = (ruta, datos) => {
  const destino = join(DIR, ruta);
  mkdirSync(join(destino, '..'), { recursive: true });
  writeFileSync(destino, JSON.stringify(datos, null, 2) + '\n');
};
escribir('paginas.json', paginas);
escribir('bloques.json', bloques);
for (const [k, def] of Object.entries(colecciones)) {
  escribir(`colecciones/${k}.json`, def);
  escribir(`semilla/${k}.json`, semilla[k] ?? []);
}
for (const [k, def] of Object.entries(formularios)) escribir(`formularios/${k}.json`, def);
console.log(
  `plataforma/: ${bloques.length} bloques, ${Object.keys(colecciones).length} colecciones, ` +
    `${Object.values(semilla).flat().length} elementos, ${Object.keys(formularios).length} formularios.`,
);
