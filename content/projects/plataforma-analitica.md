---
title: "Pipeline Analítico — Drogamais"
category: "Dados"
featured: true
order: 2
date: "2025-06-01"
description: "Pipeline ponta a ponta: coleta de múltiplas fontes, processamento com Polars, Data Lake no MinIO e entrega via Power BI e dashboards React."
technologies:
  - Python
  - Polars
  - DuckDB
  - Parquet / MinIO
  - Prefect
  - Power BI
highlights:
  - "Coleta automatizada via APIs, scraping e formulários internos"
  - "Processamento com Polars, particionamento Parquet/Hive no MinIO"
  - "OLAP com DuckDB, entrega via Power BI (Direct Query) e React"
github: ""
demo: ""
cover: "/uploads/analytics.png"
---

## A história do dado

Cada análise começa com a pergunta: *onde esse dado está?* A resposta pode ser uma API, uma planilha, um site público ou um formulário construído internamente.

## Coleta

Scrapers e automações Python capturam o que está solto. Power Automate cuida do fluxo em sistemas já existentes. Formulários React eliminam a planilha manual.

## Processamento e armazenamento

Python + Polars transformam os dados brutos. O resultado vai para o MinIO em Parquet com particionamento Hive — estruturado para ser lido rápido.

## Análise

DuckDB roda consultas OLAP diretamente nos arquivos Parquet. Do OLTP, os dados chegam ao Power BI via Direct Query ou Import. Para relatórios com mais controle, dashboards customizados em React.

## Orquestração

Prefect garante que cada etapa rode na ordem certa, no momento certo, sem intervenção manual.
