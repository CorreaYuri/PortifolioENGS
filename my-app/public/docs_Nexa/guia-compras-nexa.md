# Guia de Compras Nexa

## Objetivo

Este documento orienta o uso do modulo de compras da Nexa.

Ele explica:

- como registrar fornecedores e pedidos
- como tratar itens comprados
- como desdobrar compra em estoque, ativo e despesa

## Papel do modulo

Compras e a origem administrativa das aquisicoes da Nexa.

Ela deve responder:

- o que foi comprado
- de quem foi comprado
- para qual centro de custo
- qual foi o desdobramento operacional dessa compra

Ele deve ser tratado como o ponto de partida formal das aquisicoes da empresa.

## Como usar

### Fornecedores

1. cadastrar o fornecedor antes de iniciar o pedido quando possivel
2. manter nome, contato e documento organizados

### Pedido de compra

1. criar o pedido com titulo claro
2. preencher descricao, status, datas e centro de custo
3. adicionar os itens comprados com quantidade e valores
4. abrir `/app/compras` e usar o card "Proxima acao" para atacar primeiro o gargalo (recebimento, desdobramento ou formalizacao)

### Desdobramentos

Depois que a compra existir, decidir o destino correto:

1. item consumivel ou controlado por quantidade vai para `Estoque`
2. bem patrimonial individualizado vai para `Ativos`
3. impacto financeiro da compra vai para `Despesa`

Diretriz operacional:

- a compra nasce uma vez e depois se desdobra nos modulos corretos
- estoque, ativo e despesa nao devem ser criados como registros paralelos sem origem
- o centro de custo deve acompanhar a leitura administrativa sempre que houver contexto

## Automacoes e pontes

O modulo ja permite:

- receber item comprado no estoque
- transformar item comprado em ativo
- transformar compra em despesa

Regra importante:

- a compra e a origem
- estoque, ativo e despesa sao consequencias diferentes

Padrao recomendado:

- revisar pedido e itens antes de transformar em ativo ou receber no estoque
- preservar o fornecedor como referencia administrativa da aquisicao
- usar o desdobramento correto para manter rastreabilidade entre areas

## Boas praticas

1. nao registrar a mesma compra manualmente em varios modulos
2. usar as pontes do sistema para manter rastreabilidade
3. vincular centro de custo sempre que houver contexto
4. revisar itens antes de patrimonializar ou estocar

## Sinais de uso incorreto

- compra sem fornecedor quando deveria ter
- compra sem centro de custo recorrente
- item comprado lancado no modulo errado

## Fechamento

Compras deve ser tratada como a porta de entrada administrativa dos recursos da Nexa.

Quando esse fluxo e seguido com disciplina, a Nexa reduz retrabalho e melhora a qualidade da leitura operacional e financeira.
