# Integracao Comercial com CRMs

## Objetivo

Preparar o funil comercial do portal Entregoo para integracao com CRMs e sistemas externos comuns de vendas, sem confundir essa camada com o fluxo operacional dos tenants.

---

## Escopo desta etapa

Esta entrega deixa pronta a base para integracao com:

- HubSpot
- Pipedrive
- RD Station CRM
- Salesforce
- webhook customizado / parceiro / middleware

O foco aqui e:

- configuracao do portal Entregoo
- checklist de prontidao
- definicao de escopo de sincronizacao

Nao e uma implantacao completa de cada provedor.

---

## Onde configurar

### Portal

- [entregoo-web/src/components/marketing/EntregooSalesPipelinePage.tsx](/j:/Projetos/entregoo/entregoo-web/src/components/marketing/EntregooSalesPipelinePage.tsx)

### Infra compartilhada do portal

- [entregoo-web/src/lib/entregoo-portal-ops-api.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/entregoo-portal-ops-api.ts)
- [entregoo-api/src/routes/entregoo-portal-ops.routes.ts](/j:/Projetos/entregoo/entregoo-api/src/routes/entregoo-portal-ops.routes.ts)
- [entregoo-api/src/controllers/entregoo-portal-ops.controller.ts](/j:/Projetos/entregoo/entregoo-api/src/controllers/entregoo-portal-ops.controller.ts)
- [entregoo-api/src/services/entregoo-portal-ops.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/entregoo-portal-ops.service.ts)

---

## Modelo de configuracao atual

O preparo atual mora no proprio portal comercial e nao em `DashboardSettings` do tenant.

Os dados guardados hoje sao:

- provedor selecionado
- direcao de sincronizacao
- pipeline externo
- campo de etapa
- webhook
- credenciais
- owner fallback
- escopo do que exportar e importar

Campos centrais:

- `provider`
- `syncDirection`
- `pipelineId`
- `pipelineName`
- `stageField`
- `webhookUrl`
- `webhookSecret`
- `apiToken`
- `clientId`
- `clientSecret`
- `refreshToken`
- `accountId`
- `ownerFallback`

Toggles operacionais:

- `exportLeads`
- `exportProposals`
- `importStageChanges`
- `importNotes`
- `importOwners`
- `autoCreateMissingLeads`

Novidades operacionais ja implementadas no portal:

- secao de integracao comercial recolhivel
- persistencia do estado expandido ou recolhido
- checklist visual de prontidao
- catalogo dos provedores suportados
- filtro rapido de leads por closer
- modo `Mostrar meus leads`
- edicao rapida do lead selecionado sem sair do funil

---

## Escopo correto

Esse preparo pertence ao **portal Entregoo**, porque o funil comercial vive em:

- `/entregoo/comercial`

Ele nao pertence a:

- `/dasboard/configuracoes`
- `/dasboard/integracoes`

Essas telas sao do tenant operacional.

---

## Como pensar a integracao

### Saida do Entregoo para o CRM

Usar para:

- criar lead externo
- atualizar etapa externa
- criar ou atualizar oportunidade
- sincronizar proposta comercial

### Entrada do CRM para o Entregoo

Usar para:

- mudar etapa do card
- atualizar owner / closer
- anexar observacao operacional
- refletir perda, ganho ou reabertura

---

## Regra importante

Este bloco prepara integracao comercial do **portal Entregoo**, nao integracao operacional do assinante.

Ou seja:

- iFood / Anota AI / PDV pertencem ao tenant operacional
- HubSpot / Pipedrive / RD Station CRM / Salesforce pertencem ao funil comercial do portal

---

## O que ainda falta para conectores completos

Para transformar esta base em conectores reais por provedor, ainda faltam:

- persistencia de `externalId` por lead e proposta
- mapeamento de etapas por provedor
- endpoints dedicados do portal para webhook e exportacao real
- jobs de exportacao real
- ingestao real de payloads de cada CRM
- estrategia de deduplicacao por email, telefone e ID externo
- trilha de auditoria de sincronizacao

---

## Ordem recomendada de implantacao real

1. Escolher o CRM principal.
2. Preencher credenciais e pipeline no tenant.
3. Validar `readiness`.
4. Definir o contrato de campos.
5. Implementar exportacao de lead.
6. Implementar retorno de etapa.
7. Depois abrir proposta, owner e notas.

---

## Fontes oficiais de referencia

- HubSpot Developers: https://developers.hubspot.com/docs/reference/api/crm/objects/contacts
- Pipedrive Developers: https://pipedrive.readme.io/
- RD Station Developers: https://developers.rdstation.com/reference/crm-v2-users
- Salesforce Developers: https://developer.salesforce.com/docs/apis
