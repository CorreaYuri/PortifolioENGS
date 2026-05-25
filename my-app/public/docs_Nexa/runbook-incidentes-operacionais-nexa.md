# Runbook de Incidentes Operacionais Nexa

## Objetivo

Padronizar resposta a incidentes para reduzir tempo de recuperacao e impacto na operacao.

## Classificacao de severidade

1. `SEV-1`: sistema indisponivel ou perda critica de operacao
2. `SEV-2`: modulo critico degradado sem indisponibilidade total
3. `SEV-3`: falha parcial com workaround operacional

## Passo a passo

1. identificar severidade e modulo afetado
2. registrar incidente com horario e sintomas
3. consultar `/app/configuracoes/operacao` e logs de integracao
4. aplicar mitigacao imediata
5. comunicar status ao time e diretoria
6. executar correcao definitiva
7. registrar causa raiz e acao preventiva

## Fontes de evidencia

1. `IntegrationLog`
2. `NotificationEvent` ativos
3. logs de sincronizacao de conectores
4. trilha de eventos por modulo

## Pos-incidente

1. documentar RCA (causa raiz)
2. criar item de melhoria no backlog
3. atualizar checklist de go-live se necessario

