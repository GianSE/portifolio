---
title: "Arquitetura de SSO"
order: 1
date: "2025-09-01"
description: "Autenticação centralizada: um provedor de identidade único na frente de todos os sistemas internos."
technologies:
  - Authentik
  - OAuth2
  - OpenID Connect
  - Nginx
flow:
  - label: "Usuário"
    description: "Acessa via navegador"
  - label: "Portal"
    description: "Ponto de entrada unificado"
  - label: "Authentik"
    description: "Provedor de identidade (IdP)"
  - label: "Sistemas Internos"
    description: "Acesso autorizado via token"
---

Fluxo de autenticação centralizada onde o **Authentik** atua como provedor de
identidade, emitindo tokens OAuth2 / OpenID Connect para os sistemas internos.
