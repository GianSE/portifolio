/**
 * Cloudflare Worker — proxy OAuth para o Decap CMS.
 *
 * Registre em: https://dash.cloudflare.com/workers
 * Variáveis de ambiente (secrets) a setar no painel do Worker:
 *   GITHUB_CLIENT_ID     → Client ID do GitHub OAuth App
 *   GITHUB_CLIENT_SECRET → Client Secret do GitHub OAuth App
 *   ALLOWED_ORIGIN       → URL do seu portfólio (ex.: https://gianrodrigues.dev)
 *
 * Como criar o GitHub OAuth App:
 *   GitHub → Settings → Developer settings → OAuth Apps → New OAuth App
 *     Homepage URL:       https://gianrodrigues.dev
 *     Authorization CB:   https://oauth.gianrodrigues.dev/callback
 */

const GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize';
const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = env.ALLOWED_ORIGIN ?? '*';

    const cors = {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }

    // ---- /auth  → redireciona para o GitHub ----
    if (url.pathname === '/auth') {
      const params = new URLSearchParams({
        client_id: env.GITHUB_CLIENT_ID,
        scope: 'repo,user',
      });
      return Response.redirect(`${GITHUB_AUTH_URL}?${params}`, 302);
    }

    // ---- /callback  → troca code por token e entrega ao CMS ----
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      if (!code) return new Response('Missing code', { status: 400 });

      const tokenRes = await fetch(GITHUB_TOKEN_URL, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });

      const data = await tokenRes.json();

      if (data.error) {
        return new Response(`OAuth error: ${data.error_description}`, { status: 400 });
      }

      // Decap CMS espera uma página HTML com postMessage do token.
      const html = `<!doctype html><html><body><script>
        (function() {
          function receiveMsg(e) {
            window.opener.postMessage(
              'authorization:github:success:${JSON.stringify({ token: data.access_token, provider: 'github' })}',
              e.origin
            );
          }
          window.addEventListener('message', receiveMsg);
          window.opener.postMessage('authorizing:github', '*');
        })();
      </script></body></html>`;

      return new Response(html, {
        headers: { 'Content-Type': 'text/html', ...cors },
      });
    }

    return new Response('Not found', { status: 404 });
  },
};
