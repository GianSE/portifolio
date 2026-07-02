---
title: "Monitor de Preços — Cesta Básica"
title_en: "Price Monitor — Basic Food Basket"
category: "Dados"
featured: true
order: 1
date: "2025-08-01"
description: "Pipeline que coleta preços de ~120 produtos de cesta básica via API pública do Menor Preço em todas as cidades do Brasil, armazenando em Azure Blob Storage para análise de variações regionais."
description_en: "Pipeline that collects prices for ~120 basic food basket products via the public Menor Preço API across every city in Brazil, storing them in Azure Blob Storage for regional price variation analysis."
technologies:
  - Python
  - Polars
  - Parquet
  - Azure Blob Storage
  - Docker
  - Prefect
highlights:
  - "Coleta automatizada via API pública Menor Preço (Nota Paraná)"
  - "Arquitetura medallion: Bronze → Silver → Gold"
  - "Armazenamento em Parquet particionado no Azure Blob Storage"
highlights_en:
  - "Automated collection via the public Menor Preço (Nota Paraná) API"
  - "Medallion architecture: Bronze → Silver → Gold"
  - "Partitioned Parquet storage in Azure Blob Storage"
github: "https://github.com/GianSE/mp_cesta_basica"
demo: ""
cover: "/uploads/cesta-basica.svg"
body_en: |
  ## The problem

  Prices of basic goods vary significantly between cities — but that data is scattered across electronic invoices. The public **Menor Preço (Nota Paraná)** API exposes this universe. This project consumes it systematically.

  ## How it works

  **Collection (Bronze)**
  The API returns registered prices per product and city. ~120 essential products (rice, beans, coffee, oil, etc.) are tracked across multiple Brazilian cities.

  **Processing (Silver → Gold)**
  Raw data is cleaned and standardized with Polars, enriched with geocoding via Nominatim, and stored as compressed Parquet (zstd).

  **Storage**
  Azure Blob Storage is the primary destination, with support for MinIO (S3) and local storage — the backend is configurable without changing the pipeline.

  ## Architecture

  ```
  Menor Preço API → Bronze (raw Parquet)
                 → Silver (cleaning + standardization)
                 → Gold  (geocoding + enrichment)
                 → Azure Blob Storage
  ```

  ## Insights this project enables

  - Price difference for the same product across cities
  - Price evolution over time by region
  - Products with the highest regional variation
  - Cost-of-living comparison by municipality
---

## O problema

Preços de produtos básicos variam significativamente entre cidades — mas esses dados estão dispersos em notas fiscais eletrônicas. A API pública do **Menor Preço (Nota Paraná)** expõe esse universo. Este projeto o consome sistematicamente.

## Como funciona

**Coleta (Bronze)**
A API retorna os preços registrados por produto e cidade. ~120 produtos essenciais (arroz, feijão, café, óleo, etc.) são monitorados em múltiplas cidades do Brasil.

**Processamento (Silver → Gold)**
Os dados brutos são limpos e padronizados com Polars, enriquecidos com geocodificação via Nominatim e armazenados em Parquet comprimido (zstd).

**Armazenamento**
Azure Blob Storage como destino principal, com suporte a MinIO (S3) e armazenamento local — o backend é configurável sem alterar o pipeline.

## Arquitetura

```
API Menor Preço → Bronze (raw Parquet)
               → Silver (limpeza + padronização)
               → Gold  (geocodificação + enriquecimento)
               → Azure Blob Storage
```

## Insights que o projeto viabiliza

- Diferença de preço do mesmo produto entre cidades
- Evolução de preço ao longo do tempo por região
- Produtos com maior variação regional
- Comparativo de custo de vida por município
