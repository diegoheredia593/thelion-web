/// <reference types="astro/client" />

declare namespace Cloudflare {
  interface Env {
    /** Service binding al Worker `agencia-plataforma` (contenido y formularios). */
    PLATAFORMA: { fetch: typeof fetch };
    /** Llave de la API de la plataforma (alcances contenido:leer y formularios:enviar). Secreto. */
    PLATAFORMA_LLAVE?: string;
    /** `semilla`: solo en `npm run dev` y sin llave, lee `plataforma/` en vez de la plataforma. */
    FUENTE?: string;
    /** Clave pública de Turnstile (variable). Vacía = sin verificación. */
    TURNSTILE_SITE_KEY?: string;
    /** Clave secreta de Turnstile. Sin ella, los formularios no piden verificación. */
    TURNSTILE_SECRET?: string;
  }
}

/** Entorno del Worker (el sitio no usa los tipos generados de Workers: chocan con los del navegador). */
declare module 'cloudflare:workers' {
  export const env: Cloudflare.Env;
}
