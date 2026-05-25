# Configuracoes - Governanca de Ambiente e Auditoria

## Objetivo
Centralizar a governanca operacional de configuracoes da Nexa com:

- status por modulo e por ambiente (`dev`, `homolog`, `prod`)
- responsavel e prazo por frente
- trilha auditavel com antes/depois de cada alteracao

## Onde acessar

- `/app/configuracoes`

## O que o modulo faz

1. mostra um painel de risco por ambiente:
- modulos `OK`
- modulos em `ATENCAO`
- modulos em `BLOQUEADOR`

2. organiza governanca por modulo:
- banco e continuidade
- seguranca operacional
- integracoes
- assinaturas RH
- auditoria executiva
- observabilidade externa

3. valida variaveis obrigatorias por modulo:
- exibe quantidade configurada
- lista variaveis faltantes
- sinaliza faltas criticas (bloqueadoras)

4. registra auditoria de mudanca:
- quem alterou
- quando alterou
- quais campos mudaram
- diff `ANTES` x `DEPOIS`

5. integra com a Central de Pendencias:
- quando um modulo e marcado como `BLOCKER` em `PROD`, ele aparece automaticamente em `/app/pendencias`
- o item entra como prioridade critica e aponta para `/app/configuracoes?env=prod`
- quando um modulo esta em `ATTENTION` (ou com variaveis obrigatorias faltantes sem bloqueador), ele aparece como fila de atencao

6. politicas operacionais auditaveis:
- permite definir valores de baseline operacional (retencao, SLA e frequencias)
- registra historico com valor anterior e valor atual
- exibe trilha de alteracoes por politica
- aplica politicas no fluxo real (ex.: cleanup do historico go-live usa `go_live_export_retention_days` como padrao)
- aplica politicas no fluxo real (ex.: retencao de arquivos usa `storage_retention_days` como baseline)
- aplica politicas em monitoramento de incidente (ex.: `incident_response_sla_minutes` marca incidentes fora de SLA no painel operacional e na central de pendencias)
- gera notificacao dirigida automatica por conector fora SLA (`event:incident-sla-breach:*`), visivel na Central de Pendencias
- permite reconhecimento manual por usuario na Central de Pendencias (botao `Reconhecer incidente`, marcando o alerta como lido para quem reconheceu)
- permite desfazer reconhecimento por usuario (`Desreconhecer`) quando o registro foi feito por engano
- exibe historico de reconhecimento de incidentes em `/app/configuracoes/operacao` (quem reconheceu e quando)
- registra auditoria critica para acoes sensiveis (confirmacao de boleto, negociacao de debitos, limpezas operacionais)

## Como usar no dia a dia

1. abrir `/app/configuracoes`
2. selecionar o ambiente (`DEV`, `HOMOLOG`, `PROD`)
3. revisar cada modulo:
- ajustar `status operacional`
- definir `responsavel`
- preencher `data alvo`
- registrar `observacoes`
4. salvar governanca
5. validar o bloco `Auditoria de configuracoes` para conferir o diff gravado
6. abrir `/app/pendencias` e confirmar se bloqueadores de `PROD` foram refletidos na fila
7. revisar `Passo 3 / Politicas operacionais` para garantir baselines coerentes com a operacao real

## Regras operacionais recomendadas

- `BLOCKER`: impede go-live ou continuidade segura
- `ATTENTION`: em andamento, com plano e prazo
- `OK`: sem risco aberto relevante

## Relacao com outros modulos

- `/app/configuracoes/operacao`: saude operacional e go-live
- `/app/configuracoes/integracoes`: conectores e homologacao
- `/app/configuracoes/auditoria-executiva`: leitura executiva de risco

## Arquivos principais da implementacao

1. `src/app/app/configuracoes/page.tsx`
2. `src/app/app/configuracoes/actions.ts`
3. `src/app/app/configuracoes/governance-module-form.tsx`
4. `src/lib/configuration-governance.ts`
5. `src/lib/internal-access.ts`
