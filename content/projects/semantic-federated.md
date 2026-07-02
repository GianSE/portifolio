---
title: "Comunicação Semântica com Aprendizado Federado"
title_en: "Semantic Communication with Federated Learning"
category: "Pesquisa"
featured: true
order: 3
date: "2025-05-01"
description: "Iniciação Científica na UTFPR: autoencoders convolucionais treinados com Aprendizado Federado comprimem informação semântica em imagens com taxa de até 192× — economia de 99,48% de banda — mantendo acurácia competitiva. Resultou em artigo submetido ao IEEE."
description_en: "Undergraduate research at UTFPR: convolutional autoencoders trained with Federated Learning compress semantic information in images at up to 192× — a 99.48% bandwidth saving — while keeping competitive accuracy. Resulted in a paper submitted to IEEE."
technologies:
  - Python
  - PyTorch
  - Aprendizado Federado (FedAvg)
  - CNN / Autoencoders
  - NumPy
  - Scikit-learn
highlights:
  - "Compressão semântica de 192× com perda de acurácia inferior a 10%"
  - "Implementação customizada de FedAvg com agregação ponderada de pesos"
  - "Artigo submetido ao IEEE — coautoria com professor da UTFPR"
highlights_en:
  - "192× semantic compression with less than 10% accuracy loss"
  - "Custom FedAvg implementation with weighted parameter aggregation"
  - "Paper submitted to IEEE — co-authored with a UTFPR professor"
github: "https://github.com/GianSE/semantic-federeted"
demo: ""
cover: "/uploads/semantic-federated.svg"
body_en: |
  ## Context

  Undergraduate research conducted at UTFPR's Electrical Engineering Department, co-authored with professor Herman L. dos Santos. The work resulted in a paper submitted to IEEE.

  ## The problem

  6G networks demand efficient data transmission in bandwidth-constrained scenarios. Semantic communication proposes a shift: instead of transmitting every bit of an image, transmit only the *semantics* — the information that matters for the task.

  ## The approach

  A convolutional autoencoder learns to compress the image into a minimal latent space. The classifier operates directly on that space, without reconstructing the original image. The wireless channel is simulated with AWGN noise.

  Training uses **FedAvg** — each device trains locally on its own data, and the server aggregates the weights, weighted by dataset size:

  ```
  w_{t+1} = Σ (n_k / n) · w_t^k
  ```

  No raw data is centralized. Nothing beyond the weights is shared.

  ## Results (CIFAR-10)

  | Latent dimension | Compression | Accuracy |
  |---|---|---|
  | Baseline | 1× | 67.7% |
  | L = 64 | 48× | 64.9% |
  | L = 16 | **192×** | 60.7% |

  Moderate noise (σ = 0.05) acted as a regularizer, improving accuracy in some scenarios — an unexpected result that became a contribution of the paper.

  ## Multi-task loss function

  ```
  L = L_CE(Classifier(z̃), y) + α · L_MSE(Decoder(z̃), x)
  ```

  α = 0.5 balances classification and reconstruction, allowing the model to learn representations useful for both tasks.
---

## Contexto

Iniciação Científica desenvolvida no Departamento de Engenharia Elétrica da UTFPR em coautoria com o professor Herman L. dos Santos. O trabalho resultou em artigo submetido ao IEEE.

## O problema

Redes 6G demandam transmissão eficiente de dados em cenários com banda limitada. A comunicação semântica propõe uma mudança: em vez de transmitir todos os bits de uma imagem, transmitir apenas a *semântica* — a informação que importa para a tarefa.

## A abordagem

Um autoencoder convolucional aprende a comprimir a imagem em um espaço latente mínimo. O classificador opera diretamente nesse espaço, sem reconstruir a imagem original. O canal sem fio é simulado com ruído AWGN.

O treinamento usa **FedAvg** — cada dispositivo treina localmente com seus dados, e o servidor agrega os pesos ponderados pelo tamanho do dataset:

```
w_{t+1} = Σ (n_k / n) · w_t^k
```

Sem centralizar os dados brutos. Sem compartilhar mais do que os pesos.

## Resultados (CIFAR-10)

| Dimensão latente | Compressão | Acurácia |
|---|---|---|
| Baseline | 1× | 67.7% |
| L = 64 | 48× | 64.9% |
| L = 16 | **192×** | 60.7% |

Ruído moderado (σ = 0.05) atuou como regularizador, melhorando acurácia em alguns cenários — resultado não esperado que tornou-se contribuição do artigo.

## Função de perda multitarefa

```
L = L_CE(Classificador(z̃), y) + α · L_MSE(Decoder(z̃), x)
```

α = 0.5 balanceia classificação e reconstrução, permitindo que o modelo aprenda representações úteis para ambas as tarefas.
