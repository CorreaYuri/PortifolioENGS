# Guia Fiscal Nexa

## Objetivo

Este documento orienta o uso do modulo fiscal da Nexa.

Ele explica:

- como registrar notas fiscais
- como relacionar nota a cliente, projeto e cobranca
- como manter coerencia entre financeiro e fiscal
- como usar a leitura do conector `FISCAL_NFE`

## Papel do modulo

O fiscal fecha a camada formal da operacao administrativa.

Ele deve responder:

- qual nota foi emitida
- para qual cliente
- para qual projeto
- em relacao a qual cobranca

Ele deve ser tratado como a referencia oficial da formalizacao documental da relacao financeira com o cliente.

## Como usar

### Registro de nota

1. criar a nota com valor, cliente e status corretos
2. vincular projeto quando houver relacao operacional
3. vincular cobranca quando a nota estiver ligada ao recebivel
4. preencher numero e data de emissao assim que houver definicao formal
5. abrir `/app/fiscal` e seguir o card "Proxima acao" para priorizar rascunhos e cobrancas sem nota

### Atualizacao de status

1. usar `DRAFT` quando a nota ainda estiver em preparacao
2. usar `ISSUED` quando a emissao estiver consolidada
3. usar `CANCELLED` apenas quando a nota tiver sido formalmente cancelada

### Integracao NFe

1. abrir `/app/fiscal` e revisar o bloco `Integracao fiscal`
2. conferir a ultima sync do `FISCAL_NFE`
3. tratar primeiro notas `sem retorno` ou `canceladas externamente`
4. usar a fila de divergencias para ajustar o status da nota no proprio livro fiscal
5. acompanhar esse mesmo impacto em `/app/financeiro/fechamento`, `/app/rotina-diaria` e `/app/pendencias`

Diretriz operacional:

- nota fiscal nao substitui cobranca nem pagamento
- a camada fiscal deve refletir o fato formal, nao apenas a expectativa financeira
- cliente, projeto e cobranca devem ser vinculados sempre que houver essa relacao

## Integracao com outros modulos

- `Financeiro` mostra o contexto economico
- `Fiscal` mostra a formalizacao documental
- `Portal` pode expor notas ao cliente quando o contexto estiver correto

Padrao recomendado:

- registrar numero e data de emissao assim que a nota estiver formalizada
- preservar coerencia entre valor fiscal e valor financeiro relacionado
- usar o projeto como contexto quando a nota estiver ligada a uma entrega especifica
- usar a sync fiscal como camada de conferencia externa, nao como substituto da decisao administrativa

## Boas praticas

1. nao registrar nota sem revisar cliente e valor
2. nao deixar nota emitida sem numero quando esse dado ja existir
3. nao tratar cobranca e nota como a mesma coisa
4. sempre que possivel, vincular nota ao projeto correto
5. revisar diariamente a fila de divergencias do `FISCAL_NFE` quando o conector estiver ativo

## Sinais de uso incorreto

- nota sem cliente definido
- nota emitida sem contexto financeiro
- valor fiscal sem coerencia com cobranca relacionada
- nota sem retorno recorrente no provedor fiscal sem tratativa interna
- nota cancelada externamente sem refletir no livro fiscal

## Fechamento

O modulo fiscal deve ser a referencia formal da relacao entre recebimento e documento fiscal dentro da Nexa.

Quando usado com disciplina, ele reduz ambiguidade administrativa e fortalece a confianca na leitura financeira da empresa.
