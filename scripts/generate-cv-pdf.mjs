/**
 * Gera public/cv-pt.pdf e public/cv-en.pdf via LaTeX, a partir do mesmo
 * conteúdo do CMS que alimenta o portfólio (content/about/index.md +
 * content/experiences/*.md + content/projects/*.md) — nunca diverge do
 * que está publicado no site.
 *
 * Monta um .tex por idioma e compila com `latexmk` (requer uma
 * distribuição LaTeX instalada — MiKTeX no Windows, TeX Live no Linux/Mac).
 *
 * Rodar LOCALMENTE (`npm run build && npm run generate-cv-pdf`) sempre que
 * o conteúdo do currículo mudar, e commitar os .pdf resultantes em public/.
 */
import { readFileSync, mkdirSync, rmSync, copyFileSync, readdirSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import yaml from 'js-yaml';

const ROOT = process.cwd();
const TMP_DIR = join(ROOT, '.cv-build');
const FRONT_MATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

/* ------------------------------ Conteúdo ------------------------------ */

function readContent(relPath) {
  const raw = readFileSync(join(ROOT, relPath), 'utf-8');
  const match = raw.match(FRONT_MATTER);
  const data = match ? yaml.load(match[1]) ?? {} : {};
  return { ...data, slug: relPath.split('/').pop().replace(/\.md$/, '') };
}

function readCollection(dir) {
  return readdirSync(join(ROOT, dir))
    .filter((f) => f.endsWith('.md'))
    .map((f) => readContent(`${dir}/${f}`));
}

function sortByOrderThenDate(items, dateField = 'date') {
  return [...items].sort((a, b) => {
    const ao = a.order ?? Number.MAX_SAFE_INTEGER;
    const bo = b.order ?? Number.MAX_SAFE_INTEGER;
    if (ao !== bo) return ao - bo;
    return (b[dateField] ?? '').localeCompare(a[dateField] ?? '');
  });
}

/** Traduz um campo para `en` se existir `${field}_en`, senão cai pro pt. */
function loc(item, field, locale) {
  if (locale === 'en' && item[`${field}_en`]) return item[`${field}_en`];
  return item[field];
}

/* ------------------------------- LaTeX --------------------------------- */

const LATEX_ESCAPES = {
  '\\': '\\textbackslash{}',
  '{': '\\{',
  '}': '\\}',
  '%': '\\%',
  $: '\\$',
  '&': '\\&',
  '#': '\\#',
  _: '\\_',
  '^': '\\textasciicircum{}',
  '~': '\\textasciitilde{}',
};

function esc(input) {
  if (input == null) return '';
  return String(input).replace(/[\\{}%$&#_^~]/g, (ch) => LATEX_ESCAPES[ch]);
}

const MONTHS = {
  pt: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

function formatMonthYear(iso, locale) {
  if (!iso) return locale === 'en' ? 'Present' : 'Atual';
  const [year, month] = iso.split('-');
  if (!month) return year;
  return `${MONTHS[locale][Number(month) - 1]} ${year}`;
}

const STRINGS = {
  pt: {
    babel: 'brazil',
    current: 'atual',
    summary: 'Resumo Profissional',
    objective: 'Objetivo',
    education: 'Formação Acadêmica',
    experience: 'Experiência Profissional',
    skills: 'Habilidades',
    languages: 'Idiomas',
    projects: 'Projetos',
  },
  en: {
    babel: 'english',
    current: 'present',
    summary: 'Professional Summary',
    objective: 'Career Objective',
    education: 'Education',
    experience: 'Professional Experience',
    skills: 'Skills',
    languages: 'Languages',
    projects: 'Projects',
  },
};

function renderEntry(exp, locale) {
  const role = esc(loc(exp, 'role', locale));
  const org = esc(exp.organization);
  const start = formatMonthYear(exp.startDate, locale);
  const end = exp.current ? STRINGS[locale].current : formatMonthYear(exp.endDate, locale);
  const description = esc(loc(exp, 'description', locale));
  const highlights = loc(exp, 'highlights', locale) ?? [];

  let out = `    \\item \\textbf{${role} -- ${org}} \\hfill \\textit{${start} -- ${end}}\\\\\n`;
  if (description) out += `    ${description}\n`;
  if (highlights.length > 0) {
    out += '    \\begin{itemize}[leftmargin=*,topsep=2pt,itemsep=0pt]\n';
    for (const h of highlights) out += `        \\item ${esc(h)}\n`;
    out += '    \\end{itemize}\n';
  }
  return out;
}

function renderProject(project, locale) {
  const title = esc(loc(project, 'title', locale));
  const description = esc(loc(project, 'description', locale));
  const link = project.github || project.demo;
  let out = `    \\item \\textbf{${title}}\\\\\n    ${description}`;
  if (link) out += `\\\\\n    \\href{${link}}{${esc(link.replace(/^https?:\/\//, ''))}}`;
  out += '\n';
  return out;
}

function buildTex(locale, { about, education, workExperience, projects }) {
  const t = STRINGS[locale];
  const name = 'Gian Pedro Rodrigues';
  const email = 'gianpedrodev@gmail.com';
  const phone = '+55 (12) 99618-3274';
  const github = 'https://github.com/GianSE';
  const linkedin = 'https://www.linkedin.com/in/gian-pedro-rodrigues-3b6a44259/';

  const skillsBlock = about.skills
    .map((cat) => `    \\item \\textbf{${esc(loc(cat, 'name', locale))}:} ${esc(cat.items.map((i) => i.name).join(', '))}`)
    .join('\n');

  const languagesBlock = (about.languages ?? [])
    .map((l) => `    \\item \\textbf{${esc(loc(l, 'name', locale))}:} ${esc(loc(l, 'level', locale))}`)
    .join('\n');

  return `\\documentclass[a4paper,10pt]{article}

\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{lmodern}
\\usepackage[${t.babel}]{babel}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{geometry}
\\geometry{margin=1in}

\\hypersetup{
    pdftitle={${locale === 'en' ? 'Resume' : 'Currículo'} - ${name}},
    pdfauthor={${name}},
    pdfsubject={${locale === 'en' ? 'Professional Resume' : 'Currículo Profissional'}},
    colorlinks=true,
    urlcolor=blue
}

\\setlength{\\parindent}{0pt}
\\setlength{\\parskip}{6pt}

\\begin{document}

\\vspace*{-1cm}
\\begin{center}
    {\\LARGE \\textbf{${name}}}\\\\
    \\vspace{0.2cm}
    \\href{mailto:${email}}{${email}} \\quad | \\quad ${phone}\\\\
    \\href{${github}}{github.com/GianSE} \\quad | \\quad
    \\href{${linkedin}}{linkedin.com/in/gian-pedro-rodrigues}
\\end{center}

\\vspace{0.4cm}

\\section*{${t.summary}}
${esc(loc(about, 'cvSummary', locale))}

\\section*{${t.objective}}
${esc(loc(about, 'cvObjective', locale))}

\\section*{${t.education}}
\\begin{itemize}[leftmargin=*]
${education.map((e) => renderEntry(e, locale)).join('\n')}\\end{itemize}

\\section*{${t.experience}}
\\begin{itemize}[leftmargin=*]
${workExperience.map((e) => renderEntry(e, locale)).join('\n')}\\end{itemize}

\\section*{${t.skills}}
\\begin{itemize}[leftmargin=*]
${skillsBlock}
\\end{itemize}

\\section*{${t.languages}}
\\begin{itemize}[leftmargin=*]
${languagesBlock}
\\end{itemize}

\\section*{${t.projects}}
\\begin{itemize}[leftmargin=*]
${projects.map((p) => renderProject(p, locale)).join('\n')}\\end{itemize}

\\end{document}
`;
}

/* -------------------------------- Main ---------------------------------- */

function main() {
  const about = readContent('content/about/index.md');
  const allExperiences = sortByOrderThenDate(readCollection('content/experiences'), 'startDate');
  const education = allExperiences.filter((e) => e.area === 'Formação');
  const workExperience = allExperiences.filter((e) => e.area !== 'Formação');
  const projects = sortByOrderThenDate(readCollection('content/projects')).filter((p) => p.featured);

  rmSync(TMP_DIR, { recursive: true, force: true });
  mkdirSync(TMP_DIR, { recursive: true });

  for (const locale of ['pt', 'en']) {
    const tex = buildTex(locale, { about, education, workExperience, projects });
    const texPath = join(TMP_DIR, `cv-${locale}.tex`);
    writeFileSync(texPath, tex, 'utf-8');

    execFileSync(
      'latexmk',
      ['-pdf', '-interaction=nonstopmode', '-halt-on-error', `-output-directory=${TMP_DIR}`, texPath],
      { stdio: 'inherit' },
    );

    copyFileSync(join(TMP_DIR, `cv-${locale}.pdf`), join(ROOT, 'public', `cv-${locale}.pdf`));
    console.log(`✓ public/cv-${locale}.pdf`);
  }

  rmSync(TMP_DIR, { recursive: true, force: true });
}

main();
