/**
 * Envío sin recargar de los formularios `[data-formulario]` (sin JavaScript se envían normal y el
 * endpoint redirige de vuelta con #<id>-enviado o #<id>-error). Los errores de la plataforma (422)
 * se muestran junto a su campo.
 */
for (const form of document.querySelectorAll<HTMLFormElement>('form[data-formulario]')) {
  const estado = form.querySelector<HTMLElement>('[data-estado]')!;
  const boton = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const textoBoton = boton.textContent;

  const limpiar = () => {
    form.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));
    form.querySelectorAll<HTMLElement>('[data-error-de]').forEach((el) => {
      el.textContent = '';
      el.hidden = true;
    });
  };
  const mostrar = (tipo: 'exito' | 'error', texto: string) => {
    estado.textContent = texto;
    estado.dataset.tipo = tipo;
    estado.hidden = false;
    estado.focus();
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    limpiar();
    estado.hidden = true;
    boton.disabled = true;
    boton.textContent = form.dataset.enviando ?? textoBoton;
    const datos: Record<string, string> = {};
    new FormData(form).forEach((v, k) => (datos[k] = String(v)));
    try {
      const r = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(datos),
      });
      const cuerpo = (await r.json().catch(() => ({}))) as { errores?: Record<string, string>; mensaje?: string };
      if (r.ok) {
        form.reset();
        form.dispatchEvent(new Event('change'));
        mostrar('exito', form.dataset.exito ?? '');
        return;
      }
      for (const [campo, mensaje] of Object.entries(cuerpo.errores ?? {})) {
        const control = form.querySelector<HTMLElement>(`[name="${CSS.escape(campo)}"]`);
        const aviso = form.querySelector<HTMLElement>(`[data-error-de="${CSS.escape(campo)}"]`);
        control?.setAttribute('aria-invalid', 'true');
        if (aviso) {
          aviso.textContent = mensaje;
          aviso.hidden = false;
        }
      }
      mostrar('error', cuerpo.mensaje ?? form.dataset.error ?? '');
    } catch {
      mostrar('error', form.dataset.error ?? '');
    } finally {
      boton.disabled = false;
      boton.textContent = textoBoton;
    }
  });
}
