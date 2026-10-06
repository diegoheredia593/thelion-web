/**
 * Cliente de la plataforma (`agencia-plataforma`) para este sitio — la única fuente de contenido y
 * el único destino de los formularios desde el corte a la plataforma.
 *
 * - **Producción**: service binding `PLATAFORMA` (`wrangler.jsonc`). Una llamada de Worker a Worker
 *   por `*.workers.dev` falla con el error 1042; con el binding no sale a internet. La plataforma
 *   reconoce al cliente por la llave, no por el host, así que cualquier URL válida sirve; se usa la
 *   del modo temporal (`/c/thelionhalloween`).
 * - **Local** (`astro dev`): `fetch` normal a la URL pública del Worker de la plataforma.
 *
 * La llave (`PLATAFORMA_LLAVE`, con los alcances `contenido:leer` y `formularios:enviar`) es un
 * secreto de servidor: `.dev.vars` en local y `wrangler versions secret put` en producción. Nunca
 * llega al navegador (ni hay CORS en /v1 para que pudiera usarse desde él).
 */
import { env } from 'cloudflare:workers';
import { crearCliente, type Cliente } from './sdk';
import { ORIGEN_PUBLICO_PLATAFORMA } from './medios';

const URL_PUBLICA = `${ORIGEN_PUBLICO_PLATAFORMA}/c/thelionhalloween/v1`;
const URL_BINDING = 'https://agencia-plataforma/c/thelionhalloween/v1';

let cliente: Cliente | undefined;

export function plataforma(): Cliente {
  if (cliente) return cliente;
  const llave = env.PLATAFORMA_LLAVE;
  if (!llave) throw new Error('Falta el secreto PLATAFORMA_LLAVE (ver .dev.vars.example).');
  const conBinding = !import.meta.env.DEV && env.PLATAFORMA;
  // Solo en `npm run dev`: otra URL base (p. ej. un relevo local cuando la red no deja salir a workerd).
  const urlLocal = (import.meta.env.DEV && env.PLATAFORMA_URL_DEV) || URL_PUBLICA;
  cliente = conBinding
    ? crearCliente({ url: URL_BINDING, llave, fetch: env.PLATAFORMA.fetch.bind(env.PLATAFORMA) })
    : crearCliente({ url: urlLocal, llave });
  return cliente;
}
