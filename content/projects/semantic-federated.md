---
title: "Comunicação Semântica com Aprendizado Federado"
category: "Pesquisa"
featured: true
order: 3
date: "2025-05-01"
description: "Iniciação Científica na UTFPR: autoencoders convolucionais treinados com Aprendizado Federado comprimem informação semântica em imagens com taxa de até 192× — economia de 99,48% de banda — mantendo acurácia competitiva. Resultou em artigo submetido ao IEEE."
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
github: "https://github.com/GianSE/semantic-federeted"
demo: ""
cover: "/uploads/semantic-federated.png"
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
