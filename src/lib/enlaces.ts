/** Enlaces que arma el sitio a partir de bloques. */

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
