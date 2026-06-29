---
title: "Pipeline Cesta Básica"
order: 1
date: "2025-08-01"
description: "Coleta contínua de preços via API pública com arquitetura medallion e armazenamento em nuvem."
technologies:
  - Python
  - Polars
  - Parquet
  - Azure Blob Storage
  - Docker
flow:
  - label: "API Menor Preço"
    description: "Fonte pública de dados"
  - label: "Bronze"
    description: "Raw — dados brutos"
  - label: "Silver"
    description: "Limpeza e padronização"
  - label: "Gold"
    description: "Enriquecimento + geo"
  - label: "Azure Blob"
    description: "Storage particionado"
---

Pipeline medallion que consome a API do Menor Preço e entrega dados prontos para análise de variações regionais de preços da cesta básica.
