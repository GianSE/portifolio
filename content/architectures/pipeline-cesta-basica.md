---
title: "Pipeline Cesta Básica"
title_en: "Basic Food Basket Pipeline"
order: 1
date: "2025-08-01"
description: "Coleta contínua de preços via API pública com arquitetura medallion e armazenamento em nuvem."
description_en: "Continuous price collection via a public API with a medallion architecture and cloud storage."
technologies:
  - Python
  - Polars
  - Parquet
  - Azure Blob Storage
  - Docker
flow:
  - label: "API Menor Preço"
    label_en: "Menor Preço API"
    description: "Fonte pública de dados"
    description_en: "Public data source"
  - label: "Bronze"
    description: "Raw — dados brutos"
    description_en: "Raw data"
  - label: "Silver"
    description: "Limpeza e padronização"
    description_en: "Cleaning and standardization"
  - label: "Gold"
    description: "Enriquecimento + geo"
    description_en: "Enrichment + geo"
  - label: "Azure Blob"
    description: "Storage particionado"
    description_en: "Partitioned storage"
body_en: |
  Medallion pipeline that consumes the Menor Preço API and delivers data ready for analyzing regional price variations in the basic food basket.
---

Pipeline medallion que consome a API do Menor Preço e entrega dados prontos para análise de variações regionais de preços da cesta básica.
