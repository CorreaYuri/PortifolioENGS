# Local Por Design vs Local em Transicao

## Objetivo
Registrar, de forma normativa, quais dados do Entregoo:

- podem permanecer no navegador por decisao arquitetural
- ainda estao no navegador apenas como etapa de transicao
- representam risco se crescerem sem revisao

Este documento existe para evitar que `localStorage` volte a virar fonte principal por conveniencia.

---

## Regra principal

No Entregoo, dado local so deve existir em uma destas duas categorias:

### 1. Local por design
Quando o dado e:

- preferencia de interface
- estado temporario de trabalho
- configuracao fisica da maquina ou estacao
- fallback controlado, sem ser dono da regra de negocio

### 2. Local em transicao
Quando o dado:

- ja deveria estar no backend
- ainda usa espelho local por compatibilidade
- precisa ser consolidado sem quebrar telas antigas

Se um dado nao se encaixa claramente em `local por design`, ele deve ser tratado como `local em transicao`.

---

## O que pode permanecer local por design

### Preferencias do portal Entregoo

Arquivo principal:
- [entregoo-portal-preferences.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/entregoo-portal-preferences.ts)

Exemplos:
- tema claro/escuro
- marcacao de notificacoes vistas

Justificativa:
- sao preferencias pessoais
- nao sao regra de negocio
- nao precisam ser compartilhadas entre operadores

Diretriz:
- manter por usuario quando possivel
- nao expandir esse arquivo para guardar dado operacional

---

### Rascunho temporario de checkout

Arquivo principal:
- [pending-checkout-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/pending-checkout-storage.ts)

Justificativa:
- e estado temporario de composicao do pedido
- serve para nao perder o trabalho em andamento
- nao deve ser tratado como pedido oficial

Diretriz:
- pode continuar local
- deve permanecer tenant-aware
- nao pode virar fonte oficial de pedido submetido

---

### Configuracao de estacao de impressao

Arquivo principal:
- [workstation-print-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/workstation-print-storage.ts)

Justificativa:
- e configuracao fisica da maquina
- depende do ambiente local e da impressora instalada
- nao precisa necessariamente subir para o backend

Risco:
- hoje e global da maquina, nao por tenant ou unidade

Diretriz:
- pode continuar local por design
- precisa permanecer fora da regra principal da operacao
- se a mesma maquina operar varios tenants, considerar evolucao para escopo por tenant/unidade

---

## O que ainda esta local em transicao

### Catalogo

Arquivo principal:
- [catalog-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/catalog-storage.ts)

Estado:
- `API-first com espelho local`

Leitura:
- o backend ja e fonte principal desejada
- o navegador ainda guarda espelho para resposta rapida e fallback

Diretriz:
- manter o espelho controlado
- evitar logica de negocio nova em cima do cache local

---

### Pedidos submetidos

Arquivo principal:
- [submitted-orders-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/submitted-orders-storage.ts)

Estado:
- `API-first com espelho local`

Diretriz:
- toda escrita deve continuar tenant-aware
- cache local so como reflexo
- nao reintroduzir sincronizacao automatica dentro de leitura pura

---

### Caixa

Arquivo principal:
- [cashier-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/cashier-storage.ts)

Estado:
- `API-first com espelho local`

Diretriz:
- sessao e movimento pertencem ao backend
- cache local existe apenas como apoio operacional

---

### CRM de clientes

Arquivo principal:
- [customers-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/customers-storage.ts)

Estado:
- `API-first com espelho local`

Risco:
- ainda ha trechos derivados de pedidos

Diretriz:
- continuar tirando inteligencia do espelho local
- consolidar o backend como fonte principal do perfil do cliente

---

### Delivery dispatch

Arquivo principal:
- [delivery-dispatch-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/delivery-dispatch-storage.ts)

Estado:
- `API-first com espelho local`

Diretriz:
- manter tenant-aware
- tratar local apenas como resiliencia, nunca como fonte da disponibilidade do entregador

---

### Masseiro tasks

Arquivo principal:
- [masseiro-tasks-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/masseiro-tasks-storage.ts)

Estado:
- `API-first com espelho local`

Diretriz:
- manter o backend como fonte principal
- evitar qualquer evolucao que recoloque concorrencia apenas no navegador

---

### Usuarios do assinante

Arquivo principal:
- [users-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/users-storage.ts)

Estado:
- `API-first com espelho local`

Diretriz:
- login e CRUD ja pertencem ao backend
- cache local deve servir so para leitura rapida e compatibilidade

---

### Configuracoes do dashboard

Arquivo principal:
- [settings-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/settings-storage.ts)

Estado:
- `API-first com espelho local`

Diretriz:
- persistencia oficial deve continuar no backend
- navegador nao deve voltar a ser dono das configuracoes do sistema

---

### Billing do assinante

Arquivo principal:
- [saas-billing-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/saas-billing-storage.ts)

Estado:
- `API-first com espelho local`

Diretriz:
- camada sensivel de relacionamento financeiro
- espelho local apenas como apoio

---

### Confirmacoes financeiras

Arquivo principal:
- [financial-confirmations-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/financial-confirmations-storage.ts)

Estado:
- `API-first com espelho local`

Diretriz:
- confirmacao financeira ja tem camada propria
- o pedido so deve carregar compatibilidade temporaria, nao ser dono dessa informacao

---

## Casos que exigem revisao imediata

### Geoapify dispatch

Arquivo principal:
- [geoapify-dispatch.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/geoapify-dispatch.ts)

Risco:
- hoje parece mais global do que tenant-aware
- pode introduzir contexto indevido se crescer como parte operacional

Diretriz:
- revisar antes de expandir o uso
- decidir se continua local como cache tecnico de integracao ou se precisa ganhar escopo por tenant

---

### Contexto de assinante no navegador

Arquivo principal:
- [saas-clients-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/saas-clients-storage.ts)

Risco:
- e o pivô do contexto ativo no frontend
- qualquer helper novo mal desenhado pode voltar a depender do “tenant do momento”

Diretriz:
- tratar como infraestrutura critica
- nao usar como desculpa para leitura/escrita implicita
- sempre congelar `subscriberId` no inicio do ciclo
- nunca resolver ausencia de assinante com um tenant default estrutural invisivel

Estado atual:
- a camada foi endurecida para retornar ausencia explicita de contexto quando o assinante nao existe
- os consumidores principais passaram a tratar `null` de forma segura

---

## Critérios de decisão para novos dados locais

Antes de guardar algo no navegador, responder:

1. Isso e preferencia de interface ou regra de negocio?
2. Isso precisa ser compartilhado entre usuarios ou maquinas?
3. Isso precisa sobreviver como verdade oficial?
4. Isso pode causar vazamento entre tenants se ficar local?
5. Isso depende da estacao fisica?

Se a resposta apontar para negocio, compartilhamento ou risco multitenant, o dado nao deve nascer local.

---

## Regra pratica para o time

### Pode nascer local

- tema
- dropdown visto/nao visto
- rascunho temporario
- preferencia visual
- configuracao fisica da estacao

### Nao deve nascer local

- pedido oficial
- caixa oficial
- cliente oficial
- usuario oficial
- configuracao oficial da operacao
- confirmacao financeira oficial
- relacionamento entre tenants

---

## Resumo executivo

O navegador ainda existe como apoio no Entregoo, mas nao deve voltar a ser o centro da operacao.

Em uma frase:

> local por design e aceitavel; local por conveniencia arquitetural nao e.
