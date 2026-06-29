import { basename } from 'node:path';
import yaml from 'js-yaml';
import type { Plugin } from 'vite';

/**
 * Plugin de build que transforma arquivos `.md` (Markdown + front matter YAML)
 * em módulos JS que exportam `{ ...frontmatter, body, slug }`.
 *
 * O parse acontece em build-time (Node), então o `js-yaml` NÃO é enviado ao
 * cliente — o bundle recebe apenas dados JSON já prontos. Consumido via
 * `import.meta.glob` no content.service.
 */

const FRONT_MATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

export function contentPlugin(): Plugin {
  return {
    name: 'vite-plugin-content',
    enforce: 'pre',
    transform(code, id) {
      const [filepath] = id.split('?');
      if (!filepath.endsWith('.md')) return null;

      let data: Record<string, unknown> = {};
      let body = code;

      const match = code.match(FRONT_MATTER);
      if (match) {
        const parsed = yaml.load(match[1]);
        data = (parsed && typeof parsed === 'object' ? parsed : {}) as Record<
          string,
          unknown
        >;
        body = match[2] ?? '';
      }

      const slug = basename(filepath, '.md');
      const payload = { ...data, body: body.trim(), slug };

      return {
        code: `export default ${JSON.stringify(payload)};`,
        map: { mappings: '' },
      };
    },
  };
}
