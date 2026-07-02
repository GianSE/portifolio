/**
 * Gera dist/cv-pt.pdf e dist/cv-en.pdf a partir da própria página /curriculo
 * já buildada, usando Chromium headless (Playwright).
 *
 * Reaproveita o CSS de impressão de CurriculoPage.module.css — page.pdf()
 * usa a media query `print` por padrão, então é o MESMO estilo que
 * `window.print()` usaria no navegador. Links (<a href>) viram links
 * clicáveis reais no PDF automaticamente.
 *
 * Roda depois de `npm run build`. Usa a API programática do Vite para
 * servir dist/ (evita subprocesso solto — spawn+kill de `vite preview`
 * não mata o processo filho de forma confiável no Windows).
 */
import { chromium } from 'playwright';
import { preview } from 'vite';

const LOCALES = ['pt', 'en'];

async function generatePdf(browser, baseUrl, locale) {
  const context = await browser.newContext();
  await context.addInitScript((l) => {
    window.localStorage.setItem('locale', l);
  }, locale);

  const page = await context.newPage();
  await page.goto(`${baseUrl}/curriculo`, { waitUntil: 'networkidle' });
  await page.waitForSelector('h1');

  await page.pdf({
    path: `dist/cv-${locale}.pdf`,
    format: 'A4',
    printBackground: true,
  });

  await context.close();
  console.log(`✓ dist/cv-${locale}.pdf`);
}

async function main() {
  const server = await preview({ preview: { port: 4173 } });
  const baseUrl = server.resolvedUrls.local[0].replace(/\/$/, '');

  const browser = await chromium.launch();
  try {
    for (const locale of LOCALES) {
      await generatePdf(browser, baseUrl, locale);
    }
  } finally {
    await browser.close();
    await new Promise((resolve, reject) => {
      server.httpServer.close((err) => (err ? reject(err) : resolve()));
    });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
