/** Formatos de presentación (Ecuador: «$3.000», «$12,50»). */
const entero = new Intl.NumberFormat('es-EC', { maximumFractionDigits: 0, useGrouping: true });
const decimal = new Intl.NumberFormat('es-EC', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });

/** Precio en dólares: `$40`, `$1.000`, `$12,50`. */
export function dolares(n: number): string {
  const texto = Number.isInteger(n) ? entero.format(n) : decimal.format(n);
  // es-EC no agrupa los miles de 4 cifras (1000); el copy escribe «$1.000».
  return `$${n >= 1000 && n < 10000 ? texto.replace(/^(\d)(\d{3})/, '$1.$2') : texto}`;
}
