/**
 * COPIA de `richTextToHtml` (y lo que usa) de `agencia-plataforma/packages/core/src/content/richText.ts`
 * y `linkPattern.ts`, commit c59c4d9e43481a53cee8bca97af39f88ef977d4a: la misma conversión que hace la plataforma con `?formato=html`.
 * Los tipos son los de `content/schema.ts`, escritos a mano para no depender de zod.
 * Se exporta como `textoEnriquecidoAHtml`, como en el SDK original. No lo edites aquí.
 */
const LINK_PATTERN = /^(\/|https:\/\/|mailto:|tel:)/;

interface Inline {
  text: string;
  bold?: boolean | undefined;
  italic?: boolean | undefined;
  link?: string | undefined;
}
type RichTextNode =
  | { type: 'paragraph'; content: Inline[] }
  | { type: 'list'; ordered: boolean; items: Inline[][] };
type RichText = RichTextNode[];

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};
const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (ch) => HTML_ESCAPES[ch]!);

function inlineToHtml(inline: Inline): string {
  let html = escapeHtml(inline.text);
  if (inline.link && LINK_PATTERN.test(inline.link)) {
    html = `<a href="${escapeHtml(inline.link)}">${html}</a>`;
  }
  if (inline.italic) html = `<em>${html}</em>`;
  if (inline.bold) html = `<strong>${html}</strong>`;
  return html;
}

/**
 * HTML seguro a partir del JSON guardado — nunca se guarda, se genera en cada petición
 * (`?formato=html`). Solo emite las etiquetas de esta lista: nunca un tag ni un atributo
 * que no venga de aquí, y un enlace solo se emite si su esquema matchea LINK_PATTERN
 * (nunca javascript:/data:/cualquier otro).
 */
function richTextToHtml(value: RichText | null): string {
  return (value ?? [])
    .map((node) => {
      if (node.type === 'paragraph') return `<p>${node.content.map(inlineToHtml).join('')}</p>`;
      const items = node.items.map((item) => `<li>${item.map(inlineToHtml).join('')}</li>`).join('');
      return node.ordered ? `<ol>${items}</ol>` : `<ul>${items}</ul>`;
    })
    .join('');
}

export { richTextToHtml as textoEnriquecidoAHtml };
