/**
 * POST /api/formularios/:tipo — recibe los formularios del sitio y los reenvía a la plataforma
 * (`POST /v1/formularios/:tipo`), donde llegan a la bandeja «Formularios» del portal.
 *
 * - Solo desde el propio sitio (`Origin`), con señuelo anti-bots `sitioWeb` y Turnstile opcional
 *   (`TURNSTILE_SITE_KEY` en vars + secreto `TURNSTILE_SECRET`; vacío = desactivado).
 * - Valida con la MISMA función que la plataforma (`validateFormSubmission`, copia en
 *   `scripts/nucleo/forms.ts`) para no gastar el límite de envíos en errores evitables.
 * - Reenvía con la IP real del visitante (`cf-connecting-ip`) y la página.
 * - JSON (con JavaScript): 201 / 422 con cada error junto a su campo / 429 con mensaje / 502.
 *   Form-data (sin JavaScript): redirige a la página con #<tipo>-enviado o #<tipo>-error.
 */
import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import participar from '../../../../plataforma/formularios/participar.json';
import avisos from '../../../../plataforma/formularios/avisos.json';
import { parseFormDefinition, validateFormSubmission, type FormDefinition } from '../../../../scripts/nucleo/forms';
import { plataforma } from '../../../lib/plataforma/cliente';
import { ErrorApiPlataforma } from '../../../lib/plataforma/sdk';

const DEFINICIONES = new Map<string, FormDefinition>(
  [participar, avisos].map((d) => {
    const r = parseFormDefinition(d);
    if (!r.ok) throw new Error(`Definición de formulario inválida: ${d.key}`);
    return [r.definition.key, r.definition];
  }),
);

/** Mensajes técnicos de interfaz (no son contenido editable; ver REPORTE-PLATAFORMA.md). */
const MENSAJE_LIMITE = 'Enviaste varios formularios seguidos. Espera unos minutos e inténtalo de nuevo.';
const MENSAJE_CAMPOS = 'Revisa los campos marcados.';

/** Solo rutas internas para volver (evita redirecciones abiertas). */
const rutaSegura = (v: unknown) => (typeof v === 'string' && /^\/[a-z0-9\-/]*$/i.test(v) && !v.startsWith('//') ? v : '/');

export const POST: APIRoute = async ({ params, request, url }) => {
  const def = DEFINICIONES.get(params.tipo ?? '');
  if (!def) return Response.json({ ok: false }, { status: 404 });
  if (request.headers.get('Origin') !== url.origin) return Response.json({ ok: false }, { status: 403 });

  const esJson = (request.headers.get('content-type') ?? '').includes('application/json');
  let crudo: Record<string, unknown>;
  try {
    crudo = esJson ? await request.json() : Object.fromEntries((await request.formData()).entries());
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  if (typeof crudo !== 'object' || crudo === null) return Response.json({ ok: false }, { status: 400 });

  const origen = rutaSegura(crudo['_origen']);
  const volver = (r: 'enviado' | 'error') => new Response(null, { status: 303, headers: { Location: `${origen}#${def.key}-${r}` } });

  // Señuelo: un bot lo llena; se finge éxito sin enviar nada.
  if (typeof crudo['sitioWeb'] === 'string' && crudo['sitioWeb'].trim() !== '') {
    return esJson ? Response.json({ ok: true }, { status: 201 }) : volver('enviado');
  }

  const ip = request.headers.get('cf-connecting-ip') ?? undefined;
  if (env.TURNSTILE_SECRET && !(await turnstileValido(env.TURNSTILE_SECRET, crudo['cf-turnstile-response'], ip))) {
    return esJson ? Response.json({ ok: false }, { status: 403 }) : volver('error');
  }

  // Solo los campos de la definición (un campo de más es un 422 en la plataforma); vacíos fuera.
  const datos: Record<string, string> = {};
  for (const f of def.fields) {
    const v = crudo[f.name];
    if (typeof v === 'string' && v.trim() !== '') datos[f.name] = v;
  }
  const validado = validateFormSubmission(def, datos);
  if (!validado.ok) {
    const errores = Object.fromEntries(validado.errors.map((e) => [e.field, e.message]));
    return esJson ? Response.json({ ok: false, errores, mensaje: MENSAJE_CAMPOS }, { status: 422 }) : volver('error');
  }

  try {
    await plataforma().enviarFormulario(def.key, validado.data, { ip, pagina: origen });
  } catch (e) {
    if (e instanceof ErrorApiPlataforma && e.status === 429) {
      const headers: Record<string, string> = e.reintentarEnSegundos ? { 'Retry-After': String(e.reintentarEnSegundos) } : {};
      return esJson ? Response.json({ ok: false, mensaje: MENSAJE_LIMITE }, { status: 429, headers }) : volver('error');
    }
    if (e instanceof ErrorApiPlataforma && e.status === 422) {
      const errores: Record<string, string> = {};
      for (const { campo, mensaje } of e.errores) if (campo && !errores[campo]) errores[campo] = mensaje;
      return esJson ? Response.json({ ok: false, errores, mensaje: MENSAJE_CAMPOS }, { status: 422 }) : volver('error');
    }
    console.error('No se pudo enviar el formulario a la plataforma', e);
    return esJson ? Response.json({ ok: false }, { status: 502 }) : volver('error');
  }
  return esJson ? Response.json({ ok: true }, { status: 201 }) : volver('enviado');
};

export const ALL: APIRoute = () => new Response(null, { status: 405, headers: { Allow: 'POST' } });

/** Verifica el token de Cloudflare Turnstile. */
async function turnstileValido(secreto: string, token: unknown, ip: string | undefined) {
  if (typeof token !== 'string' || !token || token.length > 2048) return false;
  try {
    const cuerpo = new URLSearchParams({ secret: secreto, response: token });
    if (ip) cuerpo.set('remoteip', ip);
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: cuerpo, signal: AbortSignal.timeout(5000) });
    return ((await r.json()) as { success?: boolean }).success === true;
  } catch {
    return false;
  }
}
