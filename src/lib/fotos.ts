/**
 * Único helper de imágenes del sitio: atributos de un `<img>` a partir de una foto de la plataforma,
 * con `srcset` + `sizes` desde sus variantes (480/960/1600 px) y TODA url pasada por
 * `urlPublicaDeMedio()` (por el binding, la plataforma arma los `src` con el host ficticio
 * `agencia-plataforma`, que en el navegador sale roto).
 *
 * `sizes` es el ancho con que la foto se MUESTRA en cada lugar (no el de la pantalla). `prioridad` es
 * para la imagen principal de la página: sin `lazy` y con `fetchpriority="high"`.
 */
import { imagenResponsiva, type Foto } from './plataforma/sdk';
import { urlPublicaDeMedio } from './plataforma/medios';

export interface OpcionesFoto {
  /** Atributo `sizes`: ancho con que se muestra la foto según la pantalla. Por defecto `100vw`. */
  sizes?: string | undefined;
  prioridad?: boolean | undefined;
  /** Texto alternativo propio (p. ej. '' en una imagen decorativa). */
  alt?: string | undefined;
}

/** Para un `<img {...atributosFoto(foto, { sizes })}>` de Astro. */
export function atributosFoto(foto: Foto, { sizes, prioridad, alt }: OpcionesFoto = {}) {
  const { srcSet, fetchPriority, ...resto } = imagenResponsiva(
    {
      ...foto,
      src: urlPublicaDeMedio(foto.src),
      alt: alt ?? foto.alt,
      variantes: (foto.variantes ?? []).map((v) => ({ ...v, src: urlPublicaDeMedio(v.src) })),
    },
    { sizes, prioritaria: prioridad },
  );
  return { ...resto, srcset: srcSet, fetchpriority: fetchPriority };
}

/** URL pública de una foto, sin `<img>` (p. ej. `og:image` o el JSON-LD). */
export function urlFoto(foto: Foto): string {
  return urlPublicaDeMedio(foto.src);
}
