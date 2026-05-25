# Backlog e Priorizacao Nexa

## Objetivo

Este documento define como a Nexa deve registrar, classificar e priorizar novas demandas sem cair em escopo infinito.

Ele complementa:

- [MVP Operacional e Evolucao Continua](/j:/Projetos/Nexa/my-app/docs/mvp-operacional-e-evolucao-continua-nexa.md)
- [Roadmap de Implementacao](/j:/Projetos/Nexa/my-app/docs/roadmap-implementacao.md)
- [Roadmap de Completude em 30 Dias](/j:/Projetos/Nexa/my-app/docs/roadmap-completude-30-dias-nexa.md)

## Principio geral

Nem toda boa ideia deve virar trabalho imediato.

No contexto da Nexa, o backlog precisa proteger quatro coisas:

- a estabilidade do core
- a operacao atual da empresa
- a clareza de foco
- a capacidade de evoluir sem sobrecarga

## Estrutura recomendada do backlog

Toda demanda deve entrar em uma destas quatro classes:

### 1. Bloqueador

Definicao:

- algo que impede uso correto
- algo que quebra fluxo principal
- algo que expoe risco relevante de operacao, seguranca ou dados

Exemplos:

- erro em login
- permissao incorreta
- falha em projeto, cliente, documento ou cobranca
- integracao critica inconsistente

Regra:

- tratar primeiro
- nao competir com melhoria cosmética

### 2. Core

Definicao:

- melhoria que fortalece diretamente o nucleo operacional

Exemplos:

- confiabilidade de documentos
- fluxos principais de CRM
- estabilidade do portal
- governanca e auditoria
- financeiro critico

Regra:

- prioridade alta
- precisa de criterio de aceite claro

### 3. Melhoria continua

Definicao:

- melhoria que aumenta produtividade, visibilidade ou qualidade de uso sem ser bloqueadora

Exemplos:

- novos relatórios
- filtros adicionais
- painéis mais ricos
- automações úteis
- refinamentos de UX

Regra:

- entra em ciclo planejado
- nunca deve atropelar bloqueadores ou core

### 4. Futuro

Definicao:

- ideia válida, mas sem urgência operacional comprovada

Exemplos:

- novo módulo sem uso iminente
- integração sem dono
- expansão conceitual ainda não validada
- recurso interessante, mas ainda sem ganho claro

Regra:

- registrar
- não executar por impulso
- revisar periodicamente

## Critérios de prioridade

Cada item do backlog deve ser avaliado por cinco perguntas:

1. Isso protege ou destrava o core?
2. Isso reduz trabalho manual real?
3. Isso resolve uma dor atual e recorrente?
4. Existe alguém que vai usar isso de verdade agora?
5. Isso entra sem elevar demais a complexidade da base?

## Regra prática de score

Para priorização rápida, usar:

- `+3` se for bloqueador
- `+2` se impactar o core
- `+2` se reduzir trabalho manual frequente
- `+2` se tiver uso imediato por area operacional
- `+1` se melhorar governanca, auditoria ou confiabilidade
- `-2` se for apenas estetica
- `-2` se depender de muito contexto ainda indefinido
- `-3` se nao houver dono operacional claro

Leitura sugerida:

- `6 ou mais`: priorizar agora
- `3 a 5`: manter no proximo ciclo
- `0 a 2`: backlog monitorado
- abaixo de `0`: futuro ou descarte

## Template de item de backlog

Todo item novo deve ser registrado com este formato:

### Titulo

- nome curto e objetivo

### Tipo

- bloqueador
- core
- melhoria continua
- futuro

### Problema

- o que hoje esta doendo, falhando ou desperdicando tempo

### Impacto

- quem e afetado
- o que melhora quando isso entra

### Modulo

- CRM
- clientes
- projetos
- portal
- RH
- financeiro
- fiscal
- compras
- estoque
- ativos
- configuracoes
- integracoes

### Prioridade atual

- alta
- media
- baixa

### Dono operacional

- quem valida se isso realmente faz sentido

### Criterio de pronto

- como saber que a entrega resolveu o problema

## Rito recomendado de priorizacao

### Rito semanal

Objetivo:

- limpar ruido
- reclassificar urgencias
- puxar o proximo bloco de trabalho

Perguntas da semana:

- apareceu algum bloqueador novo?
- existe algo manual demais para continuar?
- houve pedido recorrente de mais de uma area?

### Rito mensal

Objetivo:

- revisar direcao do produto

Perguntas do mes:

- o backlog esta fortalecendo o core ou so expandindo escopo?
- o que entrou gerou uso real?
- o que esta parado sem dono deveria sair?

## Anti-padroes a evitar

### 1. Priorizar por empolgacao

Erro:

- escolher o item mais interessante em vez do mais relevante

### 2. Criar modulo sem dor validada

Erro:

- expandir porque "pode ser util um dia"

### 3. Refinar demais antes de usar

Erro:

- tentar deixar perfeito antes de entrar em operacao real

### 4. Misturar bloqueador com desejo estético

Erro:

- tratar bug crítico e detalhe visual como se fossem equivalentes

## Backlog modelo da fase atual da Nexa

Com base no estado atual da plataforma, a prioridade recomendada hoje tende a seguir esta ordem:

1. bloqueadores operacionais reais
2. confiabilidade de permissao, dados e fluxos centrais
3. integracoes e automacoes com retorno operacional claro
4. consolidacoes executivas e relatorios
5. refinamentos de experiencia
6. expansoes futuras

## Regra de corte

Quando houver duvida entre duas iniciativas, escolher a que:

- reduz risco
- simplifica operacao
- aumenta confiabilidade
- gera uso real mais rapido

Se nenhuma das duas fizer isso claramente, provavelmente nao e hora de executar nenhuma.

## Fechamento

O backlog da Nexa precisa funcionar como instrumento de foco, nao como deposito infinito de ideias.

Ideias devem ser preservadas.

Prioridade, porem, deve ser conquistada.

O objetivo nao e fazer tudo.

O objetivo e fazer primeiro o que mantem a plataforma confiavel, util e sustentável enquanto ela continua crescendo.
