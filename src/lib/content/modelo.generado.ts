// GENERADO por `npm run verificar-modelo -- --escribir` desde plataforma/. No lo edites a mano.

import type { Foto, TextoEnriquecido, VideoYoutube } from '../plataforma/sdk';

export interface Bloques {
  'global.marca.nombre': string | null;
  'global.marca.logo': Foto | null;
  'global.menu.evento': string | null;
  'global.menu.dia': string | null;
  'global.menu.noche': string | null;
  'global.menu.atracciones': string | null;
  'global.menu.concursos': string | null;
  'global.menu.stands': string | null;
  'global.menu.sponsors': string | null;
  'global.menu.preguntas': string | null;
  'global.menu.entradas': string | null;
  'global.entradas.enlace': string | null;
  'global.pie.linea': string | null;
  'global.pie.evento': string | null;
  'global.pie.entradas': string | null;
  'global.pie.stands': string | null;
  'global.pie.sponsors': string | null;
  'global.pie.preguntas': string | null;
  'global.pie.contacto': string | null;
  'global.pie.privacidad': string | null;
  'global.pie.terminos': string | null;
  'global.pie.bases': string | null;
  'global.pie.copyright': string | null;
  'global.pie.credito': string | null;
  'global.redes.instagram': string | null;
  'global.redes.instagramEnlace': string | null;
  'global.contacto.whatsapp': string | null;
  'global.whatsapp.general': string | null;
  'global.whatsapp.stand': string | null;
  'global.whatsapp.sponsor': string | null;
  'global.whatsapp.concursante': string | null;
  'global.evento.inicio': string | null;
  'global.evento.fin': string | null;
  'global.seo.imagen': Foto | null;
  'inicio.seo.titulo': string | null;
  'inicio.seo.descripcion': string | null;
  'inicio.seo.compartirTitulo': string | null;
  'inicio.seo.compartirDescripcion': string | null;
  'inicio.portada.etiqueta': string | null;
  'inicio.portada.titulo': string | null;
  'inicio.portada.subtitulo': string | null;
  'inicio.portada.texto': string | null;
  'inicio.portada.botonEntradas': string | null;
  'inicio.portada.botonStand': string | null;
  'inicio.portada.desde': string | null;
  'inicio.portada.imagen': Foto | null;
  'inicio.portada.faltan': string | null;
  'inicio.portada.dias': string | null;
  'inicio.portada.horas': string | null;
  'inicio.portada.min': string | null;
  'inicio.portada.seg': string | null;
  'inicio.datos.fechaEtiqueta': string | null;
  'inicio.datos.fecha': string | null;
  'inicio.datos.lugarEtiqueta': string | null;
  'inicio.datos.lugar': string | null;
  'inicio.datos.verMapa': string | null;
  'inicio.datos.diaEtiqueta': string | null;
  'inicio.datos.dia': string | null;
  'inicio.datos.nocheEtiqueta': string | null;
  'inicio.datos.noche': string | null;
  'inicio.experiencias.titulo': string | null;
  'inicio.experiencias.diaEtiqueta': string | null;
  'inicio.experiencias.diaTitulo': string | null;
  'inicio.experiencias.diaTexto': string | null;
  'inicio.experiencias.diaBoton': string | null;
  'inicio.experiencias.nocheEtiqueta': string | null;
  'inicio.experiencias.nocheTitulo': string | null;
  'inicio.experiencias.nocheTexto': string | null;
  'inicio.experiencias.nocheBoton': string | null;
  'inicio.vivir.titulo': string | null;
  'inicio.vivir.boton': string | null;
  'inicio.dia.etiqueta': string | null;
  'inicio.dia.titulo': string | null;
  'inicio.dia.texto': string | null;
  'inicio.dia.programaTitulo': string | null;
  'inicio.dia.nota': string | null;
  'inicio.dia.boton': string | null;
  'inicio.noche.etiqueta': string | null;
  'inicio.noche.edadMinima': string | null;
  'inicio.noche.titulo': string | null;
  'inicio.noche.subtitulo': string | null;
  'inicio.noche.texto': string | null;
  'inicio.noche.lineupTitulo': string | null;
  'inicio.noche.cierre': string | null;
  'inicio.noche.boton': string | null;
  'inicio.atracciones.titulo': string | null;
  'inicio.atracciones.subtitulo': string | null;
  'inicio.atracciones.filtroTodo': string | null;
  'inicio.atracciones.filtroDia': string | null;
  'inicio.atracciones.filtroNoche': string | null;
  'inicio.atracciones.ambos': string | null;
  'inicio.atracciones.boton': string | null;
  'inicio.concursos.titulo': string | null;
  'inicio.concursos.texto': string | null;
  'inicio.concursos.cuando': string | null;
  'inicio.concursos.premios': string | null;
  'inicio.concursos.comoParticipar': string | null;
  'inicio.concursos.pasosTitulo': string | null;
  'inicio.concursos.botonInscribir': string | null;
  'inicio.concursos.botonBases': string | null;
  'inicio.entradas.titulo': string | null;
  'inicio.entradas.texto': string | null;
  'inicio.entradas.incluye': string | null;
  'inicio.entradas.microcopy': string | null;
  'inicio.entradas.aviso': string | null;
  'inicio.stands.etiqueta': string | null;
  'inicio.stands.titulo': string | null;
  'inicio.stands.texto': string | null;
  'inicio.stands.disponibles': string | null;
  'inicio.stands.contador': string | null;
  'inicio.stands.espacio': string | null;
  'inicio.stands.incluye': string | null;
  'inicio.stands.adicional': string | null;
  'inicio.stands.horario': string | null;
  'inicio.stands.pasosTitulo': string | null;
  'inicio.stands.botonReservar': string | null;
  'inicio.stands.botonWhatsapp': string | null;
  'inicio.stands.letraPequena': string | null;
  'inicio.stands.reglas': string | null;
  'inicio.sponsors.titulo': string | null;
  'inicio.sponsors.texto': string | null;
  'inicio.sponsors.razonesTitulo': string | null;
  'inicio.sponsors.paquetesTitulo': string | null;
  'inicio.sponsors.atraccionTitulo': string | null;
  'inicio.sponsors.atraccionTexto': string | null;
  'inicio.sponsors.botonSponsor': string | null;
  'inicio.sponsors.botonMediaKit': string | null;
  'inicio.sponsors.mediaKit': string | null;
  'inicio.sponsors.aliadosTitulo': string | null;
  'inicio.galeria.titulo': string | null;
  'inicio.galeria.texto': string | null;
  'inicio.galeria.boton': string | null;
  'inicio.participar.titulo': string | null;
  'inicio.participar.texto': string | null;
  'inicio.participar.boton': string | null;
  'inicio.participar.aviso': string | null;
  'inicio.participar.exito': string | null;
  'inicio.participar.error': string | null;
  'inicio.ubicacion.titulo': string | null;
  'inicio.ubicacion.lugar': string | null;
  'inicio.ubicacion.direccion': string | null;
  'inicio.ubicacion.referenciaEtiqueta': string | null;
  'inicio.ubicacion.referencia': string | null;
  'inicio.ubicacion.parqueoEtiqueta': string | null;
  'inicio.ubicacion.parqueo': string | null;
  'inicio.ubicacion.mapa': string | null;
  'inicio.ubicacion.googleMaps': string | null;
  'inicio.ubicacion.waze': string | null;
  'inicio.ubicacion.botonMaps': string | null;
  'inicio.ubicacion.botonWaze': string | null;
  'inicio.preguntas.titulo': string | null;
  'inicio.final.antesTitulo': string | null;
  'inicio.final.dias': string | null;
  'inicio.final.horas': string | null;
  'inicio.final.minutos': string | null;
  'inicio.final.segundos': string | null;
  'inicio.final.antesTexto': string | null;
  'inicio.final.antesBoton': string | null;
  'inicio.final.durante': string | null;
  'inicio.final.duranteBoton': string | null;
  'inicio.final.despues': string | null;
  'inicio.final.despuesBoton': string | null;
  'inicio.final.avisosCorreo': string | null;
  'inicio.final.avisosBoton': string | null;
  'privacidad.contenido.titulo': string | null;
  'privacidad.contenido.texto': TextoEnriquecido | null;
  'privacidad.seo.titulo': string | null;
  'privacidad.seo.descripcion': string | null;
  'terminos.contenido.titulo': string | null;
  'terminos.contenido.texto': TextoEnriquecido | null;
  'terminos.seo.titulo': string | null;
  'terminos.seo.descripcion': string | null;
  'bases.contenido.titulo': string | null;
  'bases.contenido.texto': TextoEnriquecido | null;
  'bases.seo.titulo': string | null;
  'bases.seo.descripcion': string | null;
}

export type ClaveBloque = keyof Bloques;

/** Campos que la API agrega a todo elemento de colección. */
export interface BaseElemento {
  id: string;
  slug: string | null;
  orden: number;
  creadoEn: string;
  actualizadoEn: string;
}

export interface Artistas extends BaseElemento {
  nombre: string;
  rol: 'artista' | 'dj';
  foto: Foto;
}

export interface Atracciones extends BaseElemento {
  nombre: string;
  texto: string;
  horario: 'dia' | 'noche' | 'ambos' | 'porConfirmar';
  icono: 'calabaza' | 'fantasma' | 'casa' | 'tienda' | 'mascara' | 'dulces' | 'dinosaurio' | 'microfono' | 'disco' | 'escenario' | 'lapida' | 'bus' | 'zombi' | 'toro' | 'pinata' | 'montana' | 'cerveza' | 'trofeo' | 'estrella' | 'personas' | 'reloj' | 'megafono';
  foto: Foto | null;
}

export interface Cifras extends BaseElemento {
  numero: string;
  texto: string;
}

export interface Concursos extends BaseElemento {
  nombre: string;
  experiencia: 'dia' | 'noche';
  publico: string | null;
  cuando: string;
  premios: string;
  reparto: string | null;
  comoParticipar: string | null;
}

export interface Destacados extends BaseElemento {
  texto: string;
  experiencia: 'dia' | 'noche';
  icono: 'calabaza' | 'fantasma' | 'casa' | 'tienda' | 'mascara' | 'dulces' | 'dinosaurio' | 'microfono' | 'disco' | 'escenario' | 'lapida' | 'bus' | 'zombi' | 'toro' | 'pinata' | 'montana' | 'cerveza' | 'trofeo' | 'estrella' | 'personas' | 'reloj' | 'megafono' | null;
}

export interface ExperienciasPatrocinables extends BaseElemento {
  nombre: string;
}

export interface FotosGaleria extends BaseElemento {
  titulo: string;
  foto: Foto;
}

export interface Localidades extends BaseElemento {
  nombre: string;
  precio: number;
  incluye: string[];
  validez: string | null;
  enlace: string;
  textoBoton: string;
  destacada: boolean;
}

export interface MarcasAliadas extends BaseElemento {
  nombre: string;
  logo: Foto;
  enlace: string | null;
}

export interface PaquetesSponsor extends BaseElemento {
  nombre: string;
  subtitulo: string | null;
  beneficios: string[];
  precio: string | null;
}

export interface PaquetesStand extends BaseElemento {
  nombre: string;
  espacio: string;
  incluye: string;
  precio: number;
  adicional: boolean;
}

export interface Pasos extends BaseElemento {
  titulo: string;
  detalle: string | null;
  grupo: 'concurso' | 'stand';
}

export interface Pilares extends BaseElemento {
  titulo: string;
  texto: string;
}

export interface Preguntas extends BaseElemento {
  pregunta: string;
  respuesta: TextoEnriquecido;
}

export interface ProgramaDia extends BaseElemento {
  titulo: string;
  detalle: string | null;
  hora: string | null;
}

export interface RazonesSponsor extends BaseElemento {
  texto: string;
  icono: 'calabaza' | 'fantasma' | 'casa' | 'tienda' | 'mascara' | 'dulces' | 'dinosaurio' | 'microfono' | 'disco' | 'escenario' | 'lapida' | 'bus' | 'zombi' | 'toro' | 'pinata' | 'montana' | 'cerveza' | 'trofeo' | 'estrella' | 'personas' | 'reloj' | 'megafono';
}

export interface Colecciones {
  artistas: Artistas;
  atracciones: Atracciones;
  cifras: Cifras;
  concursos: Concursos;
  destacados: Destacados;
  experienciasPatrocinables: ExperienciasPatrocinables;
  fotosGaleria: FotosGaleria;
  localidades: Localidades;
  marcasAliadas: MarcasAliadas;
  paquetesSponsor: PaquetesSponsor;
  paquetesStand: PaquetesStand;
  pasos: Pasos;
  pilares: Pilares;
  preguntas: Preguntas;
  programaDia: ProgramaDia;
  razonesSponsor: RazonesSponsor;
}

export type ClaveColeccion = keyof Colecciones;
