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
import { readFile, writeFile } from 'node:fs/promises';

const LOCALES = ['pt', 'en'];
// Build determinístico: page.pdf() sempre embute a data/hora real em
// CreationDate/ModDate, então dois builds do MESMO conteúdo teriam bytes
// diferentes — o que faria o workflow de CI commitar um "PDF novo" toda
// vez, mesmo sem mudança real. Zera as datas via substituição direta de
// bytes (mesmo tamanho de string, não mexe nos offsets do resto do
// arquivo) — reparsear/regravar o PDF com uma lib (ex.: pdf-lib) chegou
// a apagar as anotações de link clicável, então evitamos isso.
const FIXED_DATE = "D:19700101000000+00'00'";

async function normalizeForReproducibility(path) {
  const text = await readFile(path, 'latin1');
  const fixed = text
    .replace(/(\/CreationDate \(D:)[^)]*(\))/, `$1${FIXED_DATE.slice(2)}$2`)
    .replace(/(\/ModDate \(D:)[^)]*(\))/, `$1${FIXED_DATE.slice(2)}$2`);
  await writeFile(path, fixed, 'latin1');
}

async function generatePdf(browser, baseUrl, locale) {
  const context = await browser.newContext();
  await context.addInitScript((l) => {
    window.localStorage.setItem('locale', l);
  }, locale);

  const page = await context.newPage();
  await page.goto(`${baseUrl}/curriculo`, { waitUntil: 'networkidle' });
  await page.waitForSelector('h1');

  // Garante que as web fonts (Inter, JetBrains Mono via Google Fonts)
  // terminaram de carregar antes de tirar o PDF — sem isso, page.pdf()
  // pode capturar a página ainda com fonte de fallback do sistema.
  await page.evaluate(() => document.fonts.ready);

  const path = `public/cv-${locale}.pdf`;
  await page.pdf({ path, format: 'A4', printBackground: true });
  await normalizeForReproducibility(path);

  await context.close();
  console.log(`✓ ${path}`);
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
