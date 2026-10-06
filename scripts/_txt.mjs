import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
const [salida] = process.argv.slice(2);
const n = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await n.newPage();
const r = await p.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
const t = await p.evaluate(() => { document.querySelectorAll('[data-unidad]').forEach(e => e.textContent = ''); return document.body.innerText + '\n' + [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')).join('\n'); });
writeFileSync(salida, `${r.status()}\n${t}`);
await n.close();
