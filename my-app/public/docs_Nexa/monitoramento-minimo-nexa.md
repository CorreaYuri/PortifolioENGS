# Monitoramento Minimo Nexa

## Objetivo

Padronizar um monitoramento inicial de disponibilidade e saude para operacao continua da plataforma.

## Endpoint oficial de saude

- `GET /api/health`

Comportamento:

1. retorna `200` quando aplicacao e banco respondem normalmente
2. retorna `503` quando houver degradacao no banco
3. resposta em JSON com:
   - `ok`
   - `checkedAt`
   - `environment`
   - `runtime`
   - `database` (status, latencia e erro quando existir)

## Como ativar monitor externo (passo a passo)

1. Escolha a ferramenta (ex.: UptimeRobot, Better Stack, Datadog Synthetics).
2. Configure monitor HTTP `GET` para `https://SEU_DOMINIO/api/health`.
3. Defina intervalo de verificacao:
   - producao critica: 1 minuto
   - homologacao: 5 minutos
4. Defina alerta para qualquer status diferente de `200`.
5. Configure canal de aviso (Slack, e-mail ou WhatsApp corporativo).

## Politica recomendada de alerta

1. 1 falha consecutiva: aviso informativo
2. 3 falhas consecutivas: incidente operacional
3. latencia de banco acima de 1500ms por 5 minutos: investigar degrado

## Uso interno no painel

Rota:

- `/app/configuracoes/operacao`

A tela mostra status online/degradado e dados da ultima leitura local de saude.

A mesma tela agora mostra painel de latencia dos endpoints internos com:

1. p50
2. p95
3. media
4. total de amostras
5. sucesso x erro nas ultimas 24h

Endpoints monitorados no painel:

1. `GET /api/health`
2. `GET /api/internal/db-readiness`
3. `GET /api/internal/executive-audit-report`

A tela tambem mostra bloco de SLA de incidentes de integracao com:

1. incidentes nas ultimas 24h
2. recuperacoes nas ultimas 24h
3. MTTR medio (minutos)
4. incidentes abertos por conector

## Alertas operacionais automaticos de integracao

Ao detectar falha em health-check de conector:

1. o sistema abre notificacao critica automaticamente
2. o alerta fica ativo ate o proximo sucesso do mesmo conector
3. o time acessa rapidamente por `/app/configuracoes/integracoes`

## Canal de incidente (Webhook Slack/Teams)

Variaveis:

1. `INCIDENT_ALERTS_ENABLED` (`true` ou `false`)
2. `INCIDENT_ALERTS_WEBHOOK_URL` (URL de webhook do canal)

Comportamento:

1. em falha critica de integracao, o sistema envia alerta no webhook
2. em erro de runtime capturado nos endpoints internos criticos, o sistema envia alerta no webhook
3. se o envio falhar, o erro fica registrado em `IntegrationLog` com `integrationName = INCIDENT_CHANNEL`

## Export para observabilidade externa

Variaveis:

1. `OBSERVABILITY_EXPORT_ENABLED`
2. `OBSERVABILITY_EXPORT_URL`
3. `OBSERVABILITY_EXPORT_TOKEN` (opcional)

Quando ativo:

1. falhas de integracao e runtime sao exportadas em payload JSON para endpoint externo
2. falhas de export sao registradas em `IntegrationLog` com `integrationName = OBSERVABILITY_EXPORT`

## Captura automatica de erro de runtime

O sistema captura falhas inesperadas em endpoints criticos internos:

1. `/api/health`
2. `/api/internal/connectors-health`
3. `/api/internal/signature-reminders`

Comportamento:

1. registra o evento em `IntegrationLog` com `integrationName = RUNTIME_APP`
2. abre notificacao critica para `administrative.manage`
3. exibe os ultimos eventos em `/app/configuracoes/operacao`

## Runbook de resposta

Quando houver alerta:

1. validar `/api/health` manualmente
2. checar endpoint interno de conectores e logs de integracao
3. abrir runbook operacional:
   - `docs/runbook-incidentes-operacionais-nexa.md`
