/**
 * Relevo local para `npm run dev` cuando workerd no puede salir a internet directo (p. ej. un sandbox
 * que solo deja salir por HTTPS_PROXY). Escucha en 127.0.0.1:8788 y reenvía cada petición a la
 * plataforma con el `fetch` de Node, que sí usa el proxy:
 *
 *   NODE_USE_ENV_PROXY=1 node scripts/relevo-local.mjs
 *   # .dev.vars: PLATAFORMA_URL_DEV=http://127.0.0.1:8788/c/thelionhalloween/v1
 *
 * No guarda nada ni ve la llave más que de paso (viaja en el encabezado Authorization).
 */
import { createServer } from 'node:http';

const DESTINO = 'https://agencia-plataforma.herediadiego963.workers.dev';
const PUERTO = 8788;

createServer(async (req, res) => {
  try {
    const cuerpo = req.method === 'GET' || req.method === 'HEAD' ? undefined : await new Response(req).arrayBuffer();
    const cabeceras = Object.fromEntries(
      Object.entries(req.headers).filter(([k]) => !['host', 'connection', 'content-length'].includes(k)),
    );
    const r = await fetch(DESTINO + req.url, { method: req.method, headers: cabeceras, body: cuerpo });
    res.writeHead(r.status, Object.fromEntries([...r.headers].filter(([k]) => !['content-encoding', 'content-length', 'transfer-encoding'].includes(k))));
    res.end(Buffer.from(await r.arrayBuffer()));
  } catch (e) {
    res.writeHead(502).end(String(e));
  }
}).listen(PUERTO, '127.0.0.1', () => console.log(`Relevo en http://127.0.0.1:${PUERTO} → ${DESTINO}`));
