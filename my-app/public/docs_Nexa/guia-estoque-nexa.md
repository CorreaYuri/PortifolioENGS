# Guia de Estoque Nexa

## Objetivo

Este documento orienta o uso do modulo de estoque da Nexa.

Ele explica:

- como cadastrar itens
- como registrar movimentacoes
- como interpretar saldo

## Papel do modulo

O estoque controla itens por quantidade.

Ele deve responder:

- quanto temos
- onde esta
- o que entrou
- o que saiu
- qual foi o contexto da movimentacao

Ele deve ser tratado como a referencia quantitativa oficial dos itens controlados da Nexa.

## Como usar

### Cadastro de item

1. criar item com nome claro
2. informar unidade, SKU e estoque minimo quando houver
3. registrar saldo inicial apenas quando realmente necessario

### Movimentacoes

1. usar entrada para recebimento real
2. usar saida para consumo ou retirada real
3. usar devolucao, perda ou alocacao conforme o caso
4. vincular projeto, colaborador ou centro de custo quando fizer sentido
5. abrir `/app/estoque` e usar o card "Proxima acao" para tratar primeiro reposicao critica e rastreabilidade

Diretriz operacional:

- toda alteracao de saldo deve nascer de movimentacao registrada
- o contexto da movimentacao deve explicar por que o item entrou, saiu ou retornou
- projeto, colaborador ou centro de custo devem ser vinculados sempre que ajudarem a rastrear o uso

## Como pensar o saldo

O saldo nao deve ser tratado como valor solto.

O saldo e resultado de:

1. cadastro do item
2. historico das movimentacoes

Padrao recomendado:

- usar saldo inicial apenas para estruturar a base com criterio
- evitar ajustes informais fora do historico
- acompanhar itens abaixo do minimo como sinal de reposicao ou investigacao

## Integracao com compras

- item comprado pode entrar no estoque pela ponte do modulo de compras
- isso evita duplicidade e preserva a origem administrativa

## Boas praticas

1. nao alterar saldo fora do historico
2. nao usar estoque para item patrimonial individualizado
3. registrar contexto de saida sempre que possivel
4. acompanhar itens abaixo do minimo

## Sinais de uso incorreto

- ajuste informal sem movimentacao
- item de patrimonio tratado como estoque
- saldo sem rastreabilidade de origem

## Fechamento

Estoque deve ser a referencia quantitativa confiavel dos itens controlados da Nexa.

Quando esse fluxo e seguido com disciplina, a Nexa ganha previsibilidade operacional e rastreabilidade de consumo.
