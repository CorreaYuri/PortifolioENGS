# Auditoria Executiva Nexa

## Objetivo

Consolidar uma visao unica de risco executivo para diretoria e operacao.

Rota:

- `/app/configuracoes/auditoria-executiva`

## Blocos do painel

1. Governanca de acessos (overrides e trilhas de auditoria)
2. Integracoes e tecnologia (incidentes, recuperacoes, MTTR)
3. RH e financeiro (assinaturas em risco, recebiveis e despesas vencidas)
4. Prontidao de banco (continuidade)

## Indicadores principais

1. notificacoes ativas
2. erros de integracao 24h
3. erros de runtime 24h
4. incidentes abertos
5. assinaturas RH pendentes
6. score de prontidao do banco

## Publico-alvo

1. Diretoria
2. Operacao
3. Administrativo/Financeiro
4. Tecnologia

## Referencias

1. `src/app/app/configuracoes/auditoria-executiva/page.tsx`
2. `src/lib/operations/incident-sla.ts`
3. `src/lib/operations/db-readiness.ts`

## Cache operacional do endpoint executivo

Endpoint:

- `GET /api/internal/executive-audit-report`

Comportamento atual:

1. autenticacao por token permanece obrigatoria
2. payload do relatorio (json/csv) usa cache em memoria por `60 segundos`
3. apos o TTL, o relatorio e recalculado automaticamente

Objetivo:

- reduzir picos de latencia em chamadas sequenciais
- proteger o banco de recomputacao excessiva no mesmo intervalo
