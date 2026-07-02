/**
 * Gera public/cv-pt.pdf e public/cv-en.pdf a partir da própria página
 * /curriculo já buildada, usando Chromium headless (Playwright).
 *
 * Reaproveita o CSS de impressão de CurriculoPage.module.css — page.pdf()
 * usa a media query `print` por padrão, então é o MESMO estilo que
 * `window.print()` usaria no navegador. Links (<a href>) viram links
 * clicáveis reais no PDF automaticamente.
 *
 * Rodar LOCALMENTE (`npm run build && npm run generate-cv-pdf`) sempre que
 * o conteúdo do currículo mudar, e commitar os .pdf resultantes em public/ —
 * assim viram assets estáticos normais, copiados pro build por qualquer
 * pipeline (inclusive o Workers Builds da Cloudflare), sem precisar de
 * Playwright/Chromium no ambiente de build de produção.
 *
 * Usa a API programática do Vite para servir dist/ (evita subprocesso
 * solto — spawn+kill de `vite preview` não mata o processo filho de forma
 * confiável no Windows).
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
    path: `public/cv-${locale}.pdf`,
    format: 'A4',
    printBackground: true,
  });

  await context.close();
  console.log(`✓ public/cv-${locale}.pdf`);
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
