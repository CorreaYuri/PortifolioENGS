# Guia de Ativos Nexa

## Objetivo

Este documento orienta o uso do modulo de ativos da Nexa.

Ele explica:

- como registrar patrimonio
- como alocar ativo
- como manter rastreabilidade por colaborador, projeto e centro de custo

## Papel do modulo

Ativos controlam bens patrimoniais individualizados.

Ele deve responder:

- que ativo e esse
- qual sua identificacao
- em que estado esta
- com quem esta
- qual foi sua origem

Ele deve ser tratado como a fonte oficial de rastreabilidade patrimonial da Nexa.

## Como usar

### Cadastro

1. registrar nome, categoria, marca e modelo
2. preencher tag, serial e condicao quando houver
3. vincular centro de custo
4. registrar data de aquisicao e garantia quando fizer sentido

### Alocacao

1. alocar o ativo para colaborador, projeto ou centro de custo
2. registrar observacoes relevantes
3. informar devolucao quando o ativo sair daquele contexto

### Origem por compra

Quando o ativo vier de compra:

1. usar a ponte do modulo de compras
2. preservar o vinculo entre item comprado e ativo gerado

Diretriz operacional:

- todo ativo precisa ter identidade minima e contexto de uso
- a alocacao deve refletir a posse ou responsabilidade atual
- a origem por compra deve ser preservada sempre que existir

## Como pensar o modulo

- ativo nao e estoque
- ativo precisa de identidade propria
- alocacao precisa de rastreabilidade

Padrao recomendado:

- usar tag, serial e categoria para evitar ambiguidade na leitura do patrimonio
- revisar condicao e alocacao quando houver troca de responsavel, projeto ou area
- registrar devolucao e mudanca de contexto sem deixar lacuna operacional

## Boas praticas

1. nao criar ativo sem identidade minima
2. nao deixar ativo alocado sem contexto atualizado
3. registrar mudanca de condicao quando houver desgaste relevante
4. usar compra como origem quando o bem vier de aquisicao formal

## Sinais de uso incorreto

- notebook tratado como item de estoque
- ativo sem tag ou sem contexto minimo de identificacao
- ativo com responsavel incorreto

## Fechamento

O modulo de ativos deve ser a fonte de verdade do patrimonio da Nexa.

Quando ele e usado com disciplina, a empresa ganha controle de responsabilidade, historico e seguranca patrimonial.
