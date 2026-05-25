# Guia de RH Nexa

## Objetivo

Este documento orienta o uso do modulo de RH e da rotina de pessoas dentro da Nexa.

Ele cobre:

- registro de ponto
- documentos
- ausencias e calendario
- fechamento de competencia
- espelho e ciencia

## Papel do modulo

O RH da Nexa deve garantir:

- rastreabilidade
- organizacao documental
- leitura correta da jornada
- seguranca no fechamento mensal

Ele deve ser a referencia administrativa da relacao da empresa com cada colaborador.

## Como usar

Ponto de entrada recomendado para o colaborador:

- abrir `/app/pessoal` para concentrar perfil, assinatura visual, senha e atalhos do fluxo de documentos RH
- usar `/app/meu-rh/documentos` com filtro por etapa (`Assinar agora`, `Aguardando RH`, `Concluidos`)
- usar o card "Proxima acao" em `/app/meu-rh/documentos` para seguir direto para a etapa atual sem navegar por varios blocos

### Colaboradores

1. manter cadastro completo e atualizado
2. vincular setor, cargo, contrato e carga horaria
3. centralizar documentos no cadastro da pessoa

### Ponto

1. registrar entradas e saidas corretamente
2. usar observacoes para justificar contexto fora do normal
3. revisar registros pendentes antes de fechar competencia
4. aprovar ou ajustar os pontos antes de considerar banco de horas

### Documentos

Entrada recomendada do RH:

- abrir `/app/rh` e usar o bloco "Assinatura RH em 3 passos" para navegar por envio, acompanhamento e aprovacao final
- no `/app/rh/documentos`, usar o card "Proxima acao RH" para cair direto no gargalo da fila (assinatura pendente ou aprovacao RH)

1. anexar documentos no colaborador correto
2. classificar por categoria
3. preencher datas quando o documento tiver validade
4. revisar vencimentos com antecedencia
5. quando exigir assinatura do colaborador, marcar solicitacao de assinatura no envio
6. acompanhar no painel RH os filtros de pendentes, assinados e vencendo
7. usar "acao em lote" em `/app/rh/documentos` para solicitar assinatura de varios documentos de uma vez
8. para ciclos mensais, usar o seletor de competencia (AAAA-MM) no lote para marcar rapidamente os documentos elegiveis daquele mes
9. usar o botao "Competencia atual" para o processamento rapido da folha do mes corrente
10. usar o botao "Competencia anterior" para fechamento retroativo sem remontar selecao manual
11. apos assinatura do colaborador, abrir a auditoria do documento e registrar parecer final do RH (aprovar ou rejeitar)

### Calendario e ausencias

1. registrar feriados corporativos
2. cadastrar ausencias aprovadas no periodo correto
3. garantir que o calendario reflita a realidade da competencia

### Fechamentos

1. fechar a competencia apenas depois de revisar pontos e ausencias
2. conferir horas trabalhadas, esperadas e saldo
3. aprovar formalmente o espelho
4. gerar PDF quando necessario
5. registrar a ciencia do colaborador

Diretriz operacional:

- o fechamento nao deve ser usado para corrigir desorganizacao acumulada
- a competencia precisa chegar ao fechamento com ponto e ausencias ja tratados
- o snapshot deve representar a leitura oficial daquele periodo

## Como interpretar a logica do RH

- ponto bruto nao e saldo final
- saldo final depende de aprovacao
- feriados e ausencias mudam a base esperada
- o fechamento gera snapshot para congelar a leitura oficial

## O que a automacao do modulo faz

Hoje o RH ja automatiza:

- leitura de banco de horas por competencia
- impacto de feriados nao opcionais
- impacto de ausencias aprovadas
- snapshot do fechamento mensal
- geracao de espelho em PDF
- fluxo de assinatura de documentos de RH no autosservico do colaborador
- trilha de auditoria basica de solicitacao e assinatura documental
- pagina de auditoria por documento com linha do tempo de eventos e notificacoes
- exportacao da auditoria documental de RH em CSV e PDF
- filtro de periodo na auditoria (30 dias, 90 dias ou personalizado) aplicado tambem nas exportacoes
- memoria da ultima escolha de periodo por usuario/navegador na tela de auditoria
- notificacao operacional quando um documento fica pendente de assinatura
- baixa automatica da notificacao quando a assinatura e concluida
- notificacao informativa quando o documento e assinado pelo colaborador
- solicitacao de assinatura em lote para documentos visiveis no painel de RH
- destaque de SLA na listagem documental (D+3 risco, D+7 critico)
- etapa formal de aprovacao RH apos assinatura do colaborador

## O que a equipe ainda precisa fazer manualmente

- revisar qualidade do ponto
- validar divergencias
- decidir ajustes
- acompanhar vencimento documental

Automacao aqui ajuda controle, mas nao substitui governanca.

Padrao recomendado:

- revisar o ponto ao longo do mes e nao apenas no fechamento
- manter documentos no cadastro correto, com categoria e validade quando aplicavel
- tratar divergencias antes de aprovar banco de horas ou espelho
- registrar ciencia apenas quando o colaborador tiver acesso ao espelho consolidado

## Boas praticas

1. nao deixar ponto pendente acumulando
2. nao fechar competencia com duvida operacional
3. nao espalhar documento fora do cadastro do colaborador
4. nao usar ausencia para mascarar erro de ponto
5. revisar vencimentos de documentos com antecedencia

## Sinais de uso incorreto

- muitos pontos em rascunho perto do fechamento
- documento importante sem categoria
- saldo questionado sem revisao do espelho
- ausencia registrada fora do periodo real

## Fechamento

O modulo de RH deve sustentar confianca interna e organizacao administrativa.

Quando ele e usado com disciplina, a Nexa ganha previsibilidade, historico e seguranca de operacao.

## Validacao tecnica rapida

Para validar o fluxo de assinatura de RH apos mudancas no sistema, executar:

```bash
npm run test:smoke:rh
```

Este smoke check confirma a presenca dos pontos criticos do fluxo:

- painel de documentos RH e filtros de pendencia
- autosservico de assinatura no Meu RH
- rotas de entrega de documento e assinatura visual
- endpoint interno de lembretes de assinatura
- acao em lote de assinatura no painel RH
