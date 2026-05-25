# Guia Financeiro Nexa

## Objetivo

Este documento orienta o uso do modulo financeiro da Nexa.

Ele explica:

- como registrar saidas e entradas
- como pensar cobranca e pagamento
- como ler fluxo de caixa
- como manter coerencia com compras, centros de custo e fiscal
- como emitir boletos com dados PIX/bancarios
- como negociar debitos e gerar parcelamentos

## Papel do modulo

O financeiro da Nexa deve responder:

- quanto saiu
- quanto deve entrar
- quanto entrou de fato
- onde cada valor impacta a empresa

Ele deve ser tratado como a referencia oficial da leitura economica da operacao.

## Como usar

### Despesas

1. registrar toda saida relevante
2. usar titulo claro e descricao objetiva
3. informar valor, data e status corretos
4. vincular centro de custo sempre que fizer sentido
5. usar busca, filtros de estado e paginacao em `/app/financeiro/despesas` para tratar volume maior sem perder controle

### Cobrancas

1. criar cobranca ligada ao cliente correto
2. vincular projeto quando houver relacao direta
3. informar vencimento e descricao
4. manter status coerente com a realidade financeira
5. usar busca, filtros por estado financeiro e paginacao em `/app/financeiro/recebiveis` para priorizar risco de inadimplencia
6. usar exportacao `CSV` ou `PDF` na propria tela de recebiveis para compartilhar recortes filtrados

### Boletos

1. abrir `/app/financeiro/boletos`
2. cadastrar ou atualizar o perfil de recebimento (favorecido, PIX ou banco/agencia/conta)
3. escolher uma cobranca existente ou gerar boleto avulso
4. editar pagador, valor, vencimento, descricao e instrucoes antes de emitir
5. validar a previa do boleto na propria tela (incluindo linha digitavel e PIX copia-e-cola)
6. decidir se gera nota fiscal junto (`sim` ou `nao`)
7. emitir o boleto e baixar o PDF gerado com codigo de barras e QR Code PIX

Regra operacional:

- boleto sem perfil de recebimento ativo nao deve ser emitido
- se a opcao de nota fiscal estiver marcada, o registro nasce no modulo fiscal automaticamente
- apos emitir, boleto e nota (quando houver) ficam disponiveis no `/portal/financeiro` do cliente

Fluxo de comprovante no portal:

1. cliente baixa o boleto no `/portal/financeiro`
2. cliente anexa comprovante do pagamento (PDF ou imagem)
3. so depois do comprovante o botao "informar pagamento" fica liberado
4. ao informar, o financeiro recebe notificacao para conferencia
5. financeiro valida o comprovante em `/app/financeiro/boletos` e confirma pagamento
6. com a confirmacao, o boleto vira `PAID` e o recebivel vinculado recebe baixa no contas a receber

SLA de conferencia:

- o sistema aplica SLA configuravel por `BOLETO_PAYMENT_REVIEW_SLA_HOURS` (padrao: `24`)
- se ultrapassar o SLA sem parecer financeiro, o alerta sobe para tom critico na central `/app/pendencias`

### Pagamentos

1. registrar pagamento na cobranca correta
2. informar valor, data e metodo
3. confirmar o status somente quando o recebimento for real

### Fluxo de caixa

1. usar a leitura mensal para acompanhamento gerencial
2. comparar entradas confirmadas com saidas lancadas
3. observar tendencia, nao apenas fotografia isolada
4. abrir `/app/financeiro` e seguir o card "Proxima acao" para priorizar vencidos antes do restante da fila

### Conciliacao bancaria

1. abrir `/app/financeiro/conciliacao-bancaria` quando houver fila manual
2. tratar primeiro ambiguos, depois excecoes e por fim itens sem match
3. confirmar manualmente o boleto ou recebivel correto quando a sync nao puder baixar com seguranca
4. usar exportacao e historico da fila para suporte executivo e auditoria
5. acompanhar o reflexo da fila no fechamento mensal, rotina diaria e auditoria executiva

### Envelhecimento de recebiveis

No painel de recebiveis, o sistema agora exibe as faixas:

1. a vencer
2. vencido 0-30 dias
3. vencido 31-60 dias
4. vencido 61+ dias

Use esse quadro para priorizar cobranca por urgencia financeira.

### Negociacao de debitos

1. abrir `/app/financeiro/negociacoes`
2. selecionar o cliente inadimplente
3. marcar os debitos em aberto que entrarao no acordo
4. definir quantidade de parcelas, primeiro vencimento e intervalo
5. registrar observacao do acordo e confirmar

Comportamento do sistema:

1. os debitos originais selecionados sao marcados como negociados (cancelados para evitar duplicidade de cobranca)
2. novas cobrancas parceladas sao criadas automaticamente no contas a receber
3. a negociacao fica registrada na trilha operacional

Diretriz operacional:

- despesa representa compromisso ou saida da empresa
- cobranca representa valor previsto a receber
- pagamento representa entrada efetiva
- a leitura gerencial deve partir dessa separacao, sem atalhos conceituais

## Integracao com outros modulos

### Compras

- compra pode virar despesa financeira
- isso evita retrabalho e melhora rastreabilidade

### Centros de custo

- todo gasto importante deve apontar para classificacao gerencial
- isso ajuda a ler operacao, administrativo e projetos

### Fiscal

- cobranca e pagamento nao substituem nota fiscal
- o fiscal deve fechar o ciclo formal quando aplicavel

### Portal do cliente

- o cliente ve apenas o que pertence ao proprio contexto
- cobrancas, pagamentos e notas expostas no portal devem estar consistentes no backoffice

## Como pensar os objetos financeiros

- `despesa` = dinheiro que sai
- `cobranca` = dinheiro que deve entrar
- `pagamento` = dinheiro que efetivamente entrou

Essa separacao e obrigatoria para evitar leitura errada do caixa.

Padrao recomendado:

- registrar a cobranca antes de registrar o pagamento
- vincular projeto quando o valor nascer de uma entrega especifica
- usar centro de custo para consolidar leitura gerencial
- manter o portal coerente com o backoffice em qualquer informacao exposta ao cliente

## Boas praticas

1. nao usar cobranca para simular pagamento
2. nao registrar despesa fora do centro de custo quando houver contexto
3. nao duplicar registro manual de compra e despesa sem usar a ponte certa
4. nao alterar status financeiro por atalho quando existe evento correto para isso
5. revisar fluxo de caixa com frequencia

## Sinais de uso incorreto

- cobranca marcada como paga sem pagamento registrado
- despesa sem contexto recorrente
- compra feita fora do fluxo administrativo
- portal do cliente mostrando valor sem lastro no backoffice

## Fechamento

O modulo financeiro precisa ser tratado como fonte de verdade da leitura economica da Nexa.

Se ele for usado com disciplina, a empresa ganha previsibilidade, controle e base confiavel para crescer.
