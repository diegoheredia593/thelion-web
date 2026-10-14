/** Enlaces que arma el sitio a partir de bloques. */
import type { Bloques } from './content';

/** `https://wa.me/<número>?text=…`, o `null` si no hay número (o está pendiente). */
export function enlaceWhatsapp(numero: string | null, mensaje: string | null): string | null {
  const digitos = (numero ?? '').replace(/\D/g, '');
  if (digitos.length < 8) return null;
  return `https://wa.me/${digitos}${mensaje ? `?text=${encodeURIComponent(mensaje)}` : ''}`;
}

/** Perfiles que se pueden preelegir con `?perfil=…#participar` (valor del formulario `participar`). */
export const PERFILES = {
  asistente: 'Asistente',
  emprendedor: 'Emprendedor (stand)',
  sponsor: 'Sponsor',
  concursante: 'Concursante',
} as const;
export type Perfil = keyof typeof PERFILES;

/** Enlace al formulario con el perfil ya elegido (lo lee el servidor: funciona sin JavaScript). */
export const alFormulario = (perfil: Perfil) => `/?perfil=${perfil}#participar`;

/**
 * Destino de los «Comprar entradas» generales: el checkout del portal cuando exista; mientras
 * tanto, la sección Entradas, para elegir localidad (cada una se compra por WhatsApp).
 */
export function enlaceEntradas(b: Bloques): string {
  return b.t('global.entradas.checkout') ?? '/#entradas';
}

/**
 * Botón de una localidad: el checkout con la zona ya elegida y el origen marcado (los nombres de los
 * parámetros se ajustan cuando el módulo de boletería los defina); sin checkout, WhatsApp con un
 * mensaje que nombra la localidad. `null` si no hay ninguno de los dos.
 */
export function enlaceLocalidad(b: Bloques, localidad: { nombre: string; zona?: string | null }): string | null {
  const checkout = b.t('global.entradas.checkout');
  if (checkout) {
    const url = new URL(checkout);
    if (localidad.zona) url.searchParams.set('zona', localidad.zona);
    url.searchParams.set('origen', 'sitio');
    return url.href;
  }
  return enlaceWhatsapp(b.t('global.contacto.whatsapp'), b.plantilla('global.whatsapp.entradas', { localidad: localidad.nombre }));
}
