# Matriz API-First e Transicao de Dados

## Objetivo
Registrar, de forma clara e operacional, como esta a transicao do Entregoo de uma base fortemente apoiada em `localStorage` para uma arquitetura em que o backend e o PostgreSQL sejam a fonte principal dos dados.

Este documento existe para responder quatro perguntas:

1. O que ja esta persistido no banco.
2. O que ainda esta em transicao com cache espelho no navegador.
3. O que ainda esta local e precisa ser priorizado.
4. Como evoluir sem reintroduzir riscos de vazamento entre assinantes.

---

## Leitura rapida

Hoje o Entregoo esta em um modelo `API-first em consolidacao`.

Isso significa:

- o backend ja assumiu partes importantes da operacao
- o frontend ainda mantem alguns espelhos locais para resiliencia e compatibilidade
- os modulos mais sensiveis ja estao entrando no PostgreSQL
- o trabalho agora e consolidar a fonte principal e reduzir a dependencia residual do navegador

Em termos praticos:

- `Portal Entregoo` ja depende bastante do backend
- `catalogo`, `pedidos`, `dispatch`, `masseiro`, `CRM`, `caixa`, `usuarios do assinante`, `configuracoes`, `billing` e `confirmacoes financeiras` ja entraram na rota de persistencia real
- ainda existem camadas em transicao, principalmente nos espelhos locais, em preferencias auxiliares do navegador e em trechos de apresentacao ainda derivados do pedido

---

## Conceitos

### Fonte principal
E o lugar que deve ser considerado como verdade oficial do dado.

No destino desejado do Entregoo, a fonte principal deve ser:

- backend da API
- PostgreSQL

### Espelho local
E uma copia no navegador, usada para:

- resposta rapida de interface
- fallback quando a API oscilar
- compatibilidade durante a transicao

Importante:
espelho local nao deve ser tratado como verdade de negocio.

### API-first
Significa que a tela:

- pode mostrar cache rapido
- mas tenta ler da API logo na abertura
- atualiza a interface com o dado real assim que ele chega

### Tenant-aware
Significa que leitura e escrita devem sempre usar contexto explicito de:

- `subscriberId`
- quando aplicavel, `substoreId`

Esse e o ponto central do isolamento entre assinantes.

---

## Estados usados nesta matriz

### Backend consolidado
O dado ja esta persistido no PostgreSQL e a leitura/escrita principal ja passa pela API.

### API-first com espelho local
O dado ja possui backend, mas o frontend ainda usa `localStorage` como cache espelho ou fallback.

### Local tenant-aware
O dado ainda e local, mas ja foi isolado por assinante para reduzir risco de mistura.

### Local legado
O dado ainda depende basicamente do navegador e precisa ser priorizado.

---

## Visao geral por modulo

| Modulo | Estado atual | Fonte principal desejada | Observacao |
|---|---|---|---|
| Assinantes SaaS | API-first com espelho/local complementar | Backend + PostgreSQL | Portal ja opera esse conceito; ainda ha comportamento complementar no frontend. |
| Sublojas | API-first com espelho local | Backend + PostgreSQL | Ja sincroniza com unidades reais do backend. |
| Usuarios Entregoo | Backend consolidado | Backend + PostgreSQL | Portal interno ja usa API real. |
| Login Entregoo | Backend consolidado | Backend + PostgreSQL | Fluxo de autenticacao interna ja foi ligado ao backend. |
| Catalogo / Cardapio | API-first com espelho local | Backend + PostgreSQL | Ja possui persistencia real e cache espelho no frontend. |
| Pedidos enviados | API-first com espelho local | Backend + PostgreSQL | Ja persistem no backend, mas ainda usam storage local como apoio. |
| Delivery dispatch | API-first com espelho local | Backend + PostgreSQL | Estado dos entregadores ja esta no banco. |
| Masseiro tasks | API-first com espelho local | Backend + PostgreSQL | Assumir e concluir tarefas ja escrevem no banco. |
| CRM de clientes | API-first com espelho local | Backend + PostgreSQL | Perfis e automacoes ja comecaram a sair do navegador. |
| Caixa / sessoes e movimentos | API-first com espelho local | Backend + PostgreSQL | Sessao de caixa e sangria/suprimento ja estao no backend. |
| Confirmacao financeira do pedido | API-first com espelho local | Backend + PostgreSQL | Ja possui camada propria no backend; ainda ha trechos de apresentacao e compatibilidade sobre o payload do pedido. |
| Configuracoes do dashboard | API-first com espelho local | Backend + PostgreSQL | Ja salvam no backend por assinante/subloja; helpers ainda mantem cache local. |
| Usuarios do assinante | API-first com espelho local | Backend + PostgreSQL | CRUD e login do sistema ja usam API; o espelho local permanece como apoio. |
| Billing do assinante | API-first com espelho local | Backend + PostgreSQL | Area do cliente ja persiste e carrega cobranca no backend. |
| CRM derivado de pedidos | Em transicao | Backend + PostgreSQL | Parte da formacao ainda deriva de sincronizacao de pedidos. |
| Relatorios | API-first sobre pedidos + dados mistos | Backend + PostgreSQL | Leitura principal ja foi estabilizada por tenant; depende da maturidade dos modulos-base. |

---

## Modulos ja levados para o backend

### 1. Catalogo

#### Escopo atual

- itens de catalogo
- atributos genericos por segmento
- variacoes
- estoque por variante
- historico de movimentacao

#### Situacao

- o banco ja contem a estrutura real
- o frontend usa proxies do Next para conversar com a API
- ainda existe espelho local para transicao e resposta rapida

#### Implicacao arquitetural

O catalogo deixou de ser apenas comportamento visual de tela e passou a existir como estrutura de negocio real.

#### Arquivos-chave

- `entregoo-api/prisma/schema.prisma`
- `entregoo-api/src/services/catalog-items.service.ts`
- `entregoo-web/src/lib/catalog-api.ts`
- `entregoo-web/src/lib/catalog-storage.ts`

---

### 2. Pedidos enviados

#### Escopo atual

- persistencia do pedido consolidado
- leitura das operacoes principais
- atualizacao por fluxo operacional

#### Situacao

- o backend ja registra pedidos no PostgreSQL
- o frontend ainda mantem cache local espelho
- as telas mais operacionais ja fazem leitura `API-first`

#### Risco residual

Como o modulo ainda convive com espelho local, qualquer evolucao de escrita precisa continuar respeitando o `subscriberId` explicitamente.

#### Arquivos-chave

- `entregoo-api/src/services/submitted-orders.service.ts`
- `entregoo-web/src/lib/submitted-orders-api.ts`
- `entregoo-web/src/lib/submitted-orders-storage.ts`

---

### 3. Delivery dispatch

#### Escopo atual

- estado do entregador
- disponibilidade
- pedido atual associado ao entregador

#### Situacao

- persistencia real ja no PostgreSQL
- frontend ainda usa cache espelho
- tela de entregas ja esta integrada ao backend

#### Valor dessa migracao

Esse foi um passo importante porque `dispatch` e um estado operacional de alta sensibilidade. Ele nao deve depender do navegador como fonte oficial.

#### Arquivos-chave

- `entregoo-api/src/services/delivery-dispatch.service.ts`
- `entregoo-web/src/lib/delivery-dispatch-api.ts`
- `entregoo-web/src/lib/delivery-dispatch-storage.ts`

---

### 4. Masseiro tasks

#### Escopo atual

- assumir tarefa
- concluir tarefa
- vinculo de operador
- bloqueio basico de concorrencia

#### Situacao

- backend ja persistindo estado
- frontend ainda com espelho local
- tela do masseiro ja opera nesse fluxo novo

#### Valor dessa migracao

Reduziu o risco de duas operacoes paralelas competirem apenas no navegador.

#### Arquivos-chave

- `entregoo-api/src/services/masseiro-tasks.service.ts`
- `entregoo-web/src/lib/masseiro-tasks-api.ts`
- `entregoo-web/src/lib/masseiro-tasks-storage.ts`

---

### 5. CRM de clientes

#### Escopo atual

- perfis de clientes
- automacoes de CRM
- sincronizacao inicial com pedidos

#### Situacao

- perfis e automacoes ja possuem modelos e API no backend
- a camada do frontend ainda trata parte do dado como espelho e ainda reconcilia com pedidos

#### Observacao importante

Esse modulo esta em transicao real. Ele ja nao e puramente local, mas ainda nao pode ser tratado como totalmente consolidado enquanto parte da alimentacao ainda deriva da camada de pedidos.

#### Arquivos-chave

- `entregoo-api/src/services/customer-profiles.service.ts`
- `entregoo-web/src/lib/customers-api.ts`
- `entregoo-web/src/lib/customers-storage.ts`

---

### 6. Caixa

#### Escopo atual

- sessoes de caixa
- abertura
- fechamento
- sangria
- suprimento

#### Situacao

- o banco ja recebeu estrutura propria para sessoes e movimentos
- a API ja aceita listar, abrir, fechar e registrar movimentos
- o frontend continua com cache local espelho e fallback

#### O que ainda nao esta totalmente desacoplado

- parte da inteligencia financeira continua acoplada ao pedido
- `cashConfirmation` ainda e derivado do payload do pedido e nao de um modulo financeiro proprio

#### Arquivos-chave

- `entregoo-api/src/services/cash-sessions.service.ts`
- `entregoo-web/src/lib/cashier-api.ts`
- `entregoo-web/src/lib/cashier-storage.ts`

---

### 7. Usuarios do assinante

#### Escopo atual

- cadastro e edicao de usuarios do sistema
- escopo por unidade
- papel operacional do dashboard
- autenticacao do sistema do assinante

#### Situacao

- o backend passou a usar `User`, `UserStore` e `UserSubstore` como fonte principal
- o login do sistema ja autentica via API
- o frontend ainda mantem espelho local para leitura rapida e compatibilidade

#### Valor dessa migracao

Reduz o risco de cada navegador manter sua propria base de usuarios e prepara a consolidacao futura de permissao e auditoria.

#### Arquivos-chave

- `entregoo-api/src/services/system-users.service.ts`
- `entregoo-api/src/services/auth.service.ts`
- `entregoo-web/src/lib/system-users-api.ts`
- `entregoo-web/src/lib/users-storage.ts`

---

### 8. Configuracoes do dashboard

#### Escopo atual

- configuracoes gerais da loja
- modulos operacionais da assinatura
- meios de pagamento
- impressao e vias
- integracoes
- configuracoes do site

#### Situacao

- o backend passou a persistir `settingsProfile` da loja e `settingsSnapshot` da subloja
- o frontend agora le da API e salva no backend nos pontos principais de escrita
- os helpers ainda mantem cache local para resposta imediata e compatibilidade

#### Valor dessa migracao

Reduz divergencia entre navegadores e cria uma base unica para o comportamento do sistema inteiro.

#### Arquivos-chave

- `entregoo-api/src/services/dashboard-settings.service.ts`
- `entregoo-web/src/lib/dashboard-settings-api.ts`
- `entregoo-web/src/lib/settings-storage.ts`

---

### 9. Billing do assinante

#### Escopo atual

- e-mail de cobranca
- faturas
- segunda via
- registro de pagamento
- solicitacao de upgrade

#### Situacao

- o backend agora persiste o perfil de billing por assinante
- a area do cliente ja le e grava no backend
- o frontend ainda mantem espelho local como apoio

#### Valor dessa migracao

Tira da memoria do navegador uma camada sensivel de relacionamento financeiro com o assinante.

#### Arquivos-chave

- `entregoo-api/src/services/subscriber-billing.service.ts`
- `entregoo-web/src/lib/subscriber-billing-api.ts`
- `entregoo-web/src/lib/saas-billing-storage.ts`

---

## Modulos ainda em transicao relevante

### Confirmacao financeira do pedido

Esse ponto ja ganhou estrutura propria no backend, mas ainda convive com uma camada de compatibilidade nas telas.

#### Estado

- `API-first com espelho local`

#### Risco

Enquanto a apresentacao ainda depender parcialmente do pedido mesclado, `caixa` e `relatorios` continuam com algum acoplamento residual ao ciclo do pedido.

#### Estado atual consolidado

- tabela propria no PostgreSQL
- leitura `API-first`
- confirmacao usada em totais financeiros
- validacao adicional no backend para `storeId`, `substoreId`, `pedido` e `sessao`

#### Proximo passo natural

Tirar da UI os ultimos trechos que leem `cashConfirmation` diretamente do pedido quando a informacao ja existe na camada financeira propria.

---

## Modulos que ainda dependem da maturidade dos modulos-base

### Relatorios

Os relatorios ficaram mais seguros por tenant, mas dependem de:

- pedidos
- confirmacao financeira
- caixa
- clientes
- catalogo

Enquanto esses modulos ainda estiverem em transicao, os relatorios tambem ficam parcialmente em transicao.

#### Estado

- `API-first sobre base ainda em consolidacao`

---

### Dashboard principal

O dashboard ja passou por estabilizacao de `subscriberId`, mas continua sendo um agregador.

Ele so sera realmente solido quando:

- pedidos estiverem sem espelho residual importante
- clientes estiverem consolidados
- caixa estiver mais independente do payload do pedido

---

## O que significa “espelho local” no Entregoo hoje

O espelho local ainda e usado com tres papeis principais:

### 1. Resposta rapida de interface
Permite que a tela mostre algum estado imediatamente, antes da resposta da API.

### 2. Compatibilidade de transicao
Evita quebrar telas antigas enquanto a migracao de dados ainda nao terminou.

### 3. Fallback operacional
Se a API oscilar localmente, a interface ainda tenta nao colapsar de imediato.

### Risco do espelho local

Se ele passar a ser tratado como “verdade”, os sintomas tendem a ser:

- congelamento de tela
- loops de sync
- dados velhos reaparecendo
- contexto de tenant indevido
- divergencia entre abas

Por isso, a diretriz deve continuar sendo:

> `localStorage` existe como apoio temporario, nunca como dono da regra de negocio.

---

## Padrao tecnico que deve ser seguido daqui para frente

### Leitura

1. capturar `subscriberId` no inicio do ciclo
2. usar `substoreId` explicito quando aplicavel
3. mostrar cache apenas como resposta rapida
4. buscar API logo em seguida
5. atualizar tela com dado real

### Escrita

1. escrever com `subscriberId` explicito
2. escrever com `substoreId` quando o modulo depender da unidade
3. atualizar cache local apenas como reflexo
4. nao usar “tenant ativo do momento” dentro de operacoes assincronas tardias

### Sincronizacao

1. nunca disparar sync automaticamente em funcoes puras de leitura
2. evitar `storage event` barulhento no meio da renderizacao
3. manter sync sob pontos explicitos da tela ou da acao

Esse padrao conversa diretamente com:

- [Padrao Tenant-Aware no Frontend](./padrao-tenant-aware-no-frontend.md)

---

## Ordem recomendada de consolidacao

### Prioridade 1

- reduzir dependencia de derivacao de pedidos em `CRM`, `caixa` e confirmacao financeira
- consolidar a camada financeira auxiliar com fonte principal mais clara

### Prioridade 2

- reduzir espelho local de `catalogo` e `pedidos`
- deixar leitura principal cada vez mais baseada em API e estado em memoria

### Prioridade 3

- revisar modulos auxiliares ainda locais por natureza operacional, como preferencias de estacao e fluxos temporarios
- decidir o que permanece local por design e o que ainda deve ir para backend
- manter `workstation print`, `geoapify dispatch`, `pending checkout` e preferencias de portal fora da regra de negocio principal

### Prioridade 4

- reorganizar relatorios sobre base mais consolidada
- criar camada financeira mais propria, menos embutida no pedido

---

## Riscos se a consolidacao parar no meio

### 1. Mistura de fontes
Parte da verdade no banco, parte no navegador, parte no pedido.

### 2. Vazamento entre assinantes
Mesmo com melhorias tenant-aware, qualquer area parcialmente global volta a representar risco.

### 3. Regressao silenciosa
Uma tela nova pode reaproveitar helper antigo e reintroduzir dependencia do `tenant ativo`.

### 4. Complexidade operacional
Quanto mais modulos ficarem “meio backend, meio browser”, mais dificil fica manter previsibilidade.

---

## Estado recomendado a buscar

O Entregoo deve caminhar para este modelo:

### Backend

- PostgreSQL como fonte principal
- regras operacionais mais criticas no backend
- rotas por contexto de tenant

### Frontend

- estado em memoria como interface de trabalho
- cache local apenas opcional e controlado
- telas `API-first`
- escrita sempre tenant-aware

### Portal Entregoo

- administracao dos tenants, sublojas, afiliados e canais
- nunca confundido com o sistema operacional do assinante

### Sistema do assinante

- leitura e escrita totalmente isoladas por tenant
- modulos ativados por configuracao do assinante
- comportamento variando por `segment` e `catalogMode`

---

## Resumo executivo

O Entregoo ja saiu da fase em que quase tudo dependia do navegador.

Hoje:

- a fundacao multitenant ja esta em andamento
- varios modulos criticos ja entraram no PostgreSQL
- o frontend ja foi bastante estabilizado para operar por tenant
- ainda existe transicao, mas ela agora esta mapeada

Em outras palavras:

> o sistema ja nao esta mais “tentando virar plataforma”; ele ja esta em consolidacao como plataforma, e esta matriz existe para impedir que essa consolidacao aconteca de forma confusa.
