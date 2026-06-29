---
title: "Tutoria Tech — Meninas Digitais UTFPR"
category: "Full Stack"
featured: true
order: 2
date: "2025-06-01"
description: "Plataforma de gestão de mentoria para o projeto de extensão Meninas Digitais da UTFPR, com sistema de acompanhamento de alunas, controle de acesso por papéis e a Rose — assistente IA com RAG sobre documentos e URLs."
technologies:
  - React
  - Node.js
  - FastAPI
  - PostgreSQL
  - MinIO
  - Google Gemini
  - pgvector
  - Docker
highlights:
  - "Autenticação JWT com três papéis (Admin, Mentora, Aluna) e RBAC"
  - "Rose IA — assistente com RAG usando Gemini + pgvector, aprende de PDFs e URLs"
  - "Acompanhamento de progresso em 4 estágios com dashboards por perfil"
github: "https://github.com/GianSE/Tutoria_tech"
demo: ""
cover: "/uploads/tutoria-tech.png"
---

## O problema

O projeto de extensão **Meninas Digitais da UTFPR** conecta mentoras a alunas do ensino médio interessadas em tecnologia. A gestão acontecia de forma dispersa — planilhas, grupos de mensagem, sem rastreabilidade de progresso. A plataforma centraliza tudo isso.

## O que foi construído

**Gestão completa de mentoria**
Três papéis com dashboards distintos: Admin controla tudo, Mentoras acompanham suas equipes, Alunas visualizam seu progresso. Equipes criadas com código de acesso automático, encontros agendados, materiais organizados por categoria.

**Rose — a assistente IA**
A parte mais técnica do projeto. Rose usa RAG (Retrieval-Augmented Generation) com a API do Gemini: documentos PDF e URLs são vetorizados e armazenados no PostgreSQL via pgvector. As respostas vêm do contexto real do programa, não de um modelo genérico.

**Infraestrutura**
FastAPI (Python) cuida de toda a camada de IA — ingestão, vetorização e geração. Node.js com Fastify serve a API principal. MinIO armazena os arquivos. PostgreSQL + pgvector como banco unificado. Um único `docker compose up` sobe tudo com 46 usuários e dados de demonstração pré-carregados.

## Arquitetura

```
React (frontend)
  └─► Fastify/Node.js (API + auth JWT/RBAC)
        ├─► PostgreSQL + pgvector  (dados + embeddings)
        ├─► MinIO                  (arquivos e materiais)
        └─► FastAPI (Python)       (RAG: Gemini + pgvector)
```

## Contexto

Projeto acadêmico de extensão desenvolvido em equipe de 4, entregue com documentação completa e tutorial em vídeo para a UTFPR.
