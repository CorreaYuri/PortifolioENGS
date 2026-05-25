# Integracoes e Conectores Nexa

## Objetivo

Centralizar a governanca de integracoes externas da Nexa em um modelo unico de conector, com diagnostico rapido e trilha operacional.

Guia de ativacao detalhado:

- `docs/ativacao-integracoes-nexa-passo-a-passo.md`

## Painel operacional

Rota interna:

- `/app/configuracoes/integracoes`

O painel mostra:

1. conector e categoria
2. status de configuracao (pronto ou pendente)
3. variaveis obrigatorias ausentes
4. ultimo log de integracao registrado em `IntegrationLog`
5. botao de health-check remoto por conector

## Conectores cadastrados

1. `1400CR` (Suporte)
2. `FISCAL_NFE` (Fiscal, com sync operacional de status NFe)
3. `FINANCEIRO_BANKING` (Financeiro, com sync operacional de conciliacao)

## Fonte de configuracao

Catalogo de conectores:

- `src/lib/integrations/connectors.ts`

Esse arquivo define:

1. chave do conector
2. descricao
3. variaveis obrigatorias
4. variaveis opcionais
5. link de documentacao

## Variaveis de ambiente

Use `.env.example` como referencia minima para homologacao e producao.

Obrigatorias para operacao geral:

1. `DATABASE_URL`
2. `AUTH_SECRET`
3. `SIGNATURE_REMINDERS_CRON_TOKEN`

Obrigatorias para 1400CR:

1. `NEXA_1400CR_BASE_URL`
2. `NEXA_1400CR_API_TOKEN`

## Governanca recomendada

1. toda nova integracao deve entrar primeiro no catalogo de conectores
2. toda acao de sincronizacao deve gerar `IntegrationLog`
3. toda falha de integracao deve retornar mensagem operacional clara
4. antes de ativar producao, validar credenciais e endpoint em homologacao

## Health-check remoto

Cada conector possui acao de health-check no painel:

1. executa teste de conectividade e resposta HTTP
2. registra resultado em `IntegrationLog` com `entityType = CONNECTOR_HEALTHCHECK`
3. mostra status e horario do ultimo teste no proprio card do conector

Observacao:

- no `1400CR`, o check usa endpoint configurado e token bearer
- nos conectores base (fiscal/bancario), o check testa `GET /health` do `BASE_URL`

## Camadas operacionais ja ativas

### `FISCAL_NFE`

O conector fiscal agora ja opera uma camada real de consulta:

1. sync de status NFe por numero de nota
2. snapshot em `IntegrationLog` com `entityType = NFE_STATUS_SYNC`
3. reconciliacao de eventos por nota com `entityType = NFE_STATUS_MATCH`
4. fila de divergencias no modulo `/app/fiscal`
5. reflexo executivo em fechamento, rotina diaria, auditoria e central de pendencias

Uso esperado:

1. registrar nota normalmente no modulo fiscal
2. executar a sync fiscal manualmente ou por agenda
3. tratar notas sem retorno ou canceladas externamente direto na fila do fiscal

Automacao interna:

- endpoint protegido para execucao automatica de health-check geral:
  - `GET/POST /api/internal/connectors-health`
  - autenticacao por `CONNECTOR_HEALTH_CRON_TOKEN`

## Alertas automaticos de incidente

Quando um health-check de conector retorna erro:

1. o sistema abre notificacao operacional critica automaticamente
2. a notificacao aparece para perfis com capacidade `administrative.manage`
3. a notificacao e encerrada automaticamente quando o conector volta para sucesso

Chave de notificacao:

- `integrations:connector-failure:<CONECTOR>`

## Proximos passos recomendados

1. adicionar health-check remoto por conector no painel
2. criar agenda de sincronizacao automatica para conectores criticos
3. ampliar leitura de SLA por integracao na Central de pendencias
