# Backup e Restore de Continuidade Nexa

## Objetivo

Padronizar validacao de continuidade de banco com evidencias formais e checklist automatico.

## Painel e fluxo operacional

Rota:

- `/app/configuracoes/operacao`

No painel:

1. leitura automatica de prontidao de banco
2. status de evidencia recente de backup (48h)
3. status de teste de restore recente (14 dias)
4. formulario para registrar nova evidencia operacional

## Endpoint interno de checklist

- `GET/POST /api/internal/db-readiness`

Protecao:

- `DB_READINESS_CRON_TOKEN`

Uso:

1. executar por agenda (cron) para registrar trilha tecnica
2. monitorar score de prontidao e notas de risco

## Variaveis obrigatorias

1. `DB_BACKUP_SCHEDULE`
2. `DB_BACKUP_RETENTION_DAYS`
3. `DB_READINESS_CRON_TOKEN`

## Evidencia armazenada

Arquivo:

- `storage/ops/db-backup-evidence.json`

Campos:

1. `backupAt`
2. `restoreTestedAt`
3. `location`
4. `strategy`
5. `retentionDays`
6. `notes`
7. `updatedByUserId`
8. `updatedAt`

## Criterio recomendado

1. backup comprovado em ate 48h
2. restore testado em ate 14 dias
3. retencao minima de 30 dias
4. score de prontidao >= 85%

## Referencias

1. `src/lib/operations/db-readiness.ts`
2. `src/app/api/internal/db-readiness/route.ts`
3. `src/app/app/configuracoes/operacao/db-backup-evidence-form.tsx`
