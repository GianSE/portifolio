# Guia de Deploy — Portfólio Gian Pedro Rodrigues

## 1. Cloudflare Pages (portfólio público)

1. Acesse https://dash.cloudflare.com → **Workers & Pages** → **Create application** → **Pages**
2. Conecte seu repositório GitHub (`gianSE/portifolio`)
3. Configure o build:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node.js version:** 20
4. Clique em **Save and Deploy**

> Os arquivos `public/_redirects` e `public/_headers` são lidos automaticamente pelo Cloudflare Pages.

---

## 2. Cloudflare Worker (OAuth para o Decap CMS)

### 2.1 Crie o GitHub OAuth App

- GitHub → Settings → Developer settings → OAuth Apps → New OAuth App
  - **Homepage URL:** `https://gianrodrigues.dev`
  - **Authorization callback URL:** `https://oauth.gianrodrigues.dev/callback`
- Copie **Client ID** e gere um **Client Secret**

### 2.2 Deploy do Worker

```bash
cd workers/oauth
npm install -g wrangler     # se ainda não tiver
wrangler login
wrangler deploy
```

### 2.3 Configure os secrets

```bash
wrangler secret put GITHUB_CLIENT_ID
wrangler secret put GITHUB_CLIENT_SECRET
wrangler secret put ALLOWED_ORIGIN     # ex.: https://gianrodrigues.dev
```

### 2.4 Roteamento do Worker

No painel do Worker → **Triggers** → **Custom Domains**:
- Adicione `oauth.gianrodrigues.dev`

---

## 3. Atualize o config.yml do Decap

Em `public/admin/config.yml`, ajuste:

```yaml
backend:
  repo: gianSE/portifolio          # seu usuário/repo real
  base_url: https://oauth.gianrodrigues.dev
```

---

## 4. Acesso ao painel admin

Acesse `https://gianrodrigues.dev/admin` e faça login com sua conta GitHub.

---

## 5. Fluxo de atualização de conteúdo

1. Edite pelo painel `/admin`
2. O Decap faz commit automático no GitHub
3. Cloudflare Pages detecta o push → rebuild automático em ~30s
4. O site público reflete as mudanças sem nenhum código alterado
