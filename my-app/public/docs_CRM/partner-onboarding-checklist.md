# Checklist de Onboarding de Parceiros

Versao: 1.0  
Data: 2026-04-02  
Status: Uso interno e handoff tecnico

## Objetivo

Este checklist padroniza a entrada de um novo sistema integrador no 1400CRM.

Ele deve ser usado sempre que um novo parceiro externo for habilitado para consumir a API de integracao do 1400CRM.

## 1. Definicao do Integrador

Preencher antes de iniciar:
- nome do parceiro
- tipo de sistema: ERP, CRM, portal, app, middleware ou outro
- `externalSystem` oficial que sera usado na API
- tenant alvo da integracao
- responsavel tecnico do parceiro
- responsavel tecnico do 1400CRM
- ambiente de homologacao
- ambiente de producao

## 2. Validacoes Funcionais

Confirmar o escopo da integracao:
- sincronizar cliente
- localizar cliente existente
- abrir chamado
- listar chamados por cliente
- consultar detalhe do chamado
- receber webhook de atualizacao

Confirmar tambem:
- quem e a fonte mestra do cliente
- quais inboxes poderao receber chamados do integrador
- qual campo o parceiro usara como correlacao interna
- se o parceiro usara polling, webhook ou ambos

## 3. Configuracao no 1400CRM

Validar no tenant:
- tenant ativo
- origem `API` habilitada
- pelo menos uma inbox ativa
- pelo menos um usuario ativo para operacao
- `APP_URL` configurado corretamente

Criar credencial do parceiro em `INTEGRATION_CREDENTIALS_JSON` com:
- `tenantSlug`
- `name`
- `externalSystem`
- `token`
- `webhookUrl`, se aplicavel
- `webhookSecret`, se aplicavel

Exemplo:

```json
{
  "tenantSlug": "acme",
  "name": "Parceiro X",
  "externalSystem": "PARCEIROX",
  "token": "token-seguro",
  "webhookUrl": "https://parceiro.exemplo.com/webhooks/1400",
  "webhookSecret": "opcional"
}
```

## 4. Itens a Enviar ao Parceiro

Compartilhar com o parceiro:
- base URL da API
- token de integracao
- `externalSystem` oficial
- documento da API generica
- documento especifico do parceiro, se existir
- lista de inboxes liberadas para abertura
- ambiente de homologacao
- ambiente de producao

Documentos base:
- [integration-api.md](/j:/Projetos/1400Graus_CRM/docs/integration-api.md)
- [nexa-integration-spec.md](/j:/Projetos/1400Graus_CRM/docs/nexa-integration-spec.md)

## 5. Implementacao Minima Esperada do Parceiro

O parceiro deve implementar:
- `POST /api/integrations/customers/upsert`
- `GET /api/integrations/customers/lookup`, se necessario
- `POST /api/integrations/tickets`
- `GET /api/integrations/customers/{clientId}/tickets`
- `GET /api/integrations/tickets/{ticketId}`
- endpoint receptor de webhook, se aplicavel

O parceiro tambem deve armazenar:
- `clientId`
- `identifier`
- `url`
- `ticketListUrl`
- `ticketId`
- `protocol`

## 6. Homologacao Tecnica

Executar os testes minimos:
1. criar cliente novo e validar retorno `201`
2. reenviar o mesmo cliente e validar retorno `200`
3. localizar cliente por identificador externo
4. abrir chamado com `clientId` valido
5. listar chamados do cliente
6. consultar detalhe do chamado
7. validar retorno de `status`, `priority`, `protocol`, `createdAt`, `updatedAt`, `closedAt`, `slaStatus` e `url`
8. validar erro de token invalido
9. validar erro de cliente inexistente
10. validar erro de inbox inexistente

## 7. Homologacao de Webhook

Se houver webhook:
- validar recebimento de `ticket.created`
- validar recebimento de `ticket.updated`
- validar recebimento de `ticket.closed`
- validar assinatura em `X-Webhook-Signature`, se configurada
- validar comportamento do parceiro em caso de recebimento duplicado
- validar se o parceiro trata webhook como complemento ao polling

## 8. Go-Live

Antes de producao:
- trocar token de homologacao por token de producao
- revisar `webhookUrl` de producao
- revisar `APP_URL` de producao
- validar tenant e inboxes do ambiente final
- confirmar responsaveis de monitoramento
- registrar data de ativacao

## 9. Pos-Go-Live

Monitorar nas primeiras operacoes:
- clientes sincronizados com sucesso
- chamados abertos corretamente
- status refletidos no sistema externo
- webhooks entregues sem falha
- ausencia de duplicidades de cliente ou ticket

## 10. Checklist de Encerramento

Marcar como concluido apenas quando:
- documentacao enviada ao parceiro
- credencial configurada
- homologacao concluida
- producao ativada
- contatos tecnicos registrados
- evidencias de teste armazenadas
