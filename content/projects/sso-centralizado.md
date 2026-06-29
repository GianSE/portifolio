---
title: "Autenticação Centralizada (SSO)"
category: "DevOps"
featured: true
order: 3
date: "2025-09-05"
description: "Implantação de Single Sign-On corporativo com Authentik, unificando o acesso a sistemas internos via OAuth2 e OpenID Connect."
technologies:
  - Authentik
  - OAuth2
  - OpenID Connect
  - Docker
  - Nginx
highlights:
  - "Provedor de identidade único para toda a organização"
  - "Políticas de acesso e MFA centralizadas"
  - "Gestão de segredos com Infisical"
github: "https://github.com/gianSE"
demo: ""
cover: "/uploads/sso.png"
---

Solução de **Single Sign-On** que coloca um provedor de identidade central
(Authentik) na frente de todos os sistemas internos.

## Fluxo

`Usuário → Portal → Authentik → Sistemas Internos`

## Entregas

- Login único com OAuth2 / OpenID Connect.
- MFA e políticas de acesso centralizadas.
- Segredos gerenciados via Infisical, fora do código.
