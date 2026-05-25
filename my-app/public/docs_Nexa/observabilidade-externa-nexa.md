# Observabilidade Externa Nexa

## Objetivo

Permitir exportacao estruturada de eventos criticos para plataforma externa (SIEM/APM/Datadog/collector HTTP), alem do alerta operacional em canal de incidente.

## O que ja esta ativo

1. Alertas criticos por webhook em `INCIDENT_ALERTS_WEBHOOK_URL`
2. Export opcional de eventos em `OBSERVABILITY_EXPORT_URL`
3. Registro de falha de export em `IntegrationLog` com `integrationName = OBSERVABILITY_EXPORT`

## Configuracao

No `.env`:

1. `OBSERVABILITY_EXPORT_ENABLED=true`
2. `OBSERVABILITY_EXPORT_URL=https://seu-endpoint-de-observabilidade`
3. `OBSERVABILITY_EXPORT_TOKEN=token-opcional`

## Formato de evento exportado

Campos principais:

1. `source`
2. `category` (`runtime`, `integration`, `operation`)
3. `severity` (`critical`, `warning`, `info`)
4. `title`
5. `message`
6. `metadata`
7. `occurredAt`

## Eventos atualmente enviados

1. Falhas criticas de conectores de integracao
2. Erros de runtime capturados em endpoints internos criticos

## Referencias

1. `src/lib/operations/observability-forwarder.ts`
2. `src/lib/operations/incident-channel.ts`
3. `src/lib/integrations/incident-notifications.ts`
4. `src/lib/operations/runtime-incidents.ts`
