---
title: "Monitor de Preços — Cesta Básica"
category: "Dados"
featured: true
order: 1
date: "2025-08-01"
description: "Pipeline que coleta preços de ~120 produtos de cesta básica via API pública do Menor Preço em todas as cidades do Brasil, armazenando em Azure Blob Storage para análise de variações regionais."
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
github: "https://github.com/GianSE/mp_cesta_basica"
demo: ""
cover: "/uploads/cesta-basica.png"
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
