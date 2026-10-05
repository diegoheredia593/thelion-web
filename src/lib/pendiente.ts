/**
 * El ÚNICO lugar que decide si un dato se muestra. En `plataforma/` los datos que faltan quedan como
 * `[PENDIENTE: …]`; el sitio trata cualquier valor que empiece con `[PENDIENTE` como vacío, igual que
 * un valor vacío. Un campo vacío no se muestra y una sección sin contenido real se oculta entera.
 */

/** `true` si el texto es un dato pendiente (`[PENDIENTE: …]`). */
export function esPendiente(valor: unknown): boolean {
  return typeof valor === 'string' && valor.trimStart().startsWith('[PENDIENTE');
}

/** Texto plano de un texto enriquecido (el JSON de la plataforma). */
function textoPlano(nodos: unknown[]): string {
  return nodos
    .flatMap((n) => {
      const nodo = n as { type?: string; content?: { text?: string }[]; items?: { text?: string }[][] };
      return nodo.type === 'list' ? (nodo.items ?? []) : [nodo.content ?? []];
    })
    .flatMap((inlines) => inlines.map((i) => i.text ?? ''))
    .join(' ');
}

/**
 * El valor si tiene contenido real; `null` si está vacío o pendiente.
 * - texto: vacío o `[PENDIENTE…` → null;
 * - lista de textos: se quitan los pendientes y los vacíos; si no queda nada → null;
 * - texto enriquecido (lista de nodos): se mira su texto plano;
 * - foto: sin `src` → null.
 */
export function real<T>(valor: T): NonNullable<T> | null {
  if (valor === null || valor === undefined) return null;
  if (typeof valor === 'string') return valor.trim() === '' || esPendiente(valor) ? null : (valor as NonNullable<T>);
  if (Array.isArray(valor)) {
    if (valor.length === 0) return null;
    if (valor.every((v) => typeof v === 'string')) {
      const quedan = (valor as string[]).filter((v) => v.trim() !== '' && !esPendiente(v));
      return quedan.length ? (quedan as NonNullable<T>) : null;
    }
    const plano = textoPlano(valor).trim();
    return plano === '' || esPendiente(plano) ? null : (valor as NonNullable<T>);
  }
  if (typeof valor === 'object' && 'src' in (valor as object)) return (valor as { src?: unknown }).src ? (valor as NonNullable<T>) : null;
  return valor as NonNullable<T>;
}
