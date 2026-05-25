# Governanca Operacional: SLA, Plantao e Fechamento

## Objetivo

Consolidar os controles de continuidade e governanca para operacao formal da Nexa.

## Escopo implementado

1. SLA formal de incidentes (P1/P2/P3) com monitoramento de violacao
2. Escala de plantao por trilha (Comercial, RH, Financeiro, Operacao)
3. Checklist bloqueante de fechamento mensal (RH + Financeiro + Integracoes)
4. Baseline de seguranca e compliance com score
5. Export executivo consolidado (JSON/CSV)

## Onde operar

Painel principal:

- `/app/configuracoes/auditoria-executiva`

Endpoint de relatorio executivo:

- `GET /api/internal/executive-audit-report`
- `GET /api/internal/executive-audit-report?format=csv`
- token: `EXEC_AUDIT_REPORT_TOKEN` via `x-cron-token` ou `Authorization: Bearer`

## Politica de SLA adotada

1. P1: 60 minutos
2. P2: 240 minutos
3. P3: 1440 minutos

Quando um incidente aberto ultrapassa o limite da prioridade, ele aparece como violacao de SLA.

## Escala de plantao

A escala fica em:

- `storage/ops/oncall-roster.json`

Atualizacao manual pela tela de auditoria executiva. Cada trilha tem:

1. responsavel principal
2. backup (opcional)
3. contato operacional

## Fechamento mensal bloqueante

Bloqueadores monitorados:

1. documentos RH sem assinatura
2. assinaturas RH em risco D+3
3. pontos enviados aguardando revisao
4. recebiveis vencidos
5. despesas vencidas
6. incidentes recentes de integracao

Sem zerar bloqueadores, o fechamento aparece como "Bloqueado".

## Baseline de seguranca

Variaveis de referencia:

1. `SESSION_MAX_DAYS`
2. `SECURITY_PASSWORD_MIN_LENGTH`
3. `SECURITY_REQUIRE_MFA_ADMIN`
4. `SECURITY_BLOCK_TEST_ACCOUNTS`

## Referencias tecnicas

1. `src/lib/operations/incident-governance.ts`
2. `src/lib/operations/oncall.ts`
3. `src/lib/operations/monthly-close.ts`
4. `src/lib/operations/security-compliance.ts`
5. `src/lib/operations/executive-report.ts`
6. `src/app/app/configuracoes/auditoria-executiva/page.tsx`
